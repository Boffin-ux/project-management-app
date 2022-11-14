import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { setSelectedLang } from 'store/reducers/MainSlice';
import { LOCALES } from 'utils/variables';
import styles from './SelectionLang.module.scss';

export default function SelectionLang() {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { selectedLang } = useAppSelector((state) => state.mainReducer);

  const changeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
    dispatch(setSelectedLang(e.target.value));
  };

  return (
    <label className={styles.chooseLang} htmlFor="chooseLang">
      <select
        name="chooseLang"
        className={styles.select}
        value={selectedLang}
        onChange={changeLang}
      >
        <option value={LOCALES.ENGLISH}>EN</option>
        <option value={LOCALES.RUSSIAN}>RU</option>
      </select>
    </label>
  );
}
