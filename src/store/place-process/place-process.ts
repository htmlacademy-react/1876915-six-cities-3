import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { PlaceProcess } from '../../types/state';
import { City } from '../../types/place';

const initialState: PlaceProcess = {
  activeCity: null,
};

export const placeProcess = createSlice({
  name: NameSpace.Place,
  initialState,
  reducers: {
    setActiveCity: (state, action: PayloadAction<City | null>) => {
      state.activeCity = action.payload;
    },
  },
});

export const { setActiveCity: setActiveCityTab } = placeProcess.actions;
