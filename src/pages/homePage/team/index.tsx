import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './index.module.scss';

export default function Team() {
  const { t } = useTranslation();

  return (
    <div className={styles.info}>
      <h2 className={styles.title}>{t('team.title')}</h2>
      <p className={styles.desc}>{t('team.description')}</p>
      <ul className={styles.list}>
        <li className={styles.developer}>
          <a
            className={styles.link}
            target="_blank"
            href="https://github.com/Boffin-ux"
            rel="noreferrer"
          >
            <span className={styles.img}></span>
            <h3 className={styles.name}>{t('team.author-01')}</h3>
            <p className={styles.roleTitle}>{t('team.roleTitle')}</p>
            <p className={styles.role}>{t('team.role-01')}</p>
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
            <h3 className={styles.name}>{t('team.author-02')}</h3>
            <p className={styles.roleTitle}>{t('team.roleTitle')}</p>
            <p className={styles.role}>{t('team.role-02')}</p>
          </a>
        </li>
        <li className={styles.developer}>
          <a
            className={styles.link}
            target="_blank"
            href="https://github.com/bvfromru"
            rel="noreferrer"
          >
            <span className={styles.img}></span>
            <h3 className={styles.name}>{t('team.author-03')}</h3>
            <p className={styles.roleTitle}>{t('team.roleTitle')}</p>
            <p className={styles.role}>{t('team.role-02')}</p>
          </a>
        </li>
      </ul>
    </div>
  );
}
