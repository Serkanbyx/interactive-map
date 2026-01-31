import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { Pin, PinCategory, FilterState, Coordinates, RouteData } from '@/types';

/**
 * Pin store state interface
 */
interface PinState {
  // Data
  pins: Pin[];
  selectedPin: Pin | null;
  routeData: RouteData | null;
  
  // UI State
  filters: FilterState;
  isAddingPin: boolean;
  pendingCoordinates: Coordinates | null;
  isSidebarOpen: boolean;
  isLoading: boolean;
  error: string | null;

  // Pin Actions
  addPin: (pin: Pin) => void;
  updatePin: (id: string, updates: Partial<Pin>) => void;
  deletePin: (id: string) => void;
  selectPin: (pin: Pin | null) => void;
  
  // Filter Actions
  setSearchQuery: (query: string) => void;
  toggleCategory: (category: PinCategory) => void;
  setCategories: (categories: PinCategory[]) => void;
  clearFilters: () => void;
  
  // UI Actions
  setIsAddingPin: (isAdding: boolean) => void;
  setPendingCoordinates: (coords: Coordinates | null) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  
  // Route Actions
  setRouteData: (route: RouteData | null) => void;
  clearRoute: () => void;
  
  // Utility Actions
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Computed/Derived
  getFilteredPins: () => Pin[];
  getPinById: (id: string) => Pin | undefined;
}

/**
 * Default filter state
 */
const defaultFilters: FilterState = {
  categories: [],
  searchQuery: '',
};

/**
 * Sample pins for demo purposes
 * These will be replaced by API data when backend is integrated
 */
const samplePins: Pin[] = [
  {
    id: '1',
    title: 'Central Park',
    description: 'A large public park in New York City, offering green spaces, lakes, and walking paths. Perfect for a relaxing day outdoors.',
    category: 'attraction',
    coordinates: { lat: 40.7829, lng: -73.9654 },
    address: 'New York, NY 10024',
    rating: 4.8,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'The Modern Restaurant',
    description: 'Contemporary American cuisine in a sleek setting with views of the MoMA sculpture garden. Fine dining experience.',
    category: 'restaurant',
    coordinates: { lat: 40.7614, lng: -73.9776 },
    address: '9 W 53rd St, New York, NY 10019',
    rating: 4.5,
    createdAt: '2024-01-16T14:30:00Z',
    updatedAt: '2024-01-16T14:30:00Z',
  },
  {
    id: '3',
    title: 'Grand Central Terminal',
    description: 'Historic train station and landmark featuring stunning Beaux-Arts architecture and a famous celestial ceiling.',
    category: 'transport',
    coordinates: { lat: 40.7527, lng: -73.9772 },
    address: '89 E 42nd St, New York, NY 10017',
    rating: 4.7,
    createdAt: '2024-01-17T09:00:00Z',
    updatedAt: '2024-01-17T09:00:00Z',
  },
  {
    id: '4',
    title: 'The Plaza Hotel',
    description: 'Iconic luxury hotel overlooking Central Park, known for its elegant rooms and world-class service.',
    category: 'hotel',
    coordinates: { lat: 40.7645, lng: -73.9744 },
    address: '768 5th Ave, New York, NY 10019',
    rating: 4.6,
    createdAt: '2024-01-18T11:00:00Z',
    updatedAt: '2024-01-18T11:00:00Z',
  },
  {
    id: '5',
    title: 'Fifth Avenue Shopping',
    description: 'World-famous shopping destination featuring luxury boutiques, department stores, and flagship stores.',
    category: 'shopping',
    coordinates: { lat: 40.7580, lng: -73.9755 },
    address: '5th Ave, New York, NY',
    rating: 4.4,
    createdAt: '2024-01-19T13:00:00Z',
    updatedAt: '2024-01-19T13:00:00Z',
  },
  {
    id: '6',
    title: 'Times Square',
    description: 'Iconic commercial intersection known for bright lights, Broadway theaters, and bustling atmosphere.',
    category: 'attraction',
    coordinates: { lat: 40.7580, lng: -73.9855 },
    address: 'Manhattan, NY 10036',
    rating: 4.3,
    createdAt: '2024-01-20T16:00:00Z',
    updatedAt: '2024-01-20T16:00:00Z',
  },
];

