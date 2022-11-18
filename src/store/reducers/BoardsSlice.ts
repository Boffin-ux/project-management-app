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

export const boardGetAll = createAsyncThunk('boards/all', async (_, { rejectWithValue }) => {
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

export const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(boardGetAll.fulfilled, (state, action) => {
        state.isLoading = false;
        state.boards = action.payload;
      })
      .addCase(boardGetAll.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(boardGetAll.pending, (state) => {
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
      });
  },
});

export default boardSlice.reducer;
