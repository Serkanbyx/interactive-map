import { z } from 'zod';

/**
 * Valid pin categories
 */
export const pinCategorySchema = z.enum([
  'restaurant',
  'hotel',
  'attraction',
  'shopping',
  'transport',
  'other',
]);

/**
 * Coordinate validation schema
 * Latitude: -90 to 90
 * Longitude: -180 to 180
 */
export const coordinatesSchema = z.object({
  lat: z
    .number({
      required_error: 'Latitude is required',
      invalid_type_error: 'Latitude must be a number',
    })
    .min(-90, 'Latitude must be between -90 and 90')
    .max(90, 'Latitude must be between -90 and 90'),
  lng: z
    .number({
      required_error: 'Longitude is required',
      invalid_type_error: 'Longitude must be a number',
    })
    .min(-180, 'Longitude must be between -180 and 180')
    .max(180, 'Longitude must be between -180 and 180'),
});

/**
 * Pin form validation schema
 */
export const pinFormSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
    })
    .min(2, 'Title must be at least 2 characters')
    .max(100, 'Title must be less than 100 characters')
    .trim(),
  description: z
    .string({
      required_error: 'Description is required',
    })
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters')
    .trim(),
  category: pinCategorySchema,
  lat: z
    .number({
      required_error: 'Latitude is required',
      invalid_type_error: 'Latitude must be a number',
    })
    .min(-90, 'Latitude must be between -90 and 90')
    .max(90, 'Latitude must be between -90 and 90'),
  lng: z
    .number({
      required_error: 'Longitude is required',
      invalid_type_error: 'Longitude must be a number',
    })
    .min(-180, 'Longitude must be between -180 and 180')
    .max(180, 'Longitude must be between -180 and 180'),
  address: z
    .string()
    .max(200, 'Address must be less than 200 characters')
    .optional()
    .or(z.literal('')),
  imageUrl: z
    .string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
  rating: z
    .number({ invalid_type_error: 'Rating must be a number' })
    .min(0, 'Rating must be between 0 and 5')
    .max(5, 'Rating must be between 0 and 5')
    .optional(),
});

/**
 * Full pin schema (includes id and timestamps)
 */
export const pinSchema = pinFormSchema.extend({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

/**
 * Route request validation schema
 */
export const routeRequestSchema = z.object({
  origin: coordinatesSchema,
  destination: coordinatesSchema,
  profile: z.enum(['driving', 'walking', 'cycling']).default('driving'),
});

// Type exports from schemas
export type PinFormInput = z.infer<typeof pinFormSchema>;
export type PinInput = z.infer<typeof pinSchema>;
export type RouteRequest = z.infer<typeof routeRequestSchema>;
