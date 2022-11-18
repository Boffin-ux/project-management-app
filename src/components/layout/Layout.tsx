import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import Loader from 'components/universal/Loader/Loader';
import { useAppSelector } from 'hooks/redux';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const { isLoading } = useAppSelector((state) => state.users);

  if (isLoading) return <Loader />;

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
