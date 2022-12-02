import React, { useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import { ControlUnit } from './controlUnit/ControlUnit';
import { BoardCard } from './Card/BoardCard';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { getAllBoards } from 'store/board/thunks';
import Loader from 'components/universal/Loader/Loader';
import styles from './BoardList.module.scss';
import { getUsers } from 'store/users/thunks';

export const Boards = () => {
  const dispatch = useAppDispatch();
  const { boards, isLoading } = useAppSelector((state) => state.boards);

  useEffect(() => {
    dispatch(getAllBoards());
    dispatch(getUsers());
  }, []);

  return (
    <Box className={styles.boardWrapper}>
      <ControlUnit />
      {isLoading && <Loader />}
      {!isLoading && (
        <Grid container spacing={1} justifyContent="center">
          {boards.map((board) => (
            <BoardCard {...board} key={board._id} />
          ))}
        </Grid>
      )}
    </Box>
  );
};
