// Centralized hooks for the movies management system

import { useState, useEffect } from 'react';
import { Movie, CreateMovieData } from './types';

// Mock data for initial movies
const mockMovies: Movie[] = [
  {
    id: '1',
    title: 'The Shawshank Redemption',
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    genre: 'Drama',
    releaseYear: 1994,
    rating: 9.3,
    posterUrl: 'https://images.unsplash.com/photo-1489599835387-957528d8857c?w=400&h=600&fit=crop',
    director: 'Frank Darabont',
    duration: 142,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    title: 'The Godfather',
    description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    genre: 'Crime',
    releaseYear: 1972,
    rating: 9.2,
    posterUrl: 'https://images.unsplash.com/photo-1512070679279-8988d32161be?w=400&h=600&fit=crop',
    director: 'Francis Ford Coppola',
    duration: 175,
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
  },
  {
    id: '3',
    title: 'Pulp Fiction',
    description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    genre: 'Crime',
    releaseYear: 1994,
    rating: 8.9,
    posterUrl: 'https://images.unsplash.com/photo-1489599835387-957528d8857c?w=400&h=600&fit=crop',
    director: 'Quentin Tarantino',
    duration: 154,
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
  },
  {
    id: '4',
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    genre: 'Action',
    releaseYear: 2008,
    rating: 9.0,
    posterUrl: 'https://images.unsplash.com/photo-1512070679279-8988d32161be?w=400&h=600&fit=crop',
    director: 'Christopher Nolan',
    duration: 152,
    createdAt: new Date('2024-01-04'),
    updatedAt: new Date('2024-01-04'),
  },
  {
    id: '5',
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    genre: 'Sci-Fi',
    releaseYear: 2010,
    rating: 8.8,
    posterUrl: 'https://images.unsplash.com/photo-1489599835387-957528d8857c?w=400&h=600&fit=crop',
    director: 'Christopher Nolan',
    duration: 148,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
  },
];

/**
 * Main hook for managing movies state and operations
 */
export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMovies(mockMovies);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const addMovie = (movieData: CreateMovieData) => {
    const newMovie: Movie = {
      ...movieData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setMovies(prev => [newMovie, ...prev]);
    return newMovie;
  };

  const updateMovie = (id: string, updates: Partial<CreateMovieData>) => {
    setMovies(prev => 
      prev.map(movie => 
        movie.id === id 
          ? { ...movie, ...updates, updatedAt: new Date() }
          : movie
      )
    );
  };

  const deleteMovie = (id: string) => {
    setMovies(prev => prev.filter(movie => movie.id !== id));
  };

  const getMovieById = (id: string) => {
    return movies.find(movie => movie.id === id);
  };

  const searchMovies = (query: string) => {
    if (!query.trim()) return movies;
    
    const lowercaseQuery = query.toLowerCase();
    return movies.filter(movie => 
      movie.title.toLowerCase().includes(lowercaseQuery) ||
      movie.description.toLowerCase().includes(lowercaseQuery) ||
      movie.genre.toLowerCase().includes(lowercaseQuery) ||
      movie.director.toLowerCase().includes(lowercaseQuery)
    );
  };

  const getMoviesByGenre = (genre: string) => {
    return movies.filter(movie => movie.genre === genre);
  };

  const getGenres = () => {
    const genres = [...new Set(movies.map(movie => movie.genre))];
    return genres.sort();
  };

  return {
    movies,
    loading,
    error,
    addMovie,
    updateMovie,
    deleteMovie,
    getMovieById,
    searchMovies,
    getMoviesByGenre,
    getGenres,
  };
};

/**
 * Hook for managing movie form state
 */
export const useMovieForm = (initialData?: CreateMovieData) => {
  const [formData, setFormData] = useState<CreateMovieData>({
    title: '',
    description: '',
    genre: 'Drama',
    releaseYear: new Date().getFullYear(),
    rating: 7.0,
    posterUrl: '',
    director: '',
    duration: 120,
    ...initialData,
  });

  const [errors, setErrors] = useState<Partial<CreateMovieData>>({});

  const updateField = (field: keyof CreateMovieData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

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

  const resetForm = () => {
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
    setErrors({});
  };

  return {
    formData,
    errors,
    updateField,
    validateForm,
    resetForm,
    setFormData,
  };
};

/**
 * Hook for managing movie search and filter state
 */
export const useMovieSearch = (movies: Movie[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'title' | 'rating' | 'releaseYear' | 'createdAt'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const genres = ['all', ...Array.from(new Set(movies.map(movie => movie.genre))).sort()];

  const filteredAndSortedMovies = movies
    .filter(movie => {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          movie.title.toLowerCase().includes(query) ||
          movie.description.toLowerCase().includes(query) ||
          movie.director.toLowerCase().includes(query) ||
          movie.genre.toLowerCase().includes(query)
        );
      }
      if (selectedGenre !== 'all') {
        return movie.genre === selectedGenre;
      }
      return true;
    })
    .sort((a, b) => {
      let aValue: any = a[sortBy];
      let bValue: any = b[sortBy];

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

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedGenre('all');
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedGenre,
    setSelectedGenre,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    genres,
    filteredAndSortedMovies,
    clearSearch,
  };
};

/**
 * Hook for managing modal state
 */
export const useMovieModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [movieToEdit, setMovieToEdit] = useState<Movie | null>(null);

  const openAddModal = () => {
    setMovieToEdit(null);
    setIsOpen(true);
  };

  const openEditModal = (movie: Movie) => {
    setMovieToEdit(movie);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setMovieToEdit(null);
  };

  return {
    isOpen,
    movieToEdit,
    openAddModal,
    openEditModal,
    closeModal,
  };
};

/**
 * Hook for managing delete confirmation
 */
export const useDeleteConfirmation = () => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const confirmDelete = (id: string) => {
    setShowDeleteConfirm(id);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(null);
  };

  return {
    showDeleteConfirm,
    confirmDelete,
    cancelDelete,
  };
};
