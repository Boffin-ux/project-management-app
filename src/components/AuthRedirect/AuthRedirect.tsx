import { useAppSelector } from 'hooks/redux';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { VIEW_PATH } from 'utils/variables';

const AuthRedirect = ({ withAuth = true }) => {
  const { token } = useAppSelector((state) => state.user);

  if (withAuth) {
    return token ? <Outlet /> : <Navigate to={VIEW_PATH.HOME} replace />;
  } else {
    return token ? <Navigate to={VIEW_PATH.BOARDS} replace /> : <Outlet />;
  }
};
export default AuthRedirect;
