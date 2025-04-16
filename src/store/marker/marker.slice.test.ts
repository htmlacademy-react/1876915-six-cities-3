import { markerReducer, markerActions } from './marker.slice';
import { DEFAULT_CITY } from '../../const';
import { faker } from '@faker-js/faker';
import { MarkerState } from '../../types';

describe('Marker slice', () => {
  it('should return initial state with default city', () => {
    const expectedState: MarkerState = {
      activeMarker: DEFAULT_CITY
    };

    expect(markerReducer(undefined, { type: '' })).toEqual(expectedState);
  });

  it('should handle setActiveMarker', () => {
    const newMarker = {
      latitude: faker.number.float(),
      longitude: faker.number.float(),
      zoom: faker.number.int()
    };

    const expectedState = {
      activeMarker: newMarker
    };

    expect(markerReducer(undefined, markerActions.setActiveMarker(newMarker))).toEqual(expectedState);
  });
});
