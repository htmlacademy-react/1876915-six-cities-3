import { PlacePreview } from '../../types';
import FavoritesItem from './favorite-item';

type FavoritesListProps = {
  previewList: PlacePreview[];
}

// const result: unknown = Object.groupBy(filteredPlaces, ({ city }) => city.name);
const groupPreviews = (previewList: PlacePreview[]) => {
  const groupedPreviews = previewList.reduce<Record<string, PlacePreview[]>>((acc, preview: PlacePreview) => {
    const key = preview.city.name;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(preview);
    return acc;
  }, {});

  return Object.entries(groupedPreviews);
};

export default function FavoritesList({ previewList }: FavoritesListProps) {
  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {groupPreviews(previewList).map(([cityName, previews]) => <FavoritesItem cityName={cityName} previewList={previews} key={cityName} />)}
      </ul>
    </section>
  );
}
