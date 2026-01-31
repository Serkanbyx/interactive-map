import { useState } from 'react';
import { X, Navigation, Clock, MapPin, Car, Footprints, Bike, AlertCircle } from 'lucide-react';
import { usePinStore } from '@/store/pinStore';
import { getDirections, isMapboxConfigured, type RouteProfile } from '@/services/mapbox.service';
import { formatDistance, formatDuration } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import type { Pin } from '@/types';

export interface RoutePanelProps {
  onClose: () => void;
}

/**
 * Route planning panel for getting directions between pins
 */
export function RoutePanel({ onClose }: RoutePanelProps) {
  const { pins, routeData, setRouteData, clearRoute } = usePinStore();
  
  const [origin, setOrigin] = useState<Pin | null>(null);
  const [destination, setDestination] = useState<Pin | null>(null);
  const [profile, setProfile] = useState<RouteProfile>('driving');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isConfigured = isMapboxConfigured();

  const handleGetDirections = async () => {
    if (!origin || !destination) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const route = await getDirections(
        origin.coordinates,
        destination.coordinates,
        profile
      );
      
      if (route) {
        setRouteData(route);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get directions');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearRoute = () => {
    clearRoute();
    setOrigin(null);
    setDestination(null);
    setError(null);
  };

  const profiles: { id: RouteProfile; label: string; icon: typeof Car }[] = [
    { id: 'driving', label: 'Drive', icon: Car },
    { id: 'walking', label: 'Walk', icon: Footprints },
    { id: 'cycling', label: 'Bike', icon: Bike },
  ];

  return (
    <div className="absolute bottom-4 left-4 z-30 w-80 bg-white rounded-xl shadow-popup animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Navigation className="w-5 h-5 text-primary-600" />
          <h3 className="font-semibold text-gray-900">Get Directions</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {!isConfigured && (
          <div className="flex items-start gap-2 p-3 bg-yellow-50 text-yellow-800 rounded-lg text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Mapbox not configured</p>
              <p className="text-yellow-700 text-xs mt-0.5">
                Add VITE_MAPBOX_ACCESS_TOKEN to your .env file to enable routing.
              </p>
            </div>
          </div>
        )}

        {/* Origin */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            From
          </label>
          <select
            value={origin?.id || ''}
            onChange={(e) => setOrigin(pins.find(p => p.id === e.target.value) || null)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            disabled={!isConfigured}
          >
            <option value="">Select starting point</option>
            {pins.map((pin) => (
              <option key={pin.id} value={pin.id} disabled={pin.id === destination?.id}>
                {pin.title}
              </option>
            ))}
          </select>
        </div>

        {/* Destination */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            To
          </label>
          <select
            value={destination?.id || ''}
            onChange={(e) => setDestination(pins.find(p => p.id === e.target.value) || null)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            disabled={!isConfigured}
          >
            <option value="">Select destination</option>
            {pins.map((pin) => (
              <option key={pin.id} value={pin.id} disabled={pin.id === origin?.id}>
                {pin.title}
              </option>
            ))}
          </select>
        </div>

        {/* Travel mode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Travel Mode
          </label>
          <div className="flex gap-2">
            {profiles.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setProfile(id)}
                disabled={!isConfigured}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  profile === id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Route info */}
        {routeData && (
          <div className="p-3 bg-primary-50 rounded-lg space-y-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-primary-700">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {formatDistance(routeData.distance)}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-primary-700">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {formatDuration(routeData.duration)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          {routeData ? (
            <Button variant="secondary" className="flex-1" onClick={handleClearRoute}>
              Clear Route
            </Button>
          ) : (
            <Button
              className="flex-1"
              onClick={handleGetDirections}
              disabled={!origin || !destination || !isConfigured}
              isLoading={isLoading}
            >
              <Navigation className="w-4 h-4" />
              Get Directions
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
