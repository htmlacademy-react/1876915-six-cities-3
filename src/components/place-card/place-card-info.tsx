import { Link } from 'react-router-dom';
import { PlacePreview } from '../../types';
import PlaceCardRating from './place-card-rating';
import PlaceToFavoritesButton from './place-to-favorites-button';
import { AppRoute } from '../../const';
import { capitalizeFirstLetter } from '../../utils';

type PlaceCardInfoProps = {
  preview: PlacePreview;
}

export default function PlaceCardInfo({ preview }: PlaceCardInfoProps) {
  const { id, title, price, rating, type, isFavorite } = preview;

  return (
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">€{price}</b>
          <span className="place-card__price-text">&nbsp;/&nbsp;night</span>
        </div>
        <PlaceToFavoritesButton isFavorite={isFavorite} />
      </div>
      <PlaceCardRating rating={rating} />
      <h2 className="place-card__name">
        <Link to={`${AppRoute.Offer}/${id}`}>{title}</Link>
      </h2>
      <p className="place-card__type">{capitalizeFirstLetter(type)}</p>
    </div>
  );
}
