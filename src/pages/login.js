// pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import styles from '../styles/Login.module.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard'); // Redirect to dashboard on successful login
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className={styles.container}>
      <video className={styles.videoBackground} autoPlay loop muted playsInline>
        {/* TODO: slideshow background of US colleges */}
      </video>
      <div className={styles.overlay}></div>
      <div className={styles.formContainer}>
        <h1>Welcome to AspireUS</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className={styles.inputField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.inputField}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
