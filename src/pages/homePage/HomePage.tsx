import { Box, Container } from '@mui/material';
import React from 'react';
import Project from './project/Project';
import Team from './team/Team';

export default function HomePage() {
  return (
    <Container sx={{ display: 'flex', fontSize: '1.2rem' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: '50px', sm: '100px' },
          padding: '32px 14px',
        }}
      >
        <Project />
        <Team />
      </Box>
    </Container>
  );
}
