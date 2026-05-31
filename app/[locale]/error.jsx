"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section
      className="d-flex flex-column items-center justify-center text-center"
      style={{ minHeight: "70vh", paddingTop: 120 }}
    >
      <div style={{ fontSize: 80 }}>⚠️</div>
      <h2 className="text-28 fw-700 text-dark-1 mt-20">Something went wrong</h2>
      <p className="text-16 text-light-1 mt-10">
        Please try again or contact us if the problem persists.
      </p>
      <div className="d-flex x-gap-15 mt-30">
        <button onClick={reset} className="btn-uzbek-primary button -md">
          Try Again
        </button>
        <Link href="/en" className="btn-uzbek-outline button -md">
          Go Home
        </Link>
      </div>
    </section>
  );
}
