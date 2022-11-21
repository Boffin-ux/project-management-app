import { createSlice } from '@reduxjs/toolkit';
import { IBoardState } from 'interfaces/boards';
import {
  getAllBoards,
  createBoard,
  deleteBoard,
  updateBoard,
  boardGetAllForUser,
} from 'store/board/thunks';

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
      })
      .addCase(deleteBoard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.boards = state.boards.filter((board) => board._id !== action.payload._id);
      })
      .addCase(deleteBoard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateBoard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.boards = state.boards.map((board) =>
          board._id === action.payload._id ? action.payload : board
        );
      })
      .addCase(updateBoard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(boardGetAllForUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(boardGetAllForUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.boards = action.payload;
      })
      .addCase(boardGetAllForUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default boardSlice.reducer;
