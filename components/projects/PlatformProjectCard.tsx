import Link from "next/link";
import { ArrowUpRight, Github, Lock } from "lucide-react";
import type { PlatformProject } from "@/lib/portfolio-data";

export function PlatformProjectCard({ proj }: { proj: PlatformProject }) {
  return (
    <article className="flex flex-col justify-between border border-[#193826] bg-[#08120c] p-5 transition-colors hover:border-[#2f7d4d]">
      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-lg font-semibold tracking-tight text-[#ebfff2]">
            [{proj.index}] {proj.title}
          </h3>
          {proj.isPrivateRepo && (
            <span className="inline-flex items-center gap-1 border border-[#ffb000]/45 bg-[#191205] px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] text-[#ffb000]">
              <Lock className="h-3 w-3" />
              <span>PRIVATE_REPO</span>
            </span>
          )}
        </div>

        <p className="mt-1 text-[11px] uppercase tracking-[0.06em] text-[#46e8c8]">
          {proj.domain}
        </p>

        <p className="mt-2.5 text-xs leading-relaxed text-[#c9eed6]">{proj.description}</p>

        <ul className="mt-4 space-y-1.5 border-t border-[#193826] pt-3 text-xs leading-relaxed text-[#9dc4ac]">
          {proj.capabilities.map((cap) => (
            <li key={cap} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#39ff7a]" />
              <span>{cap}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 border-t border-[#193826] pt-4">
        <div className="mb-4 flex flex-wrap gap-1.5">
          {proj.tags.map((tag) => (
            <span
              key={tag}
              className="border border-[#193826] bg-[#0d1c13] px-2 py-0.5 text-[11px] text-[#c9eed6]"
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
              className="flex flex-1 items-center justify-center gap-1.5 border border-[#2f7d4d] bg-[#050a07] px-3 py-2 text-xs text-[#c9eed6] transition-colors hover:border-[#39ff7a] hover:text-[#39ff7a]"
            >
              <Github className="h-3.5 w-3.5" />
              <span>{proj.githubLabel || "GitHub"}</span>
            </a>
          ) : (
            <Link
              href="/contact"
              className="flex flex-1 items-center justify-center gap-1.5 border border-[#193826] bg-[#050a07] px-3 py-2 text-xs text-[#6ca380] transition-colors hover:border-[#ffb000] hover:text-[#ffb000]"
            >
              <Lock className="h-3 w-3 text-[#ffb000]" />
              <span>Request Access</span>
            </Link>
          )}

          {proj.secondaryLiveUrl && (
            <a
              href={proj.secondaryLiveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 border border-[#46e8c8]/50 bg-[#050a07] px-3 py-2 text-xs font-medium text-[#46e8c8] transition-colors hover:bg-[#46e8c8] hover:text-[#041108]"
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
              className="flex flex-1 items-center justify-center gap-1.5 bg-[#39ff7a] px-3 py-2 text-xs font-semibold text-[#041108] transition-colors hover:bg-[#22e563]"
            >
              <span>{proj.liveLabel || "Launch Live"}</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ) : (
            <Link
              href="/contact"
              className="flex flex-1 items-center justify-center gap-1.5 border border-[#39ff7a]/60 bg-[#0d1c13] px-3 py-2 text-xs font-medium text-[#39ff7a] transition-colors hover:bg-[#39ff7a] hover:text-[#041108]"
            >
              <span>Request Demo</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
