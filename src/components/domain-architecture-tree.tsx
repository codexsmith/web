import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  ChevronDown,
  Globe2,
  Network,
  Search as SearchIcon,
} from "lucide-react";
import type { GraphNode } from "@/app/context/GraphContext";
import { paletteForNode } from "@/lib/map-semantics";
import {
  DOMAIN_ARCHITECTURE_STAGES,
  filterArchitectureNodes,
  isArchitectureStageId,
  nodesInArchitectureStage,
} from "@/lib/domain-architecture";
import {
  ATLAS_HREF,
  DOMAINS_HREF,
  RELATIONS_HREF,
  architectureListHref,
  domainHref,
  type ArchitectureListPath,
} from "@/lib/site-navigation";
import { PublicRecordContent } from "./public-record-content";

type DomainArchitectureTreeProps = {
  nodes: GraphNode[];
  onExploreNode: (id: string) => void;
  className?: string;
  basePath?: ArchitectureListPath;
  defaultOpenAll?: boolean;
};

const architectureLensLabels: Record<string, string> = {
  foundations: "Foundations",
  processes: "Processes",
  programs: "Programs",
  applications: "Applications",
  evidence: "Evidence",
};

function sentenceCase(value: unknown): string {
  if (typeof value !== "string" || !value.trim()) return "Domain";
  const normalized = value.replace(/[-_]+/g, " ").trim();
  return `${normalized.charAt(0).toUpperCase()}${normalized.slice(1)}`;
}

