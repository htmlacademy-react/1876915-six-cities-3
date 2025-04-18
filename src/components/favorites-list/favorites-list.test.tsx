import { render, screen } from '@testing-library/react';
import FavoritesList from './favorites-list';
import { generatePlacePreview } from '../../utils/test/mocks';
import { vi } from 'vitest';
import '../../polyfills/group-by';

vi.mock('./favorite-item', () => ({
  default: () => <div data-testid="favorite-item">Favorite Item</div>
}));

vi.mock('./favorites-list-empty', () => ({
  default: () => <div data-testid="favorites-list-empty">Favorites List Empty</div>
}));

describe('Component: FavoritesList', () => {
  const mockFavorites = [generatePlacePreview(), generatePlacePreview()];

  it('should render correctly with favorites', () => {
    render(<FavoritesList previews={mockFavorites} />);

    expect(screen.getByTestId('favorites')).toBeInTheDocument();
    expect(screen.getByTestId('favorites-list')).toBeInTheDocument();
    if(mockFavorites[0].city.name === mockFavorites[1].city.name) {
      expect(screen.getAllByTestId('favorite-item')).toHaveLength(1);
    } else {
      expect(screen.getAllByTestId('favorite-item')).toHaveLength(mockFavorites.length);
    }
  });
});
