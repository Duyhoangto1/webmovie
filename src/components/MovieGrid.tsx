import React from 'react';
import { MovieCard } from './MovieCard';
import { Movie } from '../types/movie';

interface MovieGridProps {
  movies: Movie[];
  className?: string;
}

export const MovieGrid: React.FC<MovieGridProps> = ({ movies, className = "" }) => {
  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-tmdb-light-gray text-lg">No movies found</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} className="fade-in" />
      ))}
    </div>
  );
};