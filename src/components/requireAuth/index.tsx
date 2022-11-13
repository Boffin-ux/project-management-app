import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectCurrentToken } from 'store/reducers/AuthSlice';

const RequireAuth = () => {
  const token = useSelector(selectCurrentToken);
  console.log(token);

  return token ? <Outlet /> : <Navigate to="/signin" replace />;
};
export default RequireAuth;
