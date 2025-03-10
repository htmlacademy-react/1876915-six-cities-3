import { Link } from 'react-router-dom';
import { PlacePreview } from '../../types';
import { AppRoute, PlaceCardDefault as D } from '../../const';
import PlaceCard from '../place-card';

type FavoritesItemProps = {
  previewList: PlacePreview[];
  cityName: string;
}

export default function FavoritesItem({ cityName, previewList }: FavoritesItemProps) {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to={AppRoute.Main}>
            <span>{cityName}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {previewList.map((preview) => (
          <PlaceCard
            cardClassName='favorites__card'
            imageClassName='favorites__image-wrapper'
            preview={preview}
            key={preview.id}
            imageWidth={D.SMALL_WIDTH}
            imageHeight={D.SMALL_WIDTH}
          />
        ))}
      </div>
    </li>
  );
}
