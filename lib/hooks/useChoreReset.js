'use client';

import { useEffect } from 'react';

export function useChoreReset(chores, setChores) {
  useEffect(() => {
    const checkAndResetChores = () => {
      const today = new Date();
      const isSunday = today.getDay() === 0;
      const lastReset = localStorage.getItem('Reset weekly on');
      const todayStr = today.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      });

      // Reset weekly chores on Sunday if not already reset today
      if (isSunday && lastReset !== todayStr) {
        const updatedChores = {
          ...chores,
          weekly: chores.weekly.map(chore => {
            localStorage.setItem(chore.key, 'false');
            return { ...chore, completed: false };
          })
        };
        localStorage.setItem('Reset weekly on', todayStr);
        setChores(updatedChores);
      }

      // Reset daily chores if it's a new day
      const lastDailyReset = localStorage.getItem('Chores done yesterday');
      if (lastDailyReset !== todayStr) {
        const updatedChores = {
          ...chores,
          daily: chores.daily.map(chore => {
            localStorage.setItem(chore.key, 'false');
            return { ...chore, completed: false };
          })
        };
        localStorage.setItem('Chores done yesterday', todayStr);
        setChores(updatedChores);
      }
    };

    // Check on mount and every minute
    checkAndResetChores();
    const interval = setInterval(checkAndResetChores, 60000);

    return () => clearInterval(interval);
  }, [chores, setChores]);
} 