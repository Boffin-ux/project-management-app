import { ITask } from './task';

export interface IColumnSet {
  _id: string;
  order: number;
}

export interface IColumn extends IColumnSet {
  title: string;
  boardId: string;
  tasks: Array<ITask>;
}

export interface Icolumns {
  columns: IColumn[];
}

export interface IColumnState {
  columns: IColumn[];
  isLoading: boolean;
  error: string | null;
}

export interface IRequestForCreateColumns {
  title: string;
  order: number;
  boardId: string;
}
