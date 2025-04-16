import { render, screen } from '@testing-library/react';
import PlaceRating from './place-rating';
import { MAX_PLACE_RATING, MIN_PLACE_RATING } from '../../const';
import { faker } from '@faker-js/faker';

describe('Component: PlaceRating', () => {
  const mockProps = {
    placeRating: faker.number.int({ min: MIN_PLACE_RATING, max: MAX_PLACE_RATING }),
    className: {
      rating: 'place-card__rating',
      stars: 'place-card__stars',
      value: 'place-card__rating-value'
    }
  };

  it('should render correctly without rating value', () => {
    render(<PlaceRating {...mockProps} />);

    expect(screen.getByTestId('place-rating')).toBeInTheDocument();
    expect(screen.queryByText(mockProps.placeRating.toString())).not.toBeInTheDocument();
  });

  it('should render correctly with rating value', () => {
    render(<PlaceRating {...mockProps} shouldRatingShown />);

    expect(screen.getByTestId('place-rating')).toBeInTheDocument();
    expect(screen.getByText(mockProps.placeRating.toString())).toBeInTheDocument();
  });

  it('should calculate rating width correctly', () => {
    render(<PlaceRating {...mockProps} />);

    const stars = screen.getByTestId('place-rating-stars');
    const expectedWidth = `${Math.round(mockProps.placeRating) / MAX_PLACE_RATING * 100}%`;
    expect(stars.firstChild).toHaveStyle({ width: expectedWidth });
  });
});
