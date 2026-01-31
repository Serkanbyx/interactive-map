import { Routes, Route, Navigate } from 'react-router-dom';
import { MapPage } from '@/pages/MapPage';
import { PinDetailPage } from '@/pages/PinDetailPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { Footer } from '@/components/ui';

/**
 * Main application component
 * Defines the routing structure for the application
 */
function App() {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <Routes>
        {/* Redirect root to map */}
        <Route path="/" element={<Navigate to="/map" replace />} />
        
        {/* Main map view */}
        <Route path="/map" element={<MapPage />} />
        
        {/* Pin detail view */}
        <Route path="/pin/:id" element={<PinDetailPage />} />
        
        {/* 404 fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      
      {/* Author signature */}
      <Footer />
    </div>
  );
}

export default App;
