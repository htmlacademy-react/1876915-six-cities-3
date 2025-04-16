import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_CITY } from '../../const';
import { SliceNameSpace } from '../../const';
import { MarkerType, MarkerState } from '../../types';

const initialState: MarkerState = {
  activeMarker: DEFAULT_CITY,
};

const markerSlice = createSlice({
  name: SliceNameSpace.Place,
  initialState,
  reducers: {
    setActiveMarker: (state, action: PayloadAction<MarkerType>) => {
      state.activeMarker = action.payload;
    },
  },
});

export const markerActions = markerSlice.actions;
export const markerReducer = markerSlice.reducer;
