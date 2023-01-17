import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Tooltip, Typography } from '@mui/material';
import { btnStyle, subtitleStyle } from 'components/header/headerStyles';

type TNavButton = {
  route: string;
  text: string;
  matches: boolean;
  icon: React.ReactNode;
};

export default function NavButton({ text, route, icon, matches }: TNavButton) {
  return (
    <Tooltip title={matches ? text : ''} arrow>
      <Button component={Link} sx={btnStyle} to={route} startIcon={icon}>
        <Typography variant="subtitle1" sx={subtitleStyle}>
          {text}
        </Typography>
      </Button>
    </Tooltip>
  );
}
