import React, { useEffect, useRef } from 'react';
import styles from './header.module.scss';
import SelectionLang from 'components/selectionLang/SelectionLang';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { VIEW_PATH } from 'utils/variables';

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
        <NavLink className={styles.logo} to={VIEW_PATH.MAIN} end>
          PM-APP
        </NavLink>
        <nav className={styles.list}>
          <SelectionLang />
          <NavLink className={styles.item} to={VIEW_PATH.SIGNIN} end>
            {t('header.signIn')}
          </NavLink>
          <NavLink className={styles.item} to={VIEW_PATH.SIGNUP} end>
            {t('header.signUp')}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
