import React, { useState, useEffect } from 'react';
import { RefreshCw, TrendingUp } from 'lucide-react';
import { MovieGrid } from '../components/MovieGrid';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { Movie } from '../types/movie';
import { fetchTrendingMovies } from '../services/api';

export const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTrendingMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const trendingMovies = await fetchTrendingMovies();
      setMovies(trendingMovies);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load trending movies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  const handleRefresh = () => {
    loadTrendingMovies();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <TrendingUp className="w-8 h-8 text-tmdb-red" />
          <h1 className="text-3xl font-bold text-white">Trending Movies</h1>
        </div>
        
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="flex items-center space-x-2 bg-tmdb-red hover:bg-tmdb-red-dark disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-colors"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {loading && <LoadingSpinner size="lg" className="py-12" />}
      
      {error && (
        <ErrorMessage 
          message={error} 
          onRetry={handleRefresh}
        />
      )}
      
      {!loading && !error && (
        <MovieGrid movies={movies} />
      )}
    </div>
  );
};