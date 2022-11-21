import React, { FC } from 'react';
import { Typography, AppBar, Toolbar } from '@mui/material';
import { ButtonDelete } from 'components/buttons/Delete/ButtonDelete';
import { ButtonEdit } from 'components/buttons/Edit/ButtonEdit';

export interface ColumnHeaderProps {
  title: string;
}

export const ColumnHeader: FC<ColumnHeaderProps> = ({ title }) => {
  return (
    <AppBar position="static" sx={{ borderRadius: 2 }}>
      <Toolbar variant="dense">
        <ButtonEdit />
        <Typography variant="subtitle1" sx={{ flexGrow: 1, textAlign: 'center' }}>
          {title}
        </Typography>
        <ButtonDelete />
      </Toolbar>
    </AppBar>
  );
};
