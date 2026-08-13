"use client";
import React, { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import * as d3 from "d3";
import { motion, AnimatePresence } from "framer-motion";
import type { ArtifactRef, GraphNode } from "@/app/context/GraphContext";
import { slugifyFacet } from "@/app/context/facets";
import {
  entityDashArray,
  inferEntityKind,
  paletteForLayer,
  paletteForNode,
  projectionMatchesNode,
  semanticShapePath,
  type MapProjection,
} from "@/lib/map-semantics";
import {
  atlasHierarchyBranchForNode,
  atlasHierarchyBranches,
  atlasTheoryRootId,
  type AtlasHierarchyBranch,
} from "@/lib/atlas-hierarchy";
import { ATLAS_HREF } from "@/lib/site-navigation";

type SimNode = d3.SimulationNodeDatum & {
  id: string;
  isIdentity?: boolean;
  isTheoryRoot?: boolean;
  isHierarchyGroup?: boolean;
  isDomain?: boolean;
  isFacet?: boolean;
  isArtifact?: boolean;
  parent?: string;
  hierarchyBranchId?: string;
  anchorX?: number;
  anchorY?: number;
  radius: number;
  data: unknown;
  slug?: string;
};

type SimLink = d3.SimulationLinkDatum<SimNode> & {
  relationType:
    | "hierarchy-branch"
    | "hierarchy-member"
    | "structural-domain"
    | "facet"
    | "artifact"
    | "related-domain";
  weight: number;
};

interface InteractiveMapProps {
  nodes: GraphNode[];
  activeNodeId: string | null;
  setActiveNodeId: (id: string | null) => void;
  className?: string;
  isTruncated?: boolean;
  setIsTruncated?: (val: boolean) => void;
  onExploreDomain?: (id: string) => void;
  onInspectFacet?: (facet: string, parentId: string) => void;
  selectedFacetId?: string | null;
  projection?: MapProjection;
}

let cachedSimNodes: SimNode[] | null = null;
let cachedSimLinks: SimLink[] | null = null;

const hierarchyGroupRadius = 330;
const hierarchyMemberRadius = 180;

function hierarchyGroupNodeId(branchId: string): string {
  return `atlas-branch-${branchId}`;
}

function polarPosition(angleDegrees: number, radius: number) {
  const angle = (angleDegrees * Math.PI) / 180;
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  };
}

function hierarchyMemberPosition(
  branch: AtlasHierarchyBranch,
  index: number,
  count: number,
) {
  const group = polarPosition(branch.angleDegrees, hierarchyGroupRadius);
  const angle = (branch.angleDegrees * Math.PI) / 180;
  const radial = { x: Math.cos(angle), y: Math.sin(angle) };
  const tangent = { x: -Math.sin(angle), y: Math.cos(angle) };
  const columns =
    count === 1
      ? 1
      : count <= 3
        ? count
        : count === 4
          ? 2
          : Math.ceil(count / 2);
  const column = index % columns;
  const row = Math.floor(index / columns);
  const tangentOffset = (column - (columns - 1) / 2) * 180;
  const radialOffset = 150 + row * 190;
  return {
    x: group.x + radial.x * radialOffset + tangent.x * tangentOffset,
    y: group.y + radial.y * radialOffset + tangent.y * tangentOffset,
  };
}

function responsiveZoomTransform(svg: SVGSVGElement, isSingleView: boolean) {
  const viewportWidth =
    typeof window === "undefined"
      ? svg.getBoundingClientRect().width
      : window.innerWidth;
  const scale =
    viewportWidth < 640
      ? isSingleView
        ? 1.08
        : 0.92
      : viewportWidth < 1024
        ? isSingleView
          ? 1.04
          : 0.92
        : isSingleView
          ? 1
          : 0.92;
  return d3.zoomIdentity.scale(scale);
}

function fitMapLabel(
  value: string,
  maxCharacters = 14,
  maxLines = 3,
): string[] {
  const words = value
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .flatMap((word) => {
      const semanticChunks = word.includes("-")
        ? word
            .split("-")
            .filter(Boolean)
            .map((part, index, parts) =>
              index < parts.length - 1 ? `${part}-` : part,
            )
        : [word];
      return semanticChunks.flatMap((semanticChunk) => {
        if (semanticChunk.length <= maxCharacters) return [semanticChunk];
        const chunks: string[] = [];
        const chunkSize = Math.max(2, maxCharacters - 1);
        let remainder = semanticChunk;
        while (remainder.length > maxCharacters) {
          chunks.push(`${remainder.slice(0, chunkSize)}-`);
          remainder = remainder.slice(chunkSize);
        }
        if (remainder) chunks.push(remainder);
        return chunks;
      });
    });
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxCharacters) {
      current = candidate;
      continue;
    }
    if (current) lines.push(current);
    current = word;
  }
  if (current) lines.push(current);

  if (lines.length <= maxLines) return lines;
  const fitted = lines.slice(0, maxLines);
  fitted[maxLines - 1] = `${fitted[maxLines - 1].slice(
    0,
    Math.max(1, maxCharacters - 1),
  )}…`;
  return fitted;
}

