import React from 'react';
import { useScrollTrigger } from '@mui/material';

type HeaderScrollProps = {
  window?: () => Window;
  children: React.ReactElement;
};

export default function HeaderScroll({ children, window }: HeaderScrollProps) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 10 : 0,
  });
}
