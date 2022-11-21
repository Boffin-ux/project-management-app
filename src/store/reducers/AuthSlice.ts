import { createSlice } from '@reduxjs/toolkit';
import { IAuthState } from 'interfaces/auth';
import { signIn, signUp } from './actions/auth';

const initialState: IAuthState = {
  token: localStorage.getItem('pmAppToken') ?? '',
  id: '',
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.id = action.payload;
    },
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

export const { setUserId, logout } = authSlice.actions;
export default authSlice.reducer;
