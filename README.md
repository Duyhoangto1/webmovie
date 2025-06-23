# Movie Explorer

A modern React web application for discovering and exploring movies using The Movie Database (TMDb) API.

## Features

- **Trending Movies**: View the top 20 trending movies with poster images, titles, and release dates
- **Movie Search**: Real-time search functionality to find movies by title
- **Movie Details**: Comprehensive movie information including cast, ratings, and descriptions
- **Responsive Design**: Optimized for mobile, tablet, and desktop viewing
- **Modern UI**: TMDb-inspired design with smooth animations and hover effects

## Setup Instructions

### 1. Get TMDb API Key

1. Visit [The Movie Database](https://www.themoviedb.org/)
2. Create a free account
3. Go to [API Settings](https://www.themoviedb.org/settings/api)
4. Request an API key (choose "Developer" option)
5. Copy your API key

### 2. Configure Environment Variables

1. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Open `.env` and replace `your_api_key_here` with your actual TMDb API key:
   ```
   VITE_TMDB_API_KEY=your_actual_api_key_here
   ```

### 3. Install and Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Technology Stack

- **React 18** with TypeScript
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for build tooling
- **TMDb API** for movie data

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── services/           # API services
├── types/              # TypeScript type definitions
└── App.tsx             # Main application component
```

## API Integration

The app integrates with TMDb API for:

- Fetching trending movies
- Searching movies by title
- Getting detailed movie information
- Retrieving cast information

## Features in Detail

### Home Page

- Displays 20 trending movies in a responsive grid
- Refresh button to reload trending movies
- Movie cards with hover animations

### Search Page

- Real-time search with debounced input
- Search results displayed in the same grid format
- Empty state and search suggestions

### Movie Details Page

- Full movie information with backdrop image
- Cast information with profile pictures
- Movie ratings, runtime, and genre tags
- Responsive layout for all screen sizes

## Error Handling

- Network error handling with retry functionality
- Invalid API key detection and user-friendly messages
- Loading states throughout the application
- Graceful fallbacks for missing images

## Responsive Design

- Mobile-first approach
- 1 column on mobile, 4 columns on desktop
- Flexible layouts that adapt to screen size
- Touch-friendly interface elements

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ features used throughout
- CSS Grid and Flexbox for layouts
