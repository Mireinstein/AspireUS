// pages/signup.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import styles from '../styles/Login.module.css'; // Reuse the same styling

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/dashboard'); // Redirect to dashboard on successful signup
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <video className={styles.videoBackground} autoPlay loop muted playsInline>
        {/* TODO: slideshow background of US colleges */}
      </video>
      <div className={styles.overlay}></div>
      <div className={styles.formContainer}>
        <h1>Join AspireUS</h1>
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
          <button type="submit" className={styles.button}>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
