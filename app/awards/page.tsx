"use client";

import { ArrowUpRight, Award, Github } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { awardsData } from "@/lib/portfolio-data";

export default function AwardsPage() {
  return (
    <div className="flex min-h-screen flex-col proofing-wall-ground text-[#121110]">
      <Header />

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-10 border-b border-[#141311]/35 pb-8">
          <h1 className="text-4xl font-normal tracking-tight text-[#0a0a0a] sm:text-5xl lg:text-6xl">
            Awards &amp; Recognition
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#2f2b26]">
            Open-source cryptographic tooling and production dApp architecture recognized across the Ethereum and Zama FHEVM ecosystem.
          </p>
        </div>

        <div className="space-y-8">
          {awardsData.map((award) => (
            <article
              key={award.id}
              className="proof-shadow relative bg-[#f2eee6] p-6 sm:p-10"
            >
              <span className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t border-[#141311]/30" />
              <span className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r border-t border-[#141311]/30" />
              <span className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b border-l border-[#141311]/30" />
              <span className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-[#141311]/30" />

              <div className="flex flex-col justify-between gap-4 border-b border-[#141311]/15 pb-6 sm:flex-row sm:items-start">
                <div>
                  <h2 className="text-3xl font-normal tracking-tight text-[#0a0a0a] sm:text-4xl">
                    {award.title}
                  </h2>
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-[#5a544d]">
                    {award.index} · {award.date}
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 self-start bg-[#171837] px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] text-[#f6f2eb]">
                  <Award className="h-4 w-4 text-[#ea681d]" />
                  <span>{award.placement}</span>
                </div>
              </div>

              <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#26231f] sm:text-lg">
                {award.description}
              </p>

              <div className="mt-6 grid gap-3 border-t border-[#141311]/10 pt-6 sm:grid-cols-3">
                {award.highlights.map((item, idx) => (
                  <div
                    key={item}
                    className="border border-[#141311]/12 bg-[#e8e3dd]/65 p-4 text-sm leading-relaxed text-[#1a1815]"
                  >
                    <span className="mb-1 block font-mono text-[11px] uppercase tracking-[0.12em] text-[#5a544d]">
                      0{idx + 1} · Deliverable
                    </span>
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={award.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-[4px] bg-[#ea681d] px-5 py-2.5 text-sm font-normal text-[#120e0a] transition-colors hover:bg-[#d85a12]"
                >
                  <span>Launch {award.projectTitle}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>

                <a
                  href={award.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[#141311]/30 bg-white/50 px-5 py-2.5 text-sm text-[#121110] transition-colors hover:border-[#121110] hover:bg-white/80"
                >
                  <Github className="h-4 w-4" />
                  <span>Inspect Repository</span>
                </a>

                <Link
                  href="/projects"
                  className="ml-auto font-mono text-xs uppercase tracking-[0.12em] text-[#171837] underline underline-offset-4 hover:text-[#ea681d]"
                >
                  View all 37 shipped systems →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
