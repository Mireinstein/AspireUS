import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../styles/advisordashboard.module.css';

export default function AdvisorDashboard() {
  const router = useRouter();
  const { email: advisorEmail, id: advisorId } = router.query;
  const [advisorData, setAdvisorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("students"); // default tab

  // ----- Dummy Data Section Start -----
  // TODO: Replace the dummy data and setTimeout with a real API call to fetch advisor data.
  const dummyAdvisorData = {
    firstName: "Emily",
    lastName: "Johnson",
    email: advisorEmail || "emily.johnson@example.com",
    services: [
      {
        id: "1",
        serviceType: "College Prep",
        description: "Expert guidance on college applications.",
        price: "$80/hr",
      },
      {
        id: "2",
        serviceType: "Essay Review",
        description: "Detailed feedback on application essays.",
        price: "$60/hr",
      },
    ],
    students: [
      {
        id: "1",
        name: "Mark Spencer",
        email: "mark.spencer@example.com",
        service: "College Prep",
      },
      {
        id: "2",
        name: "Lucy Brown",
        email: "lucy.brown@example.com",
        service: "College Prep",
      },
    ],
    meetings: [
      {
        id: "1",
        studentName: "Mark Spencer",
        scheduledTime: "2025-03-20T15:00:00Z",
      },
      {
        id: "2",
        studentName: "Lucy Brown",
        scheduledTime: "2025-03-22T10:00:00Z",
      },
    ],
  };

  useEffect(() => {
    if (advisorEmail) {
      // Dummy fetch simulation using setTimeout
      setTimeout(() => {
        setAdvisorData(dummyAdvisorData);
        setLoading(false);
      }, 1000);
    }
  }, [advisorEmail]);
  // ----- Dummy Data Section End -----

  /*
  // ----- Production Code Start -----
  // TODO: Uncomment and replace the following code with an actual API call.
  useEffect(() => {
    if (advisorEmail) {
      fetch(`/api/getAdvisorData?email=${encodeURIComponent(advisorEmail)}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          setAdvisorData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching advisor data:", err);
          setLoading(false);
        });
    }
  }, [advisorEmail]);
  // ----- Production Code End -----
  */

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleAddService = () => {
    // Navigate to addService.js, sending advisor's email as a query parameter.
    router.push(`/addService?email=${encodeURIComponent(advisorEmail)}`);
  };

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (!advisorData) return <p className={styles.error}>No advisor data found.</p>;

  return (
    <div className={styles.container}>
      <Head>
        <title>Advisor Dashboard - AspireUS</title>
      </Head>
      <header className={styles.header}>
        <h1>Welcome, {advisorData.firstName}!</h1>
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
          {advisorData.students && advisorData.students.length > 0 ? (
            <div className={styles.studentsList}>
              {advisorData.students.map((student) => (
                <div key={student.id} className={styles.studentCard}>
                  <h3>{student.name}</h3>
                  <p><strong>Email:</strong> {student.email}</p>
                  <p><strong>Service:</strong> {student.service}</p>
                  {/* Chat button */}
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
            <p className={styles.noStudents}>No students currently assigned.</p>
          )}
        </section>
      )}

      {activeTab === "meetings" && (
        <section className={styles.meetingsSection}>
          <h2>Upcoming Meetings</h2>
          {advisorData.meetings && advisorData.meetings.length > 0 ? (
            <div className={styles.meetingsList}>
              {advisorData.meetings.map((meeting) => (
                <div key={meeting.id} className={styles.meetingCard}>
                  <p><strong>Student:</strong> {meeting.studentName}</p>
                  <p>
                    <strong>Time:</strong> {new Date(meeting.scheduledTime).toLocaleString()}
                  </p>
                  {/* Meet button */}
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
          {advisorData.services && advisorData.services.length > 0 ? (
            <div className={styles.servicesList}>
              {advisorData.services.map((service) => (
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
