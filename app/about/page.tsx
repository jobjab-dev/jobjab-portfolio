import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ParallaxChapterBanner } from "@/components/cinema/ParallaxChapterBanner";
import { portfolioData, techMatrix } from "@/lib/portfolio-data";
import scene02Img from "@/assets/scenes/scene-02-canopy.jpg";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0b0e13] text-[#dfd7c8]">
      <Header variant="solid" activeScene={{ code: "BIO", label: "STUDIO PROFILE" }} />

      <ParallaxChapterBanner
        imgSrc={scene02Img.src}
        alt="Sunlit clouds and autumn ridge panorama"
        heightClass="h-48 sm:h-56"
        scrimClass="bg-gradient-to-t from-[#0b0e13] via-[#0b0e13]/60 to-[#0b0e13]/30"
      >
        <h1 className="font-editorial text-4xl font-medium tracking-tight text-[#f8f1e3] sm:text-5xl">
          Creative Technologist &amp; Design Engineer
        </h1>
        <p className="mt-2 max-w-3xl text-xs leading-relaxed text-[#dfd7c8] sm:text-sm">
          {portfolioData.bio}
        </p>
      </ParallaxChapterBanner>

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-5 py-12 sm:px-8 lg:px-10">
        <section className="mb-12 border border-[#f8f1e3]/14 bg-[#11151e] p-6 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="font-editorial text-2xl font-medium text-[#f8f1e3] sm:text-3xl">
                Bridging tactile interactive web engines, quant trading bots, SaaS platforms, and confidential Web3.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#dfd7c8]">
                My work spans four integrated engineering tracks: bespoke frontend interaction engines (React 19 optimistic UI, SSE streams, native Web Audio synthesis, CSS Matrix canvases, Astro SSR Islands, virtualized radars), high-frequency Python market-making bots across 11 Perp DEXs &amp; CLOBs (Hyperliquid, GRVT V2, Polymarket, Paradex, Backpack, ActiveLP), full-stack SaaS/AI/Fintech platforms (JVAULT, POSkub, Poskub Pay, FastCaption, Nudrub, BOND, Dukira Trellis 3D), and Zama FHEVM confidential smart contracts.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#dfd7c8]">
                Every public runtime and Web3 protocol links directly to verified production deployments and open-source repositories—including the 1st Place ($5,000) Zama Monthly Bounty winner{" "}
                <span className="font-mono text-xs text-[#ec7a26] underline underline-offset-4">
                  fhevm-react-template
                </span>
                —while commercial quant engines and private SaaS backends are available for walkthroughs upon request.
              </p>
            </div>

            <div className="flex flex-col justify-between gap-4 border-t border-[#f8f1e3]/14 pt-6 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <div className="space-y-4">
                <div className="border-b border-[#f8f1e3]/12 pb-3">
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#9da4b4]">
                    Inventory
                  </p>
                  <p className="mt-1 text-base font-medium text-[#f8f1e3]">
                    {portfolioData.stats.totalShipped}
                  </p>
                </div>
                <div className="border-b border-[#f8f1e3]/12 pb-3">
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#9da4b4]">
                    Recognition
                  </p>
                  <p className="mt-1 text-base font-medium text-[#ec7a26]">
                    {portfolioData.stats.awardsWon}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#9da4b4]">
                    Focus
                  </p>
                  <p className="mt-1 text-sm text-[#dfd7c8]">
                    {portfolioData.stats.experience}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 bg-[#ec7a26] px-5 py-2.5 text-xs font-medium text-[#120d08] transition-colors hover:bg-[#d86919]"
                >
                  <span>Browse All 37 Systems</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-[#f8f1e3]/25 bg-[#0b0e13] px-5 py-2.5 text-xs text-[#f8f1e3] transition-colors hover:border-[#ec7a26] hover:text-[#ec7a26]"
                >
                  <span>Contact Studio</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-[#f8f1e3]/14 pb-4">
            <h2 className="font-editorial text-2xl font-medium tracking-tight text-[#f8f1e3] sm:text-3xl">
              Full Engineering Stack
            </h2>
            <Link
              href="/projects"
              className="font-mono text-xs uppercase tracking-[0.12em] text-[#82c4e6] underline underline-offset-4 hover:text-[#ec7a26]"
            >
              Inspect shipped implementations →
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {techMatrix.map((cat) => (
              <article
                key={cat.code}
                className="flex flex-col justify-between border border-[#f8f1e3]/14 bg-[#11151e] p-6"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#f8f1e3]/12 pb-3">
                    <h3 className="font-editorial text-lg font-medium text-[#f8f1e3]">{cat.group}</h3>
                    <span className="font-mono text-xs text-[#ec7a26]">{cat.code}</span>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-[#9da4b4]">{cat.summary}</p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {cat.items.map((tech) => (
                    <span
                      key={tech}
                      className="border border-[#f8f1e3]/12 bg-[#171d29] px-2.5 py-1 font-mono text-xs text-[#dfd7c8]"
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
