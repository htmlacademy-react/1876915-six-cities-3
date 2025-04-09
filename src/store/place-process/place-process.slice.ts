import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_CITY } from '../../const';
import { SliceNameSpace } from '../../const';
import { MarkerType, PlaceProcess } from '../../types';

const initialState: PlaceProcess = {
  activeMarker: DEFAULT_CITY,
};

const placeProcess = createSlice({
  name: SliceNameSpace.Place,
  initialState,
  reducers: {
    setActiveMarker: (state, action: PayloadAction<MarkerType>) => {
      state.activeMarker = action.payload;
    },
  },
});

export const placeProcessActions = placeProcess.actions;
export const placeProcessReducer = placeProcess.reducer;
