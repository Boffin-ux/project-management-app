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
          {PAGESTITLE.NOT_FOUND}. {t('404.title')}
        </h2>
        <p className={styles.desc}>{t('404.description')}</p>
        <div className={styles.links}>
          <Link to={VIEWPATH.MAIN}>{t('404.link')}</Link>
        </div>
      </div>
      <div className={styles.wrapperRight}></div>
    </div>
  );
}
