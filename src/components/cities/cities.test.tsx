import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/test/with-history-component';
import { withStore } from '../../utils/test/with-store-component';
import Cities from './cities';
import { generatePlacePreview } from '../../utils/test/mocks';
import { AuthorizationStatus, SliceNameSpace } from '../../const';
import { RequestStatus } from '../../types';
import { vi } from 'vitest';

vi.mock('../../components/map/map', () => ({
  default: () => <div data-testid="map" />
}));

vi.mock('../../components/place-list/place-list', () => ({
  default: () => <div data-testid="place-list">Place List</div>
}));

vi.mock('../../components/place-list/place-list-empty', () => ({
  default: () => <div data-testid="place-list-empty">Place List Empty</div>
}));

describe('Component: Cities', () => {

  const mockPlaces = [generatePlacePreview(), generatePlacePreview()];
  const initialState = {
    [SliceNameSpace.Place]: {
      place: null,
      placeFetchStatus: RequestStatus.Fulfilled,
      nearbyPreviews: [],
      nearbyFetchStatus: RequestStatus.Fulfilled,
      previews: mockPlaces,
      previewsFetchStatus: RequestStatus.Fulfilled
    },
    [SliceNameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Auth,
      loginStatus: RequestStatus.Fulfilled
    }
  };

  it('should render correctly with places', () => {

    const { withStoreComponent } = withStore(<Cities />, initialState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('cities-places-container')).toBeInTheDocument();
  });

  it('should render correctly with empty places', () => {
    const mockState = {
      ...initialState,
      [SliceNameSpace.Place]: {
        ...initialState[SliceNameSpace.Place],
        previews: [],
      }
    };

    const { withStoreComponent } = withStore(<Cities />, mockState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Place List Empty')).toBeInTheDocument();
    expect(screen.queryByTestId('places-list')).not.toBeInTheDocument();
  });
});
