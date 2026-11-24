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
  type MotionValue,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { FallingLeaves } from "@/components/cinema/FallingLeaves";
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
  img: { src: string };
}

export const HERO_SCENES: HeroSceneSpec[] = [
  {
    code: "SC 01",
    label: "MORNING AVENUE",
    clock: "08:30",
    titleLine1: "Craft, systems,",
    titleLine2: "code, motion.",
    proofTag: "01 · INTRODUCTION · 37 PRODUCTION SYSTEMS",
    story:
      "Hi, I'm Jobjab — Creative Technologist & Design Engineer. Walk forward through this city to see how I build software that feels hand-crafted on the surface and ruthless in latency underneath.",
    img: scene01Img,
  },
  {
    code: "SC 02",
    label: "STREET CROSSING",
    clock: "11:15",
    titleLine1: "First-principles",
    titleLine2: "browser craft.",
    proofTag: "02 · 06 INTERACTIVE FLAGSHIP RUNTIMES",
    story:
      "I avoid black-box templates. My six interactive flagship runtimes run directly on native browser primitives—React 19 optimistic SSE auctions, zero-MP3 Web Audio DSP synths, custom CSS Matrix canvases, and 60fps virtualized radars.",
    img: scene05Img,
  },
  {
    code: "SC 03",
    label: "GOLDEN CANOPY",
    clock: "15:40",
    titleLine1: "Machines that",
    titleLine2: "trade at scale.",
    proofTag: "03 · 11 QUANT & PERP DEX BOTS",
    story:
      "Beyond visual interfaces, I engineer low-latency Python execution. Eleven algorithmic Perp DEX & CLOB market-making engines operating over async WebSockets across Hyperliquid, GRVT V2, Polymarket, Paradex, Backpack, and Uniswap V3.",
    img: scene02Img,
  },
  {
    code: "SC 04",
    label: "BLUE HOUR",
    clock: "18:25",
    titleLine1: "Products shipped",
    titleLine2: "for real users.",
    proofTag: "04 · 10 SAAS, FINTECH & AI PLATFORMS",
    story:
      "From GPU 3D reconstruction to commercial SaaS. Ten full-stack platforms spanning JVAULT crypto payments, POSkub retail suites, FastCaption Whisper AI, Nudrub booking, BOND escrow, and PyTorch Trellis 3D pipelines.",
    img: scene03Img,
  },
  {
    code: "SC 05",
    label: "MIDNIGHT HARBOR",
    clock: "22:10",
    titleLine1: "Privacy on-chain,",
    titleLine2: "proven in code.",
    proofTag: "05 · ZAMA $5,000 WINNER · 10 WEB3 PROTOCOLS",
    story:
      "Awarded 1st Place ($5,000) in Zama's Monthly Developer Bounty for fhevm-react-template—turning homomorphic encryption into drop-in React hooks across ten confidential Web3 & Layer-2 protocols.",
    img: scene04Img,
  },
  {
    code: "SC 06",
    label: "STUDIO OVERLOOK",
    clock: "00:45",
    titleLine1: "Welcome to",
    titleLine2: "the archive.",
    proofTag: "06 · ENTER LIVE 37-BUILD WORKSHOP",
    story:
      "Six hundred forty meters across one unbroken horizon. Step past the glass into the live workshop below—launch deployed runtimes, filter all thirty-seven builds, or speak directly with Studio AI.",
    img: scene06Img,
  },
];

const TOTAL_SCENES = HERO_SCENES.length;

function FpsSceneLayer({
  sc,
  idx,
  smoothProgress,
  manualMode,
  isSelected,
  reducedMotion,
}: {
  sc: HeroSceneSpec;
  idx: number;
  smoothProgress: MotionValue<number>;
  manualMode: boolean;
  isSelected: boolean;
  reducedMotion: boolean;
}) {
  const start = idx / TOTAL_SCENES;
  const end = (idx + 1) / TOTAL_SCENES;

  const fadeInStart = Math.max(0, start - 0.04);
  const fadeInEnd = idx === 0 ? 0 : start + 0.04;
  const fadeOutStart = end - 0.04;
  const fadeOutEnd = idx === TOTAL_SCENES - 1 ? 1 : Math.min(1, end + 0.04);

  const opacityStops =
    idx === 0
      ? [0, fadeOutStart, fadeOutEnd, 1]
      : idx === TOTAL_SCENES - 1
      ? [0, fadeInStart, fadeInEnd, 1]
      : [0, fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd, 1];

  const opacityValues =
    idx === 0
      ? [1, 1, 0, 0]
      : idx === TOTAL_SCENES - 1
      ? [0, 0, 1, 1]
      : [0, 0, 1, 1, 0, 0];

  const autoOpacity = useTransform(smoothProgress, opacityStops, opacityValues);

  const inStart = Math.max(0, start - 0.05);
  const inEnd = Math.min(1, end + 0.05);
  const localScale = useTransform(smoothProgress, [inStart, inEnd], [1.0, 1.24]);
  const localY = useTransform(smoothProgress, [inStart, inEnd], ["0%", "-3.5%"]);

  const style =
    !manualMode && !reducedMotion
      ? { opacity: autoOpacity, scale: localScale, y: localY }
      : {
          opacity: isSelected ? 1 : 0,
          scale: 1.02,
          transition: "opacity 450ms ease",
        };

  return (
    <motion.img
      data-scene={sc.code}
      src={sc.img.src}
      alt={`${sc.label} first-person anime cityscape`}
      style={style}
      className="absolute inset-0 h-full w-full object-cover object-center"
    />
  );
}

