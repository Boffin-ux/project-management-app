import React, { FC } from 'react';
import { IconButton } from '@mui/material';
import Loader from 'components/universal/Loader/Loader';

export interface ButtonWithIconProps {
  clickAction: () => void;
  icon: JSX.Element;
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  disabled?: boolean;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

export const ButtonWithIcon: FC<ButtonWithIconProps> = ({
  clickAction,
  icon,
  size,
  isLoading,
  disabled,
  type = 'button',
}) => {
  return (
    <IconButton size={size} color="inherit" onClick={clickAction} disabled={disabled} type={type}>
      {isLoading && <Loader size={34} color={'secondary'} />}
      {icon}
    </IconButton>
  );
};
