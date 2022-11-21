import { AxiosError } from 'axios';
import { RESPONSE_CODES } from './variables';

export const axiosErrorHandler = (err: AxiosError) => {
  if (!err?.response) {
    return 'authNoResponse';
  } else if (err.response?.status === RESPONSE_CODES.AUTH_ERROR) {
    return 'authWrongPassword';
  } else if (err.response?.status === RESPONSE_CODES.ALREADY_EXIST) {
    return 'authLoginExist';
  } else {
    return 'authLoginFailed';
  }
};

export const parseJwt = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );
  return JSON.parse(jsonPayload);
};
