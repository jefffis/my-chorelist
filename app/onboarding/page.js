'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Onboarding from '../components/Onboarding';

export default function OnboardingPage() {
  const router = useRouter();
  const [isOnboarding, setIsOnboarding] = useState(false);

  useEffect(() => {
    const hasOnboarded = localStorage.getItem('Has onboarded');
    if (hasOnboarded) {
      router.push('/');
    } else {
      setIsOnboarding(true);
    }
  }, [router]);

  if (!isOnboarding) return null;

  return <Onboarding />;
}
