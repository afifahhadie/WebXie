"use client";

import OrbitingSkills from "@/components/ui/orbiting-skills";
import { useReducedMotion } from "@/lib/reduced-motion";

export function HeroVisual() {
  const reduced = useReducedMotion();

  return (
    <div className="relative h-72 w-72 md:h-96 md:w-96 mx-auto" aria-hidden="true">
      {!reduced && <OrbitingSkills />}
      <div
        className="absolute inset-0 rounded-full blur-3xl bg-blue-500/20"
        style={{ transform: "scale(0.8)" }}
      />
    </div>
  );
}
