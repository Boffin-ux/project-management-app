import React, { FC } from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export interface ButtonDeleteProps {
  clickAction: () => void;
}

export const ButtonDelete: FC<ButtonDeleteProps> = ({ clickAction }) => {
  return (
    <IconButton size="small" edge="end" color="inherit" onClick={clickAction}>
      <DeleteIcon fontSize="small" />
    </IconButton>
  );
};
