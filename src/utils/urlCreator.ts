import { API_ENDPOINTS } from './variables';

export const URLColumnsGet = (boardId: string): string => {
  return `${API_ENDPOINTS.BOARDS}/${boardId}/${API_ENDPOINTS.COLUMNS}`;
};

export const URLColumnPost = (boardId: string): string => {
  return API_ENDPOINTS.BOARDS + '/' + boardId + '/' + API_ENDPOINTS.COLUMNS;
};

export const URLColumnDelete = (boardId: string, columnId: string) => {
  return API_ENDPOINTS.BOARDS + '/' + boardId + '/' + API_ENDPOINTS.COLUMNS + '/' + columnId;
};
