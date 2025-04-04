import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { PlaceData, RequestStatus } from '../../types';
import { fetchFavoritePreviewsAction, fetchNearbyPreviewsAction, fetchPlaceAction, fetchPlaceCommentsAction, fetchPreviewsAction } from '../api-actions';

const initialState: PlaceData = {
  previewsFetchStatus: RequestStatus.Fulfilled,
  placeFetchStatus: RequestStatus.Fulfilled,
  nearbyFetchStatus: RequestStatus.Fulfilled,
  commentsFetchStatus: RequestStatus.Fulfilled,
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
      .addCase(fetchFavoritePreviewsAction.fulfilled, (state, { payload }) => {
        state.favorites = payload;
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
      .addCase(fetchNearbyPreviewsAction.fulfilled, (state, { payload }) => {
        state.nearbyPreviews = payload;
      });
  },
});

export const placeDataActions = {
  ...placeData.actions,
  fetchPreviewsAction,
  fetchFavoritePreviewsAction,
  fetchPlaceAction,
  fetchNearbyPreviewsAction,
  fetchPlaceCommentsAction
};

