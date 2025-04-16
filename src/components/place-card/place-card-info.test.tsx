import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/test/with-history-component';
import { withStore } from '../../utils/test/with-store-component';
import PlaceCardInfo from './place-card-info';
import { generatePlacePreview } from '../../utils/test/mocks';
import { AppRoute } from '../../const';
import { PlacePreview } from '../../types';
import { vi } from 'vitest';
import { capitalizeFirstLetter } from '../../utils';

vi.mock('./place-to-favorites-button', () => ({
  default: () => <button data-testid="place-to-favorites-button">To bookmarks</button>
}));

vi.mock('./place-rating', () => ({
  default: () => <div data-testid="place-rating">Rating</div>
}));

describe('Component: PlaceCardInfo', () => {
  const mockPreview: PlacePreview = generatePlacePreview();

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(
      <PlaceCardInfo preview={mockPreview} />
    );

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('place-card-info')).toBeInTheDocument();
    expect(screen.getByText(`€${mockPreview.price}`)).toBeInTheDocument();
    expect(screen.getByText('/ night')).toBeInTheDocument();
    expect(screen.getByText(mockPreview.title)).toBeInTheDocument();
    expect(screen.getByText(capitalizeFirstLetter(mockPreview.type))).toBeInTheDocument();
    expect(screen.getByTestId('place-rating')).toBeInTheDocument();
    expect(screen.getByTestId('place-to-favorites-button')).toBeInTheDocument();

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `${AppRoute.PlaceWithoutId}/${mockPreview.id}`);
  });
});
