import { Slot } from "@radix-ui/react-slot";
import { twMerge } from "tailwind-merge";

export const focusRing = "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pop/70 focus-visible:ring-offset-2 focus-visible:ring-offset-paper";

// A chunky button with an ink border and a hard offset shadow that presses in on click.
export function Button({ className, asChild = false, variant = "primary", size = "md", ...props }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={twMerge(
        "inline-flex min-h-11 cursor-pointer select-none items-center justify-center gap-2 rounded-xl border-2 border-ink font-display font-bold tracking-tight transition-[transform,box-shadow,background-color] duration-150",
        "active:translate-x-[3px] active:translate-y-[3px] active:shadow-none motion-reduce:transition-none",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:active:translate-x-0 disabled:active:translate-y-0",
        size === "lg" ? "px-6 py-3.5 text-lg" : size === "sm" ? "min-h-9 px-3 py-1.5 text-sm" : "px-5 py-2.5 text-base",
        variant === "primary" && "bg-accent text-on-accent shadow-block-sm hover:-translate-x-px hover:-translate-y-px hover:shadow-block",
        variant === "ink" && "bg-ink text-paper shadow-[3px_3px_0_0_var(--pop)] hover:-translate-x-px hover:-translate-y-px",
        variant === "outline" && "bg-white text-ink shadow-block-sm hover:-translate-x-px hover:-translate-y-px hover:shadow-block",
        variant === "ghost" && "border-transparent bg-transparent text-ink underline decoration-2 underline-offset-4 hover:bg-white/60",
        focusRing,
        className,
      )}
      {...props}
    />
  );
}

export function Eyebrow({ className, children }) {
  return (
    <p className={twMerge("inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-3 py-1 font-display text-xs font-bold uppercase tracking-[0.14em] text-ink", className)}>
      <span aria-hidden="true" className="size-2 rounded-full bg-pop" />
      {children}
    </p>
  );
}

// The brand mark: a map pin with a fork-and-dot face, in a bouncy yellow.
export function Logo({ className = "size-10" }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M16 29C9.5 21.5 5.5 17 5.5 12.2a10.5 10.5 0 0 1 21 0C26.5 17 22.5 21.5 16 29Z" fill="var(--accent)" stroke="var(--ink)" strokeWidth="2.4" strokeLinejoin="round" />
      <circle cx="16" cy="12" r="4.4" fill="#fff" stroke="var(--ink)" strokeWidth="2.2" />
      <circle cx="16" cy="12" r="1.5" fill="var(--pop)" />
    </svg>
  );
}
