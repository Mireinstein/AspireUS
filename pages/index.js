import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>AspireUSA - Transform Your Future</title>
        <meta name="description" content="Landing page for AspireUSA" />
      </Head>

      {/* HERO SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroHeading}>
            Transform Your Future with{' '}
            <span className={styles.brandBlue}>Aspire</span>
            <span className={styles.brandRed}>USA</span>
          </h1>
          <p className={styles.heroSubtext}>
            Unlock your future with personalized guidance and expert support 
            every step of the way in your college application process.
          </p>
          <p className={styles.heroSubtext}>
            We know that applying to college can feel overwhelming—rest assured, 
            we’re here to make the process as smooth and stress-free as possible.
          </p>
          <Link href="/services">
            <button className={styles.ctaButton}>Learn more</button>
          </Link>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className={styles.teamSection}>
        <h2 className={styles.teamTitle}>Meet the Team</h2>
        <div className={styles.teamGrid}>
            {/* TODO: ADD ACTUAL TEAM MEMBER IMAGES */}
          <div className={styles.teamMember}>
            {/* Replace src with your actual team member image URLs */}
            <img 
              src="/Admire.jpg"
              alt="Admire Madyira"
              className={styles.memberImage}
            />
            <h3 className={styles.memberName}>Admire Madyira</h3>
            <p className={styles.memberRole}>Founder</p>
          </div>

          <div className={styles.teamMember}>
            <img 
              src="/Marius.jpg"
              alt="Marius Cotorobai"
              className={styles.memberImage}
            />
            <h3 className={styles.memberName}>Marius Cotorobai</h3>
            <p className={styles.memberRole}>Tutor</p>
          </div>

          <div className={styles.teamMember}>
            <img 
              src="/Cesaire.jpg"
              alt="Cesaire Mugishawayo"
              className={styles.memberImage}
            />
            <h3 className={styles.memberName}>Cesaire Mugishawayo</h3>
            <p className={styles.memberRole}>IT Director</p>
          </div>
        </div>
      </section>
    </>
  )
}
