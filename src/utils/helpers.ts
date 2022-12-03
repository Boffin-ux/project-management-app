import { AxiosError } from 'axios';
import { IBoard } from 'interfaces/boards';
import { IColumn } from 'interfaces/columns';
import { ITask } from 'interfaces/task';
import { IUsers } from 'interfaces/users';
import { array } from 'yup';
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
      case RESPONSE_CODES.BAD_REQUEST:
        return 'badRequest';
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

export const getUserById = (users: IUsers[], userId: string): IUsers => {
  const tempUser: IUsers = {
    _id: userId,
    name: 'noname',
    login: 'noname',
  };
  return users.find((user) => user._id === userId) || tempUser;
};

export const putTasksInColumns = (columns: IColumn[], tasks: ITask[]): IColumn[] => {
  return columns.map((column) => ({
    ...column,
    tasks: tasks.filter((task) => task.columnId === column._id).sort((a, b) => a.order - b.order),
  }));
};

export const findBoardById = (boards: IBoard[], id: string): IBoard => {
  return boards.find((board) => board._id === id) as IBoard;
};
