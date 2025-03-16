import clsx from 'clsx';
import useMap from '../../hooks/use-map';
import { useEffect, useRef } from 'react';
import { Place, PlacePreview } from '../../types';
import { Icon, layerGroup, Marker } from 'leaflet';

const DEFAULT_MARKER_URL = 'img/pin.svg';
const ACTIVE_MARKER_URL = 'img/pin-active.svg';

const DefaultIcon = new Icon({
  iconUrl: DEFAULT_MARKER_URL,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const ActiveIcon = new Icon({
  iconUrl: ACTIVE_MARKER_URL,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

type MapProps = {
  places: (Place | PlacePreview)[];
  activePlace: Place | PlacePreview;
  className: string;
}

export default function Map({ activePlace, places, className }: MapProps) {

  const mapRef = useRef(null);
  const map = useMap(mapRef, activePlace.city.location);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      places.forEach(({ id, city: { location: { latitude, longitude } } }) => {
        const marker = new Marker({
          lat: latitude,
          lng: longitude,
        });

        marker
          .setIcon((id === activePlace.id) ? ActiveIcon : DefaultIcon)
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, places, activePlace]);

  return (
    <section ref={mapRef} className={clsx('map', className)} />
  );
}
