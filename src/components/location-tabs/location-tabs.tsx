import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { MouseEventHandler } from 'react';

type LocationTabsProps = {
  cityNames: string[];
  activeTabName: string;
  tabChangeHandler?: (tabName: string) => void;
}

export default function LocationTabs({ cityNames, activeTabName, tabChangeHandler }: LocationTabsProps): JSX.Element {

  const tabClickHandler: MouseEventHandler = (evt) => {
    const target = evt.target as HTMLElement;
    const tabName = target.dataset.tabName;

    if (tabName && (tabName !== activeTabName)) {
      tabChangeHandler?.(tabName);
    }
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list" onClick={tabClickHandler}>
        {cityNames.map((name) => (
          <li className="locations__item" key={name}>
            <Link className={clsx('locations__item-link', 'tabs__item', (activeTabName === name) && 'tabs__item--active')} to="#" data-tab-name={name}>
              <span data-tab-name={name}>{name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
