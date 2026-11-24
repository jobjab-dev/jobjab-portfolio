"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
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
import { Jobjab3DWorld } from "@/components/cinema/Jobjab3DWorld";
import { CinemaVideoBackdrop } from "@/components/cinema/CinemaVideoBackdrop";
import { useChat } from "@/context/ChatContext";

import scene01Img from "@/assets/scenes/scene-01-avenue.jpg";
import scene05Img from "@/assets/scenes/scene-05-street-walk.jpg";
import scene02Img from "@/assets/scenes/scene-02-canopy.jpg";
import scene03Img from "@/assets/scenes/scene-03-twilight.jpg";
import scene04Img from "@/assets/scenes/scene-04-night.jpg";
import scene06Img from "@/assets/scenes/scene-06-studio-window.jpg";

interface HeroSceneSpec {
  code: string;
  label: string;
  clock: string;
  titleLine1: string;
  titleLine2: string;
  proofTag: string;
  story: string;
  fallbackImg: { src: string };
}

export const HERO_SCENES: HeroSceneSpec[] = [
  {
    code: "SC 01",
    label: "STUDIO AVENUE",
    clock: "08:30",
    titleLine1: "Craft, systems,",
    titleLine2: "code, motion.",
    proofTag: "01 · INTRODUCTION · 37 PRODUCTION SYSTEMS",
    story:
      "Hi, I'm Jobjab — Creative Technologist & Design Engineer. Scroll forward to walk down this unbroken 3D anime avenue built around my actual engines, platforms, and awards.",
    fallbackImg: scene01Img,
  },
  {
    code: "SC 02",
    label: "FLAGSHIP PAVILION",
    clock: "11:15",
    titleLine1: "First-principles",
    titleLine2: "browser craft.",
    proofTag: "02 · 06 INTERACTIVE FLAGSHIP RUNTIMES",
    story:
      "Walking past all six deployed web monuments: HÄNSEL & ROTH real-time SSE auctions, KINETON M-4 Web Audio DSP synthesis, FELD matrix canvas math, VECTRA radar, PRESS 09 Astro Islands, and ATELIER KINETA.",
    fallbackImg: scene05Img,
  },
  {
    code: "SC 03",
    label: "QUANT PLAZA",
    clock: "15:40",
    titleLine1: "Machines that",
    titleLine2: "trade at scale.",
    proofTag: "03 · 11 QUANT & PERP DEX BOTS",
    story:
      "Passing glowing bid and ask depth walls powering eleven low-latency Python execution bots over async WebSockets across Hyperliquid, GRVT V2, Polymarket, Paradex, Backpack, and Uniswap V3.",
    fallbackImg: scene02Img,
  },
  {
    code: "SC 04",
    label: "SAAS & GPU DISTRICT",
    clock: "18:25",
    titleLine1: "Products shipped",
    titleLine2: "for real users.",
    proofTag: "04 · 10 SAAS, FINTECH & AI PLATFORMS",
    story:
      "Blue hour over rotating spatial monoliths representing ten production SaaS & AI systems: JVAULT crypto payments, POSkub retail suites, PyTorch CUDA Trellis 3D, FastCaption Whisper AI, Nudrub, and BOND.",
    fallbackImg: scene03Img,
  },
  {
    code: "SC 05",
    label: "ZAMA FHEVM BRIDGE",
    clock: "22:10",
    titleLine1: "Privacy on-chain,",
    titleLine2: "proven in code.",
    proofTag: "05 · ZAMA $5,000 WINNER · 10 WEB3 PROTOCOLS",
    story:
      "Crossing the midnight bay beneath the homomorphic encryption crystal lattice celebrating 1st Place ($5,000) in Zama's Monthly Developer Bounty for fhevm-react-template across ten Web3 protocols.",
    fallbackImg: scene04Img,
  },
  {
    code: "SC 06",
    label: "STUDIO OVERLOOK",
    clock: "00:45",
    titleLine1: "Welcome to",
    titleLine2: "the archive.",
    proofTag: "06 · ENTER LIVE 37-BUILD WORKSHOP",
    story:
      "Arriving inside Midnight Studio overlooking the harbor skyline. Step into the index below to launch live deployments, filter every stack, or talk directly with Studio AI.",
    fallbackImg: scene06Img,
  },
];

const TOTAL_SCENES = HERO_SCENES.length;
const CUSTOM_VIDEO_URL = process.env.NEXT_PUBLIC_CINEMA_VIDEO_URL?.trim() || "";

