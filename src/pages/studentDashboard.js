import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../styles/studentdashboard.module.css';

StudentDashboard.protected = true;
export default function StudentDashboard() {
  const router = useRouter();
  const { email: studentEmail, id: studentId } = router.query;
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ----- Dummy Data Section Start -----
  // TODO: Replace the dummy data and setTimeout with a real API call to fetch student data.
  const dummyStudentData = {
    firstName: "John",
    lastName: "Doe",
    email: studentEmail || "john.doe@example.com",
    country: "United States",
    address: "1234 College Ave, City, State, ZIP",
    bookedServices: [
      {
        id: "1",
        serviceType: "Free Consultation",
        providerName: "Tutor A",
        providerEmail: "tutora@example.com", // New field for contacting the provider
        status: "Pending", // Options: Pending, Accepted, Declined, InProgress, Finished
        scheduledTime: "2025-03-15T14:00:00Z",
      },
      {
        id: "2",
        serviceType: "College Prep",
        providerName: "Advisor B",
        providerEmail: "advisorb@example.com",
        status: "Accepted",
        scheduledTime: "2025-03-16T16:00:00Z",
      },
      {
        id: "3",
        serviceType: "SAT Prep",
        providerName: "Tutor C",
        providerEmail: "tutorc@example.com",
        status: "Finished",
        scheduledTime: "2025-02-20T10:00:00Z",
      },
    ],
  };

  useEffect(() => {
    if (studentEmail) {
      // Dummy fetch simulation
      setTimeout(() => {
        setStudentData(dummyStudentData);
        setLoading(false);
      }, 1000);
    }
  }, [studentEmail]);
  // ----- Dummy Data Section End -----

  /*
  // ----- Production Code Start -----
  // TODO: Uncomment the following code to fetch real student data from your API endpoint.
  useEffect(() => {
    if (studentEmail) {
      fetch(`/api/getStudentData?email=${encodeURIComponent(studentEmail)}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          setStudentData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching student data:", err);
          setLoading(false);
        });
    }
  }, [studentEmail]);
  // ----- Production Code End -----
  */

  const handleBookService = () => {
    // Navigate to bookService.js, sending student's email as query parameter.
    router.push(`/bookService?email=${encodeURIComponent(studentEmail)}`);
  };

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (!studentData) return <p className={styles.error}>No student data found.</p>;

  return (
    <div className={styles.container}>
      <Head>
        <title>Student Dashboard - AspireUS</title>
      </Head>
      <header className={styles.header}>
        <h1>Welcome, {studentData.firstName}!</h1>
      </header>

      <section className={styles.profileSection}>
        <div className={styles.profileCard}>
          <h2>Your Profile</h2>
          <p><strong>Name:</strong> {studentData.firstName} {studentData.lastName}</p>
          <p><strong>Email:</strong> {studentData.email}</p>
          <p><strong>Country:</strong> {studentData.country}</p>
          <p><strong>Address:</strong> {studentData.address}</p>
        </div>
      </section>

      <section className={styles.servicesSection}>
        <h2>My Booked Services</h2>
        {studentData.bookedServices && studentData.bookedServices.length > 0 ? (
          <div className={styles.servicesList}>
            {studentData.bookedServices.map((service) => (
              <div key={service.id} className={styles.serviceCard}>
                <h3>{service.serviceType}</h3>
                <p><strong>Provider:</strong> {service.providerName}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`${styles.statusBadge} ${styles[service.status.toLowerCase()]}`}>
                    {service.status}
                  </span>
                </p>
                <p>
                  <strong>Scheduled:</strong>{" "}
                  {new Date(service.scheduledTime).toLocaleString()}
                </p>
                {/* Chat button allowing student to contact the provider */}
                <button
                  className={styles.chatButton}
                  onClick={() => (window.location.href = `mailto:${service.providerEmail}`)}
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

      <section className={styles.actionsSection}>
        <button className={styles.bookButton} onClick={handleBookService}>
          Book Service
        </button>
      </section>
    </div>
  );
}
