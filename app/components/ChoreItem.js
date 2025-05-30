'use client';

import styles from './ChoreItem.module.css';

export default function ChoreItem({ chore, onToggle }) {
  return (
    <label className={`${styles.chore} block cf`}>
      <input
        type="checkbox"
        checked={chore.completed}
        onChange={onToggle}
        className={styles.checkboxHidden}
      />
      <span className={styles.checkboxToggle}></span>
      <span className={styles.checkboxLabel}>{chore.name}</span>
    </label>
  );
}
