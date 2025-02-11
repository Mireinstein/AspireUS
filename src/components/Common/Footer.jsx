// src/components/Common/Footer.jsx
import styles from '../../styles/Footer.module.css'; // Create this CSS module later

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} aspireUS. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
