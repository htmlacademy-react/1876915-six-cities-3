import { MouseEventHandler, useState } from 'react';
import { PlacePreview } from '../../types';
import PlaceCard from '../place-card';
import PlaceSort from '../place-sort/place-sort';

type PlaceListProps = {
  previewList: PlacePreview[];
}

export default function PlaceList({ previewList }: PlaceListProps) {

  const [activeCardId, setActiveCardId] = useState<string>();

  const mouseOverHandler: MouseEventHandler = (evt) => {
    const target = evt.target as HTMLElement;
    const cardId = (target.closest('.place-card') as HTMLElement)?.dataset.cardId;

    if (cardId && (cardId !== activeCardId)) {
      setActiveCardId(cardId);
    }
  };

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">312 places to stay in Amsterdam</b>
      <PlaceSort />
      <div
        className="cities__places-list places__list tabs__content"
        onMouseOver={mouseOverHandler}
      >
        {previewList.map((place) => <PlaceCard preview={place} cardClassName='cities__card' imageClassName='cities__image-wrapper' key={place.id} />)}
      </div>
    </section>
  );
}
