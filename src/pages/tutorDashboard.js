import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../styles/tutordashboard.module.css';

TutorDashboard.protected=true;
export default function TutorDashboard() {
  const router = useRouter();
  const { email: tutorEmail, id: tutorId } = router.query;
  const [tutorData, setTutorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("students"); // Default tab

  // ----- Dummy Data Section Start -----
  // TODO: Replace this dummy data and setTimeout with an actual API call to fetch tutor data.
  const dummyTutorData = {
    firstName: "Jane",
    lastName: "Smith",
    email: tutorEmail || "jane.smith@example.com",
    services: [
      {
        id: "1",
        serviceType: "SAT Prep",
        description: "One-on-one tutoring sessions for SAT preparation.",
        price: "$50/hr",
      },
      {
        id: "2",
        serviceType: "College Prep",
        description: "Personalized college application guidance.",
        price: "$75/hr",
      },
    ],
    students: [
      {
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        service: "SAT Prep",
      },
      {
        id: "2",
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        service: "College Prep",
      },
    ],
    meetings: [
      {
        id: "1",
        studentName: "John Doe",
        scheduledTime: "2025-03-17T15:00:00Z",
      },
      {
        id: "2",
        studentName: "Alice Johnson",
        scheduledTime: "2025-03-18T10:00:00Z",
      },
    ],
  };

  useEffect(() => {
    if (tutorEmail) {
      // Dummy fetch simulation
      setTimeout(() => {
        setTutorData(dummyTutorData);
        setLoading(false);
      }, 1000);
    }
  }, [tutorEmail]);
  // ----- Dummy Data Section End -----

  /*
  // ----- Production Code Start -----
  // TODO: Uncomment the following code to fetch real tutor data from your API endpoint.
  useEffect(() => {
    if (tutorEmail) {
      fetch(`/api/getTutorData?email=${encodeURIComponent(tutorEmail)}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          setTutorData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching tutor data:", err);
          setLoading(false);
        });
    }
  }, [tutorEmail]);
  // ----- Production Code End -----
  */

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleAddService = () => {
    // Navigate to addService.js, sending tutor's email as a query parameter.
    router.push(`/addService?email=${encodeURIComponent(tutorEmail)}`);
  };

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (!tutorData) return <p className={styles.error}>No tutor data found.</p>;

  return (
    <div className={styles.container}>
      <Head>
        <title>Tutor Dashboard - AspireUS</title>
      </Head>
      <header className={styles.header}>
        <h1>Welcome, {tutorData.firstName}!</h1>
      </header>

      {/* Tab Navigation */}
      <div className={styles.tabNavigation}>
        <button
          className={`${styles.tabButton} ${activeTab === "students" ? styles.activeTab : ""}`}
          onClick={() => handleTabClick("students")}
        >
          My Students
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === "meetings" ? styles.activeTab : ""}`}
          onClick={() => handleTabClick("meetings")}
        >
          Meetings
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === "services" ? styles.activeTab : ""}`}
          onClick={() => handleTabClick("services")}
        >
          My Services
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "students" && (
        <section className={styles.studentsSection}>
          <h2>My Students</h2>
          {tutorData.students && tutorData.students.length > 0 ? (
            <div className={styles.studentsList}>
              {tutorData.students.map((student) => (
                <div key={student.id} className={styles.studentCard}>
                  <h3>{student.name}</h3>
                  <p><strong>Email:</strong> {student.email}</p>
                  <p><strong>Service:</strong> {student.service}</p>
                  <button
                    className={styles.chatButton}
                    onClick={() => (window.location.href = `mailto:${student.email}`)}
                  >
                    Chat
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.noStudents}>No students assigned yet.</p>
          )}
        </section>
      )}

      {activeTab === "meetings" && (
        <section className={styles.meetingsSection}>
          <h2>Upcoming Meetings</h2>
          {tutorData.meetings && tutorData.meetings.length > 0 ? (
            <div className={styles.meetingsList}>
              {tutorData.meetings.map((meeting) => (
                <div key={meeting.id} className={styles.meetingCard}>
                  <p><strong>Student:</strong> {meeting.studentName}</p>
                  <p><strong>Time:</strong> {new Date(meeting.scheduledTime).toLocaleString()}</p>
                  <button
                    className={styles.meetButton}
                    onClick={() => alert("Initiate video call functionality here.")}
                  >
                    Meet
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.noMeetings}>No upcoming meetings.</p>
          )}
        </section>
      )}

      {activeTab === "services" && (
        <section className={styles.servicesSection}>
          <h2>My Services</h2>
          {tutorData.services && tutorData.services.length > 0 ? (
            <div className={styles.servicesList}>
              {tutorData.services.map((service) => (
                <div key={service.id} className={styles.serviceCard}>
                  <h3>{service.serviceType}</h3>
                  <p>{service.description}</p>
                  <p><strong>Price:</strong> {service.price}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.noServices}>You have not added any services yet.</p>
          )}
          <button className={styles.addServiceButton} onClick={handleAddService}>
            Add Service
          </button>
        </section>
      )}
    </div>
  );
}
