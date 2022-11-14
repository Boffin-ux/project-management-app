import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import styles from './AddBoardButton.module.scss';

export const AddBoardButton = () => {
  const { t } = useTranslation();

  return (
    <Button className={styles.btnAdd} variant="contained">
      <AddIcon fontSize="large" /> {t('boards.addBoard')}
    </Button>
  );
};
