import Head from 'next/head';
import BackgroundPhoto from '../components/BackgroundPhoto';
import styles from '../styles/home.module.css';
import { useContext } from 'react';
import { useRouter } from 'next/router';
// import { AuthContext } from '../context/authContext'; // TODO: Set Up Auth

export default function Home() {
  const router = useRouter();
  // TODO: Uncomment and add registered user api
  // const { user, loading } = useContext(AuthContext); // Assumes user has an id property

  // async function handleGetStarted() {
  //   // Wait until the auth context finishes loading.
  //   if (loading) return;
    
  //   if (user && user.id) {
  //     try {
  //       const res = await fetch(`/api/getRegisteredUser?userId=${user.id}`);
  //       if (!res.ok) {
  //         throw new Error(`HTTP error! status: ${res.status}`);
  //       }
  //       const data = await res.json();
  //       // Check the returned role from the Azure table.
  //      if (data && data.role) {
  //   if (data.role === 'students') {
  //     router.push(`/studentDashboard?id=${user.id}&email=${user.email}`);
  //   } else if (data.role === 'tutor') {
  //     router.push(`/tutorDashboard?id=${user.id}&email=${user.email}`);
  //   } else if (data.role === 'advisor') {
  //     router.push(`/advisorDashboard?id=${user.id}&email=${user.email}`);
  //   } else {
  //     router.push('/getStarted.js');
  //   }
  // } else {
  //         // If no role is found, redirect to getStarted.
  //         router.push('/getStarted.js');
  //       }
  //     } catch (err) {
  //       console.error('Error fetching user data:', err);
  //       router.push('/getStarted.js');
  //     }
  //   } else {
  //     // If no authenticated user exists, redirect to getStarted.
  //     router.push('/getStarted?id=${user.id}`);
  //   }
  // }
  // TODO:Remove this dummy push
  async function handleGetStarted(){
    router.push(`/getStarted?id=${"1234"}&email=${"test@gmail.com"}`);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>AspireUS - Transform Your Future</title>
        <meta name="description" content="Streamline your U.S. college applications with our AI-powered platform." />
      </Head>
      <BackgroundPhoto />
      <div className={styles.overlay}></div>
      <main className={styles.mainContent}>
        <h1 className={styles.title}>
          Transform Your Future with Aspire<span className={styles.red}>US</span>
        </h1>
        <p className={styles.subtitle}>
          Simplify your college application process with the help of college admission experts and qualified SAT tutors
        </p>
        <button onClick={handleGetStarted} className={styles.ctaButton}>
          Get Started
        </button>
      </main>
    </div>
  );
}
