"use client";

import { ArrowUpRight, Award, Github } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { awardsData } from "@/lib/portfolio-data";
import scene04Img from "@/assets/scenes/scene-04-night.jpg";

export default function AwardsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0b0e13] text-[#dfd7c8]">
      <Header variant="solid" activeScene={{ code: "AWD", label: "HONORS & BOUNTIES" }} />

      <div className="relative h-48 w-full overflow-hidden border-b border-[#f8f1e3]/14 sm:h-56">
        <img
          src={scene04Img.src}
          alt="Midnight harbor skyline panorama"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e13] via-[#0b0e13]/60 to-[#0b0e13]/30" />
        <div className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-end px-5 pb-7 sm:px-8 lg:px-10">
          <h1 className="font-editorial text-4xl font-medium tracking-tight text-[#f8f1e3] sm:text-5xl">
            Awards &amp; Recognition
          </h1>
          <p className="mt-2 max-w-2xl text-xs leading-relaxed text-[#dfd7c8] sm:text-sm">
            Open-source cryptographic tooling and production dApp architecture recognized across the Ethereum and Zama FHEVM ecosystem.
          </p>
        </div>
      </div>

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-5 py-12 sm:px-8 lg:px-10">
        <div className="space-y-8">
          {awardsData.map((award) => (
            <article
              key={award.id}
              className="border border-[#ec7a26]/45 bg-[#11151e] p-6 sm:p-10"
            >
              <div className="flex flex-col justify-between gap-4 border-b border-[#f8f1e3]/14 pb-6 sm:flex-row sm:items-start">
                <div>
                  <h2 className="font-editorial text-2xl font-medium tracking-tight text-[#f8f1e3] sm:text-3xl">
                    {award.title}
                  </h2>
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-[#9da4b4]">
                    {award.index} · {award.date}
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 self-start bg-[#ec7a26] px-4 py-2 font-mono text-xs font-medium uppercase tracking-[0.1em] text-[#120d08]">
                  <Award className="h-4 w-4" />
                  <span>{award.placement}</span>
                </div>
              </div>

              <p className="mt-6 max-w-3xl text-sm leading-relaxed text-[#dfd7c8] sm:text-base">
                {award.description}
              </p>

              <div className="mt-6 grid gap-3 border-t border-[#f8f1e3]/12 pt-6 sm:grid-cols-3">
                {award.highlights.map((item, idx) => (
                  <div
                    key={item}
                    className="border border-[#f8f1e3]/14 bg-[#0b0e13] p-4 text-xs leading-relaxed text-[#dfd7c8]"
                  >
                    <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.12em] text-[#ec7a26]">
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
                  className="inline-flex items-center gap-2 bg-[#ec7a26] px-5 py-2.5 text-xs font-medium text-[#120d08] transition-colors hover:bg-[#d86919]"
                >
                  <span>Launch {award.projectTitle}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>

                <a
                  href={award.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[#f8f1e3]/25 bg-[#0b0e13] px-5 py-2.5 text-xs text-[#f8f1e3] transition-colors hover:border-[#ec7a26] hover:text-[#ec7a26]"
                >
                  <Github className="h-4 w-4" />
                  <span>Inspect Repository</span>
                </a>

                <Link
                  href="/projects"
                  className="ml-auto font-mono text-xs uppercase tracking-[0.12em] text-[#82c4e6] underline underline-offset-4 hover:text-[#ec7a26]"
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
