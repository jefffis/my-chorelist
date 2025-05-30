'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import Link from 'next/link';
import AddChoreForm from '../components/AddChoreForm';
import CustomChoreList from '../components/CustomChoreList';
import styles from './customize.module.css';

export default function CustomizePage() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [avatar, setAvatar] = useState('/images/logo--holder.png');
  const [name, setName] = useState('');

  useEffect(() => {
    // Check if user has onboarded
    const hasOnboarded = localStorage.getItem('Has onboarded');
    const savedAvatar = localStorage.getItem('App icon');
    if (!hasOnboarded) {
      router.push('/onboarding');
    } else {
      setIsReady(true);
    }
    setName(localStorage.getItem('My name') || '');
    // if (savedAvatar) {
    //   setAvatar(savedAvatar);
    // }
  }, [router]);

  if (!isReady) return null;

  return (
    <>
      <header className={`${styles.header} cf`}>
        <div className={styles.container}>
          <h1 className={`${styles.title} fredoka`}>Customize</h1>
          <h2 className={`${styles.date} body`}>{name}&rsquo;s chores</h2>
          <Link href="/" className={styles.customizeLink}>
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>
        </div>
      </header>
      <main className={styles.container}>
        <AddChoreForm />
        <CustomChoreList />
      </main>
    </>
  );
} 