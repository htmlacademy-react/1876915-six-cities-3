import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { PlaceData } from '../../types/state';
import { fetchFavoritePreviewsAction, fetchNearbyPreviewsAction, fetchOfferAction, fetchPreviewsAction } from '../api-actions';

const initialState: PlaceData = {
  previews: [],
  favorites: [],
  offer: null,
  nearby: {
    placeId: '',
    nearbyPreviews: [],
  }
};

export const placeData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPreviewsAction.fulfilled, (state, { payload }) => {
        state.previews = payload;
      })
      .addCase(fetchFavoritePreviewsAction.fulfilled, (state, { payload }) => {
        state.favorites = payload;
      })
      .addCase(fetchOfferAction.fulfilled, (state, { payload }) => {
        state.offer = payload;
      })
      .addCase(fetchNearbyPreviewsAction.fulfilled, (state, { payload: { placeId, previews } }) => {
        const offer = state.offer;
        if (offer && offer.id === placeId) {
          state.nearby.placeId = placeId;
          state.nearby.nearbyPreviews = previews;
        }
      });
  },
});
