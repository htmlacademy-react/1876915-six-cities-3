import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/test/with-history-component';
import { withStore } from '../../utils/test/with-store-component';
import Layout from './layout';
import { vi } from 'vitest';
import { SliceNameSpace } from '../../const';
import { RequestStatus } from '../../types';

vi.mock('../header/header', () => ({
  MemoizedHeader: () => <div>Header</div>
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Outlet: () => <div>Outlet</div>
  };
});

describe('Component: Layout', () => {
  const initialState = {
    [SliceNameSpace.Favorites]: {
      favorites: [],
      favoritesFetchStatus: RequestStatus.Fulfilled,
      changeFavoriteStatus: {}
    }
  };

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<Layout />, initialState);
    render(withHistory(withStoreComponent));

    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });
});
