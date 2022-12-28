import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from 'interfaces/task';
import {
  createTask,
  deleteTask,
  getTasks,
  getTasksBySearch,
  getTasksSet,
  updateTask,
} from './thunks';

export interface ITaskState {
  tasks: ITask[];
  searchTasks: ITask[];
  isLoading: boolean;
  isGetTasksSet: boolean;
  error: string | null;
}

const initialState: ITaskState = {
  tasks: [],
  searchTasks: [],
  isLoading: false,
  isGetTasksSet: false,
  error: null,
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    moveTask: (state, action: PayloadAction<ITask[]>) => {
      state.tasks = action.payload;
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
        state.isGetTasksSet = true;
        state.error = null;
      })
      .addCase(getTasksSet.fulfilled, (state, action: PayloadAction<ITask[]>) => {
        state.isGetTasksSet = false;
        state.tasks = action.payload;
      })
      .addCase(getTasksSet.rejected, (state, action) => {
        state.isGetTasksSet = false;
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
      })
      .addCase(getTasksBySearch.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTasksBySearch.fulfilled, (state, action: PayloadAction<ITask[]>) => {
        state.isLoading = false;
        state.searchTasks = action.payload;
      })
      .addCase(getTasksBySearch.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { moveTask } = tasksSlice.actions;
export default tasksSlice.reducer;
