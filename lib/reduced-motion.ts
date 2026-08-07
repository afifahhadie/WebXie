"use client";

import { useEffect, useState } from "react";

export function prefersReducedMotion(
  mql: Pick<MediaQueryList, "matches">
): boolean {
  return mql.matches;
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(prefersReducedMotion(mql));

    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return reduced;
}
