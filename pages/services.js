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
          designed to elevate your application. Let our experienced professionals guide you through
          every step—from selecting the right institutions to crafting compelling essays—ensuring
          you present your best self to top U.S. colleges and universities.
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
          <button className={styles.bookButton}>Book now</button>
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
          <button className={styles.bookButton}>Book now</button>
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
          <button className={styles.bookButton}>Book now</button>
        </div>
      </section>

      {/*  Free Consultation Button  */}
      <div className={styles.consultationContainer}>
        <button className={styles.freeConsultationButton}>Book free consultation</button>
      </div>

      {/*  Contact Section with Wave & 2-column layout  */}
      <section className={styles.contactSection}>
        <div className={styles.contactContent}>
          {/* Left Side: Intro */}
          <div className={styles.contactIntro}>
            <h2>Contact us</h2>
            <p>
              Interested in working together? Fill out some info and we will
              be in touch shortly. We can’t wait to hear from you!
            </p>
          </div>

          {/* Right Side: Form */}
          <form className={styles.contactForm}>
            {/* Name Row */}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="firstName">
                  First Name <span style={{ color: '#ff5555' }}>(required)</span>
                </label>
                <input
                  id="firstName"
                  type="text"
                  required
                  placeholder="First Name"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="lastName">
                  Last Name <span style={{ color: '#ff5555' }}>(required)</span>
                </label>
                <input
                  id="lastName"
                  type="text"
                  required
                  placeholder="Last Name"
                />
              </div>
            </div>

            {/* Email */}
            <div className={styles.formRow}>
              <div className={styles.formGroupFull}>
                <label htmlFor="email">
                  Email <span style={{ color: '#ff5555' }}>(required)</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="Your Email"
                />
              </div>
            </div>

            {/* Sign up checkbox */}
            <div className={styles.formRow}>
              <div className={styles.signupGroup}>
                <input
                  id="newsUpdates"
                  type="checkbox"
                />
                <label htmlFor="newsUpdates">Sign up for news and updates</label>
              </div>
            </div>

            {/* Message */}
            <div className={styles.formRow}>
              <div className={styles.formGroupFull}>
                <label htmlFor="message">
                  Message <span style={{ color: '#ff5555' }}>(required)</span>
                </label>
                <textarea
                  id="message"
                  rows="5"
                  required
                  placeholder="Your message here"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}
