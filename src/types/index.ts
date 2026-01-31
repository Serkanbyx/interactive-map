/**
 * Pin category types for categorizing map markers
 */
export type PinCategory = 
  | 'restaurant'
  | 'hotel'
  | 'attraction'
  | 'shopping'
  | 'transport'
  | 'other';

/**
 * Geographic coordinates
 */
export interface Coordinates {
  lat: number;
  lng: number;
}

/**
 * Pin/Marker data structure
 */
export interface Pin {
  id: string;
  title: string;
  description: string;
  category: PinCategory;
  coordinates: Coordinates;
  address?: string;
  imageUrl?: string;
  rating?: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Form data for creating/updating a pin
 */
export interface PinFormData {
  title: string;
  description: string;
  category: PinCategory;
  lat: number;
  lng: number;
  address?: string;
  imageUrl?: string;
}

/**
 * Filter state for pin filtering
 */
export interface FilterState {
  categories: PinCategory[];
  searchQuery: string;
}

/**
 * Route waypoint for directions
 */
export interface RouteWaypoint {
  coordinates: Coordinates;
  name?: string;
}

/**
 * Route data from Mapbox Directions API
 */
export interface RouteData {
  origin: RouteWaypoint;
  destination: RouteWaypoint;
  distance: number; // in meters
  duration: number; // in seconds
  geometry: string; // encoded polyline
  steps: RouteStep[];
}

/**
 * Single step in route directions
 */
export interface RouteStep {
  instruction: string;
  distance: number;
  duration: number;
  coordinates: Coordinates;
}

/**
 * Map view state
 */
export interface MapViewState {
  center: Coordinates;
  zoom: number;
}

/**
 * Category metadata for UI display
 */
export interface CategoryMeta {
  id: PinCategory;
  label: string;
  color: string;
  icon: string;
}

/**
 * Category metadata configuration
 */
export const CATEGORIES: CategoryMeta[] = [
  { id: 'restaurant', label: 'Restaurant', color: '#ef4444', icon: 'utensils' },
  { id: 'hotel', label: 'Hotel', color: '#8b5cf6', icon: 'bed' },
  { id: 'attraction', label: 'Attraction', color: '#f59e0b', icon: 'landmark' },
  { id: 'shopping', label: 'Shopping', color: '#10b981', icon: 'shopping-bag' },
  { id: 'transport', label: 'Transport', color: '#6366f1', icon: 'train' },
  { id: 'other', label: 'Other', color: '#6b7280', icon: 'map-pin' },
];

/**
 * Get category metadata by ID
 */
export const getCategoryMeta = (category: PinCategory): CategoryMeta => {
  return CATEGORIES.find(c => c.id === category) || CATEGORIES[5];
};
