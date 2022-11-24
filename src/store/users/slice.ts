import { createSlice } from '@reduxjs/toolkit';
import { IUsers } from 'interfaces/users';
import { getUsers } from './thunks';

interface UsersState {
  isLoading: boolean;
  error: string | null;
  users: IUsers[];
}

const initialState: UsersState = {
  error: null,
  isLoading: false,
  users: [],
};

export const allUsersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default allUsersSlice.reducer;
