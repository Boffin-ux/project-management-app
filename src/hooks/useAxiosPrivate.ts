import { useEffect } from 'react';
import { axiosPrivate } from '../api/axios';
// import useAuth from './useAuth';

const auth = {
  accessToken: 'some string',
};

const useAxiosPrivate = () => {
  // const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        config.headers = config.headers ?? {};
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
  }, [auth]);

  return axiosPrivate;
};

export default useAxiosPrivate;
