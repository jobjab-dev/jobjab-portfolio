"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { ArrowUpRight, Award, Github, Monitor, Terminal } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { InteractiveShell } from "@/components/terminal/InteractiveShell";
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

const trackJumpRows = [
  { href: "#flagship", code: "01-06", label: "Flagship", count: "06 ↗" },
  { href: "#quant", code: "07-17", label: "Quant Bots", count: "11 ↗" },
  { href: "#platforms", code: "18-27", label: "SaaS & AI", count: "10 ↗" },
  { href: "#web3", code: "28-37", label: "Web3 FHEVM", count: "10 ↗" },
];

const web3QuickStrip = [
  {
    label: "fhevm-react-template · Zama $5k",
    href: "https://jobjab-fhevm-react-template-nextjs.vercel.app/",
    highlight: true,
  },
  { label: "ZipherLaunch", href: "https://zipher-launch.vercel.app/", highlight: false },
  { label: "Monad World", href: "https://www.monadworld.xyz/", highlight: false },
  { label: "Zadiction", href: "https://zadiction-nextjs.vercel.app/", highlight: false },
  { label: "Paylink", href: "https://paylink-psi.vercel.app/", highlight: false },
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = flagshipProjects[activeIndex];
  const activePlate = plateMap[activeProject.plateKey];
  const award = awardsData[0];

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col bg-[#050a07] text-[#c9eed6]">
        <Header />

        <main className="flex-1">
          {/* ============================================================
              FIRST VIEWPORT: PHOSPHOR UNIX TERMINAL & TMUX WORKSTATION
             ============================================================ */}
          <section
            aria-label="Phosphor Unix Terminal Workstation"
            className="mx-auto w-full max-w-[1440px] px-4 py-3 sm:px-6 lg:flex lg:h-[calc(100dvh-45px)] lg:min-h-[610px] lg:max-h-[860px] lg:flex-col lg:gap-2.5 lg:px-8 lg:py-3"
          >
            <div className="grid gap-3 lg:min-h-0 lg:flex-1 lg:grid-cols-12">
              {/* Left Pane (7 cols): Interactive Terminal CLI */}
              <div className="min-w-0 lg:col-span-7 lg:min-h-0">
                <InteractiveShell
                  activeFlagshipIdx={activeIndex}
                  onSelectFlagship={setActiveIndex}
                />
              </div>

              {/* Right Column (5 cols): Active Proof Monitor + System Index */}
              <div className="flex min-w-0 flex-col gap-2.5 lg:col-span-5 lg:min-h-0">
                <div className="flex min-w-0 flex-col border border-[#193826] bg-[#08120c] lg:min-h-0 lg:flex-1">
                  <div className="flex shrink-0 items-center justify-between border-b border-[#193826] bg-[#0c1911] px-3 py-1.5 text-xs">
                    <span className="flex min-w-0 items-center gap-2 font-semibold text-[#ebfff2]">
                      <Monitor className="h-3.5 w-3.5 shrink-0 text-[#39ff7a]" />
                      <span className="truncate">[1] proof-monitor // #{activeProject.index}</span>
                    </span>
                    <span className="shrink-0 text-[11px] text-[#39ff7a]">
                      {activeProject.shortLabel.split("·")[1]?.trim() || "LIVE"}
                    </span>
                  </div>

                  <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-between p-3">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeProject.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                        className="flex min-h-0 min-w-0 flex-1 flex-col"
                      >
                        <h1
                          title={activeProject.headline}
                          className="truncate text-sm font-semibold tracking-tight text-[#ebfff2] sm:text-base"
                        >
                          {activeProject.headline}
                        </h1>

                        <div className="my-2 aspect-[16/9] w-full overflow-hidden border border-[#193826] bg-[#050a07] lg:aspect-auto lg:min-h-0 lg:flex-1">
                          <img
                            src={activePlate.src}
                            alt={`${activeProject.title} studio preview`}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <p className="truncate text-[11px] uppercase tracking-[0.06em] text-[#6ca380]">
                          STACK: {activeProject.stackLine}
                        </p>

                        <div className="mt-2 grid grid-cols-2 gap-2">
                          <a
                            href={activeProject.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 border border-[#2f7d4d] bg-[#050a07] py-1.5 text-xs text-[#c9eed6] transition-colors hover:border-[#39ff7a] hover:text-[#39ff7a]"
                          >
                            <Github className="h-3.5 w-3.5" />
                            <span>Source Repo</span>
                          </a>
                          <a
                            href={activeProject.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 bg-[#39ff7a] py-1.5 text-xs font-semibold text-[#041108] transition-colors hover:bg-[#22e563]"
                          >
                            <span>Launch Live</span>
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* 01-06 Proof Selector Bar */}
                    <div className="mt-2.5 grid shrink-0 grid-cols-3 gap-1.5 border-t border-[#193826] pt-2.5 sm:grid-cols-6">
                      {flagshipProjects.map((proj, idx) => {
                        const active = idx === activeIndex;
                        return (
                          <button
                            key={proj.id}
                            type="button"
                            onClick={() => setActiveIndex(idx)}
                            aria-pressed={active}
                            aria-label={`Inspect proof ${proj.index}: ${proj.title}`}
                            className={`border px-1.5 py-1 text-left text-[11px] transition-colors ${
                              active
                                ? "border-[#39ff7a] bg-[#39ff7a] font-semibold text-[#041108]"
                                : "border-[#193826] bg-[#050a07] text-[#c9eed6] hover:border-[#2f7d4d] hover:text-[#39ff7a]"
                            }`}
                          >
                            <span className="block text-[10px] opacity-80">{proj.index}</span>
                            <span className="block truncate">{proj.title.split(" ")[0]}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* System Index Pane */}
                <div className="shrink-0 border border-[#193826] bg-[#08120c]">
                  <div className="flex items-center justify-between border-b border-[#193826] bg-[#0c1911] px-3 py-1 text-[11px] text-[#6ca380]">
                    <span className="font-semibold text-[#ebfff2]">[2] sys-index // /proc/tracks</span>
                    <span>37 TOTAL</span>
                  </div>
                  <div className="grid grid-cols-2 gap-px bg-[#193826]">
                    {trackJumpRows.map((row) => (
                      <a
                        key={row.href}
                        href={row.href}
                        className="flex items-center justify-between gap-1 bg-[#08120c] px-2.5 py-1.5 text-[11px] transition-colors hover:bg-[#0d1c13] hover:text-[#39ff7a]"
                      >
                        <span className="truncate">
                          <span className="mr-1 text-[#6ca380]">[{row.code}]</span>
                          <span>{row.label}</span>
                        </span>
                        <span className="shrink-0 text-[#46e8c8]">{row.count}</span>
                      </a>
                    ))}
                  </div>
                  <Link
                    href="/awards"
                    className="flex items-center justify-between border-t border-[#ffb000]/40 bg-[#191205] px-3 py-1.5 text-[11px] text-[#ffb000] transition-colors hover:bg-[#ffb000] hover:text-[#041108]"
                  >
                    <span className="flex min-w-0 items-center gap-2 font-medium">
                      <Award className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">Zama $5,000 Monthly Bounty Winner (1st Place)</span>
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Full-Width Confidential Web3 Quick-Launch Strip */}
            <div className="mt-3 shrink-0 border border-[#193826] bg-[#08120c] lg:mt-0">
              <div className="flex items-center justify-between gap-2 border-b border-[#193826] bg-[#0c1911] px-3 py-1 text-[11px]">
                <span className="truncate text-[#46e8c8]">CONFIDENTIAL WEB3 &amp; ZAMA FHEVM QUICK_NODES</span>
                <Link href="/projects" className="shrink-0 text-[#39ff7a] hover:underline">
                  open ~/projects (37) →
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-px bg-[#193826] sm:grid-cols-2 lg:grid-cols-5">
                {web3QuickStrip.map((node) => (
                  <a
                    key={node.label}
                    href={node.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-between gap-2 bg-[#08120c] px-3 py-2 text-xs transition-colors hover:bg-[#0d1c13] ${
                      node.highlight ? "text-[#ffb000]" : "text-[#c9eed6] hover:text-[#39ff7a]"
                    }`}
                  >
                    <span className="truncate">{node.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* ============================================================
              TRACK 01: FLAGSHIP INTERACTIVE WEB RUNTIMES (01-06)
             ============================================================ */}
          <section
            id="flagship"
            className="mx-auto max-w-[1440px] border-t border-[#193826] px-4 py-14 sm:px-6 lg:px-8 lg:py-16"
          >
            <div className="mb-8 flex flex-col justify-between gap-4 border-b border-[#193826] pb-5 md:flex-row md:items-end">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-[#ebfff2] sm:text-3xl">
                  Interactive Web Runtimes &amp; Engines (01–06)
                </h2>
                <p className="mt-2 max-w-2xl text-xs leading-relaxed text-[#6ca380]">
                  Standalone full-stack flagship deployments engineered across disparate browser runtimes with real-time state, audio synthesis, and zero-library canvas math.
                </p>
              </div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-xs text-[#39ff7a] underline underline-offset-4 hover:text-[#ffb000]"
              >
                <span>Open Full Filterable Archive (37)</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {flagshipProjects.map((proj) => {
                const plate = plateMap[proj.plateKey];
                return (
                  <article
                    key={proj.id}
                    className="flex flex-col justify-between border border-[#193826] bg-[#08120c] p-5 transition-colors hover:border-[#2f7d4d]"
                  >
                    <div>
                      <div className="mb-4 aspect-[16/9] w-full overflow-hidden border border-[#193826] bg-[#050a07]">
                        <img
                          src={plate.src}
                          alt={`${proj.title} preview`}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="text-lg font-semibold tracking-tight text-[#ebfff2]">
                          [{proj.index}] {proj.title}
                        </h3>
                        <span className="shrink-0 text-[11px] text-[#39ff7a]">
                          {proj.shortLabel.split("·")[1]?.trim()}
                        </span>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-[#c9eed6]">
                        {proj.description}
                      </p>

                      <ul className="mt-4 space-y-1.5 border-t border-[#193826] pt-3 text-xs leading-relaxed text-[#9dc4ac]">
                        {proj.mechanics.map((mech) => (
                          <li key={mech} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#39ff7a]" />
                            <span>{mech}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-5 border-t border-[#193826] pt-4">
                      <div className="mb-4 flex flex-wrap gap-1.5">
                        {proj.tags.map((tag) => (
                          <span
                            key={tag}
                            className="border border-[#193826] bg-[#0d1c13] px-2 py-0.5 text-[11px] text-[#c9eed6]"
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
                          className="flex items-center justify-center gap-1.5 border border-[#2f7d4d] bg-[#050a07] px-3 py-2 text-xs text-[#c9eed6] transition-colors hover:border-[#39ff7a] hover:text-[#39ff7a]"
                        >
                          <Github className="h-3.5 w-3.5" />
                          <span>GitHub</span>
                        </a>
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 bg-[#39ff7a] px-3 py-2 text-xs font-semibold text-[#041108] transition-colors hover:bg-[#22e563]"
                        >
                          <span>Launch Live</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          {/* ============================================================
              TRACK 02: QUANT & PERP DEX TRADING BOTS (07-17)
             ============================================================ */}
          <section
            id="quant"
            className="mx-auto max-w-[1440px] border-t border-[#193826] px-4 py-14 sm:px-6 lg:px-8 lg:py-16"
          >
            <div className="mb-8 flex flex-col justify-between gap-4 border-b border-[#193826] pb-5 md:flex-row md:items-end">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-[#ebfff2] sm:text-3xl">
                  Algorithmic Trading &amp; Market-Making Engines (07–17)
                </h2>
                <p className="mt-2 max-w-2xl text-xs leading-relaxed text-[#6ca380]">
                  Asynchronous Python WebSocket market makers, multi-level quoting ladders, and Uniswap/PancakeSwap V3 concentrated liquidity engines across 11 exchanges.
                </p>
              </div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-xs text-[#ffb000] underline underline-offset-4 hover:text-[#39ff7a]"
              >
                <span>Filter 11 Quant Bots</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {quantBotProjects.map((proj) => (
                <QuantBotCard key={proj.id} proj={proj} />
              ))}
            </div>
          </section>

          {/* ============================================================
              TRACK 03: SAAS, FINTECH & AI PLATFORMS (18-27)
             ============================================================ */}
          <section
            id="platforms"
            className="mx-auto max-w-[1440px] border-t border-[#193826] px-4 py-14 sm:px-6 lg:px-8 lg:py-16"
          >
            <div className="mb-8 flex flex-col justify-between gap-4 border-b border-[#193826] pb-5 md:flex-row md:items-end">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-[#ebfff2] sm:text-3xl">
                  Production SaaS, Fintech &amp; AI Platforms (18–27)
                </h2>
                <p className="mt-2 max-w-2xl text-xs leading-relaxed text-[#6ca380]">
                  Commercial platforms covering Base L2 liquidity vaults, multi-store POS systems, 0%-fee crypto payment gateways, FFmpeg WASM captioning, and GPU 3D inference APIs.
                </p>
              </div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-xs text-[#46e8c8] underline underline-offset-4 hover:text-[#39ff7a]"
              >
                <span>Filter 10 SaaS &amp; AI Builds</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {platformProjects.map((proj) => (
                <PlatformProjectCard key={proj.id} proj={proj} />
              ))}
            </div>
          </section>

          {/* ============================================================
              TRACK 04: CONFIDENTIAL WEB3 & ZAMA FHEVM PROTOCOLS (28-37)
             ============================================================ */}
          <section
            id="web3"
            className="border-y border-[#193826] bg-[#060f0b] py-14 lg:py-16"
          >
            <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
              <div className="mb-8 flex flex-col justify-between gap-4 border-b border-[#193826] pb-5 md:flex-row md:items-end">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-[#ebfff2] sm:text-3xl">
                    Ten Live On-Chain Privacy &amp; Layer-2 Protocols (28–37)
                  </h2>
                  <p className="mt-2 max-w-2xl text-xs leading-relaxed text-[#6ca380]">
                    Confidential smart contract protocols powered by Zama FHEVM, Monad, and Morph Layer 2 with verified live deployments.
                  </p>
                </div>
                <Link
                  href="/awards"
                  className="inline-flex items-center gap-2 border border-[#ffb000]/55 bg-[#191205] px-3.5 py-2 text-xs text-[#ffb000] transition-colors hover:bg-[#ffb000] hover:text-[#041108]"
                >
                  <Award className="h-4 w-4" />
                  <span>1st Place ($5,000) Zama Bounty Track</span>
                </Link>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {web3Projects.map((proj) => (
                  <article
                    key={proj.id}
                    className="flex flex-col justify-between border border-[#193826] bg-[#08120c] p-5 transition-colors hover:border-[#2f7d4d]"
                  >
                    <div>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-lg font-semibold text-[#ebfff2]">
                          [{proj.index}] {proj.title}
                        </h3>
                        {proj.highlight && (
                          <span className="bg-[#ffb000] px-2.5 py-0.5 text-[11px] font-semibold text-[#041108]">
                            {proj.highlight}
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-[#c9eed6]">
                        {proj.description}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {proj.tags.map((t) => (
                          <span
                            key={t}
                            className="border border-[#193826] bg-[#0d1c13] px-2 py-0.5 text-[11px] text-[#c9eed6]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-2.5 border-t border-[#193826] pt-4">
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 border border-[#2f7d4d] bg-[#050a07] px-3 py-2 text-xs text-[#c9eed6] transition-colors hover:border-[#39ff7a] hover:text-[#39ff7a]"
                      >
                        <Github className="h-3.5 w-3.5" />
                        <span>GitHub</span>
                      </a>
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 bg-[#39ff7a] px-3 py-2 text-xs font-semibold text-[#041108] transition-colors hover:bg-[#22e563]"
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

          {/* ============================================================
              UNIFIED 4-GROUP TECH MATRIX & ZAMA AWARD DOSSIER
             ============================================================ */}
          <section className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
            <div className="mb-8 flex flex-col justify-between gap-4 border-b border-[#193826] pb-5 md:flex-row md:items-end">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-[#ebfff2] sm:text-3xl">
                  Unified Stack Matrix &amp; Capabilities
                </h2>
                <p className="mt-2 max-w-2xl text-xs leading-relaxed text-[#6ca380]">
                  Full-spectrum production stack across browser audio/canvas engines, Python WebSocket market makers, cloud SaaS, and confidential FHEVM contracts.
                </p>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-xs text-[#39ff7a] underline underline-offset-4 hover:text-[#ffb000]"
              >
                <span>Open ~/about Bio</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {techMatrix.map((col) => (
                <div
                  key={col.code}
                  className="flex flex-col justify-between border border-[#193826] bg-[#08120c] p-5"
                >
                  <div>
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-base font-semibold text-[#ebfff2]">{col.group}</h3>
                      <span className="text-xs text-[#39ff7a]">[{col.code}]</span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-[#6ca380]">{col.summary}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5 border-t border-[#193826] pt-3">
                    {col.items.map((tech) => (
                      <span
                        key={tech}
                        className="border border-[#193826] bg-[#0d1c13] px-2 py-0.5 text-[11px] text-[#c9eed6]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Zama Award Callout */}
            <div className="mt-10 flex flex-col justify-between gap-6 border border-[#ffb000]/50 bg-[#08120c] p-6 sm:p-8 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <h3 className="text-xl font-semibold text-[#ebfff2] sm:text-2xl">
                  {award.title} — {award.projectTitle}
                </h3>
                <p className="mt-1.5 text-xs uppercase tracking-[0.12em] text-[#ffb000]">
                  {award.index} · {award.date} · {award.placement}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-[#c9eed6] sm:text-sm">
                  {award.description}
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <a
                  href={award.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#39ff7a] px-5 py-2.5 text-xs font-semibold text-[#041108] transition-colors hover:bg-[#22e563]"
                >
                  <span>Open SDK Demo</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-[#ffb000]/55 bg-[#191205] px-5 py-2.5 text-xs text-[#ffb000] transition-colors hover:bg-[#ffb000] hover:text-[#041108]"
                >
                  <Terminal className="h-3.5 w-3.5" />
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
