import React from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const ButtonDelete = () => {
  return (
    <IconButton size="small" edge="end" color="inherit">
      <DeleteIcon fontSize="small" />
    </IconButton>
  );
};
