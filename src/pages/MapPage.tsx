import { useCallback, useEffect, useState } from 'react';
import { Map } from '@/components/map/Map';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { PinForm } from '@/components/pin/PinForm';
import { RoutePanel } from '@/components/route/RoutePanel';
import { MobileNav } from '@/components/layout/MobileNav';
import { usePinStore } from '@/store/pinStore';
import { cn } from '@/lib/utils';

/**
 * Main map page component
 * Contains the map, sidebar, and all interactive elements
 */
export function MapPage() {
  const { 
    isSidebarOpen, 
    isAddingPin, 
    pendingCoordinates,
    setIsAddingPin,
    setPendingCoordinates,
    routeData,
  } = usePinStore();

  const [showRoutePanel, setShowRoutePanel] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle form submission success
  const handlePinFormSuccess = useCallback(() => {
    setIsAddingPin(false);
    setPendingCoordinates(null);
  }, [setIsAddingPin, setPendingCoordinates]);

  // Handle form cancel
  const handlePinFormCancel = useCallback(() => {
    setIsAddingPin(false);
    setPendingCoordinates(null);
  }, [setIsAddingPin, setPendingCoordinates]);

  // Show route panel when route data exists
  useEffect(() => {
    if (routeData) {
      setShowRoutePanel(true);
    }
  }, [routeData]);

  return (
    <div className="relative h-full w-full flex">
      {/* Sidebar - Hidden on mobile when not open */}
      <div
        className={cn(
          'absolute md:relative z-20 h-full transition-transform duration-300 ease-in-out',
          isMobile && !isSidebarOpen && '-translate-x-full',
          isMobile && isSidebarOpen && 'translate-x-0',
          !isMobile && isSidebarOpen && 'w-96',
          !isMobile && !isSidebarOpen && 'w-0'
        )}
      >
        {isSidebarOpen && <Sidebar onStartRoute={() => setShowRoutePanel(true)} />}
      </div>

      {/* Main map area */}
      <div className="flex-1 relative">
        <Map />

        {/* Mobile navigation */}
        {isMobile && <MobileNav />}

        {/* Adding pin mode indicator */}
        {isAddingPin && !pendingCoordinates && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30">
            <div className="bg-primary-600 text-white px-4 py-2 rounded-lg shadow-lg animate-pulse-marker">
              Click on the map to place a pin
            </div>
          </div>
        )}

        {/* Pin form modal */}
        {pendingCoordinates && (
          <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="w-full max-w-md mx-4 animate-slide-up">
              <PinForm
                coordinates={pendingCoordinates}
                onSuccess={handlePinFormSuccess}
                onCancel={handlePinFormCancel}
              />
            </div>
          </div>
        )}

        {/* Route panel */}
        {showRoutePanel && (
          <RoutePanel onClose={() => setShowRoutePanel(false)} />
        )}
      </div>

      {/* Overlay for mobile sidebar */}
      {isMobile && isSidebarOpen && (
        <div
          className="absolute inset-0 z-10 bg-black/20"
          onClick={() => usePinStore.getState().setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
