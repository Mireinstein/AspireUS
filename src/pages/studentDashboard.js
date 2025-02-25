import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../styles/studentdashboard.module.css';

// Mark this page as protected by auth.
StudentDashboard.protected = true;

// Helper: Parse meetingHistory from a JSON string to an array.
function parseMeetingHistory(meetingHistory) {
  if (typeof meetingHistory === 'string') {
    try {
      return JSON.parse(meetingHistory);
    } catch (error) {
      console.error("Error parsing meetingHistory JSON:", error);
      return [];
    }
  }
  return meetingHistory || [];
}

// Helper: Filter meetings based on whether they are upcoming (isUpcoming=true) or past (isUpcoming=false).
function filterMeetings(meetingHistory, isUpcoming = true) {
  const meetingsArray = parseMeetingHistory(meetingHistory);
  const now = new Date();
  return meetingsArray.filter(meeting => {
    const scheduledTime = new Date(meeting.scheduledTime || meeting.ScheduledTime);
    return isUpcoming ? scheduledTime > now : scheduledTime <= now;
  });
}

// Helper: Convert a File object to a base64 data URL.
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default function StudentDashboard() {
  const router = useRouter();
  const { email: studentEmail, id: studentId } = router.query;
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [tutorCache, setTutorCache] = useState({});
  
  // New state for editing profile.
  const [editingProfile, setEditingProfile] = useState(false);
  const [editValues, setEditValues] = useState({
    givenName: '',
    surname: '',
    countryRegion: '',
    streetAddress: '',
    bio: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [updatingProfile, setUpdatingProfile] = useState(false);

  // Fetch student record from your API endpoint using the studentId.
  useEffect(() => {
    if (studentId) {
      fetch(`/api/getUser?uid=${encodeURIComponent(studentId)}`)
        .then(res => {
          if (!res.ok) throw new Error("Failed to fetch student data");
          return res.json();
        })
        .then(data => {
          setStudentData(data.user);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching student data:", err);
          setLoading(false);
        });
    }
  }, [studentId]);

  // When studentData is loaded, initialize the edit form values.
  useEffect(() => {
    if (studentData) {
      setEditValues({
        givenName: studentData.givenName || '',
        surname: studentData.surname || '',
        countryRegion: studentData.countryRegion || '',
        streetAddress: studentData.streetAddress || '',
        bio: studentData.bio || '',
      });
    }
  }, [studentData]);

  // Helper to fetch tutor data by providerID, caching the result.
  const fetchTutorData = useCallback(async (providerID) => {
    if (tutorCache[providerID]) return tutorCache[providerID];
    try {
      const res = await fetch(`/api/getUser?uid=${encodeURIComponent(providerID)}&role=tutor`);
      if (!res.ok) throw new Error("Failed to fetch tutor data");
      const data = await res.json();
      setTutorCache(prev => ({ ...prev, [providerID]: data.user }));
      return data.user;
    } catch (err) {
      console.error("Error fetching tutor data for", providerID, err);
      return null;
    }
  }, [tutorCache]);

  const handleBookService = () => {
    router.push(`/bookService?email=${encodeURIComponent(studentEmail)}`);
  };

  // Handle changes in the edit form fields.
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditValues(prev => ({ ...prev, [name]: value }));
  };

  // Handle file input change.
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Handle profile update submission.
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setUpdatingProfile(true);
    
    // Convert the selected file to base64 if a file is chosen.
    let profilePhotoData = "";
    let profilePhotoExtension = "";
    if (selectedFile) {
      try {
        profilePhotoData = await fileToBase64(selectedFile);
        // Extract extension from file name.
        const fileName = selectedFile.name;
        profilePhotoExtension = fileName.substring(fileName.lastIndexOf('.'));
      } catch (error) {
        console.error("Error converting file to base64:", error);
      }
    }
    
    // Prepare updated data payload.
    const updatedData = {
      uid: studentId,
      partition: "student",
      givenName: editValues.givenName,
      surname: editValues.surname,
      countryRegion: editValues.countryRegion,
      streetAddress: editValues.streetAddress,
      bio: editValues.bio,
      // Pass the newly uploaded photo data (if any) for the API to handle.
      profilePhotoData,  
      profilePhotoExtension,
    };

    // Call API endpoint to update the user record.
    try {
      const res = await fetch('/api/updateUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      const result = await res.json();
      if (result.success) {
        // Refresh the student data.
        setStudentData(prev => ({ ...prev, 
          givenName: editValues.givenName,
          surname: editValues.surname,
          countryRegion: editValues.countryRegion,
          streetAddress: editValues.streetAddress,
          bio: editValues.bio,
          profilePhotoUrl: result.profilePhotoUrl || prev.profilePhotoUrl,
        }));
        setEditingProfile(false);
        setSelectedFile(null);
      } else {
        console.error("Update failed:", result.error);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    }
    setUpdatingProfile(false);
  };

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (!studentData) return <p className={styles.error}>No student data found.</p>;

  // Destructure the attributes we care about.
  const givenName = studentData.givenName;
  const lastName = studentData.surname;
  const email = studentData.email;
  const country = studentData.countryRegion;
  const address = studentData.streetAddress;
  const bio = studentData.bio;
  const profilePhotoUrl = studentData.profilePhotoUrl;
  const meetingHistory = studentData.meetingHistory;
  const messages = studentData.messages;

  // Parse meetingHistory (stored as JSON) into an array.
  const meetingsArray = parseMeetingHistory(meetingHistory);
  const upcomingMeetings = filterMeetings(meetingHistory, true);
  const pastMeetings = filterMeetings(meetingHistory, false);

  return (
    <div className={styles.container}>
      <Head>
        <title>Student Dashboard - AspireUS</title>
      </Head>
      <header className={styles.header}>
        <h1>Welcome, {givenName}!</h1>
      </header>
      
      {/* Tab Navigation */}
      <div className={styles.tabNavigation}>
        <button
          className={`${styles.tabButton} ${activeTab === "profile" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          My Profile
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === "services" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("services")}
        >
          My Booked Services
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === "messages" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("messages")}
        >
          Messages
        </button>
      </div>
      
      {/* Tab Content */}
      {activeTab === "profile" && (
        <section className={styles.profileSection}>
          {editingProfile ? (
            <form className={styles.profileCard} onSubmit={handleProfileUpdate}>
              <h2>Edit Your Profile</h2>
              <div className={styles.editField}>
                <label>Given Name:</label>
                <input
                  type="text"
                  name="givenName"
                  value={editValues.givenName}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className={styles.editField}>
                <label>Surname:</label>
                <input
                  type="text"
                  name="surname"
                  value={editValues.surname}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className={styles.editField}>
                <label>Country/Region:</label>
                <input
                  type="text"
                  name="countryRegion"
                  value={editValues.countryRegion}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className={styles.editField}>
                <label>Street Address:</label>
                <input
                  type="text"
                  name="streetAddress"
                  value={editValues.streetAddress}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className={styles.editField}>
                <label>Bio:</label>
                <textarea
                  name="bio"
                  value={editValues.bio}
                  onChange={handleEditChange}
                />
              </div>
              <div className={styles.editField}>
                <label>Profile Photo:</label>
                <input type="file" onChange={handleFileChange} accept="image/*" />
              </div>
              <div className={styles.editActions}>
                <button type="submit" className={styles.bookButton} disabled={updatingProfile}>
                  {updatingProfile ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  className={styles.chatButton}
                  onClick={() => setEditingProfile(false)}
                  disabled={updatingProfile}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className={styles.profileCard}>
              <h2>Your Profile</h2>
              {profilePhotoUrl ? (
                <img src={profilePhotoUrl} alt="Profile Photo" className={styles.profilePhoto} />
              ) : (
                <div className={styles.noPhoto}>
                  <p>No profile photo</p>
                  <button className={styles.chatButton} onClick={() => setEditingProfile(true)}>
                    Add Profile Photo
                  </button>
                </div>
              )}
              <p><strong>Name:</strong> {givenName} {lastName}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Country:</strong> {country}</p>
              <p><strong>Address:</strong> {address}</p>
              {bio && <p><strong>Bio:</strong> {bio}</p>}
              <button className={styles.bookButton} onClick={() => setEditingProfile(true)}>
                Edit Profile
              </button>
            </div>
          )}
        </section>
      )}
      
      {activeTab === "services" && (
        <section className={styles.servicesSection}>
          <h2>My Booked Services</h2>
          {meetingsArray && meetingsArray.length > 0 ? (
            <div className={styles.servicesList}>
              {meetingsArray.map((meeting, idx) => (
                <MeetingCard key={meeting.id ? meeting.id : idx} meeting={meeting} fetchTutorData={fetchTutorData} />
              ))}
            </div>
          ) : (
            <p className={styles.noServices}>You have not booked any services yet.</p>
          )}
        </section>
      )}
      
      {activeTab === "messages" && (
        <section className={styles.servicesSection}>
          <h2>Messages</h2>
          {messages && messages.length > 0 ? (
            <ul className={styles.messageList}>
              {messages.map((msg, idx) => (
                <li key={idx}>{typeof msg === 'string' ? msg : JSON.stringify(msg)}</li>
              ))}
            </ul>
          ) : (
            <p className={styles.noServices}>No messages.</p>
          )}
        </section>
      )}
      
      <section className={styles.actionsSection}>
        <button className={styles.bookButton} onClick={handleBookService}>
          Book Service
        </button>
      </section>
    </div>
  );
}

// MeetingCard component that fetches and displays tutor info for a meeting.
function MeetingCard({ meeting, fetchTutorData }) {
  const [tutorInfo, setTutorInfo] = useState(null);

  useEffect(() => {
    async function getTutor() {
      if (meeting.providerID) {
        const tutor = await fetchTutorData(meeting.providerID);
        setTutorInfo(tutor);
      }
    }
    getTutor();
  }, [meeting.providerID, fetchTutorData]);

  return (
    <div className={styles.serviceCard}>
      <div className={styles.meetingDetails}>
        <h3>{meeting.serviceType}</h3>
        <p>
          <strong>Status:</strong>{" "}
          <span className={`${styles.statusBadge} ${styles[meeting.Status.toLowerCase()]}`}>
            {meeting.Status}
          </span>
        </p>
        <p>
          <strong>Scheduled:</strong>{" "}
          {new Date(meeting.scheduledTime || meeting.ScheduledTime).toLocaleString()}
        </p>
        {tutorInfo && <p><strong>Provider:</strong> {tutorInfo.givenName} {tutorInfo.surname}</p>}
      </div>
      {tutorInfo ? (
        <div className={styles.tutorSection}>
          <img 
            src={tutorInfo.profilePhotoUrl || '/default-profile.png'} 
            alt="Tutor Profile" 
            className={styles.tutorPhoto}
          />
          <p className={styles.tutorBio}>{tutorInfo.bio}</p>
          <button 
            className={styles.chatButton}
            onClick={() => window.location.href = `mailto:${tutorInfo.email}`}
          >
            Chat
          </button>
        </div>
      ) : (
        <p>Loading provider info...</p>
      )}
    </div>
  );
}
