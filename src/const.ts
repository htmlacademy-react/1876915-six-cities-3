export const MAX_PLACE_RATING = 5;
export const MAX_SHOWN_COMMENTS = 10;
export const ADDITIONAL_MARKERS_QUANTITY = 3;
export const CITY_NAMES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const PlaceCardDefault = {
  DEFAULT_WIDTH: 260,
  DEFAULT_HEIGHT: 200,
  SMALL_WIDTH: 150,
  SMALL_HEIGHT: 110,
  BOOKMARK_ICON_WIDTH: 18,
  BOOKMARK_ICON_HEIGHT: 19,
} as const;

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offers = '/offer/:id',
  Offer = '/offer',
  NotFound = '/not-found',
}

export enum AuthorizationStatus {
  Auth = 'Auth',
  NoAuth = 'NoAuth',
  Unknown = 'Unknown',
}
