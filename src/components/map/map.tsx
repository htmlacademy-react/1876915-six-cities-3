import cn from 'classnames';
import { useEffect, useRef } from 'react';
import { MarkerType } from '../../types';
import { BaseIconOptions, Icon, LayerGroup, layerGroup, Marker } from 'leaflet';
import { ActiveIcon, DefaultIcon } from '../../const';
import { useMap } from '../../hooks';
import { useActiveMarkerSelector } from '../../store/place-process/place-process.selectors';

const defaultIcon = new Icon(DefaultIcon as BaseIconOptions);
const activeIcon = new Icon(ActiveIcon as BaseIconOptions);

type MapProps = {
  markers: MarkerType[];
  className: string;
}

export default function Map({ markers, className }: MapProps) {

  const center = useActiveMarkerSelector();
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
          .setIcon((id === center.id) ? activeIcon : defaultIcon)
          .addTo(markerLayer.current);
      });
    }
  }, [map, markers, center.id]);

  return (
    <section ref={mapRef} className={cn('map', className)} />
  );
}
