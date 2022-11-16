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
