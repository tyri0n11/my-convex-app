import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  message?: string;
  variant?: 'spinner' | 'dots' | 'bars' | 'pulse';
  size?: 'sm' | 'md' | 'lg';
  showProgress?: boolean;
  progress?: number;
  onComplete?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = 'Loading...',
  variant = 'spinner',
  size = 'md',
  showProgress = false,
  progress = 0,
  onComplete
}) => {
  const [currentProgress, setCurrentProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (showProgress && progress > 0) {
      setCurrentProgress(progress);
      if (progress >= 100 && onComplete) {
        setTimeout(() => {
          setIsVisible(false);
          onComplete();
        }, 500);
      }
    }
  }, [progress, showProgress, onComplete]);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const renderSpinner = () => (
    <div className={`${sizeClasses[size]} border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin`} />
  );

  const renderDots = () => (
    <div className="flex space-x-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'} bg-blue-500 rounded-full animate-bounce`}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );

  const renderBars = () => (
    <div className="flex space-x-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={`${size === 'sm' ? 'w-1 h-4' : size === 'md' ? 'w-1.5 h-6' : 'w-2 h-8'} bg-blue-500 animate-pulse`}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );

  const renderPulse = () => (
    <div className={`${sizeClasses[size]} bg-blue-500 rounded-full animate-ping`} />
  );

  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return renderDots();
      case 'bars':
        return renderBars();
      case 'pulse':
        return renderPulse();
      default:
        return renderSpinner();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 text-center">
        {/* Logo or Icon */}
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="flex justify-center mb-6">
          {renderLoader()}
        </div>

        {/* Message */}
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          {message}
        </h3>
        
        {/* Subtitle */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          Please wait while we prepare everything for you
        </p>

        {/* Progress Bar */}
        {showProgress && (
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${currentProgress}%` }}
            />
          </div>
        )}

        {/* Progress Text */}
        {showProgress && (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {Math.round(currentProgress)}% complete
          </p>
        )}

        {/* Optional: Cancel Button */}
        <button
          className="mt-6 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          onClick={() => setIsVisible(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

// Export individual loading components for specific use cases
export const Spinner: React.FC<Omit<LoadingScreenProps, 'variant'>> = (props) => (
  <LoadingScreen {...props} variant="spinner" />
);

export const DotsLoader: React.FC<Omit<LoadingScreenProps, 'variant'>> = (props) => (
  <LoadingScreen {...props} variant="dots" />
);

export const BarsLoader: React.FC<Omit<LoadingScreenProps, 'variant'>> = (props) => (
  <LoadingScreen {...props} variant="bars" />
);

export const PulseLoader: React.FC<Omit<LoadingScreenProps, 'variant'>> = (props) => (
  <LoadingScreen {...props} variant="pulse" />
);

export default LoadingScreen;
