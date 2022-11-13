import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'api/axios';

interface IState {
  token: string;
  status: string;
  error: string | undefined;
}

const initialState: IState = {
  token: '',
  status: '',
  error: '',
};
interface IData {
  login: string;
  password: string;
}

export const signIn = createAsyncThunk('auth/signIn', async (loginData: IData) => {
  const response = await axios.post('auth/signin', loginData);
  return response.data;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signIn.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

interface IGlobalState {
  auth: IState;
}

export const selectCurrentToken = (state: IGlobalState) => state.auth.token;

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
