import { combineReducers, configureStore } from '@reduxjs/toolkit';
import boardsReducer from './board/slice';
import columnReducer from './column/slice';
import commonReducer from './main/slice';
import usersReducer from './user/slice';
import allUsersSlice from './users/slice';

const rootReducer = combineReducers({
  main: commonReducer,
  boards: boardsReducer,
  user: usersReducer,
  columns: columnReducer,
  users: allUsersSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