/**
 * Zustand store for pin management
 */
export const usePinStore = create<PinState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial State
        pins: samplePins,
        selectedPin: null,
        routeData: null,
        filters: defaultFilters,
        isAddingPin: false,
        pendingCoordinates: null,
        isSidebarOpen: true,
        isLoading: false,
        error: null,

        // Pin Actions
        addPin: (pin) =>
          set(
            (state) => ({ pins: [...state.pins, pin] }),
            false,
            'addPin'
          ),

        updatePin: (id, updates) =>
          set(
            (state) => ({
              pins: state.pins.map((pin) =>
                pin.id === id
                  ? { ...pin, ...updates, updatedAt: new Date().toISOString() }
                  : pin
              ),
              selectedPin:
                state.selectedPin?.id === id
                  ? { ...state.selectedPin, ...updates }
                  : state.selectedPin,
            }),
            false,
            'updatePin'
          ),

        deletePin: (id) =>
          set(
            (state) => ({
              pins: state.pins.filter((pin) => pin.id !== id),
              selectedPin: state.selectedPin?.id === id ? null : state.selectedPin,
            }),
            false,
            'deletePin'
          ),

        selectPin: (pin) =>
          set({ selectedPin: pin }, false, 'selectPin'),

        // Filter Actions
        setSearchQuery: (query) =>
          set(
            (state) => ({
              filters: { ...state.filters, searchQuery: query },
            }),
            false,
            'setSearchQuery'
          ),

        toggleCategory: (category) =>
          set(
            (state) => {
              const currentCategories = state.filters.categories;
              const newCategories = currentCategories.includes(category)
                ? currentCategories.filter((c) => c !== category)
                : [...currentCategories, category];
              return {
                filters: { ...state.filters, categories: newCategories },
              };
            },
            false,
            'toggleCategory'
          ),

        setCategories: (categories) =>
          set(
            (state) => ({
              filters: { ...state.filters, categories },
            }),
            false,
            'setCategories'
          ),

        clearFilters: () =>
          set({ filters: defaultFilters }, false, 'clearFilters'),

        // UI Actions
        setIsAddingPin: (isAdding) =>
          set(
            { isAddingPin: isAdding, pendingCoordinates: isAdding ? null : null },
            false,
            'setIsAddingPin'
          ),

        setPendingCoordinates: (coords) =>
          set({ pendingCoordinates: coords }, false, 'setPendingCoordinates'),

        toggleSidebar: () =>
          set(
            (state) => ({ isSidebarOpen: !state.isSidebarOpen }),
            false,
            'toggleSidebar'
          ),

        setSidebarOpen: (isOpen) =>
          set({ isSidebarOpen: isOpen }, false, 'setSidebarOpen'),

        // Route Actions
        setRouteData: (route) =>
          set({ routeData: route }, false, 'setRouteData'),

        clearRoute: () =>
          set({ routeData: null }, false, 'clearRoute'),

        // Utility Actions
        setLoading: (isLoading) =>
          set({ isLoading }, false, 'setLoading'),

        setError: (error) =>
          set({ error }, false, 'setError'),

        // Computed/Derived
        getFilteredPins: () => {
          const { pins, filters } = get();
          let filtered = pins;

          // Filter by categories
          if (filters.categories.length > 0) {
            filtered = filtered.filter((pin) =>
              filters.categories.includes(pin.category)
            );
          }

          // Filter by search query
          if (filters.searchQuery.trim()) {
            const query = filters.searchQuery.toLowerCase();
            filtered = filtered.filter(
              (pin) =>
                pin.title.toLowerCase().includes(query) ||
                pin.description.toLowerCase().includes(query) ||
                pin.address?.toLowerCase().includes(query)
            );
          }

          return filtered;
        },

        getPinById: (id) => {
          const { pins } = get();
          return pins.find((pin) => pin.id === id);
        },
      }),
      {
        name: 'interactive-map-storage',
        partialize: (state) => ({
          pins: state.pins,
          filters: state.filters,
        }),
      }
    ),
    { name: 'PinStore' }
  )
);
