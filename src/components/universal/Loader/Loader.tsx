import { CircularProgress, CircularProgressProps } from '@mui/material';
import React from 'react';

const DEFAULT_SIZE = 24;
const DEFAULT_COLOR = 'primary';

interface IProgress {
  size?: number;
  color?: CircularProgressProps['color'];
}

function Loader({ size, color }: IProgress) {
  const indent = size ? size / 2 : DEFAULT_SIZE / 2;

  return (
    <CircularProgress
      size={size || DEFAULT_SIZE}
      color={color || DEFAULT_COLOR}
      sx={{
        position: 'absolute',
        top: `calc(50% - ${indent}px)`,
        left: `calc(50% - ${indent}px)`,
      }}
    />
  );
}

export default Loader;
