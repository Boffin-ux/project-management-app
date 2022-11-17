import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'api/axios';
import { AxiosError } from 'axios';
import { IAuthState, ISignInData, ISingUpData } from 'interfaces/auth';
import { axiosErrorHandler } from 'utils/helpers';
import { API_ENDPOINTS } from 'utils/variables';

const initialState: IAuthState = {
  token: localStorage.getItem('pmAppToken') ?? '',
  isLoading: false,
  error: null,
};

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (signInData: ISignInData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_ENDPOINTS.SIGN_IN, signInData);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(axiosErrorHandler(err));
    }
  }
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (signUpData: ISingUpData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_ENDPOINTS.SIGN_UP, signUpData);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(axiosErrorHandler(err));
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => ({ ...initialState, token: '' }),
  },
  extraReducers(builder) {
    builder
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token; // ???
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
