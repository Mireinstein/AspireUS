import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../styles/bookservice.module.css';

export default function BookService() {
  const router = useRouter();
  const { email: studentEmail } = router.query;

  // Form state for booking criteria
  const [formData, setFormData] = useState({
    serviceType: '',
    subOption: '',
  });
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Helper: Render star rating as a string of stars
  const renderStars = (rating) => {
    const rounded = Math.round(rating);
    const fullStars = '★'.repeat(rounded);
    const emptyStars = '☆'.repeat(5 - rounded);
    return fullStars + emptyStars;
  };

  // Handle form submission: search for matching providers
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // --- Dummy API Response Start ---
    // TODO: Replace this dummy response with a real API call to search your Azure Storage table.
    const dummyProfiles = [
      {
        id: "1",
        name: "Provider One",
        role: formData.serviceType === "sat" ? "Tutor" : "Advisor",
        fee: "$50",
        rating: 4.5,
        bio: "Experienced professional with over 10 years in the field.",
        profilePhoto: "https://via.placeholder.com/100",
      },
      {
        id: "2",
        name: "Provider Two",
        role: formData.serviceType === "sat" ? "Tutor" : "Advisor",
        fee: "$60",
        rating: 4.0,
        bio: "Dedicated expert with a proven track record in helping students succeed.",
        profilePhoto: "https://via.placeholder.com/100",
      },
    ];
    // Simulate API delay
    setTimeout(() => {
      setProfiles(dummyProfiles);
      setLoading(false);
    }, 1000);
    // --- Dummy API Response End ---
    
    /*
    // --- Production Code Start ---
    // TODO: Uncomment and update the API endpoint as needed.
    try {
      const res = await fetch('/api/searchProviders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, studentEmail }),
      });
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      setProfiles(data);
    } catch (err) {
      setError(err.message || 'Error fetching providers');
    } finally {
      setLoading(false);
    }
    // --- Production Code End ---
    */
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Book Service - AspireUS</title>
        <meta name="description" content="Book a service with AspireUS" />
      </Head>
      <header className={styles.header}>
        <h1>Book a Service</h1>
      </header>
      
      <form onSubmit={handleSubmit} className={styles.bookingForm}>
        <label>
          Service Type:
          <select name="serviceType" value={formData.serviceType} onChange={handleChange} required>
            <option value="">Select service</option>
            <option value="free">Free Consultation</option>
            <option value="college">College Prep</option>
            <option value="sat">SAT Prep</option>
          </select>
        </label>
        
        {formData.serviceType === 'free' && (
          <label>
            Consultation Type:
            <select name="subOption" value={formData.subOption} onChange={handleChange} required>
              <option value="">Select consultation type</option>
              <option value="college">College Prep</option>
              <option value="sat">SAT Prep</option>
            </select>
          </label>
        )}
        
        {formData.serviceType === 'college' && (
          <label>
            College Prep Option:
            <select name="subOption" value={formData.subOption} onChange={handleChange} required>
              <option value="">Select option</option>
              <option value="hourly">Hourly</option>
              <option value="single">Single Application</option>
              <option value="comprehensive">Comprehensive</option>
            </select>
          </label>
        )}
        
        {formData.serviceType === 'sat' && (
          <label>
            SAT Prep Option:
            <select name="subOption" value={formData.subOption} onChange={handleChange} required>
              <option value="">Select option</option>
              <option value="basic">Basic</option>
              <option value="intensive">Intensive</option>
            </select>
          </label>
        )}
        
        <button type="submit" className={styles.submitButton}>Search Providers</button>
      </form>
      
      {loading && <p className={styles.loading}>Loading providers...</p>}
      {error && <p className={styles.error}>{error}</p>}
      
      {profiles.length > 0 && (
        <section className={styles.profilesSection}>
          <h2>Available Providers</h2>
          <div className={styles.profilesList}>
            {profiles.map(profile => (
              <div key={profile.id} className={styles.profileCard}>
                <img src={profile.profilePhoto} alt={`${profile.name} profile`} className={styles.profilePhoto} />
                <h3>{profile.name}</h3>
                <p className={styles.rating}>{renderStars(profile.rating)}</p>
                <p className={styles.bio}>{profile.bio}</p>
                <p><strong>Role:</strong> {profile.role}</p>
                <p><strong>Fee:</strong> {profile.fee}</p>
                <button
                  className={styles.selectButton}
                  onClick={() => router.push(`/payment?providerId=${profile.id}&fee=${profile.fee}&email=${encodeURIComponent(studentEmail)}`)}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
