import { usePinStore } from '@/store/pinStore';
import { PinCard } from '@/components/pin/PinCard';
import { MapPin } from 'lucide-react';

/**
 * Scrollable list of pin cards
 */
export function PinList() {
  const { getFilteredPins } = usePinStore();
  const filteredPins = getFilteredPins();

  if (filteredPins.length === 0) {
    return (
      <div className="px-4 py-8 text-center">
        <MapPin className="w-12 h-12 text-gray-200 mx-auto mb-3" />
        <p className="text-gray-500 text-sm">No pins found</p>
        <p className="text-gray-400 text-xs mt-1">
          Try adjusting your filters or add a new pin
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 pb-4 space-y-3 overflow-y-auto h-full custom-scrollbar">
      {filteredPins.map((pin) => (
        <PinCard key={pin.id} pin={pin} />
      ))}
    </div>
  );
}
