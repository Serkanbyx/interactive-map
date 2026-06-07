import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { Pin, PinCategory, FilterState, Coordinates, RouteData } from '@/types';
import { samplePins } from '@/data/samplePins';

/**
 * Pin store state interface
 */
interface PinState {
  // Data
  pins: Pin[];
  selectedPin: Pin | null;
  editingPin: Pin | null;
  routeDestinationPin: Pin | null;
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
  setEditingPin: (pin: Pin | null) => void;
  
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
  setRouteDestinationPin: (pin: Pin | null) => void;
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
 * Zustand store for pin management
 */
export const usePinStore = create<PinState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial State
        pins: samplePins,
        selectedPin: null,
        editingPin: null,
        routeDestinationPin: null,
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

        setEditingPin: (pin) =>
          set({ editingPin: pin }, false, 'setEditingPin'),

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
            { isAddingPin: isAdding, pendingCoordinates: null },
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

        setRouteDestinationPin: (pin) =>
          set({ routeDestinationPin: pin }, false, 'setRouteDestinationPin'),

        clearRoute: () =>
          set({ routeData: null, routeDestinationPin: null }, false, 'clearRoute'),

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
        version: 1,
        partialize: (state) => ({
          pins: state.pins,
          filters: state.filters,
        }),
      }
    ),
    { name: 'PinStore' }
  )
);
