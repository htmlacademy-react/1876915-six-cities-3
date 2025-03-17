import clsx from 'clsx';
import { MAX_PLACE_RATING } from '../../const';

type PlaceCardRatingProps = {
  rating: number;
  ratingClassName: string;
  starsClassName: string;
  valueClassName?: string;
  shouldRatingShown?: boolean;
}

const getPercentValue = (rating: number,) => `${Math.round(rating) / MAX_PLACE_RATING * 100}%`;

export default function PlaceRating({ rating, ratingClassName, starsClassName, valueClassName = '', shouldRatingShown = false }: PlaceCardRatingProps) {
  return (
    <div className={clsx(ratingClassName, 'rating')}>
      <div className={clsx(starsClassName, 'rating__stars')}>
        <span style={{ width: getPercentValue(rating) }} />
        <span className="visually-hidden">Rating</span>
      </div>
      {shouldRatingShown &&
        <span className={clsx(valueClassName, 'rating__value')}>{rating}</span>}
    </div>
  );
}
