import { Link } from 'react-router-dom';
import { MapPin, Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';

/**
 * 404 Not Found page
 */
export function NotFoundPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center">
        <div className="relative mb-6">
          <MapPin className="w-24 h-24 text-gray-200 mx-auto" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-gray-400">
            ?
          </span>
        </div>
        
        <h1 className="text-6xl font-bold text-gray-300 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-md">
          Looks like you've wandered off the map. The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link to="/map">
          <Button size="lg">
            <Home className="w-5 h-5" />
            Back to Map
          </Button>
        </Link>
      </div>
    </div>
  );
}
