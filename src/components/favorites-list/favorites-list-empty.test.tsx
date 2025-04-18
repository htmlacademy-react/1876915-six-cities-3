import { render, screen } from '@testing-library/react';
import FavoritesListEmpty from './favorites-list-empty';

describe('Component: FavoritesListEmpty', () => {
  it('should render correctly', () => {
    render(<FavoritesListEmpty />);

    expect(screen.getByTestId('favorites-list-empty')).toBeInTheDocument();
    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
    expect(screen.getByText('Save properties to narrow down search or plan your future trips.')).toBeInTheDocument();
  });
});
