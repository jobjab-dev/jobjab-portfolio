"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Eye, Github, Lock, X } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { FallingLeaves } from "@/components/cinema/FallingLeaves";
import { Jobjab3DWorld } from "@/components/cinema/Jobjab3DWorld";
import { CinemaVideoBackdrop } from "@/components/cinema/CinemaVideoBackdrop";
import { ANIME_BILLBOARDS, type BillboardSpec } from "@/components/cinema/billboard-data";
import { useChat } from "@/context/ChatContext";

import scene01Img from "@/assets/scenes/scene-01-avenue.jpg";
import scene05Img from "@/assets/scenes/scene-05-street-walk.jpg";
import scene02Img from "@/assets/scenes/scene-02-canopy.jpg";
import scene03Img from "@/assets/scenes/scene-03-twilight.jpg";
import scene04Img from "@/assets/scenes/scene-04-night.jpg";
import scene06Img from "@/assets/scenes/scene-06-studio-window.jpg";

export const HERO_SCENES = [
  { code: "SC 01", label: "STUDIO AVENUE", fallbackImg: scene01Img },
  { code: "SC 02", label: "FLAGSHIP PAVILION", fallbackImg: scene05Img },
  { code: "SC 03", label: "QUANT PLAZA", fallbackImg: scene02Img },
  { code: "SC 04", label: "SAAS & GPU DISTRICT", fallbackImg: scene03Img },
  { code: "SC 05", label: "ZAMA FHEVM BRIDGE", fallbackImg: scene04Img },
  { code: "SC 06", label: "STUDIO OVERLOOK", fallbackImg: scene06Img },
] as const;

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
  const [hoveredBillboard, setHoveredBillboard] = useState<BillboardSpec | null>(null);
  const [focusedBillboard, setFocusedBillboard] = useState<BillboardSpec | null>(null);

  const manualSceneRef = useRef<number | null>(null);
  const manualAnchorRef = useRef<number>(0);
  const focusedRef = useRef<BillboardSpec | null>(null);
  const focusScrollAnchorRef = useRef<number>(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    mass: 0.38,
  });

  const handleSelectBillboard = useCallback((spec: BillboardSpec | null) => {
    focusedRef.current = spec;
    setFocusedBillboard(spec);
    if (spec) {
      focusScrollAnchorRef.current = window.scrollY;
      manualSceneRef.current = null;
      setManualSceneIdx(null);
    }
  }, []);

  const handleStepBillboard = useCallback(
    (delta: number) => {
      if (!focusedBillboard) {
        handleSelectBillboard(ANIME_BILLBOARDS[0]);
        return;
      }
      const curIdx = ANIME_BILLBOARDS.findIndex((b) => b.id === focusedBillboard.id);
      const nextIdx = (curIdx + delta + ANIME_BILLBOARDS.length) % ANIME_BILLBOARDS.length;
      handleSelectBillboard(ANIME_BILLBOARDS[nextIdx]);
    },
    [focusedBillboard, handleSelectBillboard]
  );

  // Close focused billboard inspection on Escape or significant scroll
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && focusedRef.current) {
        handleSelectBillboard(null);
      }
    };
    const onScroll = () => {
      if (
        focusedRef.current &&
        Math.abs(window.scrollY - focusScrollAnchorRef.current) > 120
      ) {
        handleSelectBillboard(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScroll);
    };
  }, [handleSelectBillboard]);

  useMotionValueEvent(smoothProgress, "change", (v) => {
    if (reducedMotion) return;
    const clamped = Math.max(0, Math.min(1, v));
    const nextBeat = Math.min(TOTAL_SCENES - 1, Math.floor(clamped * TOTAL_SCENES));
    setScrollBeatIdx((prev) => (prev === nextBeat ? prev : nextBeat));

    const nextMeters = Math.round(clamped * 640);
    setWalkMeters((prev) => (prev === nextMeters ? prev : nextMeters));

    if (manualSceneRef.current !== null && Math.abs(clamped - manualAnchorRef.current) > 0.14) {
      manualSceneRef.current = null;
      setManualSceneIdx(null);
    }
  });

  const handleSelectScene = (idx: number) => {
    handleSelectBillboard(null);
    manualSceneRef.current = idx;
    manualAnchorRef.current = smoothProgress.get();
    setManualSceneIdx(idx);
  };

  const activeSceneIdx = focusedBillboard
    ? focusedBillboard.sceneIdx
    : manualSceneIdx ?? scrollBeatIdx;
  const currentScene = HERO_SCENES[activeSceneIdx];

  // Opening whisper title fades out immediately once walking begins so view stays clean
  const titleFadeOpacity = useTransform(smoothProgress, [0, 0.06], [1, 0]);
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
        {/* Interactive Three.js 3D Anime World (pointer-events active), MP4 Video, or Fallback */}
        {CUSTOM_VIDEO_URL ? (
          <div className="pointer-events-none absolute inset-0 z-0">
            <CinemaVideoBackdrop
              src={CUSTOM_VIDEO_URL}
              progress={smoothProgress}
              reducedMotion={reducedMotion}
            />
          </div>
        ) : !showFallbackPlates ? (
          <Jobjab3DWorld
            progress={smoothProgress}
            manualSceneIdx={manualSceneIdx}
            focusedBillboardId={focusedBillboard?.id ?? null}
            onHoverBillboard={setHoveredBillboard}
            onSelectBillboard={handleSelectBillboard}
            reducedMotion={reducedMotion}
            onWebGLReady={setWebglReady}
          />
        ) : (
          <div className="pointer-events-none absolute inset-0 z-0">
            <img
              src={currentScene.fallbackImg.src}
              alt={`${currentScene.label} anime cityscape`}
              className="h-full w-full object-cover object-center"
            />
            <FallingLeaves />
          </div>
        )}

        {/* Lightweight Edge Vignettes Only — Keeps 85% Center 3D View Completely Open */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-[#0b0e13]/68 via-[#0b0e13]/22 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-[#0b0e13]/72 to-transparent"
        />

        {/* Floating Cinema Masthead */}
        <Header
          variant="overlay"
          activeScene={{ code: currentScene.code, label: currentScene.label }}
          scrollProgress={reducedMotion ? undefined : smoothProgress}
        />

        <div aria-hidden="true" className="pointer-events-none h-16 shrink-0" />

        {/* Billboard Focus Inspection Card (Right Side Dossier when Sign Clicked) */}
        <AnimatePresence>
          {focusedBillboard && (
            <motion.aside
              key={focusedBillboard.id}
              data-testid="billboard-inspector"
              aria-label={`Inspecting ${focusedBillboard.title}`}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto absolute bottom-20 right-5 z-30 max-h-[calc(100dvh-185px)] w-[min(92vw,390px)] overflow-y-auto border border-[#f8f1e3]/20 bg-[#11151e]/95 p-5 sm:right-8 sm:p-6 lg:right-10"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-editorial text-2xl font-medium leading-tight text-[#f8f1e3]">
                  {focusedBillboard.title}
                </h2>
                <button
                  type="button"
                  onClick={() => handleSelectBillboard(null)}
                  aria-label="Back to street view"
                  className="flex h-7 w-7 shrink-0 items-center justify-center border border-[#f8f1e3]/20 bg-[#0b0e13] text-[#dfd7c8] transition-colors hover:border-[#ec7a26] hover:text-[#ec7a26]"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              <p
                className={`mt-1.5 font-mono text-[11px] uppercase tracking-[0.12em] ${
                  focusedBillboard.accent === "cerulean" ? "text-[#82c4e6]" : "text-[#ec7a26]"
                }`}
              >
                {focusedBillboard.index} · {focusedBillboard.jpTag} · {focusedBillboard.subtitle}
              </p>

              <p className="mt-3 text-xs leading-relaxed text-[#dfd7c8]">
                {focusedBillboard.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5 border-t border-[#f8f1e3]/10 pt-3">
                {focusedBillboard.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-[#f8f1e3]/12 bg-[#171d29] px-2 py-0.5 font-mono text-[11px] text-[#dfd7c8]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {focusedBillboard.liveUrl && (
                  <a
                    href={focusedBillboard.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-1.5 bg-[#ec7a26] px-3.5 py-2 text-xs font-medium text-[#120d08] transition-colors hover:bg-[#d86919]"
                  >
                    <span>Launch Live</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}

                {focusedBillboard.githubUrl && (
                  <a
                    href={focusedBillboard.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-1.5 border border-[#f8f1e3]/20 bg-[#0b0e13] px-3 py-2 text-xs text-[#f8f1e3] transition-colors hover:border-[#ec7a26] hover:text-[#ec7a26]"
                  >
                    <Github className="h-3.5 w-3.5" />
                    <span>GitHub</span>
                  </a>
                )}

                {focusedBillboard.isPrivateRepo && (
                  <Link
                    href="/contact"
                    className="inline-flex flex-1 items-center justify-center gap-1.5 border border-[#ec7a26]/45 bg-[#23170d] px-3 py-2 text-xs font-medium text-[#ec7a26] transition-colors hover:bg-[#ec7a26] hover:text-[#120d08]"
                  >
                    <Lock className="h-3.5 w-3.5" />
                    <span>Private Repo · Request Access</span>
                  </Link>
                )}

                {focusedBillboard.targetRoute && !focusedBillboard.liveUrl && !focusedBillboard.isPrivateRepo && (
                  <Link
                    href={focusedBillboard.targetRoute}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 bg-[#ec7a26] px-3.5 py-2 text-xs font-medium text-[#120d08] transition-colors hover:bg-[#d86919]"
                  >
                    <span>Open Section</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between gap-2 border-t border-[#f8f1e3]/10 pt-3 font-mono text-[11px]">
                <button
                  type="button"
                  onClick={() => handleStepBillboard(-1)}
                  className="inline-flex items-center gap-1 text-[#dfd7c8] transition-colors hover:text-[#ec7a26]"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Prev Sign</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectBillboard(null)}
                  className="text-[#9da4b4] transition-colors hover:text-[#f8f1e3]"
                >
                  Back to Street (ESC)
                </button>
                <button
                  type="button"
                  onClick={() => handleStepBillboard(1)}
                  className="inline-flex items-center gap-1 text-[#ec7a26] transition-colors hover:underline"
                >
                  <span>Next Sign</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Bottom Uncluttered Chrome: Landing Whisper + Slim Control Rail */}
        <div className="pointer-events-none relative z-20 mx-auto flex w-full max-w-[1440px] flex-col gap-3 px-5 pb-5 sm:px-8 sm:pb-7 lg:px-10">
          {/* Minimal Opening Whisper Headline (Fades out on scroll so 3D street is 100% open) */}
          {!focusedBillboard && (
            <motion.div
              data-testid="landing-whisper"
              style={reducedMotion ? undefined : { opacity: titleFadeOpacity }}
              className="pointer-events-none max-w-xl"
            >
              <h1 className="font-editorial text-3xl font-medium leading-[1.02] tracking-[-0.02em] text-[#f8f1e3] sm:text-4xl">
                Craft, systems, code, motion.
              </h1>
              <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[#dfd7c8]">
                Scroll to walk · Hover or click any anime digital sign
              </p>
            </motion.div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Compact Bottom-Left Navigation & Scene Pills */}
            <div className="pointer-events-auto flex flex-wrap items-center gap-1.5">
              <a
                href="#flagship"
                className="inline-flex items-center gap-1.5 bg-[#ec7a26] px-3 py-1.5 text-xs font-medium text-[#120d08] transition-colors hover:bg-[#d86919]"
              >
                <span>Explore 37 Works</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>

              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="border border-[#f8f1e3]/28 bg-[#0b0e13]/80 px-3 py-1.5 text-xs text-[#f8f1e3] transition-colors hover:border-[#ec7a26] hover:text-[#ec7a26]"
              >
                Ask AI
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
                      className={`border px-2 py-1.5 font-mono text-[10px] transition-colors sm:text-[11px] ${
                        active
                          ? "border-[#ec7a26] bg-[#23170d] font-medium text-[#f8f1e3]"
                          : "border-[#f8f1e3]/20 bg-[#0b0e13]/75 text-[#dfd7c8] hover:border-[#f8f1e3]/45 hover:text-[#f8f1e3]"
                      }`}
                    >
                      {sc.code}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Minimal Hover Prompt Badge in Center/Right when hovering a 3D Billboard */}
            <AnimatePresence>
              {hoveredBillboard && !focusedBillboard && (
                <motion.button
                  key={hoveredBillboard.id}
                  type="button"
                  onClick={() => handleSelectBillboard(hoveredBillboard)}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.14 }}
                  className="pointer-events-auto inline-flex items-center gap-2 border border-[#ec7a26]/55 bg-[#0b0e13]/90 px-3 py-1.5 font-mono text-[11px] text-[#f8f1e3]"
                >
                  <Eye className="h-3.5 w-3.5 text-[#ec7a26]" />
                  <span className="text-[#ec7a26]">{hoveredBillboard.jpTag}</span>
                  <span>{hoveredBillboard.title}</span>
                  <span className="text-[#9da4b4]">· Click to inspect</span>
                </motion.button>
              )}
            </AnimatePresence>

            {/* Minimal Bottom-Right Meter Strip + Vertical Stamp */}
            <div className="pointer-events-none flex items-center gap-3">
              <span
                data-testid="walk-telemetry"
                data-walk-meters={walkMeters}
                className="font-mono text-[11px] tabular-nums tracking-[0.12em] text-[#ec7a26]"
              >
                {String(walkMeters).padStart(3, "0")}m
              </span>
              <div className="h-7 w-px overflow-hidden bg-[#f8f1e3]/20">
                <motion.div
                  className="h-full w-full origin-top bg-[#ec7a26]"
                  style={{ scaleY: reducedMotion ? 1 : smoothProgress }}
                />
              </div>
              <div className="flex items-center gap-2 border-l border-[#f8f1e3]/25 pl-3 text-[#f8f1e3]">
                <span className="vertical-stamp font-editorial text-sm font-medium tracking-[0.15em]">
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
