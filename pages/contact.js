import React from 'react';
import Image from 'next/image';
import styles from '../styles/Contact.module.css'; // Adjust import path if necessary

export default function ContactPage() {
  return (
    <div className={styles.contactContainer}>
      {/* LEFT SIDE CONTENT */}
      <div className={styles.contactLeft}>
        <h1 className={styles.contactHeading}>Contact Us</h1>
        
        <p className={styles.introText}>
          If you’re interested in collaborating, donating or joining the team at AspireUSA,
          please provide your information, and we will contact you soon.
          We look forward to connecting with you.
        </p>

        <a href="mailto:info@aspireUSA.academy" className={styles.emailLink}>
          info@aspireUSA.academy
        </a>
        <p className={styles.phoneNumber}>(555) 555-5555</p>

        <form className={styles.contactForm}>
          {/* NAME FIELDS */}
          <label className={styles.label}>
            Name <span className={styles.required}>(required)</span>
          </label>
          <div className={styles.nameFields}>
            <div className={styles.firstNameField}>
              <label className={styles.smallLabel}>First Name</label>
              <input type="text" name="firstName" className={styles.inputField} required />
            </div>
            <div className={styles.lastNameField}>
              <label className={styles.smallLabel}>Last Name</label>
              <input type="text" name="lastName" className={styles.inputField} required />
            </div>
          </div>

          {/* EMAIL */}
          <label className={styles.label}>
            Email <span className={styles.required}>(required)</span>
          </label>
          <input type="email" name="email" className={styles.inputField} required />

          {/* MESSAGE */}
          <label className={styles.label}>
            Message <span className={styles.required}>(required)</span>
          </label>
          <textarea name="message" className={styles.textArea} required />

          {/* SUBMIT BUTTON */}
          <button type="submit" className={styles.sendButton}>
            SEND
          </button>
        </form>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className={styles.contactRight}>
        <Image
          src="/contactusimage.jpg"
          alt="Contact Us Image"
          width={500}
          height={600}
          className={styles.contactImage}
        />
      </div>
    </div>
  );
}
