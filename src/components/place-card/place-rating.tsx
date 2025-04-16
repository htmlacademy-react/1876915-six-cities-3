import cn from 'classnames';
import { MAX_PLACE_RATING } from '../../const';

type PlaceCardRatingProps = {
  placeRating: number;
  className: {
    rating: string;
    stars: string;
    value?: string;
  };
  shouldRatingShown?: boolean;
}

const getPercentValue = (rating: number,) => `${Math.round(rating) / MAX_PLACE_RATING * 100}%`;

export default function PlaceRating({ placeRating, className: { rating, stars, value = '' }, shouldRatingShown = false }: PlaceCardRatingProps) {
  return (
    <div className={cn(rating, 'rating')} data-testid="place-rating">
      <div className={cn(stars, 'rating__stars')} data-testid="place-rating-stars">
        <span style={{ width: getPercentValue(placeRating) }} />
        <span className="visually-hidden">Rating</span>
      </div>
      {shouldRatingShown &&
        <span className={cn(value, 'rating__value')}>{placeRating}</span>}
    </div>
  );
}
