import { Box } from '@mui/material';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import { useAppSelector } from 'hooks/redux';
import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';

const Layout = () => {
  const { isLoading } = useAppSelector((state) => state.user);

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
