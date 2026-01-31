import { useCallback } from 'react';
import { useMapEvents as useLeafletMapEvents } from 'react-leaflet';
import { usePinStore } from '@/store/pinStore';
import type { Coordinates } from '@/types';

/**
 * Custom hook to handle map click events
 * Used for adding new pins by clicking on the map
 */
export function useMapClickHandler() {
  const { isAddingPin, setPendingCoordinates } = usePinStore();

  useLeafletMapEvents({
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

/**
 * Hook to handle map view changes
 */
export function useMapViewState() {
  const map = useLeafletMapEvents({
    moveend: () => {
      const center = map.getCenter();
      const zoom = map.getZoom();
      // Could store view state if needed for persistence
      console.debug('Map view changed:', { center, zoom });
    },
  });

  return null;
}

/**
 * Hook to programmatically control map
 */
export function useMapControl() {
  const flyTo = useCallback(
    (coordinates: Coordinates, zoom?: number) => {
      // This will be used from parent components
      return { coordinates, zoom };
    },
    []
  );

  const fitBounds = useCallback(
    (coordinates: Coordinates[]) => {
      return coordinates;
    },
    []
  );

  return { flyTo, fitBounds };
}
