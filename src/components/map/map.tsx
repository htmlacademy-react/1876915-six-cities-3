import clsx from 'clsx';
import useMap from '../../hooks/use-map';
import { useEffect, useRef } from 'react';
import { MarkerType } from '../../types/place';
import { BaseIconOptions, Icon, LayerGroup, layerGroup, Marker } from 'leaflet';
import { ActiveIcon, DefaultIcon } from '../../const';

const defaultIcon = new Icon(DefaultIcon as BaseIconOptions);
const activeIcon = new Icon(ActiveIcon as BaseIconOptions);

type MapProps = {
  activeMarkerId: string;
  markers: MarkerType[];
  center: MarkerType;
  className: string;
}

export default function Map({ center, markers, activeMarkerId, className }: MapProps) {

  const mapRef = useRef(null);
  const map = useMap(mapRef, center);
  const markerLayer = useRef<LayerGroup>(layerGroup());

  useEffect(() => {
    if (map) {
      map.flyTo([center.latitude, center.longitude], center.zoom);
      markerLayer.current.addTo(map);
      markerLayer.current.clearLayers();
    }
  }, [map, center.latitude, center.longitude, center.zoom]);

  useEffect(() => {
    if (map) {
      markers.forEach(({ id, latitude, longitude }) => {
        new Marker([latitude, longitude])
          .setIcon((id === activeMarkerId) ? activeIcon : defaultIcon)
          .addTo(markerLayer.current);
      });
    }
  }, [map, markers, activeMarkerId]);

  return (
    <section ref={mapRef} className={clsx('map', className)} />
  );
}
