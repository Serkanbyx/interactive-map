import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { 
  Utensils, 
  Bed, 
  Landmark, 
  ShoppingBag, 
  Train, 
  MapPin 
} from 'lucide-react';
import type { PinCategory } from '@/types';
import { getCategoryMeta } from '@/types';

/**
 * Create a custom Leaflet divIcon for a category
 */
export function createCategoryIcon(category: PinCategory, isSelected = false): L.DivIcon {
  const meta = getCategoryMeta(category);
  
  // Get the icon component based on category
  const IconComponent = {
    restaurant: Utensils,
    hotel: Bed,
    attraction: Landmark,
    shopping: ShoppingBag,
    transport: Train,
    other: MapPin,
  }[category] || MapPin;

  // Render icon to string
  const iconMarkup = renderToStaticMarkup(
    <IconComponent size={18} color="white" strokeWidth={2.5} />
  );

  // Create the marker HTML
  const markerHtml = `
    <div class="relative flex items-center justify-center">
      <div 
        class="w-10 h-10 rounded-full shadow-lg border-2 border-white flex items-center justify-center transition-transform ${isSelected ? 'scale-125 ring-4 ring-primary-500/30' : ''}"
        style="background-color: ${meta.color};"
      >
        ${iconMarkup}
      </div>
      <div 
        class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
        style="background-color: ${meta.color};"
      ></div>
    </div>
  `;

  return L.divIcon({
    html: markerHtml,
    className: 'custom-marker-wrapper',
    iconSize: [40, 48],
    iconAnchor: [20, 48],
    popupAnchor: [0, -48],
  });
}

/**
 * Create a location marker (for user location or route points)
 */
export function createLocationIcon(color = '#3b82f6'): L.DivIcon {
  const markerHtml = `
    <div class="relative flex items-center justify-center">
      <div class="w-4 h-4 rounded-full bg-white shadow-lg flex items-center justify-center">
        <div class="w-3 h-3 rounded-full" style="background-color: ${color};"></div>
      </div>
      <div class="absolute w-8 h-8 rounded-full animate-ping opacity-30" style="background-color: ${color};"></div>
    </div>
  `;

  return L.divIcon({
    html: markerHtml,
    className: 'location-marker-wrapper',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
}

/**
 * Create a route endpoint marker
 */
export function createRouteEndpointIcon(type: 'origin' | 'destination'): L.DivIcon {
  const color = type === 'origin' ? '#10b981' : '#ef4444';
  const label = type === 'origin' ? 'A' : 'B';

  const markerHtml = `
    <div class="relative flex items-center justify-center">
      <div 
        class="w-8 h-8 rounded-full shadow-lg border-2 border-white flex items-center justify-center font-bold text-white text-sm"
        style="background-color: ${color};"
      >
        ${label}
      </div>
    </div>
  `;

  return L.divIcon({
    html: markerHtml,
    className: 'route-endpoint-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
}

/**
 * Create a temporary marker for pin placement
 */
export function createTempMarkerIcon(): L.DivIcon {
  const markerHtml = `
    <div class="relative flex items-center justify-center animate-bounce">
      <div class="w-10 h-10 rounded-full bg-primary-500 shadow-lg border-2 border-white flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </div>
      <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-primary-500"></div>
    </div>
  `;

  return L.divIcon({
    html: markerHtml,
    className: 'temp-marker-wrapper',
    iconSize: [40, 48],
    iconAnchor: [20, 48],
  });
}
