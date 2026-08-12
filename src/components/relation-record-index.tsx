import Link from "next/link";
import { ArrowRight, ChevronDown, FileText } from "lucide-react";
import graphNodesData from "@/app/context/graphNodes.json";
import {
  conventionalRelationGroups,
  relationLensHref,
  relationProjectionCount,
  RELATION_PROJECTIONS,
  type ConventionalRelationRecord,
  type RelationLensSurface,
  type RelationProjection,
  type RelationSourceNode,
} from "@/lib/relation-index";

export const relationSourceNodes = graphNodesData as RelationSourceNode[];

const projectionDescriptions: Record<RelationProjection, string> = {
  work: "Programs, projects, products, services, artifacts, and other bounded work records. Listing does not imply completion, publication, or product readiness.",
  evidence:
    "Claims, documents, tests, promotion stages, and evidence-bearing records.",
  lineage:
    "Historical, conceptual, and methodological context without inherited authority.",
  governance:
    "Authority, claim boundaries, decision gates, standing, correction, and closure.",
  collaboration:
    "Roles, modes, participation boundaries, rights, attribution, and shared-work conditions.",
};

const recordBoundaryFields = [
  { key: "authority", label: "Authority boundary" },
  { key: "evidence", label: "Evidence basis" },
  { key: "closure", label: "Closure rule" },
] as const;

type RecordBoundaryKey = (typeof recordBoundaryFields)[number]["key"];

function isGeneratedDuplicate(key: RecordBoundaryKey, value: string) {
  return (
    (key === "evidence" && /^canonical source path:/i.test(value)) ||
    (key === "authority" && /inclusion does not imply/i.test(value))
  );
}

function sharedRecordBoundaries(records: ConventionalRelationRecord[]) {
  if (records.length < 2) return [];

  return recordBoundaryFields.flatMap((field) => {
    const value = records[0][field.key]?.trim();
    if (
      !value ||
      isGeneratedDuplicate(field.key, value) ||
      !records.every((record) => record[field.key]?.trim() === value)
    ) {
      return [];
    }
    return [{ ...field, value }];
  });
}

