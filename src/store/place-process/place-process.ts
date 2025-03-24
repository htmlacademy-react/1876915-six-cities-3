import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_CITY_NAME, NameSpace } from '../../const';
import { PlaceProcess } from '../../types/state';

const initialState: PlaceProcess = {
  activePlaceName: DEFAULT_CITY_NAME,
};

export const placeProcess = createSlice({
  name: NameSpace.Place,
  initialState,
  reducers: {
    setActivePlaceName: (state, action: PayloadAction<string>) => {
      state.activePlaceName = action.payload;
    },
  },
});

export const { setActivePlaceName } = placeProcess.actions;
