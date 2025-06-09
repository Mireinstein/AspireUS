import React from "react";
import styles from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Left Section */}
        <div className={styles.leftSection}>
          {/* Logo / Brand Name */}
          <h2 className={styles.brandName}>
            <span className={styles.brandBlue}>Aspire</span>
            <span className={styles.brandRed}>USA</span>
          </h2>
          
          {/* Links */}
          <div className={styles.linkGroup}>
            <a href="/about" className={styles.footerLink}>About</a>
            <a href="/contact" className={styles.footerLink}>Contact</a>
            <a href="#follow" className={styles.footerLink}>Follow</a>
          </div>

          {/* Contact Info */}
          {/* <p className={styles.contactInfo}>admiretmadyira@gmail.com</p> */}
          {/* <p className={styles.contactInfo}>(555) 555-5555</p> */}
        </div>

        {/* Right Section */}
        <div className={styles.rightSection}>
          <h3 className={styles.subscribeTitle}>Subscribe</h3>
          <p className={styles.subscribeText}>
            Sign up with your email address to receive news and updates.
          </p>

          {/* Subscription Form */}
          <form className={styles.subscribeForm}>
            <input
              type="email"
              placeholder="Email Address"
              className={styles.emailInput}
            />
            <button type="submit" className={styles.signUpButton}>
              Sign Up
            </button>
          </form>

          <p className={styles.privacyNotice}>We respect your privacy.</p>
        </div>
      </div>
    </footer>
  );
}