export function CinemaHeroReel() {
  const { setIsOpen } = useChat();
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = Boolean(useReducedMotion());

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

  // Desktop 3D FPS pointer micro-lookaround (GPU MotionValues only, zero React re-renders)
  const rawPointerX = useMotionValue(0);
  const rawPointerY = useMotionValue(0);
  const rawTiltY = useMotionValue(0);
  const rawTiltX = useMotionValue(0);
  const pointerHorizonX = useSpring(rawPointerX, { stiffness: 115, damping: 24 });
  const pointerHorizonY = useSpring(rawPointerY, { stiffness: 115, damping: 24 });
  const pointerRotateY = useSpring(rawTiltY, { stiffness: 115, damping: 24 });
  const pointerRotateX = useSpring(rawTiltX, { stiffness: 115, damping: 24 });

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
      rawPointerY.set(-ny * 8);
      rawTiltY.set(nx * 2.2);
      rawTiltX.set(-ny * 1.4);
      rawLeafX.set(nx * 16);
      rawLeafY.set(ny * 16);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [reducedMotion, rawPointerX, rawPointerY, rawTiltY, rawTiltX, rawLeafX, rawLeafY]);

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

  // FPS walking gait bob, lateral step sway, and subtle stride roll
  const walkBobY = useTransform(smoothProgress, (p) => Math.sin(p * Math.PI * 24) * 5.5);
  const walkSwayX = useTransform(smoothProgress, (p) => Math.cos(p * Math.PI * 12) * 4.5);
  const walkRoll = useTransform(smoothProgress, (p) => Math.sin(p * Math.PI * 12) * 0.35);
  const overallScale = useTransform(smoothProgress, [0, 1], [1.02, 1.08]);

  // Atmospheric mist seam pulses peaking gently between each city block transition
  const seamMistOpacity = useTransform(smoothProgress, (p) => {
    if (p <= 0.06 || p >= 0.96) return 0;
    const frac = (p * TOTAL_SCENES) % 1;
    const edgeProximity = Math.max(0, 1 - Math.min(frac, 1 - frac) * 5.5);
    return edgeProximity * 0.58;
  });
  const seamMistX = useTransform(smoothProgress, [0, 1], ["-12%", "14%"]);

  const scrollCueOpacity = useTransform(smoothProgress, [0, 0.08], [1, 0]);

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
        {/* Multiplane FPS Horizon Walkthrough Stage */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-0"
          style={
            reducedMotion
              ? undefined
              : {
                  x: pointerHorizonX,
                  y: pointerHorizonY,
                  rotateX: pointerRotateX,
                  rotateY: pointerRotateY,
                  transformPerspective: 1200,
                }
          }
        >
          <motion.div
            data-horizon-plane="true"
            className="h-full w-full"
            style={
              reducedMotion
                ? undefined
                : {
                    scale: overallScale,
                    x: walkSwayX,
                    y: walkBobY,
                    rotate: walkRoll,
                  }
            }
          >
            {HERO_SCENES.map((sc, idx) => (
              <FpsSceneLayer
                key={sc.code}
                sc={sc}
                idx={idx}
                smoothProgress={smoothProgress}
                manualMode={manualSceneIdx !== null}
                isSelected={idx === activeSceneIdx}
                reducedMotion={reducedMotion}
              />
            ))}
          </motion.div>

          {/* Atmospheric Mist Seam Sweep Between Chapters */}
          {!reducedMotion && (
            <motion.div
              aria-hidden="true"
              className="absolute -inset-x-[16%] inset-y-[10%]"
              style={{
                opacity: seamMistOpacity,
                x: seamMistX,
                background:
                  "radial-gradient(ellipse 70% 44% at 50% 50%, rgba(248, 241, 227, 0.24) 0%, rgba(248, 241, 227, 0.08) 46%, rgba(11, 14, 19, 0) 78%)",
              }}
            />
          )}

          {/* Atmospheric Contrast Scrims */}
          <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#0b0e13]/72 via-[#0b0e13]/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[66%] bg-gradient-to-t from-[#0b0e13]/98 via-[#0b0e13]/68 to-transparent" />
          <div className="absolute inset-y-0 left-0 w-3/4 bg-gradient-to-tr from-[#0b0e13]/72 via-transparent to-transparent" />
        </motion.div>

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

        {/* Hero Bottom Story & Controls Staging */}
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
                  : "Walk forward down the horizon to follow Jobjab across craft, bots, SaaS, and Web3."}
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
