import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Hexagon,
  Box,
  Layers3,
  Diamond,
  Wrench,
  FlaskConical,
} from "lucide-react";
import { domainHref } from "@/lib/site-navigation";

export type WorkPortfolioItem = {
  sourceId: string;
  recommendedEntityType: string;
  recommendedClass: string;
  classificationConfidence?: string;
  portfolioStanding: string;
  recommendedLifecycleStage: string;
  recommendedOperatingState: string;
  migrationStatus?: string;
  sourceRef?: string;
  sourceData: {
    title: string;
    description: string;
    publicValue?: string[];
    relationships?: string[];
    [key: string]: unknown;
  };
};

export type SeedProject = {
  id: string;
  entityType: "project";
  title: string;
  summary: string;
  objective: string;
  projectType: string;
  portfolioStanding: string;
  operatingState: string;
  projectPhase: string;
  canonicalNodeRefs: string[];
  sourceRefs: string[];
  producesEntityRefs: string[];
  advancesEntityRefs: string[];
  steward: string | null;
  visibility: string;
};

export type WorkAdjudication = {
  sourceId: string;
  decision: string;
  entityType: string;
  rationale: string;
};

const EntityIcons: Record<string, React.ElementType> = {
  product: Hexagon,
  project: Box,
  program: Layers3,
  artifact: Diamond,
  service: Wrench,
  testbed: FlaskConical,
};

function getEntityShapeClass(type: string) {
  switch (type.toLowerCase()) {
    case "product": return "border-l-4 border-l-primary";
    case "project": return "border-l-4 border-l-blue-500";
    case "program": return "rounded-lg border-l-4 border-l-purple-500";
    case "artifact": return "border-l-4 border-l-amber-500";
    case "service": return "border-l-4 border-l-emerald-500";
    case "testbed": return "border-l-4 border-dashed border-l-orange-500";
    default: return "border-l-4 border-l-muted-foreground";
  }
}

export function WorkCard({
  item,
  adjudication,
}: {
  item: WorkPortfolioItem;
  adjudication?: WorkAdjudication;
}) {
  const Icon = EntityIcons[item.recommendedEntityType.toLowerCase()] || Box;
  const shapeClass = getEntityShapeClass(item.recommendedEntityType);
  const sourceHref = domainHref("products-testbeds");

  const metaString = [
    item.portfolioStanding,
    item.recommendedLifecycleStage,
    item.recommendedOperatingState,
  ]
    .filter(Boolean)
    .map((s) => s.replace(/-/g, " ").toUpperCase())
    .join(" · ");

  return (
    <article className={`flex flex-col justify-between border border-border bg-card p-5 transition-colors hover:bg-muted/50 ${shapeClass}`}>
      <div>
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-foreground-muted" />
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-foreground-muted">
            Recommended {item.recommendedEntityType}
          </span>
        </div>
        <div className="mt-4">
          <h3 className="font-serif text-2xl font-semibold leading-tight">{item.sourceData.title}</h3>
          <p className="mt-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-foreground-muted">
            {metaString}
          </p>
        </div>
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-foreground-muted">
          {item.sourceData.description}
        </p>
        
        {item.sourceData.publicValue && item.sourceData.publicValue.length > 0 && (
          <div className="mt-4 border-t border-border/50 pt-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-foreground-muted">Value Proposition</p>
            <ul className="mt-2 list-inside list-disc text-sm text-foreground-muted">
              <li className="line-clamp-1">{item.sourceData.publicValue[0]}</li>
            </ul>
          </div>
        )}

        <Link
          className="group/link mt-5 inline-flex min-h-10 items-center font-mono text-[10px] font-semibold uppercase tracking-widest text-foreground-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
          href={sourceHref}
        >
          Open source domain
          <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>

      <details className="group mt-6 border-t border-border pt-4">
        <summary className="inline-flex min-h-9 cursor-pointer list-none items-center justify-center border border-border bg-background px-3 font-mono text-[10px] font-semibold uppercase tracking-widest transition-colors hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground">
          Inspect source details
        </summary>
        <dl className="mt-4 grid gap-3 text-sm leading-6">
          <div>
            <dt className="font-mono text-[10px] font-semibold uppercase tracking-widest text-foreground-muted">Adjudication</dt>
            <dd className="mt-1">
              {adjudication
                ? adjudication.decision.replace(/-/g, " ")
                : "Not recorded"}
            </dd>
            {adjudication && (
              <dd className="mt-1 text-foreground-muted">
                {adjudication.rationale}
              </dd>
            )}
          </div>
          <div>
            <dt className="font-mono text-[10px] font-semibold uppercase tracking-widest text-foreground-muted">Recommended class</dt>
            <dd className="mt-1">
              {item.recommendedClass.replace(/-/g, " ")}
              {item.classificationConfidence
                ? ` · ${item.classificationConfidence} confidence`
                : ""}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] font-semibold uppercase tracking-widest text-foreground-muted">Migration boundary</dt>
            <dd className="mt-1">{item.migrationStatus ?? "Source retained pending adjudication."}</dd>
          </div>
          {item.sourceRef && (
            <div>
              <dt className="font-mono text-[10px] font-semibold uppercase tracking-widest text-foreground-muted">Source record</dt>
              <dd className="mt-1 break-words font-mono text-xs">{item.sourceRef}</dd>
            </div>
          )}
          {item.sourceData.relationships && item.sourceData.relationships.length > 0 && (
            <div>
              <dt className="font-mono text-[10px] font-semibold uppercase tracking-widest text-foreground-muted">Declared relationships</dt>
              <dd className="mt-1">{item.sourceData.relationships.join(", ")}</dd>
            </div>
          )}
        </dl>
      </details>
    </article>
  );
}

