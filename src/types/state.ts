import { store } from '../store/index.js';
import { AuthorizationStatus } from '../const.js';
import { MarkerType, Place, PlacePreview } from './place.js';
import { PlaceComment } from './comment';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  loginStatus: RequestStatus;
};

export type PlaceProcess = {
  activeMarker: MarkerType;
}

export type PlaceDataProcess = {
  previewsFetchStatus: RequestStatus;
  placeFetchStatus: RequestStatus;
  nearbyFetchStatus: RequestStatus;
  favoritesFetchStatus: RequestStatus;
  commentsFetchStatus: RequestStatus;
  commentsCreateStatus: RequestStatus;
  changeFavoriteStatus: RequestStatus;
  previews: PlacePreview[];
  favorites: PlacePreview[];
  comments: PlaceComment[];
  place: Place | null;
  nearbyPreviews: PlacePreview[] | [];
}

export enum RequestStatus {
  Pending = 'Pending',
  Fulfilled = 'Fulfilled',
  Rejected = 'Rejected',
}
