# Movie Components

This directory contains all the movie-related React components, organized into separate folders for better maintainability and separation of concerns.

## Folder Structure

Each component is organized into its own folder with the following structure:

```
ComponentName/
├── index.tsx      # Main component logic
├── styles.ts      # Tailwind CSS classes and styling
└── README.md      # Component-specific documentation (if needed)
```

## Components

### 1. MovieList
**Location**: `./MovieList/`
**Purpose**: Displays a searchable, filterable, and sortable list of movies
**Features**:
- Search functionality (title, description, director, genre)
- Genre filtering
- Multiple sorting options (date, title, rating, year)
- Responsive grid layout
- Empty state handling

### 2. AddMovieModal
**Location**: `./AddMovieModal/`
**Purpose**: Modal form for adding and editing movies
**Features**:
- Form validation
- Edit mode support
- Genre selection dropdown
- Responsive form layout
- Error handling and display

### 3. MovieDashboard
**Location**: `./MovieDashboard/`
**Purpose**: Main dashboard component that orchestrates all movie functionality
**Features**:
- Statistics display (total movies, average rating, genres, latest addition)
- Loading and error states
- Delete confirmation modal
- Integration with movie hooks and state management

### 4. MovieCard
**Location**: `./MovieCard/`
**Purpose**: Individual movie display card
**Features**:
- Movie poster with overlay information
- Rating badge
- Genre and year tags
- Movie details (director, duration, date added)
- Edit and delete actions

## Benefits of This Structure

### 🎯 **Separation of Concerns**
- **Logic**: Component logic is isolated in `index.tsx`
- **Styling**: All Tailwind classes are organized in `styles.ts`
- **Documentation**: Component-specific docs in `README.md`

### 🔧 **Maintainability**
- Easy to locate and modify specific aspects of components
- Clear separation between business logic and presentation
- Consistent structure across all components

### 🎨 **Styling Management**
- Centralized styling in dedicated files
- Easy to update design system
- Better collaboration between developers and designers

### 📱 **Reusability**
- Styles can be easily shared between components
- Consistent design patterns across the application
- Easy to create component variants

## Usage

### Importing Components
```tsx
import { MovieList, AddMovieModal, MovieDashboard, MovieCard } from './components';
```

### Importing Individual Components
```tsx
import { MovieList } from './components/MovieList';
import { styles } from './components/MovieList/styles';
```

### Using Styles
```tsx
import { styles } from './styles';

// In your component
<div className={styles.container}>
  <h1 className={styles.title}>Movie Title</h1>
</div>
```

## Styling Convention

Each `styles.ts` file follows a consistent pattern:

```typescript
export const styles = {
  // Main container
  container: "base-classes",
  
  // Section-specific styles
  sectionName: "section-classes",
  
  // Element-specific styles
  elementName: "element-classes",
  
  // State-specific styles
  elementState: "state-classes",
};
```

## Adding New Components

When adding new components, follow this structure:

1. Create a new folder: `NewComponent/`
2. Add `index.tsx` with component logic
3. Add `styles.ts` with Tailwind classes
4. Update the main `index.ts` to export the component
5. Add component documentation if needed

## Best Practices

- Keep component logic focused and single-purpose
- Use descriptive names for style properties
- Group related styles together in `styles.ts`
- Maintain consistent naming conventions
- Document complex styling decisions
- Use TypeScript for better type safety

## Dependencies

- **React**: Component framework
- **TypeScript**: Type safety and better development experience
- **Tailwind CSS**: Utility-first CSS framework
- **Movie Types**: Shared type definitions from `../types`
- **Movie Hooks**: Custom hooks from `../hooks`
