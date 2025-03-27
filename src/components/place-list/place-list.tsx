import { useMemo, useState } from 'react';
import { MarkerType, PlacePreview, PlaceSortType } from '../../types/place';
import { pluralize, sortPreview } from '../../utils';
import { CitiesDefaults, SortType } from '../../const';
import PlaceCard from '../place-card';
import PlaceSort from '../place-sort/place-sort';
import Map from '../map/map';

type PlaceListProps = {
  previews: PlacePreview[];
  cityName: string;
}

const getDefaultLocation = (cityName: string) => CitiesDefaults.find((item) => item.name === cityName) || CitiesDefaults[0];

export default function PlaceList({ previews, cityName }: PlaceListProps) {

  const [markerLocation, setMarkerLocation] = useState<MarkerType | null>(null);
  const [activeSortType, setSortType] = useState<PlaceSortType>(SortType.Popular);

  const sortedPreviews = useMemo(() => sortPreview(previews, activeSortType), [activeSortType, previews]);

  const center = markerLocation || getDefaultLocation(cityName);
  const activeMarkerId = markerLocation?.id || '';
  const previewQuantity = sortedPreviews.length;
  const markers = previews.map((item) => ({ id: item.id, ...item.location }));

  return (
    <>
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{previewQuantity} {pluralize('place', previewQuantity)} to stay in {cityName}</b>
        <PlaceSort activeSortType={activeSortType} sortChangeHandler={(newSortType) => setSortType(newSortType)} />
        <div
          className="cities__places-list places__list tabs__content"
        >
          {sortedPreviews.map((place) => (
            <PlaceCard
              key={`place-list-card-${place.id}`}
              preview={place}
              cardClassName='cities__card'
              imageClassName='cities__image-wrapper'
              onMouseEnterCallback={(location) => setMarkerLocation(location)}
              onMouseLeaveCallback={() => setMarkerLocation(null)}
            />))}
        </div>
      </section>
      <div className="cities__right-section">
        <Map center={center} markers={markers} activeMarkerId={activeMarkerId} className='cities__map' />
      </div>
    </>
  );
}
