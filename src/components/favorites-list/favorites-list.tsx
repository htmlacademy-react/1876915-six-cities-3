import { PlacePreview } from '../../types';
import FavoritesItem from './favorite-item';

type FavoritesListProps = {
  previews: PlacePreview[];
}

export default function FavoritesList({ previews }: FavoritesListProps) {

  const grouped = Object.entries(Object.groupBy(previews, (preview) => preview.city.name));

  if (!grouped.length) {
    return;
  }

  return (
    <section className="favorites" data-testid="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list" data-testid="favorites-list">
        {grouped.map(([cityName, groupedPreviews]) => <FavoritesItem cityName={cityName} previews={groupedPreviews} key={`favorite-group-${cityName}`} />)}
      </ul>
    </section>
  );
}
