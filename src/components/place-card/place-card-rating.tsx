import { MAX_PLACE_RATING } from '../../const';

type PlaceCardRatingProps = {
  rating: number;
}

const getPercentValue = (rating: number) => `${Math.round(rating) / MAX_PLACE_RATING * 100}%`;

export default function PlaceCardRating({ rating }: PlaceCardRatingProps) {
  return (
    <div className="place-card__rating rating">
      <div className="place-card__stars rating__stars">
        <span style={{ width: getPercentValue(rating) }} />
        <span className="visually-hidden">Rating</span>
      </div>
    </div>
  );
}
