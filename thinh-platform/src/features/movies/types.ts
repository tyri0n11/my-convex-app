export interface Movie {
  id: string;
  title: string;
  description: string;
  genre: string;
  releaseYear: number;
  rating: number;
  posterUrl: string;
  director: string;
  duration: number; // in minutes
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateMovieData {
  title: string;
  description: string;
  genre: string;
  releaseYear: number;
  rating: number;
  posterUrl: string;
  director: string;
  duration: number;
}
