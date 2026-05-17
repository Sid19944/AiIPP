"use client";

import { Suspense } from "react";
import InterviewSessionPage from "./InterviewSessionPage";

function page() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            background: "#08080F",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 14 }}>
            Loading...
          </p>
        </div>
      }
    >
      <InterviewSessionPage />
    </Suspense>
  );
}

export default page;
