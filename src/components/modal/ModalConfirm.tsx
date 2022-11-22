import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ModalBasic from 'components/modal/ModalBasic';
import { useAppDispatch } from 'hooks/redux';
import { IPropsConfirm } from 'interfaces/modal';
import { closeModal } from 'store/main/slice';

export default function ModalConfirm({ action, modalTitle }: IPropsConfirm) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleClose = () => dispatch(closeModal());

  return (
    <ModalBasic modalTitle={t(modalTitle)}>
      <Grid container spacing={1} justifyContent="center" gap={2} paddingTop={2}>
        <Button
          color="success"
          variant="contained"
          onClick={action}
          sx={{ width: { xs: '100%', sm: '25%' }, textTransform: 'none' }}
        >
          <Typography variant="body1">{t('confirmBtn.agreeBtnForm')}</Typography>
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleClose}
          sx={{ width: { xs: '100%', sm: '25%' }, textTransform: 'none' }}
        >
          <Typography variant="body1">{t('confirmBtn.disagreeBtnForm')}</Typography>
        </Button>
      </Grid>
    </ModalBasic>
  );
}
