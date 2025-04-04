import { Helmet } from 'react-helmet-async';
import { Navigate, useParams } from 'react-router-dom';
import { AppRoute, DEFAULT_CITY, MAX_SHOWN_NEAR_PLACES, ImageDefault as D } from '../../const';
import { useCommentsFetchStatusSelector, useCommentsSelector, useNearbyFetchStatusSelector, useNearbySelector, usePlaceFetchStatusSelector, usePlaceSelector } from '../../store/place-data/selectors';
import { useEffect } from 'react';
import { MarkerType, Place, RequestStatus } from '../../types';
import { useActionCreators } from '../../hooks';
import { placeProcessActions } from '../../store/place-process/place-process';
import { placeDataActions } from '../../store/place-data/place-data';
import Map from '../../components/map/map';
import PlaceCard from '../../components/place-card';
import Spinner from '../../components/spinner/spinner';
import Reviews from '../../components/reviews';
import PlaceStatusLabel from '../../components/place-card/place-status-label';
import PlaceToFavoritesButton from '../../components/place-card/place-to-favorites-button';
import PlaceRating from '../../components/place-card/place-rating';
import PlaceGallery from '../../components/place-gallery/place-gallery';
import PlaceFeatures from '../../components/place-features/place-features';

const getLocation = (place: Place | null) => place ? ({ id: place.id, ...place.location, zoom: place.city.location.zoom }) : DEFAULT_CITY as MarkerType;

export default function PlacePage() {
  const { id } = useParams<'id'>();
  const { setActiveMarker } = useActionCreators(placeProcessActions);
  const { fetchPlaceAction, fetchNearbyPreviewsAction, fetchPlaceCommentsAction, } = useActionCreators(placeDataActions);

  const place = usePlaceSelector();
  const placeStatus = usePlaceFetchStatusSelector();

  const nearbyPreviews = useNearbySelector();
  const nearbyStatus = useNearbyFetchStatusSelector();

  const comments = useCommentsSelector();
  const commentsStatus = useCommentsFetchStatusSelector();

  const shouldPlaceShown = place && (place.id === id);
  const shouldNearbyShown = shouldPlaceShown && (nearbyStatus === RequestStatus.Fulfilled);
  const shouldCommentsShown = shouldPlaceShown && (commentsStatus === RequestStatus.Fulfilled);

  useEffect(() => {
    if (id) {
      fetchPlaceAction(id);
      fetchNearbyPreviewsAction(id);
      fetchPlaceCommentsAction(id);
    }
  }, [fetchNearbyPreviewsAction, fetchPlaceAction, fetchPlaceCommentsAction, id]);

  useEffect(() => {
    if (shouldPlaceShown) {
      setActiveMarker(getLocation(place));
    }
  });

  if (!id || (placeStatus === RequestStatus.Rejected)) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  const previews = nearbyPreviews.slice(0, MAX_SHOWN_NEAR_PLACES);
  const center = getLocation(place);
  const markers: MarkerType[] = previews.map((item) => ({ id: item.id, ...item.location }) as MarkerType).concat(center);

  return (
    <main className="page__main page__main--offer">
      <Helmet><title>6 Cities.{place ? place.title : ''}</title></Helmet>

      {shouldPlaceShown ?
        <section className="offer">
          <div className="offer__gallery-container container">
            <PlaceGallery imageUrls={place.images} />
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              <PlaceStatusLabel className='offer__mark' />
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{place.title}</h1>Place
                <PlaceToFavoritesButton className='offer' isFavorite={place.isFavorite} width={D.OfferBookmarkIconWidth} height={D.OfferBookmarkIconHeight} />
              </div>

              <PlaceRating placeRating={place.rating} className={{ rating: 'offer__rating', stars: 'offer__stars', value: 'offer__rating-value' }} shouldRatingShown />
              <PlaceFeatures place={place} />

              {shouldCommentsShown ? <Reviews reviews={comments} placeId={id} /> : <Spinner />}
            </div>
          </div>
          <Map markers={markers} className='offer__map' />
        </section> : <Spinner />}

      {shouldNearbyShown ?
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              {previews.map((preview) => (
                <PlaceCard
                  preview={preview}
                  cardClassName='near-places__card'
                  imageClassName='near-places__image-wrapper'
                  key={`offer-${preview.id}`}
                />
              ))}
            </div>
          </section>
        </div> : <Spinner />}
    </main >
  );
}
