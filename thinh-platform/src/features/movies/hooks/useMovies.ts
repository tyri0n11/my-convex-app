import { useState, useEffect } from 'react';
import { Movie, CreateMovieData } from '../types';

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
