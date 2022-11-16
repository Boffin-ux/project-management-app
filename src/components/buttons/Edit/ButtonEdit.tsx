import React from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export const ButtonEdit = () => {
  return (
    <IconButton size="large" edge="end" color="inherit">
      <EditIcon fontSize="large" />
    </IconButton>
  );
};
