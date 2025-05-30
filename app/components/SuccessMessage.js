'use client';

import { useState } from 'react';
import styles from './SuccessMessage.module.css';

export default function SuccessMessage({ type, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    // setTimeout(onClose, 300); // Wait for fade out animation
  };

  if (!isVisible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.content}>
          <img src="/images/yayay.gif" alt="Celebration" className={styles.image} />
          <h2 className={`h1 fredoka`}>Way to go 💪</h2>
          <p className={`body--large mar-bot--24`}>You completed your {type} chores&mdash;now give yourself a high five 🙌</p>
          <button onClick={handleClose} className={`btn`}>
            Done for now
          </button>
        </div>
      </div>
    </div>
  );
}
