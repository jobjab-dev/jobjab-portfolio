"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, MotionConfig, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Award, Github } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { CinemaHeroReel } from "@/components/cinema/CinemaHeroReel";
import { ParallaxChapterBanner } from "@/components/cinema/ParallaxChapterBanner";
import { CinemaReveal } from "@/components/cinema/CinemaReveal";
import { CinemaScrollRail } from "@/components/cinema/CinemaScrollRail";
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

import scene02Img from "@/assets/scenes/scene-02-canopy.jpg";
import scene03Img from "@/assets/scenes/scene-03-twilight.jpg";
import scene04Img from "@/assets/scenes/scene-04-night.jpg";

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

type ShowcaseTab = "quant" | "platforms" | "web3" | "all";

export default function Home() {
  const reducedMotion = Boolean(useReducedMotion());
  const [showcaseTab, setShowcaseTab] = useState<ShowcaseTab>("quant");
  const award = awardsData[0];

  useEffect(() => {
    const syncFromHash = () => {
      const h = window.location.hash.toLowerCase();
      if (h === "#platforms") setShowcaseTab("platforms");
      else if (h === "#web3") setShowcaseTab("web3");
      else if (h === "#quant") setShowcaseTab("quant");
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col bg-[#0b0e13] text-[#dfd7c8]">
        {/* ============================================================
            SC 01 · STICKY SCROLL-SCRUBBED ANIME CINEMA HORIZON
           ============================================================ */}
        <CinemaHeroReel />
        <CinemaScrollRail />

        <main className="flex-1">
          {/* ============================================================
              SC 02 · SIX PURPOSE-BUILT WEB RUNTIMES & ENGINES (01-06)
             ============================================================ */}
          <section id="flagship" className="border-b border-[#f8f1e3]/14 bg-[#0b0e13]">
            {/* Parallax Chapter Panorama */}
            <ParallaxChapterBanner
              imgSrc={scene02Img.src}
              alt="Golden canopy over glass towers panorama"
            >
              <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
                <div>
                  <h2 className="font-editorial text-3xl font-medium tracking-tight text-[#f8f1e3] sm:text-4xl">
                    Six Purpose-Built Web Runtimes &amp; Engines
                  </h2>
                  <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-[#dfd7c8] sm:text-sm">
                    Interactive flagship deployments engineered across Next.js 16 SSE, native Web Audio DSP, CSS Matrix canvas math, virtualized telemetry radar, and Astro SSR Islands.
                  </p>
                </div>
                <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.12em]">
                  <span className="text-[#ec7a26]">SC 02 · GOLDEN CANOPY</span>
                  <Link href="/projects" className="text-[#f8f1e3] underline underline-offset-4 hover:text-[#ec7a26]">
                    All 37 Works →
                  </Link>
                </div>
              </div>
            </ParallaxChapterBanner>

            <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {flagshipProjects.map((proj, idx) => {
                  const plate = plateMap[proj.plateKey];
                  return (
                    <CinemaReveal key={proj.id} delay={(idx % 3) * 0.06} className="flex">
                      <article className="group flex w-full flex-col justify-between border border-[#f8f1e3]/14 bg-[#11151e] p-5 transition-colors hover:border-[#ec7a26]/55">
                        <div>
                          <div className="mb-4 aspect-[16/9] w-full overflow-hidden border border-[#f8f1e3]/12 bg-[#0b0e13]">
                            <img
                              src={plate.src}
                              alt={`${proj.title} studio plate preview`}
                              className="h-full w-full object-cover object-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045]"
                            />
                          </div>

                          <div className="flex items-baseline justify-between gap-2">
                            <h3 className="font-editorial text-xl font-medium tracking-tight text-[#f8f1e3]">
                              {proj.index} · {proj.title}
                            </h3>
                            <span className="shrink-0 font-mono text-[11px] text-[#ec7a26]">
                              {proj.shortLabel.split("·")[1]?.trim()}
                            </span>
                          </div>
                          <p className="mt-2 text-xs leading-relaxed text-[#dfd7c8]">
                            {proj.description}
                          </p>

                          <ul className="mt-4 space-y-1.5 border-t border-[#f8f1e3]/10 pt-3 text-xs leading-relaxed text-[#9da4b4]">
                            {proj.mechanics.map((mech) => (
                              <li key={mech} className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ec7a26]" />
                                <span>{mech}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-5 border-t border-[#f8f1e3]/10 pt-4">
                          <div className="mb-4 flex flex-wrap gap-1.5">
                            {proj.tags.map((tag) => (
                              <span
                                key={tag}
                                className="border border-[#f8f1e3]/12 bg-[#171d29] px-2 py-0.5 font-mono text-[11px] text-[#dfd7c8]"
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
                              className="flex items-center justify-center gap-1.5 border border-[#f8f1e3]/20 bg-[#0b0e13] px-3 py-2 text-xs text-[#f8f1e3] transition-colors hover:border-[#ec7a26] hover:text-[#ec7a26]"
                            >
                              <Github className="h-3.5 w-3.5" />
                              <span>GitHub</span>
                            </a>
                            <a
                              href={proj.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-1.5 bg-[#ec7a26] px-3 py-2 text-xs font-medium text-[#120d08] transition-colors hover:bg-[#d86919]"
                            >
                              <span>Launch Live</span>
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </a>
                          </div>
                        </div>
                      </article>
                    </CinemaReveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ============================================================
              SC 03 · BLUE HOUR — 31 QUANT, SAAS & CONFIDENTIAL WEB3 SYSTEMS
             ============================================================ */}
          <section id="quant" className="border-b border-[#f8f1e3]/14 bg-[#0b0e13]">
            <span id="platforms" className="sr-only" aria-hidden="true" />
            <span id="web3" className="sr-only" aria-hidden="true" />

            <ParallaxChapterBanner
              imgSrc={scene03Img.src}
              alt="Blue hour twilight bay panorama"
            >
              <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
                <div>
                  <h2 className="font-editorial text-3xl font-medium tracking-tight text-[#f8f1e3] sm:text-4xl">
                    Quant Trading, SaaS Platforms &amp; Confidential Web3
                  </h2>
                  <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-[#dfd7c8] sm:text-sm">
                    Select a track below to inspect all 11 Python Perp DEX market makers, 10 commercial SaaS/AI systems, or 10 Zama FHEVM &amp; Layer-2 protocols.
                  </p>
                </div>
                <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.12em]">
                  <span className="text-[#82c4e6]">SC 03 · BLUE HOUR</span>
                  <Link href="/awards" className="inline-flex items-center gap-1.5 text-[#ec7a26] hover:underline">
                    <Award className="h-3.5 w-3.5" />
                    <span>Zama $5,000 Bounty</span>
                  </Link>
                </div>
              </div>
            </ParallaxChapterBanner>

            <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
              {/* Interactive Track Switcher with Sliding Pill Indicator */}
              <div
                role="tablist"
                aria-label="Production archive tracks"
                className="mb-8 flex flex-wrap items-center gap-2 border-b border-[#f8f1e3]/14 pb-5"
              >
                {[
                  { id: "quant", label: "Quant & Perp DEX Bots (11)" },
                  { id: "platforms", label: "SaaS, Fintech & AI (10)" },
                  { id: "web3", label: "Confidential Web3 & FHEVM (10)" },
                  { id: "all", label: "View All 31 Systems" },
                ].map((tab) => {
                  const active = showcaseTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setShowcaseTab(tab.id as ShowcaseTab)}
                      className={`relative border px-3.5 py-2 font-mono text-xs transition-colors ${
                        active
                          ? "border-[#ec7a26] font-medium text-[#120d08]"
                          : "border-[#f8f1e3]/14 bg-[#11151e] text-[#dfd7c8] hover:border-[#f8f1e3]/35 hover:text-[#f8f1e3]"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="home-track-pill"
                          transition={
                            reducedMotion
                              ? { duration: 0 }
                              : { type: "spring", stiffness: 360, damping: 32 }
                          }
                          className="absolute inset-0 bg-[#ec7a26]"
                        />
                      )}
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  );
                })}
                <Link
                  href="/projects"
                  className="ml-auto font-mono text-xs text-[#82c4e6] underline underline-offset-4 hover:text-[#ec7a26]"
                >
                  Open filterable 37-project search →
                </Link>
              </div>

              <motion.div
                key={showcaseTab}
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {(showcaseTab === "quant" || showcaseTab === "all") && (
                  <div className="mb-10">
                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                      {quantBotProjects.map((proj) => (
                        <QuantBotCard key={proj.id} proj={proj} />
                      ))}
                    </div>
                  </div>
                )}

                {(showcaseTab === "platforms" || showcaseTab === "all") && (
                  <div className="mb-10">
                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                      {platformProjects.map((proj) => (
                        <PlatformProjectCard key={proj.id} proj={proj} />
                      ))}
                    </div>
                  </div>
                )}

                {(showcaseTab === "web3" || showcaseTab === "all") && (
                  <div className="grid gap-4 md:grid-cols-2">
                    {web3Projects.map((proj) => (
                      <article
                        key={proj.id}
                        className="flex flex-col justify-between border border-[#f8f1e3]/14 bg-[#11151e] p-5 transition-colors hover:border-[#82c4e6]/55"
                      >
                        <div>
                          <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <h3 className="font-editorial text-xl font-medium text-[#f8f1e3]">
                              {proj.index} · {proj.title}
                            </h3>
                            {proj.highlight && (
                              <span className="bg-[#ec7a26] px-2.5 py-0.5 font-mono text-[11px] font-medium text-[#120d08]">
                                {proj.highlight}
                              </span>
                            )}
                          </div>
                          <p className="mt-2 text-xs leading-relaxed text-[#dfd7c8]">
                            {proj.description}
                          </p>

                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {proj.tags.map((t) => (
                              <span
                                key={t}
                                className="border border-[#f8f1e3]/12 bg-[#171d29] px-2 py-0.5 font-mono text-[11px] text-[#dfd7c8]"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-5 grid grid-cols-2 gap-2.5 border-t border-[#f8f1e3]/10 pt-4">
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 border border-[#f8f1e3]/20 bg-[#0b0e13] px-3 py-2 text-xs text-[#f8f1e3] transition-colors hover:border-[#ec7a26] hover:text-[#ec7a26]"
                          >
                            <Github className="h-3.5 w-3.5" />
                            <span>GitHub</span>
                          </a>
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 bg-[#ec7a26] px-3 py-2 text-xs font-medium text-[#120d08] transition-colors hover:bg-[#d86919]"
                          >
                            <span>Launch Live</span>
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </section>

          {/* ============================================================
              SC 04 · NIGHT SKYLINE — UNIFIED STACK & ZAMA AWARD DOSSIER
             ============================================================ */}
          <section id="stack" className="bg-[#0b0e13]">
            <ParallaxChapterBanner
              imgSrc={scene04Img.src}
              alt="Starlit midnight skyline harbor bridge panorama"
              heightClass="h-52 sm:h-64"
            >
              <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
                <div>
                  <h2 className="font-editorial text-3xl font-medium tracking-tight text-[#f8f1e3] sm:text-4xl">
                    Engineering Matrix &amp; Honors
                  </h2>
                  <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-[#dfd7c8] sm:text-sm">
                    Four unified stacks spanning interactive browser rendering, Python WebSocket market makers, cloud SaaS infrastructure, and confidential cryptography.
                  </p>
                </div>
                <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.12em]">
                  <span className="text-[#ec7a26]">SC 04 · NIGHT SKYLINE</span>
                  <Link href="/about" className="text-[#f8f1e3] underline underline-offset-4 hover:text-[#ec7a26]">
                    Studio Bio →
                  </Link>
                </div>
              </div>
            </ParallaxChapterBanner>

            <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {techMatrix.map((col, idx) => (
                  <CinemaReveal key={col.code} delay={idx * 0.06} className="flex">
                    <div className="flex w-full flex-col justify-between border border-[#f8f1e3]/14 bg-[#11151e] p-5">
                      <div>
                        <div className="flex items-baseline justify-between gap-2">
                          <h3 className="font-editorial text-lg font-medium text-[#f8f1e3]">
                            {col.group}
                          </h3>
                          <span className="font-mono text-xs text-[#ec7a26]">{col.code}</span>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-[#9da4b4]">{col.summary}</p>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-1.5 border-t border-[#f8f1e3]/10 pt-3">
                        {col.items.map((tech) => (
                          <span
                            key={tech}
                            className="border border-[#f8f1e3]/12 bg-[#171d29] px-2 py-0.5 font-mono text-[11px] text-[#dfd7c8]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CinemaReveal>
                ))}
              </div>

              {/* Zama Award Callout Sheet */}
              <CinemaReveal delay={0.1}>
                <div className="mt-10 flex flex-col justify-between gap-6 border border-[#ec7a26]/45 bg-[#11151e] p-6 sm:p-8 lg:flex-row lg:items-center">
                  <div className="max-w-2xl">
                    <h3 className="font-editorial text-2xl font-medium text-[#f8f1e3] sm:text-3xl">
                      {award.title} — {award.projectTitle}
                    </h3>
                    <p className="mt-1.5 font-mono text-xs uppercase tracking-[0.12em] text-[#ec7a26]">
                      {award.index} · {award.date} · {award.placement}
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-[#dfd7c8] sm:text-sm">
                      {award.description}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-3">
                    <a
                      href={award.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#ec7a26] px-5 py-2.5 text-xs font-medium text-[#120d08] transition-colors hover:bg-[#d86919]"
                    >
                      <span>Open SDK Demo</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 border border-[#f8f1e3]/25 bg-[#0b0e13] px-5 py-2.5 text-xs text-[#f8f1e3] transition-colors hover:border-[#ec7a26] hover:text-[#ec7a26]"
                    >
                      <span>Contact Jobjab</span>
                    </Link>
                  </div>
                </div>
              </CinemaReveal>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
}
