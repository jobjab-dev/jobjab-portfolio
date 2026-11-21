import Link from "next/link";
import { ArrowUpRight, Github, Lock } from "lucide-react";
import type { PlatformProject } from "@/lib/portfolio-data";

export function PlatformProjectCard({ proj }: { proj: PlatformProject }) {
  return (
    <article className="proof-shadow flex flex-col justify-between bg-[#f6f2eb] p-5">
      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-2xl font-normal tracking-tight text-[#0a0a0a]">
            {proj.index} · {proj.title}
          </h3>
          {proj.isPrivateRepo && (
            <span className="inline-flex items-center gap-1 border border-[#141311]/15 bg-[#e6e1db] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-[#3a352e]">
              <Lock className="h-3 w-3 text-[#ea681d]" />
              <span>Private Repo</span>
            </span>
          )}
        </div>

        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-[#5a544d]">
          {proj.domain}
        </p>

        <p className="mt-2.5 text-sm leading-relaxed text-[#38332c]">{proj.description}</p>

        <ul className="mt-4 space-y-1.5 border-t border-[#141311]/10 pt-3 text-xs leading-relaxed text-[#433e37]">
          {proj.capabilities.map((cap) => (
            <li key={cap} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#ea681d]" />
              <span>{cap}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 border-t border-[#141311]/12 pt-4">
        <div className="mb-4 flex flex-wrap gap-1.5">
          {proj.tags.map((tag) => (
            <span
              key={tag}
              className="border border-[#141311]/15 bg-[#e8e3dd] px-2 py-0.5 font-mono text-[11px] text-[#1a1815]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {proj.githubUrl ? (
            <a
              href={proj.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 border border-[#141311]/30 bg-white/70 px-3 py-2 text-xs text-[#121110] transition-colors hover:border-[#121110] hover:bg-white"
            >
              <Github className="h-3.5 w-3.5" />
              <span>{proj.githubLabel || "GitHub"}</span>
            </a>
          ) : (
            <Link
              href="/contact"
              className="flex flex-1 items-center justify-center gap-1.5 border border-[#141311]/25 bg-[#efebe4] px-3 py-2 text-xs text-[#121110] transition-colors hover:border-[#ea681d] hover:bg-white"
            >
              <Lock className="h-3 w-3 text-[#ea681d]" />
              <span>Request Access</span>
            </Link>
          )}

          {proj.secondaryLiveUrl && (
            <a
              href={proj.secondaryLiveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 border border-[#171837] bg-[#171837] px-3 py-2 text-xs font-medium text-[#f6f2eb] transition-colors hover:bg-[#1e2049]"
            >
              <span>{proj.secondaryLiveLabel || "Open App"}</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[#ea681d]" />
            </a>
          )}

          {proj.liveUrl ? (
            <a
              href={proj.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-[3px] bg-[#ea681d] px-3 py-2 text-xs font-medium text-[#120e0a] transition-colors hover:bg-[#d85a12]"
            >
              <span>{proj.liveLabel || "Launch Live"}</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ) : (
            <Link
              href="/contact"
              className="flex flex-1 items-center justify-center gap-1.5 border border-[#171837] bg-[#171837] px-3 py-2 text-xs font-medium text-[#f6f2eb] transition-colors hover:bg-[#1e2049]"
            >
              <span>Request Demo</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[#ea681d]" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
