import React from 'react';
import { Movie } from '../../types';
import { styles } from './styles';

interface MovieCardProps {
  movie: Movie;
  onEdit?: (movie: Movie) => void;
  onDelete?: (id: string) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onEdit, onDelete }) => {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className={styles.container}>
      {/* Poster Image */}
      <div className={styles.posterContainer}>
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className={styles.posterImage}
        />
        <div className={styles.ratingBadge}>
          ⭐ {movie.rating}
        </div>
        <div className={styles.posterOverlay}>
          <div className={styles.posterTags}>
            <span className={styles.genreTag}>
              {movie.genre}
            </span>
            <span className={styles.yearTag}>
              {movie.releaseYear}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h3 className={styles.title}>
          {movie.title}
        </h3>
        
        <p className={styles.description}>
          {movie.description}
        </p>

        <div className={styles.movieDetails}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Director:</span>
            <span className={styles.detailValue}>{movie.director}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Duration:</span>
            <span className={styles.detailValue}>{formatDuration(movie.duration)}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Added:</span>
            <span className={styles.detailValue}>{formatDate(movie.createdAt)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actions}>
          {onEdit && (
            <button
              onClick={() => onEdit(movie)}
              className={styles.editButton}
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(movie.id)}
              className={styles.deleteButton}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
