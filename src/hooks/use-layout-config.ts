import { useLocation } from 'react-router-dom';
import { AppRoute } from '../const';
import { useIsFavoritesEmptySelector } from '../store';

const defaultConfig = {
  pageClassName: '',
  shouldUserInfoRender: true,
  isLogoActive: false,
};

const LayoutConfig: Record<string, Partial<typeof defaultConfig>> = {
  [AppRoute.Main]: {
    pageClassName: 'page--gray page--main',
    isLogoActive: true,
  },
  [AppRoute.Login]: {
    pageClassName: 'page--gray page--login',
    shouldUserInfoRender: false,
  },
  [AppRoute.NotFound]: {
    pageClassName: 'page__main page__main--index page__main--index-empty not-found',
    shouldUserInfoRender: false,
  },
};

export const useLayoutConfig = () => {

  const { pathname } = useLocation();

  const isFavoritesEmpty = useIsFavoritesEmptySelector();
  const config = LayoutConfig[pathname as AppRoute] || defaultConfig;

  if (isFavoritesEmpty && (pathname as AppRoute === AppRoute.Favorites)) {
    config.pageClassName = 'page page--favorites-empty';
  }

  return { ...defaultConfig, ...config };
};
