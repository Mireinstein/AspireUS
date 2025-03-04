import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import styles from '../styles/About.module.css'

export default function About() {
  // Optional: form state management
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    signup: false,
    message: ''
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Add form submission logic here
    alert('Form submitted!')
  }

  return (
    <div className={styles.aboutContainer}>
      {/* ---- ABOUT SECTION ---- */}
      <section className={styles.aboutSection}>
        
        {/* LEFT COLUMN: Image */}
        <div className={styles.imageWrapper}>
          {/*
            IMPORTANT:
            1) Use layout="fill" to let the image fill the wrapper.
            2) objectFit="cover" ensures the image covers the entire area,
               cropping if necessary to maintain aspect ratio.
            3) Remove any width/height props because layout="fill" uses the
               parent's dimensions.
          */}
          <Image
            src="/aboutus.jpg"
            alt="Group of graduates throwing caps"
            layout="fill"
            objectFit="cover"
            priority
            className={styles.aboutImage}
          />
        </div>

        {/* RIGHT COLUMN: Story text */}
        <div className={styles.storyWrapper}>
          <h1 className={styles.title}>Who we are</h1>
          <p>
            I’m a proud Zimbabwean student of Amherst College, and my own 
            college journey was transformed by the support I received from 
            EdUSA. However, I quickly learned that not everyone has access 
            to the same level of guidance—and not every student secures the 
            opportunities they deserve.
          </p>
          <p>
            Drawing from my personal experience of overcoming challenges 
            and my deep passion to make a difference, I founded 
            <strong> AspireUSA Academy</strong>. My vision is simple: to 
            empower Zimbabwean students to gain admission to U.S. institutions 
            of their choice, regardless of their starting point.
          </p>
          <h3>My Background:</h3>
          <p>
            I come from an underprivileged background, and I know firsthand 
            the hurdles that can stand between ambition and achievement. 
            This has driven me to create a program that levels the playing 
            field for those who might otherwise be overlooked.
          </p>
          <h3>Our Mission:</h3>
          <p>
            At AspireUSA Academy, we believe in offering tailored, expert 
            guidance every step of the way—from selecting the right 
            institutions to crafting standout applications. While our core 
            commitment is to support every aspiring student, we also offer 
            premium, personalized services for those who seek additional, 
            in-depth assistance. Our aim is to provide a range of options 
            so that all students can find the support they need, whether 
            they are navigating financial challenges or simply looking for 
            extra insights.
          </p>
          <h3>Why AspireUSA Academy?</h3>
          <ul>
            <li>
              <strong>Proven Experience:</strong> I’ve been where you are, 
              and I’ve seen the difference expert guidance can make.
            </li>
            <li>
              <strong>Tailored Support:</strong> We design our services to 
              match your unique needs and aspirations.
            </li>
            <li>
              <strong>Inclusive Excellence:</strong> We are committed to 
              supporting students from every walk of life, ensuring that 
              passion and potential are never limited by background.
            </li>
          </ul>
          <p>
            Join us at AspireUSA Academy, and let’s transform your college 
            application journey into a pathway for success.
          </p>
          <Link href="/services">
            <button className={styles.browseButton}>Browse Our Services</button>
          </Link>
        </div>
      </section>

      {/* ---- CONTACT SECTION ---- */}
      <section className={styles.contactSection}>
        <div className={styles.contactContent}>

          {/* LEFT: Contact intro text */}
          <div className={styles.contactIntro}>
            <h2>Contact us</h2>
            <p>
              Interested in working together? Fill out some info and we will 
              be in touch shortly. We can’t wait to hear from you!
            </p>
          </div>

          {/* RIGHT: Contact form */}
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="firstName">First Name (required)</label>
                <input 
                  type="text" 
                  id="firstName" 
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="lastName">Last Name (required)</label>
                <input 
                  type="text" 
                  id="lastName" 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email (required)</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className={styles.signupGroup}>
                <input 
                  type="checkbox" 
                  id="signup" 
                  name="signup" 
                  checked={formData.signup}
                  onChange={handleChange}
                />
                <label htmlFor="signup">Sign up for news and updates</label>
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroupFull}>
                <label htmlFor="message">Message (required)</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
