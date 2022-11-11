import React, { useEffect } from 'react';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import { PAGESTITLE, VIEWPATH } from 'utils/variables';
import { useTranslation } from 'react-i18next';

export default function PageNotFound() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = PAGESTITLE.NOT_FOUND;
  }, []);

  return (
    <div className={`${styles.wrapper} container`}>
      <div className={styles.wrapperLeft}>
        <h2 className={styles.title}>
          {PAGESTITLE.NOT_FOUND}. {t('title404')}
        </h2>
        <p className={styles.desc}>{t('description404')}</p>
        <div className={styles.links}>
          <Link to={VIEWPATH.MAIN}>{t('goHomeLink')}</Link>
        </div>
      </div>
      <div className={styles.wrapperRight}></div>
    </div>
  );
}
