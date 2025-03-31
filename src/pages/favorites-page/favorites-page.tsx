import { Helmet } from 'react-helmet-async';
import Footer from '../../components/footer/footer';
import FavoritesListEmpty from '../../components/favorites-list/favorites-list-empty';
import FavoritesList from '../../components/favorites-list/favorites-list';
import { useEffect } from 'react';
import clsx from 'clsx';
import { useFavoritePreviewsSelector } from '../../store/place-data/selectors';
import { useAppDispatch } from '../../hooks';
import { fetchFavoritePreviewsAction } from '../../store/api-actions';

export default function FavoritesPage() {

  const dispatch = useAppDispatch();
  const previews = useFavoritePreviewsSelector();

  if (!previews.length) {
    dispatch(fetchFavoritePreviewsAction());
  }

  useEffect(() => {
    document.querySelector('.page')?.classList.toggle('page--favorites-empty', previews.length === 0);
  }, [previews.length]);

  return (
    < >
      <main className={clsx('page__main page__main--favorites', previews.length || 'page__main--favorites-empty')}>
        <Helmet>
          <title>6 Cities.Favorite places</title>
        </Helmet>
        <div className="page__favorites-container container">
          {previews.length ? <FavoritesList previews={previews} /> : <FavoritesListEmpty />}
        </div>
      </main>
      <Footer />
    </>
  );
}
