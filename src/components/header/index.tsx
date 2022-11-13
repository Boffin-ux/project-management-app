import { Button } from '@mui/material';
import SelectionLang from 'components/selectionLang';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { VIEW_PATH } from 'utils/variables';
import styles from './index.module.scss';

export default function Header() {
  const { t } = useTranslation();
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    if (header.current) {
      const { current } = header;

      if (!current.closest('scrolled')) {
        const handleScroll = () => {
          window.pageYOffset > current.offsetHeight
            ? current.classList.add(`${styles.scrolled}`)
            : current.classList.remove(`${styles.scrolled}`);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }
    }
  }, []);

  return (
    <header className={styles.header} ref={header}>
      <div className={styles.wrapper}>
        <Button href={VIEW_PATH.MAIN} variant="contained">
          PM-APP
        </Button>
        <nav className={styles.list}>
          <SelectionLang />
          <Button href={VIEW_PATH.SIGNIN} variant="contained">
            {t('header.signIn')}
          </Button>
          <Button href={VIEW_PATH.SIGNUP} variant="contained">
            {t('header.signUp')}
          </Button>
        </nav>
      </div>
    </header>
  );
}
