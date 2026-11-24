export function StudioSeal({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center text-[#f8f1e3] ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 32 32"
        className="absolute inset-0 h-full w-full"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      >
        <path d="M1 8V1h7" />
        <path d="M24 1h7v7" />
        <path d="M31 24v7h-7" />
        <path d="M8 31H1v-7" />
      </svg>
      <span className="font-editorial text-sm font-medium leading-none tracking-normal">
        創
      </span>
    </span>
  );
}
