import { useMapEvents } from 'react-leaflet';
import { usePinStore } from '@/store/pinStore';
import type { Coordinates } from '@/types';

/**
 * Component to handle map click events for adding pins
 */
export function MapClickHandler() {
  const { isAddingPin, setPendingCoordinates } = usePinStore();

  useMapEvents({
    click: (e) => {
      if (isAddingPin) {
        const coordinates: Coordinates = {
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        };
        setPendingCoordinates(coordinates);
      }
    },
  });

  return null;
}
