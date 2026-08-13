"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useGraph } from "../context/GraphContext";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Globe2, Hexagon, Network } from "lucide-react";
const InteractiveMap = dynamic(
  () =>
    import("@/components/interactive-map").then((mod) => mod.InteractiveMap),
  { ssr: false },
);
import { SiteHeader } from "@/components/site-header";
import { AtlasViewSwitch } from "@/components/atlas-view-switch";
import {
  buildContextHaloEntities,
  buildFacetHaloEntity,
  ContextHalo,
  SemanticMapLegend,
  type HaloEntity,
} from "@/components/context-halo";
import {
  isCanonicalLineageNode,
  projectionMatchesNode,
  type MapProjection,
} from "@/lib/map-semantics";
import {
  ATLAS_OVERVIEW_NODE_ID,
  parseMapState,
  serializeMapState,
  type MapMode,
} from "@/lib/map-state";
import {
  atlasHierarchyBinding,
  atlasHierarchyBranchForNode,
  atlasHierarchyBranches,
  atlasTheoryRootId,
} from "@/lib/atlas-hierarchy";
import { slugifyFacet } from "@/app/context/facets";
import { atlasListHref } from "@/lib/site-navigation";

const projections = [
  { id: "domains", label: "Structure" },
  { id: "work", label: "Work" },
  { id: "evidence", label: "Evidence" },
  { id: "lineage", label: "Lineage" },
  { id: "governance", label: "Governance" },
  { id: "collaboration", label: "Collaboration" },
] as const;
const globalAtlasProjections = projections;

type ProjectionId = MapProjection;

