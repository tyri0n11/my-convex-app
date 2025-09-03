"use client";

import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { SignOutButton } from "../../authentication";
import "./Header.css";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const progress = Math.min(scrollTop / (documentHeight - windowHeight), 1);
      
      setIsScrolled(scrollTop > 20);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-500 ease-out
        ${isScrolled 
          ? 'bg-white/85 dark:bg-slate-900/85 backdrop-blur-lg shadow-xl border-b border-slate-200/60 dark:border-slate-700/60' 
          : 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-transparent'
        }
      `}
      style={{
        transform: `translateY(${isScrolled ? 0 : scrollProgress * -5}px)`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo/Brand Section */}
          <div className="flex items-center space-x-3">
            <div className={`
              header-logo transition-all duration-500 ease-out
              ${isScrolled ? 'scale-85' : 'scale-100'}
            `}>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden">
                <span className="text-white font-bold text-lg relative z-10">T</span>
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  style={{
                    transform: `translateX(${scrollProgress * 100 - 100}%)`,
                    transition: 'transform 0.1s ease-out'
                  }}
                />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className={`
                font-bold text-xl sm:text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent
                transition-all duration-500 ease-out
                ${isScrolled ? 'opacity-75 scale-90' : 'opacity-100 scale-100'}
              `}>
                Thinh Platform
              </h1>
              <p className={`
                text-xs text-slate-500 dark:text-slate-400
                transition-all duration-500 ease-out
                ${isScrolled ? 'opacity-50' : 'opacity-100'}
              `}>
                Building the future
              </p>
            </div>
          </div>

          {/* Desktop Navigation Section */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/dashboard"
              className={({ isActive }) => `header-nav-item transition-all duration-300 ease-out font-medium group ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'}`}
            >
              <span className="relative">
                Dashboard
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </NavLink>
            <NavLink
              to="/movies"
              className={({ isActive }) => `header-nav-item transition-all duration-300 ease-out font-medium group ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'}`}
            >
              <span className="relative">
                Movies
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </NavLink>
            <NavLink
              to="/notes"
              className={({ isActive }) => `header-nav-item transition-all duration-300 ease-out font-medium group ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'}`}
            >
              <span className="relative">
                Notes
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </NavLink>
            <a href="#" className="header-nav-item text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 ease-out font-medium group">
              <span className="relative">
                Analytics
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </a>
            <a href="#" className="header-nav-item text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 ease-out font-medium group">
              <span className="relative">
                Settings
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </a>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Notification Bell - Hidden on mobile */}
            <button className={`
              hidden sm:block p-2 rounded-full text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400
              hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 ease-out
              ${isScrolled ? 'scale-85' : 'scale-100'}
              hover:scale-110 hover:rotate-12
            `}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M9 11h.01M9 8h.01" />
              </svg>
            </button>

            {/* User Profile - Hidden on mobile */}
            <div className={`
              hidden sm:flex items-center space-x-3 p-2 rounded-full bg-slate-100 dark:bg-slate-800
              hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 ease-out cursor-pointer
              ${isScrolled ? 'scale-90' : 'scale-100'}
              hover:scale-105 hover:shadow-lg
            `}>
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">U</span>
              </div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                User
              </span>
            </div>

            {/* Sign Out Button */}
            <div className={`
              transition-all duration-300 ease-out
              ${isScrolled ? 'scale-85' : 'scale-100'}
              hover:scale-105
            `}>
              <SignOutButton />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 ease-out hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`
          md:hidden transition-all duration-500 ease-out overflow-hidden
          ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}
        `}>
          <nav className="py-4 space-y-2 border-t border-slate-200 dark:border-slate-700">
            <NavLink
              to="/dashboard"
              className={({ isActive }) => `block px-4 py-2 rounded-md transition-all duration-300 ease-out font-medium hover:translate-x-2 ${isActive ? 'text-blue-600 dark:text-blue-400 bg-slate-100 dark:bg-slate-800' : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/movies"
              className={({ isActive }) => `block px-4 py-2 rounded-md transition-all duration-300 ease-out font-medium hover:translate-x-2 ${isActive ? 'text-blue-600 dark:text-blue-400 bg-slate-100 dark:bg-slate-800' : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Movies
            </NavLink>
            <NavLink
              to="/notes"
              className={({ isActive }) => `block px-4 py-2 rounded-md transition-all duration-300 ease-out font-medium hover:translate-x-2 ${isActive ? 'text-blue-600 dark:text-blue-400 bg-slate-100 dark:bg-slate-800' : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Notes
            </NavLink>
            <a href="#" className="block px-4 py-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-all duration-300 ease-out font-medium hover:translate-x-2">
              Analytics
            </a>
            <a href="#" className="block px-4 py-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-all duration-300 ease-out font-medium hover:translate-x-2">
              Settings
            </a>
            <div className="px-4 py-2">
              <div className="flex items-center space-x-3 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 ease-out">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">U</span>
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  User Profile
                </span>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Decorative Bottom border with gradient */}
      <div className={`
        h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
        transition-all duration-500 ease-out
        ${isScrolled ? 'opacity-100' : 'opacity-60'}
      `} 
      style={{
        background: `linear-gradient(90deg, 
          hsl(${200 + scrollProgress * 60}, 70%, 60%), 
          hsl(${270 + scrollProgress * 30}, 70%, 60%), 
          hsl(${330 + scrollProgress * 30}, 70%, 60%)
        )`
      }}
      />
    </header>
  );
}
