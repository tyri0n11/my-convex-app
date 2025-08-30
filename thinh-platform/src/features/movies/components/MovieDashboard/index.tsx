import React, { useState } from 'react';
import { MovieList } from '../MovieList';
import { AddMovieModal } from '../AddMovieModal';
import { useMovies } from '../../hooks/useMovies';
import { Movie, CreateMovieData } from '../../types';
import { styles } from './styles';

export const MovieDashboard: React.FC = () => {
  const {
    movies,
    loading,
    error,
    addMovie,
    updateMovie,
    deleteMovie,
    getGenres
  } = useMovies();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieToEdit, setMovieToEdit] = useState<Movie | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const handleAddMovie = (movieData: CreateMovieData) => {
    addMovie(movieData);
    setIsModalOpen(false);
  };

  const handleEditMovie = (movie: Movie) => {
    setMovieToEdit(movie);
    setIsModalOpen(true);
  };

  const handleUpdateMovie = (movieData: CreateMovieData) => {
    if (movieToEdit) {
      updateMovie(movieToEdit.id, movieData);
      setMovieToEdit(null);
      setIsModalOpen(false);
    }
  };

  const handleDeleteMovie = (id: string) => {
    deleteMovie(id);
    setShowDeleteConfirm(null);
  };

  const openAddModal = () => {
    setMovieToEdit(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMovieToEdit(null);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <div className={styles.loadingSpinner}></div>
          <p className={styles.loadingText}>Loading movies...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <div className={styles.errorIcon}>❌</div>
          <h3 className={styles.errorTitle}>Error Loading Movies</h3>
          <p className={styles.errorText}>{error}</p>
        </div>
      </div>
    );
  }

  const genres = getGenres();
  const totalMovies = movies.length;
  const averageRating = movies.length > 0 
    ? (movies.reduce((sum, movie) => sum + movie.rating, 0) / movies.length).toFixed(1)
    : '0.0';

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div>
            <h1 className={styles.title}>🎬 Movie Collection</h1>
            <p className={styles.subtitle}>
              Manage your personal movie library with ease
            </p>
          </div>
          <button
            onClick={openAddModal}
            className={styles.addButton}
          >
            <svg className={styles.addButtonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Movie
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.statsContainer}>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div className={styles.statIcon}>
                <div className={styles.statIconContainer}>
                  <svg className={styles.statIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
                  </svg>
                </div>
              </div>
              <div className={styles.statText}>
                <p className={styles.statLabel}>Total Movies</p>
                <p className={styles.statValue}>{totalMovies}</p>
              </div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div className={styles.statIcon}>
                <div className={styles.statIconContainer}>
                  <svg className={styles.statIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
              </div>
              <div className={styles.statText}>
                <p className={styles.statLabel}>Average Rating</p>
                <p className={styles.statValue}>⭐ {averageRating}</p>
              </div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div className={styles.statIcon}>
                <div className={styles.statIconContainer}>
                  <svg className={styles.statIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
              </div>
              <div className={styles.statText}>
                <p className={styles.statLabel}>Genres</p>
                <p className={styles.statValue}>{genres.length}</p>
              </div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div className={styles.statIcon}>
                <div className={styles.statIconContainer}>
                  <svg className={styles.statIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className={styles.statText}>
                <p className={styles.statLabel}>Latest Addition</p>
                <p className={styles.statValue}>
                  {movies.length > 0 ? new Date(movies[0].createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Movie List */}
        <MovieList
          movies={movies}
          onEdit={handleEditMovie}
          onDelete={(id) => setShowDeleteConfirm(id)}
        />
      </div>

      {/* Add/Edit Movie Modal */}
      <AddMovieModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={movieToEdit ? handleUpdateMovie : handleAddMovie}
        movieToEdit={movieToEdit}
      />

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className={styles.deleteOverlay}>
          <div className={styles.deleteModal}>
            <div className={styles.deleteContent}>
              <div className={styles.deleteIcon}>🗑️</div>
              <h3 className={styles.deleteTitle}>
                Delete Movie
              </h3>
              <p className={styles.deleteText}>
                Are you sure you want to delete this movie? This action cannot be undone.
              </p>
              <div className={styles.deleteActions}>
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className={styles.deleteCancelButton}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteMovie(showDeleteConfirm)}
                  className={styles.deleteConfirmButton}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
