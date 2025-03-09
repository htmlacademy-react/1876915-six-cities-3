export const MAX_PLACE_RATING = 5;
export const MAX_SHOWN_COMMENTS = 10;
export const ADDITIONAL_MARKERS_QUANTITY = 3;
export const CITY_NAMES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offers = '/offer/:id',
  Offer = '/offer',
}

export enum AuthorizationStatus {
  Auth = 'Auth',
  NoAuth = 'NoAuth',
  Unknown = 'Unknown',
}
