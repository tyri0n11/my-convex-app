export const styles = {
  // Main container
  container: "min-h-screen bg-gradient-to-br from-gray-50 to-gray-100",

  // Header section
  header: "bg-white shadow-sm border-b",
  headerContent: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between",
  title: "text-3xl font-bold text-gray-900",
  subtitle: "mt-2 text-gray-600",
  addButton: "mt-4 sm:mt-0 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200",
  addButtonIcon: "w-5 h-5 mr-2",

  // Stats section
  statsContainer: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6",
  statsGrid: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-8",
  statCard: "bg-white rounded-xl shadow-lg p-6",
  statContent: "flex items-center",
  statIcon: "flex-shrink-0",
  statIconContainer: "w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center",
  statIconSvg: "w-5 h-5 text-white",
  statText: "ml-4",
  statLabel: "text-sm font-medium text-gray-600",
  statValue: "text-2xl font-bold text-gray-900",

  // Loading states
  loadingContainer: "min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center",
  loadingContent: "text-center",
  loadingSpinner: "animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4",
  loadingText: "text-gray-600 text-lg",

  // Error states
  errorContainer: "min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center",
  errorContent: "text-center",
  errorIcon: "text-6xl mb-4",
  errorTitle: "text-xl font-semibold text-gray-800 mb-2",
  errorText: "text-gray-600",

  // Delete confirmation modal
  deleteOverlay: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",
  deleteModal: "bg-white rounded-xl shadow-2xl max-w-md w-full p-6",
  deleteContent: "text-center",
  deleteIcon: "text-6xl mb-4",
  deleteTitle: "text-xl font-semibold text-gray-800 mb-2",
  deleteText: "text-gray-600 mb-6",
  deleteActions: "flex gap-3",
  deleteCancelButton: "flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200",
  deleteConfirmButton: "flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 font-medium",
};
