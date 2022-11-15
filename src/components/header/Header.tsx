import { Button } from '@mui/material';
import { Box } from '@mui/system';
import AuthMenu from 'components/AuthMenu/AuthMenu';
import SelectionLang from 'components/selectionLang/SelectionLang';
import { useAppDispatch } from 'hooks/redux';
import useAuth from 'hooks/useAuth';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { logout } from 'store/reducers/AuthSlice';
import { VIEW_PATH } from 'utils/variables';
import styles from './Header.module.scss';

export default function Header() {
  const { t } = useTranslation();
  const isAuth = useAuth();
  const header = useRef<HTMLElement>(null);
  const dispatch = useAppDispatch();

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

  const handleLogout = () => {
    localStorage.removeItem('pmAppToken');
    dispatch(logout());
  };

  return (
    <header className={styles.header} ref={header}>
      <div className={styles.wrapper}>
        <Box>
          <Button component={Link} to={VIEW_PATH.HOME} variant="contained">
            PM-APP
          </Button>
          {isAuth && (
            <Button onClick={handleLogout} variant="contained">
              {t('auth.signOut')}
            </Button>
          )}
        </Box>
        <nav className={styles.list}>
          <SelectionLang />
          <AuthMenu />
        </nav>
      </div>
    </header>
  );
}
