import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import style from '../styles/MapSelector.module.css';

const markerIcon = new L.Icon({
  iconUrl: '/alfiler.png',
  iconSize: [35, 35],
  iconAnchor: [17, 45]
});

type MapSelectorProps = {
  onLocationSelect: (lat: number, lng: number) => void;
  initialPosition?: [number, number];
};

function LocationMarker({ onLocationSelect, initialPosition }: any) {
  const [position, setPosition] = useState(initialPosition || [13.69294, -89.218191]);

  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    }
  });

  return <Marker position={position} icon={markerIcon} draggable={true}
    eventHandlers={{
      dragend: (e) => {
        const marker = e.target;
        const pos = marker.getLatLng();
        setPosition([pos.lat, pos.lng]);
        onLocationSelect(pos.lat, pos.lng);
      }
    }} />;
}

export default function MapSelector({ onLocationSelect, initialPosition }: MapSelectorProps) {
  return (
    <MapContainer
      center={initialPosition || [13.69294, -89.218191]}
      zoom={16}
      scrollWheelZoom={true}
      className={style.mapContainer}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.carto.com/">CARTO</a>'
        subdomains="abcd"
        maxZoom={19}
      />
      <LocationMarker onLocationSelect={onLocationSelect} initialPosition={initialPosition} />
    </MapContainer>
  );
}
