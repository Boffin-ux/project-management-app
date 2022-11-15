import { Box } from '@mui/material';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Header />
      <Box
        sx={{
          display: 'flex',
          flexGrow: '1',
          background: 'linear-gradient(45deg,rgba(63, 191, 195, 0.8),#333)',
        }}
        component="main"
      >
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};

export { Layout };
