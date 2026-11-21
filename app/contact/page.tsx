"use client";

import { ArrowUpRight, Mail, MessageSquare } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { contactChannels } from "@/lib/portfolio-data";
import { useChat } from "@/context/ChatContext";

export default function ContactPage() {
  const { setIsOpen } = useChat();

  return (
    <div className="flex min-h-screen flex-col bg-[#050a07] text-[#c9eed6]">
      <Header />

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-10 border-b border-[#193826] pb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-[#ebfff2] sm:text-4xl lg:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#6ca380] sm:text-base">
            Open to product studio collaborations, Creative Technologist / Design Engineer roles, Perp DEX trading systems, full-stack SaaS architecture, and confidential Zama FHEVM protocol engagements.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {contactChannels.map((channel, idx) => (
            <a
              key={channel.id}
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between border border-[#193826] bg-[#08120c] p-6 transition-colors hover:border-[#39ff7a] sm:p-8"
            >
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <h2 className="text-xl font-semibold tracking-tight text-[#ebfff2] group-hover:text-[#39ff7a] sm:text-2xl">
                    {channel.value}
                  </h2>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-[#39ff7a] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[#ffb000]">
                  0{idx + 1} // {channel.label}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-[#c9eed6]">
                  {channel.note}
                </p>
              </div>
              <div className="mt-6 border-t border-[#193826] pt-3 text-[11px] uppercase tracking-[0.12em] text-[#39ff7a]">
                Open {channel.label} →
              </div>
            </a>
          ))}
        </div>

        <section className="mt-10 grid gap-6 border border-[#193826] bg-[#08120c] p-8 sm:p-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <h2 className="text-2xl font-semibold tracking-tight text-[#ebfff2] sm:text-3xl">
              Let&apos;s ship something resilient and tactile.
            </h2>
            <p className="mt-3 max-w-2xl text-xs leading-relaxed text-[#6ca380] sm:text-sm">
              Whether you need a custom Web Audio / Canvas interactive interface, Python Perp DEX market-making infrastructure, full-stack SaaS &amp; AI pipelines, or encrypted Solidity FHEVM contracts, write directly to my studio inbox.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <a
              href="mailto:peejabh@gmail.com"
              className="inline-flex items-center gap-2 bg-[#39ff7a] px-6 py-3 text-xs font-semibold text-[#041108] transition-colors hover:bg-[#22e563]"
            >
              <Mail className="h-4 w-4" />
              <span>Email peejabh@gmail.com</span>
            </a>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-2 border border-[#2f7d4d] bg-[#050a07] px-5 py-3 text-xs text-[#c9eed6] transition-colors hover:border-[#39ff7a] hover:text-[#39ff7a]"
            >
              <MessageSquare className="h-4 w-4 text-[#ffb000]" />
              <span>Ask Studio AI</span>
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
