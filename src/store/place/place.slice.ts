import { createSlice } from '@reduxjs/toolkit';
import { SliceNameSpace } from '../../const';
import { PlaceState, RequestStatus } from '../../types';
import { fetchNearbyPreviewsAction, fetchPlaceAction, fetchPreviewsAction } from '../../services/api-actions';

const initialState: PlaceState = {
  previewsFetchStatus: RequestStatus.Pending,
  placeFetchStatus: RequestStatus.Fulfilled,
  nearbyFetchStatus: RequestStatus.Fulfilled,
  previews: [],
  place: null,
  nearbyPreviews: [],
};

export const placeSlice = createSlice({
  name: SliceNameSpace.Place,
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
      .addCase(fetchNearbyPreviewsAction.fulfilled, (state, { payload }) => {
        state.nearbyPreviews = payload;
      });
  },
});

export const placeActions = {
  ...placeSlice.actions,
  fetchPreviewsAction,
  fetchPlaceAction,
  fetchNearbyPreviewsAction,
};

export const placeReducer = placeSlice.reducer;
