import { CircleDot } from "lucide-react";

type ProjectionSource = {
  id?: string;
  schemaVersion?: string;
  status?: string;
  label?: string;
  href?: string;
  kind?: "named-internal" | "external" | "internal";
};

export function ProjectionProvenance({
  boundary,
  source,
}: {
  boundary: string;
  source: ProjectionSource;
}) {
  const isPublicReference =
    Boolean(source.label) &&
    (source.kind === "named-internal" || source.kind === "external");

  // Generic projection ids, schemas, hashes, migration records, and internal
  // working documents remain part of provenance without becoming repeated
  // reader-facing citations. Named documents and external referents may opt in.
  if (!isPublicReference) return null;

  return (
    <aside
      aria-label="Content provenance"
      className="border-y border-border bg-card/55 px-5 py-4 sm:px-8"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 text-xs leading-6 text-foreground-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="flex max-w-4xl items-start gap-2">
          <CircleDot
            aria-hidden="true"
            className="mt-1 h-3.5 w-3.5 shrink-0"
          />
          <span>{boundary}</span>
        </p>
        {source.href ? (
          <a
            className="shrink-0 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] underline decoration-border underline-offset-4 hover:decoration-foreground"
            href={source.href}
            rel={source.kind === "external" ? "noreferrer" : undefined}
            target={source.kind === "external" ? "_blank" : undefined}
          >
            {source.label}
          </a>
        ) : (
          <p className="shrink-0 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
            {source.label}
          </p>
        )}
      </div>
    </aside>
  );
}
