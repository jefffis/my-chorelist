'use client';

import styles from './ChoreItem.module.css';

export default function ChoreItem({ chore, onToggle }) {
  return (
    <label className={styles.chore}>
      <input
        type="checkbox"
        checked={chore.completed}
        onChange={onToggle}
        className={styles.checkbox}
      />
      <span className={styles.label}>{chore.name}</span>
    </label>
  );
}
