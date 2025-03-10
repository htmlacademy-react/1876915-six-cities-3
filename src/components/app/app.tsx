import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import { PlacePreview } from '../../types';
import MainPage from '../../pages/main-page/main-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';
import NotFoundPageRedirect from '../../pages/not-found-page/not-found-page-redirect';

type AppProps = {
  previewList: PlacePreview[];
}

export default function App({ previewList }: AppProps) {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Main} element={<Layout />}>
            <Route index element={<MainPage previewList={previewList} />} />
            <Route path={AppRoute.Login} element={<LoginPage />} />
            <Route path={AppRoute.Offers} element={<OfferPage />} />
            <Route path={AppRoute.Favorites} element={
              <PrivateRoute >
                <FavoritesPage previewList={previewList} />
              </PrivateRoute>
            }
            />
            <Route path='*' element={<NotFoundPageRedirect />} />
            <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider >
  );
}
