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
          Sign out
        </button>
      )}
    </>
  );
}
