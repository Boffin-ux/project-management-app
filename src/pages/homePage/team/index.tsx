import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './index.module.scss';

export default function Team() {
  const { t } = useTranslation();

  return (
    <div className={styles.info}>
      <h2 className={styles.title}>{t('teamTitle')}</h2>
      <p className={styles.desc}>{t('teamDescription')}</p>
      <ul className={styles.list}>
        <li className={styles.developer}>
          <a
            className={styles.link}
            target="_blank"
            href="https://github.com/bvfromru"
            rel="noreferrer"
          >
            <span className={styles.img}></span>
            <h3 className={styles.name}>Vitaliy Boudkin</h3>
            <p className={styles.roleTitle}>Роль в проекте:</p>
            <p className={styles.role}>Frontend-developer</p>
          </a>
        </li>
        <li className={styles.developer}>
          <a
            className={styles.link}
            target="_blank"
            href="https://github.com/stanlys"
            rel="noreferrer"
          >
            <span className={styles.img}></span>
            <h3 className={styles.name}>Sergey Chelnakov</h3>
            <p className={styles.roleTitle}>Роль в проекте:</p>
            <p className={styles.role}>Frontend-developer</p>
          </a>
        </li>
        <li className={styles.developer}>
          <a
            className={styles.link}
            target="_blank"
            href="https://github.com/Boffin-ux"
            rel="noreferrer"
          >
            <span className={styles.img}></span>
            <h3 className={styles.name}>Boris Nizameev</h3>
            <p className={styles.roleTitle}>Роль в проекте:</p>
            <p className={styles.role}>Team-lead</p>
          </a>
        </li>
      </ul>
    </div>
  );
}
