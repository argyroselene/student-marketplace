import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

const center = [23.95,90.38]; // Replace with your campus coordinates

function ClickableMap({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    },
  });
  return null;
}

export default function CampusMap() {
  const [markers, setMarkers] = useState([]);

  const handleMapClick = (latlng) => {
    setMarkers((prev) => [...prev, latlng]);
  };

  return (
    <MapContainer center={center} zoom={16} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ClickableMap onMapClick={handleMapClick} />
      {markers.map((pos, idx) => (
        <Marker key={idx} position={pos} />
      ))}
    </MapContainer>
  );
}
