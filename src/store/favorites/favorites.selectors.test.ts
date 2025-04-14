import { getFavoritesFetchStatus, getFavoritesChangeStatus, getFavorites, getIsFavoritesEmptyFlag, getIsFavoriteFlag } from './favorites.selectors';
import { RequestStatus } from '../../types/state';
import { SliceNameSpace } from '../../const';
import { PlacePreview, HousingType } from '../../types/place';
import { faker } from '@faker-js/faker';
import { getRandomCityName } from '../../utils';

describe('Favorites selectors', () => {
  const placeId = faker.string.uuid();
  const location = {
    latitude: faker.number.float(),
    longitude: faker.number.float(),
    zoom: faker.number.int()
  };
  const isFavorite = faker.datatype.boolean();

  const mockPreview: PlacePreview = {
    id: placeId,
    title: faker.lorem.words(),
    type: HousingType.Apartment,
    price: faker.number.int(),
    rating: faker.number.int(),
    isPremium: faker.datatype.boolean(),
    isFavorite,
    previewImage: faker.image.url(),
    location,
    city: {
      name: getRandomCityName(),
      location
    }
  };

  const mockState = {
    [SliceNameSpace.Favorites]: {
      favoritesFetchStatus: RequestStatus.Fulfilled,
      changeFavoriteStatus: {
        [placeId]: RequestStatus.Fulfilled
      },
      favorites: [mockPreview]
    }
  };

  it('should return favorites fetch status', () => {
    expect(getFavoritesFetchStatus(mockState)).toBe(RequestStatus.Fulfilled);
  });

  it('should return favorites change status', () => {
    const result = getFavoritesChangeStatus(placeId)(mockState);
    expect(result).toBe(RequestStatus.Fulfilled);
  });

  it('should return favorites array', () => {
    const result = getFavorites(mockState);
    expect(result).toHaveLength(1);
    expect(result[0].id).toEqual(placeId);
  });

  it('should return is favorites empty flag', () => {
    expect(getIsFavoritesEmptyFlag(mockState)).toBe(false);
  });

  it('should return is favorite flag', () => {
    const result = getIsFavoriteFlag(placeId)(mockState);
    expect(result).toBe(isFavorite);
  });
});