export function InteractiveMap({
  nodes,
  activeNodeId,
  setActiveNodeId,
  className = "",
  isTruncated,
  setIsTruncated,
  onExploreDomain,
  onInspectFacet,
  selectedFacetId = null,
  projection = "domains",
}: InteractiveMapProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [zoom, setZoom] = useState(1);

  const [simNodes, setSimNodes] = useState<SimNode[]>(
    () => cachedSimNodes ?? [],
  );
  const [simLinks, setSimLinks] = useState<SimLink[]>(
    () => cachedSimLinks ?? [],
  );
  const simRef = useRef<d3.Simulation<SimNode, SimLink> | null>(null);
  const draggingNodeRef = useRef<SimNode | null>(null);

  const svgRef = useRef<SVGSVGElement>(null);
  const zoomBehaviorRef = useRef<d3.ZoomBehavior<
    SVGSVGElement,
    unknown
  > | null>(null);
  const [transform, setTransform] = useState<d3.ZoomTransform>(d3.zoomIdentity);

  const isSingleView =
    isTruncated !== undefined ? isTruncated : activeNodeId !== null;

  const baseWidth = isSingleView ? 760 : 1850;
  const baseHeight = isSingleView ? 700 : 1600;

  const handlePointerDownNode = (e: React.PointerEvent, node: SimNode) => {
    // Focus-map facets are inspection controls, not draggable simulation
    // handles. Pointer capture here suppresses click activation in some
    // browsers and assistive automation.
    if (node.isFacet && onInspectFacet) {
      e.stopPropagation();
      return;
    }
    if (!svgRef.current || !simRef.current) return;
    e.stopPropagation();
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // ignore fallback if capture unavailable
    }
    draggingNodeRef.current = node;
    node.fx = node.x ?? 0;
    node.fy = node.y ?? 0;
    simRef.current.alphaTarget(0.3).restart();
  };

  const handlePointerMoveNode = (e: React.PointerEvent, node: SimNode) => {
    if (draggingNodeRef.current !== node || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const scaleX = baseWidth / rect.width;
    const scaleY = baseHeight / rect.height;
    const mouseSvgX =
      ((e.clientX - rect.left - rect.width / 2) * scaleX) / transform.k -
      transform.x / transform.k;
    const mouseSvgY =
      ((e.clientY - rect.top - rect.height / 2) * scaleY) / transform.k -
      transform.y / transform.k;
    node.fx = mouseSvgX;
    node.fy = mouseSvgY;
  };

  const handlePointerUpNode = (e: React.PointerEvent, node: SimNode) => {
    if (draggingNodeRef.current === node) {
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      draggingNodeRef.current = null;
      node.fx = null;
      node.fy = null;
      if (simRef.current) {
        simRef.current.alphaTarget(0);
      }
    }
  };

  const handleZoomIn = () => {
    if (svgRef.current && zoomBehaviorRef.current) {
      d3.select(svgRef.current)
        .transition()
        .duration(300)
        .call(zoomBehaviorRef.current.scaleBy, 1.3);
    }
  };
  const handleZoomOut = () => {
    if (svgRef.current && zoomBehaviorRef.current) {
      d3.select(svgRef.current)
        .transition()
        .duration(300)
        .call(zoomBehaviorRef.current.scaleBy, 0.7);
    }
  };
  const handleZoomReset = () => {
    if (svgRef.current && zoomBehaviorRef.current) {
      d3.select(svgRef.current)
        .transition()
        .duration(400)
        .call(
          zoomBehaviorRef.current.transform,
          responsiveZoomTransform(svgRef.current, isSingleView),
        );
    }
  };

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    zoomBehaviorRef.current = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.45, 2.75])
      .filter((event) => {
        if (event.type === "wheel") {
          return window.innerWidth >= 1024 && (event.ctrlKey || event.metaKey);
        }
        if (event.type.startsWith("touch")) {
          return window.innerWidth >= 1024;
        }
        return !event.button;
      })
      .on("zoom", (e) => {
        setTransform(e.transform);
        setZoom(e.transform.k);
      });
    svg.call(zoomBehaviorRef.current);
    svg.on("dblclick.zoom", null);
  }, []);

  useEffect(() => {
    if (svgRef.current && zoomBehaviorRef.current) {
      d3.select(svgRef.current)
        .transition()
        .duration(500)
        .call(
          zoomBehaviorRef.current.transform,
          responsiveZoomTransform(svgRef.current, isSingleView),
        );
    }
  }, [activeNodeId, isSingleView]);

  const active = useMemo(
    () =>
      nodes.find((node) => node.id === activeNodeId) ??
      nodes.find((n) => n.id === "identity"),
    [activeNodeId, nodes],
  );

  const handleFacetClick = (child: string, parentId: string) => {
    if (onInspectFacet) {
      onInspectFacet(child, parentId);
      return;
    }
    const childId = slugifyFacet(child);
    const targetNode = nodes.find((n) => n.id === childId);
    if (targetNode?.associatedURL) {
      router.push(targetNode.associatedURL);
    } else {
      const parentNode = nodes.find((n) => n.id === parentId);
      if (onExploreDomain) {
        onExploreDomain(parentId);
      } else if (parentNode?.associatedURL) {
        router.push(parentNode.associatedURL);
      } else {
        router.push(`/domain/${parentId}`);
      }
    }
  };

  const isSelectedFacet = (child: string, parentId: string) =>
    selectedFacetId === `facet-${parentId}-${slugifyFacet(child)}`;

  const handleFacetKeyDown = (
    event: React.KeyboardEvent<SVGGElement>,
    child: string,
    parentId: string,
  ) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    handleFacetClick(child, parentId);
  };

  useEffect(() => {
    let cancelled = false;
    if (simRef.current) {
      simRef.current.stop();
    }

    if (cachedSimNodes && cachedSimLinks) {
      return;
    }

    const rawSimNodes: SimNode[] = [];
    const rawSimLinks: SimLink[] = [];
    const structuralRelationKeys = new Set<string>();

    const theoryRoot = nodes.find((node) => node.id === atlasTheoryRootId);
    if (!theoryRoot) return;

    rawSimNodes.push({
      id: theoryRoot.id,
      isTheoryRoot: true,
      isDomain: true,
      radius: theoryRoot.mapR,
      data: theoryRoot,
      fx: 0,
      fy: 0,
    });

    atlasHierarchyBranches.forEach((branch) => {
      const position = polarPosition(branch.angleDegrees, hierarchyGroupRadius);
      const groupId = hierarchyGroupNodeId(branch.id);
      rawSimNodes.push({
        id: groupId,
        isHierarchyGroup: true,
        radius: 64,
        data: branch,
        fx: position.x,
        fy: position.y,
      });
      rawSimLinks.push({
        source: theoryRoot.id,
        target: groupId,
        relationType: "hierarchy-branch",
        weight: 2.2,
      });
    });

    nodes
      .filter((n) => n.id !== theoryRoot.id)
      .forEach((n) => {
        const branch = atlasHierarchyBranchForNode(n.id);
        if (!branch) return;
        const branchIndex = branch.nodeIds.indexOf(n.id);
        const anchor = hierarchyMemberPosition(
          branch,
          Math.max(0, branchIndex),
          branch.nodeIds.length,
        );
        const structuralParentId = [n.facetOf, n.definedWithin].find(
          (candidate): candidate is string =>
            typeof candidate === "string" &&
            nodes.some((node) => node.id === candidate),
        );
        rawSimNodes.push({
          id: n.id,
          isIdentity: n.id === "identity",
          isDomain: true,
          parent: hierarchyGroupNodeId(branch.id),
          hierarchyBranchId: branch.id,
          anchorX: anchor.x,
          anchorY: anchor.y,
          radius: n.mapR,
          data: n,
          x: anchor.x,
          y: anchor.y,
        });
        rawSimLinks.push({
          source: hierarchyGroupNodeId(branch.id),
          target: n.id,
          relationType: "hierarchy-member",
          weight: 1.35,
        });
        if (structuralParentId) {
          rawSimLinks.push({
            source: structuralParentId,
            target: n.id,
            relationType: "structural-domain",
            weight: 1.15,
          });
          structuralRelationKeys.add(
            [structuralParentId, n.id].sort().join("::"),
          );
        }

        if (n.displayUI === "radialpart") {
          // Do not add facets or artifacts to the physics simulation
          // They will be rendered manually as radial arcs
          return;
        }

        n.facets.forEach((facet) => {
          const facetId = `${n.id}-${facet}`;
          rawSimNodes.push({
            id: facetId,
            isFacet: true,
            parent: n.id,
            radius: 36,
            data: facet,
          });
          rawSimLinks.push({
            source: n.id,
            target: facetId,
            relationType: "facet",
            weight: 1,
          });
        });

        n.artifacts?.forEach((artifact) => {
          const parentFacetId = `${n.id}-${artifact.parent}`;
          const targetParentId = n.facets.includes(artifact.parent)
            ? parentFacetId
            : n.id;
          const artifactId = `artifact-${artifact.id}`;

          rawSimNodes.push({
            id: artifactId,
            isArtifact: true,
            parent: targetParentId,
            radius: 12,
            data: artifact,
            slug: artifact.id,
          });

          rawSimLinks.push({
            source: targetParentId,
            target: artifactId,
            relationType: "artifact",
            weight: 1.4,
          });
        });
      });

    const relationKeys = new Set<string>(structuralRelationKeys);
    nodes.forEach((node) => {
      const symmetricRelations = (node.relationRecords ?? []).filter(
        (record) =>
          record.directionality === "symmetric" &&
          typeof record.targetId === "string",
      );
      symmetricRelations.forEach((relation) => {
        const relatedId = relation.targetId as string;
        if (!nodes.some((candidate) => candidate.id === relatedId)) return;
        const key = [node.id, relatedId].sort().join("::");
        if (relationKeys.has(key)) return;
        relationKeys.add(key);
        rawSimLinks.push({
          source: node.id,
          target: relatedId,
          relationType: "related-domain",
          weight: 0.75,
        });
      });
    });

    const simulation = d3
      .forceSimulation<SimNode>(rawSimNodes)
      .force(
        "link",
        d3
          .forceLink<SimNode, SimLink>(rawSimLinks)
          .id((d) => d.id)
          .distance((d) => {
            if ((d.target as SimNode).isArtifact)
              return ((d.source as SimNode).radius || 0) + 30;
            if ((d.target as SimNode).isFacet)
              return ((d.source as SimNode).radius || 0) + 80;
            if (d.relationType === "hierarchy-branch")
              return hierarchyGroupRadius;
            if (d.relationType === "hierarchy-member") {
              const source = d.source as SimNode;
              const target = d.target as SimNode;
              return Math.max(
                hierarchyMemberRadius,
                Math.hypot(
                  (target.anchorX ?? 0) - (source.fx ?? source.x ?? 0),
                  (target.anchorY ?? 0) - (source.fy ?? source.y ?? 0),
                ),
              );
            }
            if (d.relationType === "structural-domain") return 280;
            if (d.relationType === "related-domain") return 520;
            return 420;
          })
          .strength((d) => {
            if (d.relationType === "hierarchy-branch") return 0.82;
            if (d.relationType === "hierarchy-member") return 0.34;
            if (d.relationType === "structural-domain") return 0.16;
            if (d.relationType === "related-domain") return 0.035;
            return 0.2;
          }),
      )
      .force(
        "collide",
        d3
          .forceCollide<SimNode>()
          .radius((d) => d.radius + 28)
          .iterations(3),
      )
      .force(
        "charge",
        d3.forceManyBody<SimNode>().strength((d: SimNode) => {
          if (d.isTheoryRoot) return -1250;
          if (d.isHierarchyGroup) return -240;
          if (d.isDomain) return -320;
          if (d.isFacet) return -100;
          return -30;
        }),
      )
      .force(
        "x",
        d3
          .forceX<SimNode>((d) => d.anchorX ?? d.x ?? 0)
          .strength((d) => (d.isDomain && !d.isTheoryRoot ? 0.34 : 0)),
      )
      .force(
        "y",
        d3
          .forceY<SimNode>((d) => d.anchorY ?? d.y ?? 0)
          .strength((d) => (d.isDomain && !d.isTheoryRoot ? 0.34 : 0)),
      );

    simRef.current = simulation;

    simulation.stop();

    let tickCount = 0;
    const maxTicks = 240;
    const ticksPerFrame = 40;

    const runSimulationBatch = () => {
      if (cancelled) return;

      const targetTicks = Math.min(tickCount + ticksPerFrame, maxTicks);
      for (; tickCount < targetTicks; tickCount++) {
        simulation.tick();
      }

      if (tickCount < maxTicks) {
        requestAnimationFrame(runSimulationBatch);
      } else {
        cachedSimNodes = rawSimNodes;
        cachedSimLinks = rawSimLinks;
        setSimNodes([...rawSimNodes]);
        setSimLinks([...rawSimLinks]);
      }
    };

    requestAnimationFrame(runSimulationBatch);

    return () => {
      cancelled = true;
      simulation.stop();
    };
  }, [nodes]);

  const isLoading = simNodes.length === 0;

  const activateDomainNode = (node: GraphNode) => {
    if (pathname?.startsWith("/domain/")) {
      if (isSingleView) {
        router.push(ATLAS_HREF);
      } else if (node.associatedURL) {
        router.push(node.associatedURL);
      }
      return;
    }
    if (pathname === "/") {
      if (node.associatedURL) {
        router.push(node.associatedURL);
      }
      return;
    }
    if (setIsTruncated) {
      if (isSingleView) {
        setIsTruncated(false);
      } else {
        setActiveNodeId(node.id);
      }
    } else {
      setActiveNodeId(isSingleView ? "identity" : node.id);
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background/92 px-6 text-center backdrop-blur-sm">
          <div className="h-16 w-16 animate-pulse rounded-full border-2 border-border bg-card" />
          <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
            Preparing the Atlas
          </p>
          <p className="mt-2 max-w-sm text-sm leading-6 text-foreground-muted">
            The map is arranging the public records. You can browse the same
            material as a list now.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              className="inline-flex min-h-11 items-center border border-border bg-background px-4 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] hover:bg-muted"
              href="/domains"
            >
              Browse domains
            </Link>
            <Link
              className="inline-flex min-h-11 items-center px-3 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] hover:underline"
              href="/search"
            >
              Search records
            </Link>
          </div>
        </div>
      )}
      <p className="sr-only" id="atlas-interaction-help">
        Use Tab to move between domain nodes and Enter or Space to select a
        domain. Its summary and explicit Focus facets, Relations, and Open
        record actions appear beside the atlas. On desktop, hold Control or
        Command while scrolling to zoom. Use the visible zoom controls on touch
        screens.
      </p>
      <div className="sr-only" id="atlas-hierarchy-summary">
        <p>
          Boundary Theory is the central theoretical node. The remaining records
          are organized into six named branches.
        </p>
        <ul>
          {atlasHierarchyBranches.map((branch) => (
            <li key={branch.id}>
              {branch.label}:{" "}
              {branch.nodeIds
                .map(
                  (nodeId) =>
                    nodes.find((node) => node.id === nodeId)?.label ?? nodeId,
                )
                .join(", ")}
            </li>
          ))}
        </ul>
      </div>
      <svg
        aria-describedby="atlas-hierarchy-summary atlas-interaction-help"
        aria-label="Theory-centered Boundary First research atlas"
        role="group"
        ref={svgRef}
        suppressHydrationWarning={true}
        viewBox={`-${baseWidth / 2} -${
          baseHeight / 2
        } ${baseWidth} ${baseHeight}`}
        className="absolute inset-0 h-full w-full touch-pan-y cursor-grab transition-all duration-500 active:cursor-grabbing lg:touch-none"
      >
        <g transform={transform.toString()}>
          <defs>
            <radialGradient id="nodeFill" cx="50%" cy="40%" r="70%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f2f2ef" />
            </radialGradient>
          </defs>

          {!isSingleView ? (
            <g aria-hidden="true">
              {[170, hierarchyGroupRadius, 650].map((r) => (
                <circle
                  key={r}
                  cx="0"
                  cy="0"
                  r={r}
                  fill="none"
                  stroke="#d6d6d0"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                />
              ))}
              {atlasHierarchyBranches.map((branch) => {
                const angle = (branch.angleDegrees * Math.PI) / 180;
                return (
                  <line
                    key={branch.id}
                    x1={Math.cos(angle) * 170}
                    y1={Math.sin(angle) * 170}
                    x2={Math.cos(angle) * 690}
                    y2={Math.sin(angle) * 690}
                    stroke="#ddddd7"
                    strokeWidth="1"
                  />
                );
              })}
            </g>
          ) : null}

          <AnimatePresence>
            {!isSingleView && (
              <motion.g
                key="full-map-decorations"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* primary and satellite connections */}
                {simLinks
                  .filter((link) => {
                    const source = link.source as SimNode;
                    const target = link.target as SimNode;
                    if (
                      link.relationType === "hierarchy-branch" ||
                      link.relationType === "hierarchy-member" ||
                      link.relationType === "structural-domain"
                    ) {
                      return true;
                    }
                    if (link.relationType !== "related-domain") return false;
                    return (
                      Boolean(activeNodeId) &&
                      activeNodeId !== "identity" &&
                      (source.id === activeNodeId || target.id === activeNodeId)
                    );
                  })
                  .map((link) => {
                    const source = link.source as SimNode;
                    const target = link.target as SimNode;
                    const targetDomain = target.isDomain
                      ? (target.data as GraphNode)
                      : undefined;
                    const sourceDomain = source.isDomain
                      ? (source.data as GraphNode)
                      : undefined;
                    const hierarchyGroup = source.isHierarchyGroup
                      ? source
                      : target.isHierarchyGroup
                        ? target
                        : undefined;
                    const hierarchyBranch = hierarchyGroup?.data as
                      | AtlasHierarchyBranch
                      | undefined;
                    const branchProminent =
                      projection === "domains" ||
                      Boolean(
                        hierarchyBranch?.nodeIds.some((nodeId) => {
                          const branchNode = nodes.find(
                            (candidate) => candidate.id === nodeId,
                          );
                          return (
                            branchNode &&
                            projectionMatchesNode(branchNode, projection)
                          );
                        }),
                      );
                    const prominent = hierarchyBranch
                      ? branchProminent &&
                        (!targetDomain ||
                          projectionMatchesNode(targetDomain, projection))
                      : (!targetDomain ||
                          projectionMatchesNode(targetDomain, projection)) &&
                        (!sourceDomain ||
                          projectionMatchesNode(sourceDomain, projection));
                    const targetPalette = hierarchyBranch
                      ? paletteForLayer(hierarchyBranch.layer)
                      : paletteForNode(targetDomain ?? sourceDomain);
                    const isRelatedDomain =
                      link.relationType === "related-domain";
                    const isStructuralDomain =
                      link.relationType === "structural-domain";
                    const isHierarchyBranch =
                      link.relationType === "hierarchy-branch";
                    const isHierarchyMember =
                      link.relationType === "hierarchy-member";
                    return (
                      <line
                        key={`${source.id}-${target.id}`}
                        x1={source.x || 0}
                        y1={source.y || 0}
                        x2={target.x || 0}
                        y2={target.y || 0}
                        opacity={
                          prominent
                            ? isRelatedDomain
                              ? 0.38
                              : isStructuralDomain
                                ? 0.48
                                : isHierarchyBranch
                                  ? 0.78
                                  : isHierarchyMember
                                    ? 0.58
                                    : 0.5
                            : 0.06
                        }
                        stroke={targetPalette.solid}
                        strokeDasharray={
                          isRelatedDomain
                            ? "5 7"
                            : isStructuralDomain
                              ? "3 5"
                              : undefined
                        }
                        strokeWidth={link.weight}
                        vectorEffect="non-scaling-stroke"
                      />
                    );
                  })}

                {/* named hierarchy branches */}
                {simNodes
                  .filter((node) => node.isHierarchyGroup)
                  .map((node) => {
                    const branch = node.data as AtlasHierarchyBranch;
                    const palette = paletteForLayer(branch.layer);
                    const prominent =
                      projection === "domains" ||
                      branch.nodeIds.some((nodeId) => {
                        const branchNode = nodes.find(
                          (candidate) => candidate.id === nodeId,
                        );
                        return Boolean(
                          branchNode &&
                            projectionMatchesNode(branchNode, projection),
                        );
                      });
                    const lines = fitMapLabel(branch.label, 20, 2);
                    return (
                      <g
                        aria-hidden="true"
                        key={node.id}
                        opacity={prominent ? 1 : 0.16}
                        transform={`translate(${node.x ?? 0} ${node.y ?? 0})`}
                      >
                        <title>{branch.description}</title>
                        <rect
                          fill="var(--color-background)"
                          height="58"
                          rx="4"
                          stroke={palette.solid}
                          strokeDasharray="3 4"
                          strokeWidth="1.5"
                          width="172"
                          x="-86"
                          y="-29"
                        />
                        <text
                          dominantBaseline="middle"
                          fill={palette.ink}
                          fontSize="16"
                          fontWeight="750"
                          textAnchor="middle"
                        >
                          {lines.map((line, index) => (
                            <tspan
                              dy={
                                lines.length === 1
                                  ? 0
                                  : index === 0
                                    ? "-0.55em"
                                    : "1.15em"
                              }
                              key={line}
                              x="0"
                            >
                              {line}
                            </tspan>
                          ))}
                        </text>
                      </g>
                    );
                  })}

                {/* child satellite nodes */}
                {simNodes
                  .filter(
                    (n) =>
                      isSingleView &&
                      n.isFacet &&
                      activeNodeId !== "identity" &&
                      n.parent === activeNodeId,
                  )
                  .map((n) => {
                    const child = n.data as string;
                    const parentNode = nodes.find(
                      (node) => node.id === n.parent,
                    );
                    const parentPalette = paletteForNode(parentNode);
                    const prominent = parentNode
                      ? projectionMatchesNode(parentNode, projection)
                      : true;
                    const lines = fitMapLabel(child, 14, 3);
                    const parentId = n.parent ?? active?.id ?? "identity";
                    const selected = isSelectedFacet(child, parentId);

                    return (
                      <g
                        key={n.id}
                        className="cursor-pointer focus:outline-none focus-visible:opacity-80"
                        opacity={prominent ? 1 : 0.14}
                        role="button"
                        tabIndex={0}
                        aria-label={`${
                          selected ? "Selected facet" : "Inspect"
                        } ${child} within ${
                          parentNode?.label ?? "the selected domain"
                        }`}
                        aria-pressed={selected}
                        onPointerDown={(e) => handlePointerDownNode(e, n)}
                        onPointerMove={(e) => handlePointerMoveNode(e, n)}
                        onPointerUp={(e) => handlePointerUpNode(e, n)}
                        onClick={() => handleFacetClick(child, parentId)}
                        onKeyDown={(event) =>
                          handleFacetKeyDown(event, child, parentId)
                        }
                      >
                        <circle
                          cx={n.x || 0}
                          cy={n.y || 0}
                          r={n.radius}
                          fill={
                            selected ? "var(--color-muted)" : parentPalette.soft
                          }
                          stroke={
                            selected
                              ? "var(--color-primary)"
                              : parentPalette.solid
                          }
                          strokeWidth={selected ? "3" : "1.2"}
                          className="transition-transform hover:scale-105"
                        />
                        <text
                          x={n.x || 0}
                          y={n.y || 0}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="15"
                          fontWeight="750"
                          fill="var(--color-foreground)"
                          className="pointer-events-none font-sans"
                        >
                          {lines.length === 1 && (
                            <tspan x={n.x || 0} dy="0">
                              {lines[0]}
                            </tspan>
                          )}
                          {lines.length === 2 && (
                            <>
                              <tspan x={n.x || 0} dy="-0.6em">
                                {lines[0]}
                              </tspan>
                              <tspan x={n.x || 0} dy="1.2em">
                                {lines[1]}
                              </tspan>
                            </>
                          )}
                          {lines.length === 3 && (
                            <>
                              <tspan x={n.x || 0} dy="-1.1em">
                                {lines[0]}
                              </tspan>
                              <tspan x={n.x || 0} dy="1.1em">
                                {lines[1]}
                              </tspan>
                              <tspan x={n.x || 0} dy="1.1em">
                                {lines[2]}
                              </tspan>
                            </>
                          )}
                        </text>
                      </g>
                    );
                  })}

                {/* satellite artifacts in full map view */}
                {simNodes
                  .filter(
                    (n) =>
                      isSingleView &&
                      n.isArtifact &&
                      activeNodeId !== "identity" &&
                      typeof n.parent === "string" &&
                      n.parent.startsWith(`${activeNodeId}-`),
                  )
                  .map((n) => {
                    const artifact = n.data as ArtifactRef;
                    return (
                      <motion.g
                        key={n.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/artifact/${n.slug}`);
                        }}
                        className="cursor-pointer"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <circle
                          cx={n.x || 0}
                          cy={n.y || 0}
                          r={14}
                          fill="transparent"
                        />
                        {artifact.mapIcon ? (
                          <text
                            x={n.x || 0}
                            y={n.y || 0}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="16"
                            fill={artifact.color || "var(--color-primary)"}
                            className="pointer-events-none transition-transform hover:scale-125"
                          >
                            {artifact.mapIcon}
                          </text>
                        ) : (
                          <>
                            <circle
                              cx={n.x || 0}
                              cy={n.y || 0}
                              r={n.radius}
                              fill="var(--color-card)"
                              stroke={artifact.color || "var(--color-primary)"}
                              strokeWidth="1.5"
                            />
                            <circle
                              cx={n.x || 0}
                              cy={n.y || 0}
                              r={4}
                              fill={artifact.color || "var(--color-primary)"}
                            />
                          </>
                        )}
                      </motion.g>
                    );
                  })}
              </motion.g>
            )}

            {isSingleView && active && (
              <motion.g
                key="single-node-decorations"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, type: "spring" }}
              >
                {/* single node topology lines and bubbles */}
                {(() => {
                  const facets = active.facets || [];
                  const count = facets.length;
                  const isMultiRing = count > 10;
                  const innerR = (active.mapR || 80) * 1.1 + 140;
                  const outerR = (active.mapR || 80) * 1.1 + 310;

                  return (
                    <>
                      {/* Concentric orbital guide lines */}
                      {active.displayUI !== "radialpart" &&
                        (isMultiRing ? (
                          <>
                            <circle
                              cx="0"
                              cy="0"
                              r={innerR}
                              fill="none"
                              stroke="#d6d6d0"
                              strokeWidth="1"
                              strokeDasharray="4 5"
                            />
                            <circle
                              cx="0"
                              cy="0"
                              r={outerR}
                              fill="none"
                              stroke="#d6d6d0"
                              strokeWidth="1"
                              strokeDasharray="4 5"
                            />
                          </>
                        ) : (
                          <circle
                            cx="0"
                            cy="0"
                            r={innerR + 20}
                            fill="none"
                            stroke="#d6d6d0"
                            strokeWidth="1"
                            strokeDasharray="4 5"
                          />
                        ))}

                      {active.displayUI === "radialpart"
                        ? (() => {
                            const nodeR = (active.mapR || 80) * 1.38;
                            const denseRing = count > 10;
                            const ringGroups = denseRing
                              ? [
                                  {
                                    facets: facets.filter(
                                      (_, index) => index % 2 === 0,
                                    ),
                                    innerRadius: nodeR + 8,
                                    outerRadius: nodeR + 92,
                                  },
                                  {
                                    facets: facets.filter(
                                      (_, index) => index % 2 === 1,
                                    ),
                                    innerRadius: nodeR + 96,
                                    outerRadius: nodeR + 180,
                                  },
                                ]
                              : [
                                  {
                                    facets,
                                    innerRadius: nodeR + 8,
                                    outerRadius: nodeR + 146,
                                  },
                                ];
                            const radialSegments = ringGroups.flatMap(
                              (ring) => {
                                const pie = d3
                                  .pie<string>()
                                  .value(1)
                                  .sort(null);
                                const generator = d3
                                  .arc<d3.PieArcDatum<string>>()
                                  .innerRadius(ring.innerRadius)
                                  .outerRadius(ring.outerRadius)
                                  .padAngle(0.01)
                                  .cornerRadius(4);
                                return pie(ring.facets).map((arcData) => ({
                                  arcData,
                                  ringInnerR: ring.innerRadius,
                                  ringOuterR: ring.outerRadius,
                                  ringFacetCount: ring.facets.length,
                                  pathData: generator(arcData) || "",
                                }));
                              },
                            );

                            return radialSegments.map((segment) => {
                              const {
                                arcData,
                                ringInnerR,
                                ringOuterR,
                                ringFacetCount,
                                pathData,
                              } = segment;
                              const midR = (ringInnerR + ringOuterR) / 2;
                              const child = arcData.data;
                              const selected = isSelectedFacet(
                                child,
                                active.id,
                              );

                              // Keep labels straight and upright. Curved, tracked
                              // capitals become illegible after the SVG is scaled.
                              const midAngle =
                                (arcData.startAngle + arcData.endAngle) / 2;
                              const isBottom =
                                midAngle > Math.PI / 2 &&
                                midAngle < (3 * Math.PI) / 2;
                              const labelTheta = midAngle - Math.PI / 2;
                              const labelX = Math.cos(labelTheta) * midR;
                              const labelY = Math.sin(labelTheta) * midR;
                              const labelRotation =
                                (midAngle * 180) / Math.PI +
                                (isBottom ? 180 : 0);
                              const ringLabelFontSize =
                                ringFacetCount >= 10 ? 15 : 16;
                              const lineSpacing = ringLabelFontSize + 2;
                              const arcLength =
                                (arcData.endAngle - arcData.startAngle) * midR;
                              const maxCharsPerLine = Math.max(
                                6,
                                Math.floor(
                                  (arcLength - 12) / (ringLabelFontSize * 0.58),
                                ),
                              );
                              const lines = fitMapLabel(
                                child,
                                maxCharsPerLine,
                                denseRing ? 4 : 5,
                              );

                              // Artifacts for this facet
                              const facetArtifacts =
                                active.artifacts?.filter(
                                  (artifact) => artifact.parent === child,
                                ) || [];

                              return (
                                <g key={child}>
                                  <g
                                    className="cursor-pointer transition-opacity hover:opacity-80 focus:outline-none focus-visible:opacity-70"
                                    role="button"
                                    tabIndex={0}
                                    aria-label={`${
                                      selected ? "Selected facet" : "Inspect"
                                    } ${child} within ${active.label}`}
                                    aria-pressed={selected}
                                    onClick={() =>
                                      handleFacetClick(child, active.id)
                                    }
                                    onKeyDown={(event) =>
                                      handleFacetKeyDown(
                                        event,
                                        child,
                                        active.id,
                                      )
                                    }
                                  >
                                    <path
                                      d={pathData}
                                      fill={
                                        selected
                                          ? "var(--color-muted)"
                                          : "var(--color-card)"
                                      }
                                      stroke={
                                        selected
                                          ? "var(--color-primary)"
                                          : "var(--color-border)"
                                      }
                                      strokeWidth={selected ? "3" : "1.5"}
                                    />
                                    <text
                                      className="pointer-events-none font-sans"
                                      dominantBaseline="central"
                                      fill="var(--color-foreground)"
                                      fontSize={ringLabelFontSize}
                                      fontWeight={selected ? "800" : "700"}
                                      textAnchor="middle"
                                      transform={`translate(${labelX} ${labelY}) rotate(${labelRotation})`}
                                    >
                                      {lines.map((line, lineIndex) => (
                                        <tspan
                                          dy={
                                            lineIndex === 0
                                              ? -(
                                                  (lines.length - 1) *
                                                  lineSpacing
                                                ) / 2
                                              : lineSpacing
                                          }
                                          key={`${child}-${line}-${lineIndex}`}
                                          x="0"
                                        >
                                          {line}
                                        </tspan>
                                      ))}
                                    </text>
                                  </g>

                                  {/* Radial Artifacts */}
                                  {facetArtifacts.map((artifact, aIdx) => {
                                    const aOrbitR = ringOuterR + 40 + aIdx * 30;
                                    const ax =
                                      Math.cos(midAngle - Math.PI / 2) *
                                      aOrbitR;
                                    const ay =
                                      Math.sin(midAngle - Math.PI / 2) *
                                      aOrbitR;
                                    return (
                                      <g
                                        key={artifact.id}
                                        className="cursor-pointer"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          router.push(
                                            `/artifact/${artifact.id}`,
                                          );
                                        }}
                                      >
                                        <line
                                          x1={
                                            Math.cos(midAngle - Math.PI / 2) *
                                            ringOuterR
                                          }
                                          y1={
                                            Math.sin(midAngle - Math.PI / 2) *
                                            ringOuterR
                                          }
                                          x2={ax}
                                          y2={ay}
                                          stroke="var(--color-border)"
                                          strokeWidth="1"
                                          strokeDasharray="2 2"
                                        />
                                        {artifact?.mapIcon ? (
                                          <text
                                            x={ax}
                                            y={ay}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                            fontSize="16"
                                            fill={
                                              artifact?.color ||
                                              "var(--color-primary)"
                                            }
                                            className="pointer-events-none transition-transform hover:scale-125"
                                          >
                                            {artifact.mapIcon}
                                          </text>
                                        ) : (
                                          <>
                                            <circle
                                              cx={ax}
                                              cy={ay}
                                              r={12}
                                              fill="var(--color-card)"
                                              stroke={
                                                artifact?.color ||
                                                "var(--color-primary)"
                                              }
                                              strokeWidth="1.5"
                                            />
                                            <circle
                                              cx={ax}
                                              cy={ay}
                                              r={4}
                                              fill={
                                                artifact?.color ||
                                                "var(--color-primary)"
                                              }
                                            />
                                          </>
                                        )}
                                      </g>
                                    );
                                  })}
                                </g>
                              );
                            });
                          })()
                        : facets.map((child, index) => {
                            let orbitR: number;
                            let childRadius: number;
                            let angle: number;

                            if (isMultiRing) {
                              const isOuter = index % 2 === 1;
                              orbitR = isOuter ? outerR : innerR;
                              childRadius = 70;
                              angle =
                                (index / count) * Math.PI * 2 - Math.PI / 2;
                            } else {
                              childRadius = Math.max(
                                70,
                                Math.min(86, 1080 / count),
                              );
                              orbitR = Math.max(
                                (active.mapR || 80) * 1.1 + 160,
                                (count * (childRadius * 2 + 20)) /
                                  (2 * Math.PI),
                              );
                              angle =
                                (index / count) * Math.PI * 2 - Math.PI / 2;
                            }

                            const childX = Math.cos(angle) * orbitR;
                            const childY = Math.sin(angle) * orbitR;

                            const lines = fitMapLabel(
                              child,
                              childRadius >= 70 ? 15 : 13,
                              3,
                            );
                            const fontSize =
                              child.length > 32
                                ? 15
                                : child.length > 22
                                  ? 16
                                  : 17;
                            const selected = isSelectedFacet(child, active.id);

                            return (
                              <g
                                key={child}
                                className="cursor-pointer focus:outline-none focus-visible:opacity-80"
                                role="button"
                                tabIndex={0}
                                aria-label={`${
                                  selected ? "Selected facet" : "Inspect"
                                } ${child} within ${active.label}`}
                                aria-pressed={selected}
                                onClick={() =>
                                  handleFacetClick(child, active.id)
                                }
                                onKeyDown={(event) =>
                                  handleFacetKeyDown(event, child, active.id)
                                }
                              >
                                <line
                                  x1={0}
                                  y1={0}
                                  x2={childX}
                                  y2={childY}
                                  stroke="#b8b8b0"
                                  strokeWidth="1.5"
                                  strokeDasharray="4 4"
                                />
                                <motion.circle
                                  cx={childX}
                                  cy={childY}
                                  r={childRadius}
                                  fill={
                                    selected
                                      ? "var(--color-muted)"
                                      : "var(--color-card)"
                                  }
                                  stroke={
                                    selected
                                      ? "var(--color-primary)"
                                      : "var(--color-foreground)"
                                  }
                                  strokeWidth={selected ? "3" : "1.5"}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                />
                                <text
                                  x={childX}
                                  y={childY}
                                  textAnchor="middle"
                                  dominantBaseline="middle"
                                  fontSize={fontSize}
                                  fontWeight="700"
                                  fill="var(--color-foreground)"
                                  className="pointer-events-none font-sans"
                                >
                                  {lines.length === 1 && (
                                    <tspan x={childX} dy="0">
                                      {lines[0]}
                                    </tspan>
                                  )}
                                  {lines.length === 2 && (
                                    <>
                                      <tspan x={childX} dy="-0.6em">
                                        {lines[0]}
                                      </tspan>
                                      <tspan x={childX} dy="1.2em">
                                        {lines[1]}
                                      </tspan>
                                    </>
                                  )}
                                  {lines.length >= 3 && (
                                    <>
                                      <tspan x={childX} dy="-1.1em">
                                        {lines[0]}
                                      </tspan>
                                      <tspan x={childX} dy="1.1em">
                                        {lines[1]}
                                      </tspan>
                                      <tspan x={childX} dy="1.1em">
                                        {lines.slice(2).join(" ")}
                                      </tspan>
                                    </>
                                  )}
                                </text>

                                {/* Nested Artifacts in Single Node View */}
                                {active.artifacts
                                  ?.filter(
                                    (artifact) => artifact.parent === child,
                                  )
                                  .map((artifact, aIdx, aArr) => {
                                    const aAngle =
                                      (aIdx / aArr.length) * Math.PI * 2;
                                    const aOrbitR = childRadius + 26;
                                    const ax =
                                      childX + Math.cos(aAngle) * aOrbitR;
                                    const ay =
                                      childY + Math.sin(aAngle) * aOrbitR;
                                    return (
                                      <g
                                        key={artifact.id}
                                        className="cursor-pointer"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          router.push(
                                            `/artifact/${artifact.id}`,
                                          );
                                        }}
                                      >
                                        <line
                                          x1={childX}
                                          y1={childY}
                                          x2={ax}
                                          y2={ay}
                                          stroke="#b8b8b0"
                                          strokeWidth="1"
                                          strokeDasharray="2 2"
                                        />
                                        <circle
                                          cx={ax}
                                          cy={ay}
                                          r={14}
                                          fill="transparent"
                                        />
                                        {artifact?.mapIcon ? (
                                          <text
                                            x={ax}
                                            y={ay}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                            fontSize="16"
                                            fill={
                                              artifact?.color ||
                                              "var(--color-primary)"
                                            }
                                            className="pointer-events-none transition-transform hover:scale-125"
                                          >
                                            {artifact.mapIcon}
                                          </text>
                                        ) : (
                                          <>
                                            <circle
                                              cx={ax}
                                              cy={ay}
                                              r={12}
                                              fill="var(--color-card)"
                                              stroke={
                                                artifact?.color ||
                                                "var(--color-primary)"
                                              }
                                              strokeWidth="1.5"
                                            />
                                            <circle
                                              cx={ax}
                                              cy={ay}
                                              r={4}
                                              fill={
                                                artifact?.color ||
                                                "var(--color-primary)"
                                              }
                                            />
                                          </>
                                        )}
                                      </g>
                                    );
                                  })}
                              </g>
                            );
                          })}
                    </>
                  );
                })()}

                {/* Artifacts orbiting the central domain node directly (if facet missing) */}
                {active.artifacts
                  ?.filter(
                    (artifact) => !active.facets?.includes(artifact.parent),
                  )
                  .map((artifact, aIdx, aArr) => {
                    const aAngle = (aIdx / aArr.length) * Math.PI * 2;
                    const aOrbitR = (active.mapR || 80) * 1.1 + 60; // Inner orbit
                    const ax = Math.cos(aAngle) * aOrbitR;
                    const ay = Math.sin(aAngle) * aOrbitR;
                    return (
                      <g
                        key={artifact.id}
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/artifact/${artifact.id}`);
                        }}
                      >
                        <line
                          x1={0}
                          y1={0}
                          x2={ax}
                          y2={ay}
                          stroke="#b8b8b0"
                          strokeWidth="1"
                          strokeDasharray="2 2"
                        />
                        <circle cx={ax} cy={ay} r={14} fill="transparent" />
                        {artifact?.mapIcon ? (
                          <text
                            x={ax}
                            y={ay}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="16"
                            fill={artifact?.color || "var(--color-primary)"}
                            className="pointer-events-none transition-transform hover:scale-125"
                          >
                            {artifact.mapIcon}
                          </text>
                        ) : (
                          <>
                            <circle
                              cx={ax}
                              cy={ay}
                              r={12}
                              fill="var(--color-card)"
                              stroke={artifact?.color || "var(--color-primary)"}
                              strokeWidth="1.5"
                            />
                            <circle
                              cx={ax}
                              cy={ay}
                              r={4}
                              fill={artifact?.color || "var(--color-primary)"}
                            />
                          </>
                        )}
                      </g>
                    );
                  })}
              </motion.g>
            )}
          </AnimatePresence>

          {/* main domain nodes */}
          {simNodes
            .filter((n) => !n.isFacet && !n.isArtifact && !n.isHierarchyGroup)
            .map((simNode) => {
              const n = simNode.data as GraphNode;
              if (isSingleView && n.id !== activeNodeId) return null;

              const cx = isSingleView ? 0 : simNode.x || 0;
              const cy = isSingleView ? 0 : simNode.y || 0;
              const r = isSingleView
                ? (n.mapR || 80) * 1.38
                : simNode.isTheoryRoot
                  ? (n.mapR || 80) * 1.42
                  : simNode.isIdentity
                    ? 74
                    : (n.mapR || 80) * 0.9;
              const selected = n.id === activeNodeId;
              const palette = paletteForNode(n);
              const entityKind = inferEntityKind(
                n,
                n.id === "identity" ? "institution" : "domain",
              );
              const prominent =
                simNode.isTheoryRoot || projectionMatchesNode(n, projection);

              return (
                <motion.g
                  aria-label={
                    isSingleView
                      ? `${n.label} focus map. Activate to return to the atlas`
                      : `Select ${n.label} for map details`
                  }
                  aria-pressed={selected}
                  role="button"
                  tabIndex={0}
                  key={n.id}
                  onPointerDown={(e) => handlePointerDownNode(e, simNode)}
                  onPointerMove={(e) => handlePointerMoveNode(e, simNode)}
                  onPointerUp={(e) => handlePointerUpNode(e, simNode)}
                  onClick={(event) => {
                    event.currentTarget.focus();
                    activateDomainNode(n);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      activateDomainNode(n);
                    }
                  }}
                  className="group cursor-pointer outline-none"
                  initial={{ x: cx, y: cy, opacity: prominent ? 1 : 0.14 }}
                  animate={{ x: cx, y: cy, opacity: prominent ? 1 : 0.14 }}
                  transition={{ type: "spring", stiffness: 90, damping: 20 }}
                >
                  <title>{`${n.label}: ${n.short}`}</title>
                  <path
                    d={semanticShapePath(entityKind, Math.max(r, 80))}
                    fill="transparent"
                    pointerEvents="all"
                    stroke="none"
                  />
                  <path
                    className="pointer-events-none opacity-0 transition-opacity group-focus:opacity-100"
                    d={semanticShapePath(entityKind, Math.max(r + 14, 94))}
                    fill="none"
                    stroke="var(--color-foreground)"
                    strokeWidth="4"
                    vectorEffect="non-scaling-stroke"
                  />
                  <motion.path
                    animate={{ scale: 1 }}
                    d={semanticShapePath(entityKind, r)}
                    fill={palette.soft}
                    initial={{ scale: 0.92 }}
                    stroke={
                      selected ? "var(--color-foreground)" : palette.solid
                    }
                    strokeDasharray={entityDashArray(entityKind)}
                    strokeWidth={selected ? 3.5 : 2}
                    transition={{ type: "spring", stiffness: 90, damping: 20 }}
                    vectorEffect="non-scaling-stroke"
                  />
                  {(!isSingleView || n.displayUI !== "radialpart") && (
                    <motion.path
                      animate={{ opacity: selected ? 0.46 : 0.16 }}
                      d={semanticShapePath(entityKind, r + 8)}
                      fill="none"
                      initial={{ opacity: 0 }}
                      stroke={palette.solid}
                      strokeDasharray={entityDashArray(entityKind)}
                      strokeWidth="1.5"
                      transition={{
                        type: "spring",
                        stiffness: 90,
                        damping: 20,
                      }}
                      vectorEffect="non-scaling-stroke"
                    />
                  )}
                  <motion.foreignObject
                    initial={{
                      x: -r,
                      y: -r,
                      width: r * 2,
                      height: r * 2,
                    }}
                    animate={{
                      x: -r,
                      y: -r,
                      width: r * 2,
                      height: r * 2,
                    }}
                    transition={{ type: "spring", stiffness: 90, damping: 20 }}
                    className="pointer-events-none"
                  >
                    <div
                      className={`flex h-full w-full flex-col items-center justify-center text-center ${
                        isSingleView ? "p-3" : "p-2.5"
                      }`}
                    >
                      {!isSingleView &&
                      (simNode.isTheoryRoot || simNode.isIdentity) ? (
                        <div className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] opacity-70">
                          {simNode.isTheoryRoot
                            ? "Theoretical core"
                            : "Public steward"}
                        </div>
                      ) : null}
                      <div
                        className={`${
                          isSingleView
                            ? "mb-1.5 text-2xl"
                            : simNode.isTheoryRoot
                              ? "mb-1 text-3xl"
                              : "mb-1 text-xl"
                        } leading-none`}
                        style={{ color: palette.solid }}
                      >
                        {n.mapIcon}
                      </div>
                      <div
                        className="font-sans font-bold leading-[1.08]"
                        style={{
                          color: palette.ink,
                          fontSize: isSingleView
                            ? n.label.length > 36
                              ? 18
                              : n.label.length > 24
                                ? 20
                                : 22
                            : simNode.isTheoryRoot
                              ? 28
                              : n.label.length > 36
                                ? 17
                                : n.label.length > 24
                                  ? 19
                                  : 21,
                          textWrap: "balance",
                        }}
                      >
                        {n.label}
                      </div>
                      {isSingleView ? (
                        <div
                          className="mt-1 font-medium leading-[1.15] opacity-100"
                          data-map-description
                          style={{
                            display: "-webkit-box",
                            fontSize: 15,
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 4,
                            overflow: "hidden",
                          }}
                        >
                          {n.short}
                        </div>
                      ) : null}
                    </div>
                  </motion.foreignObject>
                </motion.g>
              );
            })}
        </g>
      </svg>

      <div className="absolute bottom-6 right-6 flex flex-col items-end gap-2 xl:bottom-12">
        <div className="flex min-h-11 overflow-hidden rounded-sm border border-border bg-background/90 font-mono text-xs font-semibold uppercase tracking-[0.08em] backdrop-blur-sm">
          <button
            aria-label="Zoom out"
            onClick={handleZoomOut}
            className="min-w-11 px-3 py-2 hover:bg-muted transition-colors text-foreground"
          >
            −
          </button>
          <button
            aria-label="Reset zoom"
            onClick={handleZoomReset}
            className="border-x border-border px-4 py-2 hover:bg-muted transition-colors text-foreground"
          >
            {Math.round(zoom * 100)}%
          </button>
          <button
            aria-label="Zoom in"
            onClick={handleZoomIn}
            className="min-w-11 px-3 py-2 hover:bg-muted transition-colors text-foreground"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
