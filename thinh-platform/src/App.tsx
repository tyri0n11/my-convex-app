"use client";

import {
  Authenticated,
  Unauthenticated,
} from "convex/react";
import Layout from "./features/layout";
import { AuthForm } from "./features/authentication";
import { AnimatedDashboard } from "./features/dashboard";

export default function App() {
  return (
    <>
      <Authenticated>
        <Layout>
          <AnimatedDashboard />
        </Layout>
      </Authenticated>
      <Unauthenticated>
        <AuthForm />
      </Unauthenticated>
    </>
  );
}
