import { combineReducers, configureStore } from '@reduxjs/toolkit';
import commonReducer from './reducers/CommonSlice';
import authReducer from './reducers/AuthSlice';
import boardsReducer from './reducers/BoardsSlice';

const rootReducer = combineReducers({
  commonReducer,
  auth: authReducer,
  boards: boardsReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
