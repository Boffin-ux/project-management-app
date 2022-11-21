import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from 'api/axios';
import { AxiosError } from 'axios';
import { IupdateUserData } from 'interfaces/users';
import { axiosErrorHandler } from 'utils/helpers';
import { API_ENDPOINTS } from 'utils/variables';

export const getUserInfo = createAsyncThunk(
  'users/getUsersInfo',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get(API_ENDPOINTS.USER_INFO + userId);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(axiosErrorHandler(err));
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  'users/updateUsersInfo',
  async (updateUserData: IupdateUserData, { rejectWithValue }) => {
    const { userId, ...otherData } = updateUserData;
    try {
      const response = await axiosPrivate.put(API_ENDPOINTS.USER_INFO + userId, otherData);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(axiosErrorHandler(err));
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.delete(API_ENDPOINTS.USER_INFO + userId);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(axiosErrorHandler(err));
    }
  }
);
