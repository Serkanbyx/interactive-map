import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { 
  ArrowLeft, 
  MapPin, 
  Star, 
  Calendar, 
  Navigation,
  Trash2,
  ExternalLink,
  Pencil 
} from 'lucide-react';
import { usePinStore } from '@/store/pinStore';
import { getCategoryMeta } from '@/types';
import { formatDate } from '@/lib/utils';
import { CategoryIcon } from '@/components/ui/CategoryIcon';
import { createCategoryIcon } from '@/components/map/MarkerIcons';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';

/**
 * Pin detail page - shows full information about a specific pin
 */
export function PinDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPinById, deletePin, selectPin, setEditingPin, setRouteDestinationPin } = usePinStore();
  
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const pin = id ? getPinById(id) : undefined;
  const categoryMeta = pin ? getCategoryMeta(pin.category) : null;

  // Set selected pin when viewing details
  useEffect(() => {
    if (pin) {
      selectPin(pin);
    }
    return () => {
      selectPin(null);
    };
  }, [pin, selectPin]);

  // Handle delete
  const handleDelete = () => {
    if (id) {
      deletePin(id);
      navigate('/map');
    }
  };

  // Handle navigation to map with this pin
  const handleShowOnMap = () => {
    if (pin) {
      selectPin(pin);
      navigate('/map');
    }
  };

  // Open the edit form for this pin on the map page
  const handleEdit = () => {
    if (pin) {
      setEditingPin(pin);
      navigate('/map');
    }
  };

  // Start route planning with this pin as the destination
  const handleGetDirections = () => {
    if (pin) {
      selectPin(pin);
      setRouteDestinationPin(pin);
      navigate('/map');
    }
  };

  if (!pin) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-gray-50 p-4">
        <MapPin className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Pin Not Found</h2>
        <p className="text-gray-500 mb-6">The pin you're looking for doesn't exist.</p>
        <Link to="/map">
          <Button>
            <ArrowLeft className="w-4 h-4" />
            Back to Map
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4">
        <Link to="/map" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <h1 className="text-lg font-semibold text-gray-900 flex-1 truncate">
          {pin.title}
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleShowOnMap}>
            <Navigation className="w-4 h-4" />
            <span className="hidden sm:inline">Show on Map</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={handleEdit}>
            <Pencil className="w-4 h-4" />
            <span className="hidden sm:inline">Edit</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-red-600 hover:bg-red-50"
            onClick={() => setShowDeleteConfirm(true)}
            aria-label="Delete pin"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {/* Mini map */}
        <div className="h-48 md:h-64 relative">
          <MapContainer
            center={[pin.coordinates.lat, pin.coordinates.lng]}
            zoom={15}
            className="h-full w-full"
            zoomControl={false}
            dragging={false}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[pin.coordinates.lat, pin.coordinates.lng]}
              icon={createCategoryIcon(pin.category)}
            />
          </MapContainer>
          <div className="absolute bottom-4 right-4">
            <Button size="sm" onClick={handleShowOnMap}>
              <ExternalLink className="w-4 h-4" />
              Open in Map
            </Button>
          </div>
        </div>

        {/* Details */}
        <div className="p-4 md:p-6 max-w-2xl mx-auto">
          {/* Category badge */}
          {categoryMeta && (
            <div 
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-4"
              style={{ 
                backgroundColor: `${categoryMeta.color}15`,
                color: categoryMeta.color 
              }}
            >
              <CategoryIcon category={pin.category} size={16} />
              {categoryMeta.label}
            </div>
          )}

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{pin.title}</h2>

          {/* Rating */}
          {pin.rating && (
            <div className="flex items-center gap-1 mb-4">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="font-semibold text-gray-900">{pin.rating}</span>
              <span className="text-gray-500">/ 5</span>
            </div>
          )}

          {/* Description */}
          <p className="text-gray-600 leading-relaxed mb-6">{pin.description}</p>

          {/* Info grid */}
          <div className="grid gap-4 mb-6">
            {/* Address */}
            {pin.address && (
              <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Address</p>
                  <p className="text-gray-900">{pin.address}</p>
                </div>
              </div>
            )}

            {/* Coordinates */}
            <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100">
              <Navigation className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Coordinates</p>
                <p className="text-gray-900 font-mono text-sm">
                  {pin.coordinates.lat.toFixed(6)}, {pin.coordinates.lng.toFixed(6)}
                </p>
              </div>
            </div>

            {/* Created date */}
            <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Added</p>
                <p className="text-gray-900">{formatDate(pin.createdAt)}</p>
              </div>
            </div>
          </div>

          {/* Image */}
          {pin.imageUrl && (
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-500 mb-2">Photo</p>
              <img
                src={pin.imageUrl}
                alt={pin.title}
                className="w-full h-64 object-cover rounded-xl"
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={handleEdit}>
              <Pencil className="w-4 h-4" />
              Edit Pin
            </Button>
            <Button className="flex-1" onClick={handleGetDirections}>
              <Navigation className="w-4 h-4" />
              Get Directions
            </Button>
          </div>
        </div>
      </div>

      {/* Delete confirmation dialog */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Pin"
        message={`Are you sure you want to delete "${pin.title}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
}
