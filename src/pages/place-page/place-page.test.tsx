import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/test/with-history-component';
import { withStore } from '../../utils/test/with-store-component';
import PlacePage from './place-page';
import { generatePlace, generatePlacePreview, generatePlaceComment } from '../../utils/test/mocks';
import { RequestStatus } from '../../types';
import { vi } from 'vitest';
import { State } from '../../types/state';
import { AppRoute, AuthorizationStatus, SliceNameSpace } from '../../const';
import { DEFAULT_CITY } from '../../const';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';

vi.mock('../../components/map/map', () => ({
  default: () => <div data-testid="map">Map</div>
}));

vi.mock('../../components/place-gallery/place-gallery', () => ({
  default: () => <div data-testid="gallery">Gallery</div>
}));

vi.mock('../../components/reviews', () => ({
  default: () => <div data-testid="reviews">Reviews</div>
}));

vi.mock('../../components/place-card', () => ({
  default: () => <div data-testid="place-card">Place Card</div>
}));

describe('Component: PlacePage', () => {
  const mockHistory = createMemoryHistory();
  const mockPlace = generatePlace();
  const mockNearby = [generatePlacePreview(), generatePlacePreview()];
  const mockComments = [generatePlaceComment(), generatePlaceComment()];

  const placePage = (
    <Routes>
      <Route path={AppRoute.Place} element={<PlacePage />} />
    </Routes>
  );

  const initialState: State = {
    [SliceNameSpace.Place]: {
      place: mockPlace,
      placeFetchStatus: RequestStatus.Fulfilled,
      nearbyPreviews: mockNearby,
      nearbyFetchStatus: RequestStatus.Fulfilled,
      previews: [],
      previewsFetchStatus: RequestStatus.Fulfilled
    },
    [SliceNameSpace.Comments]: {
      comments: mockComments,
      commentsFetchStatus: RequestStatus.Fulfilled,
      commentsCreateStatus: RequestStatus.Fulfilled
    },
    [SliceNameSpace.Marker]: {
      activeMarker: DEFAULT_CITY
    },
    [SliceNameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Auth,
      loginStatus: RequestStatus.Fulfilled
    },
    [SliceNameSpace.Favorites]: {
      favorites: [],
      favoritesFetchStatus: RequestStatus.Pending,
      changeFavoriteStatus: {}
    }
  };

  beforeEach(() => {
    mockHistory.push(`${AppRoute.PlaceWithoutId}/${mockPlace.id}`);
  });

  it('should render correctly with data', () => {

    const { withStoreComponent } = withStore(placePage, initialState);
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(screen.getByTestId('place-page')).toBeInTheDocument();
    expect(screen.getByTestId('offer-section')).toBeInTheDocument();
    expect(screen.getByTestId('place-title')).toHaveTextContent(mockPlace.title);
    expect(screen.getByTestId('gallery')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getByTestId('reviews')).toBeInTheDocument();
    expect(screen.getByTestId('nearby-section')).toBeInTheDocument();
    expect(screen.getAllByTestId('place-card')).toHaveLength(mockNearby.length);
  });

  it('should show spinner while loading', () => {
    const mockState: State = {
      ...initialState,
      [SliceNameSpace.Place]: {
        ...initialState[SliceNameSpace.Place],
        place: null,
      }
    };

    const { withStoreComponent } = withStore(placePage, mockState);
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should redirect to 404 when place not found', () => {
    const mockState: State = {
      ...initialState,
      [SliceNameSpace.Place]: {
        ...initialState[SliceNameSpace.Place],
        previewsFetchStatus: RequestStatus.Rejected,
      }
    };

    const { withStoreComponent } = withStore(placePage, mockState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.queryByTestId('place-page')).not.toBeInTheDocument();
  });

  it('should set document title', async () => {
    const { withStoreComponent } = withStore(placePage, initialState);
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    await vi.waitFor(() => {
      expect(document.title).toBe(`6 Cities.${mockPlace.title}`);
    });
  });
});
