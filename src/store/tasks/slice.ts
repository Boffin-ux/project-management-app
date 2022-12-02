import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDragDropTask } from 'interfaces/dragdrop';
import { ITask } from 'interfaces/task';
import { createTask, deleteTask, getTasks, getTasksSet, updateTask } from './thunks';

export interface ITaskState {
  tasks: ITask[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ITaskState = {
  tasks: [],
  isLoading: false,
  error: null,
};

const updateOrder = (tasks: ITask[]): ITask[] => {
  return tasks.map((task, index) => ({ ...task, order: index }));
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    moveTask: (state, action: PayloadAction<IDragDropTask>) => {
      const { sourceColumnId, destinationColumnId, sourceIndex, destinationIndex } = action.payload;
      if (destinationColumnId === sourceColumnId) {
        const columnTasks: ITask[] = [];
        const otherTasks: ITask[] = [];
        state.tasks.forEach((task) => {
          if (task.columnId === sourceColumnId) {
            columnTasks.push(task);
          } else {
            otherTasks.push(task);
          }
        });
        const [newOrder] = columnTasks.splice(sourceIndex, 1);
        columnTasks.splice(destinationIndex, 0, newOrder);
        state.tasks = [...otherTasks, ...updateOrder(columnTasks)];
      } else {
        const sourceTasks: ITask[] = [];
        const destTasks: ITask[] = [];
        const otherTasks: ITask[] = [];
        state.tasks.forEach((task) => {
          if (task.columnId === sourceColumnId) {
            sourceTasks.push(task);
          } else if (task.columnId === destinationColumnId) {
            destTasks.push(task);
          } else {
            otherTasks.push(task);
          }
        });
        const [newOrder] = sourceTasks.splice(sourceIndex, 1);
        newOrder.columnId = destinationColumnId;
        destTasks.splice(destinationIndex, 0, newOrder);
        updateOrder(sourceTasks);
        state.tasks = [...otherTasks, ...updateOrder(sourceTasks), ...updateOrder(destTasks)];
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks = [...state.tasks, action.payload];
        state.isLoading = false;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getTasksSet.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTasksSet.fulfilled, (state, action: PayloadAction<ITask[]>) => {
        state.tasks = action.payload;
      })
      .addCase(getTasksSet.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<ITask>) => {
        state.isLoading = false;
        state.tasks = state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        );
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<ITask>) => {
        state.isLoading = false;
        state.tasks = state.tasks.filter((task) => task._id != action.payload._id);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { moveTask } = tasksSlice.actions;
export default tasksSlice.reducer;
