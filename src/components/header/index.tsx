import React from 'react';
import styles from './index.module.scss';
import SelectionLang from 'components/selectionLang';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { VIEWPATH } from 'utils/variables';

export default function Header() {
  const { t } = useTranslation();

  return (
    <header className="header">
      <div className={styles.wrapper}>
        <NavLink className={styles.logo} to={VIEWPATH.MAIN} end>
          PM-APP
        </NavLink>
        <nav className={styles.list}>
          <SelectionLang />
          <NavLink className={styles.item} to={VIEWPATH.SIGNIN} end>
            {t('header.signIn')}
          </NavLink>
          <NavLink className={styles.item} to={VIEWPATH.SIGNUP} end>
            {t('header.signUp')}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
