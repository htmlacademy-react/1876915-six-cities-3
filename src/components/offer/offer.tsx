import clsx from 'clsx';
import { ImageDefault as D } from '../../const';
import { Place } from '../../types';
import { capitalizeFirstLetter, pluralize } from '../../utils';
import PlaceMark from '../place-card/place-mark';
import PlaceRating from '../place-card/place-rating';
import PlaceToFavoritesButton from '../place-card/place-to-favorites-button';
import Gallery from './gallery';
import Reviews from './reviews';
import { PropsWithChildren } from 'react';

type OfferProps = {
  place: Place;
};

export default function Offer({ place, children }: PropsWithChildren<OfferProps>) {
  return (
    <section className="offer">
      <div className="offer__gallery-container container">
        <Gallery imageUrls={place.images} />
      </div>
      <div className="offer__container container">
        <div className="offer__wrapper">
          <PlaceMark className='offer__mark' />
          <div className="offer__name-wrapper">
            <h1 className="offer__name">{place.title}</h1>Place
            <PlaceToFavoritesButton className='offer' isFavorite={place.isFavorite} width={D.OfferBookmarkIconWidth} height={D.OfferBookmarkIconHeight} />
          </div>
          <PlaceRating
            rating={place.rating}
            ratingClassName='offer__rating'
            starsClassName='offer__stars'
            valueClassName='offer__rating-value'
            shouldRatingShown
          />

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
              <div className={clsx('offer__avatar-wrapper', 'user__avatar-wrapper', place.host.isPro && 'offer__avatar-wrapper--pro')} >
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

          <Reviews />
        </div>
      </div>
      {children}
    </section>
  );
}
