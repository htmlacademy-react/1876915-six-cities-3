import { Link } from 'react-router-dom';
import { PlacePreview } from '../../types';
import { AppRoute, ImageDefault as D } from '../../const';
import PlaceCard from '../place-card';

type FavoritesItemProps = {
  previews: PlacePreview[];
  cityName: string;
}

export default function FavoritesItem({ cityName, previews }: FavoritesItemProps) {
  return (
    <li className="favorites__locations-items" data-testid="favorite-item">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to={AppRoute.Main} data-testid="favorite-item-city-link">
            <span data-testid="favorite-item-city-name">{cityName}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places" data-testid="favorite-item-places">
        {previews.map((preview) => (
          <PlaceCard
            cardClassName='favorites__card'
            imageClassName='favorites__image-wrapper'
            preview={preview}
            key={`favorite-group-${cityName}-card-${preview.id}`}
            imageWidth={D.SmallWidth}
            imageHeight={D.SmallWidth}
          />
        ))}
      </div>
    </li>
  );
}
