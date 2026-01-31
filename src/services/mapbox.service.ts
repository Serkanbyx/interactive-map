import polyline from '@mapbox/polyline';
import type { Coordinates, RouteData, RouteStep } from '@/types';

/**
 * Mapbox API configuration
 */
const MAPBOX_BASE_URL = 'https://api.mapbox.com/directions/v5/mapbox';

/**
 * Get Mapbox access token from environment
 */
const getAccessToken = (): string => {
  const token = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
  if (!token || token === 'your_mapbox_token_here') {
    console.warn('Mapbox access token not configured. Route features will be disabled.');
    return '';
  }
  return token;
};

/**
 * Route profile types
 */
export type RouteProfile = 'driving' | 'walking' | 'cycling' | 'driving-traffic';

/**
 * Mapbox Directions API response types
 */
interface MapboxRoute {
  geometry: string;
  distance: number;
  duration: number;
  legs: MapboxLeg[];
}

interface MapboxLeg {
  steps: MapboxStep[];
  distance: number;
  duration: number;
}

interface MapboxStep {
  maneuver: {
    instruction: string;
    location: [number, number];
  };
  distance: number;
  duration: number;
}

interface MapboxDirectionsResponse {
  routes: MapboxRoute[];
  code: string;
  message?: string;
}

/**
 * Fetch route directions from Mapbox API
 */
export async function getDirections(
  origin: Coordinates,
  destination: Coordinates,
  profile: RouteProfile = 'driving'
): Promise<RouteData | null> {
  const accessToken = getAccessToken();
  
  if (!accessToken) {
    throw new Error('Mapbox access token is not configured');
  }

  const coordinates = `${origin.lng},${origin.lat};${destination.lng},${destination.lat}`;
  const url = `${MAPBOX_BASE_URL}/${profile}/${coordinates}`;
  
  const params = new URLSearchParams({
    access_token: accessToken,
    geometries: 'polyline',
    overview: 'full',
    steps: 'true',
    language: 'en',
  });

  try {
    const response = await fetch(`${url}?${params}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data: MapboxDirectionsResponse = await response.json();

    if (data.code !== 'Ok' || !data.routes.length) {
      throw new Error(data.message || 'No route found');
    }

    const route = data.routes[0];
    const steps: RouteStep[] = route.legs.flatMap((leg) =>
      leg.steps.map((step) => ({
        instruction: step.maneuver.instruction,
        distance: step.distance,
        duration: step.duration,
        coordinates: {
          lat: step.maneuver.location[1],
          lng: step.maneuver.location[0],
        },
      }))
    );

    return {
      origin: { coordinates: origin },
      destination: { coordinates: destination },
      distance: route.distance,
      duration: route.duration,
      geometry: route.geometry,
      steps,
    };
  } catch (error) {
    console.error('Error fetching directions:', error);
    throw error;
  }
}

/**
 * Decode polyline geometry to coordinates array
 */
export function decodePolyline(encodedPolyline: string): Coordinates[] {
  const decoded = polyline.decode(encodedPolyline);
  return decoded.map(([lat, lng]) => ({ lat, lng }));
}

/**
 * Check if Mapbox is properly configured
 */
export function isMapboxConfigured(): boolean {
  const token = getAccessToken();
  return !!token && token !== 'your_mapbox_token_here';
}

/**
 * Reverse geocoding - get address from coordinates
 */
export async function reverseGeocode(
  coordinates: Coordinates
): Promise<string | null> {
  const accessToken = getAccessToken();
  
  if (!accessToken) {
    return null;
  }

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates.lng},${coordinates.lat}.json`;
  
  const params = new URLSearchParams({
    access_token: accessToken,
    limit: '1',
  });

  try {
    const response = await fetch(`${url}?${params}`);
    
    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    
    if (data.features && data.features.length > 0) {
      return data.features[0].place_name;
    }
    
    return null;
  } catch (error) {
    console.error('Error reverse geocoding:', error);
    return null;
  }
}
