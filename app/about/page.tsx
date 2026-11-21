import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { portfolioData, techMatrix } from "@/lib/portfolio-data";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#050a07] text-[#c9eed6]">
      <Header />

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-10 border-b border-[#193826] pb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-[#ebfff2] sm:text-4xl lg:text-5xl">
            Creative Technologist &amp; Design Engineer
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#6ca380] sm:text-base">
            {portfolioData.bio}
          </p>
        </div>

        {/* Biography & Positioning Dossier */}
        <section className="mb-12 border border-[#193826] bg-[#08120c] p-6 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="text-xl font-semibold text-[#ebfff2] sm:text-2xl">
                Bridging tactile interactive web engines, quant trading bots, SaaS platforms, and confidential Web3.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#c9eed6]">
                My work spans four integrated engineering tracks: bespoke frontend interaction engines (React 19 optimistic UI, SSE streams, native Web Audio synthesis, CSS Matrix canvases, Astro SSR Islands, virtualized radars), high-frequency Python market-making bots across 11 Perp DEXs &amp; CLOBs (Hyperliquid, GRVT V2, Polymarket, Paradex, Backpack, ActiveLP), full-stack SaaS/AI/Fintech platforms (JVAULT, POSkub, Poskub Pay, FastCaption, Nudrub, BOND, Dukira Trellis 3D), and Zama FHEVM confidential smart contracts.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#c9eed6]">
                Every public runtime and Web3 protocol links directly to verified production deployments and open-source repositories—including the 1st Place ($5,000) Zama Monthly Bounty winner{" "}
                <span className="text-[#ffb000] underline decoration-[#ffb000] underline-offset-4">
                  fhevm-react-template
                </span>
                —while commercial quant engines and private SaaS backends are available for walkthroughs upon request.
              </p>
            </div>

            <div className="flex flex-col justify-between gap-4 border-t border-[#193826] pt-6 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <div className="space-y-4">
                <div className="border-b border-[#193826] pb-3">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-[#6ca380]">
                    SYS_INVENTORY
                  </p>
                  <p className="mt-1 text-base font-medium text-[#ebfff2]">
                    {portfolioData.stats.totalShipped}
                  </p>
                </div>
                <div className="border-b border-[#193826] pb-3">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-[#6ca380]">
                    RECOGNITION
                  </p>
                  <p className="mt-1 text-base font-medium text-[#ffb000]">
                    {portfolioData.stats.awardsWon}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.12em] text-[#6ca380]">
                    PRIMARY_FOCUS
                  </p>
                  <p className="mt-1 text-sm text-[#c9eed6]">
                    {portfolioData.stats.experience}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 bg-[#39ff7a] px-5 py-2.5 text-xs font-semibold text-[#041108] transition-colors hover:bg-[#22e563]"
                >
                  <span>Browse All 37 Systems</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-[#2f7d4d] bg-[#050a07] px-5 py-2.5 text-xs text-[#c9eed6] transition-colors hover:border-[#39ff7a] hover:text-[#39ff7a]"
                >
                  <span>Contact Studio</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Unified Multi-Stack Technical Matrix */}
        <section>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-[#193826] pb-4">
            <h2 className="text-2xl font-semibold tracking-tight text-[#ebfff2]">
              Full Engineering Stack
            </h2>
            <Link
              href="/projects"
              className="text-xs uppercase tracking-[0.12em] text-[#39ff7a] underline underline-offset-4 hover:text-[#ffb000]"
            >
              Inspect shipped implementations →
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {techMatrix.map((cat) => (
              <article
                key={cat.code}
                className="flex flex-col justify-between border border-[#193826] bg-[#08120c] p-6"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#193826] pb-3">
                    <h3 className="text-base font-semibold text-[#ebfff2]">{cat.group}</h3>
                    <span className="text-xs text-[#39ff7a]">[{cat.code}]</span>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-[#6ca380]">
                    {cat.summary}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {cat.items.map((tech) => (
                    <span
                      key={tech}
                      className="border border-[#193826] bg-[#0d1c13] px-2.5 py-1 text-xs text-[#c9eed6]"
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
