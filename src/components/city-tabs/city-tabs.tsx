import clsx from 'clsx';
import { Link, useSearchParams } from 'react-router-dom';
import { ReactEventHandler } from 'react';
import { cityNames } from '../../const';

export default function CityTabs() {

  const [searchParams, setSearchParams] = useSearchParams();
  const activeCityName = searchParams.get('city');

  const tabClickHandler: ReactEventHandler<HTMLLIElement> = ({ currentTarget: { dataset: { tabName } } }) => {
    if (tabName && (tabName !== activeCityName)) {
      setSearchParams([['city', tabName]]);
    }
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cityNames.map((name) => (
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
