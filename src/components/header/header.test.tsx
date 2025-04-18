import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/test/with-history-component';
import { withStore } from '../../utils/test/with-store-component';
import Header from './header';
import { SliceNameSpace, AuthorizationStatus } from '../../const';
import { RequestStatus } from '../../types';
import { vi } from 'vitest';
import { generateLoggedUser } from '../../utils/test/mocks';

const mockUser = generateLoggedUser();

let isAuth = true;

vi.mock('../../services/token', () => ({
  getUserData: () => isAuth ? mockUser : null
}));

const initialState = {
  [SliceNameSpace.Favorites]: {
    favorites: [],
    favoritesFetchStatus: RequestStatus.Fulfilled,
    changeFavoriteStatus: {}
  },
  [SliceNameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    loginStatus: RequestStatus.Fulfilled,
  }
};

describe('Component: Header', () => {

  it('should render correctly with auth status', () => {
    const { withStoreComponent } = withStore(<Header isLogoActive shouldUserInfoRender />, initialState);
    render(withHistory(withStoreComponent));

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /6 cities logo/i })).toBeInTheDocument();
    expect(screen.getByTestId('nav')).toBeInTheDocument();
    expect(screen.getByTestId('user-email')).toBeInTheDocument();
    expect(screen.getByTestId('favorites-count')).toBeInTheDocument();
    expect(screen.getByTestId('logout-link')).toBeInTheDocument();
    expect(screen.getByTestId('favorites-count')).toHaveTextContent('0');
  });

  it('should render correctly with no auth status', () => {
    isAuth = false;
    const mockState = {
      ...initialState,
      [SliceNameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        loginStatus: RequestStatus.Fulfilled,
      }
    };

    const { withStoreComponent } = withStore(<Header isLogoActive shouldUserInfoRender />, mockState);
    render(withHistory(withStoreComponent));

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /6 cities logo/i })).toBeInTheDocument();
    expect(screen.getByTestId('nav')).toBeInTheDocument();
    expect(screen.getByTestId('login-link')).toBeInTheDocument();
    expect(screen.queryByTestId('Sign in')).not.toBeInTheDocument();
    expect(screen.queryByTestId('favorites-link')).not.toBeInTheDocument();
    expect(screen.queryByTestId('logout-link')).not.toBeInTheDocument();
  });

  it('should not render nav when shouldUserInfoRender is false', () => {
    const { withStoreComponent } = withStore(<Header isLogoActive shouldUserInfoRender={false} />, initialState);
    render(withHistory(withStoreComponent));

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.queryByTestId('logo-link')).not.toBeInTheDocument();
    expect(screen.queryByTestId('logo')).not.toBeInTheDocument();
    expect(screen.queryByTestId('nav')).not.toBeInTheDocument();
  });
});
