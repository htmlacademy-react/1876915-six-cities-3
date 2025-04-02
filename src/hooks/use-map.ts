
import 'leaflet/dist/leaflet.css';
import { useEffect, useState, MutableRefObject, useRef } from 'react';
import { Map, TileLayer } from 'leaflet';
import { PlaceLocation } from '../types';

const TEMPLATE_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const ATTRIBUTION_URL = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';


export function useMap(mapRef: MutableRefObject<HTMLElement | null>, { latitude, longitude, zoom }: PlaceLocation): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if ((mapRef.current !== null) && (!isRenderedRef.current)) {
      const instance = new Map(mapRef.current, {
        center: [latitude, longitude],
        zoom
      });

      const layer = new TileLayer(TEMPLATE_URL, { attribution: ATTRIBUTION_URL, });
      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, latitude, longitude, zoom]);

  return map;
}
