import React, { useState, useEffect } from 'react';
import styles from '../../styles/backgroundslideshow.module.css';

const images = [
  '/slideshow1.jpg',
  '/slideshow2.jpg',
  '/slideshow3.jpg',
  '/slideshow4.jpg',
  '/slideshow5.jpg',
  '/slideshow6.jpg',
  '/slideshow7.jpg',
  '/slideshow8.jpg',
  '/slideshow9.jpg',
  '/slideshow10.jpg'
];

const BackgroundSlideshow = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div 
      className={styles.slideshow} 
      style={{ backgroundImage: `url(${images[currentImage]})` }}
    ></div>
  );
};

export default BackgroundSlideshow;
