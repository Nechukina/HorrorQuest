import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { ContactsLocation } from '../../const';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
// import iconMarker from 'leaflet/dist/images/marker-icon.png';
// import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// L.Icon.Default.mergeOptions({
//   iconUrl: iconMarker,
//   shadowUrl: iconShadow,
// });


const markerIcon = new L.Icon({
  iconUrl: './pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39]
});
function MapReact(): JSX.Element {
  return (
    <MapContainer className="map__container" center={ContactsLocation} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={ContactsLocation} icon={markerIcon}>
        <Popup>
        Санкт-Петербург,<br/> Набережная реки Карповка, д 5П
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapReact;
