import { getActiveMarker } from './marker.selectors';
import { SliceNameSpace } from '../../const';
import { MarkerType } from '../../types/place';
import { faker } from '@faker-js/faker';

describe('Marker selectors', () => {
  const mockState = {
    [SliceNameSpace.Marker]: {
      activeMarker: {
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
        zoom: faker.number.int()
      } as MarkerType
    }
  };

  it('should return active marker', () => {
    const result = getActiveMarker(mockState);
    expect(result).toEqual(mockState[SliceNameSpace.Marker].activeMarker);
  });
});
