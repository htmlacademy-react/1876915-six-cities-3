import { useLocation } from 'react-router-dom';
import { AppRoute } from '../const';

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

  return { ...defaultConfig, ...LayoutConfig[pathname as AppRoute] };
};
