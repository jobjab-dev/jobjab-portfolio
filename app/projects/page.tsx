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
    <div className="flex min-h-screen flex-col bg-[#050a07] text-[#c9eed6]">
      <Header />

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="border-b border-[#193826] pb-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-[#ebfff2] sm:text-4xl lg:text-5xl">
                Shipped Proofing Index
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#6ca380] sm:text-base">
                37 production systems across four disciplines: six Flagship interactive browser runtimes, eleven Python Quant &amp; Perp DEX trading bots, ten SaaS/Fintech/AI platforms, and ten confidential Web3 &amp; Zama FHEVM protocols.
              </p>
            </div>
            <div className="shrink-0 border border-[#193826] bg-[#08120c] px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-[#39ff7a]">
              Showing {totalVisible} / 37 builds
            </div>
          </div>
        </div>

        {/* Category Tabs, Stack Filters, & grep Search */}
        <section className="my-8 space-y-4 border border-[#193826] bg-[#08120c] p-4 sm:p-5">
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
                    className={`border px-3 py-2 text-xs uppercase tracking-[0.08em] transition-colors ${
                      active
                        ? "border-[#39ff7a] bg-[#39ff7a] font-semibold text-[#041108]"
                        : "border-[#193826] bg-[#050a07] text-[#c9eed6] hover:border-[#39ff7a] hover:text-[#39ff7a]"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full lg:w-80">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#39ff7a]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="grep projects by title, DEX, or stack..."
                aria-label="Filter projects by keyword"
                className="w-full border border-[#193826] bg-[#050a07] py-2 pl-9 pr-3 text-xs text-[#ebfff2] placeholder:text-[#6ca380] focus:border-[#39ff7a] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 border-t border-[#193826] pt-3">
            <span className="mr-1 text-[11px] uppercase tracking-[0.12em] text-[#6ca380]">
              STACK_FILTER:
            </span>
            {STACK_FILTERS.map((tag) => {
              const active = stackFilter === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setStackFilter(tag)}
                  className={`border px-2.5 py-1 text-xs transition-colors ${
                    active
                      ? "border-[#39ff7a] bg-[#39ff7a] font-semibold text-[#041108]"
                      : "border-[#193826] bg-[#0d1c13] text-[#c9eed6] hover:border-[#2f7d4d] hover:text-[#39ff7a]"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </section>

        {/* Track 1: 6 Flagship Interactive Full-Stack Runtimes */}
        {filteredFlagships.length > 0 && (
          <section className="mb-14">
            <div className="mb-5 flex items-center justify-between border-b border-[#193826] pb-2">
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#39ff7a]">
                TRACK 01 // FLAGSHIP INTERACTIVE FULL-STACK SYSTEMS ({filteredFlagships.length})
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredFlagships.map((proj: FlagshipProject) => {
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
                        <span className="shrink-0 text-[11px] uppercase tracking-[0.06em] text-[#39ff7a]">
                          {proj.shortLabel.split("·")[1]?.trim() || "Interactive"}
                        </span>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-[#c9eed6]">
                        {proj.description}
                      </p>

                      <ul className="mt-4 space-y-1.5 border-t border-[#193826] pt-3 text-xs leading-relaxed text-[#9dc4ac]">
                        {proj.mechanics.slice(0, 3).map((mech) => (
                          <li key={mech} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#39ff7a]" />
                            <span>{mech}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-5 border-t border-[#193826] pt-4">
                      <div className="mb-4 flex flex-wrap gap-1.5">
                        {proj.tags.map((t) => (
                          <span
                            key={t}
                            className="border border-[#193826] bg-[#0d1c13] px-2 py-0.5 text-[11px] text-[#c9eed6]"
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
                          className="flex items-center justify-center gap-1.5 border border-[#2f7d4d] bg-[#050a07] px-3 py-2 text-xs text-[#c9eed6] transition-colors hover:border-[#39ff7a] hover:text-[#39ff7a]"
                        >
                          <Github className="h-3.5 w-3.5" />
                          <span>Source</span>
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
        )}

        {/* Track 2: 11 Quant & Algorithmic Perp DEX Trading Bots */}
        {filteredQuantBots.length > 0 && (
          <section className="mb-14">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-[#193826] pb-2">
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ffb000]">
                TRACK 02 // QUANT &amp; ALGORITHMIC PERP DEX TRADING BOTS ({filteredQuantBots.length})
              </h2>
              <span className="text-[11px] text-[#6ca380]">
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

        {/* Track 3: 10 Production SaaS, Fintech & AI Platforms */}
        {filteredPlatforms.length > 0 && (
          <section className="mb-14">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-[#193826] pb-2">
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#46e8c8]">
                TRACK 03 // PRODUCTION SAAS, FINTECH &amp; AI PLATFORMS ({filteredPlatforms.length})
              </h2>
              <span className="text-[11px] text-[#6ca380]">
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

        {/* Track 4: 10 Confidential Web3 & Zama FHEVM Protocols */}
        {filteredWeb3.length > 0 && (
          <section className="border border-[#193826] bg-[#060f0b] p-6 sm:p-8">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-[#193826] pb-4">
              <div>
                <h2 className="text-xl font-semibold text-[#ebfff2] sm:text-2xl">
                  On-Chain Privacy Protocols, Launchpads &amp; Tooling ({filteredWeb3.length})
                </h2>
              </div>
              <span className="text-xs text-[#46e8c8]">
                Solidity · Hardhat · Zama FHEVM · Monad · Morph L2
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {filteredWeb3.map((proj) => (
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
                        <span className="inline-flex items-center gap-1.5 bg-[#ffb000] px-2.5 py-0.5 text-[11px] font-semibold text-[#041108]">
                          <Award className="h-3 w-3" />
                          <span>{proj.highlight}</span>
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-[#c9eed6]">
                      {proj.description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[#6ca380]">
                      {proj.features.map((feat) => (
                        <span key={feat}>• {feat}</span>
                      ))}
                    </div>
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
              ))}
            </div>
          </section>
        )}

        {totalVisible === 0 && (
          <div className="border border-[#193826] bg-[#08120c] p-12 text-center">
            <p className="text-base text-[#ebfff2]">exit 1: No shipped builds matched the current filter.</p>
            <button
              type="button"
              onClick={() => {
                setCategory("all");
                setStackFilter("All Stacks");
                setSearchQuery("");
              }}
              className="mt-4 bg-[#39ff7a] px-5 py-2.5 text-xs font-semibold text-[#041108] hover:bg-[#22e563]"
            >
              RESET FILTERS
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
