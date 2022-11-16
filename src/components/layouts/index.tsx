import { Box } from '@mui/material';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './index.module.scss';

const Layout = () => {
  return (
    <>
      <Header />
      <Box className={styles.wrap} component="main">
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};

export { Layout };
