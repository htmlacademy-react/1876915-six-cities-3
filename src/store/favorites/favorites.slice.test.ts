import { ChangeFavoritesResponse, RequestStatus } from '../../types';
import { FavoriteState } from '../../types';
import { favoriteActions, favoriteReducer } from '../index';
import { generatePlacePreview } from '../../utils/test/mocks';

describe('Favorites slice', () => {

  const mockedPlace = generatePlacePreview();
  const placeId = mockedPlace.id;

  it('should return initial state', () => {
    const expectedState: FavoriteState = {
      favoritesFetchStatus: RequestStatus.Fulfilled,
      changeFavoriteStatus: {},
      favorites: []
    };

    const result = favoriteReducer(undefined, { type: '' });
    expect(result).toEqual(expectedState);
  });

  it('should handle fetchFavoritesAction.fulfilled', () => {
    const result = favoriteReducer(undefined, favoriteActions.fetchFavoritesAction.fulfilled([mockedPlace], '', undefined));
    expect(result.favorites).toEqual([mockedPlace]);
    expect(result.favoritesFetchStatus).toBe(RequestStatus.Fulfilled);
  });

  it('should handle fetchFavoritesAction.pending', () => {
    const result = favoriteReducer(undefined, favoriteActions.fetchFavoritesAction.pending);
    expect(result.favoritesFetchStatus).toEqual(RequestStatus.Pending);
  });

  it('should handle fetchFavoritesAction.rejected', () => {
    const result = favoriteReducer(undefined, favoriteActions.fetchFavoritesAction.rejected(null, '', undefined));
    expect(result.favoritesFetchStatus).toEqual(RequestStatus.Rejected);
  });

  it('should handle changeFavoriteStatusAction.fulfilled with isFavorite true', () => {

    const newMockedPlace = { ...mockedPlace, isFavorite: true };

    const afterState = {
      favoritesFetchStatus: RequestStatus.Fulfilled,
      changeFavoriteStatus: {
        [placeId]: RequestStatus.Fulfilled
      },
      favorites: [newMockedPlace]
    };

    const result = favoriteReducer(undefined, favoriteActions.changeFavoriteStatusAction.fulfilled(newMockedPlace as ChangeFavoritesResponse, '', { placeId, status: true }));
    expect(result).toEqual(afterState);
  });

  it('should handle changeFavoriteStatusAction.fulfilled with isFavorite false', () => {

    const newMockedPlace = { ...mockedPlace, isFavorite: false };

    const initialState = {
      favoritesFetchStatus: RequestStatus.Fulfilled,
      changeFavoriteStatus: {},
      favorites: [newMockedPlace]
    };

    const expectedState = {
      favoritesFetchStatus: RequestStatus.Fulfilled,
      changeFavoriteStatus: {
        [placeId]: RequestStatus.Fulfilled
      },
      favorites: []
    };

    const result = favoriteReducer(initialState, favoriteActions.changeFavoriteStatusAction.fulfilled(newMockedPlace as ChangeFavoritesResponse, '', { placeId, status: false }));
    expect(result).toEqual(expectedState);
  });

  it('should handle changeFavoriteStatusAction.pending', () => {

    const expectedState = {
      favoritesFetchStatus: RequestStatus.Fulfilled,
      changeFavoriteStatus: {
        [placeId]: RequestStatus.Pending
      },
      favorites: []
    };

    const result = favoriteReducer(undefined, favoriteActions.changeFavoriteStatusAction.pending('', { placeId, status: true }));
    expect(result).toEqual(expectedState);
  });

  it('should handle changeFavoriteStatusAction.rejected', () => {

    const expectedState = {
      favoritesFetchStatus: RequestStatus.Fulfilled,
      changeFavoriteStatus: {
        [placeId]: RequestStatus.Rejected
      },
      favorites: []
    };

    const result = favoriteReducer(undefined, favoriteActions.changeFavoriteStatusAction.rejected(null, '', { placeId, status: true }));
    expect(result).toEqual(expectedState);
  });
});
