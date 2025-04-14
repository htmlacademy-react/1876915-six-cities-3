import { getPreviewsFetchStatus, getPlaceFetchStatus, getNearbyFetchStatus, getPreviews, getPlace, getNearby } from './place.selectors';
import { RequestStatus } from '../../types/state';
import { SliceNameSpace } from '../../const';
import { Place, PlacePreview, HousingType } from '../../types/place';
import { faker } from '@faker-js/faker';
import { getRandomCityName } from '../../utils';

describe('Place selectors', () => {

  const placeId = faker.string.uuid();
  const location = {
    latitude: faker.number.float(),
    longitude: faker.number.float(),
    zoom: faker.number.int()
  };

  const mockPlace: Place = {
    id: placeId,
    title: faker.lorem.words(),
    description: faker.lorem.paragraph(),
    type: HousingType.Apartment,
    price: faker.number.int(),
    bedrooms: faker.number.int(),
    maxAdults: faker.number.int(),
    rating: faker.number.int(),
    isPremium: faker.datatype.boolean(),
    isFavorite: faker.datatype.boolean(),
    location,
    city: {
      name: getRandomCityName(),
      location,
    },
    images: Array(6).fill(null).map(() => faker.image.url()),
    goods: ['Wi-Fi', 'Heating'],
    host: {
      name: faker.person.fullName(),
      avatarUrl: faker.image.avatar(),
      isPro: faker.datatype.boolean()
    },
  };

  const mockPreview: PlacePreview = { ...mockPlace, previewImage: faker.image.url() };

  const mockState = {
    [SliceNameSpace.Place]: {
      previewsFetchStatus: RequestStatus.Fulfilled,
      placeFetchStatus: RequestStatus.Fulfilled,
      nearbyFetchStatus: RequestStatus.Fulfilled,
      previews: [mockPreview],
      place: mockPlace,
      nearbyPreviews: [mockPreview]
    }
  };

  it('should return previews fetch status', () => {
    const result = getPreviewsFetchStatus(mockState);
    expect(result).toBe(RequestStatus.Fulfilled);
  });

  it('should return place fetch status', () => {
    const result = getPlaceFetchStatus(mockState);
    expect(result).toBe(RequestStatus.Fulfilled);
  });

  it('should return nearby fetch status', () => {
    const result = getNearbyFetchStatus(mockState);
    expect(result).toBe(RequestStatus.Fulfilled);
  });

  it('should return previews array', () => {
    const result = getPreviews(mockState);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(placeId);
  });

  it('should return place', () => {
    const result = getPlace(mockState);
    expect(result).toEqual(mockPlace);
    expect(result?.id).toBe(placeId);
  });

  it('should return nearby previews', () => {
    const result = getNearby(mockState);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(placeId);
  });
});
