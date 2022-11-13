import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { PAGES_TITLE, VIEW_PATH } from 'utils/variables';
import styles from './index.module.scss';

export default function Project() {
  const { t } = useTranslation();

  return (
    <div className={styles.info}>
      <div className={styles.about}>
        <h1 className={styles.title}>{PAGES_TITLE.MAIN}</h1>
        <p className={styles.desc}>{t('project.info')}</p>
        <NavLink className={styles.link} to={VIEW_PATH.SIGNIN} end>
          {t('project.link')}
        </NavLink>
      </div>
      <div className={styles.img}></div>
    </div>
  );
}
