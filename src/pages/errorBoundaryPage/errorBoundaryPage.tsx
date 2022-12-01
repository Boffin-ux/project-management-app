import { Box, Container, Typography } from '@mui/material';
import { IErrorBoundary } from 'interfaces/errorPage';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRouteError } from 'react-router-dom';
import styles from './ErrorBoundaryPage.module.scss';

function ErrorBoundaryPage() {
  const error = useRouteError() as IErrorBoundary;
  const { t } = useTranslation();

  return (
    <Container sx={{ p: 5 }}>
      <Box className={styles.boundaryWrap}>
        <Typography component="h2" variant="h3" textAlign={'center'}>
          {t('errorBoundary.title')}
        </Typography>
        <Typography variant="h4" textAlign={'center'}>
          {t('errorBoundary.subTitle')}: <i>{error.statusText || error.message}</i>
        </Typography>
      </Box>
    </Container>
  );
}

export default ErrorBoundaryPage;