export function ProjectCard({ project }: { project: SeedProject }) {
  const primaryContext =
    project.canonicalNodeRefs.find((nodeId) => nodeId !== "identity") ??
    project.canonicalNodeRefs[0];
  const contextHref = primaryContext
    ? domainHref(primaryContext)
    : "/work#projects";

  return (
    <article className="flex h-full min-w-0 flex-col border border-border bg-card p-5 [overflow-wrap:anywhere] sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
          <Box className="h-4 w-4" aria-hidden="true" />
          Seed project · {project.portfolioStanding}
        </span>
        <span className="border border-border bg-background px-2 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.12em]">
          {project.operatingState.replace(/-/g, " ")}
        </span>
      </div>
      <h3 className="mt-4 font-serif text-2xl font-semibold leading-tight">
        {project.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-foreground-muted">
        {project.summary}
      </p>
      <dl className="mt-5 grid min-w-0 grid-cols-[minmax(0,1fr)] gap-4 border-t border-border pt-4 text-sm leading-6 [&>div]:min-w-0 [&_dd]:min-w-0">
        <div>
          <dt className="font-mono text-[10px] font-semibold uppercase tracking-widest text-foreground-muted">Objective</dt>
          <dd className="mt-1">{project.objective}</dd>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="font-mono text-[10px] font-semibold uppercase tracking-widest text-foreground-muted">Phase</dt>
            <dd className="mt-1 capitalize">{project.projectPhase.replace(/-/g, " ")}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] font-semibold uppercase tracking-widest text-foreground-muted">Steward</dt>
            <dd className="mt-1">{project.steward ?? "Not recorded"}</dd>
          </div>
        </div>
        <div>
          <dt className="font-mono text-[10px] font-semibold uppercase tracking-widest text-foreground-muted">Outputs</dt>
          <dd className="mt-1">{project.producesEntityRefs.length > 0 ? project.producesEntityRefs.join(", ") : "No output records attached"}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] font-semibold uppercase tracking-widest text-foreground-muted">Canonical context</dt>
          <dd className="mt-1">{project.canonicalNodeRefs.join(", ")}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] font-semibold uppercase tracking-widest text-foreground-muted">Source records</dt>
          <dd className="mt-1 break-words font-mono text-xs">{project.sourceRefs.join(", ")}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] font-semibold uppercase tracking-widest text-foreground-muted">Next gate</dt>
          <dd className="mt-1">Not recorded in the seed; promotion remains pending review.</dd>
        </div>
      </dl>
      <Link
        className="group/link mt-auto inline-flex min-h-11 items-center border-t border-border pt-5 font-mono text-[10px] font-semibold uppercase tracking-widest text-foreground-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
        href={contextHref}
      >
        Open canonical context
        <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
      </Link>
    </article>
  );
}
