import { PlacePreview } from '../../types/place';
import FavoritesItem from './favorite-item';

type FavoritesListProps = {
  previewList: PlacePreview[];
}

const groupPreviews = (previewList: PlacePreview[]) => {
  const groupedPreviews = previewList.reduce<Record<string, PlacePreview[]>>((accumulator, preview: PlacePreview) => {
    const key = preview.city.name;
    if (!accumulator[key]) {
      accumulator[key] = [];
    }
    accumulator[key].push(preview);
    return accumulator;
  }, {});

  return Object.entries(groupedPreviews);
};

export default function FavoritesList({ previewList }: FavoritesListProps) {
  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {groupPreviews(previewList).map(([cityName, previews]) => <FavoritesItem cityName={cityName} previewList={previews} key={`favorite-group-${cityName}`} />)}
      </ul>
    </section>
  );
}
