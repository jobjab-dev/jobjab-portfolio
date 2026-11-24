import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { contactChannels } from "@/lib/portfolio-data";
import { StudioSeal } from "@/components/cinema/StudioSeal";

export function Footer() {
  return (
    <footer className="border-t border-[#f8f1e3]/14 bg-[#0b0e13] text-[#dfd7c8]">
      <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-10 border-b border-[#f8f1e3]/14 pb-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="mb-4 flex items-center gap-3">
              <StudioSeal className="h-7 w-7" />
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#9da4b4]">
                JOBJAB STUDIO
              </span>
            </div>
            <h2 className="font-editorial text-2xl font-medium leading-snug tracking-tight text-[#f8f1e3] sm:text-3xl">
              37 Production Systems across Interactive UI, Quant Trading, SaaS &amp; Confidential Web3.
            </h2>
            <p className="mt-3 max-w-md text-xs leading-relaxed text-[#9da4b4]">
              Available for product studio collaborations, Python Perp DEX trading systems, full-stack SaaS/AI builds, and Zama FHEVM protocols.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:col-span-7">
            <div className="space-y-2.5 text-xs">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#9da4b4]">
                Directory
              </p>
              <div className="flex flex-col gap-2">
                <Link href="/" className="text-[#f8f1e3] transition-colors hover:text-[#ec7a26]">
                  Horizon Reel
                </Link>
                <Link href="/projects" className="text-[#f8f1e3] transition-colors hover:text-[#ec7a26]">
                  Archive (37)
                </Link>
                <Link href="/about" className="text-[#f8f1e3] transition-colors hover:text-[#ec7a26]">
                  About
                </Link>
                <Link href="/awards" className="text-[#f8f1e3] transition-colors hover:text-[#ec7a26]">
                  Awards
                </Link>
                <Link href="/contact" className="text-[#f8f1e3] transition-colors hover:text-[#ec7a26]">
                  Say hello
                </Link>
              </div>
            </div>

            <div className="col-span-1 space-y-2.5 text-xs sm:col-span-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#9da4b4]">
                Direct Channels
              </p>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {contactChannels.map((ch) => (
                  <a
                    key={ch.id}
                    href={ch.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between border border-[#f8f1e3]/14 bg-[#11151e] px-3.5 py-2.5 text-xs transition-colors hover:border-[#ec7a26]"
                  >
                    <span>
                      <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-[#9da4b4]">
                        {ch.label}
                      </span>
                      <span className="mt-0.5 block text-[#f8f1e3]">{ch.value}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-[#ec7a26]" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-2 pt-6 font-mono text-[11px] text-[#9da4b4] sm:flex-row sm:items-center">
          <span>JOBJAB · CREATIVE TECHNOLOGIST &amp; DESIGN ENGINEER</span>
          <span className="text-[#ec7a26]">1ST PLACE ($5,000) ZAMA BOUNTY WINNER · FIN</span>
        </div>
      </div>
    </footer>
  );
}
