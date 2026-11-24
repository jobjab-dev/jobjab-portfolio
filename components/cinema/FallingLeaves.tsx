"use client";

import React from "react";
import { motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "framer-motion";

interface LeafSpec {
  left: string;
  size: number;
  dur: string;
  delay: string;
  variant: "a" | "b";
  color: string;
  opacity: number;
  depth: number;
  scrollY: [number, number];
  scrollX: [number, number];
  scrollRotate: [number, number];
}

const LEAVES: LeafSpec[] = [
  { left: "12%", size: 22, dur: "19s", delay: "-4s", variant: "a", color: "#ec7a26", opacity: 0.72, depth: 0.85, scrollY: [0, -70], scrollX: [0, 32], scrollRotate: [0, 42] },
  { left: "28%", size: 16, dur: "24s", delay: "-11s", variant: "b", color: "#ec7a26", opacity: 0.52, depth: 0.45, scrollY: [0, -40], scrollX: [0, -24], scrollRotate: [0, -34] },
  { left: "44%", size: 34, dur: "16s", delay: "-2s", variant: "a", color: "#d86919", opacity: 0.86, depth: 1.45, scrollY: [0, -110], scrollX: [0, 56], scrollRotate: [0, 74] },
  { left: "63%", size: 20, dur: "21s", delay: "-15s", variant: "b", color: "#ec7a26", opacity: 0.62, depth: 0.75, scrollY: [0, -64], scrollX: [0, -38], scrollRotate: [0, -52] },
  { left: "77%", size: 28, dur: "17s", delay: "-8s", variant: "a", color: "#ec7a26", opacity: 0.78, depth: 1.2, scrollY: [0, -96], scrollX: [0, 44], scrollRotate: [0, 60] },
  { left: "88%", size: 15, dur: "25s", delay: "-19s", variant: "b", color: "#d86919", opacity: 0.56, depth: 0.5, scrollY: [0, -45], scrollX: [0, -20], scrollRotate: [0, -30] },
];

function ParallaxLeaf({
  leaf,
  scrollProgress,
  pointerX,
  pointerY,
  reduced,
}: {
  leaf: LeafSpec;
  scrollProgress: MotionValue<number>;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  reduced: boolean;
}) {
  const scrollOffsetY = useTransform(scrollProgress, [0, 1], leaf.scrollY);
  const scrollOffsetX = useTransform(scrollProgress, [0, 1], leaf.scrollX);
  const scrollRot = useTransform(scrollProgress, [0, 1], leaf.scrollRotate);
  const ptrX = useTransform(pointerX, (v) => v * leaf.depth);
  const ptrY = useTransform(pointerY, (v) => v * leaf.depth);
  const combinedX = useTransform([scrollOffsetX, ptrX], ([sx, px]) => (sx as number) + (px as number));
  const combinedY = useTransform([scrollOffsetY, ptrY], ([sy, py]) => (sy as number) + (py as number));

  return (
    <motion.div
      className="absolute top-0"
      style={
        reduced
          ? { left: leaf.left, width: leaf.size, height: leaf.size }
          : {
              left: leaf.left,
              width: leaf.size,
              height: leaf.size,
              x: combinedX,
              y: combinedY,
              rotate: scrollRot,
            }
      }
    >
      <div
        className={leaf.variant === "a" ? "leaf-drift-a h-full w-full" : "leaf-drift-b h-full w-full"}
        style={
          {
            "--leaf-dur": leaf.dur,
            "--leaf-delay": leaf.delay,
          } as React.CSSProperties
        }
      >
        <svg
          viewBox="0 0 32 32"
          className="h-full w-full"
          style={{ opacity: leaf.opacity }}
          fill={leaf.color}
        >
          <path d="M15.6 29.5 L15.6 22.8 C12.5 23.6 9.8 25.2 7.2 23.8 C8.8 21.5 10.2 19.8 11.4 18.6 C7.4 18.4 4.2 16.8 2.8 14.2 C5.4 13.8 8.2 13.6 11.1 13.5 C8.4 10.6 7.4 8.2 8.2 5.4 C10.6 7.4 12.6 9.4 14.2 11.4 C14.6 7.6 15.2 4.6 16 2 C16.8 4.6 17.4 7.6 17.8 11.4 C19.4 9.4 21.4 7.4 23.8 5.4 C24.6 8.2 23.6 10.6 20.9 13.5 C23.8 13.6 26.6 13.8 29.2 14.2 C27.8 16.8 24.6 18.4 20.6 18.6 C21.8 19.8 23.2 21.5 24.8 23.8 C22.2 25.2 19.5 23.6 16.4 22.8 L16.4 29.5 Z" />
        </svg>
      </div>
    </motion.div>
  );
}

export function FallingLeaves({
  scrollProgress,
  pointerX,
  pointerY,
}: {
  scrollProgress?: MotionValue<number>;
  pointerX?: MotionValue<number>;
  pointerY?: MotionValue<number>;
}) {
  const zeroMV = useMotionValue(0);
  const reduced = Boolean(useReducedMotion());

  const activeScroll = scrollProgress ?? zeroMV;
  const activePtrX = pointerX ?? zeroMV;
  const activePtrY = pointerY ?? zeroMV;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
    >
      {LEAVES.map((leaf, i) => (
        <ParallaxLeaf
          key={i}
          leaf={leaf}
          scrollProgress={activeScroll}
          pointerX={activePtrX}
          pointerY={activePtrY}
          reduced={reduced}
        />
      ))}
    </div>
  );
}
