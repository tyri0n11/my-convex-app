# Movies Feature

A comprehensive movie management system for the Thinh Platform, built with React and TypeScript.

## Features

### 🎬 Movie Management
- **Add Movies**: Create new movie entries with comprehensive details
- **View Movies**: Browse your movie collection with beautiful cards
- **Edit Movies**: Update existing movie information
- **Delete Movies**: Remove movies from your collection with confirmation

### 🔍 Search & Filter
- **Search**: Find movies by title, description, director, or genre
- **Genre Filter**: Filter movies by specific genres
- **Sorting**: Sort by date added, title, rating, or release year
- **Order**: Choose ascending or descending order

### 📊 Statistics Dashboard
- **Total Movies**: Count of all movies in your collection
- **Average Rating**: Overall rating across all movies
- **Genre Count**: Number of unique genres
- **Latest Addition**: Date of the most recently added movie

## Components

### MovieDashboard
The main component that orchestrates the entire movie management system.

### MovieCard
Displays individual movie information in an attractive card format with:
- Movie poster image
- Title and description
- Genre and release year badges
- Rating display
- Director and duration information
- Edit and delete action buttons

### AddMovieModal
A comprehensive form for adding/editing movies with fields for:
- Title (required)
- Description (required)
- Genre selection from predefined options
- Release year with validation
- Rating (0-10 scale)
- Duration in minutes
- Director name (required)
- Poster URL (required)

### MovieList
Displays a grid of movies with:
- Search and filter controls
- Sort options
- Results count
- Responsive grid layout

## Usage

### Basic Implementation

```tsx
import { MovieDashboard } from '@/features/movies';

function App() {
  return (
    <div>
      <MovieDashboard />
    </div>
  );
}
```

### Using Individual Components

```tsx
import { MovieCard, MovieList, AddMovieModal, useMovies } from '@/features/movies';

function CustomMoviePage() {
  const { movies, addMovie, updateMovie, deleteMovie } = useMovies();
  
  return (
    <div>
      <MovieList 
        movies={movies}
        onEdit={updateMovie}
        onDelete={deleteMovie}
      />
    </div>
  );
}
```

## Data Structure

### Movie Interface
```typescript
interface Movie {
  id: string;
  title: string;
  description: string;
  genre: string;
  releaseYear: number;
  rating: number;
  posterUrl: string;
  director: string;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Create Movie Data
```typescript
interface CreateMovieData {
  title: string;
  description: string;
  genre: string;
  releaseYear: number;
  rating: number;
  posterUrl: string;
  director: string;
  duration: number;
}
```

## Available Genres

The system includes these predefined genres:
- Action, Adventure, Animation, Comedy, Crime
- Documentary, Drama, Family, Fantasy, Horror
- Mystery, Romance, Sci-Fi, Thriller, War, Western

## Mock Data

The feature comes with 5 sample movies to demonstrate functionality:
1. The Shawshank Redemption (Drama, 1994)
2. The Godfather (Crime, 1972)
3. Pulp Fiction (Crime, 1994)
4. The Dark Knight (Action, 2008)
5. Inception (Sci-Fi, 2010)

## Styling

The feature uses Tailwind CSS for styling with:
- Responsive design for all screen sizes
- Beautiful gradients and shadows
- Smooth transitions and hover effects
- Consistent spacing and typography
- Modern card-based layout

## State Management

Uses React hooks for local state management:
- `useState` for component state
- `useEffect` for data loading simulation
- Custom `useMovies` hook for movie operations

## Future Enhancements

Potential improvements could include:
- Backend integration with Convex
- User authentication and personal collections
- Movie recommendations
- Watchlist functionality
- Rating and review system
- Movie trailer integration
- Export/import functionality
