import React, { useState } from 'react';
import LoadingScreen, { 
  Spinner, 
  DotsLoader, 
  BarsLoader, 
  PulseLoader,
  Skeleton,
  CardSkeleton,
  TableSkeleton
} from './index';

const LoadingDemo: React.FC = () => {
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<'spinner' | 'dots' | 'bars' | 'pulse'>('spinner');
  const [selectedSize, setSelectedSize] = useState<'sm' | 'md' | 'lg'>('md');

  const handleProgressDemo = () => {
    setShowProgress(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setShowProgress(false), 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          Loading Screen Component Demo
        </h1>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Controls</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Variant
              </label>
              <select
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(e.target.value as any)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="spinner">Spinner</option>
                <option value="dots">Dots</option>
                <option value="bars">Bars</option>
                <option value="pulse">Pulse</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Size
              </label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value as any)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setShowFullScreen(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Show Full Screen Loader
            </button>
            
            <button
              onClick={handleProgressDemo}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Progress Demo
            </button>
          </div>
        </div>

        {/* Individual Components Demo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Spinner</h3>
            <div className="flex justify-center">
              <Spinner size={selectedSize} />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Dots</h3>
            <div className="flex justify-center">
              <DotsLoader size={selectedSize} />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Bars</h3>
            <div className="flex justify-center">
              <BarsLoader size={selectedSize} />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Pulse</h3>
            <div className="flex justify-center">
              <PulseLoader size={selectedSize} />
            </div>
          </div>
        </div>

        {/* Inline Loading Examples */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Inline Loading Examples</h2>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Spinner size="sm" />
              <span className="text-gray-700 dark:text-gray-300">Loading user data...</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <DotsLoader size="md" />
              <span className="text-gray-700 dark:text-gray-300">Processing request...</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <BarsLoader size="lg" />
              <span className="text-gray-700 dark:text-gray-300">Saving changes...</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <PulseLoader size="md" />
              <span className="text-gray-700 dark:text-gray-300">Connecting to server...</span>
            </div>
          </div>
        </div>

        {/* Skeleton Loading Examples */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Skeleton Loading Examples</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-gray-800 dark:text-white mb-3">Text Skeleton</h4>
              <Skeleton lines={3} />
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 dark:text-white mb-3">Card Skeleton</h4>
              <CardSkeleton showImage={true} lines={2} />
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 dark:text-white mb-3">Table Skeleton</h4>
              <TableSkeleton rows={3} columns={3} />
            </div>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Usage Examples</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">Basic Usage</h4>
              <code className="text-sm text-gray-600 dark:text-gray-300">
                {`<LoadingScreen message="Loading..." variant="spinner" />`}
              </code>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">With Progress</h4>
              <code className="text-sm text-gray-600 dark:text-gray-300">
                {`<LoadingScreen showProgress={true} progress={75} />`}
              </code>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">Individual Components</h4>
              <code className="text-sm text-gray-600 dark:text-gray-300">
                {`<Spinner size="lg" />
<DotsLoader message="Processing..." />
<BarsLoader size="sm" />
<PulseLoader />`}
              </code>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">Skeleton Loading</h4>
              <code className="text-sm text-gray-600 dark:text-gray-300">
                {`<Skeleton lines={3} height="h-4" />
<CardSkeleton showImage={true} lines={2} />
<TableSkeleton rows={5} columns={4} />`}
              </code>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">Inline Loading</h4>
              <code className="text-sm text-gray-600 dark:text-gray-300">
                {`<div className="flex items-center space-x-2">
  <Spinner size="sm" />
  <span>Loading...</span>
</div>`}
              </code>
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Loading Screen */}
      {showFullScreen && (
        <LoadingScreen
          message="Loading your content..."
          variant={selectedVariant}
          size={selectedSize}
          onComplete={() => setShowFullScreen(false)}
        />
      )}

      {/* Progress Loading Screen */}
      {showProgress && (
        <LoadingScreen
          message="Processing files..."
          variant={selectedVariant}
          size={selectedSize}
          showProgress={true}
          progress={progress}
          onComplete={() => setShowProgress(false)}
        />
      )}
    </div>
  );
};

export default LoadingDemo;
