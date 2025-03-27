export const MAX_PLACE_RATING = 5;
export const MAX_SHOWN_COMMENTS = 10;
export const MAX_SHOWN_NEAR_PLACES = 3;
export const ADDITIONAL_MARKERS_QUANTITY = 3;
export const MIN_REVIEW_LENGTH = 50;
export const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November'];
const DEFAULT_MARKER_URL = 'img/pin.svg';
const ACTIVE_MARKER_URL = 'img/pin-active.svg';

export const CitiesDefaults = [
  {
    name: 'Paris',
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 13,
  },
  {
    name: 'Cologne',
    latitude: 50.938361,
    longitude: 6.959974,
    zoom: 13,
  },
  {
    name: 'Brussels',
    latitude: 50.846557,
    longitude: 4.351697,
    zoom: 13,
  },
  {
    name: 'Amsterdam',
    latitude: 52.37454,
    longitude: 4.897976,
    zoom: 13,
  },
  {
    name: 'Hamburg',
    latitude: 53.550341,
    longitude: 10.000654,
    zoom: 13,
  },
  {
    name: 'Dusseldorf',
    latitude: 51.225402,
    longitude: 6.776314,
    zoom: 13,
  },
];

export const cityNames = CitiesDefaults.map((item) => item.name);

export const DefaultIcon = {
  iconUrl: DEFAULT_MARKER_URL,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
} as const;

export const ActiveIcon = {
  ...DefaultIcon,
  iconUrl: ACTIVE_MARKER_URL,
} as const;

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

export enum ApiRoute {
  Previews = '/offers',
  Login = '/login',
  Logout = '/logout',
  Favorites = '/favorite',
  Nearby = '/nearby',
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

export enum NameSpace {
  Data = 'DATA',
  Place = 'PLACE',
  User = 'USER',
}
