import cn from 'classnames';
import { MemoizedFooter } from '../../components/footer/footer';
import FavoritesListEmpty from '../../components/favorites-list/favorites-list-empty';
import FavoritesList from '../../components/favorites-list/favorites-list';
import { Helmet } from 'react-helmet-async';
import { useFavoritesSelector } from '../../store';

export default function FavoritesPage() {

  const favorites = useFavoritesSelector();

  return (
    < >
      <main className={cn('page__main page__main--favorites', favorites.length || 'page__main--favorites-empty')}>
        <Helmet>
          <title>6 Cities.Favorite places</title>
        </Helmet>
        <div className="page__favorites-container container">
          {favorites.length ? <FavoritesList previews={favorites} /> : <FavoritesListEmpty />}
        </div>
      </main>
      <MemoizedFooter />
    </>
  );
}
