import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { portfolioData, techMatrix } from "@/lib/portfolio-data";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col proofing-wall-ground text-[#121110]">
      <Header />

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-10 border-b border-[#141311]/35 pb-8">
          <h1 className="text-4xl font-normal tracking-tight text-[#0a0a0a] sm:text-5xl lg:text-6xl">
            Creative Technologist &amp; Design Engineer
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#2f2b26]">
            {portfolioData.bio}
          </p>
        </div>

        {/* Biography & Positioning */}
        <section className="proof-shadow relative mb-12 bg-[#f2eee6] p-6 sm:p-10">
          <span className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t border-[#141311]/30" />
          <span className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r border-t border-[#141311]/30" />
          <span className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b border-l border-[#141311]/30" />
          <span className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-[#141311]/30" />

          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="text-2xl font-normal text-[#0a0a0a] sm:text-3xl">
                Bridging tactile interactive web engines, quant trading bots, SaaS platforms, and confidential Web3.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#2b2722]">
                My work spans four integrated engineering tracks: bespoke frontend interaction engines (React 19 optimistic UI, SSE streams, native Web Audio synthesis, CSS Matrix canvases, Astro SSR Islands, virtualized radars), high-frequency Python market-making bots across 11 Perp DEXs &amp; CLOBs (Hyperliquid, GRVT V2, Polymarket, Paradex, Backpack, ActiveLP), full-stack SaaS/AI/Fintech platforms (JVAULT, POSkub, Poskub Pay, FastCaption, Nudrub, BOND, Dukira Trellis 3D), and Zama FHEVM confidential smart contracts.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[#2b2722]">
                Every public runtime and Web3 protocol links directly to verified production deployments and open-source repositories—including the 1st Place ($5,000) Zama Monthly Bounty winner{" "}
                <span className="font-mono text-sm underline decoration-[#ea681d] underline-offset-4">
                  fhevm-react-template
                </span>
                —while commercial quant engines and private SaaS backends are available for walkthroughs upon request.
              </p>
            </div>

            <div className="flex flex-col justify-between gap-4 border-t border-[#141311]/15 pt-6 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <div className="space-y-4">
                <div className="border-b border-[#141311]/12 pb-3">
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#5a544d]">
                    Live Deployments
                  </p>
                  <p className="mt-1 text-xl font-normal text-[#0a0a0a]">
                    {portfolioData.stats.totalShipped}
                  </p>
                </div>
                <div className="border-b border-[#141311]/12 pb-3">
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#5a544d]">
                    Recognition
                  </p>
                  <p className="mt-1 text-xl font-normal text-[#0a0a0a]">
                    {portfolioData.stats.awardsWon}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#5a544d]">
                    Focus
                  </p>
                  <p className="mt-1 text-base text-[#2b2722]">
                    {portfolioData.stats.experience}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-[4px] bg-[#ea681d] px-5 py-2.5 text-sm text-[#120e0a] transition-colors hover:bg-[#d85a12]"
                >
                  <span>Browse All 37 Systems</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-[#141311]/30 bg-white/60 px-5 py-2.5 text-sm text-[#121110] transition-colors hover:border-[#121110]"
                >
                  <span>Contact Studio</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Unified Multi-Stack Technical Matrix */}
        <section>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-normal tracking-tight text-[#0a0a0a]">
              Full Engineering Stack
            </h2>
            <Link
              href="/projects"
              className="font-mono text-xs uppercase tracking-[0.12em] text-[#171837] underline underline-offset-4 hover:text-[#ea681d]"
            >
              Inspect shipped implementations →
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {techMatrix.map((cat) => (
              <article
                key={cat.code}
                className="strip-shadow flex flex-col justify-between bg-[#f2eee6] p-6"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#141311]/12 pb-3">
                    <h3 className="text-xl font-normal text-[#0a0a0a]">{cat.group}</h3>
                    <span className="font-mono text-xs text-[#5a544d]">{cat.code}</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[#433e37]">
                    {cat.summary}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {cat.items.map((tech) => (
                    <span
                      key={tech}
                      className="border border-[#141311]/15 bg-[#e8e3dd] px-2.5 py-1 font-mono text-xs text-[#121110]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
