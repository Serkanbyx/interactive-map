import { useMap } from 'react-leaflet';
import { Locate, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

/**
 * Custom map control buttons
 */
export function MapControls() {
  const map = useMap();
  const [isLocating, setIsLocating] = useState(false);

  // Handle locate user
  const handleLocate = () => {
    setIsLocating(true);
    
    map.locate({ setView: true, maxZoom: 16 });
    
    map.once('locationfound', () => {
      setIsLocating(false);
    });

    map.once('locationerror', () => {
      setIsLocating(false);
      alert('Unable to find your location. Please enable location services.');
    });
  };

  // Handle reset view
  const handleResetView = () => {
    map.setView([40.7580, -73.9855], 13);
  };

  return (
    <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
      {/* Locate me button */}
      <ControlButton
        onClick={handleLocate}
        title="Find my location"
        isLoading={isLocating}
      >
        <Locate className={cn('w-5 h-5', isLocating && 'animate-pulse')} />
      </ControlButton>

      {/* Reset view button */}
      <ControlButton onClick={handleResetView} title="Reset view">
        <Layers className="w-5 h-5" />
      </ControlButton>
    </div>
  );
}

interface ControlButtonProps {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
  isLoading?: boolean;
}

function ControlButton({ onClick, title, children, isLoading }: ControlButtonProps) {
  return (
    <button
      onClick={onClick}
      title={title}
      disabled={isLoading}
      className={cn(
        'w-10 h-10 bg-white rounded-lg shadow-md border border-gray-200',
        'flex items-center justify-center text-gray-600',
        'hover:bg-gray-50 hover:text-gray-900 transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed'
      )}
    >
      {children}
    </button>
  );
}
