import React from 'react';
import { Button, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { IPropsConfirm } from 'interfaces/modal';

export default function ConfirmButtons({ action, closeModal }: IPropsConfirm) {
  const { t } = useTranslation();

  return (
    <Grid container spacing={1} justifyContent="center" gap={2} paddingTop={2}>
      <Button
        color="success"
        variant="contained"
        onClick={action}
        sx={{ width: { xs: '100%', sm: '25%' }, textTransform: 'none' }}
      >
        {t('confirmBtn.agreeBtnForm')}
      </Button>
      <Button
        color="error"
        variant="contained"
        onClick={closeModal}
        sx={{ width: { xs: '100%', sm: '25%' }, textTransform: 'none' }}
      >
        {t('confirmBtn.disagreeBtnForm')}
      </Button>
    </Grid>
  );
}
