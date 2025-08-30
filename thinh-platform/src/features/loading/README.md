# Loading Screen Component

A modern, responsive loading screen component built with React and Tailwind CSS. Features multiple loading animations, progress tracking, skeleton loading, and dark mode support.

## Features

- 🎨 **Multiple Loading Variants**: Spinner, dots, bars, and pulse animations
- 📱 **Responsive Design**: Works on all screen sizes
- 🌙 **Dark Mode Support**: Automatically adapts to system preferences
- 📊 **Progress Tracking**: Optional progress bar with percentage display
- 🎯 **Customizable**: Size, message, and variant options
- ♿ **Accessible**: Proper ARIA labels and keyboard navigation
- 🚀 **Performance**: Optimized animations and minimal re-renders
- 💀 **Skeleton Loading**: Content placeholders for better UX
- 🔧 **Flexible Usage**: Full-screen overlays or inline components

## Installation

The component is already included in your project. Simply import it from the loading feature directory:

```tsx
import LoadingScreen from './features/loading';
```

## Basic Usage

### Simple Loading Screen

```tsx
import LoadingScreen from './features/loading';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      {isLoading && (
        <LoadingScreen 
          message="Loading your content..." 
          variant="spinner" 
        />
      )}
      
      <button onClick={() => setIsLoading(true)}>
        Start Loading
      </button>
    </div>
  );
}
```

### With Progress Tracking

```tsx
import LoadingScreen from './features/loading';

function App() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleProgress = () => {
    setIsLoading(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div>
      {isLoading && (
        <LoadingScreen
          message="Processing files..."
          variant="dots"
          showProgress={true}
          progress={progress}
          onComplete={() => setIsLoading(false)}
        />
      )}
      
      <button onClick={handleProgress}>
        Start Processing
      </button>
    </div>
  );
}
```

### Inline Loading

```tsx
import { Spinner, DotsLoader } from './features/loading';

function App() {
  return (
    <div className="flex items-center space-x-2">
      <Spinner size="sm" />
      <span>Loading user data...</span>
    </div>
  );
}
```

## Component Variants

### 1. Spinner (Default)
A classic spinning circle animation.

```tsx
<LoadingScreen variant="spinner" />
```

### 2. Dots
Three bouncing dots with staggered animation.

```tsx
<LoadingScreen variant="dots" />
```

### 3. Bars
Five animated bars with wave effect.

```tsx
<LoadingScreen variant="bars" />
```

### 4. Pulse
A pulsing circle animation.

```tsx
<LoadingScreen variant="pulse" />
```

## Individual Components

For specific use cases, you can import individual loading components that render inline (not full-screen):

```tsx
import { Spinner, DotsLoader, BarsLoader, PulseLoader } from './features/loading';

// Use individual components inline
<Spinner size="lg" />
<DotsLoader message="Processing..." />
<BarsLoader size="sm" />
<PulseLoader />
```

## Skeleton Loading Components

### Basic Skeleton
Simple text placeholder with configurable lines and height:

```tsx
import { Skeleton } from './features/loading';

<Skeleton lines={3} height="h-4" />
```

### Card Skeleton
Card layout with optional image placeholder:

```tsx
import { CardSkeleton } from './features/loading';

<CardSkeleton showImage={true} lines={2} />
```

### Table Skeleton
Table layout with configurable rows and columns:

```tsx
import { TableSkeleton } from './features/loading';

<TableSkeleton rows={5} columns={4} />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `message` | `string` | `"Loading..."` | Custom loading message |
| `variant` | `'spinner' \| 'dots' \| 'bars' \| 'pulse'` | `'spinner'` | Loading animation style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the loading animation |
| `showProgress` | `boolean` | `false` | Whether to show progress bar |
| `progress` | `number` | `0` | Progress percentage (0-100) |
| `onComplete` | `() => void` | `undefined` | Callback when progress reaches 100% |
| `fullScreen` | `boolean` | `true` | Whether to render as full-screen overlay |
| `className` | `string` | `''` | Additional CSS classes |

## Size Options

- **`sm`**: Small (32x32px for spinner/pulse, 8x16px for bars, 8x8px for dots)
- **`md`**: Medium (48x48px for spinner/pulse, 12x24px for bars, 12x12px for dots)
- **`lg`**: Large (64x64px for spinner/pulse, 16x32px for bars, 16x16px for dots)

## Skeleton Component Props

### Skeleton
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `lines` | `number` | `1` | Number of skeleton lines |
| `height` | `string` | `'h-4'` | Height of skeleton lines |
| `className` | `string` | `''` | Additional CSS classes |

### CardSkeleton
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showImage` | `boolean` | `true` | Whether to show image placeholder |
| `lines` | `number` | `3` | Number of text skeleton lines |
| `className` | `string` | `''` | Additional CSS classes |

### TableSkeleton
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rows` | `number` | `5` | Number of table rows |
| `columns` | `number` | `4` | Number of table columns |
| `className` | `string` | `''` | Additional CSS classes |

## Styling

The component uses Tailwind CSS classes and automatically adapts to your project's color scheme. It includes:

- Backdrop blur effect
- Smooth transitions and animations
- Gradient backgrounds
- Responsive design
- Dark mode support
- Skeleton loading animations

## Examples

### Full Screen Loading

```tsx
<LoadingScreen
  message="Initializing application..."
  variant="spinner"
  size="lg"
/>
```

### Inline Loading

```tsx
<div className="flex items-center space-x-2">
  <Spinner size="sm" />
  <span>Loading data...</span>
</div>
```

### Progress Loading

```tsx
<LoadingScreen
  message="Uploading files..."
  variant="dots"
  showProgress={true}
  progress={uploadProgress}
  onComplete={() => console.log('Upload complete!')}
/>
```

### Skeleton Loading

```tsx
// Text content
<Skeleton lines={3} height="h-4" />

// Card layout
<CardSkeleton showImage={true} lines={2} />

// Table layout
<TableSkeleton rows={5} columns={4} />
```

### Mixed Usage

```tsx
function UserProfile({ user, isLoading }) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Spinner size="sm" />
          <span>Loading profile...</span>
        </div>
        <CardSkeleton showImage={true} lines={3} />
      </div>
    );
  }

  return <UserProfileContent user={user} />;
}
```

## Demo

To see all variants in action, you can import and use the demo component:

```tsx
import LoadingDemo from './features/loading/demo';

function App() {
  return <LoadingDemo />;
}
```

## Customization

The component is built with Tailwind CSS, making it easy to customize. You can modify the colors, sizes, and animations by updating the Tailwind classes in the component.

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- Tailwind CSS v3+
- React 16.8+ (hooks support required)

## Performance

- Minimal bundle size
- Optimized animations using CSS transforms
- Efficient re-rendering with React hooks
- Lazy loading support ready
- Skeleton components for better perceived performance

## Accessibility

- Proper ARIA labels for screen readers
- Role attributes for loading states
- Keyboard navigation support
- Semantic HTML structure

## Contributing

Feel free to extend the component with additional variants, animations, or features. The modular design makes it easy to add new loading styles and skeleton layouts.
