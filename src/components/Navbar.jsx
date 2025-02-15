// src/components/Common/Navbar.jsx
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <Image 
            src="/aspireUS.svg" 
            alt="AspireUS Logo" 
            width={200}
            height={75}    
          />
        </Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/collegePrep.js">College Prep</Link>
        </li>
        <li>
          <Link href="/satPrep.js">SAT Prep</Link>
        </li>
        <li>
          <Link href="/about.js">About</Link>
        </li>
        <li>
          <Link href="/founder.js">Meet Our Found</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
