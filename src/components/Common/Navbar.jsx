// src/components/Common/Navbar.jsx
import Link from 'next/link';
import styles from '../../styles/Navbar.module.css'; // Create this CSS module later

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <a>aspireus</a>
        </Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/dashboard">
            <a>Dashboard</a>
          </Link>
        </li>
        <li>
          <Link href="/login">
            <a>Login</a>
          </Link>
        </li>
        <li>
          <Link href="/signup">
            <a>Sign Up</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
