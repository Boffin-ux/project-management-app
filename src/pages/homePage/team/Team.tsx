import { ITeam } from 'interfaces/interface';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './index.module.scss';

export default function Team() {
  const { t } = useTranslation();
  const developers = t<string, ITeam[]>('team.developers', { returnObjects: true });

  return (
    <div className={styles.info}>
      <h2 className={styles.title}>{t('team.title')}</h2>
      <p className={styles.desc}>{t('team.description')}</p>
      <ul className={styles.list}>
        {developers &&
          developers.map((item) => {
            return (
              <li key={item.id} className={styles.developer}>
                <a className={styles.link} target="_blank" href={item.github} rel="noreferrer">
                  <span className={styles.img}></span>
                  <h3 className={styles.name}>{item.name}</h3>
                  <p className={styles.roleTitle}>{t('team.roleTitle')}</p>
                  <p className={styles.role}>{item.role}</p>
                </a>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
