// src/components/Auth/LoginForm.jsx
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useRouter } from 'next/router';

const LoginForm = () => {
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
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email:</label>
      <input 
         type="email" 
         value={email} 
         onChange={(e) => setEmail(e.target.value)} 
         required 
      />
      <br />
      <label>Password:</label>
      <input 
         type="password" 
         value={password} 
         onChange={(e) => setPassword(e.target.value)} 
         required 
      />
      <br />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
