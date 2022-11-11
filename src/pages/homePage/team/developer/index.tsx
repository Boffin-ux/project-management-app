import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './index.module.scss';

export default function Team() {
  const { t } = useTranslation();

  return (
    <li className={styles.developer}>
      <a target="_blank" href="https://github.com/bvfromru" rel="noreferrer">
        <span className={styles.img}></span>
        <h3>Vitaliy Boudkin</h3>
        <p className={styles.roleTitle}>Роль в проекте:</p>
        <p className={styles.role}>Web-developer</p>
      </a>
    </li>
  );
}
