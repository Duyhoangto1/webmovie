import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Star, Users } from 'lucide-react';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { MovieDetails, Cast } from '../types/movie';
import { fetchMovieDetails, fetchMovieCredits, getImageUrl } from '../services/api';

export const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMovieDetails = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      
      const [movieDetails, movieCast] = await Promise.all([
        fetchMovieDetails(parseInt(id)),
        fetchMovieCredits(parseInt(id))
      ]);
      
      setMovie(movieDetails);
      setCast(movieCast);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load movie details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovieDetails();
  }, [id]);

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner size="lg" className="py-12" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage message={error} onRetry={loadMovieDetails} />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage message="Movie not found" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Backdrop */}
      <div 
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(${getImageUrl(movie.backdrop_path, 'w1280')})`
        }}
      >
        <div className="container mx-auto px-4 py-8 h-full flex items-end">
          <Link
            to="/"
            className="absolute top-8 left-4 flex items-center space-x-2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg hover:bg-opacity-75 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0">
            <img
              src={getImageUrl(movie.poster_path, 'w500')}
              alt={movie.title}
              className="w-72 h-auto rounded-lg shadow-2xl mx-auto lg:mx-0"
            />
          </div>

          {/* Movie Info */}
          <div className="flex-1 lg:pt-24">
            <h1 className="text-4xl font-bold text-white mb-2">{movie.title}</h1>
            
            {movie.tagline && (
              <p className="text-tmdb-light-gray italic text-lg mb-4">"{movie.tagline}"</p>
            )}

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center space-x-1 bg-tmdb-dark-gray px-3 py-1 rounded-full">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-white font-semibold">{formatRating(movie.vote_average)}</span>
                <span className="text-tmdb-light-gray">({movie.vote_count} votes)</span>
              </div>
              
              <div className="flex items-center space-x-1 text-tmdb-light-gray">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(movie.release_date)}</span>
              </div>
              
              <div className="flex items-center space-x-1 text-tmdb-light-gray">
                <Clock className="w-5 h-5" />
                <span>{formatRuntime(movie.runtime)}</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {movie.genres.map(genre => (
                  <span
                    key={genre.id}
                    className="bg-tmdb-red text-white px-3 py-1 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Overview</h2>
              <p className="text-tmdb-light-gray text-lg leading-relaxed">
                {movie.overview}
              </p>
            </div>

            {/* Cast */}
            {cast.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Users className="w-6 h-6 text-tmdb-red" />
                  <h2 className="text-2xl font-semibold text-white">Cast</h2>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {cast.map(actor => (
                    <div key={actor.id} className="text-center">
                      <img
                        src={getImageUrl(actor.profile_path, 'w185')}
                        alt={actor.name}
                        className="w-24 h-24 rounded-full object-cover mx-auto mb-2"
                      />
                      <p className="text-white font-medium text-sm">{actor.name}</p>
                      <p className="text-tmdb-light-gray text-xs">{actor.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};