import type { Pin } from '@/types';

/**
 * Sample pins used to seed the store on first launch (demo data).
 * Kept separate from the store so real user data and demo data stay decoupled.
 * IDs use valid UUIDs to match the pin schema contract.
 */
export const samplePins: Pin[] = [
  {
    id: '11111111-1111-4111-8111-111111111111',
    title: 'Central Park',
    description:
      'A large public park in New York City, offering green spaces, lakes, and walking paths. Perfect for a relaxing day outdoors.',
    category: 'attraction',
    coordinates: { lat: 40.7829, lng: -73.9654 },
    address: 'New York, NY 10024',
    rating: 4.8,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '22222222-2222-4222-8222-222222222222',
    title: 'The Modern Restaurant',
    description:
      'Contemporary American cuisine in a sleek setting with views of the MoMA sculpture garden. Fine dining experience.',
    category: 'restaurant',
    coordinates: { lat: 40.7614, lng: -73.9776 },
    address: '9 W 53rd St, New York, NY 10019',
    rating: 4.5,
    createdAt: '2024-01-16T14:30:00Z',
    updatedAt: '2024-01-16T14:30:00Z',
  },
  {
    id: '33333333-3333-4333-8333-333333333333',
    title: 'Grand Central Terminal',
    description:
      'Historic train station and landmark featuring stunning Beaux-Arts architecture and a famous celestial ceiling.',
    category: 'transport',
    coordinates: { lat: 40.7527, lng: -73.9772 },
    address: '89 E 42nd St, New York, NY 10017',
    rating: 4.7,
    createdAt: '2024-01-17T09:00:00Z',
    updatedAt: '2024-01-17T09:00:00Z',
  },
  {
    id: '44444444-4444-4444-8444-444444444444',
    title: 'The Plaza Hotel',
    description:
      'Iconic luxury hotel overlooking Central Park, known for its elegant rooms and world-class service.',
    category: 'hotel',
    coordinates: { lat: 40.7645, lng: -73.9744 },
    address: '768 5th Ave, New York, NY 10019',
    rating: 4.6,
    createdAt: '2024-01-18T11:00:00Z',
    updatedAt: '2024-01-18T11:00:00Z',
  },
  {
    id: '55555555-5555-4555-8555-555555555555',
    title: 'Fifth Avenue Shopping',
    description:
      'World-famous shopping destination featuring luxury boutiques, department stores, and flagship stores.',
    category: 'shopping',
    coordinates: { lat: 40.758, lng: -73.9755 },
    address: '5th Ave, New York, NY',
    rating: 4.4,
    createdAt: '2024-01-19T13:00:00Z',
    updatedAt: '2024-01-19T13:00:00Z',
  },
  {
    id: '66666666-6666-4666-8666-666666666666',
    title: 'Times Square',
    description:
      'Iconic commercial intersection known for bright lights, Broadway theaters, and bustling atmosphere.',
    category: 'attraction',
    coordinates: { lat: 40.758, lng: -73.9855 },
    address: 'Manhattan, NY 10036',
    rating: 4.3,
    createdAt: '2024-01-20T16:00:00Z',
    updatedAt: '2024-01-20T16:00:00Z',
  },
];
