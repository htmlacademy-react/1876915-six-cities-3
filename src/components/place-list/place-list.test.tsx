import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/test/with-history-component';
import { withStore } from '../../utils/test/with-store-component';
import PlaceList from './place-list';
import { SliceNameSpace } from '../../const';
import { RequestStatus } from '../../types';
import { generatePlacePreview } from '../../utils/test/mocks';
import { vi } from 'vitest';
import { faker } from '@faker-js/faker';

vi.mock('../place-card/place-card', () => ({
  default: () => <div data-testid="place-card">Place Card</div>
}));

describe('Component: PlaceList', () => {
  const mockPlaces = [generatePlacePreview(), generatePlacePreview()];
  const mockCityName = faker.location.city();
  const initialState = {
    [SliceNameSpace.Place]: {
      place: null,
      placeFetchStatus: RequestStatus.Fulfilled,
      nearbyPreviews: [],
      nearbyFetchStatus: RequestStatus.Fulfilled,
      previews: mockPlaces,
      previewsFetchStatus: RequestStatus.Fulfilled
    }
  };

  it('should render correctly with places', () => {
    const { withStoreComponent } = withStore(
      <PlaceList previews={mockPlaces} cityName={mockCityName} />,
      initialState
    );

    render(withHistory(withStoreComponent));

    expect(screen.getByTestId('places-section')).toBeInTheDocument();
    expect(screen.getByTestId('places-found')).toHaveTextContent(`${mockPlaces.length} places to stay in ${mockCityName}`);
    expect(screen.getByTestId('places-list')).toBeInTheDocument();
    expect(screen.getAllByTestId('place-card')).toHaveLength(mockPlaces.length);
  });

  it('should render correctly with empty places', () => {
    const { withStoreComponent } = withStore(
      <PlaceList previews={[]} cityName={mockCityName} />,
      initialState
    );

    render(withHistory(withStoreComponent));

    expect(screen.getByTestId('places-section')).toBeInTheDocument();
    expect(screen.getByTestId('places-found')).toHaveTextContent(`0 places to stay in ${mockCityName}`);
    expect(screen.getByTestId('places-list')).toBeInTheDocument();
    expect(screen.queryAllByTestId('place-card')).toHaveLength(0);
  });
});
