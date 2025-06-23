import React, { useState, useCallback } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { MovieGrid } from '../components/MovieGrid';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { Movie } from '../types/movie';
import { searchMovies } from '../services/api';

export const SearchPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(async (searchQuery: string) => {
    setQuery(searchQuery);
    
    if (!searchQuery.trim()) {
      setMovies([]);
      setHasSearched(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setHasSearched(true);
      
      const results = await searchMovies(searchQuery);
      setMovies(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRetry = () => {
    if (query) {
      handleSearch(query);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center space-x-3 mb-8">
        <SearchIcon className="w-8 h-8 text-tmdb-red" />
        <h1 className="text-3xl font-bold text-white">Search Movies</h1>
      </div>

      <SearchBar 
        onSearch={handleSearch}
        className="mb-8"
        placeholder="Search for movies by title..."
      />

      {!hasSearched && !loading && (
        <div className="text-center py-12">
          <SearchIcon className="w-16 h-16 text-tmdb-light-gray mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Start searching</h3>
          <p className="text-tmdb-light-gray">
            Enter a movie title to discover amazing films
          </p>
        </div>
      )}

      {loading && <LoadingSpinner size="lg" className="py-12" />}
      
      {error && (
        <ErrorMessage 
          message={error} 
          onRetry={handleRetry}
        />
      )}
      
      {!loading && !error && hasSearched && (
        <>
          {movies.length > 0 && (
            <div className="mb-6">
              <p className="text-tmdb-light-gray">
                Found {movies.length} result{movies.length !== 1 ? 's' : ''} for "{query}"
              </p>
            </div>
          )}
          <MovieGrid movies={movies} />
        </>
      )}
    </div>
  );
};