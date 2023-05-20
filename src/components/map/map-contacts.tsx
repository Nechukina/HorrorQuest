import { useEffect, useRef } from 'react';
import { Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { defaultCustomIcon, ContactsLocation, CONTACTS_ZOOM } from '../../const';
import useMap from '../../hooks/use-map/use-map';

function MapContacts(): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, [ContactsLocation.lat, ContactsLocation.lng], CONTACTS_ZOOM);

  useEffect(() => {
    if (map) {
      const marker = new Marker({
        lat: ContactsLocation.lat,
        lng: ContactsLocation.lng
      });

      marker.setIcon(defaultCustomIcon).addTo(map);
    }
  }, [map]);

  return (
    <div className="map">
      <div className="map__container" ref={mapRef}></div>
    </div>
  );
}

export default MapContacts;
