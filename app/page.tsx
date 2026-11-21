"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { ArrowRight, ArrowUpRight, Award, Github, Menu, X } from "lucide-react";
import { useChat } from "@/context/ChatContext";
import { Footer } from "@/components/layout/Footer";
import { QuantBotCard } from "@/components/projects/QuantBotCard";
import { PlatformProjectCard } from "@/components/projects/PlatformProjectCard";
import {
  awardsData,
  flagshipProjects,
  platformProjects,
  quantBotProjects,
  techMatrix,
  web3Projects,
} from "@/lib/portfolio-data";

import plasterWallImg from "@/assets/plates/plaster-wall.png";
import leadPreviewImg from "@/assets/plates/lead-preview.png";
import thumb02Img from "@/assets/plates/thumb-02.png";
import thumb03Img from "@/assets/plates/thumb-03.png";
import thumb04Img from "@/assets/plates/thumb-04.png";
import thumb05Img from "@/assets/plates/thumb-05.png";
import thumb06Img from "@/assets/plates/thumb-06.png";

const plateMap = {
  "lead-preview": leadPreviewImg,
  "thumb-02": thumb02Img,
  "thumb-03": thumb03Img,
  "thumb-04": thumb04Img,
  "thumb-05": thumb05Img,
  "thumb-06": thumb06Img,
} as const;

const stripMeta = [
  {
    index: "02",
    projectIdx: 1,
    cardClass: "r-card-02",
    numClass: "r-num-02",
    thumbClass: "r-thumb-02",
    labelClass: "r-label-02",
    cardId: "card-02",
    numId: "num-02",
    thumbId: "thumb-02",
    labelId: "label-02",
    bg: "linear-gradient(125deg, #d3ceca 0%, #dcd7d2 100%)",
    imgAdjust: "",
  },
  {
    index: "03",
    projectIdx: 2,
    cardClass: "r-card-03",
    numClass: "r-num-03",
    thumbClass: "r-thumb-03",
    labelClass: "r-label-03",
    cardId: "card-03",
    numId: "num-03",
    thumbId: "thumb-03",
    labelId: "label-03",
    bg: "linear-gradient(125deg, #cdc8c3 0%, #d8d3cd 100%)",
    imgAdjust: "scale-[1.09] brightness-[0.93]",
  },
  {
    index: "04",
    projectIdx: 3,
    cardClass: "r-card-04",
    numClass: "r-num-04",
    thumbClass: "r-thumb-04",
    labelClass: "r-label-04",
    cardId: "card-04",
    numId: "num-04",
    thumbId: "thumb-04",
    labelId: "label-04",
    bg: "linear-gradient(125deg, #e2ddd7 0%, #ede8e2 100%)",
    imgAdjust: "scale-[1.04]",
  },
  {
    index: "05",
    projectIdx: 4,
    cardClass: "r-card-05",
    numClass: "r-num-05",
    thumbClass: "r-thumb-05",
    labelClass: "r-label-05",
    cardId: "card-05",
    numId: "num-05",
    thumbId: "thumb-05",
    labelId: "label-05",
    bg: "linear-gradient(125deg, #efe9e1 0%, #f7f1e9 100%)",
    imgAdjust: "scale-[1.04]",
  },
  {
    index: "06",
    projectIdx: 5,
    cardClass: "r-card-06",
    numClass: "r-num-06",
    thumbClass: "r-thumb-06",
    labelClass: "r-label-06",
    cardId: "card-06",
    numId: "num-06",
    thumbId: "thumb-06",
    labelId: "label-06",
    bg: "linear-gradient(125deg, #ebe4dc 0%, #f5eee6 100%)",
    imgAdjust: "scale-[1.05]",
  },
] as const;

