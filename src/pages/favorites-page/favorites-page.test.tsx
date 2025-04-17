import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/test/with-history-component';
import { withStore } from '../../utils/test/with-store-component';
import FavoritesPage from './favorites-page';
import { generatePlacePreview } from '../../utils/test/mocks';
import { RequestStatus } from '../../types';
import { vi } from 'vitest';

vi.mock('../../components/favorites-list/favorites-list', () => ({
  default: () => <div data-testid="favorites-list">Favorites List</div>
}));

vi.mock('../../components/favorites-list/favorites-list-empty', () => ({
  default: () => <div data-testid="favorites-list-empty">Favorites List Empty</div>
}));

vi.mock('../../components/footer/footer', () => ({
  MemoizedFooter: () => <footer data-testid="footer">Footer</footer>
}));

describe('Component: FavoritesPage', () => {
  it('should render correctly with favorites', () => {
    const mockState = {
      Favorites: {
        favorites: [generatePlacePreview()],
        favoritesFetchStatus: RequestStatus.Fulfilled,
        changeFavoriteStatus: {}
      }
    };

    const { withStoreComponent } = withStore(<FavoritesPage />, mockState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('favorites-list')).toBeInTheDocument();
    expect(screen.queryByTestId('favorites-list-empty')).not.toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('should render correctly without favorites', () => {
    const mockState = {
      Favorites: {
        favorites: [],
        favoritesFetchStatus: RequestStatus.Fulfilled,
        changeFavoriteStatus: {}
      }
    };

    const { withStoreComponent } = withStore(<FavoritesPage />, mockState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('favorites-list-empty')).toBeInTheDocument();
    expect(screen.queryByTestId('favorites-list')).not.toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('should set document title', async () => {
    const mockState = {
      Favorites: {
        favorites: [],
        favoritesFetchStatus: RequestStatus.Fulfilled,
        changeFavoriteStatus: {}
      }
    };

    const { withStoreComponent } = withStore(<FavoritesPage />, mockState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    await vi.waitFor(() => {
      expect(document.title).toBe('6 Cities.Favorite places');
    });
  });
});
