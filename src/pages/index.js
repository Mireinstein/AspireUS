// pages/index.js
import Head from 'next/head';
import BackgroundSlideshow from '../components/Common/BackgroundSlideshow';
import styles from '../styles/home.module.css'; 

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>AspireUS - Transform Your Future</title>
        <meta name="description" content="Streamline your U.S. college applications with our AI-powered platform." />
      </Head>
      <BackgroundSlideshow />
      <div className={styles.overlay}></div>
      <main className={styles.mainContent}>
        <h1 className={styles.title}>Transform Your Future with AspireUS</h1>
        <p className={styles.subtitle}>
          Simplify your college application process with our intelligent, AI-powered platform.
        </p>
        <a href="/signup" className={styles.ctaButton}>Get Started</a>
      </main>
    </div>
  );
}
