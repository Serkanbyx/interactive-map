import { useEffect, useState } from 'react';
import { Polyline, Marker, useMap } from 'react-leaflet';
import { usePinStore } from '@/store/pinStore';
import { decodePolyline } from '@/services/mapbox.service';
import { createRouteEndpointIcon } from './MarkerIcons';
import type { Coordinates } from '@/types';

/**
 * Component to render route line on the map
 */
export function RouteLine() {
  const map = useMap();
  const { routeData } = usePinStore();
  const [routeCoords, setRouteCoords] = useState<Coordinates[]>([]);

  // Decode polyline when route data changes
  useEffect(() => {
    if (routeData?.geometry) {
      const decoded = decodePolyline(routeData.geometry);
      setRouteCoords(decoded);

      // Fit map bounds to show entire route
      if (decoded.length > 0) {
        const bounds = decoded.map(coord => [coord.lat, coord.lng] as [number, number]);
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    } else {
      setRouteCoords([]);
    }
  }, [routeData, map]);

  if (!routeData || routeCoords.length === 0) {
    return null;
  }

  const originIcon = createRouteEndpointIcon('origin');
  const destinationIcon = createRouteEndpointIcon('destination');

  return (
    <>
      {/* Route line */}
      <Polyline
        positions={routeCoords.map(c => [c.lat, c.lng])}
        pathOptions={{
          color: '#3b82f6',
          weight: 5,
          opacity: 0.8,
          lineCap: 'round',
          lineJoin: 'round',
        }}
      />

      {/* Route line shadow for depth */}
      <Polyline
        positions={routeCoords.map(c => [c.lat, c.lng])}
        pathOptions={{
          color: '#1e40af',
          weight: 8,
          opacity: 0.3,
          lineCap: 'round',
          lineJoin: 'round',
        }}
      />

      {/* Origin marker */}
      <Marker
        position={[routeData.origin.coordinates.lat, routeData.origin.coordinates.lng]}
        icon={originIcon}
      />

      {/* Destination marker */}
      <Marker
        position={[routeData.destination.coordinates.lat, routeData.destination.coordinates.lng]}
        icon={destinationIcon}
      />
    </>
  );
}
