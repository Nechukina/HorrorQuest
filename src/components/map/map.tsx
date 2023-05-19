import { Icon, Marker, layerGroup } from 'leaflet';
import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map/use-map';
import { BookingQuests } from '../../types/booking-data';


type MapProps = {
  location: [number, number];
  className: string;
  quests?: BookingQuests;
  selectedQuestId?: string;
}


const currentCustomIcon = new Icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],

});

const defaultCustomIcon = new Icon({
  iconUrl: './img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39]
});

function Map({ location, className, quests, selectedQuestId}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, location);

  useEffect(() => {
    if (map) {
      map.setView([location[0], location[1]], 12);
      const markerLayer = layerGroup().addTo(map);

      if (quests) {quests.forEach((quest) => {
        const marker = new Marker({
          lat: quest.location.coords[0],
          lng: quest.location.coords[1],
        });
        marker
          .setIcon(
            selectedQuestId && quest.id === selectedQuestId
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });
      }

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, location, quests, selectedQuestId]);

  return (
    <section className={`${className}__map map`} ref={mapRef} ></section>
  );
}

export default Map;
