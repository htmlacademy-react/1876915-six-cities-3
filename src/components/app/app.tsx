import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import MainPage from '../../pages/main-page/main-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import LoginPage from '../../pages/login-page/login-page';
import PlacePage from '../../pages/place-page/place-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';
import NotFoundPageRedirect from '../../pages/not-found-page/not-found-page-redirect';
import ScrollToTop from '../scroll-top/scroll-top';
import Spinner from '../spinner/spinner';
import { RequestStatus } from '../../types';
import { storeActions, useAuthStatusSelector, useFavoritesFetchStatusSelector, usePreviewsFetchStatusSelector } from '../../store';
import { useActionCreators } from '../../hooks';
import { useEffect } from 'react';

export default function App() {

  const { fetchPreviewsAction, fetchFavoritesAction, checkAuthAction } = useActionCreators(storeActions);

  const authStatus = useAuthStatusSelector();
  const isAuthorized = (authStatus === AuthorizationStatus.Auth);

  useEffect(() => {
    if (isAuthorized) {
      fetchFavoritesAction();
    }
  }, [fetchFavoritesAction, isAuthorized]);

  useEffect(() => {
    fetchPreviewsAction();
  }, [fetchPreviewsAction]);

  useEffect(() => {
    checkAuthAction();
  }, [checkAuthAction]);

  const previewStatus = usePreviewsFetchStatusSelector();
  const favoritesStatus = useFavoritesFetchStatusSelector();

  if ((previewStatus === RequestStatus.Pending) || (favoritesStatus === RequestStatus.Pending)) {
    return <Spinner />;
  }

  return (
    <HelmetProvider>
      <ScrollToTop />
      <Routes>
        <Route path={AppRoute.Main} element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path={AppRoute.Login} element={<LoginPage />} />
          <Route path={AppRoute.Place} element={<PlacePage />} />
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