export default function BoundaryFirstConnectedPrototype() {
  const router = useRouter();
  const { nodes, activeNodeId, setActiveNodeId } = useGraph();
  const [mapMode, setMapMode] = useState<MapMode>("atlas");
  const [projection, setProjection] = useState<ProjectionId>("domains");
  const [inspectedRelation, setSelectedRelation] = useState<HaloEntity | null>(
    null,
  );
  const [urlRelationId, setUrlRelationId] = useState<string | null>(null);

  const active = useMemo(
    () =>
      nodes.find((node) => node.id === activeNodeId) ??
      nodes.find((n) => n.id === "identity"),
    [activeNodeId, nodes],
  );

  useEffect(() => {
    document.title =
      active && mapMode !== "atlas"
        ? `${active.title} · Boundary First Labs`
        : "Research Atlas · Boundary First Labs";
  }, [active, mapMode]);

  const theoryRoot = nodes.find((node) => node.id === atlasTheoryRootId);

  const commitMapState = useCallback(
    (
      next: {
        projection: ProjectionId;
        mode: MapMode;
        nodeId: string | null;
        relationId?: string | null;
      },
      history: "push" | "replace" = "push",
    ) => {
      const href = serializeMapState(
        {
          projection: next.projection,
          mode: next.mode,
          nodeId: next.nodeId ?? ATLAS_OVERVIEW_NODE_ID,
          relationId: next.relationId ?? null,
        },
        window.location.href,
      );
      if (history === "replace") {
        window.history.replaceState(window.history.state, "", href);
      } else {
        window.history.pushState(window.history.state, "", href);
      }
    },
    [],
  );

  useEffect(() => {
    function restoreMapState() {
      const params = new URLSearchParams(window.location.search);
      const state = parseMapState(params, (id) =>
        nodes.some((node) => node.id === id),
      );

      if (state.mode === "focus" && state.nodeId === ATLAS_OVERVIEW_NODE_ID) {
        router.replace("/domains");
        return;
      }

      setProjection(state.projection);
      setActiveNodeId(state.nodeId);
      setMapMode(state.mode);
      setUrlRelationId(state.relationId);
      setSelectedRelation(null);

      const requestedProjection = params.get("view");
      const requestedMode = params.get("mode");
      const requestedNode = params.get("node");
      const requestedRelation = params.get("relation");

      if (
        requestedProjection !== state.projection ||
        requestedMode !== state.mode ||
        requestedNode !== state.nodeId ||
        requestedRelation !== state.relationId
      ) {
        const href = serializeMapState(state, window.location.href);
        window.history.replaceState(window.history.state, "", href);
      }
    }

    restoreMapState();
    window.addEventListener("popstate", restoreMapState);
    return () => window.removeEventListener("popstate", restoreMapState);
  }, [nodes, router, setActiveNodeId]);

  const resolvedRelation = useMemo(() => {
    if (inspectedRelation) return inspectedRelation;
    if (!urlRelationId || !active) return null;
    if (urlRelationId.startsWith(`facet-${active.id}-`)) {
      const facet = active.facets.find(
        (candidate) =>
          `facet-${active.id}-${candidate
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "")}` === urlRelationId,
      );
      if (facet) return buildFacetHaloEntity(active, facet);
    }
    const entities = buildContextHaloEntities(active, nodes, projection);
    return (
      [
        ...entities.facetEntities,
        ...entities.closeEntities,
        ...entities.horizonEntities,
      ].find((entity) => entity.id === urlRelationId) ?? null
    );
  }, [active, nodes, projection, inspectedRelation, urlRelationId]);
  const selectedRelation = resolvedRelation;
  const isAtlasNodeSelected =
    mapMode === "atlas" &&
    Boolean(active) &&
    activeNodeId !== ATLAS_OVERVIEW_NODE_ID;
  const isCompactFocus = mapMode === "focus" && !selectedRelation;
  const isFacetFocusSelection =
    mapMode === "focus" && selectedRelation?.kind === "facet";
  const selectedFacetIndex =
    active && selectedRelation?.kind === "facet"
      ? active.facets.findIndex(
          (facet) =>
            `facet-${active.id}-${slugifyFacet(facet)}` === selectedRelation.id,
        )
      : -1;
  const progressLabel = isAtlasNodeSelected
    ? `${active?.facets.length ?? 0} facets`
    : mapMode === "atlas"
      ? `${atlasHierarchyBranches.length} branches`
      : isFacetFocusSelection
        ? `Facet ${selectedFacetIndex + 1} of ${active?.facets.length ?? 0}`
        : selectedRelation
          ? "Selected relation"
          : mapMode === "halo"
            ? "Relation context"
            : `${active?.facets.length ?? 0} facets`;

  const projectionContent = useMemo(() => {
    if (selectedRelation) {
      return {
        eyebrow: `${selectedRelation.relationType} · ${selectedRelation.status}`,
        summary: selectedRelation.summary,
        items: [
          `Claim boundary · ${selectedRelation.authority}`,
          `Evidence · ${selectedRelation.evidence}`,
          `Closure · ${selectedRelation.closure}`,
        ],
        href: (() => {
          if (selectedRelation.recordHref) return selectedRelation.recordHref;
          if (selectedRelation.sourceId)
            return `/domain/${selectedRelation.sourceId}`;
          if (active) return `/domain/${active.id}`;
          return "/search";
        })(),
        action:
          selectedRelation.actionLabel ??
          (selectedRelation.sourceId
            ? "Open related record"
            : "Open selected record"),
      };
    }

    const projectionAnchor = isAtlasNodeSelected ? active : theoryRoot;
    const activeProjectionEntities =
      projectionAnchor && projection !== "domains"
        ? buildContextHaloEntities(projectionAnchor, nodes, projection)
            .closeEntities
        : [];
    const projectionItems =
      mapMode === "atlas"
        ? nodes
            .filter((node) =>
              projection === "lineage"
                ? isCanonicalLineageNode(node)
                : projectionMatchesNode(node, projection),
            )
            .map((node) => node.label)
        : activeProjectionEntities.map((entity) => entity.label);
    const activeLabel = projectionAnchor?.label ?? "the selected domain";

    if (projection === "work") {
      return {
        eyebrow: "Work lens",
        summary: `Programs, projects, products, services, and testbeds attached to ${activeLabel} remain distinct as they move from inquiry into public use.`,
        items: projectionItems,
        href: isAtlasNodeSelected && active ? `/domain/${active.id}` : "/work",
        action: isAtlasNodeSelected
          ? "Open domain work record"
          : "Browse work and evidence",
      };
    }
    if (projection === "evidence") {
      return {
        eyebrow: "Evidence lens",
        summary: `${activeLabel} advances through claim statements, source references, review, and evidence proportionate to consequence.`,
        items: projectionItems,
        href: isAtlasNodeSelected && active ? `/domain/${active.id}` : "/work",
        action: isAtlasNodeSelected
          ? "Open evidence source"
          : "Browse work and evidence",
      };
    }
    if (projection === "lineage") {
      return {
        eyebrow: "Lineage lens",
        summary:
          mapMode === "atlas"
            ? "Canonical academic foundations in formal grammar, mathematics, physics, computation, and applied computer science are highlighted as context and constraint—not borrowed authority."
            : `The recorded history and conceptual neighbors of ${activeLabel} provide context without implying endorsement, equivalence, succession, or validation.`,
        items: projectionItems,
        href:
          isAtlasNodeSelected && active ? `/domain/${active.id}` : "/domains",
        action: isAtlasNodeSelected
          ? "Open lineage source"
          : "Browse lineage records",
      };
    }
    if (projection === "governance") {
      return {
        eyebrow: "Governance lens",
        summary: `Inspect how claim authority, evidence gates, stewardship, correction, withdrawal, and retirement attach specifically to ${activeLabel}.`,
        items: projectionItems,
        href: isAtlasNodeSelected && active ? `/domain/${active.id}` : "/about",
        action: isAtlasNodeSelected
          ? "Open governance source"
          : "Open governance context",
      };
    }
    if (projection === "collaboration") {
      return {
        eyebrow: "Collaboration lens",
        summary: `Relevant pathways for contributing to ${activeLabel}, each bounded by declared roles, authority, evidence, stewardship, and closure.`,
        items: projectionItems,
        href: "/collaborate",
        action: "Open collaboration path",
      };
    }
    const selectedAtlasBranch =
      isAtlasNodeSelected && active
        ? atlasHierarchyBranchForNode(active.id)
        : null;
    const contentNode =
      mapMode === "atlas"
        ? isAtlasNodeSelected
          ? active
          : theoryRoot
        : active;
    const modeSummary =
      mapMode === "atlas"
        ? isAtlasNodeSelected
          ? active?.id === atlasTheoryRootId
            ? atlasHierarchyBinding.bindingProtocol.invariant
            : selectedAtlasBranch
              ? `${active?.label} sits within ${selectedAtlasBranch.label}. ${selectedAtlasBranch.description}`
              : active?.short ?? ""
          : atlasHierarchyBinding.projection.introduction
        : mapMode === "halo"
          ? active?.short ?? ""
          : `A deliberately bounded view of ${
              active?.label ?? "the selected domain"
            }: its facets and immediate internal structure. Open Relation context when you need surrounding domains or semantic lenses.`;
    return {
      eyebrow:
        mapMode === "atlas"
          ? isAtlasNodeSelected
            ? selectedAtlasBranch?.label ?? "Theoretical root"
            : atlasHierarchyBinding.projection.eyebrow
          : mapMode === "halo"
            ? "Relation context"
            : "Domain focus",
      summary: modeSummary,
      items:
        mapMode === "atlas"
          ? isAtlasNodeSelected
            ? contentNode?.facets?.slice(0, 6) ?? []
            : atlasHierarchyBranches.map((branch) => branch.label)
          : contentNode?.facets?.slice(0, 6) ?? [],
      href:
        mapMode === "atlas"
          ? isAtlasNodeSelected && contentNode
            ? `/domain/${contentNode.id}`
            : "/domains"
          : contentNode
            ? `/domain/${contentNode.id}`
            : "/domains",
      action:
        mapMode === "atlas" && !isAtlasNodeSelected
          ? "Browse the domain tree"
          : "Read the full record",
    };
  }, [
    active,
    isAtlasNodeSelected,
    mapMode,
    nodes,
    projection,
    selectedRelation,
    theoryRoot,
  ]);

  function chooseProjection(nextProjection: ProjectionId) {
    if (mapMode === "focus") return;
    setProjection(nextProjection);
    setSelectedRelation(null);
    setUrlRelationId(null);
    commitMapState({
      projection: nextProjection,
      mode: mapMode,
      nodeId: activeNodeId ?? ATLAS_OVERVIEW_NODE_ID,
    });
  }

  function selectAtlasNode(id: string) {
    if (mapMode !== "atlas" || !nodes.some((node) => node.id === id)) return;
    setActiveNodeId(id);
    setSelectedRelation(null);
    setUrlRelationId(null);
    commitMapState({
      projection,
      mode: "atlas",
      nodeId: id,
    });

    window.requestAnimationFrame(() => {
      if (window.innerWidth >= 1280) return;
      const details = document.getElementById("map-selection-details");
      if (!details) return;
      const rect = details.getBoundingClientRect();
      if (rect.top >= window.innerHeight || rect.bottom <= 0) {
        details.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  function showFocusMap(
    id = activeNodeId === ATLAS_OVERVIEW_NODE_ID
      ? theoryRoot?.id ?? atlasTheoryRootId
      : activeNodeId ?? theoryRoot?.id ?? atlasTheoryRootId,
  ) {
    const preservedFacet =
      selectedRelation?.kind === "facet" && selectedRelation.sourceId === id
        ? selectedRelation
        : null;
    setActiveNodeId(id);
    setMapMode("focus");
    setProjection("domains");
    setSelectedRelation(preservedFacet);
    setUrlRelationId(preservedFacet?.id ?? null);
    commitMapState({
      projection: "domains",
      mode: "focus",
      nodeId: id,
      relationId: preservedFacet?.id ?? null,
    });
  }

  function showContextHalo(
    id = activeNodeId === ATLAS_OVERVIEW_NODE_ID
      ? theoryRoot?.id ?? atlasTheoryRootId
      : activeNodeId ?? theoryRoot?.id ?? atlasTheoryRootId,
  ) {
    const nextProjection = mapMode === "focus" ? "domains" : projection;
    const preservedFacet =
      selectedRelation?.kind === "facet" && selectedRelation.sourceId === id
        ? selectedRelation
        : null;
    setActiveNodeId(id);
    setMapMode("halo");
    setProjection(nextProjection);
    setSelectedRelation(preservedFacet);
    setUrlRelationId(preservedFacet?.id ?? null);
    commitMapState({
      projection: nextProjection,
      mode: "halo",
      nodeId: id,
      relationId: preservedFacet?.id ?? null,
    });
  }

  function clearFacetSelection() {
    if (!active) return;
    setSelectedRelation(null);
    setUrlRelationId(null);
    commitMapState({
      projection: "domains",
      mode: "focus",
      nodeId: active.id,
      relationId: null,
    });
  }

  function selectRelation(entity: HaloEntity) {
    setSelectedRelation(entity);
    setUrlRelationId(entity.id);
    commitMapState({
      projection,
      mode: mapMode,
      nodeId: activeNodeId ?? ATLAS_OVERVIEW_NODE_ID,
      relationId: entity.id,
    });
  }

  function clearRelation() {
    setSelectedRelation(null);
    setUrlRelationId(null);
    commitMapState({
      projection,
      mode: mapMode,
      nodeId: activeNodeId ?? ATLAS_OVERVIEW_NODE_ID,
      relationId: null,
    });
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader variant="minimal" />

      <div className="relative z-40">
        {mapMode === "focus" ? (
          <div className="flex flex-col border-b border-border bg-card md:min-h-14 md:flex-row md:items-center md:justify-between md:gap-3">
            <div className="flex items-center gap-3 px-4 py-2.5 sm:px-5 md:min-w-0 md:px-6">
              <button
                aria-label="Back to the full research atlas"
                className="shrink-0 rounded-sm border border-border bg-background px-2.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={() => router.push("/map")}
                type="button"
              >
                Atlas
              </button>
              <span aria-hidden="true" className="text-foreground-muted">
                /
              </span>
              <span className="truncate font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
                {active?.label ?? "Domain"}
              </span>
            </div>
            <div className="min-w-0 border-t border-border md:border-l md:border-t-0">
              <div className="flex gap-1 overflow-x-auto px-4 py-2 sm:px-5 md:px-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {active?.facets.map((facet, index) => {
                  const facetId = `facet-${active.id}-${slugifyFacet(facet)}`;
                  const selected = selectedRelation?.id === facetId;
                  return (
                    <button
                      aria-pressed={selected}
                      className={`shrink-0 rounded-sm border px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.11em] transition-colors ${
                        selected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background hover:bg-muted"
                      }`}
                      key={facet}
                      onClick={() =>
                        selected
                          ? clearFacetSelection()
                          : selectRelation(buildFacetHaloEntity(active, facet))
                      }
                      type="button"
                    >
                      {String(index + 1).padStart(2, "0")} · {facet}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="border-b border-border bg-card">
            <div className="mx-auto flex max-w-[100rem] flex-col gap-3 px-4 py-3 sm:px-5 lg:flex-row lg:items-center lg:justify-between lg:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-background">
                  {mapMode === "atlas" ? (
                    <Globe2 className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Network className="h-4 w-4" aria-hidden="true" />
                  )}
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.13em] text-foreground-muted">
                    {mapMode === "atlas" ? "Research Atlas" : "Relation context"}
                  </p>
                  <p className="truncate text-xs font-medium leading-5 text-foreground-muted">
                    {mapMode === "atlas"
                      ? "One governed corpus, viewed spatially."
                      : active?.label ?? "Selected domain"}
                  </p>
                </div>
              </div>
              <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center lg:justify-end">
                <AtlasViewSwitch current="map" />
                <div className="flex min-w-0 gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {globalAtlasProjections.map((item) => (
                    <button
                      aria-pressed={item.id === projection}
                      className={`shrink-0 rounded-sm border px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.11em] transition-colors ${
                        item.id === projection
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background hover:bg-muted"
                      }`}
                      key={item.id}
                      onClick={() => chooseProjection(item.id)}
                      type="button"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="relative bg-background" id="atlas-map">
        <div
          className={`mx-auto grid max-w-[100rem] ${
            isCompactFocus
              ? "min-h-[calc(100svh-8rem)] grid-cols-1"
              : "min-h-[calc(100svh-8rem)] grid-cols-1 xl:grid-cols-[minmax(0,1.42fr)_minmax(22rem,0.58fr)]"
          }`}
        >
          <div className="relative min-h-[34rem] min-w-0 border-b border-border bg-card xl:border-b-0 xl:border-r">
            <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-3 border-b border-border/70 bg-background/92 px-4 py-2.5 backdrop-blur-sm sm:px-5">
              <div className="min-w-0">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.13em] text-foreground-muted">
                  {projectionContent.eyebrow}
                </p>
                <p className="mt-1 truncate text-xs font-medium text-foreground-muted">
                  {progressLabel}
                </p>
              </div>
              {mapMode !== "atlas" ? (
                <div className="flex shrink-0 gap-2">
                  {mapMode !== "focus" ? (
                    <button
                      className="inline-flex min-h-10 items-center rounded-sm border border-border bg-background px-3 font-mono text-[10px] font-semibold uppercase tracking-[0.11em] hover:bg-muted"
                      onClick={() => showFocusMap()}
                      type="button"
                    >
                      <Hexagon className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
                      Focus
                    </button>
                  ) : null}
                  {mapMode !== "halo" ? (
                    <button
                      className="inline-flex min-h-10 items-center rounded-sm border border-border bg-background px-3 font-mono text-[10px] font-semibold uppercase tracking-[0.11em] hover:bg-muted"
                      onClick={() => showContextHalo()}
                      type="button"
                    >
                      <Network className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
                      Relations
                    </button>
                  ) : null}
                </div>
              ) : null}
            </div>

            <div className="h-full min-h-[34rem] pt-[4.15rem]">
              {mapMode === "halo" && active ? (
                <ContextHalo
                  active={active}
                  className="h-full min-h-[30rem]"
                  nodes={nodes}
                  onSelectEntity={selectRelation}
                  projection={projection}
                  selectedEntityId={selectedRelation?.id ?? null}
                />
              ) : (
                <InteractiveMap
                  activeNodeId={activeNodeId}
                  className="h-full min-h-[30rem]"
                  isTruncated={mapMode === "focus"}
                  nodes={nodes}
                  onExploreDomain={mapMode === "atlas" ? selectAtlasNode : showFocusMap}
                  onInspectFacet={(facet, parentId) => {
                    const parent = nodes.find((node) => node.id === parentId);
                    if (!parent) return;
                    const entity = buildFacetHaloEntity(parent, facet);
                    setSelectedRelation(entity);
                    setUrlRelationId(entity.id);
                    setActiveNodeId(parentId);
                    setMapMode("focus");
                    setProjection("domains");
                    commitMapState({
                      projection: "domains",
                      mode: "focus",
                      nodeId: parentId,
                      relationId: entity.id,
                    });
                  }}
                  projection={projection}
                  selectedFacetId={
                    selectedRelation?.kind === "facet"
                      ? selectedRelation.id
                      : null
                  }
                  setActiveNodeId={setActiveNodeId}
                />
              )}
            </div>
          </div>

          {!isCompactFocus ? (
            <aside
              className="min-w-0 bg-background"
              id="map-selection-details"
            >
              <div className="sticky top-0 flex min-h-[34rem] flex-col p-5 sm:p-7 xl:top-20 xl:max-h-[calc(100svh-5rem)] xl:overflow-y-auto">
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground-muted">
                    {projectionContent.eyebrow}
                  </p>
                  <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight sm:text-4xl">
                    {selectedRelation?.label ??
                      (mapMode === "atlas" && !isAtlasNodeSelected
                        ? "Research Atlas"
                        : active?.label ?? "Research Atlas")}
                  </h1>
                  <p className="mt-5 text-sm leading-7 text-foreground-muted">
                    {projectionContent.summary}
                  </p>
                </div>

                {projectionContent.items.length > 0 ? (
                  <ul className="mt-7 grid gap-2 border-t border-border pt-5">
                    {projectionContent.items.slice(0, 8).map((item) => (
                      <li
                        className="flex gap-3 text-sm leading-6 text-foreground-muted"
                        key={item}
                      >
                        <span aria-hidden="true">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                <div className="mt-7 flex flex-wrap gap-2">
                  <Link
                    className="inline-flex min-h-11 items-center bg-primary px-4 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-foreground"
                    href={projectionContent.href}
                  >
                    {projectionContent.action}
                  </Link>
                  {selectedRelation ? (
                    <button
                      className="inline-flex min-h-11 items-center border border-border bg-background px-4 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] hover:bg-muted"
                      onClick={clearRelation}
                      type="button"
                    >
                      Clear selection
                    </button>
                  ) : null}
                  {mapMode === "atlas" && isAtlasNodeSelected && active ? (
                    <button
                      className="inline-flex min-h-11 items-center border border-border bg-background px-4 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] hover:bg-muted"
                      onClick={() => showFocusMap(active.id)}
                      type="button"
                    >
                      Focus this domain
                    </button>
                  ) : null}
                </div>

                {mapMode === "atlas" && !selectedRelation ? (
                  <div className="mt-auto pt-8">
                    <SemanticMapLegend compact projection={projection} />
                  </div>
                ) : null}
              </div>
            </aside>
          ) : null}
        </div>
      </section>

      {mapMode === "atlas" ? (
        <section className="border-t border-border bg-card/55 px-5 py-5 sm:px-8">
          <div className="mx-auto flex max-w-[100rem] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-3xl text-sm leading-6 text-foreground-muted">
              The map is one representation of the public corpus. Use the list
              whenever a spatial view adds cognitive load instead of context.
            </p>
            <Link
              className="inline-flex min-h-11 shrink-0 items-center border border-border bg-background px-4 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] hover:bg-muted"
              href={atlasListHref({ view: projection })}
            >
              Browse as a list
            </Link>
          </div>
        </section>
      ) : null}
    </main>
  );
}
