import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { ReactEventHandler } from 'react';

type LocationTabsProps = {
  cityNames: string[];
  activeTabName: string;
  tabChangeHandler?: (tabName: string) => void;
}

export default function LocationTabs({ cityNames, activeTabName, tabChangeHandler }: LocationTabsProps) {

  const tabClickHandler: ReactEventHandler<HTMLLIElement> = ({ currentTarget: { dataset: { tabName } } }) => {
    if (tabName && (tabName !== activeTabName)) {
      tabChangeHandler?.(tabName);
    }
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cityNames.map((name) => (
          <li className="locations__item" key={`city-tab-${name}`} onClick={tabClickHandler} data-tab-name={name}>
            <Link
              className={clsx('locations__item-link', 'tabs__item', (activeTabName === name) && 'tabs__item--active')}
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
