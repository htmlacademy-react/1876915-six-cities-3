import { getPreviewsFetchStatus, getPlaceFetchStatus, getNearbyFetchStatus, getPreviews, getPlace, getNearby } from './place.selectors';
import { RequestStatus } from '../../types/state';
import { SliceNameSpace } from '../../const';
import { PlacePreview } from '../../types/place';
import { faker } from '@faker-js/faker';
import { generatePlace } from '../../utils/test/mocks';

describe('Place selectors', () => {

  const mockedPlace = generatePlace();
  const placeId = mockedPlace.id;

  const mockPreview: PlacePreview = { ...mockedPlace, previewImage: faker.image.url() };
  const previews = [mockPreview];
  const nearbyPreviews = [mockPreview];

  const state = {
    [SliceNameSpace.Place]: {
      previewsFetchStatus: RequestStatus.Fulfilled,
      placeFetchStatus: RequestStatus.Fulfilled,
      nearbyFetchStatus: RequestStatus.Fulfilled,
      previews,
      place: mockedPlace,
      nearbyPreviews,
    }
  };

  it('should return previews fetch status', () => {
    const result = getPreviewsFetchStatus(state);
    expect(result).toBe(RequestStatus.Fulfilled);
  });

  it('should return place fetch status', () => {
    const result = getPlaceFetchStatus(state);
    expect(result).toBe(RequestStatus.Fulfilled);
  });

  it('should return nearby fetch status', () => {
    const result = getNearbyFetchStatus(state);
    expect(result).toBe(RequestStatus.Fulfilled);
  });

  it('should return previews array', () => {
    const result = getPreviews(state);
    expect(result).toEqual(previews);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(placeId);
  });

  it('should return place', () => {
    const result = getPlace(state);
    expect(result).toEqual(mockedPlace);
    expect(result?.id).toBe(placeId);
  });

  it('should return nearby previews', () => {
    const result = getNearby(state);
    expect(result).toEqual(nearbyPreviews);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(placeId);
  });
});
