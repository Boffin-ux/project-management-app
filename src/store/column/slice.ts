import { createSlice } from '@reduxjs/toolkit';
import { IColumnState } from 'interfaces/columns';
import {
  createColumn,
  createTask,
  deleteColumn,
  deleteTask,
  getColumnsByBoardId,
  getTasks,
  getTasksSet,
  updateColumnsSet,
} from './thunks';

const initialState: IColumnState = {
  columns: [],
  isLoading: false,
  error: null,
};

export const columnSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getColumnsByBoardId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getColumnsByBoardId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.columns = action.payload;
        state.columns = state.columns.map((column) => {
          return { ...column, tasks: [] };
        });
      })
      .addCase(getColumnsByBoardId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createColumn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createColumn.fulfilled, (state, action) => {
        state.columns.push(action.payload);
        state.columns[state.columns.length - 1].tasks = [];
        state.isLoading = false;
      })
      .addCase(createColumn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateColumnsSet.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateColumnsSet.fulfilled, (state, action) => {
        state.columns = action.payload;
        state.isLoading = false;
      })
      .addCase(updateColumnsSet.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteColumn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.columns = state.columns.filter((column) => column._id !== action.payload._id);
      })
      .addCase(deleteColumn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.length > 0) {
          const columnId = action.payload[0].columnId;
          const column = state.columns.find((column) => column._id === columnId);
          if (column) {
            column.tasks = [];
            column.tasks.push(...action.payload);
          } else {
            state.error = 'Column not found';
          }
        }
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
        const column = state.columns.find((column) => column._id === action.payload.columnId);
        if (column) {
          column.tasks.push(action.payload);
        } else {
          state.error = 'Column not found';
        }
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
      .addCase(getTasksSet.fulfilled, (state, action) => {
        state.columns = state.columns.map((column) => {
          return {
            ...column,
            tasks: [...action.payload.filter((task) => task.columnId === column._id)],
          };
        });
      })
      .addCase(getTasksSet.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        action.payload.columnId;
        state.columns = state.columns.map((column) => {
          let editTasks = Array.from(column.tasks);
          const { columnId, _id } = action.payload;
          if (column._id === columnId) {
            editTasks = editTasks.filter((task) => task._id !== _id);
          }
          return { ...column, tasks: editTasks };
        });
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default columnSlice.reducer;
