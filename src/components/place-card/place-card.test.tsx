import { render, screen } from '@testing-library/react';
import PlaceCard from './place-card';
import { generatePlacePreview } from '../../utils/test/mocks';
import { PlacePreview } from '../../types';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

vi.mock('./place-status-label', () => ({
  default: () => <div data-testid="place-status-label">Premium</div>
}));

vi.mock('./place-card-image', () => ({
  default: () => <div data-testid="place-card-image">Image</div>
}));

vi.mock('./place-card-info', () => ({
  default: () => <div data-testid="place-card-info">Info</div>
}));

describe('Component: PlaceCard', () => {
  const mockPreview: PlacePreview = generatePlacePreview();
  const mockMouseEventHandler = vi.fn();

  beforeEach(() => {
    render(
      <PlaceCard
        preview={mockPreview}
        cardClassName="cities__card"
        imageClassName="cities__image-wrapper"
        mouseEventHandler={mockMouseEventHandler}
      />
    );
  });

  it('should render correctly', () => {
    const card = screen.getByTestId('place-card');
    expect(card).toBeInTheDocument();
    expect(screen.getByTestId('place-card-image')).toBeInTheDocument();
    expect(screen.getByTestId('place-card-info')).toBeInTheDocument();
  });

  it('should call mouseEventHandler on mouse enter and leave', async () => {
    const card = screen.getByTestId('place-card');

    await userEvent.hover(card);
    expect(mockMouseEventHandler).toHaveBeenCalledTimes(1);
    expect(mockMouseEventHandler).toHaveBeenCalledWith({
      ...mockPreview.location,
      id: mockPreview.id
    });

    await userEvent.unhover(card);
    expect(mockMouseEventHandler).toHaveBeenCalledTimes(2);
    expect(mockMouseEventHandler).toHaveBeenCalledWith({
      ...mockPreview.city.location
    });
  });
});
