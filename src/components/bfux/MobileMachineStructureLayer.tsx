"use client";

import { useCallback, useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { Network } from "lucide-react";
import { getLabMachineNode, labMachineEdges, type LabMachineEdge } from "./lab-machine-model";
import type { LabMachineResolution } from "./LabMachine";
import { useMobileStructureHoldReveal } from "./useMobileStructureHoldReveal";
import "./mobile-machine-structure.css";
import "./mobile-machine-structure-aligned.css";

const relationDiscoveryKey = "bfl:mobile-relation-discovery-dismissed";

type CardRelation = {
  key: string;
  edgeKey: string;
  relation: string;
  kind: LabMachineEdge["kind"];
  direction: "inbound" | "outbound";
  fromId: string;
  toId: string;
  otherId: string;
  otherLabel: string;
};

type DetailLevel = "compact" | "near" | "focus";

type AlignedCardView = {
  key: string;
  sourceId: string;
  sourceLabel: string;
  sourceTone: string;
  anchor: number;
  focus: number;
  detailLevel: DetailLevel;
  relations: CardRelation[];
};

type PipeSeed = {
  key: string;
  tone: string;
  focus: number;
  fromId: string;
  toId: string;
  fromRect: DOMRect;
  toRect: DOMRect;
};

type PipeView = {
  key: string;
  tone: string;
  focus: number;
  fromId: string;
  toId: string;
  fromX: number;
  fromY: number;
  busX: number;
  toX: number;
  toY: number;
};

type CardStyle = CSSProperties & {
  "--bf-relation-source-tone": string;
  "--bf-focus": string;
  "--bf-card-scale": string;
  "--bf-card-opacity": string;
  "--bf-card-z": string;
  "--bf-focus-glow": string;
};

type PipeStyle = CSSProperties & {
  "--bf-pipe-tone": string;
  "--bf-pipe-opacity": string;
  "--bf-pipe-width": string;
};

function clamp(value: number, minimum: number, maximum: number) {
  return Math.max(minimum, Math.min(maximum, value));
}

function smoothstep(value: number) {
  const normalized = clamp(value, 0, 1);
  return normalized * normalized * (3 - 2 * normalized);
}

function detailLevelFor(focus: number): DetailLevel {
  if (focus >= 0.72) return "focus";
  if (focus >= 0.34) return "near";
  return "compact";
}

function relationsFor(sourceId: string): CardRelation[] {
  return labMachineEdges
    .filter((edge) => edge.from === sourceId || edge.to === sourceId)
    .flatMap<CardRelation>((edge) => {
      const direction: CardRelation["direction"] = edge.from === sourceId ? "outbound" : "inbound";
      const otherId = direction === "outbound" ? edge.to : edge.from;
      const other = getLabMachineNode(otherId);
      if (!other) return [];

      return [{
        key: `${edge.from}->${edge.to}:${sourceId}`,
        edgeKey: `${edge.from}->${edge.to}:${edge.relation}`,
        relation: edge.relation,
        kind: edge.kind,
        direction,
        fromId: edge.from,
        toId: edge.to,
        otherId,
        otherLabel: other.label,
      }];
    })
    .sort((left, right) => Number(right.direction === "outbound") - Number(left.direction === "outbound"));
}

function sameCards(left: AlignedCardView[], right: AlignedCardView[]) {
  return left.length === right.length && left.every((card, index) => {
    const other = right[index];
    if (!other) return false;
    if (
      card.sourceId !== other.sourceId
      || card.sourceTone !== other.sourceTone
      || card.anchor !== other.anchor
      || card.focus !== other.focus
      || card.detailLevel !== other.detailLevel
      || card.relations.length !== other.relations.length
    ) {
      return false;
    }

    return card.relations.every((relation, relationIndex) => relation.key === other.relations[relationIndex]?.key);
  });
}

function samePipes(left: PipeView[], right: PipeView[]) {
  return left.length === right.length && left.every((pipe, index) => {
    const other = right[index];
    return Boolean(other)
      && pipe.key === other.key
      && pipe.tone === other.tone
      && pipe.focus === other.focus
      && pipe.fromX === other.fromX
      && pipe.fromY === other.fromY
      && pipe.busX === other.busX
      && pipe.toX === other.toX
      && pipe.toY === other.toY;
  });
}

export function MobileMachineStructureLayer({ resolution }: { resolution: LabMachineResolution }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const pipeArrowId = `${panelId.replace(/:/g, "")}-pipe-arrow`;
  const [latchedOpen, setLatchedOpen] = useState(false);
  const [transientOpen, setTransientOpen] = useState(false);
  const [discoveryDismissed, setDiscoveryDismissed] = useState(false);
  const [alignedCards, setAlignedCards] = useState<AlignedCardView[]>([]);
  const [pipes, setPipes] = useState<PipeView[]>([]);
  const open = latchedOpen || transientOpen;

  useEffect(() => {
    try {
      if (window.localStorage.getItem(relationDiscoveryKey) === "true") {
        setDiscoveryDismissed(true);
      }
    } catch {
      // Storage is optional; the interaction still works without persistence.
    }
  }, []);

  const dismissDiscovery = useCallback(() => {
    setDiscoveryDismissed(true);
    try {
      window.localStorage.setItem(relationDiscoveryKey, "true");
    } catch {
      // Ignore storage failures and keep the in-memory dismissal.
    }
  }, []);

  const handleTransientChange = useCallback((active: boolean) => {
    setTransientOpen(active);
    if (active) dismissDiscovery();
  }, [dismissDiscovery]);

  useMobileStructureHoldReveal({
    targetSelector: ".physical-machine-experience__machine-stack",
    enabled: !latchedOpen,
    onTransientChange: handleTransientChange,
  });

  useEffect(() => {
    if (!open) {
      setAlignedCards([]);
      setPipes([]);
      return;
    }

    const experience = rootRef.current?.closest<HTMLElement>(".physical-machine-experience");
    const gutter = rootRef.current?.querySelector<HTMLElement>(".bf-mobile-machine-structure__gutter");
    if (!experience || !gutter) return;

    let frame = 0;

    const measure = () => {
      frame = 0;

      const nodeCards = Array.from(
        experience.querySelectorAll<HTMLElement>(
          '.bf-machine__apparatus > .bf-machine-node[data-node-id]',
        ),
      );
      const tourCards = Array.from(
        experience.querySelectorAll<HTMLElement>(".bf-machine-tour-card"),
      );
      const projectedCards = Array.from(new Set([...nodeCards, ...tourCards]))
        .filter((card) => {
          const style = window.getComputedStyle(card);
          return card.getClientRects().length > 0 && style.display !== "none" && style.visibility !== "hidden";
        });

      const cardById = new Map<string, HTMLElement>();
      for (const card of projectedCards) {
        if (card.classList.contains("bf-machine-tour-card")) {
          cardById.set("tour", card);
          continue;
        }
        const nodeId = card.dataset.nodeId;
        if (nodeId) cardById.set(nodeId, card);
      }

      const gutterRect = gutter.getBoundingClientRect();
      if (gutterRect.height <= 0) return;

      const focalY = gutterRect.top + gutterRect.height * 0.48;
      const focusRadius = Math.max(130, gutterRect.height * 0.5);

      const nextCards = projectedCards.flatMap<AlignedCardView>((card) => {
        const isTour = card.classList.contains("bf-machine-tour-card");
        const sourceId = isTour ? "tour" : card.dataset.nodeId;
        if (!sourceId) return [];

        const sourceNode = sourceId === "tour" ? null : getLabMachineNode(sourceId);
        const sourceLabel = sourceId === "tour" ? "Tour" : sourceNode?.label ?? sourceId;
        const rect = card.getBoundingClientRect();
        const visibleTop = Math.max(rect.top, gutterRect.top);
        const visibleBottom = Math.min(rect.bottom, gutterRect.bottom);
        const visibleHeight = visibleBottom - visibleTop;

        // Tiny edge slivers are not useful as paired cards. Once a meaningful
        // portion enters the viewport, its visible center becomes the rail anchor.
        if (visibleHeight < 28) return [];

        const visibleCenter = visibleTop + visibleHeight / 2;
        const safeAnchor = Math.round(clamp(visibleCenter - gutterRect.top, 24, gutterRect.height - 24));
        const rawFocus = 1 - Math.abs(visibleCenter - focalY) / focusRadius;
        const focus = Math.round(smoothstep(rawFocus) * 100) / 100;
        const sourceTone = window.getComputedStyle(card).getPropertyValue("--tone").trim()
          || (sourceId === "tour" ? "#98f24d" : "#8eb8cc");

        return [{
          key: sourceId,
          sourceId,
          sourceLabel,
          sourceTone,
          anchor: safeAnchor,
          focus,
          detailLevel: detailLevelFor(focus),
          relations: sourceId === "tour" ? [] : relationsFor(sourceId),
        }];
      }).sort((left, right) => left.anchor - right.anchor);

      const visibleCardIds = new Set(nextCards.map((card) => card.sourceId));
      const focusById = new Map(nextCards.map((card) => [card.sourceId, card.focus] as const));

      // Pipes describe topology, not just the cards currently mirrored in the
      // gutter. Keep an edge alive when either endpoint is visible and the other
      // endpoint still belongs to the current machine projection. This lets a
      // relation such as About -> Research continue into the viewport after the
      // About card itself has scrolled away.
      const pipeSeeds = labMachineEdges.flatMap<PipeSeed>((edge) => {
        const fromCard = cardById.get(edge.from);
        const toCard = cardById.get(edge.to);
        if (!fromCard || !toCard) return [];
        if (!visibleCardIds.has(edge.from) && !visibleCardIds.has(edge.to)) return [];

        const peripheralId = edge.from === "research"
          ? edge.to
          : edge.to === "research"
            ? edge.from
            : edge.from;
        const toneCard = cardById.get(peripheralId) ?? fromCard;
        const tone = window.getComputedStyle(toneCard).getPropertyValue("--tone").trim() || "#8eb8cc";
        const focus = Math.max(focusById.get(edge.from) ?? 0.12, focusById.get(edge.to) ?? 0.12);

        return [{
          key: `${edge.from}->${edge.to}:${edge.relation}`,
          tone,
          focus,
          fromId: edge.from,
          toId: edge.to,
          fromRect: fromCard.getBoundingClientRect(),
          toRect: toCard.getBoundingClientRect(),
        }];
      });

      // Shared nodes need physical ports of their own. Fan incident edges across
      // a bounded segment of the card edge so multiple Research connections do
      // not paint the same horizontal segment on top of one another.
      const incidentsByNode = new Map<string, Array<{ key: string; otherY: number }>>();
      const addIncident = (nodeId: string, key: string, otherY: number) => {
        const incidents = incidentsByNode.get(nodeId) ?? [];
        incidents.push({ key, otherY });
        incidentsByNode.set(nodeId, incidents);
      };

      for (const seed of pipeSeeds) {
        addIncident(seed.fromId, seed.key, seed.toRect.top + seed.toRect.height / 2);
        addIncident(seed.toId, seed.key, seed.fromRect.top + seed.fromRect.height / 2);
      }

      const portYByEdgeNode = new Map<string, number>();
      for (const [nodeId, incidents] of incidentsByNode) {
        const card = cardById.get(nodeId);
        if (!card) continue;

        const rect = card.getBoundingClientRect();
        const sorted = [...incidents].sort((left, right) =>
          left.otherY - right.otherY || left.key.localeCompare(right.key),
        );
        const usableSpread = Math.max(0, Math.min(64, rect.height - 24));
        const startY = rect.top + rect.height / 2 - usableSpread / 2;

        sorted.forEach((incident, index) => {
          const y = sorted.length === 1
            ? rect.top + rect.height / 2
            : startY + usableSpread * (index / (sorted.length - 1));
          portYByEdgeNode.set(`${incident.key}:${nodeId}`, Math.round(y * 10) / 10);
        });
      }

      // Give every visible local edge an independent vertical bus lane. Longer
      // spans use the outer lanes, producing a nested fan rather than coincident
      // trunks. Endpoint port fan-out above removes the remaining shared segments.
      const rightmostCardEdge = pipeSeeds.reduce(
        (rightmost, seed) => Math.max(rightmost, seed.fromRect.right, seed.toRect.right),
        0,
      );
      const busRight = gutterRect.left - 4;
      const busLeft = Math.min(rightmostCardEdge + 5, busRight - 2);
      const laneOrder = [...pipeSeeds].sort((left, right) => {
        const leftSpan = Math.abs(
          (portYByEdgeNode.get(`${left.key}:${left.toId}`) ?? left.toRect.top + left.toRect.height / 2)
          - (portYByEdgeNode.get(`${left.key}:${left.fromId}`) ?? left.fromRect.top + left.fromRect.height / 2),
        );
        const rightSpan = Math.abs(
          (portYByEdgeNode.get(`${right.key}:${right.toId}`) ?? right.toRect.top + right.toRect.height / 2)
          - (portYByEdgeNode.get(`${right.key}:${right.fromId}`) ?? right.fromRect.top + right.fromRect.height / 2),
        );
        return rightSpan - leftSpan || left.key.localeCompare(right.key);
      });
      const laneXByEdge = new Map<string, number>();
      const busSpan = Math.max(2, busRight - busLeft);

      laneOrder.forEach((seed, index) => {
        const fraction = laneOrder.length === 1
          ? 0.5
          : (laneOrder.length - index) / (laneOrder.length + 1);
        laneXByEdge.set(seed.key, Math.round((busLeft + busSpan * fraction) * 10) / 10);
      });

      const nextPipes = pipeSeeds.map<PipeView>((seed) => ({
        key: seed.key,
        tone: seed.tone,
        focus: seed.focus,
        fromId: seed.fromId,
        toId: seed.toId,
        fromX: Math.round((seed.fromRect.right + 1) * 10) / 10,
        fromY: portYByEdgeNode.get(`${seed.key}:${seed.fromId}`)
          ?? Math.round((seed.fromRect.top + seed.fromRect.height / 2) * 10) / 10,
        busX: laneXByEdge.get(seed.key) ?? Math.round((gutterRect.left - 8) * 10) / 10,
        toX: Math.round((seed.toRect.right + 1) * 10) / 10,
        toY: portYByEdgeNode.get(`${seed.key}:${seed.toId}`)
          ?? Math.round((seed.toRect.top + seed.toRect.height / 2) * 10) / 10,
      })).sort((left, right) => left.fromY - right.fromY || left.key.localeCompare(right.key));

      setAlignedCards((current) => sameCards(current, nextCards) ? current : nextCards);
      setPipes((current) => samePipes(current, nextPipes) ? current : nextPipes);
    };

    const scheduleMeasure = () => {
      if (frame !== 0) return;
      frame = window.requestAnimationFrame(measure);
    };

    const observer = new ResizeObserver(scheduleMeasure);
    observer.observe(experience);
    observer.observe(gutter);

    scheduleMeasure();
    window.addEventListener("scroll", scheduleMeasure, { passive: true, capture: true });
    window.addEventListener("resize", scheduleMeasure);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleMeasure, { capture: true });
      window.removeEventListener("resize", scheduleMeasure);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, [discoveryDismissed, open, resolution]);

  const revealMode = latchedOpen ? "latched" : transientOpen ? "transient" : "closed";

  return (
    <div
      className="bf-mobile-machine-structure"
      data-open={open ? "true" : "false"}
      data-reveal-mode={revealMode}
      data-resolution={resolution}
      data-card-count={alignedCards.length}
      data-discovery-dismissed={discoveryDismissed ? "true" : "false"}
      ref={rootRef}
    >
      {!discoveryDismissed ? (
        <button
          className="bf-mobile-machine-structure__toggle"
          type="button"
          aria-expanded={open}
          aria-pressed={latchedOpen}
          aria-controls={panelId}
          aria-label={latchedOpen
            ? "Hide the mobile relation gutter"
            : "Reveal the mobile relation gutter. Press and hold the machine to reveal it transiently."}
          onClick={() => {
            setTransientOpen(false);
            if (latchedOpen) {
              setLatchedOpen(false);
              dismissDiscovery();
              return;
            }
            setLatchedOpen(true);
          }}
        >
          <Network aria-hidden="true" />
          <span>
            <small>{resolution === "focus" ? "CORE · HOLD" : "FULL · HOLD"}</small>
            <strong>Relations</strong>
          </span>
          <b>{latchedOpen ? "Hide" : "Reveal"}</b>
        </button>
      ) : null}

      {open && pipes.length > 0 ? (
        <svg
          className="bf-mobile-machine-structure__pipes"
          aria-hidden="true"
        >
          <defs>
            <marker
              id={pipeArrowId}
              markerWidth="7"
              markerHeight="7"
              refX="6"
              refY="3.5"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0 0 L7 3.5 L0 7 z" fill="context-stroke" />
            </marker>
          </defs>
          {pipes.map((pipe) => {
            const style: PipeStyle = {
              "--bf-pipe-tone": pipe.tone,
              "--bf-pipe-opacity": String(0.34 + pipe.focus * 0.58),
              "--bf-pipe-width": String(1 + pipe.focus * 0.8),
            };
            const path = `M ${pipe.fromX} ${pipe.fromY} H ${pipe.busX} V ${pipe.toY} H ${pipe.toX}`;

            return (
              <g
                className="bf-mobile-machine-structure__pipe"
                data-from-id={pipe.fromId}
                data-to-id={pipe.toId}
                key={pipe.key}
                style={style}
              >
                <path d={path} markerEnd={`url(#${pipeArrowId})`} />
                <circle cx={pipe.busX} cy={pipe.fromY} r="3.25" />
                <circle cx={pipe.busX} cy={pipe.toY} r="3.25" />
              </g>
            );
          })}
        </svg>
      ) : null}

      <aside
        className="bf-mobile-machine-structure__gutter"
        id={panelId}
        aria-label="Visible machine cards mirrored with their local relations"
        aria-hidden={!open}
      >
        <div
          className="bf-mobile-machine-structure__relations"
          data-empty={alignedCards.length === 0 ? "true" : "false"}
        >
          {alignedCards.map((card) => {
            const primary = card.relations[0];
            const secondary = card.relations.slice(1, 3);
            const hiddenRelationCount = Math.max(0, card.relations.length - 1 - secondary.length);
            const cardScale = 0.96 + card.focus * 0.05;
            const style: CardStyle = {
              top: card.anchor,
              "--bf-relation-source-tone": card.sourceTone,
              "--bf-focus": String(card.focus),
              "--bf-card-scale": cardScale.toFixed(3),
              "--bf-card-opacity": String(0.68 + card.focus * 0.32),
              "--bf-card-z": String(1 + Math.round(card.focus * 10)),
              "--bf-focus-glow": `${Math.round(3 + card.focus * 5)}px`,
            };
            const arrow = primary?.direction === "inbound" ? "<-" : "->";

            return (
              <div
                className="bf-mobile-machine-structure__relation"
                data-source-id={card.sourceId}
                data-placeholder={primary ? "false" : "true"}
                data-direction={primary?.direction ?? "none"}
                data-kind={primary?.kind ?? "none"}
                data-detail-level={card.detailLevel}
                key={card.key}
                style={style}
                aria-label={primary
                  ? `${card.sourceLabel}: ${primary.relation} ${primary.otherLabel}`
                  : `${card.sourceLabel}: no local relation in this projection`}
              >
                <i aria-hidden="true" />
                <strong className="bf-mobile-machine-structure__source">
                  {card.sourceLabel}
                </strong>

                {primary ? (
                  <div className="bf-mobile-machine-structure__detail">
                    <small>{primary.relation}</small>
                    <span>
                      <b aria-hidden="true">{arrow}</b>
                      {primary.otherLabel}
                    </span>
                  </div>
                ) : (
                  <div className="bf-mobile-machine-structure__placeholder" aria-hidden="true">
                    <small>{card.sourceId === "tour" ? "START HERE" : "NO LOCAL RELATION"}</small>
                    <span>—</span>
                  </div>
                )}

                {secondary.length > 0 ? (
                  <div className="bf-mobile-machine-structure__secondary">
                    {secondary.map((relation) => (
                      <span key={relation.key}>
                        <small>{relation.relation}</small>
                        <b aria-hidden="true">{relation.direction === "inbound" ? "<-" : "->"}</b>
                        <strong>{relation.otherLabel}</strong>
                      </span>
                    ))}
                  </div>
                ) : null}

                {hiddenRelationCount > 0 ? (
                  <em>+{hiddenRelationCount}</em>
                ) : null}
              </div>
            );
          })}
        </div>
      </aside>
    </div>
  );
}
