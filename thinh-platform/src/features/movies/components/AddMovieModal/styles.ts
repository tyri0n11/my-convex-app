export const styles = {
  // Modal overlay
  overlay: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",

  // Modal container
  modal: "bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto",

  // Header section
  header: "p-6 border-b border-gray-200",
  headerContent: "flex items-center justify-between",
  title: "text-2xl font-bold text-gray-800",
  closeButton: "text-gray-400 hover:text-gray-600 text-2xl font-bold",

  // Form section
  form: "p-6 space-y-6",
  formGrid: "grid grid-cols-1 md:grid-cols-2 gap-6",
  fullWidthField: "md:col-span-2",

  // Form elements
  label: "block text-sm font-medium text-gray-700 mb-2",
  input: "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
  inputNormal: "border-gray-300",
  inputError: "border-red-500",
  textarea: "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
  select: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",

  // Error messages
  errorText: "text-red-500 text-sm mt-1",

  // Action buttons
  actions: "flex gap-3 pt-4 border-t border-gray-200",
  cancelButton: "flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200",
  submitButton: "flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 font-medium",
};
