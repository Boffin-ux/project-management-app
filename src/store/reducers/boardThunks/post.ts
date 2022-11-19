import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from 'api/axios';
import { AxiosError } from 'axios';
import { IRequestForBoard } from 'interfaces/boards';
import { axiosErrorHandler } from 'utils/helpers';
import { API_ENDPOINTS } from 'utils/variables';

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
