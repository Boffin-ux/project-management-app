const LOCALES = {
  ENGLISH: 'en',
  RUSSIAN: 'ru',
};

const VIEW_PATH = {
  HOME: '/',
  ABOUT: 'about',
  ERROR: '404',
  SIGN_IN: 'signin',
  SIGN_UP: 'signup',
  BOARDS: 'boards',
  REST: '*',
};

const PAGES_TITLE = {
  MAIN: 'Project Management App',
  NOT_FOUND: '404',
};

const API_ENDPOINTS = {
  SIGN_IN: 'auth/signin',
  SIGN_UP: 'auth/signup',
  BOARDS: 'boards',
  BOARDSSET: 'boardsSet',
};

const RESPONSE_CODES = {
  BAD_REQUEST: 400,
  AUTH_ERROR: 401,
  INVALID_TOKEN: 403,
  ALREADY_EXIST: 409,
};

export { LOCALES, VIEW_PATH, PAGES_TITLE, API_ENDPOINTS, RESPONSE_CODES };
