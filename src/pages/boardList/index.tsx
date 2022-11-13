import React from 'react';
import { Grid } from '@mui/material';
import BoardCard from './Card';
import { BOARDS } from './mockBoardList';

export const Boards = () => {
  return (
    <Grid container spacing={1} direction="row" justifyContent="center">
      {BOARDS.map((board) => (
        <BoardCard board={board} key={board.id} />
      ))}
    </Grid>
  );
};
