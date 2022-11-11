import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { PAGESTITLE, VIEWPATH } from 'utils/variables';
import styles from './index.module.scss';

export default function Project() {
  const { t } = useTranslation();

  return (
    <div className={styles.info}>
      <div className={styles.about}>
        <h1 className={styles.title}>{PAGESTITLE.MAIN}</h1>
        <p className={styles.desc}>{t('pmaInfo')}</p>
        <NavLink className={styles.link} to={VIEWPATH.SIGNIN} end>
          {t('getStarted')}
        </NavLink>
      </div>
      <div className={styles.img}></div>
    </div>
  );
}
