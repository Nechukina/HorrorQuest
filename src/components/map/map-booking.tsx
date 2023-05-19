import { Icon, Marker, layerGroup } from 'leaflet';
import { useCallback, useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map/use-map';
import { BookingQuest } from '../../types/booking-data';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getBookingQuests, getCurrentQuest } from '../../store/booking-data/booking-data.selectors';
import { changeCurrentPlace } from '../../store/booking-data/booking-data.slice';

const currentCustomIcon = new Icon({
  iconUrl: './img/svg/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],

});

const defaultCustomIcon = new Icon({
  iconUrl: './img/svg/pin-default.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39]
});

// const ZOOM = 10;

function MapBooking(): JSX.Element {
  let currentQuestPlace = useAppSelector(getCurrentQuest);
  const questPlaces = useAppSelector(getBookingQuests);

  const dispatch = useAppDispatch();
  const mapRef = useRef(null);

  if (!currentQuestPlace) {
    currentQuestPlace = questPlaces[0];
  }
  const map = useMap(mapRef, [currentQuestPlace.location.coords[0],currentQuestPlace.location.coords[1]]);

  const handleMarkerClick = useCallback((questPlace: BookingQuest): void => {
    dispatch(changeCurrentPlace(questPlace));
  }, [dispatch]);
  // useEffect(() => {
  //   if (map) {
  //     map.setView([location[0], location[1]], ZOOM);
  //     const markerLayer = layerGroup().addTo(map);

  //     if (quests) {
  //       quests.forEach((quest) => {
  //         const marker = new Marker({
  //           lat: quest.location.coords[0],
  //           lng: quest.location.coords[1],
  //         });
  //         marker
  //           .setIcon(
  //             selectedQuestId && quest.id === selectedQuestId
  //               ? currentCustomIcon
  //               : defaultCustomIcon
  //           )
  //           .addTo(markerLayer);
  //       });
  //     }

  //     return () => {
  //       map.removeLayer(markerLayer);
  //     };
  //   }
  // }, [map, location, quests, selectedQuestId]);

  useEffect(() => {
    if (map && currentQuestPlace) {
      map.setView(currentQuestPlace.location.coords);
      const markerLayer = layerGroup().addTo(map);
      questPlaces.forEach((questPlace) => {
        const marker = new Marker({
          lat: questPlace.location.coords[0],
          lng: questPlace.location.coords[1]
        });

        marker.setIcon(
          currentQuestPlace && questPlace.location.address === currentQuestPlace.location.address
            ? currentCustomIcon
            : defaultCustomIcon
        ).on('click', () => handleMarkerClick(questPlace))
          .addTo(markerLayer);
      });
      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, questPlaces, currentQuestPlace, handleMarkerClick]);

  return (
    <div className="booking-map">
      <div className="map">
        <div className="map__container" ref={mapRef}></div>
      </div>
      <p className="booking-map__address">Вы&nbsp;выбрали: {currentQuestPlace.location.address}</p>
    </div>
  );
}

export default MapBooking;
