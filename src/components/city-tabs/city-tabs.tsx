import clsx from 'clsx';
import { Link, useSearchParams } from 'react-router-dom';
import { ReactEventHandler, useEffect } from 'react';
import { CITY_NAMES, DEFAULT_CITY } from '../../const';
import { useActionCreators } from '../../hooks';
import { placeProcessActions } from '../../store/place-process/place-process';
import { PlacePreview } from '../../types';
import { getCityLocation } from '../../utils/marker';

type CityTabsProps = {
  previews: PlacePreview[];
};

export default function CityTabs({ previews }: CityTabsProps) {
  const { setActiveMarker } = useActionCreators(placeProcessActions);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCityName = searchParams.get('city');

  useEffect(() => {
    if (!activeCityName) {
      setSearchParams([['city', DEFAULT_CITY.name]]);
    }
  });


  const tabClickHandler: ReactEventHandler<HTMLLIElement> = ({ currentTarget: { dataset: { tabName } } }) => {
    if (tabName && (tabName !== activeCityName)) {
      setSearchParams([['city', tabName]]);
      setActiveMarker(getCityLocation(tabName, previews));
    }
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {CITY_NAMES.map((name) => (
          <li className="locations__item" key={`city-tab-${name}`} onClick={tabClickHandler} data-tab-name={name}>
            <Link
              className={clsx('locations__item-link', 'tabs__item', (activeCityName === name) && 'tabs__item--active')}
              to="#"
              onClick={(evt) => evt.preventDefault()}
            >
              <span>{name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
