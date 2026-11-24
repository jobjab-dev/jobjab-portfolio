import Link from "next/link";
import { ArrowUpRight, Github, Lock } from "lucide-react";
import type { PlatformProject } from "@/lib/portfolio-data";

export function PlatformProjectCard({ proj }: { proj: PlatformProject }) {
  return (
    <article className="flex flex-col justify-between border border-[#f8f1e3]/14 bg-[#11151e] p-5 transition-colors hover:border-[#82c4e6]/55">
      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-editorial text-xl font-medium tracking-tight text-[#f8f1e3]">
            {proj.index} · {proj.title}
          </h3>
          {proj.isPrivateRepo && (
            <span className="inline-flex items-center gap-1 border border-[#ec7a26]/40 bg-[#23170d] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-[#ec7a26]">
              <Lock className="h-3 w-3" />
              <span>Private Repo</span>
            </span>
          )}
        </div>

        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.06em] text-[#82c4e6]">
          {proj.domain}
        </p>

        <p className="mt-2.5 text-xs leading-relaxed text-[#dfd7c8]">{proj.description}</p>

        <ul className="mt-4 space-y-1.5 border-t border-[#f8f1e3]/10 pt-3 text-xs leading-relaxed text-[#9da4b4]">
          {proj.capabilities.map((cap) => (
            <li key={cap} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#82c4e6]" />
              <span>{cap}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 border-t border-[#f8f1e3]/10 pt-4">
        <div className="mb-4 flex flex-wrap gap-1.5">
          {proj.tags.map((tag) => (
            <span
              key={tag}
              className="border border-[#f8f1e3]/12 bg-[#171d29] px-2 py-0.5 font-mono text-[11px] text-[#dfd7c8]"
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
              className="flex flex-1 items-center justify-center gap-1.5 border border-[#f8f1e3]/20 bg-[#0b0e13] px-3 py-2 text-xs text-[#f8f1e3] transition-colors hover:border-[#ec7a26] hover:text-[#ec7a26]"
            >
              <Github className="h-3.5 w-3.5" />
              <span>{proj.githubLabel || "GitHub"}</span>
            </a>
          ) : (
            <Link
              href="/contact"
              className="flex flex-1 items-center justify-center gap-1.5 border border-[#f8f1e3]/14 bg-[#0b0e13] px-3 py-2 text-xs text-[#9da4b4] transition-colors hover:border-[#ec7a26] hover:text-[#ec7a26]"
            >
              <Lock className="h-3 w-3 text-[#ec7a26]" />
              <span>Request Access</span>
            </Link>
          )}

          {proj.secondaryLiveUrl && (
            <a
              href={proj.secondaryLiveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 border border-[#82c4e6]/45 bg-[#0b0e13] px-3 py-2 text-xs font-medium text-[#82c4e6] transition-colors hover:bg-[#82c4e6] hover:text-[#0b0e13]"
            >
              <span>{proj.secondaryLiveLabel || "Open App"}</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}

          {proj.liveUrl ? (
            <a
              href={proj.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 bg-[#ec7a26] px-3 py-2 text-xs font-medium text-[#120d08] transition-colors hover:bg-[#d86919]"
            >
              <span>{proj.liveLabel || "Launch Live"}</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ) : (
            <Link
              href="/contact"
              className="flex flex-1 items-center justify-center gap-1.5 border border-[#f8f1e3]/25 bg-[#171d29] px-3 py-2 text-xs font-medium text-[#f8f1e3] transition-colors hover:border-[#ec7a26] hover:text-[#ec7a26]"
            >
              <span>Request Demo</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[#ec7a26]" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
