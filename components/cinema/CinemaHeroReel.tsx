"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { FallingLeaves } from "@/components/cinema/FallingLeaves";
import { useChat } from "@/context/ChatContext";

import scene01Img from "@/assets/scenes/scene-01-avenue.jpg";
import scene02Img from "@/assets/scenes/scene-02-canopy.jpg";
import scene03Img from "@/assets/scenes/scene-03-twilight.jpg";
import scene04Img from "@/assets/scenes/scene-04-night.jpg";

export const HERO_SCENES = [
  { code: "SC 01", label: "ABOVE THE CITY", img: scene01Img, caption: "Sunlit autumn avenue" },
  { code: "SC 02", label: "GOLDEN CANOPY", img: scene02Img, caption: "Cumulus over maple ridge" },
  { code: "SC 03", label: "BLUE HOUR", img: scene03Img, caption: "Bay twilight transition" },
  { code: "SC 04", label: "NIGHT SKYLINE", img: scene04Img, caption: "Midnight harbor signal" },
] as const;

export function CinemaHeroReel() {
  const { setIsOpen } = useChat();
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = Boolean(useReducedMotion());

  const [manualSceneIdx, setManualSceneIdx] = useState<number | null>(null);
  const [scrollBeatIdx, setScrollBeatIdx] = useState<0 | 1>(0);
  const manualSceneRef = useRef<number | null>(null);
  const manualAnchorRef = useRef<number>(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 24,
    mass: 0.35,
  });

  // Desktop pointer micro-parallax (GPU MotionValues only, zero React re-renders)
  const rawPointerX = useMotionValue(0);
  const rawPointerY = useMotionValue(0);
  const pointerHorizonX = useSpring(rawPointerX, { stiffness: 120, damping: 24 });
  const pointerHorizonY = useSpring(rawPointerY, { stiffness: 120, damping: 24 });

  const rawLeafX = useMotionValue(0);
  const rawLeafY = useMotionValue(0);
  const leafX = useSpring(rawLeafX, { stiffness: 95, damping: 20 });
  const leafY = useSpring(rawLeafY, { stiffness: 95, damping: 20 });

  useEffect(() => {
    if (reducedMotion) return;
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) return;

    const handlePointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      rawPointerX.set(-nx * 10);
      rawPointerY.set(-ny * 10);
      rawLeafX.set(nx * 16);
      rawLeafY.set(ny * 16);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [reducedMotion, rawPointerX, rawPointerY, rawLeafX, rawLeafY]);

  useMotionValueEvent(smoothProgress, "change", (v) => {
    const nextBeat: 0 | 1 = v >= 0.46 ? 1 : 0;
    setScrollBeatIdx((prev) => (prev === nextBeat ? prev : nextBeat));

    if (manualSceneRef.current !== null && Math.abs(v - manualAnchorRef.current) > 0.24) {
      manualSceneRef.current = null;
      setManualSceneIdx(null);
    }
  });

  const handleSelectScene = (idx: number) => {
    manualSceneRef.current = idx;
    manualAnchorRef.current = smoothProgress.get();
    setManualSceneIdx(idx);
  };

  const activeSceneIdx = manualSceneIdx ?? scrollBeatIdx;
  const currentScene = HERO_SCENES[activeSceneIdx];

  // Camera dolly forward & crossfade curves (pure GPU transform & opacity)
  const horizonScale = useTransform(smoothProgress, [0, 1], [1.0, 1.18]);
  const horizonY = useTransform(smoothProgress, [0, 1], ["0%", "-4%"]);

  const sc01ScrollOpacity = useTransform(smoothProgress, [0, 0.36, 0.62, 1], [1, 1, 0, 0]);
  const sc02ScrollOpacity = useTransform(smoothProgress, [0, 0.36, 0.62, 1], [0, 0, 1, 1]);

  // Atmospheric cloud-sewn transition sweeps (opaque cumulus bands using design token ivory cream)
  const cloudAOpacity = useTransform(smoothProgress, [0.24, 0.5, 0.76], [0, 0.72, 0]);
  const cloudAX = useTransform(smoothProgress, [0.24, 0.76], ["-12%", "12%"]);
  const cloudAScale = useTransform(smoothProgress, [0.24, 0.76], [0.94, 1.24]);

  const cloudBOpacity = useTransform(smoothProgress, [0.26, 0.52, 0.78], [0, 0.56, 0]);
  const cloudBX = useTransform(smoothProgress, [0.26, 0.78], ["10%", "-10%"]);
  const cloudBScale = useTransform(smoothProgress, [0.26, 0.78], [1.0, 1.18]);

  // 2-Beat Editorial Statement crossfade
  const beat1Opacity = useTransform(smoothProgress, [0, 0.34, 0.48], [1, 1, 0]);
  const beat1Y = useTransform(smoothProgress, [0, 0.48], [0, -24]);

  const beat2Opacity = useTransform(smoothProgress, [0.44, 0.6, 1], [0, 1, 1]);
  const beat2Y = useTransform(smoothProgress, [0.44, 0.62], [26, 0]);

  const scrollCueOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);

  return (
    <div
      ref={trackRef}
      id="hero-reel"
      className={reducedMotion ? "relative bg-[#0b0e13]" : "relative h-[200vh] bg-[#0b0e13] md:h-[250vh]"}
    >
      <section
        aria-label="Autumn Horizon Cinema Reel"
        className="sticky top-0 flex h-[100dvh] min-h-[580px] max-h-[960px] w-full flex-col justify-between overflow-hidden border-b border-[#f8f1e3]/14 bg-[#0b0e13]"
      >
        {/* Multiplane Painted Horizon Plane */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-0"
          style={reducedMotion ? undefined : { x: pointerHorizonX, y: pointerHorizonY }}
        >
          <motion.div
            data-horizon-plane="true"
            className="h-full w-full"
            style={reducedMotion ? undefined : { scale: horizonScale, y: horizonY }}
          >
            {HERO_SCENES.map((sc, idx) => {
              const useScrollCrossfade = manualSceneIdx === null && !reducedMotion && idx < 2;
              const style = useScrollCrossfade
                ? { opacity: idx === 0 ? sc01ScrollOpacity : sc02ScrollOpacity }
                : {
                    opacity: idx === activeSceneIdx ? 1 : 0,
                    transition: "opacity 500ms ease",
                  };

              return (
                <motion.img
                  key={sc.code}
                  data-scene={sc.code}
                  src={sc.img.src}
                  alt={`${sc.label} hand-painted anime cityscape`}
                  style={style}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
              );
            })}
          </motion.div>

          {/* Cloud-Sewn Atmospheric Transition Veils */}
          {!reducedMotion && (
            <>
              <motion.div
                aria-hidden="true"
                className="absolute -inset-x-[14%] inset-y-[12%]"
                style={{
                  opacity: cloudAOpacity,
                  x: cloudAX,
                  scale: cloudAScale,
                  background:
                    "radial-gradient(ellipse 68% 42% at 50% 48%, rgba(248, 241, 227, 0.28) 0%, rgba(248, 241, 227, 0.1) 46%, rgba(11, 14, 19, 0) 78%)",
                }}
              />
              <motion.div
                aria-hidden="true"
                className="absolute -inset-x-[12%] inset-y-[20%]"
                style={{
                  opacity: cloudBOpacity,
                  x: cloudBX,
                  scale: cloudBScale,
                  background:
                    "radial-gradient(ellipse 56% 36% at 44% 58%, rgba(248, 241, 227, 0.24) 0%, rgba(248, 241, 227, 0.08) 50%, rgba(11, 14, 19, 0) 80%)",
                }}
              />
            </>
          )}

          {/* Atmospheric Contrast Scrims */}
          <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#0b0e13]/68 via-[#0b0e13]/28 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-[#0b0e13]/94 via-[#0b0e13]/52 to-transparent" />
          <div className="absolute inset-y-0 left-0 w-3/4 bg-gradient-to-tr from-[#0b0e13]/68 via-transparent to-transparent" />
        </motion.div>

        <FallingLeaves
          scrollProgress={smoothProgress}
          pointerX={leafX}
          pointerY={leafY}
        />

        {/* Floating Cinema Masthead with Live + Scroll-Scrubbing SMPTE HUD */}
        <Header
          variant="overlay"
          activeScene={{ code: currentScene.code, label: currentScene.label }}
          scrollProgress={smoothProgress}
        />

        <div aria-hidden="true" className="h-20 shrink-0" />

        {/* Hero Bottom Editorial Staging */}
        <div className="relative z-20 mx-auto flex w-full max-w-[1440px] flex-col justify-between gap-6 px-5 pb-7 sm:px-8 sm:pb-10 lg:flex-row lg:items-end lg:px-10">
          <div className="max-w-2xl">
            {/* 2-Beat Editorial Title Slot */}
            <div className="grid">
              <motion.div
                data-beat="1"
                className="col-start-1 row-start-1"
                style={reducedMotion ? undefined : { opacity: beat1Opacity, y: beat1Y }}
              >
                <motion.h1
                  initial={reducedMotion ? false : { opacity: 0, filter: "blur(10px)", y: 10 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                  className="font-editorial text-4xl font-medium leading-[0.98] tracking-[-0.025em] text-[#f8f1e3] sm:text-6xl lg:text-[64px]"
                >
                  Craft, systems,
                  <br />
                  code, motion.
                </motion.h1>
              </motion.div>

              {!reducedMotion && (
                <motion.div
                  data-beat="2"
                  aria-hidden={scrollBeatIdx === 0}
                  className="pointer-events-none col-start-1 row-start-1"
                  style={{ opacity: beat2Opacity, y: beat2Y }}
                >
                  <p className="font-editorial text-4xl font-medium leading-[0.98] tracking-[-0.025em] text-[#f8f1e3] sm:text-6xl lg:text-[64px]">
                    One horizon,
                    <br />
                    thirty-seven live builds.
                  </p>
                </motion.div>
              )}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <a
                href="#flagship"
                className="inline-flex items-center gap-2 bg-[#ec7a26] px-4 py-2 text-xs font-medium text-[#120d08] transition-colors hover:bg-[#d86919]"
              >
                <span>Explore 37 Works</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>

              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="border border-[#f8f1e3]/28 bg-[#0b0e13]/75 px-3.5 py-2 text-xs text-[#f8f1e3] transition-colors hover:border-[#ec7a26] hover:text-[#ec7a26]"
              >
                Ask Studio AI
              </button>

              <div
                role="group"
                aria-label="Cinema scene reel switcher"
                className="flex items-center gap-1"
              >
                {HERO_SCENES.map((sc, idx) => {
                  const active = idx === activeSceneIdx;
                  return (
                    <button
                      key={sc.code}
                      type="button"
                      onClick={() => handleSelectScene(idx)}
                      aria-pressed={active}
                      aria-label={`Switch to scene ${sc.code}: ${sc.label}`}
                      className={`border px-2.5 py-2 font-mono text-[11px] transition-colors ${
                        active
                          ? "border-[#ec7a26] bg-[#23170d] font-medium text-[#f8f1e3]"
                          : "border-[#f8f1e3]/20 bg-[#0b0e13]/65 text-[#dfd7c8] hover:border-[#f8f1e3]/45 hover:text-[#f8f1e3]"
                      }`}
                    >
                      {sc.code}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom-Right Poetic Note, Reel Filament & Japanese Studio Stamp */}
          <div className="flex items-end justify-between gap-5 self-stretch sm:justify-end lg:self-end">
            <div className="flex flex-col items-start gap-2 sm:items-end">
              <p className="max-w-[260px] text-xs leading-relaxed text-[#f3ead8] sm:text-right">
                Thirty-seven live systems painted onto one continuous horizon. Interactive UI, Quant engines, SaaS platforms, and confidential Web3.
              </p>
              {!reducedMotion && (
                <motion.span
                  style={{ opacity: scrollCueOpacity }}
                  className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9da4b4]"
                >
                  Scroll to glide ↓
                </motion.span>
              )}
            </div>

            <div className="flex items-center gap-3 border-l border-[#f8f1e3]/25 pl-4 text-[#f8f1e3]">
              <div className="h-12 w-px overflow-hidden bg-[#f8f1e3]/20">
                <motion.div
                  className="h-full w-full origin-top bg-[#ec7a26]"
                  style={{ scaleY: reducedMotion ? 1 : smoothProgress }}
                />
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <span className="vertical-stamp font-editorial text-lg font-medium tracking-[0.2em]">
                  創る
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#ec7a26]">
                  {currentScene.code}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
