'use client';

import { useState } from 'react';
import styles from './SuccessMessage.module.css';

export default function SuccessMessage({ type, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for fade out animation
  };

  if (!isVisible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <img src="/images/yayay.gif" alt="Celebration" className={styles.image} />
        <h2 className={styles.title}>Great job! 🎉</h2>
        <p className={styles.message}>You completed all your {type} chores!</p>
        <button onClick={handleClose} className={styles.button}>
          Keep it up! 💪
        </button>
      </div>
    </div>
  );
}
