import React, { useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import { ControlUnit } from './controlUnit/ControlUnit';
import { BoardCard } from './Card/BoardCard';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { boardGetAll } from 'store/reducers/BoardsSlice';
import { useNavigate } from 'react-router-dom';
import Loader from 'components/universal/Loader/Loader';
import { VIEW_PATH } from 'utils/variables';

export const Boards = () => {
  const dispatch = useAppDispatch();
  const { boards, error, isLoading } = useAppSelector((state) => state.boards);

  const navigate = useNavigate();
  if (error) navigate(VIEW_PATH.ERROR);

  useEffect(() => {
    dispatch(boardGetAll());
  }, []);

  return (
    <Box>
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
