import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import styles from './AddBoardButton.module.scss';
import useUserId from 'hooks/useUserId';
import { useAppDispatch } from 'hooks/redux';
import { IRequestForBoard } from 'interfaces/boards';
import { boardCreate } from 'store/reducers/BoardsSlice';
import { randomString } from 'utils/temputils';

export const AddBoardButton = () => {
  const { t } = useTranslation();
  const userId = useUserId();
  const dispatch = useAppDispatch();

  const createBoard = () => {
    //mockdata для создание доски
    const board1: IRequestForBoard = {
      title: randomString(15),
      owner: userId,
      users: [],
    };
    dispatch(boardCreate(board1));
  };

  return (
    <Button
      className={styles.btnAdd}
      variant="contained"
      sx={{ order: { xs: 2, sm: 0 } }}
      onClick={createBoard}
    >
      <AddIcon fontSize="large" /> {t('boards.addBoard')}
    </Button>
  );
};
