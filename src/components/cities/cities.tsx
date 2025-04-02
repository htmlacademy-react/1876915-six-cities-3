import clsx from 'clsx';
import PlaceList from '../place-list/place-list';
import PlaceListEmpty from '../place-list/place-list-empty';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { PlacePreview } from '../../types';
import Map from '../map/map';


type CitiesProps = {
  previews: PlacePreview[];
};

export default function Cities({ previews }: CitiesProps) {
  const [searchParams] = useSearchParams();
  const cityName = searchParams.get('city') || '';

  const filteredPreviews = useMemo(() => previews.filter((item) => item.city.name === cityName), [cityName, previews]);
  const markers = useMemo(() => filteredPreviews.map((item) => ({ id: item.id, ...item.location })), [filteredPreviews]);
  return (
    <div className={clsx('cities__places-container', 'container', !previews.length && 'cities__places-container--empty')}>
      {previews.length ?
        <>
          <PlaceList previews={filteredPreviews} cityName={cityName} />
          <div className="cities__right-section">
            <Map markers={markers} className='cities__map' />
          </div>
        </>
        : <PlaceListEmpty />}
    </div>
  );
}
