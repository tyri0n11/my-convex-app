export const styles = {
  // Main container
  container: "bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden",

  // Poster section
  posterContainer: "relative h-64 overflow-hidden",
  posterImage: "w-full h-full object-cover transition-transform duration-300 hover:scale-105",
  ratingBadge: "absolute top-3 right-3 bg-yellow-400 text-black px-2 py-1 rounded-full text-sm font-bold",
  posterOverlay: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4",
  posterTags: "text-white text-sm",
  genreTag: "bg-blue-500 px-2 py-1 rounded-full mr-2",
  yearTag: "bg-green-500 px-2 py-1 rounded-full",

  // Content section
  content: "p-6",
  title: "text-xl font-bold text-gray-800 mb-2 line-clamp-2",
  description: "text-gray-600 text-sm mb-3 line-clamp-3",

  // Movie details
  movieDetails: "space-y-2 mb-4",
  detailItem: "flex items-center text-sm text-gray-500",
  detailLabel: "font-medium mr-2",
  detailValue: "",

  // Action buttons
  actions: "flex gap-2",
  editButton: "flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium",
  deleteButton: "flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium",
};
