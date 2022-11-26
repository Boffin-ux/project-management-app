import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from 'api/axios';
import { AxiosError } from 'axios';
import { axiosErrorHandler } from 'utils/helpers';
import { API_ENDPOINTS } from 'utils/variables';
import { IUsers } from 'interfaces/users';

export const getUsers = createAsyncThunk<Array<IUsers>, void, { rejectValue: string }>(
  'users/all',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get(API_ENDPOINTS.USERS);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(axiosErrorHandler(err));
    }
  }
);
