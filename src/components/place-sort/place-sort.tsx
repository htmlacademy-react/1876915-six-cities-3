import { KeyboardEventHandler, ReactEventHandler, useEffect, useState } from 'react';
import { KeyCode, SortType } from '../../const';
import clsx from 'clsx';
import { PlaceSortType } from '../../types';

type PlaceSortProps = {
  activeSortType: PlaceSortType;
  sortChangeHandler: (activeSortType: PlaceSortType) => void;
};

export default function PlaceSort({ sortChangeHandler, activeSortType }: PlaceSortProps) {

  const [isSelectOpened, setSelectOpenStatus] = useState(false);

  const onSelectChangeHandler: ReactEventHandler<HTMLLIElement> = ({ currentTarget }) => {
    const sortType = currentTarget.dataset.sortType;
    if (sortType !== activeSortType) {
      sortChangeHandler?.(sortType as PlaceSortType);
    }
  };

  const onSelectKeyDown: KeyboardEventHandler<HTMLSpanElement> = (evt) => {
    if (!isSelectOpened || (evt.target !== evt.currentTarget)) {
      return;
    }

    if (evt.key === KeyCode.ENTER) {
      setSelectOpenStatus(!isSelectOpened);
    }
  };

  const onSelectClickHandler: ReactEventHandler<HTMLSpanElement> = (evt) => {
    evt.stopPropagation();
    setSelectOpenStatus(!isSelectOpened);
  };

  useEffect(() => {

    const onClickHandler = () => {
      setSelectOpenStatus(false);
    };

    const onEscKeyHandler = (evt: KeyboardEvent) => {
      if (evt.key === KeyCode.ESC) {
        setSelectOpenStatus(false);
      }
    };

    document.body.addEventListener('click', onClickHandler);
    document.body.addEventListener('keydown', onEscKeyHandler);
    return () => {
      document.body.removeEventListener('click', onClickHandler);
      document.body.removeEventListener('keydown', onEscKeyHandler);
    };
  }, []);

  return (
    <form className="places__sorting" action="#" method="get" >
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}
        onClick={onSelectClickHandler}
        onKeyDown={onSelectKeyDown}
      >
        &nbsp;{activeSortType}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={clsx('places__options', 'places__options--custom', isSelectOpened && 'places__options--opened')}>
        {Object.entries(SortType).map(([type, value]) => (
          <li
            key={type}
            className={clsx('places__option', (type === activeSortType) && 'places__option--active')}
            tabIndex={0}
            onClick={onSelectChangeHandler}
            data-sort-type={type}
          >{value}
          </li>
        ))}
      </ul>
    </form >
  );
}
