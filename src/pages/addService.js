import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../styles/addservice.module.css';

export default function AddService() {
  const router = useRouter();
  const { email: userEmail } = router.query;
  const [formData, setFormData] = useState({
    serviceType: '', // Now a select dropdown with "College Prep" and "SAT Prep"
    description: '',
    price: '',
    calendlyEmail: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle changes to form inputs.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission to add a new service.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // --- Dummy API Simulation Start ---
    // TODO: Replace this dummy simulation with an actual API call that writes to your Azure Storage table.
    setTimeout(() => {
      setSuccess('Service added successfully!');
      setLoading(false);
      // Navigate back to dashboard (or previous page)
      router.push('/dashboard');
    }, 1000);
    // --- Dummy API Simulation End ---

    /*
    // --- Production Code Start ---
    // TODO: Uncomment and update the API endpoint as needed.
    try {
      const res = await fetch('/api/addService', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, userEmail }),
      });
      if (!res.ok) throw new Error('Error adding service');
      const data = await res.json();
      setSuccess('Service added successfully!');
      // Navigate back to dashboard (previous page)
      router.push('/dashboard');
    } catch (err) {
      setError(err.message || 'Error adding service');
    } finally {
      setLoading(false);
    }
    // --- Production Code End ---
    */
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Add Service - AspireUS</title>
        <meta name="description" content="Add a new service to your profile" />
      </Head>
      <header className={styles.header}>
        <h1>Add a Service</h1>
      </header>
      <form onSubmit={handleSubmit} className={styles.serviceForm}>
        <label>
          Service Type:
          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            required
          >
            <option value="">Select service</option>
            <option value="college">College Prep</option>
            <option value="sat">SAT Prep</option>
          </select>
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your service"
            required
          />
        </label>
        <label>
          Price:
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="e.g., $50/hr"
            required
          />
        </label>
        <label>
          Calendly Email:
          <input
            type="email"
            name="calendlyEmail"
            value={formData.calendlyEmail}
            onChange={handleChange}
            placeholder="your.calendly@example.com"
            required
          />
        </label>
        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? 'Adding Service...' : 'Add Service'}
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
    </div>
  );
}
