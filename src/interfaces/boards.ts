import { IUser } from './user';

export interface IBoardState {
  boards: Array<IBoard>;
  isLoading: boolean;
  error: string | null;
}

export interface IRequestForBoard {
  title: string;
  owner: string;
  users: Array<string>;
}

export interface IBoard extends IRequestForBoard {
  _id: string;
}

export interface BoardCardProps {
  board: IBoard;
}

export type ResponseBoard = Array<IBoard> | string;
