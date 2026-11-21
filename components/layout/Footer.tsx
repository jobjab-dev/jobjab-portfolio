import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { contactChannels } from "@/lib/portfolio-data";

export function Footer() {
  return (
    <footer className="border-t border-[#e8e3dd]/20 bg-[#171837] text-[#eeeef5]">
      <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 border-b border-[#e8e3dd]/20 pb-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="text-2xl font-normal tracking-tight text-[#f6f2eb]">
              37 Production Systems across Interactive UI, Quant Trading, SaaS &amp; Confidential Web3.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-[#c6c7d6]">
              Available for product studio engagements, Python Perp DEX market-making systems, full-stack SaaS/AI platforms, and confidential FHEVM protocols.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:col-span-7">
            <div className="space-y-2 text-sm">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#a6a7b8]">Pages</p>
              <div className="flex flex-col gap-1.5">
                <Link href="/" className="hover:text-[#ea681d]">Home Wall</Link>
                <Link href="/projects" className="hover:text-[#ea681d]">Projects (37)</Link>
                <Link href="/about" className="hover:text-[#ea681d]">Tech &amp; About</Link>
                <Link href="/awards" className="hover:text-[#ea681d]">Awards</Link>
                <Link href="/contact" className="hover:text-[#ea681d]">Contact</Link>
              </div>
            </div>

            <div className="col-span-1 space-y-2 text-sm sm:col-span-3">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#a6a7b8]">
                Direct Channels
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {contactChannels.map((ch) => (
                  <a
                    key={ch.id}
                    href={ch.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between border border-[#e8e3dd]/25 px-3 py-2 text-sm transition-colors hover:border-[#ea681d] hover:bg-white/5"
                  >
                    <span>
                      <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-[#a6a7b8]">
                        {ch.label}
                      </span>
                      <span className="text-[#f6f2eb]">{ch.value}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-[#ea681d]" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-2 pt-6 font-mono text-xs text-[#a6a7b8] sm:flex-row sm:items-center">
          <span>JOBJAB · CREATIVE TECHNOLOGIST &amp; DESIGN ENGINEER</span>
          <span>1st Place Zama Bounty Winner · All Links Verified Live</span>
        </div>
      </div>
    </footer>
  );
}
