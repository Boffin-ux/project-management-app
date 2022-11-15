import { Button } from '@mui/material';
import AuthMenu from 'components/AuthMenu/AuthMenu';
import SelectionLang from 'components/selectionLang/SelectionLang';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { VIEW_PATH } from 'utils/variables';
import styles from './Header.module.scss';

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
        <Button component={Link} to={VIEW_PATH.HOME} variant="contained">
          PM-APP
        </Button>
        <nav className={styles.list}>
          <SelectionLang />
          <AuthMenu />
        </nav>
      </div>
    </header>
  );
}
