'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('/images/logo--holder.png');

  useEffect(() => {
    setName(localStorage.getItem('My name') || '');
    const savedAvatar = localStorage.getItem('App icon');
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <img src={avatar} alt="User avatar" className={styles.logo} />
        <h1 className={styles.title}>{name}&rsquo;s Chores</h1>
        <h2 className={styles.date}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h2>
        <Link href="/customize" className={styles.customizeLink}>
          Customize
        </Link>
      </div>
    </header>
  );
}
