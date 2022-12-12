import { CircularProgress } from '@mui/material';
import React from 'react';

const DEFAULT_SIZE = 24;

interface ISize {
  size?: number;
}

function Loader({ size }: ISize) {
  const indent = size ? size / 2 : DEFAULT_SIZE / 2;

  return (
    <CircularProgress
      size={size || DEFAULT_SIZE}
      sx={{
        position: 'absolute',
        top: `calc(50% - ${indent}px)`,
        left: `calc(50% - ${indent}px)`,
      }}
    />
  );
}

export default Loader;
