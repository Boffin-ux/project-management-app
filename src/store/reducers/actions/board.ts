import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosPrivate } from 'api/axios';
import { AxiosError } from 'axios';
import { IBoard, ResponceBoard, ResponceBoard as ResponseBoard } from 'interfaces/boards';
import { axiosErrorHandler } from 'utils/helpers';
import { API_ENDPOINTS } from 'utils/variables';
import { IRequestForBoard } from 'interfaces/boards';

type PayloadActionError = PayloadAction<string>;

export const getAllBoards = createAsyncThunk<Array<IBoard>, void, { rejectValue: string }>(
  'boards/all',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get(API_ENDPOINTS.BOARDS);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue('dddd');
    }
  }
);

export const createBoard = createAsyncThunk(
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

export const deleteBoard = createAsyncThunk(
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
