import { Helmet } from 'react-helmet-async';
import { Navigate, useParams } from 'react-router-dom';
import { getPlaceDetails } from '../../mocks/place-details';
import { AppRoute, MAX_SHOWN_NEAR_PLACES } from '../../const';
import { PlacePreview } from '../../types';
import PlaceCard from '../../components/place-card';
import Offer from '../../components/offer';
import Map from '../../components/map/map';

type OfferPageProps = {
  previewList: PlacePreview[];
}

export default function OfferPage({ previewList }: OfferPageProps) {

  const { id = '' } = useParams<'id'>();
  const place = getPlaceDetails(id);

  if (!place) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  const nearPlaces = previewList.filter((item) => item.id !== id).slice(0, MAX_SHOWN_NEAR_PLACES).concat({ ...place, previewImage: '' });

  return (
    <main className="page__main page__main--offer">
      <Helmet>
        <title>6 Cities.Offer</title>
      </Helmet>

      <Offer place={place} >
        <Map activePlace={place} places={nearPlaces} className='offer__map' />
      </Offer>


      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">
            Other places in the neighbourhood
          </h2>
          <div className="near-places__list places__list">
            {nearPlaces.map((preview) => (
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
