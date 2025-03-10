import { Helmet } from 'react-helmet-async';
import Footer from '../../components/footer/footer';
import { PlacePreview } from '../../types';
import FavoritesListEmpty from '../../components/favorites-list/favorites-list-empty';
import FavoritesList from '../../components/favorites-list/favorites-list';

type FavoritesPageProps = {
  previewList: PlacePreview[];
}

export default function FavoritesPage({ previewList }: FavoritesPageProps) {
  const filteredPreviews = previewList.filter((item) => item.isFavorite);

  return (
    < >
      <main className="page__main page__main--favorites">
        <Helmet>
          <title>6 Cities.Favorite places</title>
        </Helmet>
        <div className="page__favorites-container container">
          {filteredPreviews.length ? <FavoritesList previewList={filteredPreviews} /> : <FavoritesListEmpty />}
        </div>
      </main>
      <Footer />
    </>
  );
}
