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

export default function StudentDashboard() {
  const router = useRouter();
  const { email: studentEmail, id: studentId } = router.query;
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [tutorCache, setTutorCache] = useState({});

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

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (!studentData) return <p className={styles.error}>No student data found.</p>;

  // Destructure the attributes we care about.
  console.log("student data: ", studentData);
  const givenName = studentData.givenName;
  const lastName = studentData.surname; // Adjust if your data uses a different key (e.g. family_surname).
  const email = studentData.email;
  const country = studentData.countryRegion;
  const address = studentData.streetAddress;
  const bio = studentData.bio;
  const profilePhotoUrl = studentData.profilePhotoUrl;
  const meetingHistory = studentData.meetingHistory;
  const messages = studentData.messages;

  // Parse meetingHistory (it is stored as a JSON string) into an array.
  const meetingsArray = parseMeetingHistory(meetingHistory);
  // Optionally, you can also filter for upcoming or past meetings:
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
          <div className={styles.profileCard}>
            <h2>Your Profile</h2>
            <p><strong>Name:</strong> {givenName} {lastName}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Country:</strong> {country}</p>
            <p><strong>Address:</strong> {address}</p>
            {bio && <p><strong>Bio:</strong> {bio}</p>}
          </div>
        </section>
      )}
      
      {activeTab === "services" && (
        <section className={styles.servicesSection}>
          <h2>My Booked Services</h2>
          {meetingsArray && meetingsArray.length > 0 ? (
            <div className={styles.servicesList}>
              {meetingsArray.map((service, idx) => (
                <div key={service.id ? service.id : idx} className={styles.serviceCard}>
                  <h3>{service.serviceType}</h3>
                  <p><strong>Provider:</strong> {service.providerName}</p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className={`${styles.statusBadge} ${styles[service.Status.toLowerCase()]}`}>
                      {service.Status}
                    </span>
                  </p>
                  <p>
                    <strong>Scheduled:</strong>{" "}
                    {new Date(service.scheduledTime || service.ScheduledTime).toLocaleString()}
                  </p>
                  <button
                    className={styles.chatButton}
                    onClick={() => window.location.href = `mailto:${service.providerEmail}`}
                  >
                    Chat
                  </button>
                </div>
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

// MeetingCard component for future extension (currently not used in the mapping above).
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
    <div className={styles.meetingCard}>
      <p><strong>Service:</strong> {meeting.service}</p>
      <p><strong>Service Type:</strong> {meeting.serviceType}</p>
      <p><strong>Status:</strong> {meeting.Status}</p>
      <p>
        <strong>Scheduled:</strong>{" "}
        {new Date(meeting.scheduledTime || meeting.ScheduledTime).toLocaleString()}
      </p>
      {tutorInfo && (
        <div className={styles.tutorInfo}>
          <img 
            src={tutorInfo.profilePhotoUrl || '/default-profile.png'} 
            alt="Tutor Profile" 
            className={styles.tutorPhoto}
          />
          <div className={styles.tutorDetails}>
            <p><strong>Tutor Bio:</strong> {tutorInfo.bio}</p>
            <p><strong>Email:</strong> {tutorInfo.email}</p>
            <button 
              className={styles.chatButton}
              onClick={() => window.location.href = `mailto:${tutorInfo.email}`}
            >
              Chat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
