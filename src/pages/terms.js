import Head from 'next/head';
import styles from '../styles/terms.module.css';

export default function Terms() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Terms and Conditions - AspireUS</title>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Terms and Conditions</h1>
        <p className={styles.lastUpdated}>Last Updated: 14 February 2025</p>
        
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>1. Acceptance of Terms</h2>
          <p className={styles.paragraph}>
            By accessing and using the AspireUS platform (“Platform”), you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to these terms, please do not use the Platform.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>2. Description of Services</h2>
          <p className={styles.paragraph}>
            AspireUS connects college applicants with qualified college advisors and SAT tutors. While we strive to offer high-quality connections, the Platform is an intermediary and does not guarantee the accuracy, reliability, or suitability of the services provided by third-party advisors or tutors.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>3. Account Registration and Security</h2>
          <p className={styles.paragraph}>
            Users must register and provide accurate, complete information when creating an account. Your verified email (provided during Azure B2C authentication) and additional profile details help ensure a secure and trusted community. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>4. User Conduct</h2>
          <p className={styles.paragraph}>
            You agree to use the Platform only for lawful purposes. Prohibited activities include, but are not limited to, harassment, defamation, posting false information, or any behavior that may harm other users or the integrity of the Platform. AspireUS reserves the right to suspend or terminate accounts that violate these terms.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>5. Intellectual Property</h2>
          <p className={styles.paragraph}>
            All content on the Platform, including logos, graphics, text, and software, is the property of AspireUS or its licensors and is protected by intellectual property laws. Unauthorized reproduction, distribution, or commercial use of such content is prohibited.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>6. Disclaimers and Limitation of Liability</h2>
          <p className={styles.paragraph}>
            The Platform is provided "as is" without any warranties, express or implied. AspireUS does not endorse or guarantee the services provided by third-party advisors or tutors. In no event shall AspireUS be liable for any indirect, incidental, or consequential damages arising from your use of the Platform.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>7. Indemnification</h2>
          <p className={styles.paragraph}>
            You agree to indemnify and hold harmless AspireUS, its affiliates, and its officers from any claims, damages, or expenses arising from your use of the Platform or your violation of these Terms.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>8. Modifications to the Terms</h2>
          <p className={styles.paragraph}>
            AspireUS reserves the right to modify or update these Terms at any time. Any changes will be effective immediately upon posting on the Platform. Your continued use of the Platform after changes have been posted constitutes your acceptance of the new Terms.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>9. Governing Law</h2>
          <p className={styles.paragraph}>
            These Terms are governed by and construed in accordance with the laws of [Your Jurisdiction]. Any disputes arising out of these Terms will be subject to the exclusive jurisdiction of the courts in that region.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>10. Termination</h2>
          <p className={styles.paragraph}>
            AspireUS reserves the right to suspend or terminate your access to the Platform at any time, with or without notice, for any reason, including violations of these Terms.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>11. Contact Information</h2>
          <p className={styles.paragraph}>
            If you have any questions or concerns regarding these Terms, please contact us at <a href="mailto:info@aspireorg.com">contact@aspireus.com</a>.
          </p>
        </section>
      </main>
    </div>
  );
}
