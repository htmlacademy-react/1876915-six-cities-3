import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_CITY, NameSpace } from '../../const';
import { MarkerType, PlaceProcess } from '../../types';

const initialState: PlaceProcess = {
  activeMarker: DEFAULT_CITY,
};

export const placeProcess = createSlice({
  name: NameSpace.Place,
  initialState,
  reducers: {
    setActiveMarker: (state, action: PayloadAction<MarkerType>) => {
      state.activeMarker = action.payload;
    },
  },
});

export const placeProcessActions = placeProcess.actions;
