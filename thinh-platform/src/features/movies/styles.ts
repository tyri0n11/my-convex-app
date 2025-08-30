// Movies Feature Styles
// Centralized styling for the movies management system

export const movieStyles = {
  // Container styles
  container: "min-h-screen bg-gradient-to-br from-gray-50 to-gray-100",
  
  // Header styles
  header: "bg-white shadow-sm border-b",
  headerContent: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6",
  headerTitle: "text-3xl font-bold text-gray-900",
  headerSubtitle: "mt-2 text-gray-600",
  addButton: "mt-4 sm:mt-0 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200",
  
  // Stats grid styles
  statsContainer: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6",
  statsGrid: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-8",
  statCard: "bg-white rounded-xl shadow-lg p-6",
  statIcon: "w-8 h-8 rounded-lg flex items-center justify-center",
  statContent: "ml-4",
  statLabel: "text-sm font-medium text-gray-600",
  statValue: "text-2xl font-bold text-gray-900",
  
  // Search and filter styles
  searchContainer: "bg-white rounded-xl shadow-lg p-6",
  searchGrid: "grid grid-cols-1 md:grid-cols-4 gap-4",
  searchInput: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
  searchSelect: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
  sortButtons: "mt-4 flex flex-wrap gap-2",
  sortButton: "px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200",
  sortButtonActive: "bg-blue-500 text-white",
  sortButtonInactive: "bg-gray-100 text-gray-700 hover:bg-gray-200",
  
  // Results info styles
  resultsInfo: "flex items-center justify-between",
  resultsCount: "text-gray-600",
  clearSearch: "text-blue-500 hover:text-blue-600 text-sm font-medium",
  
  // Movie grid styles
  movieGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
  emptyState: "text-center py-12",
  emptyIcon: "text-6xl mb-4",
  emptyTitle: "text-xl font-semibold text-gray-800 mb-2",
  emptyDescription: "text-gray-600",
  
  // Modal styles
  modalOverlay: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",
  modalContainer: "bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto",
  modalHeader: "p-6 border-b border-gray-200",
  modalTitle: "text-2xl font-bold text-gray-800",
  modalCloseButton: "text-gray-400 hover:text-gray-600 text-2xl font-bold",
  modalForm: "p-6 space-y-6",
  modalGrid: "grid grid-cols-1 md:grid-cols-2 gap-6",
  modalFullWidth: "md:col-span-2",
  modalLabel: "block text-sm font-medium text-gray-700 mb-2",
  modalInput: "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
  modalInputError: "border-red-500",
  modalError: "text-red-500 text-sm mt-1",
  modalActions: "flex gap-3 pt-4 border-t border-gray-200",
  modalButton: "flex-1 px-4 py-2 rounded-lg transition-colors duration-200 font-medium",
  modalButtonPrimary: "bg-blue-500 hover:bg-blue-600 text-white",
  modalButtonSecondary: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  
  // Confirmation modal styles
  confirmModal: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",
  confirmContainer: "bg-white rounded-xl shadow-2xl max-w-md w-full p-6",
  confirmIcon: "text-6xl mb-4",
  confirmTitle: "text-xl font-semibold text-gray-800 mb-2",
  confirmMessage: "text-gray-600 mb-6",
  confirmActions: "flex gap-3",
  confirmButton: "flex-1 px-4 py-2 rounded-lg transition-colors duration-200",
  confirmButtonDanger: "bg-red-500 hover:bg-red-600 text-white font-medium",
  confirmButtonCancel: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  
  // Loading and error states
  loadingContainer: "min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center",
  loadingSpinner: "animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4",
  loadingText: "text-gray-600 text-lg",
  errorContainer: "min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center",
  errorIcon: "text-6xl mb-4",
  errorTitle: "text-xl font-semibold text-gray-800 mb-2",
  errorMessage: "text-gray-600",
};

export const movieCardStyles = {
  // Card container
  container: "bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden",
  
  // Poster section
  posterContainer: "relative h-64 overflow-hidden",
  posterImage: "w-full h-full object-cover transition-transform duration-300 hover:scale-105",
  ratingBadge: "absolute top-3 right-3 bg-yellow-400 text-black px-2 py-1 rounded-full text-sm font-bold",
  posterOverlay: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4",
  genreBadge: "text-white text-sm",
  genreBadgeBlue: "bg-blue-500 px-2 py-1 rounded-full mr-2",
  genreBadgeGreen: "bg-green-500 px-2 py-1 rounded-full",
  
  // Content section
  content: "p-6",
  title: "text-xl font-bold text-gray-800 mb-2 line-clamp-2",
  description: "text-gray-600 text-sm mb-3 line-clamp-3",
  infoGrid: "space-y-2 mb-4",
  infoRow: "flex items-center text-sm text-gray-500",
  infoLabel: "font-medium mr-2",
  
  // Action buttons
  actions: "flex gap-2",
  button: "flex-1 px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium",
  editButton: "bg-blue-500 hover:bg-blue-600 text-white",
  deleteButton: "bg-red-500 hover:bg-red-600 text-white",
};

export const movieFormStyles = {
  // Form grid
  formGrid: "grid grid-cols-1 md:grid-cols-2 gap-6",
  fullWidth: "md:col-span-2",
  
  // Form fields
  field: "space-y-2",
  label: "block text-sm font-medium text-gray-700 mb-2",
  input: "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
  inputError: "border-red-500",
  textarea: "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
  select: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
  error: "text-red-500 text-sm mt-1",
  
  // Form actions
  actions: "flex gap-3 pt-4 border-t border-gray-200",
  button: "flex-1 px-4 py-2 rounded-lg transition-colors duration-200",
  primaryButton: "bg-blue-500 hover:bg-blue-600 text-white font-medium",
  secondaryButton: "border border-gray-300 text-gray-700 hover:bg-gray-50",
};
