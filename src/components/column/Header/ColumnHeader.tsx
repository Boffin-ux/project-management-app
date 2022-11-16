import React from 'react';
import { Typography, IconButton, AppBar, Toolbar } from '@mui/material';
import { ButtonDelete } from 'components/buttons/Delete/ButtonDelete';
import { ButtonEdit } from 'components/buttons/Edit/ButtonEdit';

export const ColumnHeader = () => {
  return (
    <AppBar position="static" sx={{ borderRadius: 2 }}>
      <Toolbar variant="dense">
        <ButtonEdit />
        <Typography variant="h5" sx={{ flexGrow: 1, textAlign: 'center' }}>
          Photos
        </Typography>
        <ButtonDelete />
      </Toolbar>
    </AppBar>
  );
};
