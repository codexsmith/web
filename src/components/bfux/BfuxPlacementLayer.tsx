"use client";

import { useEffect, useMemo, useState, type CSSProperties, type DragEvent as ReactDragEvent, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import {
  BfuxPartGlyph,
  bfuxPartTransferType,
  getBfuxPartDefinition,
  type BfuxPartDefinition,
  type BfuxPartKind,
} from "./BfuxPartsBox";
import "./bfux-placement-layer.css";

const apparatusSelector = '.bf-machine[data-skin="physical"] [data-machine-layer="apparatus"]';
const placementTransferType = "application/x-bfux-placement";
const placementStorageKey = "bfl_bfux_placed_parts_v1";
const maxPlacedParts = 64;

export type BfuxPlacementResolution = "focus" | "mid";

export type BfuxPlacedPart = {
  instanceId: string;
  partId: string;
  x: number;
  y: number;
};

type SavedPlacements = Partial<Record<BfuxPlacementResolution, BfuxPlacedPart[]>>;

type PartSize = {
  width: number;
  height: number;
};

function partSize(kind: BfuxPartKind): PartSize {
  switch (kind) {
    case "port":
      return { width: 58, height: 58 };
    case "tube":
      return { width: 112, height: 52 };
    case "elbow":
      return { width: 82, height: 76 };
    case "extended":
      return { width: 96, height: 62 };
    case "module":
      return { width: 112, height: 78 };
    case "module-wide":
      return { width: 152, height: 78 };
    default:
      return { width: 72, height: 62 };
  }
}

function readPlacements(): SavedPlacements {
  try {
    const raw = window.localStorage.getItem(placementStorageKey);
    return raw ? (JSON.parse(raw) as SavedPlacements) : {};
  } catch {
    return {};
  }
}

function writePlacements(saved: SavedPlacements) {
  try {
    window.localStorage.setItem(placementStorageKey, JSON.stringify(saved));
  } catch {
    // Placement remains functional for the active editing session if storage is blocked.
  }
}

function newInstanceId(partId: string) {
  const suffix = typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  return `${partId}:${suffix}`;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function acceptedTransfer(dataTransfer: DataTransfer) {
  const types = Array.from(dataTransfer.types);
  return types.includes(bfuxPartTransferType) || types.includes(placementTransferType);
}

function parsePartTransfer(dataTransfer: DataTransfer) {
  const raw = dataTransfer.getData(bfuxPartTransferType);
  if (!raw) return null;
  try {
    const payload = JSON.parse(raw) as { schema?: string; id?: string };
    if (payload.schema !== "bfux.part/v1" || typeof payload.id !== "string") return null;
    return getBfuxPartDefinition(payload.id);
  } catch {
    return null;
  }
}

function parsePlacementTransfer(dataTransfer: DataTransfer) {
  const raw = dataTransfer.getData(placementTransferType);
  if (!raw) return null;
  try {
    const payload = JSON.parse(raw) as {
      schema?: string;
      instanceId?: string;
      grabX?: number;
      grabY?: number;
    };
    if (payload.schema !== "bfux.placement/v1" || typeof payload.instanceId !== "string") return null;
    return {
      instanceId: payload.instanceId,
      grabX: typeof payload.grabX === "number" ? payload.grabX : null,
      grabY: typeof payload.grabY === "number" ? payload.grabY : null,
    };
  } catch {
    return null;
  }
}

function pointForDrop(
  host: HTMLElement,
  event: DragEvent,
  size: PartSize,
  grab: { x: number | null; y: number | null } | null,
) {
  const rect = host.getBoundingClientRect();
  const localWidth = host.offsetWidth || rect.width;
  const localHeight = host.offsetHeight || rect.height;
  const scaleX = localWidth > 0 ? rect.width / localWidth : 1;
  const scaleY = localHeight > 0 ? rect.height / localHeight : scaleX;
  const pointerX = (event.clientX - rect.left) / scaleX;
  const pointerY = (event.clientY - rect.top) / scaleY;
  const centerX = pointerX + (grab?.x == null ? 0 : size.width / 2 - grab.x);
  const centerY = pointerY + (grab?.y == null ? 0 : size.height / 2 - grab.y);
  const clampedX = clamp(centerX, size.width / 2, Math.max(size.width / 2, localWidth - size.width / 2));
  const clampedY = clamp(centerY, size.height / 2, Math.max(size.height / 2, localHeight - size.height / 2));

  return {
    x: localWidth > 0 ? clampedX / localWidth : 0.5,
    y: localHeight > 0 ? clampedY / localHeight : 0.5,
  };
}

function PlacedPart({
  host,
  placement,
  part,
  selected,
  onSelect,
  onRemove,
}: {
  host: HTMLElement;
  placement: BfuxPlacedPart;
  part: BfuxPartDefinition;
  selected: boolean;
  onSelect: () => void;
  onRemove: () => void;
}) {
  const size = partSize(part.kind);
  const style = {
    "--bfux-part-x": `${placement.x * 100}%`,
    "--bfux-part-y": `${placement.y * 100}%`,
    "--bfux-part-width": `${size.width}px`,
    "--bfux-part-height": `${size.height}px`,
  } as CSSProperties;

  const beginMove = (event: ReactDragEvent<HTMLButtonElement>) => {
    const hostRect = host.getBoundingClientRect();
    const itemRect = event.currentTarget.getBoundingClientRect();
    const scaleX = host.offsetWidth > 0 ? hostRect.width / host.offsetWidth : 1;
    const scaleY = host.offsetHeight > 0 ? hostRect.height / host.offsetHeight : scaleX;
    const grabX = (event.clientX - itemRect.left) / scaleX;
    const grabY = (event.clientY - itemRect.top) / scaleY;

    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData(placementTransferType, JSON.stringify({
      schema: "bfux.placement/v1",
      instanceId: placement.instanceId,
      grabX,
      grabY,
    }));
    event.dataTransfer.setData("text/plain", placement.partId);
    onSelect();
  };

  const keyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "Delete" && event.key !== "Backspace") return;
    event.preventDefault();
    onRemove();
  };

  return (
    <button
      type="button"
      className="bfux-placed-part"
      draggable
      data-selected={selected ? "true" : undefined}
      data-part-family={part.family}
      data-part-kind={part.kind}
      data-part-label={part.label}
      style={style}
      aria-pressed={selected}
      aria-label={`${part.label} placed part. Drag to move; double-click or press Delete to remove.`}
      title={`${part.label} · drag to move · double-click to remove`}
      onClick={(event) => {
        event.stopPropagation();
        onSelect();
      }}
      onDoubleClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onRemove();
      }}
      onDragStart={beginMove}
      onKeyDown={keyDown}
    >
      <BfuxPartGlyph kind={part.kind} />
    </button>
  );
}

