import { MouseEventHandler, useState } from 'react';
import { PlacePreview, PlaceSortType } from '../../types/place';
import PlaceCard from '../place-card';
import PlaceSort from '../place-sort/place-sort';
import { pluralize, sortPreview } from '../../utils';
import { SortType } from '../../const';
import Map from '../map/map';

type PlaceListProps = {
  previewList: PlacePreview[];
  cityName: string;
}

export default function PlaceList({ previewList, cityName }: PlaceListProps) {

  const [activeCardId, setActiveCardId] = useState<string>();
  const [activeSortType, setSortType] = useState<PlaceSortType>(SortType.Popular);

  const mouseOverHandler: MouseEventHandler = (evt) => {
    const target = evt.target as HTMLElement;
    const cardId = (target.closest('.place-card') as HTMLElement)?.dataset.cardId;

    if (cardId && (cardId !== activeCardId)) {
      setActiveCardId(cardId);
    }
  };

  const preview = previewList.find((item) => item.id === activeCardId) || previewList[0];
  const previewQuantity = previewList.length;
  const sortedPreviews = sortPreview(previewList, activeSortType);

  return (
    <>
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{previewQuantity} {pluralize('place', previewQuantity)} to stay in {cityName}</b>
        <PlaceSort activeSortType={activeSortType} sortChangeHandler={(newSortType) => setSortType(newSortType)} />
        <div
          className="cities__places-list places__list tabs__content"
          onMouseOver={mouseOverHandler}
        >
          {sortedPreviews.map((place) => (
            <PlaceCard
              preview={place}
              cardClassName='cities__card'
              imageClassName='cities__image-wrapper'
              key={`place-list-card-${place.id}`}
            />))}
        </div>
      </section>
      <div className="cities__right-section">
        <Map activePlace={preview} places={sortedPreviews} className='cities__map' />
      </div>
    </>
  );
}
