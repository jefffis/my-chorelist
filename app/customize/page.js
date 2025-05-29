'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AddChoreForm from '../components/AddChoreForm';
import CustomChoreList from '../components/CustomChoreList';
import styles from './customize.module.css';

export default function CustomizePage() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if user has onboarded
    const hasOnboarded = localStorage.getItem('Has onboarded');
    if (!hasOnboarded) {
      router.push('/onboarding');
    } else {
      setIsReady(true);
    }
  }, [router]);

  if (!isReady) return null;

  return (
    <>
      <header className={styles.header}>
        <Link href="/" className={styles.backButton}>
          ← Back to All Chores
        </Link>
      </header>
      <main className={styles.main}>
        <h1 className={styles.title}>Customize Your Chores</h1>
        <AddChoreForm />
        <CustomChoreList />
      </main>
    </>
  );
} 