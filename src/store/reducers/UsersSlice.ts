import { createSlice } from '@reduxjs/toolkit';
import { IUsersState } from 'interfaces/users';
import { deleteUser, getUserInfo, updateUserInfo } from './actions/users';
import { logout } from './AuthSlice';

const initialState: IUsersState = {
  name: null,
  login: null,
  isLoading: false,
  error: null,
};

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
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        logout();
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { cleanUserData } = usersSlice.actions;
export default usersSlice.reducer;
