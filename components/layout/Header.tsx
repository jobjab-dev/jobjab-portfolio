"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { useChat } from "@/context/ChatContext";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/awards", label: "Awards" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const { sendMessage } = useChat();
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    sendMessage(query.trim());
    setQuery("");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#141311]/45 proofing-wall-ground">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="truncate text-sm font-normal uppercase tracking-[-0.01em] text-[#0f0c0a] sm:text-base lg:text-[17px]"
        >
          JOBJAB · CREATIVE TECHNOLOGIST &amp; DESIGN ENGINEER
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <nav aria-label="Primary Navigation" className="flex items-center gap-2 text-[15px] text-[#120c0b]">
            {navItems.map((item, idx) => {
              const active = pathname === item.href;
              return (
                <React.Fragment key={item.href}>
                  {idx > 0 && <span className="text-[#120c0b]/45">/</span>}
                  <Link
                    href={item.href}
                    className={`underline-offset-4 transition-opacity ${
                      active ? "underline decoration-[#120c0b]" : "hover:underline"
                    }`}
                  >
                    {item.label}
                  </Link>
                </React.Fragment>
              );
            })}
          </nav>

          <form
            onSubmit={handleSubmit}
            className="flex h-9 w-52 items-center justify-between rounded-full border border-[#241a12] pl-3.5 pr-1 transition-colors focus-within:border-[#ea681d]"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask Jobjab AI..."
              aria-label="Ask Jobjab AI"
              className="min-w-0 flex-1 bg-transparent text-sm text-[#120c0b] placeholder:text-[#2a2119]/80 focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Ask AI Assistant"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0f0c0a] text-[#efeae3] transition-colors hover:bg-[#ea681d] hover:text-[#121110]"
            >
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          className="flex h-9 w-9 items-center justify-center border border-[#141311]/35 bg-[#efebe4] text-[#121110] md:hidden"
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-[#141311]/25 bg-[#efebe4] px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-2 text-base text-[#120c0b]">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`border-b border-[#141311]/10 py-2 ${
                    active ? "font-bold text-[#ea681d]" : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <form
            onSubmit={handleSubmit}
            className="mt-3 flex h-10 items-center justify-between rounded-full border border-[#241a12] bg-white/60 pl-4 pr-1"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask Jobjab AI..."
              className="min-w-0 flex-1 bg-transparent text-sm text-[#120c0b] placeholder:text-[#2a2119]/80 focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Ask AI Assistant"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0f0c0a] text-[#efeae3]"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
