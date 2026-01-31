import { Marker } from 'react-leaflet';
import { usePinStore } from '@/store/pinStore';
import { createTempMarkerIcon } from './MarkerIcons';

/**
 * Temporary marker shown when adding a new pin
 */
export function TempMarker() {
  const { pendingCoordinates } = usePinStore();

  if (!pendingCoordinates) {
    return null;
  }

  const icon = createTempMarkerIcon();

  return (
    <Marker
      position={[pendingCoordinates.lat, pendingCoordinates.lng]}
      icon={icon}
    />
  );
}
