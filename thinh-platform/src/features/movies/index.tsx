
// Components
export { MovieDashboard } from './components/MovieDashboard';
export { MovieCard } from './components/MovieCard';
export { AddMovieModal } from './components/AddMovieModal';
export { MovieList } from './components/MovieList';

// Hooks
export {
  useMovies,
  useMovieForm,
  useMovieSearch,
  useMovieModal,
  useDeleteConfirmation,
} from './hooks';

// Styles
export {
  movieStyles,
  movieCardStyles,
  movieFormStyles,
} from './styles';

// Types
export type { Movie, CreateMovieData } from './types';

// Demo component
export { MoviesDemo } from './demo';
