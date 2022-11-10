import Footer from 'components/footer';
import Header from 'components/header';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export { Layout };
