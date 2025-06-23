import { Movie, MovieDetails, Cast, ApiResponse, ApiError } from '../types/movie';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// If no API key is provided, use a demo key that will show error messages
const DEMO_API_KEY = 'demo_key_please_replace';

export const getApiKey = () => API_KEY || DEMO_API_KEY;

export const getImageUrl = (path: string | null, size: string = 'w500'): string => {
  if (!path) return '/placeholder-movie.jpg';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

const handleApiResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData: ApiError = await response.json().catch(() => ({
      success: false,
      status_code: response.status,
      status_message: response.statusText
    }));
    
    if (response.status === 401) {
      throw new Error('Invalid API key. Please check your TMDb API key configuration.');
    }
    
    throw new Error(errorData.status_message || 'API request failed');
  }

  return response.json();
};

export const fetchTrendingMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/movie/week?api_key=${getApiKey()}&page=1`
    );
    
    const data: ApiResponse<Movie> = await handleApiResponse(response);
    return data.results.slice(0, 20);
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

export const searchMovies = async (query: string, page: number = 1): Promise<Movie[]> => {
  if (!query.trim()) return [];

  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${getApiKey()}&query=${encodeURIComponent(query)}&page=${page}`
    );
    
    const data: ApiResponse<Movie> = await handleApiResponse(response);
    return data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const fetchMovieDetails = async (movieId: number): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${getApiKey()}&append_to_response=credits`
    );
    
    return handleApiResponse<MovieDetails>(response);
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const fetchMovieCredits = async (movieId: number): Promise<Cast[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/credits?api_key=${getApiKey()}`
    );
    
    const data = await handleApiResponse<{ cast: Cast[] }>(response);
    return data.cast.slice(0, 10); // Return top 10 cast members
  } catch (error) {
    console.error('Error fetching movie credits:', error);
    throw error;
  }
};