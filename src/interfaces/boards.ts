export interface User {
  id: string;
  name: string;
  login: string;
}

export interface IBoardState {
  boards: Array<IBoard>;
  isLoading: boolean;
  error: string | null;
}

export interface IRequestForBoard {
  title: string;
  owner: string;
  users: Array<User>;
}

export interface IBoard extends IRequestForBoard {
  _id: string;
}

export interface BoardCardProps {
  board: IBoard;
}

export type ResponceBoard = Array<IBoard> | string;
