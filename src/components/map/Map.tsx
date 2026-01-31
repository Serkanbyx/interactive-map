import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, ZoomControl, useMap } from 'react-leaflet';
import { usePinStore } from '@/store/pinStore';
import { MapClickHandler } from './MapClickHandler';
import { PinMarker } from './PinMarker';
import { RouteLine } from './RouteLine';
import { TempMarker } from './TempMarker';
import { MapControls } from './MapControls';

// Default map center (New York City)
const DEFAULT_CENTER: [number, number] = [40.7580, -73.9855];
const DEFAULT_ZOOM = 13;

/**
 * Component to handle flying to selected pin
 */
function FlyToSelectedPin() {
  const map = useMap();
  const { selectedPin } = usePinStore();
  const prevSelectedRef = useRef(selectedPin);

  useEffect(() => {
    if (selectedPin && selectedPin !== prevSelectedRef.current) {
      map.flyTo(
        [selectedPin.coordinates.lat, selectedPin.coordinates.lng],
        15,
        { duration: 0.5 }
      );
    }
    prevSelectedRef.current = selectedPin;
  }, [selectedPin, map]);

  return null;
}

/**
 * Main map component using react-leaflet with OpenStreetMap tiles
 */
export function Map() {
  const { getFilteredPins, isAddingPin } = usePinStore();
  const filteredPins = getFilteredPins();

  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={DEFAULT_ZOOM}
      className="h-full w-full"
      zoomControl={false}
      style={{ cursor: isAddingPin ? 'crosshair' : 'grab' }}
    >
      {/* OpenStreetMap tile layer */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Custom zoom control position */}
      <ZoomControl position="bottomright" />

      {/* Map click handler for adding pins */}
      <MapClickHandler />

      {/* Fly to selected pin */}
      <FlyToSelectedPin />

      {/* Render all filtered pin markers */}
      {filteredPins.map((pin) => (
        <PinMarker key={pin.id} pin={pin} />
      ))}

      {/* Route line overlay */}
      <RouteLine />

      {/* Temporary marker for new pin placement */}
      <TempMarker />

      {/* Map control buttons */}
      <MapControls />
    </MapContainer>
  );
}
