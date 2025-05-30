'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
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
    <header className={`${styles.header} cf`}>
      <div className={styles.container}>
        <img src={avatar} alt="User avatar" className={styles.logo} />
        <h1 className={`${styles.title} fredoka`}>{name}&rsquo;s chores</h1>
        <h2 className={`${styles.date} body`}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h2>
        <Link href="/customize" className={styles.customizeLink}>
          <Cog6ToothIcon className="h-5 w-5" />
        </Link>
      </div>
    </header>
  );
}