export function DomainArchitectureTree({
  nodes,
  onExploreNode,
  className = "",
  basePath = DOMAINS_HREF,
  defaultOpenAll = false,
}: DomainArchitectureTreeProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const stages = searchParams.getAll("stage");
  const openStages = new Set(
    stages.length > 0
      ? stages
      : defaultOpenAll
        ? DOMAIN_ARCHITECTURE_STAGES.map((stage) => stage.id)
        : ["foundations"],
  );
  const selectedNodeId = searchParams.get("node");
  const query = searchParams.get("q")?.trim() ?? "";
  const requestedStageFilter = searchParams.get("filter");
  const stageFilter = isArchitectureStageId(requestedStageFilter)
    ? requestedStageFilter ?? ""
    : "";
  const lastScrolledNode = React.useRef<string | null>(null);
  const searchContainerRef = React.useRef<HTMLDivElement | null>(null);
  const searchInputRef = React.useRef<HTMLInputElement | null>(null);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const hasActiveFilters = Boolean(query || stageFilter);
  const filteredNodes = filterArchitectureNodes(nodes, {
    query,
    stageId: stageFilter,
  });
  const filteredNodeIds = new Set(filteredNodes.map((node) => node.id));

  const architectureLensHref = (stageId: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("filter");
    params.delete("stage");
    params.delete("node");

    if (stageId) {
      params.set("filter", stageId);
      params.append("stage", stageId);
    }

    const queryString = params.toString();
    return queryString ? `${basePath}?${queryString}` : basePath;
  };

  React.useEffect(() => {
    if (!selectedNodeId || lastScrolledNode.current === selectedNodeId) return;
    const target = document.getElementById(`domain-${selectedNodeId}`);
    if (!target) return;
    lastScrolledNode.current = selectedNodeId;
    window.requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      target
        .querySelector<HTMLAnchorElement>("a")
        ?.focus({ preventScroll: true });
    });
  }, [selectedNodeId]);

  React.useEffect(() => {
    if (!searchOpen) return;

    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !searchContainerRef.current?.contains(event.target)
      ) {
        setSearchOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
      }
    };
    const focusFrame = window.requestAnimationFrame(() => {
      searchInputRef.current?.focus();
    });

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [searchOpen]);

  const toggleStage = (stageId: string, e: React.MouseEvent) => {
    e.preventDefault();
    const newStages = new Set(openStages);

    if (newStages.has(stageId)) {
      newStages.delete(stageId);
    } else {
      newStages.clear();
      newStages.add(stageId);
    }

    const params = new URLSearchParams(searchParams.toString());
    params.delete("stage");
    newStages.forEach((s) => params.append("stage", s));
    const queryString = params.toString();
    router.replace(queryString ? `${basePath}?${queryString}` : basePath, {
      scroll: false,
    });
  };

  return (
    <div
      aria-label="Boundary First content architecture"
      className={`pb-12 ${className}`}
      role="region"
    >
      <nav
        aria-label="Browse research by stage"
        className="sticky top-16 z-30 mb-5 border-y border-border bg-card/95 shadow-sm backdrop-blur-xl sm:top-20"
      >
        <div className="grid w-full grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 gap-y-2 px-5 py-2 sm:px-8 lg:grid-cols-[8.5rem_minmax(0,1fr)_auto]">
          <div className="flex shrink-0 items-center lg:border-r lg:border-border/70 lg:pr-4">
            <span className="whitespace-nowrap font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground">
              Browse by stage
            </span>
          </div>

          <div className="order-3 col-span-2 min-w-0 lg:order-none lg:col-span-1">
            <div className="flex snap-x gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <Link
                aria-current={!stageFilter ? "page" : undefined}
                className={`inline-flex min-h-10 shrink-0 snap-start items-center rounded-full border px-4 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] transition-colors ${
                  !stageFilter
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-background text-foreground hover:bg-muted"
                }`}
                href={architectureLensHref(null)}
              >
                All stages
              </Link>
              {DOMAIN_ARCHITECTURE_STAGES.map((stage) => (
                <Link
                  aria-current={stageFilter === stage.id ? "page" : undefined}
                  className={`inline-flex min-h-10 shrink-0 snap-start items-center rounded-full border px-4 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] transition-colors ${
                    stageFilter === stage.id
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-background text-foreground hover:bg-muted"
                  }`}
                  href={architectureLensHref(stage.id)}
                  key={stage.id}
                >
                  {architectureLensLabels[stage.id] ?? stage.title}
                </Link>
              ))}
            </div>
          </div>

          <div
            className="relative order-2 ml-auto w-full min-w-0 justify-self-end lg:order-none lg:w-auto"
            ref={searchContainerRef}
          >
            <div
              aria-label="Atlas navigation and search"
              className="flex w-full max-w-full items-center gap-2 overflow-x-auto [scrollbar-width:none] lg:w-auto lg:max-w-none lg:overflow-visible [&::-webkit-scrollbar]:hidden"
              role="group"
            >
              <button
                aria-controls="domain-search-inline"
                aria-expanded={searchOpen}
                aria-label="Search records"
                className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground ${
                  searchOpen
                    ? "border-foreground bg-foreground text-background"
                    : query
                      ? "border-foreground bg-background text-foreground"
                      : "border-border bg-background text-foreground hover:bg-muted"
                }`}
                onClick={() => setSearchOpen((open) => !open)}
                type="button"
              >
                <SearchIcon aria-hidden="true" className="h-4 w-4" />
              </button>
              <Link
                aria-label="Global atlas"
                className="inline-flex min-h-10 min-w-10 items-center justify-center gap-2 rounded-full border border-border bg-background px-2 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-foreground transition-colors hover:bg-muted min-[360px]:min-w-[5.5rem] min-[360px]:px-3"
                href={ATLAS_HREF}
              >
                <Globe2 aria-hidden="true" className="h-3.5 w-3.5" />
                <span className="hidden min-[360px]:inline">Global</span>
              </Link>
              <Link
                aria-label="Open relation map"
                className="inline-flex min-h-10 min-w-10 items-center justify-center gap-2 rounded-full border border-border bg-background px-2 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-foreground transition-colors hover:bg-muted min-[360px]:min-w-[6.5rem] min-[360px]:px-3"
                href={RELATIONS_HREF}
              >
                <Network aria-hidden="true" className="h-3.5 w-3.5" />
                <span className="hidden min-[360px]:inline">Relation map</span>
              </Link>
            </div>

            {searchOpen && (
              <form
                action={basePath}
                aria-label="Search the domain architecture"
                className="absolute right-0 top-0 z-50 flex h-10 w-72 max-w-[calc(100vw-9rem)] rounded-full bg-background shadow-sm"
                id="domain-search-inline"
                method="get"
                onSubmit={() => setSearchOpen(false)}
                role="search"
              >
                {stages.map((stage) => (
                  <input key={stage} name="stage" type="hidden" value={stage} />
                ))}
                {stageFilter && (
                  <input name="filter" type="hidden" value={stageFilter} />
                )}
                <label className="block min-w-0 flex-1">
                  <span className="sr-only">
                    Search domain names, roles, descriptions, and facets
                  </span>
                  <input
                    className="h-10 w-full rounded-full border border-border bg-background py-2 pl-4 pr-11 text-sm font-medium text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                    defaultValue={query}
                    key={query}
                    name="q"
                    placeholder="Search records"
                    ref={searchInputRef}
                    type="search"
                  />
                </label>
                <button
                  aria-label="Submit record search"
                  className="absolute right-1 top-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90"
                  type="submit"
                >
                  <SearchIcon aria-hidden="true" className="h-3.5 w-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </nav>

      <div className="mx-auto min-w-0 w-full max-w-6xl px-4 sm:px-6 xl:px-8">
          {hasActiveFilters && filteredNodes.length === 0 && (
            <div className="mb-5 rounded-sm border border-dashed border-border bg-background p-6 text-center">
              <h2 className="font-serif text-xl font-semibold">
                No domains match this view.
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Clear or broaden the filters to return to the complete indexed
                architecture.
              </p>
            </div>
          )}

          <ol className="grid gap-3">
            {DOMAIN_ARCHITECTURE_STAGES.map((stage, stageIndex) => {
              const allStageNodes = nodesInArchitectureStage(nodes, stage.id);
              const stageNodes = hasActiveFilters
                ? allStageNodes.filter((node) => filteredNodeIds.has(node.id))
                : allStageNodes;

              if (hasActiveFilters && stageNodes.length === 0) return null;

              const isOpen = hasActiveFilters || openStages.has(stage.id);

              return (
                <li key={stage.id}>
                  <details
                    className="group overflow-hidden rounded-sm border border-border bg-card/55 shadow-sm"
                    id={`architecture-stage-${stage.id}`}
                    open={isOpen}
                  >
                    <summary
                      aria-disabled={hasActiveFilters || undefined}
                      onClick={(event) => {
                        if (hasActiveFilters) {
                          event.preventDefault();
                          return;
                        }
                        toggleStage(stage.id, event);
                      }}
                      className={`grid min-h-20 list-none grid-cols-[2.25rem_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground sm:grid-cols-[2.75rem_13rem_minmax(0,1fr)_auto] sm:gap-4 sm:px-5 ${
                        hasActiveFilters
                          ? "cursor-default"
                          : "cursor-pointer hover:bg-muted/60"
                      }`}
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-foreground bg-background font-mono text-[11px] font-bold text-foreground">
                        {String(stageIndex + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-foreground">
                          {stage.title}
                        </span>
                        <span className="mt-1 block text-xs text-muted-foreground sm:hidden">
                          {hasActiveFilters
                            ? `${stageNodes.length} of ${allStageNodes.length} branches`
                            : `${stageNodes.length} branches`}
                        </span>
                      </span>
                      <span className="hidden text-sm leading-6 text-muted-foreground sm:block">
                        {stage.description}
                      </span>
                      <span className="flex items-center gap-3">
                        <span className="hidden font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground md:inline">
                          {hasActiveFilters
                            ? `${stageNodes.length} of ${allStageNodes.length} branches`
                            : `${stageNodes.length} branches`}
                        </span>
                        <ChevronDown
                          aria-hidden="true"
                          className={`h-4 w-4 text-muted-foreground transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </span>
                    </summary>

                    {isOpen && (
                      <div className="border-t border-border bg-background/55 p-3 sm:p-4">
                        <div className="grid auto-rows-fr grid-cols-1 gap-2 min-[560px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                          {stageNodes.map((node) => {
                            const palette = paletteForNode(node);
                            return (
                              <article
                                className={`flex min-h-24 scroll-mt-28 flex-col overflow-hidden rounded-sm border bg-background ${
                                  selectedNodeId === node.id
                                    ? "border-foreground ring-2 ring-foreground/25"
                                    : "border-border"
                                }`}
                                id={`domain-${node.id}`}
                                key={node.id}
                                style={{
                                  borderLeftColor: palette.solid,
                                  borderLeftWidth: "4px",
                                }}
                              >
                                <Link
                                  aria-label={`Open ${node.label} content page`}
                                  className="group/link flex flex-1 items-start justify-between gap-3 px-3 py-3 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground"
                                  aria-current={
                                    selectedNodeId === node.id
                                      ? "location"
                                      : undefined
                                  }
                                  href={domainHref(
                                    node.id,
                                    architectureListHref(
                                      basePath,
                                      searchParams.toString(),
                                      stage.id,
                                      node.id,
                                    ),
                                  )}
                                >
                                  <span>
                                    <span className="block text-[13px] font-semibold leading-5 text-foreground">
                                      {node.label}
                                    </span>
                                    <span
                                      className="mt-1 block font-mono text-[10px] font-semibold uppercase leading-4 tracking-[0.08em]"
                                      style={{ color: palette.ink }}
                                    >
                                      {sentenceCase(node.role)}
                                    </span>
                                  </span>
                                  <ArrowRight
                                    aria-hidden="true"
                                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover/link:translate-x-0.5 group-hover/link:text-foreground"
                                  />
                                </Link>
                                <button
                                  aria-label={`View ${node.label} in the graph`}
                                  className="flex min-h-9 items-center gap-2 border-t border-border px-3 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground"
                                  onClick={() => onExploreNode(node.id)}
                                  type="button"
                                >
                                  <Network
                                    aria-hidden="true"
                                    className="h-3.5 w-3.5"
                                  />
                                  View graph relations
                                </button>
                              </article>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </details>
                </li>
              );
            })}
          </ol>
          {stageFilter === "evidence" && <PublicRecordContent />}
      </div>
    </div>
  );
}
