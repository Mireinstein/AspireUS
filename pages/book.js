// pages/book.js
import React from 'react';

export default function Booking() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Book a Consultation</h1>
      <p>Please use the button below to complete your booking form:</p>
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSf-Fx2aMZnFimO_ZcglaGWR9bIMbkrPqOogNdui1bFzHFOtOg/viewform"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          padding: '1rem 2rem',
          backgroundColor: '#0070f3',
          color: '#fff',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}
      >
        Open Booking Form
      </a>
    </div>
  );
}
