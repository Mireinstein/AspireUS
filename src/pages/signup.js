import { useState } from 'react';
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../lib/firebase';
import BackgroundPhoto from '../components/Common/BackgroundPhoto';
import styles from '../styles/signup.module.css'; 

const SignupPage = () => {
  const router = useRouter();

  // Account Information
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Personal Information
  const [legalFirstName, setLegalFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  // Contact Details
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  // Terms of Use
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    // Validate required fields
    if (!legalFirstName || !lastName || !dateOfBirth || !phone || !address) {
      alert('Please fill in all required fields.');
      return;
    }
    if (!acceptTerms) {
      alert('Please accept the Terms of Use.');
      return;
    }
    // Validate phone number: must start with a plus sign, followed by 1-3 digits (country code), then exactly 9 digits.
    const phonePattern = /^\+\d{1,3}\d{9}$/;
    if (!phonePattern.test(phone)) {
      alert('Please enter a valid phone number in the format: +[CountryCode][9-digit number].');
      return;
    }

    try {
      // Create user with Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update user profile with legal first and last name.
      await updateProfile(userCredential.user, {
        displayName: `${legalFirstName} ${lastName}`
      });
      // Redirect on success.
      router.push('/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <BackgroundPhoto />
      <div className={styles.formContainer}>
        <h1>Create Your Account</h1>
        <form onSubmit={handleSubmit} className={styles.commonAppForm}>
          {/* ACCOUNT INFORMATION */}
          <h2>Account information</h2>
          <div className={styles.fieldGroup}>
            <label htmlFor="email">Email Address *</label>
            <input
              id="email"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.inputField}
              required
            />
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="password">Password *</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.inputField}
              required
            />
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="confirmPassword">Re-type Password *</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Re-type Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.inputField}
              required
            />
          </div>

          {/* PERSONAL INFORMATION */}
          <h2>Personal information</h2>
          <div className={styles.fieldGroup}>
            <label htmlFor="legalFirstName">Legal first/given name *</label>
            <input
              id="legalFirstName"
              type="text"
              placeholder="Enter your name exactly as on official documents"
              value={legalFirstName}
              onChange={(e) => setLegalFirstName(e.target.value)}
              className={styles.inputField}
              required
            />
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="lastName">Last/family/surname *</label>
            <input
              id="lastName"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={styles.inputField}
              required
            />
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="dob">Date of birth *</label>
            <input
              id="dob"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className={styles.inputField}
              required
            />
          </div>

          {/* CONTACT DETAILS */}
          <h2>Contact details</h2>
          <div className={styles.fieldGroup}>
            <label htmlFor="phone">Phone number *</label>
            <input
              id="phone"
              type="tel"
              placeholder="e.g. +1123456789"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={styles.inputField}
              pattern="^\+\d{1,3}\d{9}$"
              title="Enter phone number with country code, e.g. +1123456789 (country code 1 and 9 digits)"
              required
            />
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="address">Permanent home address *</label>
            <input
              id="address"
              type="text"
              placeholder="Street, city, zip, country"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={styles.inputField}
              required
            />
          </div>

          {/* TERMS OF USE */}
          <div className={styles.checkboxGroup}>
            <input
              id="terms"
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              required
            />
            <label htmlFor="terms">
              By checking this box, I agree to the{' '}
              <a href="/terms" target="_blank" rel="noopener noreferrer">
                terms of use
              </a>.
            </label>
          </div>

          {/* SUBMIT BUTTON */}
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.submitButton}>
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
