import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Header.module.css";

export default function Header() {
  return (
    <header className={styles.navbar}>
      {/* Logo Section */}
      <div className={styles.logoContainer}>
        <Link href="/">
          <Image 
            src="/aspireUS.svg" 
            alt="AspireUS Logo" 
            width={200}
            height={75}    
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className={styles.navMenu}>
        <Link href="/about" legacyBehavior>
          <a className={styles.navLink}>About</a>
        </Link>
        <Link href="/services" legacyBehavior>
          <a className={styles.navLink}>Services</a>
        </Link>
        <Link href="/contact" legacyBehavior>
          <a className={styles.navLink}>Contact</a>
        </Link>
        <Link href="/services" legacyBehavior>
          <a className={styles.bookBtn}>Book now</a>
        </Link>
      </nav>
    </header>
  );
}
