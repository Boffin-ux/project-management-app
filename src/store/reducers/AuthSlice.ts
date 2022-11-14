import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (loginData: IData, { rejectWithValue }) => {
    try {
      const response = await axios.post('auth/signin', loginData);
      return response.data;
    } catch (err) {
      // if (err.code === 'ERR_BAD_REQUEST') {
      //   return rejectWithValue('Authorization error');
      // }

      // I don't know how to write good error handling, please help me! :)
      return rejectWithValue('Bad request');
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // setToken(state, action: PayloadAction<string>) {
    //   state.token = action.payload;
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(signIn.pending, (state, action) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = 'failed';
        console.log(action);
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
