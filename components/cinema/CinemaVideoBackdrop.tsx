"use client";

import React, { useEffect, useRef } from "react";
import { type MotionValue } from "framer-motion";

interface CinemaVideoBackdropProps {
  src: string;
  progress: MotionValue<number>;
  reducedMotion: boolean;
}

export function CinemaVideoBackdrop({
  src,
  progress,
  reducedMotion,
}: CinemaVideoBackdropProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;

    let rafId = 0;

    const tick = () => {
      if (
        video.readyState >= 1 &&
        Number.isFinite(video.duration) &&
        video.duration > 0
      ) {
        const clamped = Math.max(0, Math.min(1, progress.get()));
        const target = clamped * video.duration;
        if (Math.abs(target - video.currentTime) > 0.025) {
          video.currentTime = target;
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [progress, reducedMotion]);

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
      data-video-scrubber="true"
      className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
    />
  );
}
