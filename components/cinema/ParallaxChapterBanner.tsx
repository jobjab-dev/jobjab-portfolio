"use client";

import React, { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

interface ParallaxChapterBannerProps {
  imgSrc: string;
  alt: string;
  heightClass?: string;
  scrimClass?: string;
  children: React.ReactNode;
}

export function ParallaxChapterBanner({
  imgSrc,
  alt,
  heightClass = "h-56 sm:h-72",
  scrimClass = "bg-gradient-to-t from-[#0b0e13] via-[#0b0e13]/45 to-[#0b0e13]/20",
  children,
}: ParallaxChapterBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = Boolean(useReducedMotion());

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
  });

  const y = useTransform(smooth, [0, 1], ["-9%", "9%"]);
  const scale = useTransform(smooth, [0, 1], [1.08, 1.01]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden border-b border-[#f8f1e3]/14 ${heightClass}`}
    >
      <motion.img
        src={imgSrc}
        alt={alt}
        style={reduced ? undefined : { y, scale }}
        className={
          reduced
            ? "h-full w-full object-cover object-center"
            : "absolute -top-[16%] left-0 h-[132%] w-full object-cover object-center"
        }
      />
      <div className={`absolute inset-0 ${scrimClass}`} />
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-end px-5 pb-6 sm:px-8 lg:px-10"
      >
        {children}
      </motion.div>
    </div>
  );
}
