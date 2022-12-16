export interface ITaskBody {
  title: string;
  order: number;
  description: string;
  userId: string;
  users: Array<string>;
}

export interface ITask extends ITaskBody {
  _id: string;
  boardId: string;
  columnId: string;
}

export interface ITasksSet {
  _id: string;
  columnId: string;
  order: number;
}

export interface ITaskProps {
  task: ITask;
  index: number;
}

export interface ITaskState {
  error: string | null;
  isLoading: boolean;
  tasks: ITask[];
}

export interface ITaskRequest {
  boardId: string;
  columnId: string;
  _id?: string;
}
