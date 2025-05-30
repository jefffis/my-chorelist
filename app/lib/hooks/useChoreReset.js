'use client';

import { useCallback } from 'react';

export default function useChoreReset() {
  const checkAndResetChores = useCallback((chores) => {
    const now = new Date();
    const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const currentHour = now.getHours();
    
    // Get last reset times from localStorage
    const lastDailyReset = localStorage.getItem('lastDailyReset');
    const lastWeeklyReset = localStorage.getItem('lastWeeklyReset');
    
    let hasChanges = false;
    const updatedChores = { ...chores };

    // Check daily reset (at midnight)
    if (!lastDailyReset || new Date(lastDailyReset).getDate() !== now.getDate()) {
      updatedChores.daily = chores.daily.map(chore => ({
        ...chore,
        completed: false
      }));
      localStorage.setItem('lastDailyReset', now.toISOString());
      hasChanges = true;
    }

    // Check weekly reset (on Sunday at midnight)
    if (currentDay === 0 && currentHour === 0 && 
        (!lastWeeklyReset || new Date(lastWeeklyReset).getDate() !== now.getDate())) {
      updatedChores.weekly = chores.weekly.map(chore => ({
        ...chore,
        completed: false
      }));
      localStorage.setItem('lastWeeklyReset', now.toISOString());
      hasChanges = true;
    }

    return hasChanges ? updatedChores : null;
  }, []);

  return { checkAndResetChores };
} 