"use client";

import { Header } from "./components/Header";

export { Header };

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="pt-20 flex flex-col">
        {children}
      </main>
    </>
  );
}
