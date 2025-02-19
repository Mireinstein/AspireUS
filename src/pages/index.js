import Head from 'next/head';
import BackgroundPhoto from '../components/BackgroundPhoto';
import styles from '../styles/home.module.css';
import { useContext } from 'react';
import { useRouter } from 'next/router';


export default function Home() {
  const router = useRouter();
  async function handleGetStarted(){
    router.push("/getStarted");
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
