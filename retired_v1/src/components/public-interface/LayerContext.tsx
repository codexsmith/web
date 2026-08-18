import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function LayerContext({
  layer,
  total = 6,
  outward,
  inward,
}: {
  layer: { index: number; label: string };
  total?: number;
  outward?: { label: string; href: string };
  inward?: { label: string; href: string };
}) {
  return (
    <nav
      aria-label="Boundary First depth context"
      className="border-y border-border bg-card/70 px-5 sm:px-8"
    >
      <div className="mx-auto flex min-h-12 max-w-7xl flex-wrap items-center justify-between gap-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em]">
        <div className="flex flex-wrap items-center gap-3 text-foreground-muted">
          {outward ? (
            <Link className="inline-flex min-h-9 items-center hover:text-foreground" href={outward.href}>
              <ArrowLeft aria-hidden="true" className="mr-2 h-3.5 w-3.5" />
              {outward.label}
            </Link>
          ) : null}
          <span aria-hidden="true" className="hidden h-4 w-px bg-border sm:block" />
          <span>
            Layer {layer.index} of {total} · {layer.label}
          </span>
        </div>
        {inward ? (
          <Link className="inline-flex min-h-9 items-center hover:text-foreground" href={inward.href}>
            {inward.label}
            <ArrowRight aria-hidden="true" className="ml-2 h-3.5 w-3.5" />
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
