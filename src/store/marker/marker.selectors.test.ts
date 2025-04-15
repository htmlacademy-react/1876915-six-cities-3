import { getActiveMarker } from './marker.selectors';
import { SliceNameSpace } from '../../const';
import { MarkerType } from '../../types/place';
import { faker } from '@faker-js/faker';

describe('Marker selectors', () => {
  const state = {
    [SliceNameSpace.Marker]: {
      activeMarker: {
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
        zoom: faker.number.int()
      } as MarkerType
    }
  };

  it('should return active marker', () => {
    const result = getActiveMarker(state);
    expect(result).toEqual(state[SliceNameSpace.Marker].activeMarker);
  });
});
