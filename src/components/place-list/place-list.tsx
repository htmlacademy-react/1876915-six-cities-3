import { useMemo, useState } from 'react';
import { MarkerType, PlacePreview, PlaceSortType } from '../../types';
import { pluralize, sortPreview } from '../../utils';
import { SortType } from '../../const';
import PlaceCard from '../place-card';
import PlaceSort from '../place-sort/place-sort';
import { useActionCreators } from '../../hooks';
import { markerActions } from '../../store/marker/marker.slice';

type PlaceListProps = {
  previews: PlacePreview[];
  cityName: string;
}

export default function PlaceList({ previews, cityName }: PlaceListProps) {

  const { setActiveMarker } = useActionCreators(markerActions);
  const mouseEventHandler = (marker: MarkerType) => setActiveMarker(marker);

  const [activeSortType, setSortType] = useState<PlaceSortType>(SortType.Popular);

  const sortedPreviews = useMemo(() => sortPreview(previews, activeSortType), [activeSortType, previews]);
  const previewQuantity = sortedPreviews.length;

  return (
    <section className="cities__places places" data-testid="places-section">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found" data-testid="places-found">{previewQuantity} {pluralize('place', previewQuantity)} to stay in {cityName}</b>
      <PlaceSort activeSortType={activeSortType} sortChangeHandler={(newSortType) => setSortType(newSortType)} />
      <div className="cities__places-list places__list tabs__content" data-testid="places-list">
        {sortedPreviews.map((place) => (
          <PlaceCard
            key={`place-list-card-${place.id}`}
            preview={place}
            cardClassName='cities__card'
            imageClassName='cities__image-wrapper'
            mouseEventHandler={mouseEventHandler}
          />))}
      </div>
    </section>
  );
}
