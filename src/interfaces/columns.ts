import { ITask } from './task';

export interface IColumn {
  _id: string;
  title: string;
  order: number;
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
  borderId: string;
}
