import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'api/axios';
import { AxiosError } from 'axios';

interface IAuthState {
  token: string;
  status: string;
  error: string | null;
}

const initialState: IAuthState = {
  token: '',
  status: '',
  error: '',
};
interface ISignInData {
  login: string;
  password: string;
}

interface ISingUpData extends ISignInData {
  name: string;
}

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (signInData: ISignInData, { rejectWithValue }) => {
    try {
      const response = await axios.post('auth/signin', signInData);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      if (!err?.response) {
        return rejectWithValue('authNoResponse');
      } else if (err.response?.status === 401) {
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
      const response = await axios.post('auth/signup', signUpData);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      if (!err?.response) {
        return rejectWithValue('authNoResponse');
      } else if (err.response?.status === 409) {
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
  reducers: {},
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
        state.token = action.payload.token;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
