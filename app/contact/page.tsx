"use client";

import { ArrowUpRight, Mail, MessageSquare } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ParallaxChapterBanner } from "@/components/cinema/ParallaxChapterBanner";
import { contactChannels } from "@/lib/portfolio-data";
import { useChat } from "@/context/ChatContext";
import scene01Img from "@/assets/scenes/scene-01-avenue.jpg";

export default function ContactPage() {
  const { setIsOpen } = useChat();

  return (
    <div className="flex min-h-screen flex-col bg-[#0b0e13] text-[#dfd7c8]">
      <Header variant="solid" activeScene={{ code: "COMMS", label: "STUDIO INBOX" }} />

      <ParallaxChapterBanner
        imgSrc={scene01Img.src}
        alt="Sunlit autumn avenue panorama"
        heightClass="h-48 sm:h-56"
        scrimClass="bg-gradient-to-t from-[#0b0e13] via-[#0b0e13]/60 to-[#0b0e13]/30"
      >
        <h1 className="font-editorial text-4xl font-medium tracking-tight text-[#f8f1e3] sm:text-5xl">
          Get in Touch
        </h1>
        <p className="mt-2 max-w-2xl text-xs leading-relaxed text-[#dfd7c8] sm:text-sm">
          Open to product studio collaborations, Creative Technologist / Design Engineer roles, Perp DEX trading systems, full-stack SaaS architecture, and confidential Zama FHEVM engagements.
        </p>
      </ParallaxChapterBanner>

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-5 py-12 sm:px-8 lg:px-10">
        <div className="grid gap-5 md:grid-cols-2">
          {contactChannels.map((channel, idx) => (
            <a
              key={channel.id}
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between border border-[#f8f1e3]/14 bg-[#11151e] p-6 transition-colors hover:border-[#ec7a26] sm:p-8"
            >
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <h2 className="font-editorial text-2xl font-medium tracking-tight text-[#f8f1e3] group-hover:text-[#ec7a26] sm:text-3xl">
                    {channel.value}
                  </h2>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-[#ec7a26] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-[#ec7a26]">
                  0{idx + 1} · {channel.label}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-[#dfd7c8]">
                  {channel.note}
                </p>
              </div>
              <div className="mt-6 border-t border-[#f8f1e3]/10 pt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-[#82c4e6]">
                Open {channel.label} →
              </div>
            </a>
          ))}
        </div>

        <section className="mt-10 grid gap-6 border border-[#f8f1e3]/14 bg-[#11151e] p-8 sm:p-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <h2 className="font-editorial text-2xl font-medium tracking-tight text-[#f8f1e3] sm:text-3xl">
              Let&apos;s ship something resilient and unforgettable.
            </h2>
            <p className="mt-3 max-w-2xl text-xs leading-relaxed text-[#9da4b4] sm:text-sm">
              Whether you need an anime-grade interactive canvas, Python Perp DEX market-making infrastructure, full-stack SaaS &amp; AI pipelines, or encrypted Solidity FHEVM contracts, write directly to my studio inbox.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <a
              href="mailto:peejabh@gmail.com"
              className="inline-flex items-center gap-2 bg-[#ec7a26] px-6 py-3 text-xs font-medium text-[#120d08] transition-colors hover:bg-[#d86919]"
            >
              <Mail className="h-4 w-4" />
              <span>Email peejabh@gmail.com</span>
            </a>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-2 border border-[#f8f1e3]/25 bg-[#0b0e13] px-5 py-3 text-xs text-[#f8f1e3] transition-colors hover:border-[#ec7a26] hover:text-[#ec7a26]"
            >
              <MessageSquare className="h-4 w-4 text-[#ec7a26]" />
              <span>Ask Studio AI</span>
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
