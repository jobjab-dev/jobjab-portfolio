"use client";

import React, { useEffect, useRef, useState } from "react";
import { Terminal } from "lucide-react";
import { useChat } from "@/context/ChatContext";
import {
  allProjects,
  awardsData,
  contactChannels,
  flagshipProjects,
  platformProjects,
  quantBotProjects,
  techMatrix,
  web3Projects,
  type UnifiedProject,
} from "@/lib/portfolio-data";

type EntryTone = "normal" | "green" | "amber" | "cyan" | "muted" | "error";

interface TerminalEntry {
  id: string;
  cmd?: string;
  lines: { text: string; tone?: EntryTone; href?: string }[];
}

const KNOWN_COMMANDS = [
  "help",
  "ls",
  "projects",
  "flagship",
  "bots",
  "saas",
  "web3",
  "cat ",
  "inspect ",
  "open ",
  "whoami",
  "stack",
  "awards",
  "contact",
  "ai ",
  "clear",
];

const QUICK_CHIPS = [
  "help",
  "ls",
  "bots",
  "saas",
  "web3",
  "cat 07",
  "whoami",
  "awards",
  "clear",
];

const INITIAL_ENTRIES: TerminalEntry[] = [
  {
    id: "boot-0",
    cmd: "uname -a && ./status.sh --portfolio",
    lines: [
      {
        text: "JOBJAB-OS 6.12.0-fhevm x86_64 // 37 PRODUCTION SYSTEMS INDEXED",
        tone: "green",
      },
      {
        text: "OWNER: Jobjab (@jobjab-dev)  ROLE: Creative Technologist & Quant/Web3 Eng",
        tone: "normal",
      },
      {
        text: "TRACKS: [01-06] 6 FLAGSHIP UI | [07-17] 11 QUANT BOTS | [18-27] 10 SAAS & AI | [28-37] 10 WEB3 FHEVM",
        tone: "cyan",
      },
      {
        text: "AWARD: AWD-01 1st Place ($5,000) Zama Monthly Bounty Winner — fhevm-react-template",
        tone: "amber",
      },
      {
        text: "INDEX SNAPSHOT:",
        tone: "muted",
      },
      {
        text: "  [01-06] HÄNSEL & ROTH · KINETON M-4 · FELD · VECTRA OPS · PRESS 09 · ATELIER",
        tone: "normal",
      },
      {
        text: "  [07-17] Hyperliquid · GRVT · Polymarket · Lighter · Aster · Nado · Apex · Paradex · Backpack · Pacifica · ActiveLP",
        tone: "normal",
      },
      {
        text: "  [18-27] JVAULT · POSkub · Poskub Pay · FastCaption · Nudrub · BOND · PaoPay · TikTok AI · TryOn · Dukira 3D",
        tone: "normal",
      },
      {
        text: "  [28-37] fhevm-react-template ($5k) · ZipherLaunch · Monad World · Zadiction · Paylink (+5 FHEVM)",
        tone: "normal",
      },
      {
        text: "Type 'help', 'ls', 'bots', 'saas', 'web3', 'cat <01-37>', 'open <01-37>', or 'ai <question>'.",
        tone: "muted",
      },
    ],
  },
];

function toneClass(tone?: EntryTone): string {
  switch (tone) {
    case "green":
      return "text-[#39ff7a]";
    case "amber":
      return "text-[#ffb000]";
    case "cyan":
      return "text-[#46e8c8]";
    case "muted":
      return "text-[#6ca380]";
    case "error":
      return "text-[#ffb000]";
    default:
      return "text-[#c9eed6]";
  }
}

