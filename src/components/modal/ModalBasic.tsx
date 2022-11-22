import React from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { Box, Modal, Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import styles from './ModalBasic.module.scss';
import { IModalProps } from 'interfaces/modal';
import { closeModal } from 'store/main/slice';

export default function ModalBasic({ modalTitle, children }: IModalProps) {
  const dispatch = useAppDispatch();
  const { isModalOpen } = useAppSelector((state) => state.commonReducer);

  const handleClose = () => dispatch(closeModal());

  return (
    <Modal
      open={isModalOpen}
      onClose={handleClose}
      aria-labelledby={modalTitle}
      className={styles.container}
      disableAutoFocus={true}
    >
      <Box className={styles.wrapper}>
        <IconButton size="small" onClick={handleClose} className={styles.btnClose} color="inherit">
          <Close fontSize="small" />
        </IconButton>
        <Typography id={modalTitle} variant="h5" component="h5" className={styles.title}>
          {modalTitle}
        </Typography>
        {children}
      </Box>
    </Modal>
  );
}
