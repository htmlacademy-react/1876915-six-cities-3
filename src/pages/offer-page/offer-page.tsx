import { Helmet } from 'react-helmet-async';
import { Navigate, useParams } from 'react-router-dom';
import { AppRoute, MAX_SHOWN_NEAR_PLACES } from '../../const';
import PlaceCard from '../../components/place-card';
import Offer from '../../components/offer';
import Map from '../../components/map/map';
import { useNearOffersSelector, useOfferSelector } from '../../store/place-data/selectors';
import { fetchNearbyPreviewsAction, fetchOfferAction } from '../../store/api-actions';
import { useEffect } from 'react';
import { Place, PlacePreview } from '../../types';
import { useActionCreator, useAppDispatch } from '../../hooks';
import { placeProcessActions } from '../../store/place-process/place-process';

const getLocation = (place: Place) => ({ id: place.id, ...place.location, zoom:place.city.location.zoom });

export default function OfferPage() {
  const { setActiveMarker } = useActionCreator(placeProcessActions);

  const { id = '' } = useParams<'id'>();
  const { placeId, nearbyPreviews } = useNearOffersSelector();
  const place = useOfferSelector();
  const dispatch = useAppDispatch();

  const shouldOfferFetch = (placeId !== id) || !place;

  useEffect(() => {
    if (shouldOfferFetch) {
      dispatch(fetchOfferAction(id));
      dispatch(fetchNearbyPreviewsAction(id));
    }
  }, [dispatch, id, shouldOfferFetch]);

  useEffect(() => {
    if (place) {
      setActiveMarker(getLocation(place));
    }
  });

  if (!id) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  if (shouldOfferFetch) {
    return null;
  }


  const previews: PlacePreview[] = nearbyPreviews.slice(0, MAX_SHOWN_NEAR_PLACES);
  const center = getLocation(place);
  const markers = previews.map((item) => ({ id: item.id, ...item.location })).concat(center);

  return (
    <main className="page__main page__main--offer">
      <Helmet>
        <title>6 Cities.Offer</title>
      </Helmet>

      <Offer place={place} >
        <Map markers={markers} className='offer__map' />
      </Offer>


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
      </div>
    </main>
  );
}
