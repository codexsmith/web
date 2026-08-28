"use client";

import { useMemo, useState } from "react";
import styles from "./AtlasSpace.module.css";
import {
  connectorKindLabels,
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
const EDGE_X = 852;
const BACKPLANE_X = 884;

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

function edgePoint(layer: AtlasLayer, layers: AtlasLayer[]) {
  const level = layerLevel(layer, layers);
  const boardEdge = project({ x: 100, y: 52 }, level, "woven");
  return { x: EDGE_X, y: boardEdge.y };
}

function backplaneChannelX(fiberIndex: number) {
  return BACKPLANE_X + fiberIndex * 8;
}

function routedPath(anchor: Point, edge: Point, channelX: number) {
  const doglegX = Math.max(anchor.x + 30, edge.x - 42);
  return `M ${anchor.x} ${anchor.y} L ${doglegX} ${anchor.y} L ${doglegX} ${edge.y} L ${edge.x} ${edge.y} L ${channelX} ${edge.y}`;
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
          <div><p>Boundary First Labs</p><small>Atlas instrumentation / prototype 00</small></div>
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
            <button type="button" aria-pressed={viewMode === "woven"} className={cx(styles.bankButton, viewMode === "woven" && styles.bankButtonActive)} onClick={() => setViewMode("woven")}><span className={styles.indicator} /> WOVEN</button>
            <button type="button" aria-pressed={viewMode === "focus"} className={cx(styles.bankButton, viewMode === "focus" && styles.bankButtonActive)} onClick={() => setViewMode("focus")}><span className={styles.indicator} /> LOCAL</button>
          </div>

          <div className={styles.moduleLabel}>LAYER SELECT</div>
          <nav className={styles.layerStack} aria-label="Atlas layers">
            {model.layers.map((layer, index) => (
              <button type="button" key={layer.id} aria-current={layer.id === activeLayer.id ? "true" : undefined} className={cx(styles.layerButton, layer.id === activeLayer.id && styles.layerButtonActive)} onClick={() => setActiveLayerId(layer.id)}>
                <span className={styles.channelNumber}>{String(index + 1).padStart(2, "0")}</span>
                <span><strong>{layer.label}</strong><small>{layer.kicker}</small></span><i className={styles.layerLamp} />
              </button>
            ))}
          </nav>

          <div className={styles.moduleLabel}>BUS MASTER</div>
          <button type="button" aria-pressed={showFibers} className={cx(styles.masterSwitch, showFibers && styles.masterSwitchOn)} onClick={() => setShowFibers((value) => !value)}>
            <span className={styles.switchTrack}><i /></span><span>{showFibers ? "FIBERS ON" : "FIBERS OFF"}</span>
          </button>
        </aside>

        <div className={styles.centerAssembly}>
          <div className={styles.screenBezel}>
            <div className={styles.screenHeader}>
              <span>ATLAS SPACE // {viewMode === "woven" ? "INTER-ATLAS" : activeLayer.label.toUpperCase()}</span>
              <span className={styles.screenState}><i /> LIVE</span>
            </div>
            <div className={styles.viewport} data-view-mode={viewMode}>
              <svg className={styles.canvas} viewBox="0 0 960 680" role="img" aria-label="Layered atlas boards connected through a typed rear correspondence backplane">
                <title>Boundary First Atlas Space layered atlas visualization</title>
                <defs>
                  <filter id="atlasGlow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.2" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                </defs>

                <g>
                  {visibleLayers.map((layer) => {
                    const level = viewMode === "focus" ? 0 : layerLevel(layer, model.layers);
                    const labelPoint = project({ x: 2, y: 8 }, level, viewMode);
                    const isActive = layer.id === activeLayer.id;
                    return <g key={`board-${layer.id}`}>
                      <polygon points={polygonPoints(level, viewMode)} className={cx(styles.boardShadow, isActive && styles.boardShadowActive)} />
                      <polygon points={polygonPoints(level, viewMode)} className={cx(styles.board, isActive && styles.boardActive)} onClick={() => setActiveLayerId(layer.id)} />
                      {GRID_STOPS.map((stop) => {
                        const xStart = project({ x: stop, y: 0 }, level, viewMode); const xEnd = project({ x: stop, y: 100 }, level, viewMode);
                        const yStart = project({ x: 0, y: stop }, level, viewMode); const yEnd = project({ x: 100, y: stop }, level, viewMode);
                        return <g key={`${layer.id}-${stop}`} className={styles.gridLines}><line x1={xStart.x} y1={xStart.y} x2={xEnd.x} y2={xEnd.y} /><line x1={yStart.x} y1={yStart.y} x2={yEnd.x} y2={yEnd.y} /></g>;
                      })}
                      <text x={labelPoint.x} y={labelPoint.y} className={styles.layerLabel}>{layer.label.toUpperCase()}</text>
                    </g>;
                  })}
                </g>

                {viewMode === "woven" && showFibers ? <g className={styles.wiringField}>
                  <rect x="844" y="74" width="100" height="514" rx="8" className={styles.backplaneHousing} />
                  <text x="894" y="96" textAnchor="middle" className={styles.backplaneLabel}>REAR BUS</text>
                  {model.fibers.map((fiber, fiberIndex) => {
                    const channelX = backplaneChannelX(fiberIndex);
                    const participating = model.layers.filter((layer) => layer.anchors.some((anchor) => anchor.fiberId === fiber.id));
                    const ends = participating.map((layer) => edgePoint(layer, model.layers));
                    const minY = Math.min(...ends.map((point) => point.y)); const maxY = Math.max(...ends.map((point) => point.y));
                    const isActive = fiber.id === activeFiber.id;
                    return <g key={`bus-${fiber.id}`}>
                      <line x1={channelX} y1={minY} x2={channelX} y2={maxY} className={cx(styles.backplaneBus, styles[`connector_${fiber.connectorKind}`], isActive && styles.backplaneBusActive)} />
                      {participating.map((layer) => {
                        const level = layerLevel(layer, model.layers);
                        const anchor = project(fiber.position, level, "woven");
                        const edge = edgePoint(layer, model.layers);
                        return <g key={`${fiber.id}-${layer.id}-route`}>
                          <path d={routedPath(anchor, edge, channelX)} className={styles.traceSleeve} />
                          <path d={routedPath(anchor, edge, channelX)} className={cx(styles.boardTrace, styles[`connector_${fiber.connectorKind}`], isActive && styles.boardTraceActive)} />
                          <rect x={edge.x - 7} y={edge.y - 6} width="14" height="12" rx={fiber.connectorKind === "through" ? 6 : 2} className={cx(styles.edgeConnector, styles[`edge_${fiber.connectorKind}`], isActive && styles.edgeConnectorActive)} />
                        </g>;
                      })}
                    </g>;
                  })}
                </g> : null}

                <g>
                  {visibleLayers.flatMap((layer) => {
                    const level = viewMode === "focus" ? 0 : layerLevel(layer, model.layers);
                    return model.fibers.map((fiber) => {
                      const anchor = layer.anchors.find((candidate) => candidate.fiberId === fiber.id); if (!anchor) return null;
                      const point = project(fiber.position, level, viewMode); const isActive = fiber.id === activeFiber.id; const isLayerActive = layer.id === activeLayer.id;
                      return <g key={`${layer.id}-${fiber.id}`} className={cx(styles.anchor, isActive && styles.anchorActive)} onClick={() => { setActiveLayerId(layer.id); setActiveFiberId(fiber.id); }}>
                        <circle cx={point.x} cy={point.y} r={viewMode === "focus" ? 14 : 11} className={cx(styles.jackOuter, styles[`jack_${fiber.connectorKind}`])} />
                        <circle cx={point.x} cy={point.y} r={viewMode === "focus" ? 8 : 6.5} className={styles.jackInner} />
                        <circle cx={point.x} cy={point.y} r={isActive ? 3.8 : 2.8} className={cx(styles.anchorDot, isLayerActive && styles.anchorDotLayerActive)} filter={isActive ? "url(#atlasGlow)" : undefined} />
                        <text x={point.x + 14} y={point.y - 11} className={cx(styles.anchorLabel, viewMode === "focus" && styles.anchorLabelFocus)}>{anchor.label}</text>
                      </g>;
                    });
                  })}
                </g>
              </svg>
              <div className={styles.screenCornerReadout}>LOCAL JACK → EDGE CONTACT → REAR BUS</div>
            </div>
          </div>

          <div className={styles.lowerDeck}>
            <div className={styles.deckPlate}><span>ACTIVE CHANNEL</span><strong>{activeFiber.label}</strong><small>{relationKindLabels[activeFiber.relationKind]}</small></div>
            <div className={styles.deckPlate}><span>CONNECTOR</span><strong>{connectorKindLabels[activeFiber.connectorKind]}</strong><small>physical routing semantics</small></div>
            <div className={styles.deckPlateWide}><span>WIRING RULE</span><strong>Local traces terminate on a shared typed backplane.</strong><small>Cross-layer structure is routed; no arbitrary point-to-point graph edges.</small></div>
          </div>
        </div>

        <aside className={styles.rightBank} aria-label="Correspondence inspector">
          <div className={styles.moduleLabel}>PATCH BAY</div>
          <div className={styles.patchBay}>
            {model.fibers.map((fiber, index) => (
              <button type="button" key={fiber.id} aria-pressed={fiber.id === activeFiber.id} className={cx(styles.patchRow, styles[`patch_${fiber.connectorKind}`], fiber.id === activeFiber.id && styles.patchRowActive)} onClick={() => setActiveFiberId(fiber.id)}>
                <span className={styles.patchJack}><i /></span><span className={styles.patchCode}>{fiber.connectorKind === "through" ? "THR" : fiber.connectorKind === "keyed" ? "KEY" : "TST"}{String(index + 1).padStart(2, "0")}</span><span className={styles.patchName}>{fiber.label}</span>
              </button>
            ))}
          </div>
          <div className={styles.moduleLabel}>CHANNEL READOUT</div>
          <div className={styles.readout}><span className={styles.readoutType}>{connectorKindLabels[activeFiber.connectorKind]}</span><h3>{activeFiber.label}</h3><p>{activeFiber.statement}</p></div>
          <div className={styles.moduleLabel}>TERMINALS</div>
          <ol className={styles.mappingList}>
            {model.layers.map((layer, index) => { const anchor = layer.anchors.find((candidate) => candidate.fiberId === activeFiber.id); if (!anchor) return null; return <li key={`${activeFiber.id}-${layer.id}`}><button type="button" className={cx(styles.mappingButton, layer.id === activeLayer.id && styles.mappingButtonActive)} onClick={() => setActiveLayerId(layer.id)}><span className={styles.terminalNumber}>{String(index + 1).padStart(2, "0")}</span><span><small>{layer.label}</small><strong>{anchor.label}</strong></span><i /></button></li>; })}
          </ol>
          <div className={styles.layerReadout}><span>BOARD NOTE</span><p>{activeLayer.description}</p><button type="button" onClick={() => setViewMode("focus")}>ISOLATE BOARD</button></div>
        </aside>
      </div>

      <footer className={styles.footerStrip}><span>BF-ATLAS / BACKPLANE SPEC 0.2</span><span>{model.thesis}</span><span>ROUTED CORRESPONDENCE ONLY</span></footer>
    </section>
  );
}
