"use client";

import { SignOutButton } from "../../authentication";
import { layoutStyles } from "../styles";

export function Header() {
  return (
    <header className={layoutStyles.header}>
      Convex + React + Convex Auth
      <SignOutButton />
    </header>
  );
}
