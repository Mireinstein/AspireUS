// pages/index.js
import Head from 'next/head';
import styles from '../styles/home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>AspireUS - Transform Your Future</title>
        <meta name="description" content="Streamline your U.S. college applications with our AI-powered platform." />
      </Head>
      <main className={styles.hero}>
        <h1 className={styles.heroTitle}>Transform Your Future with AspireUS</h1>
        <p className={styles.heroSubtitle}>
          Simplify your college application process with our intelligent, AI-powered platform.
        </p>
        <a href="/signup" className={styles.ctaButton}>Get Started</a>
      </main>
    </div>
  );
}
