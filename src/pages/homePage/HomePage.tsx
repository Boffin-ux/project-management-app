import { Box, Container } from '@mui/material';
import React from 'react';
import Project from './project/Project';
import Team from './team/Team';
import styles from './Home.module.scss';

export default function HomePage() {
  return (
    <Container className={styles.container}>
      <Box className={styles.wrapper}>
        <Project />
        <Team />
      </Box>
    </Container>
  );
}
