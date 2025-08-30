"use client";

import { useState } from "react";
import {
  Authenticated,
  Unauthenticated,
} from "convex/react";
import Layout from "./features/layout";
import { AuthForm } from "./features/authentication";
import { AnimatedDashboard } from "./features/dashboard";
import { MovieDashboard } from "./features/movies";
import { ToastContainer } from 'react-toastify';

export default function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'movies'>('dashboard');

  return (
    <>
      <Authenticated>
        <Layout>
          {/* Simple Navigation */}
          <div className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex space-x-4">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    currentView === 'dashboard'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  🏠 Dashboard
                </button>
                <button
                  onClick={() => setCurrentView('movies')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    currentView === 'movies'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  🎬 Movies
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          {currentView === 'dashboard' ? (
            <AnimatedDashboard onBubbleClick={(bubbleId) => {
              if (bubbleId === 'movies') {
                setCurrentView('movies');
              }
              // Add more bubble navigation logic here as needed
            }} />
          ) : (
            <MovieDashboard />
          )}
        </Layout>
      </Authenticated>
      <Unauthenticated>
        <AuthForm />
      </Unauthenticated>
      <ToastContainer />
    </>
  );
}
