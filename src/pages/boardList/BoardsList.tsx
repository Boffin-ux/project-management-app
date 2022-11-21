import React, { useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import { ControlUnit } from './controlUnit/ControlUnit';
import { BoardCard } from './Card/BoardCard';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { getAllBoards } from 'store/reducers/actions/board';
import { useNavigate } from 'react-router-dom';
import Loader from 'components/universal/Loader/Loader';
import { VIEW_PATH } from 'utils/variables';

export const Boards = () => {
  const dispatch = useAppDispatch();
  const { boards, error, isLoading } = useAppSelector((state) => state.boards);

  useEffect(() => {
    dispatch(getAllBoards());
  }, []);

  const navigate = useNavigate();
  if (error) navigate(VIEW_PATH.ERROR);

  return (
    <Box>
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
