export interface ITask {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: Array<string>;
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
