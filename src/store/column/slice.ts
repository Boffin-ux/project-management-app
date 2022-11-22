import { createSlice } from '@reduxjs/toolkit';
import { IColumnState } from 'interfaces/columns';
import { createColumn, getColumnsByBoardId } from './thunks';

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
        state.isLoading = false;
      })
      .addCase(createColumn.rejected, (state, action) => {});
  },
});

export default columnSlice.reducer;
