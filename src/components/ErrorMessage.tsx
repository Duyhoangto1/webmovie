import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  onRetry, 
  className = "" 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
      <AlertTriangle className="w-16 h-16 text-tmdb-red mb-4" />
      <h3 className="text-xl font-semibold text-white mb-2">Something went wrong</h3>
      <p className="text-tmdb-light-gray text-center mb-6 max-w-md">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center space-x-2 bg-tmdb-red hover:bg-tmdb-red-dark text-white px-6 py-3 rounded-lg transition-colors"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};