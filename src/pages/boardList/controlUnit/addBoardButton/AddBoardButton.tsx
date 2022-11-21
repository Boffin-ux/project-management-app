import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import styles from './AddBoardButton.module.scss';
import useUserData from 'hooks/useUserData';
import { useAppDispatch } from 'hooks/redux';
import { IRequestForBoard } from 'interfaces/boards';
import { createBoard } from 'store/reducers/actions/board';
import { randomString } from 'utils/temputils';

export const AddBoardButton = () => {
  const { t } = useTranslation();
  const user = useUserData();
  const dispatch = useAppDispatch();

  const addNewBoard = () => {
    //mockdata для создание доски
    const board1: IRequestForBoard = {
      title: randomString(15),
      owner: user.id,
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
