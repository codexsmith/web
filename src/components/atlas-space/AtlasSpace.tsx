"use client";

import { useMemo, useState } from "react";
import styles from "./AtlasSpace.module.css";
import {
  defaultAtlasSpaceModel,
  relationKindLabels,
  type AtlasFiber,
  type AtlasLayer,
  type AtlasPosition,
  type AtlasSpaceModel,
} from "./atlas-space-model";

type AtlasViewMode = "woven" | "focus";

type Point = {
  x: number;
  y: number;
};

type AtlasSpaceProps = {
  model?: AtlasSpaceModel;
  initialLayerId?: string;
  className?: string;
};

const GRID_STOPS = [25, 50, 75] as const;

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function project(position: AtlasPosition, level: number, mode: AtlasViewMode): Point {
  const u = position.x / 100;
  const v = position.y / 100;

  if (mode === "focus") {
    return {
      x: 95 + u * 690 + v * 145,
      y: 270 - u * 85 + v * 245,
    };
  }

  return {
    x: 100 + u * 610 + v * 150,
    y: 445 - u * 65 + v * 170 - level * 82,
  };
}

function layerLevel(layer: AtlasLayer, layers: AtlasLayer[]) {
  const index = layers.findIndex((candidate) => candidate.id === layer.id);
  return Math.max(0, layers.length - 1 - index);
}

function polygonPoints(level: number, mode: AtlasViewMode) {
  return [
    project({ x: 0, y: 0 }, level, mode),
    project({ x: 100, y: 0 }, level, mode),
    project({ x: 100, y: 100 }, level, mode),
    project({ x: 0, y: 100 }, level, mode),
  ]
    .map((point) => `${point.x},${point.y}`)
    .join(" ");
}

function fiberPoints(fiber: AtlasFiber, layers: AtlasLayer[]) {
  return layers
    .filter((layer) => layer.anchors.some((anchor) => anchor.fiberId === fiber.id))
    .map((layer) => project(fiber.position, layerLevel(layer, layers), "woven"));
}

