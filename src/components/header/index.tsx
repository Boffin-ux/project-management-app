import React from 'react';
import styles from './index.module.scss';
import SelectionLang from 'components/selectionLang';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

export default function Header() {
  const { t } = useTranslation();

  return (
    <header className="header">
      <div className={styles.wrapper}>
        <NavLink className={styles.logo} to="/" end>
          PM-APP
        </NavLink>
        <nav className={styles.list}>
          <SelectionLang />
          <NavLink className={styles.item} to="/signin" end>
            {t('signIn')}
          </NavLink>
          <NavLink className={styles.item} to="/signup" end>
            {t('signUp')}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
