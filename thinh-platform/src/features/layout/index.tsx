"use client";

import { Header } from "./components/Header";

export { Header };

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="p-8 flex flex-col gap-16">
        <h1 className="text-4xl font-bold text-center">
          Convex + React + Convex Auth
        </h1>
        {children}
      </main>
    </>
  );
}
