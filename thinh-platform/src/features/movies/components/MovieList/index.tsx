import React, { useState, useMemo } from 'react';
import { Movie } from '../../types';
import { MovieCard } from '../MovieCard';
import { styles } from './styles';

interface MovieListProps {
  movies: Movie[];
  onEdit?: (movie: Movie) => void;
  onDelete?: (id: string) => void;
}

export const MovieList: React.FC<MovieListProps> = ({ movies, onEdit, onDelete }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'title' | 'rating' | 'releaseYear' | 'createdAt'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Get unique genres for filter
  const genres = useMemo(() => {
    const uniqueGenres = [...new Set(movies.map(movie => movie.genre))];
    return ['all', ...uniqueGenres.sort()];
  }, [movies]);

  // Filter and sort movies
  const filteredAndSortedMovies = useMemo(() => {
    let filtered = movies;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(query) ||
        movie.description.toLowerCase().includes(query) ||
        movie.director.toLowerCase().includes(query) ||
        movie.genre.toLowerCase().includes(query)
      );
    }

    // Apply genre filter
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(movie => movie.genre === selectedGenre);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy];
      let bValue: any = b[sortBy];

      // Handle date sorting
      if (sortBy === 'createdAt') {
        aValue = a.createdAt.getTime();
        bValue = b.createdAt.getTime();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [movies, searchQuery, selectedGenre, sortBy, sortOrder]);

  const handleSortChange = (newSortBy: typeof sortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
  };

  const getSortIcon = (field: typeof sortBy) => {
    if (sortBy !== field) return '↕️';
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  return (
    <div className={styles.container}>
      {/* Search and Filter Controls */}
      <div className={styles.controlsContainer}>
        <div className={styles.controlsGrid}>
          {/* Search */}
          <div className={styles.searchContainer}>
            <label className={styles.label}>
              Search Movies
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, description, director, or genre..."
              className={styles.searchInput}
            />
          </div>

          {/* Genre Filter */}
          <div>
            <label className={styles.label}>
              Genre
            </label>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className={styles.selectInput}
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>
                  {genre === 'all' ? 'All Genres' : genre}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Order */}
          <div>
            <label className={styles.label}>
              Sort Order
            </label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              className={styles.selectInput}
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Sort Options */}
        <div className={styles.sortOptions}>
          <span className={styles.sortLabel}>Sort by:</span>
          {[
            { key: 'createdAt', label: 'Date Added' },
            { key: 'title', label: 'Title' },
            { key: 'rating', label: 'Rating' },
            { key: 'releaseYear', label: 'Release Year' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handleSortChange(key as typeof sortBy)}
              className={`${styles.sortButton} ${
                sortBy === key
                  ? styles.sortButtonActive
                  : styles.sortButtonInactive
              }`}
            >
              {label} {getSortIcon(key as typeof sortBy)}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className={styles.resultsContainer}>
        <p className={styles.resultsText}>
          Showing {filteredAndSortedMovies.length} of {movies.length} movies
        </p>
        {searchQuery.trim() && (
          <button
            onClick={() => setSearchQuery('')}
            className={styles.clearSearchButton}
          >
            Clear Search
          </button>
        )}
      </div>

      {/* Movies Grid */}
      {filteredAndSortedMovies.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyStateIcon}>🎬</div>
          <h3 className={styles.emptyStateTitle}>
            {searchQuery.trim() ? 'No movies found' : 'No movies yet'}
          </h3>
          <p className={styles.emptyStateText}>
            {searchQuery.trim() 
              ? 'Try adjusting your search terms or filters'
              : 'Start by adding your first movie!'
            }
          </p>
        </div>
      ) : (
        <div className={styles.moviesGrid}>
          {filteredAndSortedMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};
