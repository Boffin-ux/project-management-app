import { IUser } from 'interfaces/users';
import { CardDisplayType } from 'pages/boardList/controlUnit/mappingSpaces/views';

export interface IBoardState {
  boards: Array<IBoard>;
  displayedView: string;
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

export const INITIAL_IBOARD = {
  _id: '',
  owner: '',
  title: '',
  users: [],
};
