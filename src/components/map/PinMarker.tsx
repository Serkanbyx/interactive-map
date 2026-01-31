import { useMemo } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { Star, Navigation, ExternalLink } from 'lucide-react';
import { usePinStore } from '@/store/pinStore';
import { createCategoryIcon } from './MarkerIcons';
import { CategoryIcon } from '@/components/ui/CategoryIcon';
import { Button } from '@/components/ui/Button';
import { getCategoryMeta, type Pin } from '@/types';
import { truncate } from '@/lib/utils';

export interface PinMarkerProps {
  pin: Pin;
}

/**
 * Individual pin marker component with popup
 */
export function PinMarker({ pin }: PinMarkerProps) {
  const navigate = useNavigate();
  const { selectedPin, selectPin } = usePinStore();
  
  const isSelected = selectedPin?.id === pin.id;
  const categoryMeta = getCategoryMeta(pin.category);

  // Create the marker icon
  const icon = useMemo(
    () => createCategoryIcon(pin.category, isSelected),
    [pin.category, isSelected]
  );

  // Handle marker click
  const handleClick = () => {
    selectPin(pin);
  };

  // Navigate to pin detail page
  const handleViewDetails = () => {
    navigate(`/pin/${pin.id}`);
  };

  return (
    <Marker
      position={[pin.coordinates.lat, pin.coordinates.lng]}
      icon={icon}
      eventHandlers={{
        click: handleClick,
      }}
    >
      <Popup>
        <div className="min-w-[260px]">
          {/* Header with category */}
          <div className="p-4 border-b border-gray-100">
            <div 
              className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium mb-2"
              style={{ 
                backgroundColor: `${categoryMeta.color}15`,
                color: categoryMeta.color 
              }}
            >
              <CategoryIcon category={pin.category} size={12} />
              {categoryMeta.label}
            </div>
            
            <h3 className="text-base font-semibold text-gray-900 mb-1">
              {pin.title}
            </h3>
            
            {pin.rating && (
              <div className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-medium text-gray-700">{pin.rating}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="p-4 border-b border-gray-100">
            <p className="text-sm text-gray-600 leading-relaxed">
              {truncate(pin.description, 120)}
            </p>
          </div>

          {/* Actions */}
          <div className="p-3 flex gap-2">
            <Button 
              variant="secondary" 
              size="sm" 
              className="flex-1"
              onClick={handleViewDetails}
            >
              <ExternalLink className="w-4 h-4" />
              Details
            </Button>
            <Button 
              size="sm" 
              className="flex-1"
              onClick={handleViewDetails}
            >
              <Navigation className="w-4 h-4" />
              Directions
            </Button>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
