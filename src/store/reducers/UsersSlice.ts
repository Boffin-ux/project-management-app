import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosPrivate } from 'api/axios';
import { AxiosError } from 'axios';
import { IupdateUserData, IUsersState } from 'interfaces/users';
import { axiosErrorHandler } from 'utils/helpers';
import { API_ENDPOINTS } from 'utils/variables';

const initialState: IUsersState = {
  name: null,
  login: null,
  isLoading: false,
  error: null,
};

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
    const { userId, name, login, password } = updateUserData;
    try {
      const response = await axiosPrivate.put(API_ENDPOINTS.USER_INFO + userId, {
        name,
        login,
        password,
      });
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(axiosErrorHandler(err));
    }
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    cleanUserData: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.name = action.payload.name;
        state.login = action.payload.login;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.name = action.payload.name;
        state.login = action.payload.login;
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { cleanUserData } = usersSlice.actions;
export default usersSlice.reducer;
