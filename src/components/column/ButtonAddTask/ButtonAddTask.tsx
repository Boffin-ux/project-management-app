import { Box, Button } from '@mui/material';
import AddTaskIcon from '@mui/icons-material/AddTask';
import styles from './ButtonAddTask.module.scss';
import React, { FC } from 'react';

export interface CaptureButtonProp {
  title: string;
  isCapture: boolean;
}

export const ButtonAddTask: FC<CaptureButtonProp> = ({ title, isCapture }) => {
  return (
    <Box className={styles.wrapper}>
      <Button
        variant={isCapture ? 'contained' : 'text'}
        sx={{ fontSize: '13', height: 25 }}
        fullWidth
        startIcon={<AddTaskIcon />}
      >
        {isCapture && `${title}`}
      </Button>
    </Box>
  );
};
