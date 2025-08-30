import React from 'react';
import { MovieDashboard } from './components/MovieDashboard';

export const MoviesDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎬 Movies Feature Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            This is a demonstration of the comprehensive movie management system. 
            You can add, edit, delete, search, and filter movies with a beautiful, 
            responsive interface.
          </p>
        </div>
        
        <MovieDashboard />
      </div>
    </div>
  );
};
