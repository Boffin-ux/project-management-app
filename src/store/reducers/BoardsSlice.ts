import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosPrivate } from 'api/axios';
import { AxiosError } from 'axios';
import { IBoard, IBoardState, IRequestForBoard } from 'interfaces/boards';
import { axiosErrorHandler } from 'utils/helpers';
import { API_ENDPOINTS } from 'utils/variables';

const initialState: IBoardState = {
  boards: [],
  isLoading: false,
  error: null,
};

export const boardsGetAll = createAsyncThunk('boards/all', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosPrivate.get(API_ENDPOINTS.BOARDS);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(axiosErrorHandler(err));
  }
});

export const boardCreate = createAsyncThunk(
  'boards/create',
  async (dataBoardCreator: IRequestForBoard, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post(API_ENDPOINTS.BOARDS, dataBoardCreator);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(axiosErrorHandler(err));
    }
  }
);

export const boardDelete = createAsyncThunk(
  'boards/delete',
  async (boardId: string, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.delete(`${API_ENDPOINTS.BOARDS}\\${boardId}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(axiosErrorHandler(err));
    }
  }
);

export const boardUpdate = createAsyncThunk(
  'boards/update',
  async (dataBoardUpdater: IBoard, { rejectWithValue }) => {
    try {
      const requestPayload = (({ title, owner, users }) => ({ title, owner, users }))(
        dataBoardUpdater
      );
      const response = await axiosPrivate.put(
        `${API_ENDPOINTS.BOARDS}\\${dataBoardUpdater._id}`,
        requestPayload
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(axiosErrorHandler(err));
    }
  }
);

export const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(boardsGetAll.fulfilled, (state, action) => {
        state.isLoading = false;
        state.boards = action.payload;
      })
      .addCase(boardsGetAll.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(boardsGetAll.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(boardCreate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(boardCreate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.boards.push(action.payload);
      })
      .addCase(boardCreate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(boardDelete.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(boardDelete.fulfilled, (state, action) => {
        state.isLoading = false;
        state.boards = state.boards.filter((board) => board._id !== action.payload._id);
      })
      .addCase(boardDelete.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(boardUpdate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(boardUpdate.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(`Action - ${action.payload}`);
        state.boards = state.boards.map((board) =>
          board._id === action.payload._id ? action.payload : board
        );
      })
      .addCase(boardUpdate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default boardSlice.reducer;
