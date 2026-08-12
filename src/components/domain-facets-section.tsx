import Link from "next/link";
import { CircleDot, Link2 } from "lucide-react";
import type { GraphNode } from "@/app/context/GraphContext";
import { slugifyFacet } from "@/app/context/facets";
import { DomainRecordSection } from "@/components/domain-record-section";

export function DomainFacetsSection({
  node,
  onSelectNode,
}: {
  node: GraphNode;
  onSelectNode: (id: string) => void;
}) {
  if (!node.facets.length) return null;

  return (
    <DomainRecordSection
      className="mt-7 bg-background/50 shadow-none"
      count={`${node.facets.length} facets`}
      headingLevel={3}
      icon={CircleDot}
      id="facets"
      title="Facets"
    >
      <p className="max-w-3xl text-sm font-medium leading-6 text-foreground/70">
        Declared subdomains and interfaces that bound this record. Expand only
        when you need the detailed scope, evidence, and product posture of each
        facet.
      </p>
      <ol className="mt-6 divide-y divide-border/40 rounded-sm border border-border bg-card">
        {node.facets.map((facetName, index) => {
          const facetSlug = slugifyFacet(facetName);
          const facetRecord = node.facetRecords?.find(
            (record) => record.id === `facet-${node.id}-${facetSlug}`,
          );
          const description = facetRecord?.definition ?? facetRecord?.summary;
          const targetOptions = facetRecord?.targetOptions ?? [];
          const evidenceRefs = facetRecord?.evidenceRefs ?? [];

          return (
            <li
              className="scroll-mt-40 p-5 transition-colors hover:bg-muted/30 sm:p-6"
              id={facetSlug}
              key={facetName}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
                <span className="mt-1.5 shrink-0 font-mono text-[11px] font-semibold text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <h4 className="font-serif text-xl font-semibold text-foreground/90">
                      <a
                        className="group inline-flex min-h-11 items-center gap-2"
                        href={`#${facetSlug}`}
                      >
                        {facetName}
                        <Link2
                          aria-hidden="true"
                          className="h-4 w-4 text-muted-foreground opacity-55 transition-opacity group-hover:opacity-100"
                        />
                      </a>
                    </h4>
                    {facetRecord?.stage ? (
                      <span className="rounded-sm border border-border bg-background px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-foreground/70">
                        {facetRecord.stage.replace("-", " ")}
                      </span>
                    ) : null}
                  </div>
                  {description ? (
                    <div className="mt-2 space-y-3">
                      {description.split("\n\n").map((paragraph, paragraphIndex) => (
                        <p
                          className="text-[15px] font-medium leading-6 text-foreground/75"
                          key={`${facetSlug}-${paragraphIndex}`}
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ) : null}
                  <p className="mt-4 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {facetRecord?.belonging ??
                      `Declared facet of ${node.label}`}
                  </p>
                  {targetOptions.length ? (
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        Related {targetOptions.length === 1 ? "domain" : "domains"}
                      </span>
                      {targetOptions.map((target) => (
                        <Link
                          className="inline-flex min-h-11 items-center rounded-sm border border-border bg-background px-3 text-sm font-semibold transition-colors hover:bg-muted"
                          href={target.recordHref}
                          key={target.id}
                          onClick={() => onSelectNode(target.id)}
                        >
                          {target.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-border/40 pt-4 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                    <span>
                      Evidence ·{" "}
                      {evidenceRefs.length
                        ? `${evidenceRefs.length} linked`
                        : "not linked"}
                    </span>
                    <span>
                      Product ·{" "}
                      {facetRecord?.productStage?.replace("-", " ") ??
                        "research-led"}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </DomainRecordSection>
  );
}
