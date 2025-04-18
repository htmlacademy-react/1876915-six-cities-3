import { renderHook } from '@testing-library/react';
import { withHistory } from '../utils/test/with-history-component';
import { withStore } from '../utils/test/with-store-component';
import { useLayoutConfig } from './use-layout-config';
import { SliceNameSpace, AuthorizationStatus, AppRoute } from '../const';
import { RequestStatus } from '../types';
import { MemoryHistory, createMemoryHistory } from 'history';
import { ReactElement } from 'react';
import { faker } from '@faker-js/faker';

describe('Hook: useLayoutConfig', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  const placeId = faker.string.uuid();

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

  const createWrapper = (history: MemoryHistory) => {
    const wrapper = ({ children }: { children: ReactElement }) => {
      const { withStoreComponent } = withStore(children, initialState);
      return withHistory(withStoreComponent, history);
    };
    return wrapper;
  };

  it('should return correct config for main page', () => {
    mockHistory.push(AppRoute.Main);

    const { result } = renderHook(() => useLayoutConfig(), {
      wrapper: createWrapper(mockHistory)
    });

    expect(result.current).toEqual({
      pageClassName: 'page--gray page--main',
      isLogoActive: true,
      shouldUserInfoRender: true
    });
  });

  it('should return correct config for login page', () => {
    mockHistory.push(AppRoute.Login);

    const { result } = renderHook(() => useLayoutConfig(), {
      wrapper: createWrapper(mockHistory)
    });

    expect(result.current).toEqual({
      pageClassName: 'page--gray page--login',
      isLogoActive: false,
      shouldUserInfoRender: false
    });
  });

  it('should return correct config for favorites page', () => {
    mockHistory.push(AppRoute.Favorites);

    const { result } = renderHook(() => useLayoutConfig(), {
      wrapper: createWrapper(mockHistory)
    });

    expect(result.current).toEqual({
      pageClassName: 'page page--favorites-empty',
      isLogoActive: false,
      shouldUserInfoRender: true
    });
  });

  it('should return correct config for offer page', () => {
    mockHistory.push(`${AppRoute.Place}/${placeId}`);

    const { result } = renderHook(() => useLayoutConfig(), {
      wrapper: createWrapper(mockHistory)
    });

    expect(result.current).toEqual({
      pageClassName: 'page page--favorites-empty',
      isLogoActive: false,
      shouldUserInfoRender: true
    });
  });

  it('should return correct config for not found page', () => {
    mockHistory.push('/non-existent-route');

    const { result } = renderHook(() => useLayoutConfig(), {
      wrapper: createWrapper(mockHistory)
    });

    expect(result.current).toEqual({
      pageClassName: 'page page--favorites-empty',
      isLogoActive: false,
      shouldUserInfoRender: true
    });
  });
});
