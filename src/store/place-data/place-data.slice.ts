import { createSlice } from '@reduxjs/toolkit';
import { SliceNameSpace } from '../../const';
import { PlaceDataProcess, RequestStatus } from '../../types';
import { changeFavoriteStatusAction, createCommentAction, fetchFavoritesAction, fetchNearbyPreviewsAction, fetchPlaceAction, fetchPlaceCommentsAction, fetchPreviewsAction } from '../../services/api-actions';

const initialState: PlaceDataProcess = {
  previewsFetchStatus: RequestStatus.Pending,
  placeFetchStatus: RequestStatus.Fulfilled,
  nearbyFetchStatus: RequestStatus.Fulfilled,
  favoritesFetchStatus: RequestStatus.Fulfilled,
  commentsFetchStatus: RequestStatus.Fulfilled,
  commentsCreateStatus: RequestStatus.Fulfilled,
  changeFavoriteStatus: RequestStatus.Fulfilled,
  previews: [],
  favorites: [],
  comments: [],
  place: null,
  nearbyPreviews: [],
};

export const placeData = createSlice({
  name: SliceNameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPreviewsAction.fulfilled, (state, { payload }) => {
        state.previews = payload;
        state.previewsFetchStatus = RequestStatus.Fulfilled;
      })
      .addCase(fetchPreviewsAction.pending, (state) => {
        state.previewsFetchStatus = RequestStatus.Pending;
      })
      .addCase(fetchPreviewsAction.rejected, (state) => {
        state.previewsFetchStatus = RequestStatus.Rejected;
      })
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
        state.changeFavoriteStatus = RequestStatus.Fulfilled;

        if (!payload.isFavorite) {
          state.favorites = state.favorites.filter((item) => item.id !== payload.id);
          return;
        }

        const place = state.favorites.find((item) => item.id === payload.id);
        if (!place) {
          state.favorites = state.favorites.concat(payload);
        }
      })
      .addCase(changeFavoriteStatusAction.pending, (state) => {
        state.changeFavoriteStatus = RequestStatus.Pending;
      })
      .addCase(changeFavoriteStatusAction.rejected, (state) => {
        state.changeFavoriteStatus = RequestStatus.Rejected;
      })
      .addCase(fetchPlaceAction.fulfilled, (state, { payload }) => {
        state.place = payload;
        state.placeFetchStatus = RequestStatus.Fulfilled;
      })
      .addCase(fetchPlaceAction.pending, (state) => {
        state.placeFetchStatus = RequestStatus.Pending;
      })
      .addCase(fetchPlaceAction.rejected, (state) => {
        state.placeFetchStatus = RequestStatus.Rejected;
      })
      .addCase(fetchPlaceCommentsAction.fulfilled, (state, { payload }) => {
        state.comments = payload;
        state.commentsFetchStatus = RequestStatus.Fulfilled;
      })
      .addCase(fetchPlaceCommentsAction.pending, (state) => {
        state.commentsFetchStatus = RequestStatus.Pending;
      })
      .addCase(fetchPlaceCommentsAction.rejected, (state) => {
        state.commentsFetchStatus = RequestStatus.Rejected;
      })
      .addCase(createCommentAction.fulfilled, (state, { payload }) => {
        state.comments.push(payload);
        state.commentsCreateStatus = RequestStatus.Fulfilled;
      })
      .addCase(createCommentAction.pending, (state) => {
        state.commentsCreateStatus = RequestStatus.Pending;
      })
      .addCase(createCommentAction.rejected, (state) => {
        state.commentsCreateStatus = RequestStatus.Rejected;
      })
      .addCase(fetchNearbyPreviewsAction.fulfilled, (state, { payload }) => {
        state.nearbyPreviews = payload;
      });
  },
});

export const placeDataActions = {
  ...placeData.actions,
  fetchPreviewsAction,
  fetchFavoritesAction,
  fetchPlaceAction,
  fetchNearbyPreviewsAction,
  fetchPlaceCommentsAction,
  createCommentAction,
  changeFavoriteStatusAction,
};

export const placeDataReducer = placeData.reducer;