const web3HeroCells = [
  {
    regionId: "web3-cell-1",
    className: "r-web3-cell-1",
    label: "fhevm-react-template · Zama $5k Winner",
    href: "https://jobjab-fhevm-react-template-nextjs.vercel.app/",
  },
  {
    regionId: "web3-cell-2",
    className: "r-web3-cell-2",
    label: "ZipherLaunch",
    href: "https://zipher-launch.vercel.app/",
  },
  {
    regionId: "web3-cell-3",
    className: "r-web3-cell-3",
    label: "Monad World",
    href: "https://www.monadworld.xyz/",
  },
  {
    regionId: "web3-cell-4",
    className: "r-web3-cell-4",
    label: "Zadiction",
    href: "https://zadiction-nextjs.vercel.app/",
  },
  {
    regionId: "web3-cell-5",
    className: "r-web3-cell-5",
    label: "Paylink",
    href: "https://paylink-psi.vercel.app/",
  },
];

const wallCrosshairs = [
  { left: "2.1%", top: "11.2%" },
  { left: "36.0%", top: "11.2%" },
  { left: "69.7%", top: "11.2%" },
  { left: "97.8%", top: "11.2%" },
  { left: "2.1%", top: "50.0%" },
  { left: "69.7%", top: "50.0%" },
  { left: "97.8%", top: "50.0%" },
  { left: "2.1%", top: "86.5%" },
  { left: "36.0%", top: "86.5%" },
  { left: "69.7%", top: "86.5%" },
  { left: "97.8%", top: "86.5%" },
];

