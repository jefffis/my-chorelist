'use client';

import { useState, useEffect } from 'react';
import styles from './CustomChoreList.module.css';

const defaultChores = {
  daily: [
    { id: 'make_bed', name: 'Make my bed (morning)', key: 'Make my bed', type: 'daily' },
    { id: 'brush_hair_am', name: 'Brush hair (morning)', key: 'Brush hair, am', type: 'daily' },
    { id: 'read_book', name: 'Read chapter book (45mins)', key: 'Read chapter book (45mins)', type: 'daily' },
    { id: 'homework', name: 'Do homework', key: 'Do homework', type: 'daily' },
    { id: 'pack_lunch', name: 'Pack lunch/backpack for school', key: 'Pack lunch', type: 'daily' },
    { id: 'shower', name: 'Shower or tub', key: 'Shower or tub', type: 'daily' },
    { id: 'clean_bedroom', name: 'Clean bedroom', key: 'Clean bedroom', type: 'daily' },
    { id: 'animal_care', name: 'Walk doggy/feed animals', key: 'Animal stuff', type: 'daily' },
    { id: 'brush_hair_pm', name: 'Brush hair (night)', key: 'Brush hair, pm', type: 'daily' },
    { id: 'clean_toys', name: 'Clean toys/books (night)', key: 'Clean up toys', type: 'daily' }
  ],
  weekly: [
    { id: 'cut_nails', name: 'Cut nails, 1x week', key: 'Cut nails', type: 'weekly' },
    { id: 'wash_laundry', name: 'Wash laundry, 1x week', key: 'Wash laundry', type: 'weekly' },
    { id: 'put_away_laundry', name: 'Put away laundry, 1x week', key: 'Put away laundry', type: 'weekly' }
  ]
};

export default function CustomChoreList() {
  const [customChores, setCustomChores] = useState([]);
  const [disabledDefaultChores, setDisabledDefaultChores] = useState([]);

  useEffect(() => {
    // Load custom chores from localStorage
    const loadChores = () => {
      const chores = JSON.parse(localStorage.getItem('customChores') || '[]');
      setCustomChores(chores);
    };

    // Load disabled default chores
    const loadDisabledChores = () => {
      const disabled = JSON.parse(localStorage.getItem('disabledDefaultChores') || '[]');
      setDisabledDefaultChores(disabled);
    };

    loadChores();
    loadDisabledChores();

    // Listen for updates
    window.addEventListener('customChoresUpdated', loadChores);
    return () => window.removeEventListener('customChoresUpdated', loadChores);
  }, []);

  const handleDelete = (choreId) => {
    const updatedChores = customChores.filter(chore => chore.id !== choreId);
    localStorage.setItem('customChores', JSON.stringify(updatedChores));
    setCustomChores(updatedChores);
  };

  const handleToggleDefault = (choreId) => {
    setDisabledDefaultChores(prev => {
      const isDisabled = prev.includes(choreId);
      const updated = isDisabled
        ? prev.filter(id => id !== choreId)
        : [...prev, choreId];
      
      localStorage.setItem('disabledDefaultChores', JSON.stringify(updated));
      window.dispatchEvent(new Event('defaultChoresUpdated'));
      return updated;
    });
  };

  const renderCustomChoreList = (chores) => (
    <div className={styles.choreList}>
      {chores.map(chore => (
        <div key={chore.id} className={styles.choreItem}>
          <span className={styles.choreName}>{chore.name}</span>
          <span className={styles.choreType}>{chore.type}</span>
          <div className={styles.actions}>
            <button
              onClick={() => handleDelete(chore.id)}
              className={styles.deleteButton}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderDefaultChoreList = (chores) => (
    <div className={styles.choreList}>
      {chores.map(chore => (
        <div key={chore.id} className={styles.choreItem}>
          <span className={styles.choreName}>{chore.name}</span>
          <span className={styles.choreType}>{chore.type}</span>
          <div className={styles.actions}>
            <button
              onClick={() => handleToggleDefault(chore.id)}
              className={`${styles.toggleButton} ${disabledDefaultChores.includes(chore.id) ? styles.disabled : styles.enabled}`}
            >
              {disabledDefaultChores.includes(chore.id) ? 'Enable' : 'Disable'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const customDailyChores = customChores.filter(chore => chore.type === 'daily');
  const customWeeklyChores = customChores.filter(chore => chore.type === 'weekly');

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h2 className={styles.title}>Your Custom Chores</h2>
        <h3 className={styles.subtitle}>Daily</h3>
        {renderCustomChoreList(customDailyChores)}
        <h3 className={styles.subtitle}>Weekly</h3>
        {renderCustomChoreList(customWeeklyChores)}
      </section>

      <section className={styles.section}>
        <h2 className={styles.title}>Default Chores</h2>
        <h3 className={styles.subtitle}>Daily</h3>
        {renderDefaultChoreList(defaultChores.daily)}
        <h3 className={styles.subtitle}>Weekly</h3>
        {renderDefaultChoreList(defaultChores.weekly)}
      </section>
    </div>
  );
} 