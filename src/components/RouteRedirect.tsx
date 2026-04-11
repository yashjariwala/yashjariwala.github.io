"use client";

import { useEffect } from "react";

type RouteRedirectProps = {
  to: string;
  title: string;
};

export default function RouteRedirect({ to, title }: RouteRedirectProps) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);

  return (
    <main className="min-h-screen bg-[#fffbf5] text-[#4C1215] flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-[#4C1215]/50 mb-4">Redirecting</p>
        <h1 className="font-serif text-3xl mb-4">{title}</h1>
        <p className="text-base text-[#4C1215]/70 mb-6">
          This invitation page has moved to a cleaner URL.
        </p>
        <a
          href={to}
          className="inline-flex items-center justify-center rounded-full bg-[#4C1215] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#68171c]"
        >
          Continue
        </a>
      </div>
    </main>
  );
}
