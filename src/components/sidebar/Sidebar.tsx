import { Plus, X, Route } from 'lucide-react';
import { usePinStore } from '@/store/pinStore';
import { SearchInput } from '@/components/ui/SearchInput';
import { Button } from '@/components/ui/Button';
import { CategoryFilter } from './CategoryFilter';
import { PinList } from './PinList';

export interface SidebarProps {
  onStartRoute: () => void;
}

/**
 * Main sidebar component containing search, filters, and pin list
 */
export function Sidebar({ onStartRoute }: SidebarProps) {
  const { 
    filters, 
    setSearchQuery, 
    isAddingPin, 
    setIsAddingPin,
    setSidebarOpen,
    getFilteredPins,
  } = usePinStore();

  const filteredPins = getFilteredPins();

  const handleAddPin = () => {
    setIsAddingPin(true);
  };

  const handleCancelAdd = () => {
    setIsAddingPin(false);
  };

  return (
    <div className="h-full w-96 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-900">
            Interactive Map
          </h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors md:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <SearchInput
          value={filters.searchQuery}
          onChange={setSearchQuery}
          placeholder="Search pins..."
          className="mb-4"
        />

        {/* Actions */}
        <div className="flex gap-2">
          {isAddingPin ? (
            <Button variant="secondary" className="flex-1" onClick={handleCancelAdd}>
              <X className="w-4 h-4" />
              Cancel
            </Button>
          ) : (
            <Button className="flex-1" onClick={handleAddPin}>
              <Plus className="w-4 h-4" />
              Add Pin
            </Button>
          )}
          <Button variant="outline" onClick={onStartRoute}>
            <Route className="w-4 h-4" />
            Route
          </Button>
        </div>
      </div>

      {/* Category filters */}
      <div className="px-4 py-3 border-b border-gray-100">
        <CategoryFilter />
      </div>

      {/* Pin list */}
      <div className="flex-1 overflow-hidden">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-700">
              Pins
            </h2>
            <span className="text-xs text-gray-400">
              {filteredPins.length} {filteredPins.length === 1 ? 'result' : 'results'}
            </span>
          </div>
        </div>
        <PinList />
      </div>

      {/* Adding pin mode indicator */}
      {isAddingPin && (
        <div className="p-4 bg-primary-50 border-t border-primary-100">
          <p className="text-sm text-primary-700 text-center">
            Click on the map to place your pin
          </p>
        </div>
      )}
    </div>
  );
}
