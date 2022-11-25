import React from 'react';
import { Box, Modal, Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import styles from './ModalBasic.module.scss';
import { IModalProps } from 'interfaces/modal';

export default function ModalBasic({
  isModalActive,
  closeModal,
  modalTitle,
  children,
}: IModalProps) {
  return (
    <Modal
      open={isModalActive}
      onClose={closeModal}
      aria-labelledby={modalTitle}
      className={styles.container}
      disableAutoFocus={true}
    >
      <Box className={styles.wrapper}>
        <IconButton size="small" onClick={closeModal} className={styles.btnClose} color="inherit">
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
