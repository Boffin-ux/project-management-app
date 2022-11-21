import React, { useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import { ControlUnit } from './controlUnit/ControlUnit';
import { BoardCard } from './Card/BoardCard';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { getAllBoards } from 'store/reducers/actions/board';
import { Navigate } from 'react-router-dom';
import Loader from 'components/universal/Loader/Loader';
import { VIEW_PATH } from 'utils/variables';
import styles from './BoardList.module.scss';

export const Boards = () => {
  const dispatch = useAppDispatch();

  const { boards, error, isLoading } = useAppSelector((state) => state.boards);

  useEffect(() => {
    dispatch(getAllBoards());
  }, []);

  if (error) return <Navigate to={VIEW_PATH.ERROR} replace />;

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
