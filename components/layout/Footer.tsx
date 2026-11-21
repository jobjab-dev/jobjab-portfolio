import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { contactChannels } from "@/lib/portfolio-data";

export function Footer() {
  return (
    <footer className="border-t border-[#193826] bg-[#08120c] text-[#c9eed6]">
      <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 border-b border-[#193826] pb-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="text-xl font-semibold tracking-tight text-[#ebfff2] sm:text-2xl">
              37 Production Systems across Interactive UI, Quant Trading, SaaS &amp; Confidential Web3.
            </h2>
            <p className="mt-3 max-w-md text-xs leading-relaxed text-[#6ca380]">
              Available for product studio engagements, Python Perp DEX market-making architecture, full-stack SaaS/AI builds, and Zama FHEVM protocols.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:col-span-7">
            <div className="space-y-2 text-xs">
              <p className="uppercase tracking-[0.14em] text-[#39ff7a]">/routes</p>
              <div className="flex flex-col gap-1.5">
                <Link href="/" className="text-[#c9eed6] hover:text-[#39ff7a]">~/home</Link>
                <Link href="/projects" className="text-[#c9eed6] hover:text-[#39ff7a]">~/projects (37)</Link>
                <Link href="/about" className="text-[#c9eed6] hover:text-[#39ff7a]">~/about</Link>
                <Link href="/awards" className="text-[#c9eed6] hover:text-[#39ff7a]">~/awards</Link>
                <Link href="/contact" className="text-[#c9eed6] hover:text-[#39ff7a]">~/contact</Link>
              </div>
            </div>

            <div className="col-span-1 space-y-2 text-xs sm:col-span-3">
              <p className="uppercase tracking-[0.14em] text-[#39ff7a]">
                direct_sockets
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {contactChannels.map((ch) => (
                  <a
                    key={ch.id}
                    href={ch.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between border border-[#193826] bg-[#050a07] px-3 py-2 text-xs transition-colors hover:border-[#39ff7a]"
                  >
                    <span>
                      <span className="block text-[10px] uppercase tracking-[0.12em] text-[#6ca380]">
                        {ch.label}
                      </span>
                      <span className="text-[#ebfff2]">{ch.value}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-[#39ff7a]" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-2 pt-6 text-xs text-[#6ca380] sm:flex-row sm:items-center">
          <span>[tmux 0:jobjab@prod] · CREATIVE TECHNOLOGIST &amp; DESIGN ENGINEER</span>
          <span className="text-[#ffb000]">1ST PLACE ($5,000) ZAMA BOUNTY WINNER · SYS_OK</span>
        </div>
      </div>
    </footer>
  );
}
