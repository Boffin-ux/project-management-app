import React from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const ButtonDelete = () => {
  return (
    <IconButton size="large" edge="end" color="inherit">
      <DeleteIcon fontSize="large" />
    </IconButton>
  );
};
