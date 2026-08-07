"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/reduced-motion";

export function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    registerGsap();
    if (reduced || !containerRef.current) return;

    const hexes = containerRef.current.querySelectorAll<HTMLElement>(
      "[data-hex]"
    );
    const tweens = Array.from(hexes).map((el, i) =>
      gsap.to(el, {
        y: i % 2 === 0 ? -18 : 18,
        rotate: i % 2 === 0 ? 8 : -8,
        duration: 3 + i * 0.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.2,
      })
    );

    return () => tweens.forEach((t) => t.kill());
  }, [reduced]);

  const hexStyle = (size: number) => ({
    clipPath:
      "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)",
    width: size,
    height: size,
  });

  return (
    <div
      ref={containerRef}
      className="relative h-72 w-72 md:h-96 md:w-96 mx-auto"
      aria-hidden="true"
    >
      <div
        data-hex
        className="absolute top-4 left-8 bg-gradient-to-br from-blue-500/30 to-blue-400/10 border border-blue-400/40"
        style={hexStyle(140)}
      />
      <div
        data-hex
        className="absolute bottom-8 right-6 bg-gradient-to-br from-navy-700 to-navy-850 border border-blue-300/30"
        style={hexStyle(180)}
      />
      <div
        data-hex
        className="absolute top-1/3 right-0 bg-gradient-to-br from-blue-400/20 to-transparent border border-blue-400/30"
        style={hexStyle(100)}
      />
      <div
        className="absolute inset-0 rounded-full blur-3xl bg-blue-500/20"
        style={{ transform: "scale(0.8)" }}
      />
    </div>
  );
}
