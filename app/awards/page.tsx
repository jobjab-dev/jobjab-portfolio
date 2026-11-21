"use client";

import { ArrowUpRight, Award, Github } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { awardsData } from "@/lib/portfolio-data";

export default function AwardsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#050a07] text-[#c9eed6]">
      <Header />

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-10 border-b border-[#193826] pb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-[#ebfff2] sm:text-4xl lg:text-5xl">
            Awards &amp; Recognition
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#6ca380] sm:text-base">
            Open-source cryptographic tooling and production dApp architecture recognized across the Ethereum and Zama FHEVM ecosystem.
          </p>
        </div>

        <div className="space-y-8">
          {awardsData.map((award) => (
            <article
              key={award.id}
              className="border border-[#ffb000]/55 bg-[#08120c] p-6 sm:p-10"
            >
              <div className="flex flex-col justify-between gap-4 border-b border-[#193826] pb-6 sm:flex-row sm:items-start">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-[#ebfff2] sm:text-3xl">
                    {award.title}
                  </h2>
                  <p className="mt-2 text-xs uppercase tracking-[0.14em] text-[#6ca380]">
                    {award.index} · {award.date}
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 self-start bg-[#ffb000] px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#041108]">
                  <Award className="h-4 w-4" />
                  <span>{award.placement}</span>
                </div>
              </div>

              <p className="mt-6 max-w-3xl text-sm leading-relaxed text-[#c9eed6] sm:text-base">
                {award.description}
              </p>

              <div className="mt-6 grid gap-3 border-t border-[#193826] pt-6 sm:grid-cols-3">
                {award.highlights.map((item, idx) => (
                  <div
                    key={item}
                    className="border border-[#193826] bg-[#050a07] p-4 text-xs leading-relaxed text-[#c9eed6]"
                  >
                    <span className="mb-1.5 block text-[11px] uppercase tracking-[0.12em] text-[#39ff7a]">
                      0{idx + 1} // DELIVERABLE
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
                  className="inline-flex items-center gap-2 bg-[#39ff7a] px-5 py-2.5 text-xs font-semibold text-[#041108] transition-colors hover:bg-[#22e563]"
                >
                  <span>Launch {award.projectTitle}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>

                <a
                  href={award.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[#2f7d4d] bg-[#050a07] px-5 py-2.5 text-xs text-[#c9eed6] transition-colors hover:border-[#39ff7a] hover:text-[#39ff7a]"
                >
                  <Github className="h-4 w-4" />
                  <span>Inspect Repository</span>
                </a>

                <Link
                  href="/projects"
                  className="ml-auto text-xs uppercase tracking-[0.12em] text-[#39ff7a] underline underline-offset-4 hover:text-[#ffb000]"
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
