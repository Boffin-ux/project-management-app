import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoardState } from 'interfaces/boards';
import { getAllBoards, createBoard } from 'store/reducers/actions/board';

const initialState: IBoardState = {
  boards: [],
  isLoading: false,
  error: null,
};

export const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllBoards.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllBoards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.boards = action.payload;
      })
      .addCase(getAllBoards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createBoard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.boards.push(action.payload);
      })
      .addCase(createBoard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default boardSlice.reducer;
