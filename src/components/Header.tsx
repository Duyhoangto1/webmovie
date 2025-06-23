import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, Home, Search } from 'lucide-react';

export const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-tmdb-dark border-b border-tmdb-medium-gray">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Film className="w-8 h-8 text-tmdb-red" />
            <span className="text-2xl font-bold text-white">Movie Explorer</span>
          </Link>
          
          <nav className="flex items-center space-x-6">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                isActive('/') 
                  ? 'bg-tmdb-red text-white' 
                  : 'text-tmdb-light-gray hover:text-white hover:bg-tmdb-medium-gray'
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
            
            <Link
              to="/search"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                isActive('/search') 
                  ? 'bg-tmdb-red text-white' 
                  : 'text-tmdb-light-gray hover:text-white hover:bg-tmdb-medium-gray'
              }`}
            >
              <Search className="w-5 h-5" />
              <span>Search</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};