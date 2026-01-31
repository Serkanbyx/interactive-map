# Interactive Map Application

A modern, responsive interactive map application built with React, TypeScript, and Leaflet. Features include pin management, category filtering, route directions, and a beautiful UI.

![Interactive Map](https://img.shields.io/badge/React-18.2-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue) ![Vite](https://img.shields.io/badge/Vite-5.1-purple) ![Tailwind](https://img.shields.io/badge/Tailwind-3.4-cyan)

## Features

- **Interactive Map** - OpenStreetMap tiles with smooth pan and zoom
- **Pin Management** - Add, view, and delete location pins
- **Category System** - 6 categories with custom icons and colors (Restaurant, Hotel, Attraction, Shopping, Transport, Other)
- **Search & Filter** - Real-time search and category filtering
- **Route Directions** - Get driving/walking/cycling directions between pins (via Mapbox API)
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Persistent Storage** - Pins are saved to local storage
- **Form Validation** - Zod schema validation for pin creation

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 18 + Vite |
| Language | TypeScript |
| State Management | Zustand |
| Form Handling | React Hook Form |
| Validation | Zod |
| Routing | React Router v6 |
| Map Library | Leaflet + react-leaflet |
| Map Tiles | OpenStreetMap |
| Directions API | Mapbox Directions |
| Styling | Tailwind CSS |
| Icons | Lucide React |

## Project Structure

```
src/
├── components/
│   ├── layout/         # Layout components (MobileNav)
│   ├── map/            # Map components (Map, Markers, RouteLine)
│   ├── pin/            # Pin components (PinForm, PinCard)
│   ├── route/          # Route components (RoutePanel)
│   ├── sidebar/        # Sidebar components (Sidebar, Filters)
│   └── ui/             # Reusable UI components (Button, Input, etc.)
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
├── schemas/            # Zod validation schemas
├── services/           # API services (Mapbox)
├── store/              # Zustand store
├── types/              # TypeScript types
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/interactive-map.git
cd interactive-map
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. (Optional) Add your Mapbox token for route directions:
```env
VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_token_here
```

Get your free Mapbox token at: https://account.mapbox.com/access-tokens/

5. Start the development server:
```bash
npm run dev
```

6. Open http://localhost:3000 in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## API Structure

| Service | Provider | Purpose |
|---------|----------|---------|
| Map Tiles | OpenStreetMap | Base map layer |
| Directions | Mapbox | Route calculation |
| Pins | Local Storage (Backend TBD) | Pin data management |

## Features in Detail

### Pin Categories

| Category | Color | Icon |
|----------|-------|------|
| Restaurant | Red | Utensils |
| Hotel | Purple | Bed |
| Attraction | Orange | Landmark |
| Shopping | Green | Shopping Bag |
| Transport | Indigo | Train |
| Other | Gray | Map Pin |

### Routes

- **/map** - Main map view with sidebar
- **/pin/:id** - Pin detail page

### State Management

The app uses Zustand for state management with the following structure:

```typescript
interface PinState {
  pins: Pin[];              // All pins
  selectedPin: Pin | null;  // Currently selected pin
  routeData: RouteData | null;  // Active route
  filters: FilterState;     // Search and category filters
  isAddingPin: boolean;     // Adding pin mode
  // ... actions
}
```

## Deployment

### Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy to Netlify:
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Add environment variable: `VITE_MAPBOX_ACCESS_TOKEN`

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_MAPBOX_ACCESS_TOKEN` | Optional | Mapbox API token for directions |
| `VITE_API_BASE_URL` | Future | Backend API URL |

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- [OpenStreetMap](https://www.openstreetmap.org/) for map tiles
- [Mapbox](https://www.mapbox.com/) for directions API
- [Leaflet](https://leafletjs.com/) for map library
- [Lucide](https://lucide.dev/) for icons
