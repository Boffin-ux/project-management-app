import { Box } from '@mui/material';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import { useDocumentTitle } from 'hooks/useDocumentTitle';
import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';

const Layout = () => {
  useDocumentTitle();

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

export default Layout;
