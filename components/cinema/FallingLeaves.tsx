"use client";

import React from "react";

interface LeafSpec {
  left: string;
  size: number;
  dur: string;
  delay: string;
  variant: "a" | "b";
  color: string;
  opacity: number;
}

const LEAVES: LeafSpec[] = [
  { left: "12%", size: 22, dur: "19s", delay: "-4s", variant: "a", color: "#ec7a26", opacity: 0.72 },
  { left: "28%", size: 16, dur: "24s", delay: "-11s", variant: "b", color: "#ec7a26", opacity: 0.52 },
  { left: "44%", size: 34, dur: "16s", delay: "-2s", variant: "a", color: "#d86919", opacity: 0.86 },
  { left: "63%", size: 20, dur: "21s", delay: "-15s", variant: "b", color: "#ec7a26", opacity: 0.62 },
  { left: "77%", size: 28, dur: "17s", delay: "-8s", variant: "a", color: "#ec7a26", opacity: 0.78 },
  { left: "88%", size: 15, dur: "25s", delay: "-19s", variant: "b", color: "#d86919", opacity: 0.56 },
];

export function FallingLeaves() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
    >
      {LEAVES.map((leaf, i) => (
        <div
          key={i}
          className={leaf.variant === "a" ? "leaf-drift-a absolute top-0" : "leaf-drift-b absolute top-0"}
          style={
            {
              left: leaf.left,
              width: leaf.size,
              height: leaf.size,
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
      ))}
    </div>
  );
}
