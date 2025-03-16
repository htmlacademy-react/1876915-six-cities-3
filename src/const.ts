export const MAX_PLACE_RATING = 5;
export const MAX_SHOWN_COMMENTS = 10;
export const MAX_SHOWN_NEAR_PLACES = 3;
export const ADDITIONAL_MARKERS_QUANTITY = 3;
export const CITY_NAMES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
export const DEFAULT_CITY_NAME = CITY_NAMES[0];
export const MIN_REVIEW_LENGTH = 50;
export const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November'];

export const ImageDefault = {
  DefaultWidth: 260,
  DefaultHeight: 200,
  SmallWidth: 150,
  SmallHeight: 110,
  CardBookmarkIconWidth: 18,
  CardBookmarkIconHeight: 19,
  OfferBookmarkIconWidth: 31,
  OfferBookmarkIconHeight: 33,
} as const;

export const SortType = {
  Popular: 'Popular',
  LowToHigh: 'Low to high',
  HighToLow: 'High to low',
  TopRated: 'Top rated first',
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

export const KeyCode = {
  ESC: 'Escape',
  ENTER: 'Enter',
} as const;
