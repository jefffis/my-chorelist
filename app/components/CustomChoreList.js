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

  // Helper to get all default chore IDs
  const allDefaultChoreIds = [
    ...defaultChores.daily.map(chore => chore.id),
    ...defaultChores.weekly.map(chore => chore.id)
  ];

  // Check if all default chores are disabled
  const allDefaultsDisabled = allDefaultChoreIds.every(id => disabledDefaultChores.includes(id));

  // Handler for disable all
  const handleDisableAllDefaults = () => {
    setDisabledDefaultChores(allDefaultChoreIds);
    localStorage.setItem('disabledDefaultChores', JSON.stringify(allDefaultChoreIds));
    window.dispatchEvent(new Event('defaultChoresUpdated'));
  };

  const renderCustomChoreList = (chores) => (
    <div className={`${styles.choreList} mar-bot--16`}>
      {chores.map(chore => (
        <div key={chore.id} className={`${styles.chore} cf`}>
          <span className={styles.choreLabel}>{chore.name}</span>
          <div className={styles.actions}>
            <button
              onClick={() => handleDelete(chore.id)}
              className={`btn btnSmall btnDelete`}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderDefaultChoreList = (chores) => (
    <div className={`${styles.choreList} mar-bot--16`}>
      {chores.map(chore => (
        <div key={chore.id} className={`${styles.chore} cf`}>
          <span className={styles.choreLabel}>{chore.name}</span>
          <div className={styles.actions}>
            <button
              onClick={() => handleToggleDefault(chore.id)}
              className={`btn btnSmall ${disabledDefaultChores.includes(chore.id) ? 'btnDisabled' : 'btnEnabled'}`}
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
      <section className={styles.chores}>
        <div className={`mar-bot--24`}>
          {customDailyChores.length > 0 && (
            <>
              <h3 className={`${styles.subtitle} fredoka`}>Custom Daily chores</h3>
              {renderCustomChoreList(customDailyChores)}
            </>
          )}
          {customWeeklyChores.length > 0 && (
            <>
              <h3 className={`${styles.subtitle} fredoka`}>Custom Weekly chores</h3>
              {renderCustomChoreList(customWeeklyChores)}
            </>
          )}
        </div>
        <div className={styles.choreList}>
          <h3 className={`${styles.subtitle} fredoka mar-bot--24 cf`}>
            <span className={`floatLeft`}>Default Daily chores</span>
            <button
              className={`btn btnSmall floatRight`}
              onClick={handleDisableAllDefaults}
              disabled={allDefaultsDisabled}
            >
              Disable all
            </button>
          </h3>
          {renderDefaultChoreList(defaultChores.daily)}
          <h3 className={`${styles.subtitle} fredoka`}>Default Weekly chores</h3>
          {renderDefaultChoreList(defaultChores.weekly)}
        </div>
      </section>
    </div>
  );
} 