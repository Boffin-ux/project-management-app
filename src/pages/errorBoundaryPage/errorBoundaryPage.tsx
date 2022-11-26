import { Container, Typography } from '@mui/material';
import { IErrorBoundary } from 'interfaces/errorPage';
import React from 'react';
import { useRouteError } from 'react-router-dom';

function ErrorBoundaryPage() {
  const error = useRouteError() as IErrorBoundary;

  return (
    <Container sx={{ p: 5 }}>
      <Typography component="h1" variant="h3">
        Возникла непредвиденная ошибка!
      </Typography>
      <Typography variant="h4">
        Подробности: <i>{error.statusText || error.message}</i>
      </Typography>
    </Container>
  );
}

export default ErrorBoundaryPage;
