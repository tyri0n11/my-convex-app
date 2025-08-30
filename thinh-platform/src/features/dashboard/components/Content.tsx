"use client";

import { useDashboard } from "../useDashboard";
import { dashboardStyles } from "../styles";
import { ResourceCard } from "./ResourceCard";

export function Content() {
  const { viewer, numbers, handleAddRandomNumber, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <div className="mx-auto">
        <p>loading... (consider a loading skeleton)</p>
      </div>
    );
  }

  return (
    <>
      <p>Welcome {viewer ?? "Anonymous"}!</p>
      <p>
        Click the button below and open this page in another window - this data
        is persisted in the Convex cloud database!
      </p>
      <p>
        <button
          className={dashboardStyles.button}
          onClick={handleAddRandomNumber}
        >
          Add a random number
        </button>
      </p>
      <p>
        Numbers:{" "}
        {numbers?.length === 0
          ? "Click the button!"
          : (numbers?.join(", ") ?? "...")}
      </p>
      <p>
        Edit{" "}
        <code className={dashboardStyles.code}>
          convex/myFunctions.ts
        </code>{" "}
        to change your backend
      </p>
      <p>
        Edit{" "}
        <code className={dashboardStyles.code}>
          src/App.tsx
        </code>{" "}
        to change your frontend
      </p>
      <div className={dashboardStyles.resourceSection}>
        <p className={dashboardStyles.resourceTitle}>Useful resources:</p>
        <div className={dashboardStyles.resourceGrid}>
          <div className={dashboardStyles.resourceColumn}>
            <ResourceCard
              title="Convex docs"
              description="Read comprehensive documentation for all Convex features."
              href="https://docs.convex.dev/home"
            />
            <ResourceCard
              title="Stack articles"
              description="Learn about best practices, use cases, and more from a growing
            collection of articles, videos, and walkthroughs."
              href="https://www.typescriptlang.org/docs/handbook/2/basic-types.html"
            />
          </div>
          <div className={dashboardStyles.resourceColumn}>
            <ResourceCard
              title="Templates"
              description="Browse our collection of templates to get started quickly."
              href="https://www.convex.dev/templates"
            />
            <ResourceCard
              title="Discord"
              description="Join our developer community to ask questions, trade tips & tricks,
            and show off your projects."
              href="https://www.convex.dev/community"
            />
          </div>
        </div>
      </div>
    </>
  );
}
