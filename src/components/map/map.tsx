import clsx from 'clsx';
import useMap from '../../hooks/use-map';
import { useEffect, useRef } from 'react';
import { Place, PlacePreview } from '../../types/place';
import { BaseIconOptions, Icon, layerGroup, Marker } from 'leaflet';
import { ActiveIcon, DefaultIcon } from '../../const';

const defaultIcon = new Icon(DefaultIcon as BaseIconOptions);
const activeIcon = new Icon(ActiveIcon as BaseIconOptions);

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
      places.forEach(({ id, location: { latitude, longitude } }) => {
        const marker = new Marker({
          lat: latitude,
          lng: longitude,
        });

        marker
          .setIcon((id === activePlace.id) ? activeIcon : defaultIcon)
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
