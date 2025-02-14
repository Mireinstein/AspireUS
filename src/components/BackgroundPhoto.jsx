import React from 'react';
import styles from '../styles/background.module.css';

const BackgroundPhoto = () => {
  return (
    <div 
      className={styles.background} 
      style={{ backgroundImage: 'url(/background-photo.jpg)' }}
    />
  );
};

export default BackgroundPhoto;
