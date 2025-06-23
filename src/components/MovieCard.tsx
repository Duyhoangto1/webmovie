import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Star } from 'lucide-react';
import { Movie } from '../types/movie';
import { getImageUrl } from '../services/api';

interface MovieCardProps {
  movie: Movie;
  className?: string;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, className = "" }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).getFullYear();
  };

  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  return (
    <Link
      to={`/movie/${movie.id}`}
      className={`movie-card-hover block bg-tmdb-dark-gray rounded-lg overflow-hidden ${className}`}
    >
      <div className="relative">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="w-full h-80 object-cover"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 bg-black bg-opacity-75 px-2 py-1 rounded flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-white text-sm">{formatRating(movie.vote_average)}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2 leading-tight">
          {movie.title}
        </h3>
        
        <div className="flex items-center text-tmdb-light-gray text-sm mb-2">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{formatDate(movie.release_date)}</span>
        </div>
        
        <p className="text-tmdb-light-gray text-sm line-clamp-3">
          {movie.overview}
        </p>
      </div>
    </Link>
  );
};