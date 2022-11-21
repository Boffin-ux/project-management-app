import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './AddBoardButton.module.scss';

import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { IRequestForBoard } from 'interfaces/boards';
import { createBoard } from 'store/reducers/actions/board';
import { randomString } from 'utils/temputils';

export const AddBoardButton = () => {
  const { t } = useTranslation();
  const { id } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const addNewBoard = () => {
    //mockdata для создание доски
    const board1: IRequestForBoard = {
      title: randomString(15),
      owner: id,
      users: [],
    };
    dispatch(createBoard(board1));
  };

  return (
    <Button
      className={styles.btnAdd}
      variant="contained"
      sx={{ order: { xs: 2, sm: 0 } }}
      onClick={addNewBoard}
    >
      <AddIcon fontSize="large" /> {t('boards.addBoard')}
    </Button>
  );
};
