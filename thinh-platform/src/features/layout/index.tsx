"use client";

import { Header } from "./components/Header";

export { Header };

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="p-0 flex flex-col">
        {children}
      </main>
    </>
  );
}
