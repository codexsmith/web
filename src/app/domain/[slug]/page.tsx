"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Network } from "lucide-react";
import { useGraph } from "../../context/GraphContext";
import { DomainFacetsSection } from "@/components/domain-facets-section";
import { DomainRecordJumpNav } from "@/components/domain-record-jump-nav";
import { DomainRecordSection } from "@/components/domain-record-section";
import { DomainTopologyPlot } from "@/components/domain-topology-plot";
import { EntranceArrivalBar } from "@/components/entrance/EntranceArrivalBar";
import { EvidenceVitalsBar } from "@/components/evidence-vitals-bar";
import { NodeDetailSections } from "@/components/node-detail-sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  DOMAIN_ARCHITECTURE_STAGES,
  architectureStageFor,
  nodesInArchitectureStage,
} from "@/lib/domain-architecture";
import {
  buildDomainRecordNavigation,
  DOMAIN_RECORD_FIELD_DEFINITIONS,
} from "@/lib/domain-record-navigation";
import {
  claimEvidenceVitals,
  EVIDENCE_SNAPSHOT_STAMP,
} from "@/lib/evidence-vitals";
import {
  ATLAS_LIST_HREF,
  DOMAINS_HREF,
  architectureListHref,
  domainHref,
  resolveArchitectureReturnHref,
} from "@/lib/site-navigation";

function hasContent(value: unknown): boolean {
  if (Array.isArray(value)) return value.length > 0;
  if (value && typeof value === "object") return Object.keys(value).length > 0;
  return value !== null && value !== undefined && value !== "";
}

