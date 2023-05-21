import { Marker, layerGroup } from 'leaflet';
import { useCallback, useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import { BOOKING_ZOOM, activeCustomIcon, defaultCustomIcon } from '../../const';
import { BookingQuest } from '../../types/booking';
import { changeCurrentPlace } from '../../store/booking/booking.slice';
import { getBookingQuests, getCurrentQuest } from '../../store/booking/booking.selectors';
import { useAppDispatch, useAppSelector } from '../../hooks';
import useMap from '../../hooks/use-map/use-map';


function MapBooking(): JSX.Element {
  let currentQuest = useAppSelector(getCurrentQuest);
  const questPlaces = useAppSelector(getBookingQuests);
  const dispatch = useAppDispatch();
  const mapRef = useRef(null);

  if (!currentQuest) {
    currentQuest = questPlaces[0];
  }

  const map = useMap(mapRef, [currentQuest.location.coords[0],currentQuest.location.coords[1]], BOOKING_ZOOM);

  const handleMarkerClick = useCallback((questPlace: BookingQuest): void => {
    dispatch(changeCurrentPlace(questPlace));
  }, [dispatch]);


  useEffect(() => {
    if (map && currentQuest) {
      map.setView(currentQuest.location.coords);
      const markerLayer = layerGroup().addTo(map);
      questPlaces.forEach((questPlace) => {
        const marker = new Marker({
          lat: questPlace.location.coords[0],
          lng: questPlace.location.coords[1]
        });

        marker.setIcon(
          currentQuest && questPlace.location.address === currentQuest.location.address
            ? activeCustomIcon
            : defaultCustomIcon
        ).on('click', () => handleMarkerClick(questPlace))
          .addTo(markerLayer);
      });
      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, questPlaces, currentQuest, handleMarkerClick]);

  return (
    <div className="booking-map">
      <div className="map">
        <div className="map__container" ref={mapRef}></div>
      </div>
      <p className="booking-map__address">Вы&nbsp;выбрали: {currentQuest.location.address}</p>
    </div>
  );
}

export default MapBooking;
