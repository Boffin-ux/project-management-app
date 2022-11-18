import { AxiosError } from 'axios';
import { RESPONSE_CODES } from './variables';

export const axiosErrorHandler = (err: AxiosError) => {
  if (!err?.response) {
    return 'authNoResponse';
  } else {
    switch (err.response?.status) {
      case RESPONSE_CODES.AUTH_ERROR:
        return 'authWrongPassword';
      case RESPONSE_CODES.ALREADY_EXIST:
        return 'authLoginExist';
      case RESPONSE_CODES.INVALID_TOKEN:
        return 'invalidToken';
      default:
        return 'authLoginFailed';
    }
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
