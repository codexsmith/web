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
    if (!active || mapMode !== "focus") return;
    setSelectedRelation(null);
    setUrlRelationId(null);
    commitMapState({
      projection: "domains",
      mode: "focus",
      nodeId: active.id,
    });
  }

  function showFullAtlas() {
    const overviewId = ATLAS_OVERVIEW_NODE_ID;
    const nextProjection = projection;
    setActiveNodeId(overviewId);
    setMapMode("atlas");
    setProjection(nextProjection);
    setSelectedRelation(null);
    setUrlRelationId(null);
    commitMapState({
      projection: nextProjection,
      mode: "atlas",
      nodeId: overviewId,
    });
  }

  function inspectRelation(entity: HaloEntity) {
    setMapMode("halo");
    setSelectedRelation(entity);
    setUrlRelationId(entity.id);
    commitMapState({
      projection,
      mode: "halo",
      nodeId: activeNodeId ?? ATLAS_OVERVIEW_NODE_ID,
      relationId: entity.id,
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

  function inspectFacet(facet: string, parentId: string) {
    const parent = nodes.find((node) => node.id === parentId);
    if (!parent) return;
    const facetSlug = facet
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    const entity = buildFacetHaloEntity(
      parent,
      parent.facets.find((candidate) => candidate === facet) ?? facet,
    );
    if (entity.id !== `facet-${parentId}-${facetSlug}`) return;

    setActiveNodeId(parentId);
    setMapMode("focus");
    setProjection("domains");
    setSelectedRelation(entity);
    setUrlRelationId(entity.id);
    commitMapState({
      projection: "domains",
      mode: "focus",
      nodeId: parentId,
      relationId: entity.id,
    });

    window.requestAnimationFrame(() => {
      if (window.innerWidth >= 1280) return;
      document
        .getElementById("map-selection-details")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function renderMapScalePills() {
    const pillClass =
      "inline-flex min-h-10 min-w-10 items-center justify-center gap-2 rounded-full border border-border bg-background px-2 font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-foreground transition-colors hover:bg-muted min-[360px]:px-3";
    return (
      <div
        aria-label="Atlas navigation"
        className="flex shrink-0 items-center gap-2"
        role="group"
      >
        <AtlasViewSwitch
          current="map"
          listHref={
            active && activeNodeId !== ATLAS_OVERVIEW_NODE_ID
              ? atlasListHref(active.id, active.architectureStage)
              : undefined
          }
        />

        {mapMode !== "atlas" && (
          <button
            aria-label="Global atlas"
            className={pillClass}
            onClick={showFullAtlas}
            type="button"
          >
            <Globe2 aria-hidden="true" className="h-3.5 w-3.5" />
            <span className="hidden min-[360px]:inline">Global</span>
          </button>
        )}

        {mapMode !== "focus" && (
          <button
            aria-label="Facet focus"
            className={pillClass}
            onClick={() => showFocusMap()}
            type="button"
          >
            <Hexagon aria-hidden="true" className="h-3.5 w-3.5" />
            <span className="hidden min-[360px]:inline">Facets</span>
          </button>
        )}

        {mapMode !== "halo" && (
          <button
            aria-label="Open relation map"
            className={pillClass}
            onClick={() => showContextHalo()}
            type="button"
          >
            <Network aria-hidden="true" className="h-3.5 w-3.5" />
            <span className="hidden min-[360px]:inline">Relation map</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <SiteHeader variant="minimal" />

      <div className="relative z-40">
        {mapMode === "focus" ? (
          <div className="flex flex-col border-b border-border bg-card md:min-h-14 md:flex-row md:items-center md:justify-between md:gap-3">
            <div className="flex min-h-12 min-w-0 items-center gap-3 border-b border-border px-3 md:border-b-0 sm:px-6">
              <span className="shrink-0 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-foreground">
                Domain map
              </span>
              <span aria-hidden="true" className="hidden text-border sm:inline">
                /
              </span>
              <span className="hidden truncate text-sm font-semibold text-foreground-muted sm:block">
                {active?.label}
              </span>
            </div>
            <div className="overflow-x-auto px-3 py-2 sm:px-6">
              {renderMapScalePills()}
            </div>
          </div>
        ) : null}
        {mapMode !== "focus" ? (
          <div className="border-b border-border bg-card md:flex md:min-h-14 md:items-center">
            <nav
              aria-label={
                mapMode === "atlas"
                  ? "Global atlas lenses"
                  : "Relation context lenses"
              }
              className="flex min-w-0 flex-1 snap-x items-center gap-2 overflow-x-auto border-b border-border px-3 py-2 [scrollbar-width:none] sm:px-6 md:border-b-0 [&::-webkit-scrollbar]:hidden"
            >
              <span className="hidden shrink-0 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-foreground-muted md:block">
                {mapMode === "atlas" ? "Highlight" : "Context lens"}
              </span>
              {(mapMode === "atlas" ? globalAtlasProjections : projections).map(
                (item) => (
                  <button
                    aria-label={`${
                      item.id === "domains" && mapMode !== "atlas"
                        ? "All relations"
                        : item.label
                    } lens`}
                    aria-pressed={projection === item.id}
                    className={`min-h-10 shrink-0 snap-start touch-manipulation rounded-full border px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.08em] transition-colors ${
                      projection === item.id
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-background hover:bg-muted"
                    }`}
                    key={item.id}
                    onClick={() => chooseProjection(item.id)}
                    type="button"
                  >
                    {item.id === "domains" && mapMode !== "atlas"
                      ? "All"
                      : item.label}
                  </button>
                ),
              )}
            </nav>
            <div className="shrink-0 overflow-x-auto px-3 py-2 sm:px-6">
              {renderMapScalePills()}
            </div>
          </div>
        ) : null}
      </div>

      <section
        className={`relative w-full bg-background xl:overflow-hidden ${
          mapMode === "halo"
            ? "xl:h-[max(52rem,calc(100dvh-8.5rem))]"
            : "xl:h-[calc(100dvh-8.5rem)]"
        }`}
      >
        <div className="relative z-0 w-full overflow-hidden border-b border-border/40 xl:absolute xl:inset-0 xl:h-auto xl:border-b-0 h-[30rem] sm:h-[36rem]">
          <div
            className={`${
              mapMode === "halo"
                ? "hidden"
                : "absolute left-6 top-5 z-10 hidden font-mono text-xs font-semibold uppercase tracking-[0.1em] text-foreground-muted pointer-events-auto xl:block"
            }`}
          >
            <Link className="hover:text-foreground transition-colors" href="/">
              Start
            </Link>{" "}
            › Atlas{" "}
            {activeNodeId !== ATLAS_OVERVIEW_NODE_ID
              ? `› ${active?.title}`
              : ""}
          </div>
          {mapMode === "halo" && active ? (
            <ContextHalo
              active={active}
              nodes={nodes}
              onInspectRelation={inspectRelation}
              onOpenRecord={() => router.push(`/domain/${active.id}`)}
              projection={projection}
              selectedRelationId={selectedRelation?.id ?? null}
            />
          ) : (
            <>
              <InteractiveMap
                nodes={nodes}
                activeNodeId={
                  mapMode === "atlas" && activeNodeId === ATLAS_OVERVIEW_NODE_ID
                    ? null
                    : activeNodeId
                }
                setActiveNodeId={(id) => {
                  if (id) selectAtlasNode(id);
                }}
                className={`h-full w-full ${
                  isCompactFocus
                    ? "xl:w-[calc(100%_-_22rem)] 2xl:w-[calc(100%_-_24rem)]"
                    : "xl:w-[calc(100%_-_28rem)] 2xl:w-[calc(100%_-_32rem)]"
                }`}
                isTruncated={mapMode === "focus"}
                setIsTruncated={(isTruncated) => {
                  if (isTruncated) {
                    showFocusMap();
                  } else {
                    showFullAtlas();
                  }
                }}
                onInspectFacet={mapMode === "focus" ? inspectFacet : undefined}
                onExploreDomain={(id) => router.push(`/domain/${id}`)}
                projection={projection}
                selectedFacetId={
                  isFacetFocusSelection ? selectedRelation?.id ?? null : null
                }
              />
              {mapMode === "atlas" ? (
                <div className="absolute bottom-4 left-4 z-20 hidden lg:block">
                  <SemanticMapLegend />
                </div>
              ) : null}
            </>
          )}
        </div>

        <aside
          className={`relative z-10 flex w-full scroll-mt-4 flex-col p-3 pb-6 sm:p-4 xl:pointer-events-none xl:absolute xl:inset-y-0 xl:right-0 ${
            mapMode === "halo" ? "xl:justify-start" : "xl:justify-center"
          } ${
            isCompactFocus
              ? "xl:max-w-[22rem] xl:p-5 2xl:max-w-[24rem] 2xl:p-6"
              : "xl:max-w-[28rem] xl:p-8 2xl:max-w-[32rem] 2xl:p-10"
          }`}
          id="map-selection-details"
        >
          {!isCompactFocus &&
          !selectedRelation &&
          !isAtlasNodeSelected &&
          projection !== "domains" ? (
            <h1 className="sr-only">Research Atlas</h1>
          ) : null}
          <p aria-live="polite" className="sr-only">
            {selectedRelation
              ? `${selectedRelation.label} selected. ${selectedRelation.summary}`
              : isCompactFocus
                ? `${active?.label}. ${active?.short}`
                : isAtlasNodeSelected
                  ? `${active?.label} selected. ${active?.short}`
                  : `${projectionContent.eyebrow}. ${projectionContent.summary}`}
          </p>
          <div
            className={`pointer-events-auto rounded-sm border border-border bg-card/95 p-5 shadow-xl backdrop-blur-md sm:p-6 xl:max-h-[calc(100dvh-10rem)] xl:overflow-y-auto ${
              isCompactFocus ? "xl:p-6" : "xl:p-8"
            }`}
          >
            <div className="mb-5 flex items-center justify-between gap-4 text-foreground-muted">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.08em]">
                {isFacetFocusSelection
                  ? "Selected facet"
                  : isCompactFocus || isAtlasNodeSelected
                    ? active?.id === "identity"
                      ? "Selected steward"
                      : "Selected domain"
                    : projectionContent.eyebrow}
              </span>
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.08em]">
                {progressLabel}
              </span>
            </div>

            {isCompactFocus ? (
              <>
                <h1 className="font-serif text-2xl font-semibold leading-tight text-foreground">
                  {active?.label}
                </h1>
                <p className="mt-3 text-[15px] font-medium leading-6 text-foreground-secondary">
                  {active?.short}
                </p>
                <p className="mt-4 text-sm leading-6 text-foreground-muted">
                  Select a labeled facet on the map for its status and source
                  context, or open the record for the complete content tree.
                </p>
                <div className="mt-6 grid gap-2">
                  <Link
                    className="inline-flex min-h-12 w-full items-center justify-center rounded-sm bg-foreground px-5 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-background transition-opacity hover:opacity-85"
                    href={active ? `/domain/${active.id}` : "/domains"}
                  >
                    Read the domain record
                  </Link>
                  <Link
                    className="inline-flex min-h-11 w-full items-center justify-center rounded-sm border border-border bg-transparent px-5 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-foreground transition-colors hover:bg-muted"
                    href="/domains"
                  >
                    Browse the domain tree
                  </Link>
                </div>
              </>
            ) : isFacetFocusSelection && active && selectedRelation ? (
              <>
                <h1 className="font-serif text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
                  {selectedRelation.label}
                </h1>
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground-muted">
                    Facet of {active.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="hidden h-3 w-px bg-border sm:block"
                  />
                  <span className="rounded-full border border-border bg-background px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground">
                    {selectedRelation.status}
                  </span>
                </div>

                <p className="mt-5 text-[17px] font-medium leading-7 text-foreground sm:text-lg">
                  {selectedRelation.summary}
                </p>
                <p className="mt-3 text-sm leading-6 text-foreground-muted">
                  This facet remains selected on the ring. Choose another facet
                  to compare its brief, or open relation context when you want
                  to inspect what surrounds it.
                </p>

                <div className="my-6 h-px bg-border/60" />

                <dl className="grid gap-5">
                  <div>
                    <dt className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground-muted">
                      Placement
                    </dt>
                    <dd className="mt-1.5 text-sm font-medium leading-6 text-foreground-secondary">
                      {selectedRelation.belonging ||
                        `Declared facet of ${active.label}`}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground-muted">
                      Content state
                    </dt>
                    <dd className="mt-1.5 text-sm font-medium leading-6 text-foreground-secondary">
                      {selectedRelation.definitionStatus
                        ? `${selectedRelation.definitionStatus.replace(
                            /-/g,
                            " ",
                          )} definition`
                        : selectedRelation.status}
                      {selectedRelation.stage
                        ? ` · ${selectedRelation.stage.replace(
                            /-/g,
                            " ",
                          )} stage`
                        : ""}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground-muted">
                      Claim boundary
                    </dt>
                    <dd className="mt-1.5 text-sm leading-6 text-foreground-secondary">
                      {selectedRelation.authority}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground-muted">
                      Evidence
                      {selectedRelation.evidenceStatus
                        ? ` · ${selectedRelation.evidenceStatus.replace(
                            /-/g,
                            " ",
                          )}`
                        : ""}
                    </dt>
                    <dd className="mt-1.5 text-sm leading-6 text-foreground-secondary">
                      {selectedRelation.evidence}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground-muted">
                      Closure and repair
                    </dt>
                    <dd className="mt-1.5 text-sm leading-6 text-foreground-secondary">
                      {selectedRelation.closure}
                    </dd>
                  </div>
                </dl>

                <div className="-mx-5 -mb-5 mt-7 grid gap-2 border-t border-border bg-card/95 px-5 pb-5 pt-4 backdrop-blur-md sm:-mx-6 sm:-mb-6 sm:px-6 sm:pb-6 xl:sticky xl:-bottom-8 xl:-mx-8 xl:-mb-8 xl:px-8 xl:pb-8">
                  <button
                    className="inline-flex min-h-12 w-full items-center justify-center rounded-sm bg-foreground px-5 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-background transition-opacity hover:opacity-85"
                    onClick={() => showContextHalo(active.id)}
                    type="button"
                  >
                    Inspect facet relations
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      className="inline-flex min-h-11 items-center justify-center rounded-sm border border-border bg-transparent px-3 text-center font-mono text-[11px] font-semibold uppercase tracking-[0.07em] text-foreground transition-colors hover:bg-muted"
                      href={
                        selectedRelation.recordHref ??
                        `/domain/${active.id}#${slugifyFacet(
                          selectedRelation.label,
                        )}`
                      }
                    >
                      Open facet section
                    </Link>
                    <button
                      className="inline-flex min-h-11 items-center justify-center rounded-sm border border-border bg-transparent px-3 text-center font-mono text-[11px] font-semibold uppercase tracking-[0.07em] text-foreground transition-colors hover:bg-muted"
                      onClick={clearFacetSelection}
                      type="button"
                    >
                      Clear selection
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {selectedRelation || isAtlasNodeSelected ? (
                  <h1 className="mb-3 font-serif text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
                    {selectedRelation?.label ?? active?.label}
                  </h1>
                ) : null}
                {!selectedRelation &&
                !isAtlasNodeSelected &&
                mapMode === "atlas" &&
                projection === "domains" ? (
                  <h1 className="mb-3 font-serif text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
                    {atlasHierarchyBinding.projection.title}
                  </h1>
                ) : null}
                {isAtlasNodeSelected ? (
                  <p className="mb-4 text-[15px] font-medium leading-6 text-foreground-muted">
                    {active?.short}
                  </p>
                ) : null}
                <p className="text-lg font-medium leading-7 text-foreground sm:text-xl sm:leading-8">
                  {projectionContent.summary}
                </p>

                {isAtlasNodeSelected && active ? (
                  <div className="mt-6 grid gap-2">
                    <button
                      className="inline-flex min-h-12 w-full items-center justify-center rounded-sm bg-foreground px-5 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-background transition-opacity hover:opacity-85"
                      onClick={() => showFocusMap(active.id)}
                      type="button"
                    >
                      Focus facets
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        className="inline-flex min-h-11 items-center justify-center rounded-sm border border-border bg-transparent px-3 font-mono text-[11px] font-semibold uppercase tracking-[0.07em] text-foreground transition-colors hover:bg-muted"
                        onClick={() => showContextHalo(active.id)}
                        type="button"
                      >
                        Relations
                      </button>
                      <Link
                        className="inline-flex min-h-11 items-center justify-center rounded-sm border border-border bg-transparent px-3 font-mono text-[11px] font-semibold uppercase tracking-[0.07em] text-foreground transition-colors hover:bg-muted"
                        href={`/domain/${active.id}`}
                      >
                        Open record
                      </Link>
                    </div>
                    <button
                      className="inline-flex min-h-8 items-center justify-center text-center font-mono text-[11px] font-semibold uppercase tracking-[0.07em] text-foreground-muted underline-offset-4 hover:text-foreground hover:underline"
                      onClick={showFullAtlas}
                      type="button"
                    >
                      Clear selection
                    </button>
                  </div>
                ) : null}

                {projectionContent.items.length ? (
                  <>
                    <div className="my-7 h-px bg-border/50" />
                    <ul className="mb-8 grid gap-2">
                      {projectionContent.items
                        .slice(0, 6)
                        .map((item, index) => (
                          <li
                            className="grid grid-cols-[1.75rem_1fr] gap-2 text-[15px] leading-6 text-foreground-secondary"
                            key={`${item}-${index}`}
                          >
                            <span className="font-mono text-[11px] font-semibold text-foreground-muted">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                    </ul>
                  </>
                ) : (
                  <div className="my-7 h-px bg-border/50" />
                )}

                {mapMode !== "focus" && !isAtlasNodeSelected ? (
                  <div className="mb-2 grid gap-2">
                    {(selectedRelation?.targetOptions?.length ?? 0) > 1 ? (
                      <div className="mb-2 grid gap-2 border-b border-border/60 pb-4">
                        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground-muted">
                          Related domains
                        </p>
                        {selectedRelation?.targetOptions?.map((target) => (
                          <Link
                            className="inline-flex min-h-10 items-center justify-between rounded-sm border border-border bg-background px-3 text-sm font-semibold transition-colors hover:bg-muted"
                            href={target.recordHref}
                            key={target.id}
                            onClick={() => setActiveNodeId(target.id)}
                          >
                            <span>{target.label}</span>
                            <span aria-hidden="true">→</span>
                          </Link>
                        ))}
                      </div>
                    ) : null}
                    <Link
                      className="w-full inline-flex min-h-12 items-center justify-center rounded-sm border border-border bg-transparent px-5 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-foreground hover:bg-muted transition-colors"
                      href={projectionContent.href}
                      onClick={() => {
                        if (selectedRelation?.sourceId) {
                          setActiveNodeId(selectedRelation.sourceId);
                        }
                      }}
                    >
                      {projectionContent.action}
                    </Link>
                    <Link
                      className="inline-flex min-h-10 items-center justify-center text-center font-mono text-xs font-semibold uppercase tracking-[0.08em] text-foreground-muted underline-offset-4 hover:underline"
                      href={mapMode === "atlas" ? "/search" : "/domains"}
                    >
                      {mapMode === "atlas"
                        ? "Search public records"
                        : "Browse domain index"}
                    </Link>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </aside>
      </section>
    </main>
  );
}
