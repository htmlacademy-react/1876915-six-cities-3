import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { ReactEventHandler, useEffect } from 'react';
import { CITY_NAMES, DEFAULT_CITY } from '../../const';
import { useActionCreators } from '../../hooks';
import { markerActions, usePreviewsSelector } from '../../store';
import { getCityLocation } from '../../utils/marker';
import { capitalizeFirstLetter } from '../../utils';

export default function CityTabs() {
  const previews = usePreviewsSelector();
  const { setActiveMarker } = useActionCreators(markerActions);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCityName = searchParams.get('city');
  const isValidCityName = activeCityName && CITY_NAMES.includes(capitalizeFirstLetter(activeCityName) as typeof CITY_NAMES[number]);

  useEffect(() => {
    if (!isValidCityName) {
      setSearchParams([['city', DEFAULT_CITY.name]]);
    }
  });

  useEffect(() => {
    if (isValidCityName) {
      setActiveMarker(getCityLocation(activeCityName, previews));
    }
  }, [activeCityName, isValidCityName, previews, setActiveMarker]);

  const tabClickHandler: ReactEventHandler<HTMLLIElement> = ({ currentTarget: { dataset: { tabName } } }) => {
    if (tabName && (tabName !== activeCityName)) {
      setSearchParams([['city', tabName]]);
      setActiveMarker(getCityLocation(tabName, previews));
    }
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list" data-testid="city-tabs-list">
        {CITY_NAMES.map((name) => (
          <li className="locations__item" key={`city-tab-${name}`} onClick={tabClickHandler} data-tab-name={name} data-testid="city-tab">
            <Link
              className={cn('locations__item-link', 'tabs__item', (activeCityName === name) && 'tabs__item--active')}
              to="#"
              onClick={(evt) => evt.preventDefault()}
              data-testid={`city-tab-${name}`}
            >
              <span>{name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
