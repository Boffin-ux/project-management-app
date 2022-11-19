import React, { useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import { ControlUnit } from './controlUnit/ControlUnit';
import { BoardCard } from './Card/BoardCard';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { boardsGetAll } from 'store/reducers/BoardsSlice';
import { Navigate } from 'react-router-dom';
import Loader from 'components/universal/Loader/Loader';
import { VIEW_PATH } from 'utils/variables';
import styles from './BoardList.module.scss';
import useAccessToken from 'hooks/useAccessToken';

export const Boards = () => {
  const isAuth = useAccessToken();

  const dispatch = useAppDispatch();

  const { boards, error, isLoading } = useAppSelector((state) => state.boards);

  useEffect(() => {
    dispatch(boardsGetAll());
  }, []);

  if (error || !isAuth) return <Navigate to={VIEW_PATH.ERROR} replace />;

  return (
    <Box className={styles.boardWrapper}>
      <ControlUnit />
      {isLoading && <Loader />}
      {!isLoading && boards.length > 0 && (
        <Grid container spacing={1} justifyContent="center">
          {boards.map((board) => (
            <BoardCard {...board} key={board._id} />
          ))}
        </Grid>
      )}
    </Box>
  );
};
