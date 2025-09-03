"use client";

import { useCallback } from "react";
import { Authenticated, Unauthenticated } from "convex/react";
import {
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Layout from "./features/layout";
import { AuthForm } from "./features/authentication";
import { AnimatedDashboard } from "./features/dashboard";
import { MovieDashboard } from "./features/movies";
import Notes from "./features/notes";
import { Bounce, ToastContainer } from "react-toastify";

export default function App() {
  const navigate = useNavigate();
  const handleBubbleClick = useCallback(
    (bubbleId: string) => {
      if (bubbleId === "movies") {
        navigate("/movies");
      }
    },
    [navigate],
  );

  return (
    <>
      <Authenticated>
        <Layout>
          {/* Content via routes */}
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/dashboard"
              element={<AnimatedDashboard onBubbleClick={handleBubbleClick} />}
            />
            <Route path="/movies" element={<MovieDashboard />} />
            <Route path="/notes" element={<Notes />} />
          </Routes>
        </Layout>
      </Authenticated>
      <Unauthenticated>
        <AuthForm />
      </Unauthenticated>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}
