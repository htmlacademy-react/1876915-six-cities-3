import { Link } from 'react-router-dom';
import { PlacePreview } from '../../types';
import PlaceRating from './place-rating';
import PlaceToFavoritesButton from './place-to-favorites-button';
import { AppRoute } from '../../const';
import { capitalizeFirstLetter } from '../../utils';

type PlaceCardInfoProps = {
  preview: PlacePreview;
}

export default function PlaceCardInfo({ preview }: PlaceCardInfoProps) {
  const { id, title, price, rating, type } = preview;

  return (
    <div className="place-card__info" data-testid="place-card-info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">€{price}</b>
          <span className="place-card__price-text">&nbsp;/&nbsp;night</span>
        </div>
        <PlaceToFavoritesButton className='place-card' placeId={id} />
      </div>
      <PlaceRating placeRating={rating} className={{ rating: 'place-card__rating', stars: 'place-card__stars' }} />
      <h2 className="place-card__name">
        <Link to={`${AppRoute.PlaceWithoutId}/${id}`}>{title}</Link>
      </h2>
      <p className="place-card__type">{capitalizeFirstLetter(type)}</p>
    </div>
  );
}
