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
type Point = { x: number; y: number };
type AtlasSpaceProps = { model?: AtlasSpaceModel; initialLayerId?: string; className?: string };

const GRID_STOPS = [25, 50, 75] as const;

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function project(position: AtlasPosition, level: number, mode: AtlasViewMode): Point {
  const u = position.x / 100;
  const v = position.y / 100;
  if (mode === "focus") return { x: 128 + u * 625 + v * 120, y: 258 - u * 74 + v * 224 };
  return { x: 118 + u * 560 + v * 132, y: 440 - u * 58 + v * 152 - level * 78 };
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
  ].map((point) => `${point.x},${point.y}`).join(" ");
}

function fiberPoints(fiber: AtlasFiber, layers: AtlasLayer[]) {
  return layers
    .filter((layer) => layer.anchors.some((anchor) => anchor.fiberId === fiber.id))
    .map((layer) => project(fiber.position, layerLevel(layer, layers), "woven"));
}

function Screw({ className }: { className: string }) {
  return <span aria-hidden="true" className={cx(styles.screw, className)} />;
}

export function AtlasSpace({ model = defaultAtlasSpaceModel, initialLayerId, className }: AtlasSpaceProps) {
  const firstLayerId = model.layers[0]?.id ?? "";
  const firstFiberId = model.fibers[0]?.id ?? "";
  const resolvedInitialLayer = model.layers.some((layer) => layer.id === initialLayerId)
    ? (initialLayerId ?? firstLayerId)
    : firstLayerId;

  const [viewMode, setViewMode] = useState<AtlasViewMode>("woven");
  const [activeLayerId, setActiveLayerId] = useState(resolvedInitialLayer);
  const [activeFiberId, setActiveFiberId] = useState(firstFiberId);
  const [showFibers, setShowFibers] = useState(true);

  const activeLayer = model.layers.find((layer) => layer.id === activeLayerId) ?? model.layers[0];
  const activeFiber = model.fibers.find((fiber) => fiber.id === activeFiberId) ?? model.fibers[0];
  const visibleLayers = useMemo(
    () => (viewMode === "focus" && activeLayer ? [activeLayer] : model.layers),
    [activeLayer, model.layers, viewMode],
  );

  if (!activeLayer || !activeFiber) {
    return <section className={cx(styles.root, className)}><p className={styles.emptyState}>Atlas Space requires at least one layer and one fiber.</p></section>;
  }

  return (
    <section className={cx(styles.root, className)} aria-labelledby={`${model.id}-title`}>
      <Screw className={styles.screwTl} /><Screw className={styles.screwTr} />
      <Screw className={styles.screwBl} /><Screw className={styles.screwBr} />

      <header className={styles.header}>
        <div className={styles.brandPlate}>
          <span className={styles.brandMark}>BF</span>
          <div>
            <p>Boundary First Labs</p>
            <small>Atlas instrumentation / prototype 00</small>
          </div>
        </div>
        <div className={styles.statusStrip}>
          <span><i /> correspondence bus online</span>
          <span>representation is the control</span>
          <span>{model.layers.length} atlas boards mounted</span>
        </div>
      </header>

      <div className={styles.instrumentGrid}>
        <aside className={styles.leftBank} aria-label="Atlas controls">
          <div className={styles.moduleLabel}>VIEW CONTROL</div>
          <div className={styles.toggleStack}>
            <button type="button" aria-pressed={viewMode === "woven"} className={cx(styles.bankButton, viewMode === "woven" && styles.bankButtonActive)} onClick={() => setViewMode("woven")}>
              <span className={styles.indicator} /> WOVEN
            </button>
            <button type="button" aria-pressed={viewMode === "focus"} className={cx(styles.bankButton, viewMode === "focus" && styles.bankButtonActive)} onClick={() => setViewMode("focus")}>
              <span className={styles.indicator} /> LOCAL
            </button>
          </div>

          <div className={styles.moduleLabel}>LAYER SELECT</div>
          <nav className={styles.layerStack} aria-label="Atlas layers">
            {model.layers.map((layer, index) => (
              <button type="button" key={layer.id} aria-current={layer.id === activeLayer.id ? "true" : undefined} className={cx(styles.layerButton, layer.id === activeLayer.id && styles.layerButtonActive)} onClick={() => setActiveLayerId(layer.id)}>
                <span className={styles.channelNumber}>{String(index + 1).padStart(2, "0")}</span>
                <span><strong>{layer.label}</strong><small>{layer.kicker}</small></span>
                <i className={styles.layerLamp} />
              </button>
            ))}
          </nav>

          <div className={styles.moduleLabel}>BUS MASTER</div>
          <button type="button" aria-pressed={showFibers} className={cx(styles.masterSwitch, showFibers && styles.masterSwitchOn)} onClick={() => setShowFibers((value) => !value)}>
            <span className={styles.switchTrack}><i /></span>
            <span>{showFibers ? "FIBERS ON" : "FIBERS OFF"}</span>
          </button>
        </aside>

        <div className={styles.centerAssembly}>
          <div className={styles.screenBezel}>
            <div className={styles.screenHeader}>
              <span>ATLAS SPACE // {viewMode === "woven" ? "INTER-ATLAS" : activeLayer.label.toUpperCase()}</span>
              <span className={styles.screenState}><i /> LIVE</span>
            </div>
            <div className={styles.viewport} data-view-mode={viewMode}>
              <svg className={styles.canvas} viewBox="0 0 920 680" role="img" aria-label="Layered atlas boards connected by typed physical-style correspondence harnesses">
                <title>Boundary First Atlas Space layered atlas visualization</title>

                <defs>
                  <filter id="atlasGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2.2" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>

                <g>
                  {visibleLayers.map((layer) => {
                    const level = viewMode === "focus" ? 0 : layerLevel(layer, model.layers);
                    const labelPoint = project({ x: 2, y: 8 }, level, viewMode);
                    const isActive = layer.id === activeLayer.id;
                    return (
                      <g key={`board-${layer.id}`}>
                        <polygon points={polygonPoints(level, viewMode)} className={cx(styles.boardShadow, isActive && styles.boardShadowActive)} />
                        <polygon points={polygonPoints(level, viewMode)} className={cx(styles.board, isActive && styles.boardActive)} onClick={() => setActiveLayerId(layer.id)} />
                        {GRID_STOPS.map((stop) => {
                          const xStart = project({ x: stop, y: 0 }, level, viewMode);
                          const xEnd = project({ x: stop, y: 100 }, level, viewMode);
                          const yStart = project({ x: 0, y: stop }, level, viewMode);
                          const yEnd = project({ x: 100, y: stop }, level, viewMode);
                          return <g key={`${layer.id}-${stop}`} className={styles.gridLines}>
                            <line x1={xStart.x} y1={xStart.y} x2={xEnd.x} y2={xEnd.y} />
                            <line x1={yStart.x} y1={yStart.y} x2={yEnd.x} y2={yEnd.y} />
                          </g>;
                        })}
                        <text x={labelPoint.x} y={labelPoint.y} className={styles.layerLabel}>{layer.label.toUpperCase()}</text>
                      </g>
                    );
                  })}
                </g>

                {viewMode === "woven" && showFibers ? <g>
                  {model.fibers.map((fiber) => {
                    const points = fiberPoints(fiber, model.layers);
                    if (points.length < 2) return null;
                    return <g key={`fiber-${fiber.id}`}>
                      <polyline points={points.map((point) => `${point.x},${point.y}`).join(" ")} className={styles.fiberSleeve} />
                      <polyline points={points.map((point) => `${point.x},${point.y}`).join(" ")} className={cx(styles.fiberLine, fiber.relationKind === "candidate" && styles.fiberLineCandidate, fiber.id === activeFiber.id && styles.fiberLineActive)} />
                    </g>;
                  })}
                </g> : null}

                <g>
                  {visibleLayers.flatMap((layer) => {
                    const level = viewMode === "focus" ? 0 : layerLevel(layer, model.layers);
                    return model.fibers.map((fiber) => {
                      const anchor = layer.anchors.find((candidate) => candidate.fiberId === fiber.id);
                      if (!anchor) return null;
                      const point = project(fiber.position, level, viewMode);
                      const isActive = fiber.id === activeFiber.id;
                      const isLayerActive = layer.id === activeLayer.id;
                      return <g key={`${layer.id}-${fiber.id}`} className={cx(styles.anchor, isActive && styles.anchorActive)} onClick={() => { setActiveLayerId(layer.id); setActiveFiberId(fiber.id); }}>
                        <circle cx={point.x} cy={point.y} r={viewMode === "focus" ? 14 : 11} className={styles.jackOuter} />
                        <circle cx={point.x} cy={point.y} r={viewMode === "focus" ? 8 : 6.5} className={styles.jackInner} />
                        <circle cx={point.x} cy={point.y} r={isActive ? 3.8 : 2.8} className={cx(styles.anchorDot, isLayerActive && styles.anchorDotLayerActive)} filter={isActive ? "url(#atlasGlow)" : undefined} />
                        <text x={point.x + 14} y={point.y - 11} className={cx(styles.anchorLabel, viewMode === "focus" && styles.anchorLabelFocus)}>{anchor.label}</text>
                      </g>;
                    });
                  })}
                </g>
              </svg>
              <div className={styles.screenCornerReadout}>COORDINATE-LOCK / JACKED CORRESPONDENCE</div>
            </div>
          </div>

          <div className={styles.lowerDeck}>
            <div className={styles.deckPlate}>
              <span>ACTIVE CHANNEL</span><strong>{activeFiber.label}</strong>
              <small>{relationKindLabels[activeFiber.relationKind]}</small>
            </div>
            <div className={styles.deckPlate}>
              <span>ACTIVE BOARD</span><strong>{activeLayer.label}</strong>
              <small>{viewMode === "woven" ? "stack context" : "local chart"}</small>
            </div>
            <div className={styles.deckPlateWide}>
              <span>WIRING RULE</span><strong>One harness = one structural question.</strong>
              <small>Repeated jacks indicate typed correspondence, never literal identity.</small>
            </div>
          </div>
        </div>

        <aside className={styles.rightBank} aria-label="Correspondence inspector">
          <div className={styles.moduleLabel}>PATCH BAY</div>
          <div className={styles.patchBay}>
            {model.fibers.map((fiber, index) => (
              <button type="button" key={fiber.id} aria-pressed={fiber.id === activeFiber.id} className={cx(styles.patchRow, fiber.id === activeFiber.id && styles.patchRowActive)} onClick={() => setActiveFiberId(fiber.id)}>
                <span className={styles.patchJack}><i /></span>
                <span className={styles.patchCode}>J{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.patchName}>{fiber.label}</span>
              </button>
            ))}
          </div>

          <div className={styles.moduleLabel}>CHANNEL READOUT</div>
          <div className={styles.readout}>
            <span className={styles.readoutType}>{relationKindLabels[activeFiber.relationKind]}</span>
            <h3>{activeFiber.label}</h3>
            <p>{activeFiber.statement}</p>
          </div>

          <div className={styles.moduleLabel}>TERMINALS</div>
          <ol className={styles.mappingList}>
            {model.layers.map((layer, index) => {
              const anchor = layer.anchors.find((candidate) => candidate.fiberId === activeFiber.id);
              if (!anchor) return null;
              return <li key={`${activeFiber.id}-${layer.id}`}>
                <button type="button" className={cx(styles.mappingButton, layer.id === activeLayer.id && styles.mappingButtonActive)} onClick={() => setActiveLayerId(layer.id)}>
                  <span className={styles.terminalNumber}>{String(index + 1).padStart(2, "0")}</span>
                  <span><small>{layer.label}</small><strong>{anchor.label}</strong></span>
                  <i />
                </button>
              </li>;
            })}
          </ol>

          <div className={styles.layerReadout}>
            <span>BOARD NOTE</span>
            <p>{activeLayer.description}</p>
            <button type="button" onClick={() => setViewMode("focus")}>ISOLATE BOARD</button>
          </div>
        </aside>
      </div>

      <footer className={styles.footerStrip}>
        <span>BF-ATLAS / SIGNAL ROUTING SPEC 0.1</span>
        <span>{model.thesis}</span>
        <span>NO UNBOUND CROSS-DOMAIN EDGES</span>
      </footer>
    </section>
  );
}
