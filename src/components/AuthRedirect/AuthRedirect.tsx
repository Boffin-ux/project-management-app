import { useAppSelector } from 'hooks/redux';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { VIEW_PATH } from 'utils/variables';

const AuthRedirect = ({ withAuth = true }) => {
  const { token } = useAppSelector((state) => state.auth);
  console.log(token);

  if (withAuth) {
    return token ? <Outlet /> : <Navigate to={`/${VIEW_PATH.SIGNIN}`} replace />;
  } else {
    return token ? <Navigate to={`/${VIEW_PATH.MAIN}`} replace /> : <Outlet />;
  }
};
export default AuthRedirect;
