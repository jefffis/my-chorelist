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
    <div className={styles.intro}>
      <div className={styles.introContent}>
        {step === 1 ? (
          <div className={styles.introStep}>
            <h1 className={`h1 fredoka`}>Hi there 👋</h1>
            <p className={`body--large`}>Welcome to <strong>My Chorelist</strong>!<br />What&rsquo;s your name?</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.introName}
            />
            <button
              onClick={handleNameSubmit}
              disabled={!name.trim()}
              className={`btn`}
            >
              Next, pick an image 👉
            </button>
          </div>
        ) : (
          <div className={styles.introStep}>
            <h1 className={`h1 fredoka`}>Welcome {name}!</h1>
            <p className={`body--large`}>Let&rsquo;s pick an icon for you 👇</p>
            <div className={`${styles.introImages} mar-bot--8`}>
              <div className={`grid grid--2 grid-gap--12`}>
                {['icon--music.png', 'icon--bird.png', 'icon--horse.png', 'icon--panda.png'].map((icon) => (
                  <img
                    key={icon}
                    src={`/images/${icon}`}
                    alt=""
                    tabIndex="0"
                    onClick={() => handleAvatarSelect(`/images/${icon}`)}
                    className={styles.appIcon}
                  />
                ))}
              </div>
            </div>
            <button
              onClick={handleFinish}
              disabled={!avatar}
              className={`btn`}
            >
              Let&rsquo;s get started 💪
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
