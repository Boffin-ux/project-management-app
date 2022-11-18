import useAccessToken from 'hooks/useAccessToken';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { VIEW_PATH } from 'utils/variables';

const AuthRedirect = ({ withAuth = true }) => {
  const isAuth = useAccessToken();

  if (withAuth) {
    return isAuth ? <Outlet /> : <Navigate to={VIEW_PATH.HOME} replace />;
  } else {
    return isAuth ? <Navigate to={VIEW_PATH.BOARDS} replace /> : <Outlet />;
  }
};
export default AuthRedirect;
