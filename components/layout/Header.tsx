"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMotionValueEvent, useScroll, type MotionValue } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useChat } from "@/context/ChatContext";
import { StudioSeal } from "@/components/cinema/StudioSeal";

interface HeaderProps {
  variant?: "overlay" | "solid";
  activeScene?: {
    code: string;
    label: string;
  };
  scrollProgress?: MotionValue<number>;
}

function formatTimecode(seconds: number): string {
  const h = String(Math.floor(seconds / 3600) % 24).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export function Header({
  variant = "solid",
  activeScene = { code: "SC 01", label: "ABOVE THE CITY" },
  scrollProgress,
}: HeaderProps) {
  const pathname = usePathname();
  const { setIsOpen } = useChat();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tick, setTick] = useState(3889);
  const [scrollSecondsOffset, setScrollSecondsOffset] = useState(0);
  const { scrollYProgress: pageScrollY } = useScroll();
  const activeProgress = scrollProgress ?? pageScrollY;

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  useMotionValueEvent(activeProgress, "change", (v) => {
    const clamped = Math.max(0, Math.min(1, v));
    const next = Math.round(clamped * 840);
    setScrollSecondsOffset((prev) => (prev === next ? prev : next));
  });

  const isOverlay = variant === "overlay";

  const linkClass = (href: string) => {
    const active = pathname === href;
    return `transition-colors ${
      active ? "text-[#ec7a26] font-medium" : "text-[#f8f1e3]/90 hover:text-[#ec7a26]"
    }`;
  };

  return (
    <header
      className={
        isOverlay
          ? "absolute inset-x-0 top-0 z-30 bg-[linear-gradient(180deg,rgba(11,14,19,0.9)_0%,rgba(11,14,19,0.72)_58%,rgba(11,14,19,0.28)_84%,rgba(11,14,19,0)_100%)] pb-6"
          : "sticky top-0 z-30 border-b border-[#f8f1e3]/14 bg-[#0b0e13]"
      }
    >
      <div className="mx-auto flex max-w-[1440px] items-start justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
        {/* Top-Left Corner-Bracketed Studio Seal */}
        <Link
          href="/"
          aria-label="Jobjab Studio Home"
          className="group flex items-center gap-3 text-[#f8f1e3]"
        >
          <StudioSeal className="h-8 w-8 transition-colors group-hover:text-[#ec7a26]" />
          <span className="hidden text-xs font-medium uppercase tracking-[0.18em] text-[#f8f1e3] sm:inline">
            JOBJAB
          </span>
        </Link>

        {/* Top-Center 3-Column Editorial Index Nav (Kumo reference rhythm) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden gap-x-8 text-xs leading-5 md:grid md:grid-cols-3"
        >
          <div className="flex flex-col">
            <Link href="/projects" className={linkClass("/projects")}>
              Work (37)
            </Link>
            <Link href="/#flagship" className="text-[#f3ead8] transition-colors hover:text-[#ec7a26]">
              Flagships
            </Link>
            <Link href="/#quant" className="text-[#f3ead8] transition-colors hover:text-[#ec7a26]">
              Quant Bots
            </Link>
          </div>

          <div className="flex flex-col">
            <Link href="/about" className={linkClass("/about")}>
              About
            </Link>
            <Link href="/#platforms" className="text-[#f3ead8] transition-colors hover:text-[#ec7a26]">
              SaaS &amp; AI
            </Link>
            <Link href="/#web3" className="text-[#f3ead8] transition-colors hover:text-[#ec7a26]">
              Web3 FHEVM
            </Link>
          </div>

          <div className="flex flex-col">
            <Link href="/awards" className={linkClass("/awards")}>
              Awards
            </Link>
            <Link href="/contact" className={linkClass("/contact")}>
              Say hello
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="text-left text-[#f3ead8] transition-colors hover:text-[#ec7a26]"
            >
              Ask AI
            </button>
          </div>
        </nav>

        {/* Top-Right SMPTE Scene Timecode + Start a project CTA */}
        <div className="hidden items-start gap-6 md:flex">
          <div className="hidden flex-col items-start lg:flex">
            <span
              data-testid="smpte-timecode"
              className="border border-[#f8f1e3]/40 bg-[#0b0e13]/75 px-2.5 py-0.5 font-mono text-[11px] tabular-nums tracking-[0.06em] text-[#f8f1e3]"
            >
              {formatTimecode(tick + scrollSecondsOffset)}
            </span>
            <span className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#f8f1e3]">
              {activeScene.label}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#dfd7c8]">
              {activeScene.code}
            </span>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 pt-0.5 text-xs font-medium text-[#f8f1e3] transition-colors hover:text-[#ec7a26]"
          >
            <span>Start a project</span>
            <span className="h-2 w-2 rounded-full bg-[#ec7a26]" />
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-3 md:hidden">
          <span className="border border-[#f8f1e3]/25 bg-[#0b0e13]/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#f8f1e3]">
            {activeScene.code}
          </span>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            className="flex h-8 w-8 items-center justify-center border border-[#f8f1e3]/25 bg-[#11151e]/90 text-[#f8f1e3]"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="border-t border-[#f8f1e3]/14 bg-[#0b0e13] px-5 py-5 md:hidden">
          <nav className="grid grid-cols-2 gap-3 text-sm">
            {[
              { href: "/", label: "Horizon Reel" },
              { href: "/projects", label: "Work (37)" },
              { href: "/about", label: "About" },
              { href: "/awards", label: "Awards" },
              { href: "/contact", label: "Say hello" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`border px-3 py-2 text-xs ${
                  pathname === item.href
                    ? "border-[#ec7a26] bg-[#ec7a26] font-medium text-[#120d08]"
                    : "border-[#f8f1e3]/14 bg-[#11151e] text-[#f8f1e3]"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                setIsOpen(true);
              }}
              className="border border-[#f8f1e3]/14 bg-[#11151e] px-3 py-2 text-left text-xs text-[#f8f1e3]"
            >
              Ask Studio AI
            </button>
          </nav>

          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-4 flex items-center justify-center gap-2 bg-[#ec7a26] py-2.5 text-xs font-medium text-[#120d08]"
          >
            <span>Start a project</span>
          </Link>
        </div>
      )}
    </header>
  );
}
