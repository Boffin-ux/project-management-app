import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'api/axios';
import { AxiosError } from 'axios';
import { IAuthState, ISignInData, ISingUpData } from 'interfaces/auth';
import { API_ENDPOINTS, RESPONSE_CODES } from 'utils/variables';

const initialState: IAuthState = {
  token: localStorage.getItem('pmAppToken') ?? null, // This is totally unsecure, but it's just a study project. :)
  status: null,
  error: null,
};

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (signInData: ISignInData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_ENDPOINTS.SIGNIN, signInData);
      localStorage.setItem('pmAppToken', response.data.token); // Not the best solution actually. It's better to create
      // some auth middleware to save and restore data from localstorage, or maybe use react-persist library.
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      if (!err?.response) {
        return rejectWithValue('authNoResponse');
      } else if (err.response?.status === RESPONSE_CODES.SIGNUP.WRONG_PASSWORD) {
        return rejectWithValue('authWrongPassword');
      } else {
        return rejectWithValue('authLoginFailed');
      }
    }
  }
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (signUpData: ISingUpData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_ENDPOINTS.SIGNUP, signUpData);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      if (!err?.response) {
        return rejectWithValue('authNoResponse');
      } else if (err.response?.status === RESPONSE_CODES.SIGNIN.LOGIN_EXIST) {
        return rejectWithValue('authLoginExist');
      } else {
        return rejectWithValue('authLoginFailed');
      }
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(signIn.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(signUp.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token; // ???
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
