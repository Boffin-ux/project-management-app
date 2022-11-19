import axios from 'axios';
import { store } from 'components/app/App';
import { logout } from 'store/reducers/AuthSlice';
import { RESPONSE_CODES } from 'utils/variables';
const BASE_URL = 'https://final-task-backend-production-4e60.up.railway.app/';

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  // withCredentials: true,
});

axiosPrivate.interceptors.request.use(
  (config) => {
    config.headers = config.headers ?? {};
    if (!config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${store.getState().auth.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === RESPONSE_CODES.AUTH_ERROR) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);
