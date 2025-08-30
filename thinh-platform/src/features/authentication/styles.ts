export const authStyles = {
  // Layout
  container: "min-h-screen flex",
  leftSection: "flex-1 bg-blue-600 flex flex-col justify-center px-12 text-white",
  rightSection: "flex-1 bg-white flex flex-col justify-center px-12",
  
  // Logo
  logo: "flex items-center gap-3 mb-8",
  logoIcon: "w-8 h-8 border-2 border-white rounded",
  logoText: "text-2xl font-bold",
  
  // Left section content
  headline: "text-4xl font-bold mb-4 leading-tight",
  description: "text-lg opacity-90",
  
  // Right section content
  welcomeTitle: "text-3xl font-bold text-gray-900 mb-2 text-center",
  welcomeSubtitle: "text-gray-600 mb-8 text-center",
  
  // Form
  form: "space-y-6",
  inputGroup: "space-y-2",
  label: "block text-sm font-medium text-gray-700",
  input: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black",
  passwordContainer: "relative",
  eyeIcon: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer",
  
  // Options
  options: "flex items-center justify-between",
  checkbox: "flex items-center",
  checkboxInput: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded",
  checkboxLabel: "ml-2 text-sm text-gray-700",
  forgotPassword: "text-sm text-blue-600 hover:text-blue-500",
  
  // Buttons
  loginButton: "w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors",
  signOutButton: "px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-md active:scale-95",
  
  // Divider
  divider: "relative my-6",
  dividerLine: "absolute inset-0 flex items-center",
  dividerBorder: "w-full border-t border-gray-300",
  dividerText: "relative flex justify-center text-sm",
  dividerSpan: "px-2 bg-white text-gray-500",
  
  // Social login
  socialContainer: "space-y-3",
  googleButton: "cursor-pointer w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors",
  
  // Register link
  registerContainer: "text-center mt-8",
  registerText: "text-gray-600",
  registerLink: "text-blue-600 cursor-pointer hover:text-blue-500 font-medium"
} as const;
