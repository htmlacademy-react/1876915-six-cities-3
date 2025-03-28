import clsx from 'clsx';
import { usePreviewsSelector } from '../../store/place-data/selectors';
import PlaceList from '../place-list/place-list';
import PlaceListEmpty from '../place-list/place-list-empty';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { CitiesDefaults } from '../../const';

export default function Cities() {
  const previews = usePreviewsSelector();
  const [searchParams, setSearchParams] = useSearchParams();
  const cityName = searchParams.get('city') || '';

  if (!cityName) {
    setSearchParams([['city', CitiesDefaults[0].name]]);
  }

  const filteredPreviews = useMemo(() => previews.filter((item) => item.city.name === cityName), [cityName, previews]);

  return (
    <div className={clsx('cities__places-container', 'container', !previews.length && 'cities__places-container--empty')}>
      {previews.length ? <PlaceList previews={filteredPreviews} cityName={cityName} /> : <PlaceListEmpty />}
    </div>
  );
}
