import { IColumnSet } from './columns';
import { ITasksSet } from './task';

export interface IDragDropColumn {
  source: number;
  destination: number;
}

export interface IDragDropTask {
  sourceColumnId: string;
  destinationColumnId: string;
  sourceIndex: number;
  destinationIndex: number;
}

export interface IDragedSet {
  columns: IColumnSet[];
  tasks: ITasksSet[];
}
