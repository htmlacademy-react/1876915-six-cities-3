import cn from 'classnames';
import Map from '../map/map';
import PlaceList from '../place-list/place-list';
import PlaceListEmpty from '../place-list/place-list-empty';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { usePreviewsSelector } from '../../store';


export default function Cities() {
  const previews = usePreviewsSelector();
  const [searchParams] = useSearchParams();
  const cityName = searchParams.get('city') || '';

  const filteredPreviews = useMemo(() => previews.filter((item) => item.city.name === cityName), [cityName, previews]);
  const markers = useMemo(() => filteredPreviews.map((item) => ({ id: item.id, ...item.location })), [filteredPreviews]);

  return (
    <div className={cn('cities__places-container', 'container', !previews.length && 'cities__places-container--empty')} data-testid="cities-places-container">
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
