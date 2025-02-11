// src/components/Auth/SignupForm.jsx
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useRouter } from 'next/router';

const SignupForm = () => {
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
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
