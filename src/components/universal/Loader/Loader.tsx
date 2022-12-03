import { CircularProgress } from '@mui/material';
import React from 'react';

interface ISize {
  size?: number;
}

function Loader({ size }: ISize) {
  return (
    <CircularProgress
      size={size || 24}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: '-12px',
        marginLeft: '-12px',
      }}
    />
  );
}

export default Loader;
