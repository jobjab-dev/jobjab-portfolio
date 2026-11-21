"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, Terminal, X } from "lucide-react";
import { useChat } from "@/context/ChatContext";

const navItems = [
  { href: "/", label: "0:home" },
  { href: "/projects", label: "1:projects(37)" },
  { href: "/about", label: "2:about" },
  { href: "/awards", label: "3:awards" },
  { href: "/contact", label: "4:contact" },
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
    <header className="sticky top-0 z-40 w-full border-b border-[#193826] bg-[#08120c]">
      <div className="mx-auto flex h-12 max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 truncate text-xs font-semibold tracking-tight text-[#39ff7a] sm:text-sm"
        >
          <Terminal className="h-4 w-4 shrink-0" />
          <span className="truncate">[0:jobjab@prod] // PORTFOLIO_V3</span>
        </Link>

        <div className="hidden items-center gap-4 lg:flex">
          <nav aria-label="Primary Navigation" className="flex items-center gap-1 text-xs">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`border px-2.5 py-1 transition-colors ${
                    active
                      ? "border-[#39ff7a] bg-[#39ff7a] font-semibold text-[#041108]"
                      : "border-transparent text-[#c9eed6] hover:border-[#193826] hover:bg-[#0d1c13] hover:text-[#39ff7a]"
                  }`}
                >
                  {item.label}
                  {active ? "*" : ""}
                </Link>
              );
            })}
          </nav>

          <form
            onSubmit={handleSubmit}
            className="flex h-8 w-56 items-center justify-between border border-[#193826] bg-[#050a07] pl-2.5 pr-1 transition-colors focus-within:border-[#39ff7a]"
          >
            <span className="mr-1.5 text-[11px] font-semibold text-[#39ff7a]">ai&gt;</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask Jobjab AI..."
              aria-label="Ask Jobjab AI"
              className="min-w-0 flex-1 bg-transparent text-xs text-[#ebfff2] placeholder:text-[#6ca380] focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Ask AI Assistant"
              className="flex h-6 w-6 shrink-0 items-center justify-center bg-[#39ff7a] text-[#041108] transition-colors hover:bg-[#22e563]"
            >
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          className="flex h-8 w-8 items-center justify-center border border-[#193826] bg-[#0d1c13] text-[#39ff7a] lg:hidden"
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-[#193826] bg-[#08120c] px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1.5 text-sm">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`border px-3 py-2 ${
                    active
                      ? "border-[#39ff7a] bg-[#39ff7a] font-semibold text-[#041108]"
                      : "border-[#193826] bg-[#0d1c13] text-[#c9eed6]"
                  }`}
                >
                  {item.label}
                  {active ? "*" : ""}
                </Link>
              );
            })}
          </nav>
          <form
            onSubmit={handleSubmit}
            className="mt-3 flex h-9 items-center justify-between border border-[#193826] bg-[#050a07] pl-3 pr-1 focus-within:border-[#39ff7a]"
          >
            <span className="mr-1.5 text-xs font-semibold text-[#39ff7a]">ai&gt;</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask Jobjab AI..."
              aria-label="Ask Jobjab AI mobile"
              className="min-w-0 flex-1 bg-transparent text-xs text-[#ebfff2] placeholder:text-[#6ca380] focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Ask AI Assistant"
              className="flex h-7 w-7 shrink-0 items-center justify-center bg-[#39ff7a] text-[#041108]"
            >
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
