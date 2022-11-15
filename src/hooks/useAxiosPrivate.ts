import { useEffect } from 'react';
import { logout } from 'store/reducers/AuthSlice';
import { RESPONSE_CODES } from 'utils/variables';
import { axiosPrivate } from '../api/axios';
import { useAppDispatch } from './redux';
import useAuth from './useAuth';

const useAxiosPrivate = () => {
  const token = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        config.headers = config.headers ?? {};
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error?.response?.status === RESPONSE_CODES.AUTH_ERROR) {
          dispatch(logout());
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [token]);

  return axiosPrivate;
};

export default useAxiosPrivate;
