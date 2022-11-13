import React, { useEffect } from 'react';
import styles from './index.module.scss';
import { NavLink } from 'react-router-dom';
import { PAGES_TITLE, VIEW_PATH } from 'utils/variables';
import { useTranslation } from 'react-i18next';

export default function PageNotFound() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = PAGES_TITLE.NOT_FOUND;
  }, []);

  return (
    <div className={`${styles.wrapper} container`}>
      <div className={styles.wrapperLeft}>
        <h2 className={styles.title}>
          {PAGES_TITLE.NOT_FOUND}. {t('404.title')}
        </h2>
        <p className={styles.desc}>{t('404.description')}</p>
        <div className={styles.links}>
          <NavLink className={styles.link} to={VIEW_PATH.MAIN} end>
            {t('404.link')}
          </NavLink>
        </div>
      </div>
      <div className={styles.wrapperRight}></div>
    </div>
  );
}
