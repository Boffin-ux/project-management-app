import useAuth from 'hooks/useAuth';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { VIEW_PATH } from 'utils/variables';

const AuthRedirect = ({ withAuth = true }) => {
  const isAuth = useAuth();

  if (withAuth) {
    return isAuth ? <Outlet /> : <Navigate to={`/${VIEW_PATH.SIGNIN}`} replace />;
  } else {
    return isAuth ? <Navigate to={`/${VIEW_PATH.BOARDS}`} replace /> : <Outlet />;
  }
};
export default AuthRedirect;
