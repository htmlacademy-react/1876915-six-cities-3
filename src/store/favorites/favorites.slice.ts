import { createSlice } from '@reduxjs/toolkit';
import { SliceNameSpace } from '../../const';
import { FavoriteState, RequestStatus } from '../../types';
import { changeFavoriteStatusAction, fetchFavoritesAction } from '../../services/api-actions';

const initialState: FavoriteState = {
  favoritesFetchStatus: RequestStatus.Fulfilled,
  changeFavoriteStatus: {},
  favorites: [],
};

export const favoriteSlice = createSlice({
  name: SliceNameSpace.Favorites,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoritesAction.fulfilled, (state, { payload }) => {
        state.favorites = payload;
        state.favoritesFetchStatus = RequestStatus.Fulfilled;
      })
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.favoritesFetchStatus = RequestStatus.Pending;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.favoritesFetchStatus = RequestStatus.Rejected;
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, { payload }) => {

        state.changeFavoriteStatus[payload.id] = RequestStatus.Fulfilled;

        if (!payload.isFavorite) {
          state.favorites = state.favorites.filter((item) => item.id !== payload.id);
          return;
        }

        const place = state.favorites.find((item) => item.id === payload.id);
        if (!place) {
          state.favorites = state.favorites.concat(payload);
        }
      })
      .addCase(changeFavoriteStatusAction.pending, (state, { meta }) => {
        state.changeFavoriteStatus[meta.arg.placeId] = RequestStatus.Pending;
      })
      .addCase(changeFavoriteStatusAction.rejected, (state, { meta }) => {
        state.changeFavoriteStatus[meta.arg.placeId] = RequestStatus.Rejected;
      });
  },
});

export const favoriteActions = {
  ...favoriteSlice.actions,
  fetchFavoritesAction,
  changeFavoriteStatusAction,
};

export const favoriteReducer = favoriteSlice.reducer;
