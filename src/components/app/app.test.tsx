import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/test/with-history-component';
import { withStore } from '../../utils/test/with-store-component';
import App from './app';
import { SliceNameSpace, AuthorizationStatus, AppRoute } from '../../const';
import { RequestStatus } from '../../types';
import { MemoryHistory, createMemoryHistory } from 'history';

describe('Component: App', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
    window.scroll = vi.fn();
  });

  const initialState = {
    [SliceNameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Auth,
      loginStatus: RequestStatus.Fulfilled
    },
    [SliceNameSpace.Place]: {
      previews: [],
      previewsFetchStatus: RequestStatus.Fulfilled,
      place: null,
      placeFetchStatus: RequestStatus.Fulfilled,
      nearbyPlaces: [],
      nearbyPlacesFetchStatus: RequestStatus.Fulfilled,
      nearbyFetchStatus: RequestStatus.Fulfilled,
      nearbyPreviews: [],
      reviews: [],
      reviewsFetchStatus: RequestStatus.Fulfilled,
      reviewSubmitStatus: RequestStatus.Fulfilled
    },
    [SliceNameSpace.Favorites]: {
      favorites: [],
      favoritesFetchStatus: RequestStatus.Fulfilled,
      changeFavoriteStatus: {}
    }
  };

  it('should render MainPage when user navigate to "/"', () => {
    mockHistory.push(AppRoute.Main);

    const { withStoreComponent } = withStore(<App />, initialState);
    render(withHistory(withStoreComponent, mockHistory));

    expect(screen.getByTestId('main-page')).toBeInTheDocument();
  });

  it('should render LoginPage when user navigate to "/login"', () => {
    mockHistory.push(AppRoute.Login);
    initialState[SliceNameSpace.User].authorizationStatus = AuthorizationStatus.NoAuth;

    const { withStoreComponent } = withStore(<App />, initialState);
    render(withHistory(withStoreComponent, mockHistory));

    expect(screen.getByTestId('login-page')).toBeInTheDocument();
    initialState[SliceNameSpace.User].authorizationStatus = AuthorizationStatus.Auth;
  });

  it('should render FavoritesPage when authorized user navigate to "/favorites"', () => {
    mockHistory.push(AppRoute.Favorites);

    const { withStoreComponent } = withStore(<App />, initialState);
    render(withHistory(withStoreComponent, mockHistory));

    expect(screen.getByTestId('favorites-page')).toBeInTheDocument();
  });

  it('should render NotFoundPage when user navigate to non-existent route', () => {
    mockHistory.push('/non-existent-route');

    const { withStoreComponent } = withStore(<App />, initialState);
    render(withHistory(withStoreComponent, mockHistory));

    expect(screen.getByText('404 Page not found')).toBeInTheDocument();
  });

  it('should render Spinner when preview status is unknown', () => {
    initialState[SliceNameSpace.Place].previewsFetchStatus = RequestStatus.Pending;
    const { withStoreComponent } = withStore(<App />, initialState);
    render(withHistory(withStoreComponent, mockHistory));

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
