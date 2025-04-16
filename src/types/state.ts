import { store } from '../store/index.js';
import { AuthorizationStatus } from '../const.js';
import { MarkerType, Place, PlacePreview } from './place.js';
import { PlaceComment } from './comment';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type UserState = {
  authorizationStatus: AuthorizationStatus;
  loginStatus: RequestStatus;
};

export type MarkerState = {
  activeMarker: MarkerType;
}

export type CommentsState = {
  commentsFetchStatus: RequestStatus;
  commentsCreateStatus: RequestStatus;
  comments: PlaceComment[];
}

export type FavoriteState = {
  favoritesFetchStatus: RequestStatus;
  changeFavoriteStatus: Record<string, RequestStatus>;
  favorites: PlacePreview[];
}

export type PlaceState = {
  previewsFetchStatus: RequestStatus;
  placeFetchStatus: RequestStatus;
  nearbyFetchStatus: RequestStatus;
  previews: PlacePreview[];
  place: Place | null;
  nearbyPreviews: PlacePreview[] | [];
}

export enum RequestStatus {
  Pending = 'Pending',
  Fulfilled = 'Fulfilled',
  Rejected = 'Rejected',
}