export default function Home() {
  const { sendMessage } = useChat();
  const [aiQuery, setAiQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeProject = flagshipProjects[activeIndex];
  const activePlate = plateMap[activeProject.plateKey];
  const isDefaultLead = activeIndex === 0;
  const award = awardsData[0];

  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;
    sendMessage(aiQuery.trim());
    setAiQuery("");
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col proofing-wall-ground text-[#121110]">
        {/* ============================================================
            FIRST VIEWPORT: DESKTOP MEASURED STUDIO PROOFING WALL (>= lg)
           ============================================================ */}
        <section
          aria-label="Studio Proofing Wall Showcase"
          className="hidden lg:block proofing-wall-stage proofing-wall-ground"
        >
          {/* Background Plaster Material Plate */}
          <img
            src={plasterWallImg.src}
            alt="Warm sunlit architectural plaster wall surface"
            data-region="plaster-wall"
            className="r-plaster-wall pointer-events-none select-none object-cover"
          />

          {/* Registration Crosshairs on Plaster Wall */}
          {wallCrosshairs.map((pos, i) => (
            <svg
              key={i}
              aria-hidden="true"
              viewBox="0 0 18 18"
              className="pointer-events-none absolute z-[2] -translate-x-1/2 -translate-y-1/2"
              style={{
                left: pos.left,
                top: pos.top,
                width: "calc(18 / 1376 * 100cqw)",
                height: "calc(18 / 1376 * 100cqw)",
              }}
            >
              <line x1="9" y1="0" x2="9" y2="18" stroke="rgba(20,19,17,0.58)" strokeWidth="1" />
              <line x1="0" y1="9" x2="18" y2="9" stroke="rgba(20,19,17,0.58)" strokeWidth="1" />
            </svg>
          ))}

          {/* Top Architectural Masthead */}
          <header
            data-region="masthead-bar"
            className="r-masthead-bar z-20 border-b border-[#141311]/45"
            style={{
              background:
                "linear-gradient(90deg, rgba(195,181,167,0.45) 0%, rgba(228,211,183,0.65) 26%, rgba(183,168,148,0.65) 68%, rgba(182,165,142,0.92) 100%)",
            }}
          />

          <Link
            href="/"
            data-region="brand-wordmark"
            className="r-brand-wordmark z-30 flex items-center font-normal uppercase tracking-[-0.015em] text-[#0f0c0a] whitespace-nowrap hover:opacity-75"
            style={{
              fontSize: "calc(23 / 1376 * 100cqw)",
              lineHeight: 1,
            }}
          >
            JOBJAB · CREATIVE TECHNOLOGIST &amp; DESIGN ENGINEER
          </Link>

          <nav
            aria-label="Primary Navigation"
            data-region="nav-links"
            className="r-nav-links z-30 flex items-center justify-center gap-[0.30em] font-normal tracking-[-0.01em] text-[#120c0b] whitespace-nowrap"
            style={{
              fontSize: "calc(18.5 / 1376 * 100cqw)",
              lineHeight: 1,
            }}
          >
            <Link href="/" className="underline decoration-[#120c0b]/85 decoration-1 underline-offset-[3px]">
              Home
            </Link>
            <span className="text-[#120c0b]/60">/</span>
            <Link href="/projects" className="hover:underline underline-offset-[3px]">
              Projects
            </Link>
            <span className="text-[#120c0b]/60">/</span>
            <Link href="/about" className="hover:underline underline-offset-[3px]">
              About
            </Link>
            <span className="text-[#120c0b]/60">/</span>
            <Link href="/awards" className="hover:underline underline-offset-[3px]">
              Awards
            </Link>
            <span className="text-[#120c0b]/60">/</span>
            <Link href="/contact" className="hover:underline underline-offset-[3px]">
              Contact
            </Link>
          </nav>

          <div
            data-region="ai-prompt-pill"
            className="r-ai-prompt-pill z-30 flex items-center"
            style={{
              padding: "calc(1/1376*100cqw) calc(2/1376*100cqw) calc(5/1376*100cqw) calc(3/1376*100cqw)",
            }}
          >
            <form
              onSubmit={handleAiSubmit}
              className="flex h-full w-full items-center justify-between rounded-full border border-[#2d1d11] bg-transparent pl-[calc(15/1376*100cqw)] pr-[calc(3/1376*100cqw)] transition-colors focus-within:border-[#120c0b]"
            >
              <input
                type="text"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                placeholder="Ask Jobjab AI..."
                aria-label="Ask Jobjab AI"
                className="min-w-0 flex-1 bg-transparent font-normal text-[#2d1d11] placeholder:text-[#2d1d11]/95 focus:outline-none"
                style={{
                  fontSize: "calc(19 / 1376 * 100cqw)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.008em",
                }}
              />
              <button
                type="submit"
                aria-label="Ask AI Assistant"
                className="flex shrink-0 items-center justify-center rounded-full bg-[#0c0908] text-[#c8bba7] transition-colors hover:bg-[#ea681d] hover:text-[#121110]"
                style={{
                  width: "calc(33 / 1376 * 100cqw)",
                  height: "calc(33 / 1376 * 100cqw)",
                }}
              >
                <ArrowRight
                  strokeWidth={1.5}
                  style={{
                    width: "calc(16 / 1376 * 100cqw)",
                    height: "calc(16 / 1376 * 100cqw)",
                  }}
                />
              </button>
            </form>
          </div>

          {/* Monumental Lead Proof Sheet */}
          <article aria-label={`Featured Build ${activeProject.title}`} className="contents">
            <div
              data-region="lead-sheet"
              className="r-lead-sheet proof-shadow z-10 overflow-hidden"
              style={{
                background: "linear-gradient(115deg, #d7d2ca 0%, #eae5de 26%, #f2eee6 68%, #ebe6df 100%)",
              }}
            >
              <span className="pointer-events-none absolute left-[1.6%] top-[2.4%] h-[2.2%] w-[1.4%] border-b border-r border-[#141311]/35" />
              <span className="pointer-events-none absolute right-[1.6%] top-[2.4%] h-[2.2%] w-[1.4%] border-b border-l border-[#141311]/35" />
              <span className="pointer-events-none absolute bottom-[2.4%] left-[1.6%] h-[2.2%] w-[1.4%] border-r border-t border-[#141311]/35" />
              <span className="pointer-events-none absolute bottom-[2.4%] right-[1.6%] h-[2.2%] w-[1.4%] border-l border-t border-[#141311]/35" />
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.h1
                key={`title-${activeProject.id}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                data-region="lead-headline"
                className="r-lead-headline z-20 flex items-start font-normal text-[#0a0a0a]"
                style={{
                  fontFamily: "'Rambla', sans-serif",
                  fontSize: "calc(56 / 1376 * 100cqw)",
                  fontWeight: 400,
                  lineHeight: 1.07,
                  letterSpacing: "-0.012em",
                }}
              >
                <span className="shrink-0 pr-[calc(24/1376*100cqw)]">{activeProject.index}</span>
                <span>
                  {isDefaultLead ? (
                    <>
                      HÄNSEL &amp; ROTH — Live SSE
                      <br />
                      &amp; React 19 Auction Engine
                    </>
                  ) : (
                    <>
                      {activeProject.title} —
                      <br />
                      {activeProject.shortLabel.split("·")[1]?.trim() || activeProject.shortLabel}
                    </>
                  )}
                </span>
              </motion.h1>
            </AnimatePresence>

            <figure data-region="lead-preview" className="r-lead-preview z-20 m-0 overflow-hidden bg-[#cecac3]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={`preview-${activeProject.id}`}
                  src={activePlate.src}
                  alt={`${activeProject.title} live application preview`}
                  initial={{ opacity: 0.35, scale: 1.015 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.35 }}
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full w-full object-cover object-center"
                />
              </AnimatePresence>
            </figure>

            <p
              data-region="lead-stack"
              className="r-lead-stack z-20 m-0 flex items-center uppercase tracking-[-0.018em] text-[#0b0b0a] whitespace-nowrap"
              style={{
                fontSize: "calc(23 / 1376 * 100cqw)",
                lineHeight: 1,
              }}
            >
              {activeProject.stackLine}
            </p>

            <div data-region="lead-cta" className="r-lead-cta z-20 flex p-[calc(3/1376*100cqw)]">
              <a
                href={activeProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full w-full items-center justify-center gap-[calc(6/1376*100cqw)] rounded-[4px] bg-[#e9641d] font-normal text-[#140c08] transition-colors hover:bg-[#d85a12]"
                style={{
                  fontSize: "calc(22 / 1376 * 100cqw)",
                  lineHeight: 1,
                }}
              >
                <span>Launch Live</span>
                <ArrowUpRight
                  style={{
                    width: "calc(20 / 1376 * 100cqw)",
                    height: "calc(20 / 1376 * 100cqw)",
                  }}
                  strokeWidth={1.65}
                />
              </a>
            </div>
          </article>

          {/* Right Vertical Contact Strip (02-06) */}
          {stripMeta.map((slot) => {
            const item = flagshipProjects[slot.projectIdx];
            const plate = plateMap[item.plateKey];
            const isSelected = activeIndex === slot.projectIdx;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(isSelected ? 0 : slot.projectIdx)}
                aria-label={`Inspect proof ${item.index}: ${item.title}`}
                className="contents cursor-pointer text-left"
              >
                <div
                  data-region={slot.cardId}
                  className={`${slot.cardClass} strip-shadow z-10 transition-transform duration-150 ${
                    isSelected ? "ring-2 ring-[#ea681d] -translate-x-1" : "hover:-translate-x-0.5"
                  }`}
                  style={{ background: slot.bg }}
                />
                <span
                  data-region={slot.numId}
                  className={`${slot.numClass} z-20 flex items-start justify-end pr-[calc(2/1376*100cqw)] font-normal text-[#080808]`}
                  style={{
                    fontSize: "calc(21.5 / 1376 * 100cqw)",
                    lineHeight: 0.85,
                    filter: "grayscale(1)",
                  }}
                >
                  {slot.index}
                </span>
                <figure
                  data-region={slot.thumbId}
                  className={`${slot.thumbClass} z-20 m-0 overflow-hidden`}
                >
                  <img
                    src={plate.src}
                    alt={`${item.title} thumbnail`}
                    className={`h-full w-full object-cover object-center ${slot.imgAdjust}`}
                  />
                </figure>
                <span
                  data-region={slot.labelId}
                  className={`${slot.labelClass} z-20 flex items-center font-normal text-[#121110] whitespace-nowrap`}
                  style={{
                    fontSize: "calc(16.8 / 1376 * 100cqw)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.005em",
                  }}
                >
                  {item.shortLabel}
                </span>
              </button>
            );
          })}

          {/* Bottom Confidential Web3 & Zama FHEVM Ledger Course Band */}
          <div
            aria-label="Confidential Web3 and Zama FHEVM quick index"
            data-region="web3-band"
            className="r-web3-band z-20 bg-[#171837]"
          />

          <h2
            data-region="web3-heading"
            className="r-web3-heading z-30 m-0 flex items-center font-normal uppercase tracking-[-0.008em] text-[#a6a7b8] whitespace-nowrap"
            style={{
              fontSize: "calc(19.5 / 1376 * 100cqw)",
              lineHeight: 1,
            }}
          >
            CONFIDENTIAL WEB3 &amp; ZAMA FHEVM
          </h2>

          {web3HeroCells.map((cell) => (
            <a
              key={cell.regionId}
              href={cell.href}
              target="_blank"
              rel="noopener noreferrer"
              data-region={cell.regionId}
              className={`${cell.className} z-30 flex items-center justify-between border border-[#e8e3dd]/45 px-[calc(12/1376*100cqw)] text-[#eeeef5] transition-colors hover:border-[#ea681d] hover:bg-white/5`}
              style={{
                fontSize: "calc(19 / 1376 * 100cqw)",
                lineHeight: 1,
              }}
            >
              <span className="truncate">{cell.label}</span>
              <ArrowUpRight
                className="shrink-0 opacity-85"
                style={{
                  width: "calc(18 / 1376 * 100cqw)",
                  height: "calc(18 / 1376 * 100cqw)",
                }}
                strokeWidth={1.6}
              />
            </a>
          ))}
        </section>

        {/* ============================================================
            FIRST VIEWPORT: MOBILE & TABLET PROOFING WALL (< lg)
           ============================================================ */}
        <section className="lg:hidden proofing-wall-ground">
          <header className="border-b border-[#141311]/45 px-4 py-3">
            <div className="flex items-center justify-between gap-2">
              <Link href="/" className="text-xs font-normal uppercase tracking-[0.02em] text-[#0f0c0a]">
                JOBJAB · CREATIVE TECH &amp; DESIGN ENG
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
                className="flex h-8 w-8 items-center justify-center border border-[#141311]/35 bg-[#efebe4] text-[#121110]"
              >
                {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>

            {mobileMenuOpen && (
              <nav className="mt-3 flex flex-col gap-1 border-t border-[#141311]/15 pt-2 text-sm text-[#120c0b]">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="py-1 font-medium text-[#ea681d]">Home</Link>
                <Link href="/projects" onClick={() => setMobileMenuOpen(false)} className="py-1">Projects (37)</Link>
                <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="py-1">About &amp; Stack</Link>
                <Link href="/awards" onClick={() => setMobileMenuOpen(false)} className="py-1">Awards</Link>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="py-1">Contact</Link>
              </nav>
            )}

            <form
              onSubmit={handleAiSubmit}
              className="mt-2.5 flex h-9 items-center justify-between rounded-full border border-[#2d1d11] bg-white/15 pl-3.5 pr-1"
            >
              <input
                type="text"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                placeholder="Ask Jobjab AI..."
                aria-label="Ask Jobjab AI mobile"
                className="min-w-0 flex-1 bg-transparent text-sm text-[#120c0b] placeholder:text-[#2d1d11]/85 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Submit mobile AI query"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0c0908] text-[#efeae3]"
              >
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>
          </header>

          <div className="space-y-4 p-4">
            <article className="proof-shadow bg-[#f2eee6] p-4">
              <div className="flex items-start gap-2.5 text-2xl leading-tight text-[#0a0a0a]">
                <span className="shrink-0">{activeProject.index}</span>
                <span>{activeProject.title} — {activeProject.shortLabel.split("·")[1]?.trim() || activeProject.shortLabel}</span>
              </div>

              <div className="my-3 aspect-[16/9] w-full overflow-hidden bg-[#cecac3]">
                <img
                  src={activePlate.src}
                  alt={activeProject.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#3a352e]">
                {activeProject.stackLine}
              </p>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 border border-[#141311]/30 bg-white/60 py-2 text-xs text-[#121110]"
                >
                  <Github className="h-3.5 w-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-[4px] bg-[#ea681d] py-2 text-xs font-medium text-[#120e0a]"
                >
                  <span>Launch Live</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </article>

            {/* Mobile Strip Selector */}
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {flagshipProjects.map((proj, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`strip-shadow flex flex-col justify-between border p-2.5 text-left ${
                      isActive
                        ? "border-[#ea681d] bg-[#f7f3ec]"
                        : "border-[#141311]/15 bg-[#e6e1db]"
                    }`}
                  >
                    <span className="font-mono text-xs text-[#0a0a0a]">{proj.index}</span>
                    <span className="mt-1 truncate text-xs text-[#121110]">{proj.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-[#171837] p-4 text-[#eeeef5]">
            <p className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.1em] text-[#a6a7b8]">
              CONFIDENTIAL WEB3 &amp; ZAMA FHEVM
            </p>
            <div className="grid gap-2">
              {web3HeroCells.map((cell) => (
                <a
                  key={cell.regionId}
                  href={cell.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between border border-[#e8e3dd]/35 px-3 py-2 text-xs text-[#eeeef5]"
                >
                  <span className="truncate">{cell.label}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[#ea681d]" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            BELOW THE FOLD: FULL 37-SYSTEM STUDIO CATALOGUE & UNIFIED TECH
           ============================================================ */}
        <main className="flex-1">
          {/* Section 1: 6 Flagship Interactive Systems Detailed Breakdown */}
          <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="mb-10 flex flex-col justify-between gap-4 border-b border-[#141311]/30 pb-6 md:flex-row md:items-end">
              <div>
                <h2 className="text-3xl font-normal tracking-tight text-[#0a0a0a] sm:text-4xl">
                  Six Purpose-Built Web Runtimes &amp; Engines (01–06)
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-[#433e37]">
                  Standalone flagship deployments engineered across disparate frontend architectures with zero shared UI templates.
                </p>
              </div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.12em] text-[#171837] underline underline-offset-4 hover:text-[#ea681d]"
              >
                <span>Open Full Filterable Archive (37)</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {flagshipProjects.map((proj) => {
                const plate = plateMap[proj.plateKey];
                return (
                  <motion.article
                    key={proj.id}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className="proof-shadow flex flex-col justify-between bg-[#f2eee6] p-5"
                  >
                    <div>
                      <div className="mb-4 aspect-[16/9] w-full overflow-hidden bg-[#d8d3cc]">
                        <img
                          src={plate.src}
                          alt={`${proj.title} studio plate preview`}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="text-2xl font-normal tracking-tight text-[#0a0a0a]">
                          {proj.index} · {proj.title}
                        </h3>
                        <span className="shrink-0 font-mono text-[11px] text-[#ea681d]">
                          {proj.shortLabel.split("·")[1]?.trim()}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-[#38332c]">
                        {proj.description}
                      </p>

                      <ul className="mt-4 space-y-1.5 border-t border-[#141311]/10 pt-3 text-xs leading-relaxed text-[#433e37]">
                        {proj.mechanics.map((mech) => (
                          <li key={mech} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#ea681d]" />
                            <span>{mech}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-5 border-t border-[#141311]/12 pt-4">
                      <div className="mb-4 flex flex-wrap gap-1.5">
                        {proj.tags.map((tag) => (
                          <span
                            key={tag}
                            className="border border-[#141311]/15 bg-[#e8e3dd] px-2 py-0.5 font-mono text-[11px] text-[#1a1815]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 border border-[#141311]/30 bg-white/60 px-3 py-2 text-xs text-[#121110] transition-colors hover:border-[#121110] hover:bg-white"
                        >
                          <Github className="h-3.5 w-3.5" />
                          <span>GitHub</span>
                        </a>
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 rounded-[3px] bg-[#ea681d] px-3 py-2 text-xs font-medium text-[#120e0a] transition-colors hover:bg-[#d85a12]"
                        >
                          <span>Launch Live</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </section>

          {/* Section 2: 11 Algorithmic Trading & Perp DEX Market-Making Engines */}
          <section className="mx-auto max-w-[1440px] border-t border-[#141311]/20 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="mb-10 flex flex-col justify-between gap-4 border-b border-[#141311]/30 pb-6 md:flex-row md:items-end">
              <div>
                <h2 className="text-3xl font-normal tracking-tight text-[#0a0a0a] sm:text-4xl">
                  Algorithmic Trading &amp; Market-Making Engines (07–17)
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-[#433e37]">
                  Asynchronous Python WebSocket trading bots, multi-level ladder market makers, and automated concentrated-liquidity engines across 11 Perp DEXs, CLOBs, and AMMs.
                </p>
              </div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.12em] text-[#171837] underline underline-offset-4 hover:text-[#ea681d]"
              >
                <span>Filter 11 Quant Bots</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {quantBotProjects.map((proj) => (
                <QuantBotCard key={proj.id} proj={proj} />
              ))}
            </div>
          </section>

          {/* Section 3: 10 Production SaaS, Fintech & AI Platforms */}
          <section className="mx-auto max-w-[1440px] border-t border-[#141311]/20 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="mb-10 flex flex-col justify-between gap-4 border-b border-[#141311]/30 pb-6 md:flex-row md:items-end">
              <div>
                <h2 className="text-3xl font-normal tracking-tight text-[#0a0a0a] sm:text-4xl">
                  Production SaaS, Fintech &amp; AI Platforms (18–27)
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-[#433e37]">
                  Commercial full-stack systems spanning DeFi liquidity vaults, cloud/offline multi-store POS, crypto payment rails, FFmpeg WASM captioning, GPU 3D reconstruction, and automated AI pipelines.
                </p>
              </div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.12em] text-[#171837] underline underline-offset-4 hover:text-[#ea681d]"
              >
                <span>Filter 10 SaaS &amp; AI Builds</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {platformProjects.map((proj) => (
                <PlatformProjectCard key={proj.id} proj={proj} />
              ))}
            </div>
          </section>

          {/* Section 4: Complete Confidential Web3 & Zama FHEVM Ledger (All 10 Projects) */}
          <section className="border-y border-[#e8e3dd]/20 bg-[#171837] py-16 text-[#eeeef5] lg:py-20">
            <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
              <div className="mb-10 flex flex-col justify-between gap-4 border-b border-[#e8e3dd]/20 pb-6 md:flex-row md:items-end">
                <div>
                  <h2 className="text-3xl font-normal tracking-tight text-[#f6f2eb] sm:text-4xl">
                    Ten Live On-Chain Privacy &amp; Layer-2 Protocols (28–37)
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm text-[#c6c7d6]">
                    Confidential smart contract protocols powered by Zama FHEVM, Monad, and Morph Layer 2.
                  </p>
                </div>
                <Link
                  href="/awards"
                  className="inline-flex items-center gap-2 border border-[#ea681d]/60 bg-[#ea681d]/15 px-3.5 py-2 font-mono text-xs text-[#f6f2eb] transition-colors hover:bg-[#ea681d] hover:text-[#121110]"
                >
                  <Award className="h-4 w-4" />
                  <span>1st Place ($5,000) Zama Bounty Track</span>
                </Link>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {web3Projects.map((proj) => (
                  <article
                    key={proj.id}
                    className="flex flex-col justify-between border border-[#e8e3dd]/25 bg-[#12132d] p-5 transition-colors hover:border-[#ea681d]/75"
                  >
                    <div>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-2xl font-normal text-[#f6f2eb]">
                          {proj.index} · {proj.title}
                        </h3>
                        {proj.highlight && (
                          <span className="bg-[#ea681d] px-2.5 py-0.5 font-mono text-[11px] font-medium text-[#121110]">
                            {proj.highlight}
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-[#c6c7d6]">
                        {proj.description}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {proj.tags.map((t) => (
                          <span
                            key={t}
                            className="border border-[#e8e3dd]/20 bg-white/5 px-2 py-0.5 font-mono text-[11px] text-[#dcdde9]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-2.5 border-t border-[#e8e3dd]/15 pt-4">
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 border border-[#e8e3dd]/30 px-3 py-2 text-xs text-[#f6f2eb] transition-colors hover:border-[#f6f2eb] hover:bg-white/10"
                      >
                        <Github className="h-3.5 w-3.5" />
                        <span>GitHub</span>
                      </a>
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 bg-[#ea681d] px-3 py-2 text-xs font-medium text-[#120e0a] transition-colors hover:bg-[#d85a12]"
                      >
                        <span>Launch Live</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Section 3: Unified Multi-Stack Engineering Capabilities + Award Dossier */}
          <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="mb-10 flex flex-col justify-between gap-4 border-b border-[#141311]/30 pb-6 md:flex-row md:items-end">
              <div>
                <h2 className="text-3xl font-normal tracking-tight text-[#0a0a0a] sm:text-4xl">
                  Frontend Runtimes, Interactive Engines &amp; On-Chain Privacy
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-[#433e37]">
                  Full-spectrum production stack across browser audio/canvas engines, reactive UIs, and confidential contracts.
                </p>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.12em] text-[#171837] underline underline-offset-4 hover:text-[#ea681d]"
              >
                <span>Full Studio Bio</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {techMatrix.map((col) => (
                <div
                  key={col.code}
                  className="strip-shadow flex flex-col justify-between bg-[#f2eee6] p-5"
                >
                  <div>
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-xl font-normal text-[#0a0a0a]">{col.group}</h3>
                      <span className="font-mono text-xs text-[#5a544d]">{col.code}</span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-[#433e37]">{col.summary}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5 border-t border-[#141311]/10 pt-3">
                    {col.items.map((tech) => (
                      <span
                        key={tech}
                        className="border border-[#141311]/15 bg-[#e8e3dd] px-2 py-0.5 font-mono text-[11px] text-[#121110]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Zama Award Callout Sheet */}
            <div className="proof-shadow mt-10 flex flex-col justify-between gap-6 bg-[#f6f2eb] p-6 sm:p-8 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <h3 className="text-2xl font-normal text-[#0a0a0a] sm:text-3xl">
                  {award.title} — {award.projectTitle}
                </h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-[#ea681d]">
                  {award.index} · {award.date} · {award.placement}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#38332c]">{award.description}</p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <a
                  href={award.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-[4px] bg-[#ea681d] px-5 py-2.5 text-sm text-[#120e0a] hover:bg-[#d85a12]"
                >
                  <span>Open SDK Demo</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-[#141311]/30 bg-white px-5 py-2.5 text-sm text-[#121110] hover:border-[#121110]"
                >
                  <span>Contact Jobjab</span>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
}
