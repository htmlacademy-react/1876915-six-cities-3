import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import MainPage from '../../pages/main-page/main-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import LoginPage from '../../pages/login-page/login-page';
import PlacePage from '../../pages/place-page/place-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';
import NotFoundPageRedirect from '../../pages/not-found-page/not-found-page-redirect';
import ScrollToTop from '../scroll-top/scroll-top';
import { RequestStatus } from '../../types';
import { usePreviewsFetchStatusSelector } from '../../store/place-data/selectors';
import Spinner from '../spinner/spinner';

export default function App() {

  const status = usePreviewsFetchStatusSelector();

  if (status === RequestStatus.Pending) {
    return <Spinner />;
  }

  return (
    <HelmetProvider>
      <ScrollToTop />
      <Routes>
        <Route path={AppRoute.Main} element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path={AppRoute.Login} element={<LoginPage />} />
          <Route path={AppRoute.Offers} element={<PlacePage />} />
          <Route path={AppRoute.Favorites} element={
            <PrivateRoute >
              <FavoritesPage />
            </PrivateRoute>
          }
          />
          <Route path='*' element={<NotFoundPageRedirect />} />
          <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HelmetProvider >
  );
}
