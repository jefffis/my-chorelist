'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Onboarding.module.css';

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');

  const handleNameSubmit = () => {
    if (name.trim()) {
      localStorage.setItem('My name', name);
      setStep(2);
    }
  };

  const handleAvatarSelect = (src) => {
    setAvatar(src);
    localStorage.setItem('App icon', src);
  };

  const handleFinish = () => {
    localStorage.setItem('Has onboarded', true);
    router.push('/');
  };

  return (
    <div className={styles.container}>
      {step === 1 ? (
        <div className={styles.step}>
          <h1 className={styles.title}>Hi there 👋</h1>
          <p className={styles.subtitle}>Welcome to <strong>My Chorelist</strong>!<br />What&rsquo;s your name?</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            placeholder="Enter your name"
          />
          <button
            onClick={handleNameSubmit}
            disabled={!name.trim()}
            className={styles.button}
          >
            Next, pick an image 👉
          </button>
        </div>
      ) : (
        <div className={styles.step}>
          <h1 className={styles.title}>Welcome {name}!</h1>
          <p className={styles.subtitle}>Let&rsquo;s pick an icon for you 👇</p>
          <div className={styles.avatarGrid}>
            {['icon--music.png', 'icon--bird.png', 'icon--horse.png', 'icon--panda.png'].map((icon) => (
              <img
                key={icon}
                src={`/images/${icon}`}
                alt=""
                onClick={() => handleAvatarSelect(`/images/${icon}`)}
                className={`${styles.avatar} ${avatar === `/images/${icon}` ? styles.selected : ''}`}
              />
            ))}
          </div>
          <button
            onClick={handleFinish}
            disabled={!avatar}
            className={styles.button}
          >
            Let&rsquo;s get started 💪
          </button>
        </div>
      )}
    </div>
  );
}