export function AtlasSpace({
  model = defaultAtlasSpaceModel,
  initialLayerId,
  className,
}: AtlasSpaceProps) {
  const firstLayerId = model.layers[0]?.id ?? "";
  const firstFiberId = model.fibers[0]?.id ?? "";
  const resolvedInitialLayer = model.layers.some((layer) => layer.id === initialLayerId)
    ? (initialLayerId ?? firstLayerId)
    : firstLayerId;

  const [viewMode, setViewMode] = useState<AtlasViewMode>("woven");
  const [activeLayerId, setActiveLayerId] = useState(resolvedInitialLayer);
  const [activeFiberId, setActiveFiberId] = useState(firstFiberId);
  const [showFibers, setShowFibers] = useState(true);

  const activeLayer =
    model.layers.find((layer) => layer.id === activeLayerId) ?? model.layers[0];
  const activeFiber =
    model.fibers.find((fiber) => fiber.id === activeFiberId) ?? model.fibers[0];

  const visibleLayers = useMemo(() => {
    if (viewMode === "focus" && activeLayer) return [activeLayer];
    return model.layers;
  }, [activeLayer, model.layers, viewMode]);

  if (!activeLayer || !activeFiber) {
    return (
      <section className={cx(styles.root, className)}>
        <p className={styles.emptyState}>Atlas Space requires at least one layer and one fiber.</p>
      </section>
    );
  }

  return (
    <section className={cx(styles.root, className)} aria-labelledby={`${model.id}-title`}>
      <header className={styles.header}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Boundary First visual instrument / prototype v0</p>
          <h2 id={`${model.id}-title`} className={styles.title}>
            {model.title}
          </h2>
          <p className={styles.summary}>{model.summary}</p>
          <p className={styles.thesis}>{model.thesis}</p>
        </div>

        <div className={styles.viewControls}>
          <div className={styles.segmentedControl} aria-label="Atlas view mode">
            <button
              type="button"
              aria-pressed={viewMode === "woven"}
              className={cx(styles.controlButton, viewMode === "woven" && styles.controlButtonActive)}
              onClick={() => setViewMode("woven")}
            >
              Woven stack
            </button>
            <button
              type="button"
              aria-pressed={viewMode === "focus"}
              className={cx(styles.controlButton, viewMode === "focus" && styles.controlButtonActive)}
              onClick={() => setViewMode("focus")}
            >
              Focus layer
            </button>
          </div>
          <button
            type="button"
            aria-pressed={showFibers}
            className={cx(styles.fiberToggle, showFibers && styles.fiberToggleActive)}
            onClick={() => setShowFibers((value) => !value)}
          >
            {showFibers ? "Fibers visible" : "Fibers hidden"}
          </button>
        </div>
      </header>

      <nav className={styles.layerRail} aria-label="Atlas layers">
        {model.layers.map((layer) => (
          <button
            type="button"
            key={layer.id}
            aria-current={layer.id === activeLayer.id ? "true" : undefined}
            className={cx(styles.layerButton, layer.id === activeLayer.id && styles.layerButtonActive)}
            onClick={() => setActiveLayerId(layer.id)}
          >
            <span>{layer.label}</span>
            <small>{layer.kicker}</small>
          </button>
        ))}
      </nav>

      <div className={styles.body}>
        <div className={styles.viewport} data-view-mode={viewMode}>
          <div className={styles.viewportLabel}>
            <span>{viewMode === "woven" ? "Inter-atlas view" : `${activeLayer.label} / local chart`}</span>
            <span>{viewMode === "woven" ? `${model.layers.length} layers` : "1 layer"}</span>
          </div>

          <svg
            className={styles.canvas}
            viewBox="0 0 1000 720"
            role="img"
            aria-label="Layered atlas boards with typed fibers connecting related local concepts across domains"
          >
            <title>Boundary First Atlas Space layered atlas visualization</title>

            <g className={styles.boardField}>
              {visibleLayers.map((layer) => {
                const level = viewMode === "focus" ? 0 : layerLevel(layer, model.layers);
                const labelPoint = project({ x: 3, y: 7 }, level, viewMode);
                const isActive = layer.id === activeLayer.id;

                return (
                  <g key={`board-${layer.id}`}>
                    <polygon
                      points={polygonPoints(level, viewMode)}
                      className={cx(styles.board, isActive && styles.boardActive)}
                      onClick={() => setActiveLayerId(layer.id)}
                    />

                    {GRID_STOPS.map((stop) => {
                      const xStart = project({ x: stop, y: 0 }, level, viewMode);
                      const xEnd = project({ x: stop, y: 100 }, level, viewMode);
                      const yStart = project({ x: 0, y: stop }, level, viewMode);
                      const yEnd = project({ x: 100, y: stop }, level, viewMode);

                      return (
                        <g key={`${layer.id}-grid-${stop}`} className={styles.gridLines}>
                          <line x1={xStart.x} y1={xStart.y} x2={xEnd.x} y2={xEnd.y} />
                          <line y1={yStart.y} x1={yStart.x} y2={yEnd.y} x2={yEnd.x} />
                        </g>
                      );
                    })}

                    <text x={labelPoint.x} y={labelPoint.y} className={styles.layerLabel}>
                      {layer.label.toUpperCase()}
                    </text>
                  </g>
                );
              })}
            </g>

            {viewMode === "woven" && showFibers ? (
              <g className={styles.fibers}>
                {model.fibers.map((fiber) => {
                  const points = fiberPoints(fiber, model.layers);
                  if (points.length < 2) return null;

                  return (
                    <polyline
                      key={`fiber-${fiber.id}`}
                      points={points.map((point) => `${point.x},${point.y}`).join(" ")}
                      className={cx(
                        styles.fiberLine,
                        fiber.relationKind === "candidate" && styles.fiberLineCandidate,
                        fiber.id === activeFiber.id && styles.fiberLineActive,
                      )}
                    />
                  );
                })}
              </g>
            ) : null}

            <g className={styles.anchorField}>
              {visibleLayers.flatMap((layer) => {
                const level = viewMode === "focus" ? 0 : layerLevel(layer, model.layers);

                return model.fibers.map((fiber) => {
                  const anchor = layer.anchors.find((candidate) => candidate.fiberId === fiber.id);
                  if (!anchor) return null;

                  const point = project(fiber.position, level, viewMode);
                  const isActive = fiber.id === activeFiber.id;
                  const isLayerActive = layer.id === activeLayer.id;

                  return (
                    <g
                      key={`${layer.id}-${fiber.id}`}
                      className={cx(styles.anchor, isActive && styles.anchorActive)}
                      onClick={() => {
                        setActiveLayerId(layer.id);
                        setActiveFiberId(fiber.id);
                      }}
                    >
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r={viewMode === "focus" ? 12 : 9}
                        className={styles.anchorHit}
                      />
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r={isActive ? 5.5 : 4}
                        className={cx(styles.anchorDot, isLayerActive && styles.anchorDotLayerActive)}
                      />
                      <text
                        x={point.x + 13}
                        y={point.y - 10}
                        className={cx(styles.anchorLabel, viewMode === "focus" && styles.anchorLabelFocus)}
                      >
                        {anchor.label}
                      </text>
                    </g>
                  );
                });
              })}
            </g>
          </svg>

          <div className={styles.viewportNote}>
            <span>Same board coordinate = same structural question.</span>
            <span>Vertical fiber = typed correspondence, not identity.</span>
          </div>
        </div>

        <aside className={styles.inspector} aria-label="Atlas correspondence inspector">
          <div className={styles.inspectorHeader}>
            <p>Correspondence inspector</p>
            <span>{relationKindLabels[activeFiber.relationKind]}</span>
          </div>

          <div className={styles.fiberSelector} aria-label="Atlas fibers">
            {model.fibers.map((fiber) => (
              <button
                type="button"
                key={fiber.id}
                aria-pressed={fiber.id === activeFiber.id}
                className={cx(styles.fiberButton, fiber.id === activeFiber.id && styles.fiberButtonActive)}
                onClick={() => setActiveFiberId(fiber.id)}
              >
                {fiber.label}
              </button>
            ))}
          </div>

          <div className={styles.inspectorCopy}>
            <h3>{activeFiber.label}</h3>
            <p>{activeFiber.statement}</p>
          </div>

          <ol className={styles.mappingList}>
            {model.layers.map((layer) => {
              const anchor = layer.anchors.find((candidate) => candidate.fiberId === activeFiber.id);
              if (!anchor) return null;

              return (
                <li key={`${activeFiber.id}-${layer.id}`}>
                  <button
                    type="button"
                    className={cx(styles.mappingButton, layer.id === activeLayer.id && styles.mappingButtonActive)}
                    onClick={() => setActiveLayerId(layer.id)}
                  >
                    <span className={styles.mappingLayer}>{layer.label}</span>
                    <strong>{anchor.label}</strong>
                    <small>{anchor.note}</small>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className={styles.layerReadout}>
            <span>Selected layer</span>
            <strong>{activeLayer.label}</strong>
            <p>{activeLayer.description}</p>
            <button type="button" onClick={() => setViewMode("focus")}>
              Inspect this layer
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}
