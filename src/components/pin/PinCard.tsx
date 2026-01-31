import { useNavigate } from 'react-router-dom';
import { Star, Navigation, ExternalLink } from 'lucide-react';
import { usePinStore } from '@/store/pinStore';
import { getCategoryMeta, type Pin } from '@/types';
import { CategoryIcon } from '@/components/ui/CategoryIcon';
import { truncate } from '@/lib/utils';
import { cn } from '@/lib/utils';

export interface PinCardProps {
  pin: Pin;
}

/**
 * Card component for displaying a pin in the sidebar list
 */
export function PinCard({ pin }: PinCardProps) {
  const navigate = useNavigate();
  const { selectedPin, selectPin } = usePinStore();
  
  const isSelected = selectedPin?.id === pin.id;
  const categoryMeta = getCategoryMeta(pin.category);

  const handleClick = () => {
    selectPin(pin);
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/pin/${pin.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        'p-4 rounded-xl cursor-pointer transition-all duration-200',
        'border hover:shadow-card-hover',
        isSelected 
          ? 'border-primary-500 bg-primary-50/50 shadow-card' 
          : 'border-gray-100 bg-white hover:border-gray-200'
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div 
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0"
          style={{ backgroundColor: categoryMeta.color }}
        >
          <CategoryIcon category={pin.category} size={16} />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{pin.title}</h3>
          <p className="text-xs text-gray-500">{categoryMeta.label}</p>
        </div>

        {pin.rating && (
          <div className="flex items-center gap-0.5 text-sm shrink-0">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="font-medium text-gray-700">{pin.rating}</span>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed mb-3">
        {truncate(pin.description, 80)}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        {pin.address && (
          <p className="text-xs text-gray-400 truncate max-w-[60%]">
            {pin.address}
          </p>
        )}
        
        <div className="flex gap-1 ml-auto">
          <button
            onClick={handleViewDetails}
            className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            title="View details"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
          <button
            onClick={handleViewDetails}
            className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            title="Get directions"
          >
            <Navigation className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
