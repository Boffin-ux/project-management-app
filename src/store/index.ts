import { combineReducers, configureStore } from '@reduxjs/toolkit';
import commonReducer from './reducers/common/CommonSlice';

const rootReducer = combineReducers({
  commonReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
