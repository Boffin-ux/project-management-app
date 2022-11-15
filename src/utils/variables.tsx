const LOCALES = {
  ENGLISH: 'en',
  RUSSIAN: 'ru',
};

const VIEW_PATH = {
  HOME: '/',
  ABOUT: 'about',
  ERROR: '404',
  SIGNIN: 'signin',
  SIGNUP: 'signup',
  BOARDS: 'boards',
  REST: '*',
};

const PAGES_TITLE = {
  MAIN: 'Project Management App',
  NOT_FOUND: '404',
};

const API_ENDPOINTS = {
  SIGNIN: 'auth/signin',
  SIGNUP: 'auth/signup',
};

const RESPONSE_CODES = {
  SIGNIN: {
    LOGIN_EXIST: 409,
  },
  SIGNUP: {
    WRONG_PASSWORD: 401,
  },
};

export { LOCALES, VIEW_PATH, PAGES_TITLE, API_ENDPOINTS, RESPONSE_CODES };
