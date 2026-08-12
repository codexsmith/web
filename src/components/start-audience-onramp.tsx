import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function StartAudienceOnramp() {
  return (
    <Link
      className="group mb-6 flex min-h-14 w-full items-center justify-between gap-3 rounded-sm border border-border bg-card px-4 py-3 transition-colors hover:bg-primary hover:text-primary-foreground"
      href="/audience"
    >
      <span className="min-w-0">
        <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground transition-colors group-hover:text-primary-foreground/65">
          Optional on-ramp
        </span>
        <span className="mt-1 block text-sm font-semibold leading-5">
          Start from what brings you here
        </span>
      </span>
      <ArrowRight
        aria-hidden="true"
        className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1"
      />
    </Link>
  );
}