export default function DomainPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { nodes, setActiveNodeId } = useGraph();
  const routeValue = typeof params?.slug === "string" ? params.slug : "";

  const node = useMemo(
    () => nodes.find((candidate) => candidate.id === routeValue) ?? null,
    [nodes, routeValue],
  );
  const architectureStage = architectureStageFor(node?.architectureStage);
  const stageNodes = node?.architectureStage
    ? nodesInArchitectureStage(nodes, node.architectureStage)
    : [];
  const architectureIndex = node
    ? stageNodes.findIndex((candidate) => candidate.id === node.id)
    : -1;
  const previousArchitectureNode =
    architectureIndex > 0 ? stageNodes[architectureIndex - 1] : null;
  const nextArchitectureNode =
    architectureIndex >= 0 && architectureIndex < stageNodes.length - 1
      ? stageNodes[architectureIndex + 1]
      : null;
  const requestedReturnHref = searchParams.get("returnTo");
  const architectureHref = node?.architectureStage
    ? resolveArchitectureReturnHref(
        requestedReturnHref,
        node.architectureStage,
        node.id,
      )
    : DOMAINS_HREF;
  const architectureBasePath = architectureHref.startsWith(ATLAS_LIST_HREF)
    ? ATLAS_LIST_HREF
    : DOMAINS_HREF;
  const availableRecordFields = node
    ? DOMAIN_RECORD_FIELD_DEFINITIONS.filter(({ field }) =>
        hasContent(node[field]),
      )
    : [];
  const hasClaimEvidenceSurface = availableRecordFields.some(
    ({ field }) => field === "claims" || field === "documents",
  );
  const validNodeIds = new Set(nodes.map((candidate) => candidate.id));
  const relationshipCount =
    node?.relationRecords?.filter(
      (record) => record.targetId && validNodeIds.has(record.targetId),
    ).length ?? 0;
  const hasRelationships = relationshipCount > 0;
  const claimEvidenceIntroductionField = availableRecordFields.some(
    ({ field }) => field === "claims",
  )
    ? "claims"
    : availableRecordFields.some(({ field }) => field === "documents")
      ? "documents"
      : null;

  const tocItems = node
    ? buildDomainRecordNavigation({
        hasArchitectureStage: Boolean(architectureStage),
        hasRelationships,
        hasTakeaways: node.takeaways.length > 0,
        recordFields: availableRecordFields.map(({ id, label }) => ({
          id,
          label,
        })),
      })
    : [];

  useEffect(() => {
    if (node) {
      setActiveNodeId(node.id);
      document.title = `${node.title} · Boundary First Labs`;
    }
  }, [node, setActiveNodeId]);

  if (!node) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
        <div className="w-full max-w-xl rounded-sm border border-border bg-card p-8 shadow-sm">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground/70">
            Domain not found
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold">
            This domain is not in the active graph.
          </h1>
          <Link
            className="mt-7 inline-flex min-h-12 items-center rounded-sm bg-primary px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-foreground"
            href={DOMAINS_HREF}
          >
            Browse domains
          </Link>
        </div>
      </main>
    );
  }

  const NodeIcon = node.icon;
  const architectureStageNumber = architectureStage
    ? DOMAIN_ARCHITECTURE_STAGES.findIndex(
        (stage) => stage.id === architectureStage.id,
      ) + 1
    : 0;
  const claimEvidenceIntroductions =
    hasClaimEvidenceSurface && claimEvidenceIntroductionField
      ? {
          [claimEvidenceIntroductionField]: (
            <div className="scroll-mt-40" id="claim-evidence">
              <EvidenceVitalsBar
                description="Corpus-wide context for reading this domain's claims and evidence links; the figures do not verify this record by association."
                items={claimEvidenceVitals}
                layout="stacked"
                stamp={EVIDENCE_SNAPSHOT_STAMP}
                title="Current claim-evidence context"
              />
            </div>
          ),
        }
      : undefined;

  return (
    <main className="min-h-screen bg-background text-foreground [text-rendering:optimizeLegibility]">
      <SiteHeader />
      <EntranceArrivalBar />
      <div className="mx-auto max-w-[90rem] px-5 pb-16 pt-8 sm:px-8 sm:pb-24 sm:pt-10">
        <header className="mb-6 border-b border-border pb-7">
          <div className="flex items-start gap-4">
            <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-card">
              <NodeIcon aria-hidden="true" className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Research domain
                {architectureStage
                  ? ` · Stage ${String(architectureStageNumber).padStart(2, "0")} of ${String(DOMAIN_ARCHITECTURE_STAGES.length).padStart(2, "0")} · ${architectureStage.title}`
                  : ""}
              </p>
              <h1 className="mt-2 font-serif text-4xl font-semibold leading-tight [overflow-wrap:anywhere] sm:text-5xl">
                {node.label}
              </h1>
              <p className="mt-3 max-w-4xl text-base font-medium leading-7 text-foreground/72 sm:text-lg sm:leading-8">
                {node.short}
              </p>
            </div>
          </div>
        </header>

        <DomainRecordJumpNav items={tocItems} />

        <div
          className={`grid gap-8 lg:items-start ${
            node.coreThesis
              ? "lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[22rem_minmax(0,1fr)] xl:gap-16"
              : ""
          }`}
        >
          {node.coreThesis ? (
            <aside
              aria-label="Domain thesis"
              className="order-1 lg:sticky lg:top-40 lg:max-h-[calc(100vh-11rem)] lg:self-start lg:overflow-y-auto lg:overscroll-contain lg:pr-2 [scrollbar-width:thin]"
            >
              <DomainRecordSection
                id="core-thesis"
                initiallyOpen={true}
                title="Core Thesis"
              >
                <p className="text-[15px] font-medium leading-6 text-foreground/78">
                  {node.coreThesis}
                </p>
              </DomainRecordSection>
            </aside>
          ) : null}

          <article className="order-2 min-w-0">
            <DomainRecordSection
              id="overview"
              initiallyOpen={true}
              title="Overview"
            >
              <p className="text-lg font-medium leading-8 text-foreground/85 sm:text-xl sm:leading-9">
                {node.body}
              </p>
              <DomainFacetsSection
                node={node}
                onSelectNode={(id) => setActiveNodeId(id)}
              />
            </DomainRecordSection>

            {node.takeaways.length ? (
              <DomainRecordSection
                className="mt-4"
                count={`${Math.min(node.takeaways.length, 6)} insights`}
                icon={Network}
                id="takeaways"
                title="Takeaways"
              >
                <ol className="grid gap-4 sm:grid-cols-2">
                  {node.takeaways.slice(0, 6).map((takeaway, index) => (
                    <li
                      className="rounded-sm border border-border bg-background p-5"
                      key={`${takeaway}-${index}`}
                    >
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground/65">
                        Insight {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="mt-3 text-[15px] font-medium leading-6 text-foreground/85">
                        {takeaway}
                      </p>
                    </li>
                  ))}
                </ol>
              </DomainRecordSection>
            ) : null}

            {hasRelationships ? (
              <DomainRecordSection
                className="mt-4"
                count={`${relationshipCount} relations`}
                id="relationships"
                title="Relations"
              >
                <DomainTopologyPlot
                  node={node}
                  nodes={nodes}
                  onSelectNode={(id) => {
                    setActiveNodeId(id);
                    router.push(domainHref(id));
                  }}
                />
              </DomainRecordSection>
            ) : null}

            {architectureStage ? (
              <DomainRecordSection
                className="mt-4"
                id="placement"
                title={`Placement: ${architectureStage.title}`}
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="max-w-3xl">
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      Stage {String(architectureStageNumber).padStart(2, "0")} of{" "}
                      {String(DOMAIN_ARCHITECTURE_STAGES.length).padStart(
                        2,
                        "0",
                      )}{" "}
                      · {architectureStage.title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-foreground/68">
                      {architectureStage.description}
                    </p>
                  </div>
                  <Link
                    className="inline-flex min-h-11 shrink-0 items-center font-mono text-[10px] font-semibold uppercase tracking-[0.12em] hover:underline"
                    href={architectureHref}
                  >
                    View this stage
                  </Link>
                </div>
              </DomainRecordSection>
            ) : null}

            <div className="mt-4">
              <NodeDetailSections
                fieldIntroductions={claimEvidenceIntroductions}
                fieldLabels={Object.fromEntries(
                  availableRecordFields.map(({ field, label }) => [
                    field,
                    label,
                  ]),
                )}
                fields={availableRecordFields.map(({ field }) => field)}
                hideMetadata={true}
                node={node}
                nodes={nodes}
                onSelectNode={(id) => {
                  setActiveNodeId(id);
                  router.push(domainHref(id));
                }}
                sectionIds={Object.fromEntries(
                  availableRecordFields.map(({ field, id }) => [field, id]),
                )}
              />
            </div>

            {architectureStage &&
            (previousArchitectureNode || nextArchitectureNode) ? (
              <nav
                aria-label="Adjacent records in this stage"
                className="mt-14 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row"
              >
                {previousArchitectureNode ? (
                  <Link
                    className="min-h-20 flex-1 border border-border bg-card p-4 transition-colors hover:bg-muted"
                    href={domainHref(
                      previousArchitectureNode.id,
                      architectureListHref(
                        architectureBasePath,
                        "",
                        previousArchitectureNode.architectureStage ??
                          architectureStage.id,
                        previousArchitectureNode.id,
                      ),
                    )}
                  >
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      Previous in stage
                    </span>
                    <span className="mt-1 block text-sm font-semibold">
                      {previousArchitectureNode.label}
                    </span>
                  </Link>
                ) : null}
                {nextArchitectureNode ? (
                  <Link
                    className="min-h-20 flex-1 border border-border bg-card p-4 text-left transition-colors hover:bg-muted sm:text-right"
                    href={domainHref(
                      nextArchitectureNode.id,
                      architectureListHref(
                        architectureBasePath,
                        "",
                        nextArchitectureNode.architectureStage ??
                          architectureStage.id,
                        nextArchitectureNode.id,
                      ),
                    )}
                  >
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      Next in stage
                    </span>
                    <span className="mt-1 block text-sm font-semibold">
                      {nextArchitectureNode.label}
                    </span>
                  </Link>
                ) : null}
              </nav>
            ) : null}
          </article>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
