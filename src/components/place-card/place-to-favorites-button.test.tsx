import { act, render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/test/with-history-component';
import { withStore } from '../../utils/test/with-store-component';
import PlaceToFavoritesButton from './place-to-favorites-button';
import { AppRoute, AuthorizationStatus, SliceNameSpace } from '../../const';
import { RequestStatus } from '../../types';
import userEvent from '@testing-library/user-event';
import { generatePlacePreview } from '../../utils/test/mocks';
import { faker } from '@faker-js/faker';
import { createMemoryHistory } from 'history';

describe('Component: PlaceToFavoritesButton', () => {
  const mockClassName = faker.lorem.word();
  const mockFavorite = generatePlacePreview();
  const placeId = mockFavorite.id;

  it('should render correctly when not favorite', () => {
    const mockState = {
      [SliceNameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        loginStatus: RequestStatus.Pending
      },
      [SliceNameSpace.Favorites]: {
        favorites: [],
        favoritesFetchStatus: RequestStatus.Fulfilled,
        changeFavoriteStatus: {}
      }
    };

    const expectedClassName = `${mockClassName}__bookmark-button--active`;

    const { withStoreComponent } = withStore(
      <PlaceToFavoritesButton
        placeId={placeId}
        className={mockClassName}
      />,
      mockState
    );

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const button = screen.getByTestId('place-to-favorites-button');
    expect(button).toBeInTheDocument();
    expect(button).not.toHaveClass(expectedClassName);
  });

  it('should render correctly when favorite', () => {
    mockFavorite.isFavorite = true;
    const mockState = {
      [SliceNameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        loginStatus: RequestStatus.Pending
      },
      [SliceNameSpace.Favorites]: {
        favorites: [mockFavorite],
        favoritesFetchStatus: RequestStatus.Fulfilled,
        changeFavoriteStatus: {}
      }
    };

    const expectedClassName = `${mockClassName}__bookmark-button--active`;

    const { withStoreComponent } = withStore(
      <PlaceToFavoritesButton
        placeId={placeId}
        className={mockClassName}
      />,
      mockState
    );

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const button = screen.getByTestId('place-to-favorites-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(expectedClassName);
  });

  it('should redirect to login page when not authorized', async () => {
    const mockHistory = createMemoryHistory();
    const mockState = {
      [SliceNameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        loginStatus: RequestStatus.Pending
      },
      [SliceNameSpace.Favorites]: {
        favorites: [],
        favoritesFetchStatus: RequestStatus.Fulfilled,
        changeFavoriteStatus: {}
      }
    };

    const { withStoreComponent } = withStore(
      <PlaceToFavoritesButton
        placeId={placeId}
        className={mockClassName}
      />,
      mockState
    );

    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    await act(async () => {
      await userEvent.click(screen.getByTestId('place-to-favorites-button'));
      expect(mockHistory.location.pathname).toBe(AppRoute.Login);
    });

  });

  it('should be disabled when status is pending', async () => {
    mockFavorite.isFavorite = false;
    const mockState = {
      [SliceNameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        loginStatus: RequestStatus.Pending
      },
      [SliceNameSpace.Favorites]: {
        favorites: [],
        favoritesFetchStatus: RequestStatus.Fulfilled,
        changeFavoriteStatus: {
          [placeId]: RequestStatus.Pending
        }
      }
    };

    const { withStoreComponent } = withStore(
      <PlaceToFavoritesButton
        placeId={placeId}
        className={mockClassName}
      />,
      mockState
    );

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    await act(async () => {
      await userEvent.click(screen.getByTestId('place-to-favorites-button'));
      expect(screen.getByTestId('place-to-favorites-button')).toBeDisabled();
    });
  });
});
