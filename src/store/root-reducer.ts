import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { placeData } from './place-data/place-data';
import { placeProcess } from './place-process/place-process';
import { userProcess } from './user-process/user-process';

const rootReducer = combineReducers({
  [NameSpace.Data]: placeData.reducer,
  [NameSpace.Place]: placeProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
});

export { rootReducer };
