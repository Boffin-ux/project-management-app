import { Box } from '@mui/material';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import Loader from 'components/universal/Loader/Loader';
import { useAppSelector } from 'hooks/redux';
import { useDocumentTitle } from 'hooks/useDocumentTitle';
import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';

const Layout = () => {
  useDocumentTitle();

  if (isLoading) {
    return <Loader size={110} />;
  }

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
