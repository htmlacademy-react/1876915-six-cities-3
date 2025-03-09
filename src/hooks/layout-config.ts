import { useLocation } from 'react-router-dom';
import { AppRoute } from '../const';

const defaultConfig = {
  pageClassName: 'not-found',
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
};

export const useLayoutConfig = () => {
  const { pathname } = useLocation();

  return { ...defaultConfig, ...LayoutConfig[pathname as AppRoute] };
};
