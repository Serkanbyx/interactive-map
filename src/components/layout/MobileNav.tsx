import { Menu, Plus, MapPin } from 'lucide-react';
import { usePinStore } from '@/store/pinStore';
import { cn } from '@/lib/utils';

/**
 * Mobile navigation bar for small screens
 */
export function MobileNav() {
  const { setSidebarOpen, isAddingPin, setIsAddingPin, pins } = usePinStore();

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 bg-white border-t border-gray-200 p-2 md:hidden">
      <div className="flex items-center justify-around">
        {/* Menu button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className={cn(
            'flex flex-col items-center gap-1 px-4 py-2 rounded-lg',
            'text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors'
          )}
        >
          <Menu className="w-6 h-6" />
          <span className="text-xs">Menu</span>
        </button>

        {/* Add pin button */}
        <button
          onClick={() => setIsAddingPin(!isAddingPin)}
          className={cn(
            'flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors',
            isAddingPin 
              ? 'text-primary-600 bg-primary-50' 
              : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
          )}
        >
          <Plus className="w-6 h-6" />
          <span className="text-xs">{isAddingPin ? 'Adding...' : 'Add Pin'}</span>
        </button>

        {/* Pins count */}
        <button
          onClick={() => setSidebarOpen(true)}
          className={cn(
            'flex flex-col items-center gap-1 px-4 py-2 rounded-lg',
            'text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors'
          )}
        >
          <div className="relative">
            <MapPin className="w-6 h-6" />
            <span className="absolute -top-1 -right-2 bg-primary-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {pins.length}
            </span>
          </div>
          <span className="text-xs">Pins</span>
        </button>
      </div>
    </div>
  );
}
