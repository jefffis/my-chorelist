'use client';

import { useState } from 'react';
import styles from './AddChoreForm.module.css';

export default function AddChoreForm() {
  const [choreName, setChoreName] = useState('');
  const [choreType, setChoreType] = useState('daily');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!choreName.trim()) return;

    // Get existing custom chores
    const customChores = JSON.parse(localStorage.getItem('customChores') || '[]');
    
    // Create new chore
    const newChore = {
      id: Date.now().toString(),
      name: choreName.trim(),
      type: choreType,
      key: `custom_${Date.now()}`,
      completed: false
    };

    // Save to localStorage
    localStorage.setItem('customChores', JSON.stringify([...customChores, newChore]));
    
    // Reset form
    setChoreName('');
    setChoreType('daily');

    // Trigger a custom event to notify the list to update
    window.dispatchEvent(new Event('customChoresUpdated'));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={choreName}
          onChange={(e) => setChoreName(e.target.value)}
          placeholder="Enter chore name"
          className={styles.input}
        />
        <div className={`${styles.radioGroup} cf`}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="choreType"
              value="daily"
              checked={choreType === 'daily'}
              onChange={() => setChoreType('daily')}
              className={styles.radio}
            />
            <span className={styles.radioCopy}>Daily</span>
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="choreType"
              value="weekly"
              checked={choreType === 'weekly'}
              onChange={() => setChoreType('weekly')}
              className={styles.radio}
            />
            <span className={styles.radioCopy}>Weekly</span>
          </label>
        </div>
        <button
          type="submit"
          disabled={!choreName.trim()}
          className={`${styles.btn} btn btnForm`}
        >
          Add
        </button>
      </div>
    </form>
  );
} 