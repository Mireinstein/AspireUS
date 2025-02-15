import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../styles/getStarted.module.css';

export default function GetStarted() {
  const router = useRouter();
  const { id: userId, email: userEmail } = router.query;

  const [countries, setCountries] = useState([]);
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [countriesError, setCountriesError] = useState(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    phone: '',
    role: '',
    address: '',
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [phoneVerificationMessage, setPhoneVerificationMessage] = useState('');

  // Fetch countries from the API
  useEffect(() => {
    fetch('https://restcountries.com/v2/all')
      .then((res) => res.json())
      .then((data) => {
        // Extract only the name property from each country object
        const countryNames = data.map((country) => country.name).sort();
        setCountries(countryNames);
        setCountriesLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching countries:', err);
        setCountriesError('Failed to load countries');
        setCountriesLoading(false);
      });
  }, []);

  const validate = () => {
    let tempErrors = {};
    if (!formData.firstName) tempErrors.firstName = 'First name is required';
    if (!formData.lastName) tempErrors.lastName = 'Last name is required';
    if (!userEmail) tempErrors.email = 'Email is required';
    if (!formData.country) tempErrors.country = 'Country is required';
    if (!formData.phone) tempErrors.phone = 'Phone number is required';
    if (!phoneVerified) tempErrors.phoneVerified = 'Please verify your phone number';
    if (!formData.role) tempErrors.role = 'Role selection is required';
    if (!formData.address) tempErrors.address = 'Address is required';
    if (!formData.termsAccepted) tempErrors.termsAccepted = 'You must accept the terms and conditions';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleVerifyPhone = () => {
    // Basic regex for digits only, 10 to 15 digits long.
    const phoneRegex = /^[0-9]{10,15}$/;
    if (phoneRegex.test(formData.phone)) {
      setPhoneVerified(true);
      setPhoneVerificationMessage('Phone number verified!');
    } else {
      setPhoneVerified(false);
      setPhoneVerificationMessage('Invalid phone number. Please enter 10-15 digits.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      id: userId,
      email: userEmail,
      ...formData,
    };
    // TODO:Uncomment this after creating the registerUser API and remove the dummy flow 
    // try {
    //   const res = await fetch(`/api/registerUser?role=${formData.role}`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(payload),
    //   });
    //   if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    //   // Redirect based on role
    //   if (formData.role === 'student') {
    //     router.push(`/studentDashboard?id=${userId}&email=${encodeURIComponent(userEmail)}`);
    //   } else if (formData.role === 'tutor') {
    //     router.push(`/tutorDashboard?id=${userId}&email=${encodeURIComponent(userEmail)}`);
    //   } else if (formData.role === 'advisor') {
    //     router.push(`/advisorDashboard?id=${userId}&email=${encodeURIComponent(userEmail)}`);
    //   }
    // } catch (error) {
    //   console.error('Registration error:', error);
    //   alert('Registration failed. Please try again.');
    // }
    router.push(`/advisorDashboard?id=${userId}&email=${encodeURIComponent(userEmail)}`);

  };

  return (
    <div className={styles.container}>
      <Head>
        <title>AspireUS - Get Started</title>
        <meta
          name="description"
          content="Join AspireUS and build your profile to connect with college advisors and tutors."
        />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.welcomeMessage}>Welcome to AspireUS</h1>
        <p className={styles.brandMessage}>
          Build your profile to unlock your future. Whether you're a student, tutor, or advisor, join our community and connect with experts.
        </p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            First Name: <span className={styles.required}>*</span>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
          </label>
          <label>
            Last Name: <span className={styles.required}>*</span>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
            {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
          </label>
          <label>
            Verified Email:
            <input type="email" name="email" value={userEmail || ''} disabled />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </label>
          <label>
            Country: <span className={styles.required}>*</span>
            {countriesLoading ? (
              <p>Loading countries...</p>
            ) : countriesError ? (
              <p className={styles.error}>{countriesError}</p>
            ) : (
              <select name="country" value={formData.country} onChange={handleChange} required>
                <option value="">-- Select Country --</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            )}
            {errors.country && <span className={styles.error}>{errors.country}</span>}
          </label>
          <label>
            Phone Number: <span className={styles.required}>*</span>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            <button type="button" onClick={handleVerifyPhone} className={styles.verifyButton}>
              Verify Phone
            </button>
            {phoneVerificationMessage && <span className={styles.verificationMessage}>{phoneVerificationMessage}</span>}
            {errors.phone && <span className={styles.error}>{errors.phone}</span>}
            {errors.phoneVerified && <span className={styles.error}>{errors.phoneVerified}</span>}
          </label>
          <label>
            Role: <span className={styles.required}>*</span>
            <select name="role" value={formData.role} onChange={handleChange} required>
              <option value="">-- Select Role --</option>
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
              <option value="advisor">Advisor</option>
            </select>
            {errors.role && <span className={styles.error}>{errors.role}</span>}
          </label>
          <label>
            Address: <span className={styles.required}>*</span>
            <textarea name="address" value={formData.address} onChange={handleChange} required />
            {errors.address && <span className={styles.error}>{errors.address}</span>}
          </label>
          <label className={styles.termsLabel}>
            <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} required />
            <span>
              I accept the <a href="/terms">Terms and Conditions</a> <span className={styles.required}>*</span>
            </span>
            {errors.termsAccepted && <span className={styles.error}>{errors.termsAccepted}</span>}
          </label>

          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      </main>
    </div>
  );
}
