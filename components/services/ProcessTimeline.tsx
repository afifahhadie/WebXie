"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/reduced-motion";
import { PROCESS_STEPS } from "@/data/services";

export function ProcessTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    registerGsap();
    if (reduced || !sectionRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={sectionRef} className="relative pl-10">
      <div className="absolute left-3 top-0 bottom-0 w-px bg-navy-700" />
      <div
        ref={lineRef}
        className="absolute left-3 top-0 bottom-0 w-px bg-blue-400"
        style={{ transform: "scaleY(0)" }}
      />
      <ol className="space-y-10">
        {PROCESS_STEPS.map((step, i) => (
          <li key={step.title} className="relative">
            <span className="absolute -left-10 top-0 w-6 h-6 rounded-full bg-navy-850 border border-blue-400 text-xs flex items-center justify-center font-display font-bold text-blue-300">
              {i + 1}
            </span>
            <h3 className="font-display font-bold">{step.title}</h3>
            <p className="mt-1 text-sm text-ivory-dim">{step.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
