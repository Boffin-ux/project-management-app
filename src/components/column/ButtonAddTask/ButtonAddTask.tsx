import { Box, Button } from '@mui/material';
import AddTaskIcon from '@mui/icons-material/AddTask';
import styles from './ButtonAddTask.module.scss';
import React, { FC } from 'react';

export interface CaptureButtonProp {
  title: string;
  isCapture: boolean;
  clickAction: () => void;
}

export const ButtonAddTask: FC<CaptureButtonProp> = ({ title, isCapture, clickAction }) => {
  return (
    <Box className={styles.wrapper}>
      <Button
        variant={isCapture ? 'contained' : 'text'}
        sx={{ fontSize: '13', height: 25 }}
        fullWidth
        startIcon={<AddTaskIcon />}
        onClick={clickAction}
      >
        {isCapture && `${title}`}
      </Button>
    </Box>
  );
};
