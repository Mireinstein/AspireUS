// pages/book.js
import React, { useState } from 'react';
import styles from '../styles/Book.module.css';

export default function Booking() {
  // Initialize state for the form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    serviceType: '',
    bookingDate: '',
    bookingTime: '',
    message: '',
  });

  // Handle input changes for all fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Do the actual booking
    console.log('Booking submitted:', formData);
    alert('Thank you for your booking! We will be in touch shortly.');
    
    // Optionally, reset the form:
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      serviceType: '',
      bookingDate: '',
      bookingTime: '',
      message: '',
    });
  };

  return (
    <div className={styles.bookingContainer}>
      <h1>Book a Consultation</h1>
      <form className={styles.bookingForm} onSubmit={handleSubmit}>
        {/* First Name */}
        <div className={styles.formGroup}>
          <label htmlFor="firstName">
            First Name <span style={{ color: '#ff5555' }}>(required)</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            placeholder="Your first name"
          />
        </div>
        {/* Last Name */}
        <div className={styles.formGroup}>
          <label htmlFor="lastName">
            Last Name <span style={{ color: '#ff5555' }}>(required)</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            placeholder="Your last name"
          />
        </div>
        {/* Email */}
        <div className={styles.formGroup}>
          <label htmlFor="email">
            Email <span style={{ color: '#ff5555' }}>(required)</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Your email address"
          />
        </div>
        {/* Phone Number */}
        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your phone number"
          />
        </div>
        {/* Service Type */}
        <div className={styles.formGroup}>
          <label htmlFor="serviceType">
            Service Type <span style={{ color: '#ff5555' }}>(required)</span>
          </label>
          <select
            id="serviceType"
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            required
          >
            <option value="">Select a Service</option>
            <option value="hourly">Hourly Consultation</option>
            <option value="perCollege">Per College Support</option>
            <option value="comprehensive">Comprehensive Support</option>
          </select>
        </div>
        {/* Booking Date */}
        <div className={styles.formGroup}>
          <label htmlFor="bookingDate">
            Booking Date <span style={{ color: '#ff5555' }}>(required)</span>
          </label>
          <input
            type="date"
            id="bookingDate"
            name="bookingDate"
            value={formData.bookingDate}
            onChange={handleChange}
            required
          />
        </div>
        {/* Additional Message */}
        <div className={styles.formGroup}>
          <label htmlFor="message">Additional Details</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            placeholder="Any additional information you'd like to share"
          />
        </div>
        {/* Submit Button */}
        <button type="submit" className={styles.submitButton}>
          Submit Booking
        </button>
      </form>
    </div>
  );
}
