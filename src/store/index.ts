import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { redirect } from './_middlewares/redirect/redirect';
import { placeActions, placeReducer } from './place/place.slice';
import { markerActions, markerReducer } from './marker/marker.slice';
import { userActions, userReducer } from './user/user.slice';
import { SliceNameSpace } from '../const';
import { commentActions, commentsReducer } from './comments/comments.slice';
import { favoriteActions, favoriteReducer } from './favorites/favorites.slice';

export const api = createAPI();

export const rootReducer = combineReducers({
  [SliceNameSpace.Comments]: commentsReducer,
  [SliceNameSpace.Favorites]: favoriteReducer,
  [SliceNameSpace.Marker]: markerReducer,
  [SliceNameSpace.Place]: placeReducer,
  [SliceNameSpace.User]: userReducer,
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

export const storeActions = { ...commentActions, ...favoriteActions, ...markerActions, ...placeActions, ...userActions };

export * from './_middlewares/redirect/redirect';
export * from './_middlewares/redirect/redirect-action';
export * from './comments/comments.selectors';
export * from './comments/comments.slice';
export * from './favorites/favorites.selectors';
export * from './favorites/favorites.slice';
export * from './place/place.slice';
export * from './place/place.selectors';
export * from './marker/marker.slice';
export * from './marker/marker.selectors';
export * from './user/user.slice';
export * from './user/user.selectors';
