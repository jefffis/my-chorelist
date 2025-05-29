'use client';

import { useState, useEffect } from 'react';
import ChoreItem from './ChoreItem';
import SuccessMessage from './SuccessMessage';
import useChoreReset from '../lib/hooks/useChoreReset';
import styles from './ChoreList.module.css';

export default function ChoreList() {
  const [chores, setChores] = useState({
    daily: [],
    weekly: []
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [successType, setSuccessType] = useState('');

  // Use the reset hook
  const { checkAndResetChores } = useChoreReset();

  useEffect(() => {
    // Load default chores
    const defaultChores = {
      daily: [
        { id: 'make_bed', name: 'Make my bed (morning)', key: 'Make my bed', type: 'daily', completed: false },
        { id: 'brush_hair_am', name: 'Brush hair (morning)', key: 'Brush hair, am', type: 'daily', completed: false },
        { id: 'read_book', name: 'Read chapter book (45mins)', key: 'Read chapter book (45mins)', type: 'daily', completed: false },
        { id: 'homework', name: 'Do homework', key: 'Do homework', type: 'daily', completed: false },
        { id: 'pack_lunch', name: 'Pack lunch/backpack for school', key: 'Pack lunch', type: 'daily', completed: false },
        { id: 'shower', name: 'Shower or tub', key: 'Shower or tub', type: 'daily', completed: false },
        { id: 'clean_bedroom', name: 'Clean bedroom', key: 'Clean bedroom', type: 'daily', completed: false },
        { id: 'animal_care', name: 'Walk doggy/feed animals', key: 'Animal stuff', type: 'daily', completed: false },
        { id: 'brush_hair_pm', name: 'Brush hair (night)', key: 'Brush hair, pm', type: 'daily', completed: false },
        { id: 'clean_toys', name: 'Clean toys/books (night)', key: 'Clean up toys', type: 'daily', completed: false }
      ],
      weekly: [
        { id: 'cut_nails', name: 'Cut nails, 1x week', key: 'Cut nails', type: 'weekly', completed: false },
        { id: 'wash_laundry', name: 'Wash laundry, 1x week', key: 'Wash laundry', type: 'weekly', completed: false },
        { id: 'put_away_laundry', name: 'Put away laundry, 1x week', key: 'Put away laundry', type: 'weekly', completed: false }
      ]
    };

    // Load completion status for default chores
    const updatedDefaultChores = {
      daily: defaultChores.daily.map(chore => ({
        ...chore,
        completed: localStorage.getItem(chore.key) === 'true'
      })),
      weekly: defaultChores.weekly.map(chore => ({
        ...chore,
        completed: localStorage.getItem(chore.key) === 'true'
      }))
    };

    // Load custom chores
    const customChores = JSON.parse(localStorage.getItem('customChores') || '[]');
    
    // Load disabled default chores
    const disabledDefaultChores = JSON.parse(localStorage.getItem('disabledDefaultChores') || '[]');
    
    // Filter out disabled default chores and combine with custom chores
    const combinedChores = {
      daily: [
        ...updatedDefaultChores.daily.filter(chore => !disabledDefaultChores.includes(chore.id)),
        ...customChores.filter(chore => chore.type === 'daily')
      ],
      weekly: [
        ...updatedDefaultChores.weekly.filter(chore => !disabledDefaultChores.includes(chore.id)),
        ...customChores.filter(chore => chore.type === 'weekly')
      ]
    };

    setChores(combinedChores);
  }, []);

  // Listen for custom chore updates
  useEffect(() => {
    const handleCustomChoresUpdate = () => {
      const customChores = JSON.parse(localStorage.getItem('customChores') || '[]');
      const disabledDefaultChores = JSON.parse(localStorage.getItem('disabledDefaultChores') || '[]');
      
      setChores(prevChores => ({
        daily: [
          ...prevChores.daily.filter(chore => !chore.key?.startsWith('custom_') && !disabledDefaultChores.includes(chore.id)),
          ...customChores.filter(chore => chore.type === 'daily')
        ],
        weekly: [
          ...prevChores.weekly.filter(chore => !chore.key?.startsWith('custom_') && !disabledDefaultChores.includes(chore.id)),
          ...customChores.filter(chore => chore.type === 'weekly')
        ]
      }));
    };

    const handleDefaultChoresUpdate = () => {
      const disabledDefaultChores = JSON.parse(localStorage.getItem('disabledDefaultChores') || '[]');
      setChores(prevChores => ({
        daily: prevChores.daily.filter(chore => !chore.key || !disabledDefaultChores.includes(chore.id)),
        weekly: prevChores.weekly.filter(chore => !chore.key || !disabledDefaultChores.includes(chore.id))
      }));
    };

    window.addEventListener('customChoresUpdated', handleCustomChoresUpdate);
    window.addEventListener('defaultChoresUpdated', handleDefaultChoresUpdate);
    return () => {
      window.removeEventListener('customChoresUpdated', handleCustomChoresUpdate);
      window.removeEventListener('defaultChoresUpdated', handleDefaultChoresUpdate);
    };
  }, []);

  const handleChoreToggle = (type, choreId) => {
    setChores(prevChores => {
      const updatedChores = {
        ...prevChores,
        [type]: prevChores[type].map(chore =>
          chore.id === choreId ? { ...chore, completed: !chore.completed } : chore
        )
      };

      // Save to localStorage
      const chore = prevChores[type].find(c => c.id === choreId);
      if (chore.key?.startsWith('custom_')) {
        // Handle custom chore
        const customChores = JSON.parse(localStorage.getItem('customChores') || '[]');
        const updatedCustomChores = customChores.map(c =>
          c.id === choreId ? { ...c, completed: !c.completed } : c
        );
        localStorage.setItem('customChores', JSON.stringify(updatedCustomChores));
      } else {
        // Handle default chore
        localStorage.setItem(chore.key, (!chore.completed).toString());
      }

      // Check if all chores of this type are completed
      const allCompleted = updatedChores[type].every(chore => chore.completed);
      if (allCompleted) {
        setSuccessType(type);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }

      return updatedChores;
    });
  };

  // Check for resets every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedChores = checkAndResetChores(chores);
      if (updatedChores) {
        setChores(updatedChores);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [chores, checkAndResetChores]);

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h2 className={styles.title}>Daily Chores</h2>
        <div className={styles.choreList}>
          {chores.daily.length === 0 ? (
            <div className={styles.empty}>
              <p>No daily chores available. Add some in the customize section!</p>
            </div>
          ) : (
            chores.daily.map(chore => (
              <ChoreItem
                key={chore.id}
                chore={chore}
                onToggle={() => handleChoreToggle('daily', chore.id)}
              />
            ))
          )}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.title}>Weekly Chores</h2>
        <div className={styles.choreList}>
          {chores.weekly.length === 0 ? (
            <div className={styles.empty}>
              <p>No weekly chores available. Add some in the customize section!</p>
            </div>
          ) : (
            chores.weekly.map(chore => (
              <ChoreItem
                key={chore.id}
                chore={chore}
                onToggle={() => handleChoreToggle('weekly', chore.id)}
              />
            ))
          )}
        </div>
      </section>

      {showSuccess && (
        <SuccessMessage type={successType} />
      )}
    </div>
  );
}
