import { Helmet } from 'react-helmet-async';
import Footer from '../../components/footer/footer';
import FavoritesListEmpty from '../../components/favorites-list/favorites-list-empty';
import FavoritesList from '../../components/favorites-list/favorites-list';
import { useEffect } from 'react';
import clsx from 'clsx';
import { useFavoritesSelector } from '../../store/place-data/selectors';

export default function FavoritesPage() {

  const favorites = useFavoritesSelector();

  useEffect(() => {
    document.querySelector('.page')?.classList.toggle('page--favorites-empty', favorites.length === 0);
  }, [favorites.length]);

  return (
    < >
      <main className={clsx('page__main page__main--favorites', favorites.length || 'page__main--favorites-empty')}>
        <Helmet>
          <title>6 Cities.Favorite places</title>
        </Helmet>
        <div className="page__favorites-container container">
          {favorites.length ? <FavoritesList previews={favorites} /> : <FavoritesListEmpty />}
        </div>
      </main>
      <Footer />
    </>
  );
}
