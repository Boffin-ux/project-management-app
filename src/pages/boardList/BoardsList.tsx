import React, { useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import { ControlUnit } from './controlUnit/ControlUnit';
import { BoardCard } from './Card/BoardCard';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { getAllBoards } from 'store/board/thunks';
import styles from './BoardList.module.scss';
import { getUsers } from 'store/users/thunks';
import { SkeletonCard } from './Card/SkeletonCard';
import { generateRandomArray } from 'utils/helpers';

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
      <Grid container spacing={1} justifyContent="center">
        {isLoading && generateRandomArray(5, 10).map((_, index) => <SkeletonCard key={index} />)}
        {!isLoading && boards.map((board) => <BoardCard {...board} key={board._id} />)}
      </Grid>
    </Box>
  );
};
