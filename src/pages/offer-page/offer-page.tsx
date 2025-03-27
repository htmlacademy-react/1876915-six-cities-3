import { Helmet } from 'react-helmet-async';
import { Navigate, useParams } from 'react-router-dom';
import { AppRoute, MAX_SHOWN_NEAR_PLACES } from '../../const';
import PlaceCard from '../../components/place-card';
import Offer from '../../components/offer';
import Map from '../../components/map/map';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useNearOffersSelector, useOfferSelector } from '../../store/place-data/selectors';
import { fetchNearbyPreviewsAction, fetchOfferAction } from '../../store/api-actions';
import { useEffect } from 'react';
import { PlacePreview } from '../../types/place';

export default function OfferPage() {
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

  if (!id) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  if (shouldOfferFetch) {
    return null;
  }

  const previews: PlacePreview[] = nearbyPreviews.slice(0, MAX_SHOWN_NEAR_PLACES);
  const center = { id: place.id, ...place.city.location };
  const markers = previews.map((item) => ({ id: item.id, ...item.location })).concat(center);

  return (
    <main className="page__main page__main--offer">
      <Helmet>
        <title>6 Cities.Offer</title>
      </Helmet>

      <Offer place={place} >
        <Map center={center} markers={markers} activeMarkerId={placeId} className='offer__map' />
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
