import React from 'react';
import { Grid, Box } from '@mui/material';
import { BOARDS } from './mockBoardList';
import { ControlUnit } from './controlUnit/ControlUnit';
import { BoardCard } from './Card/BoardCard';

export const Boards = () => {
  return (
    <Box>
      <ControlUnit />
      <Grid container spacing={1} justifyContent="center">
        {BOARDS.map((board) => (
          <BoardCard {...board} key={board.id} />
        ))}
      </Grid>
    </Box>
  );
};
