import React, { FC } from 'react';
import { IconButton } from '@mui/material';

export interface ButtonWithIconProps {
  clickAction: () => void;
  icon: JSX.Element;
  size?: 'small' | 'medium' | 'large';
}

export const ButtonWithIcon: FC<ButtonWithIconProps> = ({ clickAction, icon, size }) => {
  return (
    <IconButton size={size} color="inherit" onClick={clickAction}>
      {icon}
    </IconButton>
  );
};
