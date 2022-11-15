import React from 'react';
import { LOCALES } from 'utils/variables';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { setSelectedLang } from 'store/reducers/main/MainSlice';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';

export default function SelectionLang() {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { selectedLang } = useAppSelector((state) => state.mainReducer);

  const selectStyle = {
    fontSize: '.9rem',
    transition: 'all .4s',
    width: '60px',
    '&.Mui-selected': {
      backgroundColor: 'rgba(63, 191, 195, 0.8)',
      color: '#fff',
    },
    '&:hover': {
      backgroundColor: 'rgb(0 0 0 / 30%)',
      color: '#fff',
    },
  };

  const changeLang = (e: React.MouseEvent<HTMLElement>, language: string) => {
    if (language) {
      i18n.changeLanguage(language);
      dispatch(setSelectedLang(language));
    }
  };

  return (
    <ToggleButtonGroup
      onChange={changeLang}
      exclusive
      value={selectedLang}
      sx={{ backgroundColor: '#fff', height: '40px' }}
    >
      <ToggleButton sx={selectStyle} value={LOCALES.ENGLISH}>
        EN
      </ToggleButton>
      <ToggleButton sx={selectStyle} value={LOCALES.RUSSIAN}>
        RU
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
