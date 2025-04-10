import cn from 'classnames';
import { Place } from '../../types';
import { capitalizeFirstLetter, pluralize } from '../../utils';

type PlaceFeaturesProps = {
  place: Place;
};

export default function PlaceFeatures({ place }: PlaceFeaturesProps) {
  return (
    <>
      <ul className="offer__features">
        <li className="offer__feature offer__feature--entire">{capitalizeFirstLetter(place.type)}</li>
        <li className="offer__feature offer__feature--bedrooms">{place.bedrooms} {pluralize('Bedroom', place.bedrooms)}</li>
        <li className="offer__feature offer__feature--adults">Max {place.maxAdults} {pluralize('adult', place.maxAdults)}</li>
      </ul>

      <div className="offer__price">
        <b className="offer__price-value">€{place.price}</b>
        <span className="offer__price-text">&nbsp;night</span>
      </div>

      <div className="offer__inside">
        <h2 className="offer__inside-title">What&apos;s inside</h2>
        <ul className="offer__inside-list">
          {place.goods.map((item) => <li className="offer__inside-item" key={item}>{item}</li>)}
        </ul>
      </div>

      <div className="offer__host">
        <h2 className="offer__host-title">Meet the host</h2>
        <div className="offer__host-user user">
          <div className={cn('offer__avatar-wrapper', 'user__avatar-wrapper', place.host.isPro && 'offer__avatar-wrapper--pro')} >
            <img
              className="offer__avatar user__avatar"
              src={place.host.avatarUrl}
              width={74}
              height={74}
              alt="Host avatar"
            />
          </div>
          <span className="offer__user-name">{place.host.name}</span>
          {place.host.isPro && <span className="offer__user-status">Pro</span>}
        </div>
        <div className="offer__description">
          <p className="offer__text">{place.description}</p>
        </div>
      </div>
    </>
  );
}
