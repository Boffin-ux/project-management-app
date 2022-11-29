import axios from 'axios';
import { store } from 'index';
import { logout } from 'store/user/slice';
import { RESPONSE_CODES } from 'utils/variables';
// const BASE_URL = 'https://final-task-backend-production-4e60.up.railway.app/';
const BASE_URL = 'https://final-task.cyclic.app/';

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

axiosPrivate.interceptors.request.use(
  (config) => {
    config.headers = config.headers ?? {};
    if (!config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${store.getState().user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === RESPONSE_CODES.INVALID_TOKEN) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);
