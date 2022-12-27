import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IColumn, IColumnState } from 'interfaces/columns';

import {
  createColumn,
  deleteColumn,
  getColumnsByBoardId,
  updateColumn,
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
  reducers: {
    moveColumns: (state, action: PayloadAction<IColumn[]>) => {
      state.columns = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getColumnsByBoardId.pending, (state) => {
        state.columns = [];
        state.isLoading = true;
        state.error = '';
      })
      .addCase(getColumnsByBoardId.fulfilled, (state, action: PayloadAction<IColumn[]>) => {
        state.isLoading = false;
        state.columns = action.payload.sort((a, b) => a.order - b.order);
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
      .addCase(createColumn.fulfilled, (state, action: PayloadAction<IColumn>) => {
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
      .addCase(updateColumnsSet.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateColumnsSet.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateColumn.pending, (state) => {
        state.error = null;
      })
      .addCase(updateColumn.fulfilled, (state, action: PayloadAction<IColumn>) => {
        state.columns = state.columns.map((column) =>
          column._id === action.payload._id
            ? { ...column, title: action.payload.title }
            : { ...column }
        );
      })
      .addCase(updateColumn.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteColumn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteColumn.fulfilled, (state, action: PayloadAction<IColumn>) => {
        state.isLoading = false;
        state.columns = state.columns.filter((column) => column._id !== action.payload._id);
      })
      .addCase(deleteColumn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { moveColumns } = columnSlice.actions;
export default columnSlice.reducer;
