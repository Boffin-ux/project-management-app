import React from 'react';
import { Grid, Box } from '@mui/material';
import { BoardCard } from './Card/BoardCard';
import { BOARDS } from '../../MOCKDATA/mockBoardList';
import { ControlUnit } from './controlUnit/ControlUnit';

export const Boards = () => {
  return (
    <Box>
      <ControlUnit />
      <Grid container spacing={1} direction="row" justifyContent="center">
        {BOARDS.map((board) => (
          <BoardCard {...board} key={board.id} />
        ))}
      </Grid>
    </Box>
  );
};
