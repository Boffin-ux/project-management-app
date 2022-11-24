const LOCALES = {
  ENGLISH: 'en',
  RUSSIAN: 'ru',
};

const VIEW_PATH = {
  HOME: '/',
  ERROR: '404',
  SIGN_IN: 'signin',
  SIGN_UP: 'signup',
  BOARDS: 'boards',
  PROFILE: 'profile',
  BOARD: '/boards/:id',
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
  USER_INFO: 'users/',
  COLUMNS_SET: 'columnsSet',
  BOARD(boardId: string): string {
    return `${this.BOARDS}/${boardId}`;
  },
  BOARDS_SET(listBoardIds: string[]): string {
    return `boardsSet/?ids=${listBoardIds.join(',')}`;
  },
  BOARD_SET(userId: string): string {
    return `boardsSet/${userId}`;
  },
  COLUMNS(boardId: string): string {
    return `${this.BOARDS}/${boardId}/columns`;
  },
  COLUMN(boardId: string, columnId: string) {
    return `${this.COLUMNS(boardId)}/${columnId}`;
  },
};

const RESPONSE_CODES = {
  BAD_REQUEST: 400,
  AUTH_ERROR: 401,
  INVALID_TOKEN: 403,
  ALREADY_EXIST: 409,
};

export { LOCALES, VIEW_PATH, PAGES_TITLE, API_ENDPOINTS, RESPONSE_CODES };
