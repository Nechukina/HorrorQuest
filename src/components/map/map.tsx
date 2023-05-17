import { Icon, Marker, layerGroup } from 'leaflet';
import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import { Location } from '../../types/map';
import useMap from '../../hooks/use-map/use-map';


type MapProps = {
  location: Location;
  className: string;
}


const currentCustomIcon = new Icon({
  iconUrl: '/../../img/svg/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39]
});

function Map({ location, className}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, location);

  useEffect(() => {
    if (map) {
      map.setView([location.latitude, location.longitude], location.zoom);
      const markerLayer = layerGroup().addTo(map);

      const marker = new Marker({
        lat: location.latitude,
        lng: location.longitude,
      });

      marker
        .setIcon(currentCustomIcon)
        .addTo(markerLayer);

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, location]);

  return (
    <section className={`${className}__map map`} ref={mapRef} ></section>
  );
}

export default Map;
