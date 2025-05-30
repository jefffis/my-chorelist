'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from './components/Header';
import ChoreList from './components/ChoreList';

export default function Home() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const hasOnboarded = localStorage.getItem('Has onboarded');
    if (!hasOnboarded) {
      router.push('/onboarding');
    } else {
      setIsReady(true);
    }
  }, [router]);

  if (!isReady) return null;

  return (
    <main>
      <Header />
      <ChoreList />
    </main>
  );
}
