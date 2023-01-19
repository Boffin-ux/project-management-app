import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoardState } from 'interfaces/boards';
import { CardDisplayType } from 'pages/boardList/controlUnit/mappingSpaces/views';
import {
  getAllBoards,
  createBoard,
  deleteBoard,
  updateBoard,
  boardGetAllForUser,
} from 'store/board/thunks';

const initialState: IBoardState = {
  boards: [],
  displayedView: CardDisplayType.grid,
  isLoading: false,
  isCreateBoard: false,
  isDeleteBoard: false,
  isUpdateBoard: false,
  isSuccess: false,
  isSuccessCreate: false,
  error: null,
};

export const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    changeView: (state, action: PayloadAction<string>) => {
      state.displayedView = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllBoards.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(getAllBoards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.boards = action.payload;
      })
      .addCase(getAllBoards.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.error = action.payload as string;
      })
      .addCase(createBoard.pending, (state) => {
        state.isCreateBoard = true;
        state.isSuccessCreate = false;
        state.error = null;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.isCreateBoard = false;
        state.isSuccessCreate = true;
        state.boards.push(action.payload);
      })
      .addCase(createBoard.rejected, (state, action) => {
        state.isCreateBoard = false;
        state.isSuccessCreate = false;
        state.error = action.payload as string;
      })
      .addCase(deleteBoard.pending, (state) => {
        state.isDeleteBoard = true;
        state.error = null;
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.isDeleteBoard = false;
        state.boards = state.boards.filter((board) => board._id !== action.payload._id);
      })
      .addCase(deleteBoard.rejected, (state, action) => {
        state.isDeleteBoard = false;
        state.error = action.payload as string;
      })
      .addCase(updateBoard.pending, (state) => {
        state.isUpdateBoard = true;
        state.error = null;
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        state.isUpdateBoard = false;
        state.boards = state.boards.map((board) =>
          board._id === action.payload._id ? action.payload : board
        );
      })
      .addCase(updateBoard.rejected, (state, action) => {
        state.isUpdateBoard = false;
        state.error = action.payload as string;
      })
      .addCase(boardGetAllForUser.pending, (state) => {
        state.isSuccess = false;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(boardGetAllForUser.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.boards = action.payload;
      })
      .addCase(boardGetAllForUser.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { changeView } = boardSlice.actions;
export default boardSlice.reducer;
