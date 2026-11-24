"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

const CHAPTERS = [
  { id: "hero-reel", code: "01", label: "Scene 01 horizon" },
  { id: "flagship", code: "02", label: "Scene 02 flagships" },
  { id: "quant", code: "03", label: "Scene 03 archive" },
  { id: "stack", code: "04", label: "Scene 04 matrix" },
] as const;

export function CinemaScrollRail() {
  const reduced = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 26,
  });
  const [activeId, setActiveId] = useState<string>("hero-reel");

  useEffect(() => {
    const elements = CHAPTERS.map((ch) => document.getElementById(ch.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0 && visible[0].target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-35% 0px -40% 0px", threshold: [0.05, 0.25, 0.5] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const jumpTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  };

  return (
    <aside
      aria-label="Scene chapter progress rail"
      className="fixed right-2 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
    >
      <div className="flex flex-col items-center gap-2 border border-[#f8f1e3]/14 bg-[#0b0e13]/85 px-1 py-2">
        {CHAPTERS.map((ch) => {
          const active = activeId === ch.id;
          return (
            <button
              key={ch.id}
              type="button"
              onClick={() => jumpTo(ch.id)}
              aria-label={`Jump to ${ch.label}`}
              aria-current={active ? "location" : undefined}
              className={`font-mono text-[10px] leading-none tracking-[0.08em] transition-colors ${
                active ? "font-medium text-[#ec7a26]" : "text-[#9da4b4] hover:text-[#f8f1e3]"
              }`}
            >
              {ch.code}
            </button>
          );
        })}

        <div className="mt-1 h-16 w-px overflow-hidden bg-[#f8f1e3]/14">
          <motion.div
            className="h-full w-full origin-top bg-[#ec7a26]"
            style={{ scaleY: reduced ? 1 : smoothScroll }}
          />
        </div>
      </div>
    </aside>
  );
}
