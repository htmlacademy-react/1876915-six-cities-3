import { PlacePreview } from '../../types';
import PlaceCard from '../place-card';
import PlaceSort from '../place-sort/place-sort';

type PlaceListProps = {
  previewList: PlacePreview[];
}

export default function PlaceList({ previewList }: PlaceListProps) {
  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">312 places to stay in Amsterdam</b>
      <PlaceSort />
      <div className="cities__places-list places__list tabs__content">
        {previewList.map((place) => <PlaceCard preview={place} className='cities__card' key={place.id} />)}
      </div>
    </section>
  );
}
