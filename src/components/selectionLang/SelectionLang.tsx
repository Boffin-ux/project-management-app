import React, { useState } from 'react';
import { LOCALES } from 'utils/variables';
import { useTranslation } from 'react-i18next';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { selectStyle, selectStyleGroup } from './selectionStyles';

export default function SelectionLang() {
  const { i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(localStorage.getItem('i18nextLng') || '');

  const changeLang = (e: React.MouseEvent<HTMLElement>, language: string) => {
    i18n.changeLanguage(language);
    setSelectedLang(language);
  };

  return (
    <ToggleButtonGroup onChange={changeLang} exclusive value={selectedLang} sx={selectStyleGroup}>
      {Object.values(LOCALES).map((item, i) => {
        return (
          <ToggleButton sx={selectStyle} value={item} key={i}>
            {item.toUpperCase()}
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  );
}
