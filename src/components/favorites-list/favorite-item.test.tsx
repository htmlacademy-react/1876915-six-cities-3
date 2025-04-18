import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/test/with-history-component';
import { withStore } from '../../utils/test/with-store-component';
import FavoriteItem from './favorite-item';
import { generatePlacePreview } from '../../utils/test/mocks';
import { SliceNameSpace } from '../../const';
import { RequestStatus } from '../../types';
import { vi } from 'vitest';
import { faker } from '@faker-js/faker';

vi.mock('../place-card/place-card', () => ({
  default: () => <div data-testid="place-card">Place Card</div>
}));

describe('Component: FavoriteItem', () => {
  const mockPreviews = [generatePlacePreview(), generatePlacePreview()];
  const mockCityName = faker.location.city();

  const initialState = {
    [SliceNameSpace.Favorites]: {
      favorites: [],
      favoritesFetchStatus: RequestStatus.Fulfilled,
      changeFavoriteStatus: {}
    }
  };

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(
      <FavoriteItem previews={mockPreviews} cityName={mockCityName} />,
      initialState
    );

    render(withHistory(withStoreComponent));

    expect(screen.getByTestId('favorite-item')).toBeInTheDocument();
    expect(screen.getByText(mockCityName)).toBeInTheDocument();
    expect(screen.getAllByTestId('place-card')).toHaveLength(mockPreviews.length);
  });
});
