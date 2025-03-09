import { PlacePreview } from '../../types';
import PlaceSort from '../place-sort/place-sort';
import Place from '../place/place';

type PlaceListProps = {
  placePreviews: PlacePreview[];
}

export default function PlaceList({ placePreviews }: PlaceListProps) {
  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">312 places to stay in Amsterdam</b>
      <PlaceSort />
      <div className="cities__places-list places__list tabs__content">
        {placePreviews.map((place) => <Place placePreview={place} key={place.id} />)}
      </div>
    </section>
  );
}
