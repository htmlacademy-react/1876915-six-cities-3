import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { PlaceData, RequestStatus } from '../../types';
import { createCommentAction, fetchFavoritesAction, fetchNearbyPreviewsAction, fetchPlaceAction, fetchPlaceCommentsAction, fetchPreviewsAction } from '../api-actions';

const initialState: PlaceData = {
  previewsFetchStatus: RequestStatus.Pending,
  placeFetchStatus: RequestStatus.Fulfilled,
  nearbyFetchStatus: RequestStatus.Fulfilled,
  favoritesFetchStatus: RequestStatus.Fulfilled,
  commentsFetchStatus: RequestStatus.Fulfilled,
  commentsCreateStatus: RequestStatus.Fulfilled,
  previews: [],
  favorites: [],
  comments: [],
  place: null,
  nearbyPreviews: [],
};

export const placeData = createSlice({
  name: NameSpace.Data,
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
      })
      .addCase(createCommentAction.fulfilled, (state, { payload }) => {
        state.comments = state.comments.concat(payload);
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
};

