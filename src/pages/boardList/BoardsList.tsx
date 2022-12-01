import React, { useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import { ControlUnit } from './controlUnit/ControlUnit';
import { BoardCard } from './Card/BoardCard';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { getAllBoards } from 'store/board/thunks';
import styles from './BoardList.module.scss';
import { getUsers } from 'store/users/thunks';

import { randomString } from 'utils/temputils';
import { SkeletonCard } from './Card/SkeletonCard';

export const Boards = () => {
  const dispatch = useAppDispatch();
  const { boards, error, isLoading } = useAppSelector((state) => state.boards);

  useEffect(() => {
    dispatch(getAllBoards());
    dispatch(getUsers());
  }, []);

  return (
    <Box className={styles.boardWrapper}>
      <ControlUnit />
      <Grid container spacing={1} justifyContent="center">
        {isLoading &&
          randomString(Math.round(5 + Math.random() * 5))
            .split('')
            .map((card, index) => <SkeletonCard key={index + card} />)}
        {!isLoading && boards.map((board) => <BoardCard {...board} key={board._id} />)}
      </Grid>
    </Box>
  );
};
