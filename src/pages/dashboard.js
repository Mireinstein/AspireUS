// pages/dashboard.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/dashboard.module.css';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!user) return null;

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.dashboardTitle}>Welcome, {user.email}</h1>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <h2>Your Profile</h2>
          <p>Manage your personal details and application information.</p>
          <a href="/profile" className={styles.cardLink}>View Profile</a>
        </div>
        <div className={styles.card}>
          <h2>Application Status</h2>
          <p>Check the progress of your college applications.</p>
          <a href="/application" className={styles.cardLink}>View Application</a>
        </div>
      </div>
    </div>
  );
}
