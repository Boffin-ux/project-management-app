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

export interface IColumnHeaderProps {
  columnId: string;
  boardId: string;
  title: string;
  order?: number;
}

export interface IColumns {
  columns: IColumn[];
}

export interface IDeleteColumn {
  boardId: string;
  columnId: string;
}

export type IError = string | null;

export interface IColumnState {
  columns: IColumn[];
  isLoading: boolean;
  isGetColums: boolean;
  isDeleteColumn: boolean;
  error: IError;
}

export interface IRequestForCreateColumns {
  title: string;
  order: number;
  boardId: string;
}
