// pages/dashboard.js
import Head from 'next/head';
import styles from '../styles/dashboard.module.css';

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className={styles.dashboardContainer}>
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard page.</p>
      </div>
    </>
  );
}