export function InteractiveShell({
  activeFlagshipIdx,
  onSelectFlagship,
}: {
  activeFlagshipIdx: number;
  onSelectFlagship: (idx: number) => void;
}) {
  const { sendMessage } = useChat();
  const [entries, setEntries] = useState<TerminalEntry[]>(INITIAL_ENTRIES);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histPos, setHistPos] = useState(-1);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (entries.length > INITIAL_ENTRIES.length && logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [entries]);

  const appendEntry = (cmd: string, lines: TerminalEntry["lines"]) => {
    setEntries((prev) => [
      ...prev.slice(-24),
      { id: `${Date.now()}-${Math.random()}`, cmd, lines },
    ]);
  };

  const findProjectByToken = (token?: string): UnifiedProject | undefined => {
    if (!token) return undefined;
    const cleaned = token.trim().toLowerCase();
    const padded = /^\d+$/.test(cleaned) ? cleaned.padStart(2, "0") : cleaned;
    return allProjects.find(
      (p) => p.index === padded || p.id.toLowerCase() === cleaned || p.title.toLowerCase().includes(cleaned)
    );
  };

  const executeCommand = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    setHistory((prev) => [trimmed, ...prev.slice(0, 30)]);
    setHistPos(-1);

    const [head, ...rest] = trimmed.split(/\s+/);
    const cmd = head.toLowerCase();
    const arg = rest.join(" ");

    if (cmd === "clear" || cmd === "cls") {
      setEntries([]);
      return;
    }

    if (cmd === "help" || cmd === "?") {
      appendEntry(trimmed, [
        { text: "AVAILABLE COMMANDS // JOBJAB-OS SHELL", tone: "green" },
        { text: "  ls | projects      List index of all 37 production systems", tone: "normal" },
        { text: "  flagship           List 01-06 interactive frontend runtimes", tone: "normal" },
        { text: "  bots               List 07-17 Python Perp DEX & AMM trading bots", tone: "normal" },
        { text: "  saas               List 18-27 SaaS, Fintech, POS & AI systems", tone: "normal" },
        { text: "  web3               List 28-37 Confidential Web3 & Zama FHEVM dApps", tone: "normal" },
        { text: "  cat <01-37>        Inspect build architecture & update Proof Monitor", tone: "cyan" },
        { text: "  open <01-37>       Launch live demo URL or open GitHub repository", tone: "cyan" },
        { text: "  whoami | stack     Studio profile & 4-group engineering matrix", tone: "normal" },
        { text: "  awards | contact   Zama $5,000 bounty & direct channels", tone: "normal" },
        { text: "  ai <question>      Query Gemini 2.5 Studio Desk assistant", tone: "amber" },
        { text: "  clear              Clear terminal buffer", tone: "muted" },
      ]);
      return;
    }

    if (cmd === "ls" || cmd === "projects") {
      appendEntry(trimmed, [
        { text: `TOTAL INDEXED: ${allProjects.length} SYSTEMS (4 TRACKS)`, tone: "green" },
        ...allProjects.map((p) => {
          const scope =
            p.category === "flagship"
              ? "[LIVE/PUBLIC]"
              : p.category === "web3"
              ? "[WEB3/LIVE]"
              : p.isPrivateRepo
              ? "[PRIVATE_REPO]"
              : "[PUBLIC]";
          const label =
            p.category === "flagship"
              ? p.shortLabel
              : p.category === "quant"
              ? `${p.title} (${p.venue})`
              : p.category === "platform"
              ? `${p.title} (${p.domain})`
              : p.shortTitle;
          return {
            text: `  ${p.index}  ${scope.padEnd(15)} ${label}`,
            tone: p.category === "quant" ? ("amber" as EntryTone) : ("normal" as EntryTone),
          };
        }),
      ]);
      return;
    }

    if (cmd === "flagship") {
      appendEntry(trimmed, [
        { text: `TRACK 01 // FLAGSHIP INTERACTIVE WEB RUNTIMES (${flagshipProjects.length})`, tone: "green" },
        ...flagshipProjects.map((p) => ({
          text: `  [${p.index}] ${p.title} — ${p.stackLine} -> ${p.liveUrl}`,
          tone: "normal" as EntryTone,
          href: p.liveUrl,
        })),
      ]);
      return;
    }

    if (cmd === "bots" || cmd === "quant") {
      appendEntry(trimmed, [
        { text: `TRACK 02 // QUANT & PERP DEX TRADING BOTS (${quantBotProjects.length})`, tone: "amber" },
        ...quantBotProjects.map((p) => ({
          text: `  [${p.index}] ${p.title} · ${p.venue} · ${p.strategy} ${
            p.liveUrl ? `-> ${p.liveUrl}` : "[PRIVATE_REPO]"
          }`,
          tone: p.liveUrl ? ("cyan" as EntryTone) : ("normal" as EntryTone),
          href: p.liveUrl,
        })),
      ]);
      return;
    }

    if (cmd === "saas" || cmd === "platforms") {
      appendEntry(trimmed, [
        { text: `TRACK 03 // PRODUCTION SAAS, FINTECH & AI (${platformProjects.length})`, tone: "cyan" },
        ...platformProjects.map((p) => ({
          text: `  [${p.index}] ${p.title} · ${p.domain} ${
            p.liveUrl ? `-> ${p.liveUrl}` : p.githubUrl ? `-> ${p.githubUrl}` : "[PRIVATE_REPO]"
          }`,
          tone: p.liveUrl || p.githubUrl ? ("normal" as EntryTone) : ("muted" as EntryTone),
          href: p.liveUrl || p.githubUrl,
        })),
      ]);
      return;
    }

    if (cmd === "web3" || cmd === "fhevm") {
      appendEntry(trimmed, [
        { text: `TRACK 04 // CONFIDENTIAL WEB3 & ZAMA FHEVM (${web3Projects.length})`, tone: "green" },
        ...web3Projects.map((p) => ({
          text: `  [${p.index}] ${p.title}${p.highlight ? ` ★ ${p.highlight}` : ""} -> ${p.liveUrl}`,
          tone: p.highlight ? ("amber" as EntryTone) : ("normal" as EntryTone),
          href: p.liveUrl,
        })),
      ]);
      return;
    }

    if (cmd === "cat" || cmd === "inspect") {
      const target = findProjectByToken(arg);
      if (!target) {
        appendEntry(trimmed, [
          { text: `cat: system '${arg || ""}' not found. Pass index 01..37 (e.g. 'cat 07').`, tone: "error" },
        ]);
        return;
      }
      if (target.category === "flagship") {
        const idx = flagshipProjects.findIndex((f) => f.id === target.id);
        if (idx >= 0) onSelectFlagship(idx);
      }
      const lines: TerminalEntry["lines"] = [
        { text: `[${target.index}] ${target.title}`, tone: "green" },
        { text: `  DESC: ${target.description}`, tone: "normal" },
        { text: `  STACK: ${target.tags.join(" · ")}`, tone: "cyan" },
      ];
      if (target.category === "flagship") {
        target.mechanics.forEach((m) => lines.push({ text: `  * ${m}`, tone: "muted" }));
        lines.push({ text: `  LIVE: ${target.liveUrl}`, tone: "green", href: target.liveUrl });
        lines.push({ text: `  REPO: ${target.githubUrl}`, tone: "cyan", href: target.githubUrl });
      } else if (target.category === "quant") {
        lines.push({ text: `  VENUE: ${target.venue} | STRATEGY: ${target.strategy}`, tone: "amber" });
        target.capabilities.forEach((c) => lines.push({ text: `  * ${c}`, tone: "muted" }));
        lines.push({
          text: target.githubUrl ? `  REPO: ${target.githubUrl}` : "  SOURCE: [PRIVATE_REPO] -> /contact",
          tone: target.githubUrl ? "cyan" : "amber",
          href: target.githubUrl || "/contact",
        });
        if (target.liveUrl) lines.push({ text: `  LIVE: ${target.liveUrl}`, tone: "green", href: target.liveUrl });
      } else if (target.category === "platform") {
        lines.push({ text: `  DOMAIN: ${target.domain}`, tone: "amber" });
        target.capabilities.forEach((c) => lines.push({ text: `  * ${c}`, tone: "muted" }));
        if (target.liveUrl) lines.push({ text: `  LIVE: ${target.liveUrl}`, tone: "green", href: target.liveUrl });
        if (target.githubUrl) lines.push({ text: `  REPO: ${target.githubUrl}`, tone: "cyan", href: target.githubUrl });
        if (!target.liveUrl && !target.githubUrl) {
          lines.push({ text: "  ACCESS: [PRIVATE_REPO] -> /contact", tone: "amber", href: "/contact" });
        }
      } else {
        target.features.forEach((f) => lines.push({ text: `  * ${f}`, tone: "muted" }));
        lines.push({ text: `  LIVE: ${target.liveUrl}`, tone: "green", href: target.liveUrl });
        lines.push({ text: `  REPO: ${target.githubUrl}`, tone: "cyan", href: target.githubUrl });
      }
      appendEntry(trimmed, lines);
      return;
    }

    if (cmd === "open") {
      const target = findProjectByToken(arg);
      if (!target) {
        appendEntry(trimmed, [
          { text: `open: specify system index 01..37 (e.g. 'open 01').`, tone: "error" },
        ]);
        return;
      }
      const dest =
        target.category === "flagship" || target.category === "web3"
          ? target.liveUrl
          : target.liveUrl || target.githubUrl;
      if (dest && typeof window !== "undefined") {
        window.open(dest, "_blank", "noopener,noreferrer");
        appendEntry(trimmed, [{ text: `LAUNCHED -> ${dest}`, tone: "green", href: dest }]);
      } else {
        appendEntry(trimmed, [
          {
            text: `[PRIVATE_REPO] '${target.title}' has no public web endpoint. Route to /contact for demo access.`,
            tone: "amber",
            href: "/contact",
          },
        ]);
      }
      return;
    }

    if (cmd === "whoami") {
      appendEntry(trimmed, [
        { text: "Jobjab (jobjab-dev) — Creative Technologist, Quant Systems & Design Engineer", tone: "green" },
        { text: "Scope: 37 Production Systems (6 Flagship UI, 11 Python Perp DEX Bots, 10 SaaS/AI, 10 Web3 FHEVM)", tone: "normal" },
        { text: "Email: peejabh@gmail.com | X: @jobjab_eth | Telegram: @jobjab123", tone: "cyan" },
      ]);
      return;
    }

    if (cmd === "stack") {
      appendEntry(trimmed, [
        { text: "ENGINEERING MATRIX (4 GROUPS)", tone: "green" },
        ...techMatrix.map((g) => ({
          text: `  [${g.code}] ${g.group}: ${g.items.join(", ")}`,
          tone: "normal" as EntryTone,
        })),
      ]);
      return;
    }

    if (cmd === "awards") {
      const a = awardsData[0];
      appendEntry(trimmed, [
        { text: `${a.index} // ${a.title} — ${a.placement} (${a.date})`, tone: "amber" },
        { text: `  PROJECT: ${a.projectTitle} -> ${a.demoUrl}`, tone: "green", href: a.demoUrl },
        { text: `  REPO: ${a.githubUrl}`, tone: "cyan", href: a.githubUrl },
      ]);
      return;
    }

    if (cmd === "contact") {
      appendEntry(trimmed, [
        { text: "DIRECT STUDIO CHANNELS", tone: "green" },
        ...contactChannels.map((c) => ({
          text: `  ${c.label.padEnd(14)} ${c.value} -> ${c.href}`,
          tone: "cyan" as EntryTone,
          href: c.href,
        })),
      ]);
      return;
    }

    if (cmd === "ai") {
      if (!arg) {
        appendEntry(trimmed, [{ text: "Usage: ai <your question about Jobjab's projects or stack>", tone: "amber" }]);
        return;
      }
      sendMessage(arg);
      appendEntry(trimmed, [{ text: `ROUTING TO STUDIO DESK AI -> "${arg}"`, tone: "green" }]);
      return;
    }

    appendEntry(trimmed, [
      { text: `zsh: command not found: ${trimmed}. Type 'help' for valid commands.`, tone: "error" },
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp" && history.length > 0) {
      e.preventDefault();
      const next = Math.min(histPos + 1, history.length - 1);
      setHistPos(next);
      setInput(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histPos <= 0) {
        setHistPos(-1);
        setInput("");
      } else {
        const next = histPos - 1;
        setHistPos(next);
        setInput(history[next]);
      }
    } else if (e.key === "Tab" && input.trim()) {
      e.preventDefault();
      const match = KNOWN_COMMANDS.find((c) => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  };

  return (
    <div
      className="flex h-full min-h-0 min-w-0 flex-col border border-[#193826] bg-[#08120c]"
      onClick={() => inputRef.current?.focus()}
    >
      {/* tmux Pane Title Bar */}
      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-[#193826] bg-[#0c1911] px-3 py-1.5 text-xs">
        <div className="flex min-w-0 items-center gap-2 text-[#c9eed6]">
          <Terminal className="h-3.5 w-3.5 shrink-0 text-[#39ff7a]" />
          <span className="truncate font-semibold text-[#ebfff2]">[0] jobjab@prod:~/portfolio</span>
          <span className="hidden shrink-0 text-[#6ca380] xl:inline">— zsh (interactive)</span>
        </div>
        <div className="flex shrink-0 items-center gap-2.5 whitespace-nowrap text-[11px]">
          <span className="hidden text-[#6ca380] sm:inline">ACTIVE: #{flagshipProjects[activeFlagshipIdx]?.index}</span>
          <span className="text-[#39ff7a]">● ONLINE</span>
        </div>
      </div>

      {/* Scrollable Output Buffer */}
      <div
        ref={logRef}
        aria-live="polite"
        className="custom-scrollbar h-[210px] space-y-2.5 overflow-y-auto p-3 text-xs leading-relaxed sm:h-[240px] lg:h-auto lg:min-h-0 lg:flex-1 lg:p-3.5"
      >
        {entries.map((entry) => (
          <div key={entry.id} className="space-y-1">
            {entry.cmd && (
              <div className="flex items-center gap-2 text-[#ebfff2]">
                <span className="shrink-0 font-semibold text-[#39ff7a]">jobjab@prod:~$</span>
                <span>{entry.cmd}</span>
              </div>
            )}
            <div className="space-y-0.5 pl-2">
              {entry.lines.map((line, i) =>
                line.href ? (
                  <a
                    key={i}
                    href={line.href}
                    target={line.href.startsWith("http") ? "_blank" : undefined}
                    rel={line.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={`block break-all underline decoration-[#193826] underline-offset-4 hover:text-[#39ff7a] hover:decoration-[#39ff7a] ${toneClass(line.tone)}`}
                  >
                    {line.text}
                  </a>
                ) : (
                  <p key={i} className={`break-words whitespace-pre-wrap ${toneClass(line.tone)}`}>
                    {line.text}
                  </p>
                )
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Command Strip */}
      <div className="custom-scrollbar flex shrink-0 items-center gap-1.5 overflow-x-auto whitespace-nowrap border-t border-[#193826] bg-[#060f0b] px-3 py-1.5 text-[11px] sm:flex-wrap">
        <span className="mr-1 shrink-0 text-[#6ca380]">RUN:</span>
        {QUICK_CHIPS.map((cmdChip) => (
          <button
            key={cmdChip}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              executeCommand(cmdChip);
            }}
            className="shrink-0 border border-[#193826] bg-[#0d1c13] px-2 py-0.5 text-[#c9eed6] transition-colors hover:border-[#39ff7a] hover:text-[#39ff7a]"
          >
            {cmdChip}
          </button>
        ))}
      </div>

      {/* Interactive Command Prompt */}
      <form
        onSubmit={handleSubmit}
        className="flex shrink-0 items-center gap-2 border-t border-[#193826] bg-[#050a07] px-3 py-2 text-xs"
      >
        <span className="shrink-0 font-semibold text-[#39ff7a] sm:hidden">$</span>
        <span className="hidden shrink-0 font-semibold text-[#39ff7a] sm:inline">jobjab@prod:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Terminal command input"
          placeholder="help, ls, bots, cat 07, whoami..."
          className="min-w-0 flex-1 bg-transparent text-xs text-[#ebfff2] placeholder:text-[#6ca380] focus:outline-none"
        />
        <span aria-hidden="true" className="term-cursor h-3.5 w-2 shrink-0 bg-[#39ff7a]" />
        <button
          type="submit"
          className="shrink-0 bg-[#39ff7a] px-2.5 py-1 text-[11px] font-semibold text-[#041108] transition-colors hover:bg-[#22e563]"
        >
          EXEC
        </button>
      </form>
    </div>
  );
}
