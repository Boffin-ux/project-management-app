import { combineReducers, configureStore } from '@reduxjs/toolkit';
import boardsReducer from './board/slice';
import commonReducer from './main/slice';
import usersReducer from './user/slice';

const rootReducer = combineReducers({
  commonReducer,
  boards: boardsReducer,
  user: usersReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
