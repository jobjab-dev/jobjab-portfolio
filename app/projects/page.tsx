"use client";

import React, { useMemo, useState } from "react";
import { ArrowUpRight, Award, Github, Search } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { QuantBotCard } from "@/components/projects/QuantBotCard";
import { PlatformProjectCard } from "@/components/projects/PlatformProjectCard";
import {
  flagshipProjects,
  quantBotProjects,
  platformProjects,
  web3Projects,
  type FlagshipProject,
} from "@/lib/portfolio-data";

import scene03Img from "@/assets/scenes/scene-03-twilight.jpg";
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

type CategoryFilter = "all" | "flagship" | "quant" | "platform" | "web3";

const STACK_FILTERS = [
  "All Stacks",
  "Next.js",
  "React 19",
  "Python",
  "WebSockets",
  "FHEVM (Zama)",
  "Solidity",
  "Supabase",
  "Gemini AI",
  "Astro 7",
  "Web Audio API",
  "Vite 8",
];

export default function ProjectsPage() {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [stackFilter, setStackFilter] = useState("All Stacks");
  const [searchQuery, setSearchQuery] = useState("");

  const matchesSearchAndStack = (title: string, desc: string, tags: string[], extra = "") => {
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      title.toLowerCase().includes(q) ||
      desc.toLowerCase().includes(q) ||
      extra.toLowerCase().includes(q) ||
      tags.some((t) => t.toLowerCase().includes(q));

    const matchesStack =
      stackFilter === "All Stacks" ||
      tags.some((t) => t.toLowerCase().includes(stackFilter.toLowerCase().replace(" (zama)", "")));

    return matchesSearch && matchesStack;
  };

  const filteredFlagships = useMemo(
    () =>
      category !== "all" && category !== "flagship"
        ? []
        : flagshipProjects.filter((p) => matchesSearchAndStack(p.title, p.description, p.tags)),
    [category, stackFilter, searchQuery]
  );

  const filteredQuantBots = useMemo(
    () =>
      category !== "all" && category !== "quant"
        ? []
        : quantBotProjects.filter((p) =>
            matchesSearchAndStack(p.title, p.description, p.tags, `${p.venue} ${p.strategy}`)
          ),
    [category, stackFilter, searchQuery]
  );

  const filteredPlatforms = useMemo(
    () =>
      category !== "all" && category !== "platform"
        ? []
        : platformProjects.filter((p) =>
            matchesSearchAndStack(p.title, p.description, p.tags, p.domain)
          ),
    [category, stackFilter, searchQuery]
  );

  const filteredWeb3 = useMemo(
    () =>
      category !== "all" && category !== "web3"
        ? []
        : web3Projects.filter((p) => matchesSearchAndStack(p.title, p.description, p.tags)),
    [category, stackFilter, searchQuery]
  );

  const totalVisible =
    filteredFlagships.length +
    filteredQuantBots.length +
    filteredPlatforms.length +
    filteredWeb3.length;

  return (
    <div className="flex min-h-screen flex-col bg-[#0b0e13] text-[#dfd7c8]">
      <Header variant="solid" activeScene={{ code: "ARCHIVE", label: "37 PRODUCTION SYSTEMS" }} />

      {/* Atmospheric Twilight Banner */}
      <div className="relative h-48 w-full overflow-hidden border-b border-[#f8f1e3]/14 sm:h-56">
        <img
          src={scene03Img.src}
          alt="Twilight bay panorama over city"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e13] via-[#0b0e13]/60 to-[#0b0e13]/30" />
        <div className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-end px-5 pb-7 sm:px-8 lg:px-10">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h1 className="font-editorial text-4xl font-medium tracking-tight text-[#f8f1e3] sm:text-5xl">
                Shipped Proofing Index
              </h1>
              <p className="mt-2 max-w-3xl text-xs leading-relaxed text-[#dfd7c8] sm:text-sm">
                37 production systems across four disciplines: six Flagship interactive browser runtimes, eleven Python Quant &amp; Perp DEX bots, ten SaaS/Fintech/AI platforms, and ten Zama FHEVM protocols.
              </p>
            </div>
            <div className="shrink-0 border border-[#f8f1e3]/20 bg-[#11151e] px-3 py-1.5 font-mono text-xs text-[#ec7a26]">
              Showing {totalVisible} / 37 builds
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-5 py-10 sm:px-8 lg:px-10">
        {/* Category Tabs, Stack Filters, & Search */}
        <section className="mb-10 space-y-4 border border-[#f8f1e3]/14 bg-[#11151e] p-4 sm:p-5">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Project tracks">
              {[
                { id: "all", label: "All Builds (37)" },
                { id: "flagship", label: "Flagship Full-Stack (6)" },
                { id: "quant", label: "Quant & Trading Bots (11)" },
                { id: "platform", label: "SaaS, Fintech & AI (10)" },
                { id: "web3", label: "Confidential Web3 & FHEVM (10)" },
              ].map((tab) => {
                const active = category === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setCategory(tab.id as CategoryFilter)}
                    className={`border px-3 py-2 font-mono text-xs transition-colors ${
                      active
                        ? "border-[#ec7a26] bg-[#ec7a26] font-medium text-[#120d08]"
                        : "border-[#f8f1e3]/14 bg-[#0b0e13] text-[#dfd7c8] hover:border-[#f8f1e3]/35 hover:text-[#f8f1e3]"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full lg:w-80">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#ec7a26]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, DEX, or stack..."
                aria-label="Filter projects by keyword"
                className="w-full border border-[#f8f1e3]/16 bg-[#0b0e13] py-2 pl-9 pr-3 text-xs text-[#f8f1e3] placeholder:text-[#9da4b4] focus:border-[#ec7a26] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 border-t border-[#f8f1e3]/12 pt-3">
            <span className="mr-1 font-mono text-[11px] uppercase tracking-[0.12em] text-[#9da4b4]">
              Stack:
            </span>
            {STACK_FILTERS.map((tag) => {
              const active = stackFilter === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setStackFilter(tag)}
                  className={`border px-2.5 py-1 font-mono text-xs transition-colors ${
                    active
                      ? "border-[#ec7a26] bg-[#ec7a26] font-medium text-[#120d08]"
                      : "border-[#f8f1e3]/14 bg-[#171d29] text-[#dfd7c8] hover:border-[#f8f1e3]/35 hover:text-[#f8f1e3]"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </section>

        {/* Track 1: Flagships */}
        {filteredFlagships.length > 0 && (
          <section className="mb-14">
            <div className="mb-5 flex items-center justify-between border-b border-[#f8f1e3]/14 pb-2.5">
              <h2 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-[#f8f1e3]">
                Track 01 · Flagship Interactive Systems ({filteredFlagships.length})
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredFlagships.map((proj: FlagshipProject) => {
                const plate = plateMap[proj.plateKey];
                return (
                  <article
                    key={proj.id}
                    className="flex flex-col justify-between border border-[#f8f1e3]/14 bg-[#11151e] p-5 transition-colors hover:border-[#ec7a26]/55"
                  >
                    <div>
                      <div className="mb-4 aspect-[16/9] w-full overflow-hidden border border-[#f8f1e3]/12 bg-[#0b0e13]">
                        <img
                          src={plate.src}
                          alt={`${proj.title} preview`}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-editorial text-xl font-medium tracking-tight text-[#f8f1e3]">
                          {proj.index} · {proj.title}
                        </h3>
                        <span className="shrink-0 font-mono text-[11px] text-[#ec7a26]">
                          {proj.shortLabel.split("·")[1]?.trim() || "Interactive"}
                        </span>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-[#dfd7c8]">
                        {proj.description}
                      </p>

                      <ul className="mt-4 space-y-1.5 border-t border-[#f8f1e3]/10 pt-3 text-xs leading-relaxed text-[#9da4b4]">
                        {proj.mechanics.slice(0, 3).map((mech) => (
                          <li key={mech} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ec7a26]" />
                            <span>{mech}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-5 border-t border-[#f8f1e3]/10 pt-4">
                      <div className="mb-4 flex flex-wrap gap-1.5">
                        {proj.tags.map((t) => (
                          <span
                            key={t}
                            className="border border-[#f8f1e3]/12 bg-[#171d29] px-2 py-0.5 font-mono text-[11px] text-[#dfd7c8]"
                          >
                            {t}
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
                          <span>Source</span>
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
                );
              })}
            </div>
          </section>
        )}

        {/* Track 2: Quant Trading Bots */}
        {filteredQuantBots.length > 0 && (
          <section className="mb-14">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-[#f8f1e3]/14 pb-2.5">
              <h2 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-[#ec7a26]">
                Track 02 · Quant &amp; Algorithmic Perp DEX Bots ({filteredQuantBots.length})
              </h2>
              <span className="font-mono text-[11px] text-[#9da4b4]">
                Python AsyncIO · WebSockets · SDK &amp; Market-Making Engines
              </span>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredQuantBots.map((proj) => (
                <QuantBotCard key={proj.id} proj={proj} />
              ))}
            </div>
          </section>
        )}

        {/* Track 3: SaaS, Fintech & AI Platforms */}
        {filteredPlatforms.length > 0 && (
          <section className="mb-14">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-[#f8f1e3]/14 pb-2.5">
              <h2 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-[#82c4e6]">
                Track 03 · Production SaaS, Fintech &amp; AI Platforms ({filteredPlatforms.length})
              </h2>
              <span className="font-mono text-[11px] text-[#9da4b4]">
                Base L2 Vaults · Offline/Cloud POS · Gemini AI · GPU 3D APIs
              </span>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredPlatforms.map((proj) => (
                <PlatformProjectCard key={proj.id} proj={proj} />
              ))}
            </div>
          </section>
        )}

        {/* Track 4: Web3 & Zama FHEVM */}
        {filteredWeb3.length > 0 && (
          <section className="border border-[#f8f1e3]/14 bg-[#11151e] p-6 sm:p-8">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-[#f8f1e3]/14 pb-4">
              <h2 className="font-editorial text-2xl font-medium text-[#f8f1e3] sm:text-3xl">
                On-Chain Privacy Protocols, Launchpads &amp; Tooling ({filteredWeb3.length})
              </h2>
              <span className="font-mono text-xs text-[#82c4e6]">
                Solidity · Hardhat · Zama FHEVM · Monad · Morph L2
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {filteredWeb3.map((proj) => (
                <article
                  key={proj.id}
                  className="flex flex-col justify-between border border-[#f8f1e3]/14 bg-[#0b0e13] p-5 transition-colors hover:border-[#82c4e6]/55"
                >
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-editorial text-xl font-medium text-[#f8f1e3]">
                        {proj.index} · {proj.title}
                      </h3>
                      {proj.highlight && (
                        <span className="inline-flex items-center gap-1.5 bg-[#ec7a26] px-2.5 py-0.5 font-mono text-[11px] font-medium text-[#120d08]">
                          <Award className="h-3 w-3" />
                          <span>{proj.highlight}</span>
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-[#dfd7c8]">
                      {proj.description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-[#9da4b4]">
                      {proj.features.map((feat) => (
                        <span key={feat}>• {feat}</span>
                      ))}
                    </div>
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
                        className="flex items-center justify-center gap-1.5 border border-[#f8f1e3]/20 bg-[#11151e] px-3 py-2 text-xs text-[#f8f1e3] transition-colors hover:border-[#ec7a26] hover:text-[#ec7a26]"
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
              ))}
            </div>
          </section>
        )}

        {totalVisible === 0 && (
          <div className="border border-[#f8f1e3]/14 bg-[#11151e] p-12 text-center">
            <p className="font-editorial text-xl text-[#f8f1e3]">
              No shipped systems matched the current filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setCategory("all");
                setStackFilter("All Stacks");
                setSearchQuery("");
              }}
              className="mt-4 bg-[#ec7a26] px-5 py-2.5 text-xs font-medium text-[#120d08] hover:bg-[#d86919]"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
