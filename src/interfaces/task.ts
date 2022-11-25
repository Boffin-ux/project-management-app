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

export interface ITaskState {
  error: string | null;
  isLoading: boolean;
  tasks: ITask[];
}

export interface ITaskRequest {
  boardId: string;
  columnId: string;
  taskId?: string;
}
