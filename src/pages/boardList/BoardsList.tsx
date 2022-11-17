import { Box, Grid } from '@mui/material';
import React from 'react';
import { BoardCard } from './Card/BoardCard';
import { ControlUnit } from './controlUnit/ControlUnit';
import { BOARDS } from './mockBoardList';

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