export function RecordLensesNavigation({
  surface,
}: {
  surface: RelationLensSurface;
}) {
  const embedded = surface === "evidence";

  return (
    <nav
      aria-label="Record index lenses"
      className={`z-30 border-y border-border bg-card/95 shadow-sm backdrop-blur-xl ${
        embedded ? "relative" : "sticky top-16 sm:top-20"
      }`}
    >
      <div className="grid w-full items-center gap-2 px-5 py-2 sm:px-8 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-4">
        <span className="font-mono font-semibold uppercase text-foreground lg:border-r lg:border-border/70 lg:pr-4">
          <span className="block whitespace-nowrap text-[11px] tracking-[0.15em]">
            Record lenses
          </span>
          <span className="mt-0.5 block whitespace-nowrap text-[8px] tracking-[0.1em] text-foreground-muted">
            Counts show records
          </span>
        </span>
        <div className="min-w-0">
          <div className="grid grid-cols-2 gap-1.5 md:grid-cols-5">
            {RELATION_PROJECTIONS.map((projection) => {
              const count = relationProjectionCount(
                relationSourceNodes,
                projection,
              );
              const isCurrent = embedded && projection === "work";
              return (
                <Link
                  aria-current={isCurrent ? "location" : undefined}
                  aria-label={`${projection}, ${count} generated records`}
                  className={`inline-flex min-h-9 min-w-0 items-center justify-between gap-2 rounded-full border px-3 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] transition-colors last:col-span-2 md:last:col-span-1 ${
                    isCurrent
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-background text-foreground hover:bg-muted"
                  }`}
                  href={relationLensHref(projection, surface)}
                  key={projection}
                >
                  <span className="min-w-0 truncate capitalize">
                    {projection}
                  </span>
                  <span
                    className={`shrink-0 ${
                      isCurrent
                        ? "text-background/68"
                        : "text-foreground-muted"
                    }`}
                  >
                    {count}
                    <span className="sr-only"> records</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

function RelationRecordGroups({
  projection,
  contained = false,
}: {
  projection: RelationProjection;
  contained?: boolean;
}) {
  const groups = conventionalRelationGroups(relationSourceNodes, projection);
  const projectionRecords = groups.flatMap((group) => group.records);
  const projectionSharedBoundaries = sharedRecordBoundaries(projectionRecords);
  const projectionSharedKeys = new Set<RecordBoundaryKey>(
    projectionSharedBoundaries.map((field) => field.key),
  );

  return (
    <>
      {projectionSharedBoundaries.length > 0 && (
        <div
          className={`${
            contained ? "" : "mt-5"
          } border border-border bg-card px-3 py-3 sm:px-4`}
        >
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
            Shared by all {projection} records
          </p>
          <dl className="mt-2 grid gap-x-6 gap-y-2 text-[11px] leading-5 md:grid-cols-2">
            {projectionSharedBoundaries.map((field) => (
              <div key={field.key}>
                <dt className="font-semibold">{field.label}</dt>
                <dd className="mt-0.5 text-foreground/68">{field.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
      <div className="mt-5 grid gap-2 lg:grid-cols-2">
        {groups.map((group) => {
          const groupSharedBoundaries = sharedRecordBoundaries(
            group.records,
          ).filter((field) => !projectionSharedKeys.has(field.key));
          const sharedKeys = new Set<RecordBoundaryKey>([
            ...projectionSharedKeys,
            ...groupSharedBoundaries.map((field) => field.key),
          ]);

          return (
            <details
              className="group border border-border bg-card lg:open:col-span-2"
              key={`${projection}-${group.id}`}
            >
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground sm:px-4">
                <span className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span className="font-serif text-lg font-semibold leading-tight">
                    {group.label}
                  </span>
                  <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.1em] text-foreground-muted">
                    {group.records.length}{" "}
                    {group.records.length === 1 ? "record" : "records"}
                  </span>
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-foreground-muted transition-transform group-open:rotate-180"
                />
              </summary>
              <div className="border-t border-border">
                {groupSharedBoundaries.length > 0 && (
                  <div className="border-b border-border bg-background/55 px-3 py-3 sm:px-4">
                    <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                      Shared within this domain
                    </p>
                    <dl className="mt-2 grid gap-x-6 gap-y-2 text-[11px] leading-5 md:grid-cols-2">
                      {groupSharedBoundaries.map((field) => (
                        <div key={field.key}>
                          <dt className="font-semibold">{field.label}</dt>
                          <dd className="mt-0.5 text-foreground/68">
                            {field.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
                <div className="grid gap-2 p-3 sm:p-4 lg:grid-cols-2 xl:grid-cols-3">
                  {group.records.map((record) => {
                    const recordBoundaries = recordBoundaryFields.flatMap(
                      (field) => {
                        const value = record[field.key]?.trim();
                        const repeatsSummary = Boolean(
                          value && record.summary?.includes(value),
                        );
                        return value &&
                          !sharedKeys.has(field.key) &&
                          !isGeneratedDuplicate(field.key, value) &&
                          !repeatsSummary
                          ? [{ ...field, value }]
                          : [];
                      },
                    );

                    return (
                      <article
                        className="border border-border bg-background p-3"
                        key={record.id}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <FileText
                            aria-hidden="true"
                            className="mt-1 h-4 w-4 shrink-0 text-foreground-muted"
                          />
                          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-foreground-muted">
                            {record.status}
                          </span>
                        </div>
                        <h3 className="mt-2 font-serif text-lg font-semibold leading-snug">
                          {record.label}
                        </h3>
                        {record.summary && (
                          <p className="mt-1.5 text-xs leading-5 text-foreground-muted">
                            {record.summary}
                          </p>
                        )}
                        {recordBoundaries.length > 0 && (
                          <dl className="mt-3 grid gap-1.5 border-t border-border/70 pt-3 text-[11px] leading-5">
                            {recordBoundaries.map((field) => (
                              <div key={field.key}>
                                <dt className="font-semibold">{field.label}</dt>
                                <dd>{field.value}</dd>
                              </div>
                            ))}
                          </dl>
                        )}
                        <p className="mt-3 break-words border-t border-border/70 pt-3 font-mono text-[9px] leading-4 text-foreground-muted">
                          <span className="font-semibold uppercase tracking-[0.1em]">
                            Source
                          </span>{" "}
                          {record.provenance}
                        </p>
                        <Link
                          className="mt-2 inline-flex min-h-8 items-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em] hover:underline"
                          href={record.recordHref}
                        >
                          {record.actionLabel ?? "Open source record"}
                          <ArrowRight
                            aria-hidden="true"
                            className="ml-2 h-3.5 w-3.5"
                          />
                        </Link>
                      </article>
                    );
                  })}
                </div>
              </div>
            </details>
          );
        })}
      </div>
    </>
  );
}

export function RelationProjectionSection({
  projection,
  collapsible = false,
  defaultOpen = false,
}: {
  projection: RelationProjection;
  collapsible?: boolean;
  defaultOpen?: boolean;
}) {
  const groups = conventionalRelationGroups(relationSourceNodes, projection);
  const count = relationProjectionCount(relationSourceNodes, projection);

  return (
    <section
      className="scroll-mt-64 border-b border-border px-5 py-8 sm:px-8 sm:py-10 md:scroll-mt-48 lg:scroll-mt-40"
      id={projection}
    >
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
          {collapsible && "Primary evidence content · "}
          {count} records across {groups.length} domains
        </p>
        <h2 className="mt-2 font-serif text-3xl font-semibold capitalize sm:text-4xl">
          {projection}
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-foreground-muted">
          {projectionDescriptions[projection]}
        </p>

        {collapsible ? (
          <details
            className="group/work mt-5 overflow-hidden border border-border bg-background shadow-sm"
            open={defaultOpen}
          >
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 bg-card px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground sm:px-4">
              <span>
                <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.14em]">
                  Work records by domain
                </span>
                <span className="mt-0.5 block text-[11px] text-foreground-muted">
                  {count} records · {groups.length} domain groups
                </span>
              </span>
              <ChevronDown
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-foreground-muted transition-transform group-open/work:rotate-180"
              />
            </summary>
            <div className="border-t border-border p-3 sm:p-4">
              <RelationRecordGroups contained projection={projection} />
            </div>
          </details>
        ) : (
          <RelationRecordGroups projection={projection} />
        )}
      </div>
    </section>
  );
}

export function EvidenceWorkRecords() {
  return (
    <div className="mb-8 border-b border-border bg-card/20 sm:mb-10">
      <RecordLensesNavigation surface="evidence" />
      <RelationProjectionSection collapsible defaultOpen projection="work" />
    </div>
  );
}
