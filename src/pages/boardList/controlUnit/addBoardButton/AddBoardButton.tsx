import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './AddBoardButton.module.scss';

interface ICreateBoard {
  openModal: () => void;
}

export const AddBoardButton = ({ openModal }: ICreateBoard) => {
  const { t } = useTranslation();

  return (
    <Button
      className={styles.btnAdd}
      variant="contained"
      sx={{ order: { xs: 2, sm: 0 } }}
      onClick={() => openModal()}
    >
      <AddIcon fontSize="large" /> {t('boards.addBoard')}
    </Button>
  );
};
