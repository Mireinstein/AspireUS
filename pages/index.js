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
      {/* <section className={styles.teamSection}>
        <h2 className={styles.teamTitle}>Meet the Team</h2>
        <div className={styles.teamGrid}>
            TODO: ADD ACTUAL TEAM MEMBER IMAGES
          <div className={styles.teamMember}>
            Replace src with your actual team member image URLs
            <img 
              src="/sheila_mushoriwa.jpg"
              alt="Sheila Mushoriwa"
              className={styles.memberImage}
            />
            <h3 className={styles.memberName}>Sheila Mushoriwa</h3>
            <p className={styles.memberRole}>Student at Havard</p>
          </div>

          <div className={styles.teamMember}>
            <img 
              src="/jason_mnguti.jpg"
              alt="Jason Mnguti"
              className={styles.memberImage}
            />
            <h3 className={styles.memberName}>Jason Mnguti</h3>
            <p className={styles.memberRole}>Student at MIT</p>
          </div>

          <div className={styles.teamMember}>
            <img 
              src="/carol_smith.jpg"
              alt="Carol Smith"
              className={styles.memberImage}
            />
            <h3 className={styles.memberName}>Carol Smith</h3>
            <p className={styles.memberRole}>Student at Williams College</p>
          </div>
          <div className={styles.teamMember}>
            <img 
              src="/dan_qi.jpg"
              alt="Dan Qi"
              className={styles.memberImage}
            />
            <h3 className={styles.memberName}>Dan Qi</h3>
            <p className={styles.memberRole}>Student at Pomona college</p>
          </div>
        </div>
      </section> */}
    </>
  )
}
