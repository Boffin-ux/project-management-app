import { IOpenModal } from './modal';
import { ITask } from './task';

export interface IColumnSet {
  _id: string;
  order: number;
}

export interface IColumn extends IColumnSet, IOpenModal {
  title: string;
  boardId: string;
  tasks: Array<ITask>;
}

export interface IColumnHeaderProps extends IOpenModal {
  columnId: string;
  boardId: string;
  title: string;
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
  error: IError;
}

export interface IRequestForCreateColumns {
  title: string;
  order: number;
  boardId: string;
}
