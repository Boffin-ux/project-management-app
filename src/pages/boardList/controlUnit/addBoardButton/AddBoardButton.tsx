import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './AddBoardButton.module.scss';

interface IPropsOnClick {
  onAddBoard: () => void;
}

export const AddBoardButton: FC<IPropsOnClick> = ({ onAddBoard }) => {
  const { t } = useTranslation();

  return (
    <>
      <Button
        className={styles.btnAdd}
        variant="contained"
        sx={{ order: { xs: 2, sm: 0 } }}
        onClick={onAddBoard}
      >
        <AddIcon fontSize="large" /> {t('boards.addBoard')}
      </Button>
    </>
  );
};
