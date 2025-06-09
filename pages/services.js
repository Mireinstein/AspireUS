import React from 'react';
import Image from 'next/image';
import styles from '../styles/Services.module.css';

export default function Services() {
  return (
    <div className={styles.servicesContainer}>

      {/*  Hero / Intro Section  */}
      <section className={styles.servicesHero}>
        <h1>Our Services</h1>
        <p>
          Our services provide personalized advice, strategic solutions, and actionable insights
          designed to elevate your application. We will guide you through
          every step—from selecting the right institutions to crafting compelling essays—ensuring
          you present your best self to top U.S. colleges and universities.
          <p style={{ color: 'red', fontWeight: 'bold' }}>
            N.B : This is not a scholarship service, we do not provide scholarships. We help you apply to colleges that offer you scholarships.
          </p>
        </p>
      </section>

      {/*  Pricing Cards Section  */}
      <section className={styles.pricingSection}>
        {/* Hourly Consultation */}
        <div className={styles.pricingCard}>
          <Image 
            src="/hourlyimage.jpg" 
            alt="Hourly Consultation Image" 
            width={300} 
            height={200} 
            className={styles.cardImage}
          />
          <h2>Hourly Consultation</h2>
          <p className={styles.cardDescription}>
            Personalized, one-on-one sessions designed to tackle your specific questions and challenges.
          </p>
          <ul>
            <li>Focused discussion on your unique application needs</li>
            <li>Targeted feedback on essays and personal statements</li>
            <li>Guidance on interview preparation</li>
            <li>Q&#38;A session addressing any immediate concerns</li>
            <li>Follow-up recommendations and action items</li>
          </ul>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSf-Fx2aMZnFimO_ZcglaGWR9bIMbkrPqOogNdui1bFzHFOtOg/viewform">
           <button className={styles.bookButton}>Book now</button>
          </a>
        </div>

        {/* Per College Support */}
        <div className={styles.pricingCard}>
          <Image 
            src="/percollegeimage.jpg" 
            alt="Per College Support Image" 
            width={300} 
            height={200} 
            className={styles.cardImage}
          />
          <h2>Per College support</h2>
          <p className={styles.cardDescription}>
            Tailored assistance focused on maximizing the impact of your application for a specific college.
          </p>
          <ul>
            <li>Detailed review of a single college application</li>
            <li>Custom essay editing and targeted feedback</li>
            <li>Advice on highlighting strengths tailored to the college’s requirements</li>
            <li>Interview coaching specific to the institution</li>
            <li>Recommendations on supplemental materials</li>
            <li>A personalized action plan to enhance your application</li>
          </ul>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSf-Fx2aMZnFimO_ZcglaGWR9bIMbkrPqOogNdui1bFzHFOtOg/viewform">
           <button className={styles.bookButton}>Book now</button>
          </a>
        </div>

        {/* Comprehensive Support */}
        <div className={styles.pricingCard}>
          <Image 
            src="/comprehensiveimage.jpg" 
            alt="Comprehensive Support Image" 
            width={300} 
            height={200} 
            className={styles.cardImage}
          />
          <h2>Comprehensive support</h2>
          <p className={styles.cardDescription}>
            An end-to-end service covering every step of your college application journey for up to five institutions.
          </p>
          <ul>
            <li>Customized college selection and research</li>
            <li>Detailed application timeline and planning</li>
            <li>In-depth essay and personal statement review</li>
            <li>Guidance on recommendation letters and supplemental materials</li>
            <li>Mock interviews and personalized coaching</li>
            <li>Regular check-ins and progress tracking</li>
            <li>Access to checklists, templates, and additional resources</li>
          </ul>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSf-Fx2aMZnFimO_ZcglaGWR9bIMbkrPqOogNdui1bFzHFOtOg/viewform">
           <button className={styles.bookButton}>Book now</button>
          </a>
        </div>
      </section>

      {/*  Free Consultation Button  */}
      <div className={styles.consultationContainer}>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSf-Fx2aMZnFimO_ZcglaGWR9bIMbkrPqOogNdui1bFzHFOtOg/viewform">
        <button className={styles.freeConsultationButton}>Apply</button>
        </a>
      </div>

    </div>
  );
}
