import { getFavoritesFetchStatus, getFavoritesChangeStatus, getFavorites, getIsFavoritesEmptyFlag, getIsFavoriteFlag } from './favorites.selectors';
import { RequestStatus } from '../../types/state';
import { SliceNameSpace } from '../../const';
import { generatePlacePreview } from '../../utils/test/mocks';

describe('Favorites selectors', () => {
  const preview = generatePlacePreview();
  const placeId = preview.id;
  const isFavorite = preview.isFavorite;

  const state = {
    [SliceNameSpace.Favorites]: {
      favoritesFetchStatus: RequestStatus.Fulfilled,
      changeFavoriteStatus: {
        [placeId]: RequestStatus.Fulfilled
      },
      favorites: [preview],
    }
  };

  it('should return favorites fetch status', () => {
    expect(getFavoritesFetchStatus(state)).toBe(RequestStatus.Fulfilled);
  });

  it('should return favorites change status', () => {
    const result = getFavoritesChangeStatus(placeId)(state);
    expect(result).toBe(RequestStatus.Fulfilled);
  });

  it('should return favorites array', () => {
    const result = getFavorites(state);
    expect(result).toEqual(state[SliceNameSpace.Favorites].favorites);
    expect(result).toHaveLength(1);
    expect(result[0].id).toEqual(placeId);
  });

  it('should return is favorites empty flag', () => {
    expect(getIsFavoritesEmptyFlag(state)).toBe(false);
  });

  it('should return is favorite flag', () => {
    const result = getIsFavoriteFlag(placeId)(state);
    expect(result).toBe(isFavorite);
  });
});
