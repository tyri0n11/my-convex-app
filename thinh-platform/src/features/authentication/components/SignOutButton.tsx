"use client";

import { useConvexAuth } from "convex/react";
import { useAuthentication } from "../useAuthentication";
import { authStyles } from "../styles";

export function SignOutButton() {
  const { isAuthenticated } = useConvexAuth();
  const { handleSignOut } = useAuthentication();

  return (
    <>
      {isAuthenticated && (
        <button
          className={authStyles.signOutButton}
          onClick={handleSignOut}
        >
          <div className="flex items-center space-x-2 cursor-pointer">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Sign out</span>
          </div>
        </button>
      )}
    </>
  );
}
