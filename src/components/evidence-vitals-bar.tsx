import type { EvidenceVital } from "@/lib/evidence-vitals";

type EvidenceVitalsBarProps = {
  className?: string;
  description?: string;
  eyebrow?: string;
  items: readonly EvidenceVital[];
  layout?: "inline" | "stacked";
  stamp?: string;
  title: string;
};

function numberFor(items: readonly EvidenceVital[], id: string) {
  const value = Number(items.find((item) => item.id === id)?.value ?? 0);
  return Number.isFinite(value) ? value : 0;
}

export function EvidenceVitalsBar({
  className = "",
  description,
  eyebrow = "Evidence status",
  items,
  stamp,
  title,
}: EvidenceVitalsBarProps) {
  const researchBody = !items.some((item) => item.id === "source-stated");
  const operational =
    numberFor(items, "operationally-verified") > 0 ||
    (researchBody && numberFor(items, "bounded-cases") > 0);
  const standing = operational ? "Operational" : "Recorded";

  return (
    <details className={`group border border-border bg-card ${className}`}>
      <summary className="flex min-h-14 cursor-pointer list-none flex-wrap items-center justify-between gap-3 px-4 py-3 [&::-webkit-details-marker]:hidden sm:px-5">
        <span className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-foreground-muted">
            {eyebrow}
          </span>
          <span className="border border-border bg-background px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.12em]">
            {standing}
          </span>
          <span className="border border-border bg-accent/10 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.12em]">
            Evidence pending
          </span>
          <span className="text-xs font-medium text-foreground/72">{title}</span>
        </span>
        <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
          <span className="group-open:hidden">Inspect boundaries +</span>
          <span className="hidden group-open:inline">Close boundaries -</span>
        </span>
      </summary>

      <div className="border-t border-border px-4 py-5 sm:px-5">
        {description ? (
          <p className="max-w-4xl text-xs leading-6 text-foreground/68">
            {description}
          </p>
        ) : null}
        <p className="mt-3 max-w-4xl text-xs leading-6 text-foreground/68">
          Evidence status records current standing only. It does not raise the claim ceiling or imply independent verification.
        </p>
        <dl className="mt-5 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div className="bg-background p-4" key={item.id}>
              <dt className="font-mono text-[9px] font-semibold uppercase leading-5 tracking-[0.12em] text-foreground-muted">
                {item.label}
              </dt>
              <dd className="mt-1 font-serif text-2xl font-semibold">{item.value}</dd>
              <p className="mt-2 text-xs leading-5 text-foreground/64">
                {item.detail}
              </p>
            </div>
          ))}
        </dl>
        {stamp ? (
          <p className="mt-3 font-mono text-[9px] uppercase leading-5 tracking-[0.11em] text-foreground-muted">
            {stamp}
          </p>
        ) : null}
      </div>
    </details>
  );
}
