export const styles = {
  // Main container
  container: "space-y-6",

  // Controls section
  controlsContainer: "bg-white rounded-xl shadow-lg p-6",
  controlsGrid: "grid grid-cols-1 md:grid-cols-4 gap-4",
  searchContainer: "md:col-span-2",

  // Form elements
  label: "block text-sm font-medium text-gray-700 mb-2",
  searchInput: "w-full px-3 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
  selectInput: "w-full px-3 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",

  // Sort options
  sortOptions: "mt-4 flex flex-wrap gap-2",
  sortLabel: "text-sm font-medium text-gray-700 mr-2",
  sortButton: "px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200",
  sortButtonActive: "bg-blue-500 text-white",
  sortButtonInactive: "bg-gray-100 text-gray-700 hover:bg-gray-200",

  // Results section
  resultsContainer: "flex items-center justify-between",
  resultsText: "text-gray-600",
  clearSearchButton: "text-blue-500 hover:text-blue-600 text-sm font-medium",

  // Empty state
  emptyState: "text-center py-12",
  emptyStateIcon: "text-6xl mb-4",
  emptyStateTitle: "text-xl font-semibold text-gray-800 mb-2",
  emptyStateText: "text-gray-600",

  // Movies grid
  moviesGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
};