export function BfuxPlacementLayer({
  resolution,
  onPlacementsChange,
}: {
  resolution: BfuxPlacementResolution;
  onPlacementsChange?: (placements: BfuxPlacedPart[]) => void;
}) {
  const [host, setHost] = useState<HTMLElement | null>(null);
  const [saved, setSaved] = useState<SavedPlacements>({});
  const [loaded, setLoaded] = useState(false);
  const [dropActive, setDropActive] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    setSaved(readPlacements());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    writePlacements(saved);
  }, [loaded, saved]);

  const placements = useMemo(() => saved[resolution] ?? [], [resolution, saved]);

  useEffect(() => {
    onPlacementsChange?.(placements);
  }, [onPlacementsChange, placements]);

  useEffect(() => {
    setSelectedId(null);
  }, [resolution]);

  useEffect(() => {
    let frame = 0;
    const findHost = () => {
      const next = document.querySelector<HTMLElement>(apparatusSelector);
      setHost((current) => (current === next ? current : next));
    };
    const scheduleFind = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(findHost);
    };

    scheduleFind();
    const observer = new MutationObserver(scheduleFind);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-skin", "data-resolution"],
    });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!host) return;

    const previousInlinePosition = host.style.position;
    const establishedPosition = window.getComputedStyle(host).position;
    const suppliedPosition = establishedPosition === "static";
    if (suppliedPosition) host.style.position = "relative";

    const dragOver = (event: DragEvent) => {
      if (!acceptedTransfer(event.dataTransfer)) return;
      event.preventDefault();
      event.stopPropagation();
      const types = Array.from(event.dataTransfer.types);
      event.dataTransfer.dropEffect = types.includes(placementTransferType) ? "move" : "copy";
      setDropActive(true);
    };

    const dragLeave = (event: DragEvent) => {
      const related = event.relatedTarget;
      if (related instanceof Node && host.contains(related)) return;
      setDropActive(false);
    };

    const drop = (event: DragEvent) => {
      if (!acceptedTransfer(event.dataTransfer)) return;
      event.preventDefault();
      event.stopPropagation();
      setDropActive(false);

      const moving = parsePlacementTransfer(event.dataTransfer);
      if (moving) {
        setSaved((current) => {
          const currentPlacements = current[resolution] ?? [];
          const existing = currentPlacements.find((placement) => placement.instanceId === moving.instanceId);
          if (!existing) return current;
          const part = getBfuxPartDefinition(existing.partId);
          if (!part) return current;
          const point = pointForDrop(host, event, partSize(part.kind), { x: moving.grabX, y: moving.grabY });
          return {
            ...current,
            [resolution]: currentPlacements.map((placement) => (
              placement.instanceId === moving.instanceId ? { ...placement, ...point } : placement
            )),
          };
        });
        setSelectedId(moving.instanceId);
        return;
      }

      const part = parsePartTransfer(event.dataTransfer);
      if (!part) return;
      const instanceId = newInstanceId(part.id);
      const point = pointForDrop(host, event, partSize(part.kind), null);
      setSaved((current) => {
        const currentPlacements = current[resolution] ?? [];
        if (currentPlacements.length >= maxPlacedParts) return current;
        return {
          ...current,
          [resolution]: [...currentPlacements, { instanceId, partId: part.id, ...point }],
        };
      });
      setSelectedId(instanceId);
    };

    const endDrag = () => setDropActive(false);
    host.addEventListener("dragover", dragOver);
    host.addEventListener("dragleave", dragLeave);
    host.addEventListener("drop", drop);
    window.addEventListener("dragend", endDrag);

    return () => {
      host.removeEventListener("dragover", dragOver);
      host.removeEventListener("dragleave", dragLeave);
      host.removeEventListener("drop", drop);
      window.removeEventListener("dragend", endDrag);
      if (suppliedPosition) host.style.position = previousInlinePosition;
    };
  }, [host, resolution]);

  if (!host) return null;

  const removePlacement = (instanceId: string) => {
    setSaved((current) => ({
      ...current,
      [resolution]: (current[resolution] ?? []).filter((placement) => placement.instanceId !== instanceId),
    }));
    setSelectedId((current) => current === instanceId ? null : current);
  };

  return createPortal(
    <>
      <div className="bfux-placement-dropzone" data-active={dropActive ? "true" : undefined} aria-hidden="true">
        <span>DROP PART · PLACE ON APPARATUS</span>
      </div>
      <div className="bfux-placement-layer" data-resolution={resolution} aria-label="BFUX placed parts">
        {placements.map((placement) => {
          const part = getBfuxPartDefinition(placement.partId);
          if (!part) return null;
          return (
            <PlacedPart
              key={placement.instanceId}
              host={host}
              placement={placement}
              part={part}
              selected={selectedId === placement.instanceId}
              onSelect={() => setSelectedId(placement.instanceId)}
              onRemove={() => removePlacement(placement.instanceId)}
            />
          );
        })}
      </div>
    </>,
    host,
    "bfux-placement-layer",
  );
}
