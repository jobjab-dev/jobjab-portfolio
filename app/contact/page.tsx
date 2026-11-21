"use client";

import { ArrowUpRight, Mail, MessageSquare } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { contactChannels } from "@/lib/portfolio-data";
import { useChat } from "@/context/ChatContext";

export default function ContactPage() {
  const { setIsOpen } = useChat();

  return (
    <div className="flex min-h-screen flex-col proofing-wall-ground text-[#121110]">
      <Header />

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-10 border-b border-[#141311]/35 pb-8">
          <h1 className="text-4xl font-normal tracking-tight text-[#0a0a0a] sm:text-5xl lg:text-6xl">
            Get in Touch
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#2f2b26]">
            Open to product studio collaborations, Creative Technologist / Design Engineer roles, and confidential Zama FHEVM protocol engagements.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {contactChannels.map((channel, idx) => (
            <a
              key={channel.id}
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              className="strip-shadow group flex flex-col justify-between bg-[#f2eee6] p-6 transition-transform duration-150 hover:-translate-y-0.5 sm:p-8"
            >
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <h2 className="text-2xl font-normal tracking-tight text-[#0a0a0a] group-hover:text-[#ea681d] sm:text-3xl">
                    {channel.value}
                  </h2>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-[#ea681d] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-[#5a544d]">
                  0{idx + 1} · {channel.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#433e37]">
                  {channel.note}
                </p>
              </div>
              <div className="mt-6 border-t border-[#141311]/10 pt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-[#171837]">
                Open {channel.label} →
              </div>
            </a>
          ))}
        </div>

        <section className="mt-10 grid gap-6 border border-[#e8e3dd]/20 bg-[#171837] p-8 text-[#eeeef5] sm:p-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <h2 className="text-3xl font-normal tracking-tight text-[#f6f2eb] sm:text-4xl">
              Let&apos;s ship something resilient and tactile.
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#c9cad8]">
              Whether you need a custom Web Audio / Canvas interactive interface, Next.js 16 real-time product architecture, or encrypted Solidity FHEVM contracts, write directly to my studio inbox.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <a
              href="mailto:peejabh@gmail.com"
              className="inline-flex items-center gap-2 rounded-[4px] bg-[#ea681d] px-6 py-3 text-sm font-normal text-[#120e0a] transition-colors hover:bg-[#d85a12]"
            >
              <Mail className="h-4 w-4" />
              <span>Email peejabh@gmail.com</span>
            </a>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-2 border border-[#e8e3dd]/35 px-5 py-3 text-sm text-[#f6f2eb] transition-colors hover:border-[#ea681d] hover:bg-white/5"
            >
              <MessageSquare className="h-4 w-4 text-[#ea681d]" />
              <span>Ask Studio AI</span>
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
