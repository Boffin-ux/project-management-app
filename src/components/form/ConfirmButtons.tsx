import React from 'react';
import { Button, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { IPropsConfirm } from 'interfaces/modal';
import Loader from 'components/universal/Loader/Loader';

export default function ConfirmButtons({ action, closeModal, isLoading }: IPropsConfirm) {
  const { t } = useTranslation();

  return (
    <Grid container spacing={1} justifyContent="center" gap={2} paddingTop={2}>
      <Button
        color="success"
        variant="contained"
        onClick={action}
        disabled={isLoading}
        sx={{
          width: { xs: '100%', sm: '25%' },
          textTransform: 'none',
          position: 'relative',
          minHeight: '40px',
        }}
      >
        {isLoading ? <Loader /> : t('confirmBtn.agreeBtnForm')}
      </Button>
      <Button
        color="error"
        variant="contained"
        onClick={closeModal}
        disabled={isLoading}
        sx={{ width: { xs: '100%', sm: '25%' }, textTransform: 'none' }}
      >
        {t('confirmBtn.disagreeBtnForm')}
      </Button>
    </Grid>
  );
}
