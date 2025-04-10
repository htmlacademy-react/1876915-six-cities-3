import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { redirect } from './middlewares/redirect';
import { placeDataReducer } from './place-data/place-data.slice';
import { placeProcessReducer } from './place-process/place-process.slice';
import { userProcessReducer } from './user-process/user-process.slice';
import { SliceNameSpace } from '../const';

export const api = createAPI();

export const rootReducer = combineReducers({
  [SliceNameSpace.Data]: placeDataReducer,
  [SliceNameSpace.Place]: placeProcessReducer,
  [SliceNameSpace.User]: userProcessReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

export * from '../store/middlewares/redirect';
export * from '../store/middlewares/redirect-action';
export * from '../store/place-data/place-data.slice';
export * from '../store/place-data/place-data.selectors';
export * from '../store/place-process/place-process.slice';
export * from '../store/place-process/place-process.selectors';
export * from './user-process/user-process.slice';
export * from '../store/user-process/user-process.selectors';
