import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosPrivate } from 'api/axios';
import { AxiosError } from 'axios';
import { IBoard, ResponceBoard, ResponceBoard as ResponseBoard } from 'interfaces/boards';
import { axiosErrorHandler } from 'utils/helpers';
import { API_ENDPOINTS } from 'utils/variables';

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
