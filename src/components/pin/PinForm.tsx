import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, MapPin, Save } from 'lucide-react';
import { usePinStore } from '@/store/pinStore';
import { pinFormSchema, type PinFormInput } from '@/schemas/pin.schema';
import { CATEGORIES, type Coordinates, type Pin } from '@/types';
import { generateId } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { CategoryIcon } from '@/components/ui/CategoryIcon';

export interface PinFormProps {
  /** Coordinates for a new pin (create mode) */
  coordinates?: Coordinates;
  /** Existing pin to edit (edit mode) */
  pin?: Pin;
  onSuccess: () => void;
  onCancel: () => void;
}

/**
 * Form for creating or editing a pin
 * Uses React Hook Form with Zod validation
 */
export function PinForm({ coordinates, pin, onSuccess, onCancel }: PinFormProps) {
  const { addPin, updatePin } = usePinStore();

  const isEditing = !!pin;
  const baseCoordinates = pin?.coordinates ?? coordinates;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PinFormInput>({
    resolver: zodResolver(pinFormSchema),
    defaultValues: {
      title: pin?.title ?? '',
      description: pin?.description ?? '',
      category: pin?.category ?? 'other',
      lat: baseCoordinates?.lat ?? 0,
      lng: baseCoordinates?.lng ?? 0,
      address: pin?.address ?? '',
      imageUrl: pin?.imageUrl ?? '',
      rating: pin?.rating,
    },
  });

  const selectedCategory = watch('category');

  const onSubmit = (data: PinFormInput) => {
    const sharedFields = {
      title: data.title,
      description: data.description,
      category: data.category,
      coordinates: {
        lat: data.lat,
        lng: data.lng,
      },
      address: data.address || undefined,
      imageUrl: data.imageUrl || undefined,
      rating: data.rating,
    };

    if (isEditing && pin) {
      updatePin(pin.id, sharedFields);
    } else {
      const now = new Date().toISOString();
      addPin({
        id: generateId(),
        ...sharedFields,
        createdAt: now,
        updatedAt: now,
      });
    }

    onSuccess();
  };

  const categoryOptions = CATEGORIES.map((cat) => ({
    value: cat.id,
    label: cat.label,
  }));

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 text-white">
          <MapPin className="w-6 h-6" />
          <h2 className="text-lg font-semibold">{isEditing ? 'Edit Pin' : 'Add New Pin'}</h2>
        </div>
        <button
          onClick={onCancel}
          className="p-1 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Close form"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1.5">
            Title <span className="text-red-500">*</span>
          </label>
          <Input
            id="title"
            placeholder="Enter pin title"
            error={!!errors.title}
            {...register('title')}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1.5">
            Category <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <Select
                id="category"
                options={categoryOptions}
                error={!!errors.category}
                {...register('category')}
              />
            </div>
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
              style={{ backgroundColor: CATEGORIES.find(c => c.id === selectedCategory)?.color || '#6b7280' }}
            >
              <CategoryIcon category={selectedCategory} size={20} />
            </div>
          </div>
          {errors.category && (
            <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1.5">
            Description <span className="text-red-500">*</span>
          </label>
          <Textarea
            id="description"
            placeholder="Describe this location..."
            rows={3}
            error={!!errors.description}
            {...register('description')}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* Coordinates (read-only display) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Coordinates
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Input
                type="number"
                step="any"
                placeholder="Latitude"
                error={!!errors.lat}
                {...register('lat', { valueAsNumber: true })}
              />
              {errors.lat && (
                <p className="mt-1 text-sm text-red-500">{errors.lat.message}</p>
              )}
            </div>
            <div>
              <Input
                type="number"
                step="any"
                placeholder="Longitude"
                error={!!errors.lng}
                {...register('lng', { valueAsNumber: true })}
              />
              {errors.lng && (
                <p className="mt-1 text-sm text-red-500">{errors.lng.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Address (optional) */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1.5">
            Address <span className="text-gray-400">(optional)</span>
          </label>
          <Input
            id="address"
            placeholder="Street address"
            error={!!errors.address}
            {...register('address')}
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>
          )}
        </div>

        {/* Image URL (optional) */}
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1.5">
            Image URL <span className="text-gray-400">(optional)</span>
          </label>
          <Input
            id="imageUrl"
            type="url"
            placeholder="https://example.com/image.jpg"
            error={!!errors.imageUrl}
            {...register('imageUrl')}
          />
          {errors.imageUrl && (
            <p className="mt-1 text-sm text-red-500">{errors.imageUrl.message}</p>
          )}
        </div>

        {/* Rating (optional) */}
        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1.5">
            Rating <span className="text-gray-400">(optional, 0-5)</span>
          </label>
          <Input
            id="rating"
            type="number"
            step="0.1"
            min="0"
            max="5"
            placeholder="e.g. 4.5"
            error={!!errors.rating}
            {...register('rating', {
              setValueAs: (value) =>
                value === '' || value === null || value === undefined
                  ? undefined
                  : Number(value),
            })}
          />
          {errors.rating && (
            <p className="mt-1 text-sm text-red-500">{errors.rating.message}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button type="button" variant="secondary" className="flex-1" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="flex-1" isLoading={isSubmitting}>
            <Save className="w-4 h-4" />
            {isEditing ? 'Update Pin' : 'Save Pin'}
          </Button>
        </div>
      </form>
    </div>
  );
}
