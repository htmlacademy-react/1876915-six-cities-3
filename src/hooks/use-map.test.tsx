import { renderHook } from '@testing-library/react';
import { useMap } from './use-map';
import { faker } from '@faker-js/faker';
import { PlaceLocation } from '../types';

vi.mock('leaflet', () => ({
  Map: vi.fn().mockReturnValue({
    setView: vi.fn(),
    remove: vi.fn(),
    addLayer: vi.fn()
  }),
  map: vi.fn().mockReturnValue({
    setView: vi.fn(),
    remove: vi.fn(),
    addLayer: vi.fn()
  }),
  TileLayer: vi.fn().mockReturnValue({
    addTo: vi.fn()
  }),
  tileLayer: vi.fn().mockReturnValue({
    addTo: vi.fn()
  }),
  icon: vi.fn().mockReturnValue({
    iconUrl: vi.fn(),
    iconSize: vi.fn(),
    iconAnchor: vi.fn()
  }),
  marker: vi.fn().mockReturnValue({
    addTo: vi.fn(),
    remove: vi.fn()
  })
}));

describe('Hook: useMap', () => {
  const mockMapRef = {
    current: document.createElement('div')
  };

  const mockLocation: PlaceLocation = {
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    zoom: faker.number.int({ min: 10, max: 15 })
  };

  it('should create map instance', () => {
    const { result } = renderHook(() => useMap(mockMapRef, mockLocation));

    expect(result.current).toBeDefined();
    expect(typeof result.current).toBe('object');
  });

  it('should set tile layer', () => {
    const { result } = renderHook(() => useMap(mockMapRef, mockLocation));

    expect(result.current?.addLayer).toHaveBeenCalled();
  });

  it('should not create map if ref is null', () => {
    const nullRef = { current: null };
    const { result } = renderHook(() => useMap(nullRef, mockLocation));

    expect(result.current).toBeNull();
  });
});
