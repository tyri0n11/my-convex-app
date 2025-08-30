import React, { useState, useEffect } from 'react';
import { CreateMovieData, Movie } from '../../types';
import { styles } from './styles';

interface AddMovieModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (movieData: CreateMovieData) => void;
  movieToEdit?: Movie | null;
}

const genres = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
  'Drama', 'Family', 'Fantasy', 'Horror', 'Mystery', 'Romance',
  'Sci-Fi', 'Thriller', 'War', 'Western'
];

export const AddMovieModal: React.FC<AddMovieModalProps> = ({
  isOpen,
  onClose,
  onSave,
  movieToEdit
}) => {
  const [formData, setFormData] = useState<CreateMovieData>({
    title: '',
    description: '',
    genre: 'Drama',
    releaseYear: new Date().getFullYear(),
    rating: 7.0,
    posterUrl: '',
    director: '',
    duration: 120,
  });

  const [errors, setErrors] = useState<Partial<CreateMovieData>>({});

  useEffect(() => {
    if (movieToEdit) {
      setFormData({
        title: movieToEdit.title,
        description: movieToEdit.description,
        genre: movieToEdit.genre,
        releaseYear: movieToEdit.releaseYear,
        rating: movieToEdit.rating,
        posterUrl: movieToEdit.posterUrl,
        director: movieToEdit.director,
        duration: movieToEdit.duration,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        genre: 'Drama',
        releaseYear: new Date().getFullYear(),
        rating: 7.0,
        posterUrl: '',
        director: '',
        duration: 120,
      });
    }
    setErrors({});
  }, [movieToEdit]);

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateMovieData> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.director.trim()) {
      newErrors.director = 'Director is required';
    }
    if (!formData.posterUrl.trim()) {
      newErrors.posterUrl = 'Poster URL is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  const handleInputChange = (field: keyof CreateMovieData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h2 className={styles.title}>
              {movieToEdit ? 'Edit Movie' : 'Add New Movie'}
            </h2>
            <button
              onClick={onClose}
              className={styles.closeButton}
            >
              ×
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            {/* Title */}
            <div className={styles.fullWidthField}>
              <label className={styles.label}>
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className={`${styles.input} ${
                  errors.title ? styles.inputError : styles.inputNormal
                }`}
                placeholder="Enter movie title"
              />
              {errors.title && (
                <p className={styles.errorText}>{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div className={styles.fullWidthField}>
              <label className={styles.label}>
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className={`${styles.textarea} ${
                  errors.description ? styles.inputError : styles.inputNormal
                }`}
                placeholder="Enter movie description"
              />
              {errors.description && (
                <p className={styles.errorText}>{errors.description}</p>
              )}
            </div>

            {/* Genre */}
            <div>
              <label className={styles.label}>
                Genre *
              </label>
              <select
                value={formData.genre}
                onChange={(e) => handleInputChange('genre', e.target.value)}
                className={styles.select}
              >
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            {/* Release Year */}
            <div>
              <label className={styles.label}>
                Release Year *
              </label>
              <input
                type="number"
                value={formData.releaseYear}
                onChange={(e) => handleInputChange('releaseYear', parseInt(e.target.value))}
                min="1888"
                max={new Date().getFullYear() + 1}
                className={`${styles.input} ${
                  errors.releaseYear ? styles.inputError : styles.inputNormal
                }`}
              />
              {errors.releaseYear && (
                <p className={styles.errorText}>{errors.releaseYear}</p>
              )}
            </div>

            {/* Rating */}
            <div>
              <label className={styles.label}>
                Rating (0-10) *
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.rating}
                onChange={(e) => handleInputChange('rating', parseFloat(e.target.value))}
                min="0"
                max="10"
                className={`${styles.input} ${
                  errors.rating ? styles.inputError : styles.inputNormal
                }`}
              />
              {errors.rating && (
                <p className={styles.errorText}>{errors.rating}</p>
              )}
            </div>

            {/* Duration */}
            <div>
              <label className={styles.label}>
                Duration (minutes) *
              </label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
                min="1"
                className={`${styles.input} ${
                  errors.duration ? styles.inputError : styles.inputNormal
                }`}
              />
              {errors.duration && (
                <p className={styles.errorText}>{errors.duration}</p>
              )}
            </div>

            {/* Director */}
            <div className={styles.fullWidthField}>
              <label className={styles.label}>
                Director *
              </label>
              <input
                type="text"
                value={formData.director}
                onChange={(e) => handleInputChange('director', e.target.value)}
                className={`${styles.input} ${
                  errors.director ? styles.inputError : styles.inputNormal
                }`}
                placeholder="Enter director name"
              />
              {errors.director && (
                <p className={styles.errorText}>{errors.director}</p>
              )}
            </div>

            {/* Poster URL */}
            <div className={styles.fullWidthField}>
              <label className={styles.label}>
                Poster URL *
              </label>
              <input
                type="url"
                value={formData.posterUrl}
                onChange={(e) => handleInputChange('posterUrl', e.target.value)}
                className={`${styles.input} ${
                  errors.posterUrl ? styles.inputError : styles.inputNormal
                }`}
                placeholder="https://example.com/poster.jpg"
              />
              {errors.posterUrl && (
                <p className={styles.errorText}>{errors.posterUrl}</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.actions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
            >
              {movieToEdit ? 'Update Movie' : 'Add Movie'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