export function CinemaHeroReel() {
  const { setIsOpen } = useChat();
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = Boolean(useReducedMotion());

  const [webglReady, setWebglReady] = useState(true);
  const [manualSceneIdx, setManualSceneIdx] = useState<number | null>(null);
  const [scrollBeatIdx, setScrollBeatIdx] = useState<number>(0);
  const [walkMeters, setWalkMeters] = useState<number>(0);
  const [walkSteps, setWalkSteps] = useState<number>(0);
  const manualSceneRef = useRef<number | null>(null);
  const manualAnchorRef = useRef<number>(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    mass: 0.38,
  });

  // Fallback leaf mouse parallax when WebGL canvas is inactive
  const rawLeafX = useMotionValue(0);
  const rawLeafY = useMotionValue(0);
  const leafX = useSpring(rawLeafX, { stiffness: 95, damping: 20 });
  const leafY = useSpring(rawLeafY, { stiffness: 95, damping: 20 });

  useEffect(() => {
    if (reducedMotion || CUSTOM_VIDEO_URL) return;
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) return;

    const handlePointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      rawLeafX.set(nx * 14);
      rawLeafY.set(ny * 14);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [reducedMotion, rawLeafX, rawLeafY]);

  useMotionValueEvent(smoothProgress, "change", (v) => {
    if (reducedMotion) return;
    const clamped = Math.max(0, Math.min(1, v));
    const nextBeat = Math.min(TOTAL_SCENES - 1, Math.floor(clamped * TOTAL_SCENES));
    setScrollBeatIdx((prev) => (prev === nextBeat ? prev : nextBeat));

    const nextMeters = Math.round(clamped * 640);
    setWalkMeters((prev) => (prev === nextMeters ? prev : nextMeters));

    const nextSteps = Math.round(clamped * 840);
    setWalkSteps((prev) => (prev === nextSteps ? prev : nextSteps));

    if (manualSceneRef.current !== null && Math.abs(clamped - manualAnchorRef.current) > 0.14) {
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
  const scrollCueOpacity = useTransform(smoothProgress, [0, 0.08], [1, 0]);
  const showFallbackPlates = reducedMotion || (!CUSTOM_VIDEO_URL && !webglReady);

  return (
    <div
      ref={trackRef}
      id="hero-reel"
      className={reducedMotion ? "relative bg-[#0b0e13]" : "relative h-[460vh] bg-[#0b0e13] md:h-[560vh]"}
    >
      <section
        aria-label="Autumn Horizon Cinema Reel"
        data-active-scene={currentScene.code}
        className="sticky top-0 flex h-[100dvh] min-h-[580px] max-h-[960px] w-full flex-col justify-between overflow-hidden border-b border-[#f8f1e3]/14 bg-[#0b0e13]"
      >
        {/* Continuous 3D Anime World (Primary), Opt-in MP4 Scrubber, or Static Fallback */}
        <div className="pointer-events-none absolute inset-0 z-0">
          {CUSTOM_VIDEO_URL ? (
            <CinemaVideoBackdrop
              src={CUSTOM_VIDEO_URL}
              progress={smoothProgress}
              reducedMotion={reducedMotion}
            />
          ) : !showFallbackPlates ? (
            <Jobjab3DWorld
              progress={smoothProgress}
              manualSceneIdx={manualSceneIdx}
              reducedMotion={reducedMotion}
              onWebGLReady={setWebglReady}
            />
          ) : (
            <img
              src={currentScene.fallbackImg.src}
              alt={`${currentScene.label} anime cityscape`}
              className="h-full w-full object-cover object-center"
            />
          )}

          {/* Atmospheric Contrast Scrims */}
          <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#0b0e13]/72 via-[#0b0e13]/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[66%] bg-gradient-to-t from-[#0b0e13]/98 via-[#0b0e13]/68 to-transparent" />
          <div className="absolute inset-y-0 left-0 w-3/4 bg-gradient-to-tr from-[#0b0e13]/72 via-transparent to-transparent" />
        </div>

        {/* Subtle Foreground Falling Leaves Depth Overlay */}
        <FallingLeaves
          scrollProgress={reducedMotion ? undefined : smoothProgress}
          pointerX={leafX}
          pointerY={leafY}
        />

        {/* Floating Cinema Masthead with Live + Scroll-Scrubbing SMPTE HUD */}
        <Header
          variant="overlay"
          activeScene={{ code: currentScene.code, label: currentScene.label }}
          scrollProgress={reducedMotion ? undefined : smoothProgress}
        />

        <div aria-hidden="true" className="h-16 shrink-0 sm:h-20" />

        {/* Hero Bottom Narrative & Action Staging */}
        <div className="relative z-20 mx-auto flex w-full max-w-[1440px] flex-col justify-between gap-5 px-5 pb-6 sm:px-8 sm:pb-9 lg:flex-row lg:items-end lg:px-10">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScene.code}
                data-story-chapter={currentScene.code}
                initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 className="font-editorial text-4xl font-medium leading-[0.98] tracking-[-0.025em] text-[#f8f1e3] sm:text-5xl lg:text-[64px]">
                  {currentScene.titleLine1}
                  <br />
                  {currentScene.titleLine2}
                </h1>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[#ec7a26]">
                  {currentScene.proofTag}
                </p>
                <p className="mt-2.5 max-w-xl text-xs leading-relaxed text-[#f3ead8] sm:text-sm">
                  {currentScene.story}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-4 flex flex-wrap items-center gap-2">
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
                className="flex flex-wrap items-center gap-1"
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
                      className={`border px-2 py-1.5 font-mono text-[11px] transition-colors sm:px-2.5 sm:py-2 ${
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

          {/* Bottom-Right Live Walking Telemetry, Filament & Japanese Studio Stamp */}
          <div className="flex items-end justify-between gap-5 self-stretch sm:justify-end lg:self-end">
            <div className="flex flex-col items-start gap-1.5 sm:items-end">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#f8f1e3]">
                {currentScene.clock} · {currentScene.label}
              </p>
              <p
                data-testid="walk-telemetry"
                data-walk-meters={walkMeters}
                className="font-mono text-[11px] tabular-nums tracking-[0.12em] text-[#ec7a26]"
              >
                {String(walkMeters).padStart(3, "0")}m · STEP {String(walkSteps).padStart(3, "0")}
              </p>
              <p className="hidden max-w-[260px] text-xs leading-relaxed text-[#f3ead8] sm:block sm:text-right">
                {activeSceneIdx === TOTAL_SCENES - 1
                  ? "Arrived at Midnight Studio. Scroll below to inspect all 37 production builds."
                  : "Scroll continuously down this 3D world to walk past Jobjab's real engines and honors."}
              </p>
              {!reducedMotion && (
                <motion.span
                  style={{ opacity: scrollCueOpacity }}
                  className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9da4b4]"
                >
                  Scroll to walk forward ↓
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
