import React from 'react';
import { Grid, Box } from '@mui/material';
import BoardCard from './card';
import { BOARDS } from './mockBoardList';
import { ControlUnit } from './controlUnit';

export const Boards = () => {
  return (
    <Box>
      <ControlUnit />
      <Grid container spacing={1} direction="row" justifyContent="center">
        {BOARDS.map((board) => (
          <BoardCard board={board} key={board.id} />
        ))}
      </Grid>
    </Box>
  );
};
