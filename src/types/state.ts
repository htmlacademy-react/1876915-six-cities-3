import { store } from '../store/index.js';
import { AuthorizationStatus } from '../const.js';
import { City, Place, PlacePreview } from './place.js';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
};

export type PlaceProcess = {
  activeCity: City | null;
}

export type PlaceData = {
  previews: PlacePreview[] | [];
  favorites: PlacePreview[] | [];
  offer: Place | null;
  nearby: {
    placeId: string;
    nearbyPreviews: PlacePreview[] | [];
  };
}
