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
  relation: string;
  kind: LabMachineEdge["kind"];
  direction: "inbound" | "outbound";
  otherId: string;
  otherLabel: string;
};

type AlignedCardView = {
  key: string;
  sourceId: string;
  sourceLabel: string;
  sourceTone: string;
  top: number;
  height: number;
  relations: CardRelation[];
};

type CardStyle = CSSProperties & {
  "--bf-relation-source-tone": string;
};

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
        relation: edge.relation,
        kind: edge.kind,
        direction,
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
      || card.top !== other.top
      || card.height !== other.height
      || card.relations.length !== other.relations.length
    ) {
      return false;
    }

    return card.relations.every((relation, relationIndex) => relation.key === other.relations[relationIndex]?.key);
  });
}

export function MobileMachineStructureLayer({ resolution }: { resolution: LabMachineResolution }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const [latchedOpen, setLatchedOpen] = useState(false);
  const [transientOpen, setTransientOpen] = useState(false);
  const [discoveryDismissed, setDiscoveryDismissed] = useState(false);
  const [alignedCards, setAlignedCards] = useState<AlignedCardView[]>([]);
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
      const cards = Array.from(new Set([...nodeCards, ...tourCards]))
        .filter((card) => {
          const style = window.getComputedStyle(card);
          return card.getClientRects().length > 0 && style.display !== "none" && style.visibility !== "hidden";
        });

      const gutterRect = gutter.getBoundingClientRect();
      if (gutterRect.height <= 0) return;

      const nextCards = cards.flatMap<AlignedCardView>((card) => {
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
        // portion enters the viewport, the gutter mirrors exactly that visible span.
        if (visibleHeight < 28) return [];

        const sourceTone = window.getComputedStyle(card).getPropertyValue("--tone").trim()
          || (sourceId === "tour" ? "#98f24d" : "#8eb8cc");

        return [{
          key: sourceId,
          sourceId,
          sourceLabel,
          sourceTone,
          top: Math.round(visibleTop - gutterRect.top),
          height: Math.round(visibleHeight),
          relations: sourceId === "tour" ? [] : relationsFor(sourceId),
        }];
      }).sort((left, right) => left.top - right.top);

      setAlignedCards((current) => sameCards(current, nextCards) ? current : nextCards);
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
            const hiddenRelationCount = Math.max(0, card.relations.length - 1);
            const style: CardStyle = {
              top: card.top,
              height: card.height,
              "--bf-relation-source-tone": card.sourceTone,
            };
            const arrow = primary?.direction === "inbound" ? "<-" : "->";

            return (
              <div
                className="bf-mobile-machine-structure__relation"
                data-source-id={card.sourceId}
                data-placeholder={primary ? "false" : "true"}
                data-direction={primary?.direction ?? "none"}
                data-kind={primary?.kind ?? "none"}
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
