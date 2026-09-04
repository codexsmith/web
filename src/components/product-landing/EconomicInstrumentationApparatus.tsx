'use client';

import { useEffect, useMemo, useState, type ComponentType } from "react";
import {
  Activity,
  AlertTriangle,
  Building2,
  Cable,
  Database,
  Factory,
  Gauge,
  Landmark,
  Layers3,
  Network,
  RadioTower,
  RotateCcw,
  Route,
  School,
  ShieldCheck,
  SlidersHorizontal,
  Waves,
  Wrench,
} from "lucide-react";
import { useAugustaScenario } from "./AugustaScenarioContext";
import {
  augustaConsequenceEdges,
  augustaCrossSection,
  augustaInstruments,
  augustaMapNodes,
  augustaSystemLayers,
  type AugustaInstrumentDatum,
  type AugustaMapNode,
  type AugustaSystemLayer,
} from "@/lib/augusta-economic-cross-section";
import {
  augustaSpatialContract,
  augustaSpatialRoutes,
  augustaSpatialZones,
  getAugustaSpatialPosition,
} from "@/lib/augusta-spatial-grammar";
import {
  getAugustaSurfaceSignals,
  type AugustaSurfaceSignalClass,
} from "@/lib/augusta-surface-instrumentation";
import {
  augustaTemporalFrames,
  getAugustaTemporalFrame,
  getTemporalInstrumentDisposition,
  getTemporalMapPosture,
  type AugustaTemporalFrameId,
} from "@/lib/augusta-temporal-state";
import {
  augustaScenarioControls,
  type AugustaScenarioOptionPosture,
} from "@/lib/augusta-scenario-transitions";
import { economicPlanes, type EconomicPlane } from "@/lib/economic-instrumentation";
import { formatWaterRatio, highlandAvenueWaterCalibration } from "@/lib/augusta-water-calibration";
import { augustaResurfacingCalibration } from "@/lib/augusta-transport-calibration";

const planeTone: Record<EconomicPlane, "blue" | "green" | "gold" | "red"> = {
  reference: "blue",
  referent: "green",
  maintenance: "gold",
  closure: "red",
};

const layerTone: Record<AugustaSystemLayer, "cyan" | "green" | "violet" | "gold"> = {
  material: "cyan",
  civic: "green",
  historical: "violet",
  household: "gold",
};

const postureTone: Record<AugustaScenarioOptionPosture, "neutral" | "green" | "gold"> = {
  baseline: "neutral",
  intervention: "green",
  stress: "gold",
};

const surfaceTone: Record<AugustaSurfaceSignalClass, string> = {
  observed: "#9ad62f",
  gap: "#8a9b9f",
  open: "#d2ad22",
  interpretive: "#a05de9",
  seeded: "#6d8288",
};

function nodeIcon(type: AugustaMapNode["type"]) {
  switch (type) {
    case "power": return RadioTower;
    case "water": return Waves;
    case "road": return Factory;
    case "school": return School;
    case "housing": return Building2;
    default: return Landmark;
  }
}

function routeStroke(kind: (typeof augustaSpatialRoutes)[number]["kind"]) {
  switch (kind) {
    case "river": return "rgba(102,182,217,0.58)";
    case "canal": return "rgba(102,182,217,0.32)";
    case "highway": return "rgba(220,227,226,0.22)";
    case "beltway": return "rgba(220,227,226,0.14)";
    default: return "rgba(220,227,226,0.11)";
  }
}

function nodeLabel(id: string) {
  return augustaMapNodes.find((node) => node.id === id)?.label ?? id;
}

function shortStatus(status: string) {
  return status.replaceAll("-", " ");
}

function PanelHeader({
  eyebrow,
  title,
  icon: Icon,
  tone = "neutral",
  action,
}: {
  eyebrow: string;
  title: string;
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  tone?: string;
  action?: React.ReactNode;
}) {
  return (
    <header data-eco-panel-header data-tone={tone}>
      <div data-eco-panel-heading>
        <span data-eco-icon-plate><Icon className="h-4 w-4" aria-hidden={true} /></span>
        <div>
          <p data-eco-eyebrow>{eyebrow}</p>
          <h2 data-eco-panel-title>{title}</h2>
        </div>
      </div>
      {action ? <div data-eco-panel-action>{action}</div> : null}
    </header>
  );
}

function Lamp({ label, tone = "neutral" }: { label: string; tone?: string }) {
  return (
    <span data-eco-lamp data-tone={tone}>
      <span data-eco-lamp-dot aria-hidden="true" />
      {label}
    </span>
  );
}

function Readout({ label, value, tone = "neutral", sub }: { label: string; value: string; tone?: string; sub?: string }) {
  return (
    <div data-eco-readout data-tone={tone}>
      <span data-eco-readout-label>{label}</span>
      <strong data-eco-readout-value>{value}</strong>
      {sub ? <span data-eco-readout-sub>{sub}</span> : null}
    </div>
  );
}

function InstrumentReadout({ instrument, disposition }: { instrument: AugustaInstrumentDatum; disposition: string }) {
  const tone = planeTone[instrument.plane];
  return (
    <article data-eco-instrument data-tone={tone}>
      <div data-eco-instrument-topline>
        <span>{instrument.kind}</span>
        <Lamp label={disposition} tone={tone} />
      </div>
      <div data-eco-instrument-value>{instrument.displayValue}</div>
      <div data-eco-instrument-label>{instrument.shortLabel}</div>
      <div data-eco-instrument-meta>
        <span>{instrument.evidence}</span>
        <span>{instrument.unit ?? instrument.plane}</span>
      </div>
      <details data-eco-disclosure>
        <summary>inspect contract</summary>
        <div data-eco-disclosure-body>
          <p>{instrument.description}</p>
          <p><strong>Measures:</strong> {instrument.measures}</p>
          <p><strong>Does not measure:</strong> {instrument.doesNotMeasure.join(" · ")}</p>
          {instrument.source.href ? (
            <a href={instrument.source.href} rel="noreferrer" target="_blank">{instrument.source.label}</a>
          ) : <span>{instrument.source.label}</span>}
        </div>
      </details>
    </article>
  );
}

export function EconomicInstrumentationApparatus() {
  const [activePlane, setActivePlane] = useState<EconomicPlane | "all">("all");
  const [activeLayer, setActiveLayer] = useState<AugustaSystemLayer | "all">("all");
  const [activeFrameId, setActiveFrameId] = useState<AugustaTemporalFrameId>("current");
  const [selectedNodeId, setSelectedNodeId] = useState("savannah-water");
  const [showTopology, setShowTopology] = useState(true);
  const [showOrientation, setShowOrientation] = useState(true);

  const {
    selections,
    evaluation,
    waterAddedAverageFlowMgd,
    waterTransition,
    transportAddedResurfacingMiles,
    transportTransition,
    selectOption,
    setWaterAddedAverageFlowMgd,
    setTransportAddedResurfacingMiles,
    reset,
  } = useAugustaScenario();

  useEffect(() => {
    if (
      evaluation.activeOptions.length
      || waterAddedAverageFlowMgd.trim()
      || transportAddedResurfacingMiles.trim()
    ) {
      setActiveFrameId("scenario");
    }
  }, [evaluation.activeOptions.length, transportAddedResurfacingMiles, waterAddedAverageFlowMgd]);

  const activeFrame = getAugustaTemporalFrame(activeFrameId);
  const mapPosture = getTemporalMapPosture(activeFrame);
  const scenarioActive = activeFrame.mode === "scenario" && evaluation.activeOptions.length > 0;
  const selected = augustaMapNodes.find((node) => node.id === selectedNodeId) ?? augustaMapNodes[0];

  const visibleNodes = useMemo(
    () => activeLayer === "all" ? augustaMapNodes : augustaMapNodes.filter((node) => node.layer === activeLayer),
    [activeLayer],
  );

  const visibleEdges = useMemo(() => {
    const frameEdges = activeFrame.mode === "historical"
      ? augustaConsequenceEdges.filter((edge) => edge.evidence === "interpretive")
      : augustaConsequenceEdges;
    if (activeLayer === "all") return frameEdges;
    return frameEdges.filter((edge) => {
      const from = augustaMapNodes.find((node) => node.id === edge.from);
      const to = augustaMapNodes.find((node) => node.id === edge.to);
      return from?.layer === activeLayer || to?.layer === activeLayer;
    });
  }, [activeFrame.mode, activeLayer]);

  const connectedEdges = useMemo(
    () => visibleEdges.filter((edge) => edge.from === selectedNodeId || edge.to === selectedNodeId),
    [selectedNodeId, visibleEdges],
  );

  const surfaceSignals = useMemo(
    () => activeFrame.mode === "historical" ? [] : getAugustaSurfaceSignals(activePlane, activeLayer),
    [activeFrame.mode, activeLayer, activePlane],
  );

  const visibleInstrumentEntries = useMemo(() => selected.instrumentIds
    .map((id) => augustaInstruments.find((instrument) => instrument.id === id))
    .filter((instrument): instrument is AugustaInstrumentDatum => Boolean(instrument))
    .filter((instrument) => activePlane === "all" || instrument.plane === activePlane)
    .map((instrument) => ({ instrument, disposition: getTemporalInstrumentDisposition(instrument.id, activeFrame) }))
    .filter((entry) => entry.disposition !== "withheld"), [activeFrame, activePlane, selected.instrumentIds]);

  const selectedSignal = surfaceSignals.find((signal) => signal.targetKind === "node" && signal.targetId === selected.id);
  const selectedTone = selectedSignal ? surfaceTone[selectedSignal.signalClass] : undefined;

  return (
    <main data-eco-console>
      <header data-eco-nameplate>
        <div data-eco-nameplate-copy>
          <div data-eco-nameplate-kicker>
            <Gauge className="h-4 w-4" aria-hidden="true" />
            <span>BF-ECO-AUG-01</span>
            <Lamp label={augustaCrossSection.status} tone="green" />
          </div>
          <h1>Augusta systems instrument</h1>
          <p>Operate the representation. Keep the city fixed.</p>
        </div>
        <div data-eco-nameplate-readouts>
          <Readout label="Frame" value={activeFrame.index} sub={activeFrame.shortLabel} tone={activeFrame.mode === "scenario" ? "gold" : activeFrame.mode === "historical" ? "violet" : "green"} />
          <Readout label="Plane" value={activePlane === "all" ? "ALL" : economicPlanes.find((plane) => plane.id === activePlane)?.notation ?? activePlane} sub={activePlane === "all" ? "four channels" : economicPlanes.find((plane) => plane.id === activePlane)?.label} tone={activePlane === "all" ? "neutral" : planeTone[activePlane]} />
          <Readout label="Object" value={selected.label} sub={selected.layer} tone={layerTone[selected.layer]} />
        </div>
      </header>

      <section data-eco-panel data-tone="violet" aria-label="Temporal state rail">
        <PanelHeader eyebrow="State trajectory" title="Temporal evidence rail" icon={Activity} tone="violet" action={<Lamp label={activeFrame.mode} tone={activeFrame.mode === "scenario" ? "gold" : activeFrame.mode === "historical" ? "violet" : "green"} />} />
        <div data-eco-temporal-rail>
          {augustaTemporalFrames.map((frame) => (
            <button
              aria-pressed={activeFrameId === frame.id}
              data-eco-rail-key
              data-tone={frame.mode === "scenario" ? "gold" : frame.mode === "historical" ? "violet" : "green"}
              key={frame.id}
              onClick={() => setActiveFrameId(frame.id)}
              type="button"
              title={frame.label}
            >
              <span>{frame.index}</span>
              <strong>{frame.shortLabel}</strong>
            </button>
          ))}
        </div>
        <div data-eco-rail-status>
          <span>{mapPosture.label}</span>
          <strong>{activeFrame.timeLabel}</strong>
          <details data-eco-inline-disclosure>
            <summary>frame contract</summary>
            <p>{activeFrame.description} {activeFrame.claimPosture}</p>
          </details>
        </div>
      </section>

      <section data-eco-control-deck aria-label="Representation controls">
        <div data-eco-panel data-tone="cyan">
          <PanelHeader eyebrow="Projection" title="Measurement plane" icon={Database} tone="cyan" />
          <div data-eco-key-bank data-columns="5">
            <button aria-pressed={activePlane === "all"} data-eco-control-key data-tone="neutral" onClick={() => setActivePlane("all")} type="button">
              <span>Σ</span><strong>All</strong><small>combined view</small>
            </button>
            {economicPlanes.map((plane) => (
              <button aria-pressed={activePlane === plane.id} data-eco-control-key data-tone={planeTone[plane.id]} key={plane.id} onClick={() => setActivePlane(plane.id)} type="button" title={plane.description}>
                <span>{plane.notation}</span><strong>{plane.label.replace(" state", "")}</strong><small>{plane.id}</small>
              </button>
            ))}
          </div>
        </div>

        <div data-eco-panel data-tone="green">
          <PanelHeader eyebrow="Boundary" title="System layer" icon={Layers3} tone="green" />
          <div data-eco-key-bank data-columns="5">
            <button aria-pressed={activeLayer === "all"} data-eco-control-key data-tone="neutral" onClick={() => setActiveLayer("all")} type="button">
              <span>◎</span><strong>All</strong><small>whole cross-section</small>
            </button>
            {augustaSystemLayers.map((layer) => (
              <button aria-pressed={activeLayer === layer.id} data-eco-control-key data-tone={layerTone[layer.id]} key={layer.id} onClick={() => setActiveLayer(layer.id)} type="button" title={layer.description}>
                <span>{layer.id.slice(0, 1).toUpperCase()}</span><strong>{layer.label.replace(" systems", "").replace(" institutions", "")}</strong><small>{layer.id}</small>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section data-eco-main-grid>
        <section data-eco-panel data-eco-map-panel data-tone="cyan" aria-label="Augusta systems cross-section">
          <PanelHeader
            eyebrow="System bed"
            title="Augusta-Richmond County cross-section"
            icon={Network}
            tone="cyan"
            action={(
              <div data-eco-toggle-pair>
                <button aria-pressed={showOrientation} onClick={() => setShowOrientation((value) => !value)} type="button">orientation</button>
                <button aria-pressed={showTopology} onClick={() => setShowTopology((value) => !value)} type="button">topology</button>
              </div>
            )}
          />

          <div data-eco-map-bed>
            <svg aria-label="Augusta schematic systems surface" preserveAspectRatio="none" viewBox="0 0 100 100">
              <defs>
                <filter id="eco-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="0.5" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {showOrientation ? augustaSpatialZones.map((zone) => {
                const signal = surfaceSignals.find((candidate) => candidate.targetKind === "zone" && candidate.targetId === zone.id);
                const color = signal ? surfaceTone[signal.signalClass] : "rgba(155,176,180,0.16)";
                return (
                  <g key={zone.id} opacity={activeFrame.mode === "historical" && zone.kind !== "historical" ? 0.28 : 1}>
                    <rect fill={signal ? `${color}10` : "rgba(255,255,255,0.012)"} height={zone.height} rx="1.2" stroke={color} strokeDasharray="1.4 1.3" strokeOpacity={signal ? 0.52 : 0.16} strokeWidth="0.34" width={zone.width} x={zone.x} y={zone.y} />
                    <text fill={signal ? color : "rgba(212,222,221,0.23)"} fontFamily="monospace" fontSize="1.35" letterSpacing="0.18" x={zone.x + 1.2} y={zone.y + 2.4}>{zone.label}</text>
                  </g>
                );
              }) : null}

              {showOrientation ? augustaSpatialRoutes.map((route) => {
                const signal = surfaceSignals.find((candidate) => candidate.targetKind === "route" && candidate.targetId === route.id);
                const stroke = signal ? surfaceTone[signal.signalClass] : routeStroke(route.kind);
                return (
                  <g key={route.id} opacity={activeFrame.mode === "historical" ? 0.28 : 0.78}>
                    <path d={route.d} fill="none" stroke="rgba(0,0,0,0.74)" strokeWidth={route.kind === "river" ? 3.4 : 1.3} />
                    <path d={route.d} fill="none" stroke={stroke} strokeDasharray={signal?.signalClass === "gap" || route.kind === "beltway" ? "1.2 1" : undefined} strokeWidth={signal ? 0.78 : route.kind === "river" ? 2.2 : route.kind === "canal" ? 0.85 : 0.44} />
                    <text fill={stroke} fontFamily="monospace" fontSize={route.kind === "river" ? "1.65" : "1.15"} letterSpacing="0.18" opacity="0.52" transform={route.labelRotate ? `rotate(${route.labelRotate} ${route.labelX} ${route.labelY})` : undefined} x={route.labelX} y={route.labelY}>{route.label}</text>
                  </g>
                );
              }) : null}

              {showTopology ? visibleEdges.map((edge) => {
                const from = augustaMapNodes.find((node) => node.id === edge.from);
                const to = augustaMapNodes.find((node) => node.id === edge.to);
                if (!from || !to) return null;
                const fromPosition = getAugustaSpatialPosition(from.id, from);
                const toPosition = getAugustaSpatialPosition(to.id, to);
                const selectedEdge = edge.from === selectedNodeId || edge.to === selectedNodeId;
                const scenarioEdge = scenarioActive && evaluation.affectedEdgeIds.includes(edge.id);
                const stressEdge = scenarioEdge && evaluation.activeOptions.some(({ option }) => option.posture === "stress" && option.affectedEdgeIds.includes(edge.id));
                const stroke = scenarioEdge ? (stressEdge ? "#d2ad22" : "#9ad62f") : selectedEdge ? "#66b6d9" : edge.evidence === "interpretive" ? "#a05de9" : "#65777c";
                return (
                  <g key={edge.id} filter={scenarioEdge || selectedEdge ? "url(#eco-glow)" : undefined}>
                    <line stroke="rgba(0,0,0,0.92)" strokeLinecap="round" strokeWidth={scenarioEdge ? 1.75 : selectedEdge ? 1.35 : 0.9} x1={fromPosition.x} x2={toPosition.x} y1={fromPosition.y} y2={toPosition.y} />
                    <line stroke={stroke} strokeDasharray={edge.evidence === "interpretive" || scenarioEdge ? "1.5 1" : undefined} strokeLinecap="round" strokeOpacity={scenarioEdge ? 0.95 : selectedEdge ? 0.72 : 0.25} strokeWidth={scenarioEdge ? 0.72 : selectedEdge ? 0.52 : 0.3} x1={fromPosition.x} x2={toPosition.x} y1={fromPosition.y} y2={toPosition.y} />
                  </g>
                );
              }) : null}
            </svg>

            <div data-eco-map-label>
              <span>{activeFrame.index} / {activePlane === "all" ? "Σ" : economicPlanes.find((plane) => plane.id === activePlane)?.notation}</span>
              <strong>{mapPosture.label}</strong>
            </div>

            {visibleNodes.map((node) => {
              const Icon = nodeIcon(node.type);
              const position = getAugustaSpatialPosition(node.id, node);
              const active = node.id === selectedNodeId;
              const signal = surfaceSignals.find((candidate) => candidate.targetKind === "node" && candidate.targetId === node.id);
              const scenarioNode = scenarioActive && evaluation.affectedNodeIds.includes(node.id);
              const stressNode = scenarioNode && evaluation.activeOptions.some(({ option }) => option.posture === "stress" && option.affectedNodeIds.includes(node.id));
              const tone = scenarioNode ? (stressNode ? "gold" : "green") : signal?.signalClass === "interpretive" ? "violet" : signal?.signalClass === "open" ? "gold" : signal?.signalClass === "observed" ? "green" : layerTone[node.layer];
              const status = scenarioNode ? (stressNode ? "stress" : "intervention") : signal?.label ?? node.evidence;
              return (
                <button
                  aria-pressed={active}
                  data-eco-node
                  data-tone={tone}
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  style={{ left: `${position.x}%`, top: `${position.y}%` }}
                  type="button"
                >
                  <span data-eco-node-port aria-hidden="true" />
                  <span data-eco-node-icon><Icon className="h-4 w-4" aria-hidden="true" /></span>
                  <span data-eco-node-copy>
                    <strong>{node.label}</strong>
                    <small>{shortStatus(status)}</small>
                  </span>
                </button>
              );
            })}

            <div data-eco-map-legend>
              <Lamp label="observed" tone="green" />
              <Lamp label="open" tone="gold" />
              <Lamp label="interpretive" tone="violet" />
              <Lamp label="no signal" tone="neutral" />
            </div>
          </div>
        </section>

        <aside data-eco-inspector-rack>
          <section data-eco-panel data-tone={layerTone[selected.layer]} aria-labelledby="eco-selected-object-title">
            <PanelHeader eyebrow="Bound object" title="Object inspector" icon={Cable} tone={layerTone[selected.layer]} action={<Lamp label={selected.evidence} tone={layerTone[selected.layer]} />} />
            <div data-eco-object-header>
              <span data-eco-object-icon>{(() => { const Icon = nodeIcon(selected.type); return <Icon className="h-6 w-6" aria-hidden="true" />; })()}</span>
              <div>
                <h2 id="eco-selected-object-title">{selected.label}</h2>
                <p>{selected.role}</p>
              </div>
            </div>
            <div data-eco-mini-grid>
              <Readout label="Layer" value={selected.layer} tone={layerTone[selected.layer]} />
              <Readout label="Signals" value={`${visibleInstrumentEntries.length}`} sub="on active plane" tone={activePlane === "all" ? "neutral" : planeTone[activePlane]} />
              <Readout label="Relations" value={`${connectedEdges.length}`} sub="in frame" tone="cyan" />
            </div>
            {selectedSignal ? <div data-eco-signal-strip style={{ borderColor: selectedTone, color: selectedTone }}><strong>{selectedSignal.label}</strong><span>{selectedSignal.evidence}</span></div> : null}
            <details data-eco-disclosure>
              <summary>inspect object + provenance</summary>
              <div data-eco-disclosure-body>
                <p>{selected.description}</p>
                {selected.sourceHref ? <a href={selected.sourceHref} rel="noreferrer" target="_blank">{selected.sourceLabel}</a> : <span>{selected.sourceLabel}</span>}
                <p>{augustaCrossSection.coordinateContract}</p>
              </div>
            </details>
          </section>

          <section data-eco-panel data-tone={activePlane === "all" ? "neutral" : planeTone[activePlane]} aria-label="Attached instruments">
            <PanelHeader eyebrow="Readouts" title="Attached instruments" icon={Gauge} tone={activePlane === "all" ? "neutral" : planeTone[activePlane]} action={<span data-eco-counter>{visibleInstrumentEntries.length}</span>} />
            <div data-eco-instrument-stack>
              {visibleInstrumentEntries.length ? visibleInstrumentEntries.map(({ instrument, disposition }) => (
                <InstrumentReadout instrument={instrument} disposition={disposition} key={instrument.id} />
              )) : (
                <div data-eco-empty-bay>
                  <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                  <strong>NO SIGNAL ON THIS CHANNEL</strong>
                  <span>Unknown remains unknown.</span>
                </div>
              )}
            </div>
          </section>
        </aside>
      </section>

      <section data-eco-lower-deck>
        <section data-eco-panel data-tone="violet" aria-labelledby="eco-scenario-title">
          <PanelHeader
            eyebrow="Operator bank"
            title="Scenario switchboard"
            icon={SlidersHorizontal}
            tone="violet"
            action={<button data-eco-reset onClick={reset} type="button"><RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> reset</button>}
          />
          <div data-eco-scenario-summary>
            <Readout label="Postures" value={`${evaluation.activeOptions.length}`} sub="non-baseline" tone="violet" />
            <Readout label="Objects" value={`${evaluation.affectedNodeIds.length}`} sub="touched" tone="green" />
            <Readout label="Paths" value={`${evaluation.affectedEdgeIds.length}`} sub="touched" tone="cyan" />
            <Readout label="Open" value={`${evaluation.unresolved.length}`} sub="unresolved" tone="gold" />
          </div>
          <div data-eco-switchboard>
            {augustaScenarioControls.map((control) => {
              const selectedId = selections[control.id];
              const selectedOption = control.options.find((option) => option.id === selectedId) ?? control.options[0];
              return (
                <div data-eco-switch-row key={control.id}>
                  <div data-eco-switch-label>
                    <strong>{control.shortLabel}</strong>
                    <span>{control.question}</span>
                  </div>
                  <div data-eco-three-way>
                    {control.options.map((option) => (
                      <button
                        aria-pressed={selectedId === option.id}
                        data-tone={postureTone[option.posture]}
                        key={option.id}
                        onClick={() => selectOption(control.id, option.id)}
                        title={option.description}
                        type="button"
                      >
                        <span>{option.posture === "baseline" ? "B" : option.posture === "intervention" ? "+" : "!"}</span>
                        <strong>{option.label}</strong>
                      </button>
                    ))}
                  </div>
                  <Lamp label={selectedOption.posture} tone={postureTone[selectedOption.posture]} />
                </div>
              );
            })}
          </div>
          <details data-eco-disclosure>
            <summary>compiled consequence ledger</summary>
            <div data-eco-ledger-grid>
              <LedgerGroup label="Affected objects" items={evaluation.affectedNodeIds.map(nodeLabel)} />
              <LedgerGroup label="Admissibility" items={evaluation.admissibility} />
              <LedgerGroup label="Required observables" items={evaluation.observables} />
              <LedgerGroup label="Unresolved remainder" items={evaluation.unresolved} />
            </div>
          </details>
        </section>

        <section data-eco-calibration-grid aria-label="Calibrated transitions">
          <CalibrationPanel
            tone="blue"
            eyebrow={`${highlandAvenueWaterCalibration.id} · ratio`}
            title="Water load / design"
            icon={Waves}
            status={waterTransition.status}
            statusTone={waterTransition.status === "reported-design-boundary-crossed" || waterTransition.status === "inadmissible-input" ? "red" : waterTransition.executed ? "green" : "neutral"}
            equation="ρ₁ = (Q₀ + ΔQ) / Cdesign"
          >
            <label data-eco-input-socket>
              <span>ΔQ · added average flow</span>
              <div><input inputMode="decimal" min="0" onChange={(event) => setWaterAddedAverageFlowMgd(event.target.value)} placeholder="0.0" step="0.1" type="number" value={waterAddedAverageFlowMgd} /><strong>MGD</strong></div>
            </label>
            <div data-eco-calibration-readouts>
              <Readout label="Observed" value={`${waterTransition.baselineFlowMgd} MGD`} tone="blue" />
              <Readout label="Design" value={`${waterTransition.designCapacityMgd} MGD`} tone="blue" />
              <Readout label="Ratio" value={formatWaterRatio(waterTransition.scenarioRatio ?? waterTransition.baselineRatio)} tone={waterTransition.executed ? "green" : "neutral"} />
            </div>
            <details data-eco-disclosure>
              <summary>limits + unresolved observables</summary>
              <div data-eco-disclosure-body><p>{waterTransition.interpretation}</p><p>{highlandAvenueWaterCalibration.claimBoundary}</p><p>{highlandAvenueWaterCalibration.unresolvedObservables.join(" · ")}</p></div>
            </details>
          </CalibrationPanel>

          <CalibrationPanel
            tone="gold"
            eyebrow={`${augustaResurfacingCalibration.id} · stock`}
            title="Road resurfacing output"
            icon={Route}
            status={transportTransition.status}
            statusTone={transportTransition.status === "inadmissible-input" || transportTransition.status === "contract-invalid" ? "red" : transportTransition.executed ? "green" : "neutral"}
            equation="M₁ = M₀ + ΔM"
          >
            <label data-eco-input-socket>
              <span>ΔM · added resurfacing</span>
              <div><input inputMode="decimal" min="0" onChange={(event) => setTransportAddedResurfacingMiles(event.target.value)} placeholder="0.0" step="0.1" type="number" value={transportAddedResurfacingMiles} /><strong>road-mi</strong></div>
            </label>
            <div data-eco-calibration-readouts>
              <Readout label="Published" value={`${transportTransition.baselineValue.toFixed(1)} mi`} tone="gold" />
              <Readout label="Added" value={transportTransition.inputValue == null ? "—" : `${transportTransition.inputValue.toFixed(1)} mi`} tone="gold" />
              <Readout label="Scenario" value={transportTransition.scenarioValue == null ? "—" : `${transportTransition.scenarioValue.toFixed(1)} mi`} tone={transportTransition.executed ? "green" : "neutral"} />
            </div>
            <details data-eco-disclosure>
              <summary>limits + missing denominator</summary>
              <div data-eco-disclosure-body><p>{transportTransition.interpretation}</p><p>{augustaResurfacingCalibration.claimBoundary}</p><p>{augustaResurfacingCalibration.unresolvedObservables.join(" · ")}</p></div>
            </details>
          </CalibrationPanel>

          <CalibrationPanel
            tone="red"
            eyebrow="TRANSITION FAMILY · stock-flow"
            title="Replacement / backlog"
            icon={Wrench}
            status="source contract open"
            statusTone="gold"
            equation="Bₜ₊₁ = Bₜ + Aₜ − Rₜ"
          >
            <div data-eco-disabled-socket>
              <span>Execution interlock</span>
              <strong>NO SOURCE-BOUND Bₜ</strong>
              <p>Baseline backlog, period boundary, and closure rule are required before this channel can execute.</p>
            </div>
            <div data-eco-calibration-readouts>
              <Readout label="Baseline" value="REQUIRED" tone="red" />
              <Readout label="Admitted" value="Aₜ" sub="explicit" tone="gold" />
              <Readout label="Resolved" value="Rₜ" sub="closure rule" tone="green" />
            </div>
            <details data-eco-disclosure>
              <summary>why this channel is locked</summary>
              <div data-eco-disclosure-body><p>The current 119.60-mile resurfacing observation is cumulative maintenance output, not a remaining backlog stock. The apparatus therefore refuses to reinterpret it as Bₜ.</p></div>
            </details>
          </CalibrationPanel>
        </section>
      </section>

      <footer data-eco-console-footer>
        <div><ShieldCheck className="h-4 w-4" aria-hidden="true" /><strong>Representation contract</strong></div>
        <span>schematic geography</span>
        <span>unknown ≠ zero</span>
        <span>scenario ≠ forecast</span>
        <a href={augustaSpatialContract.sourceHref} rel="noreferrer" target="_blank">GIS upgrade path</a>
      </footer>
    </main>
  );
}

function LedgerGroup({ label, items }: { label: string; items: string[] }) {
  return (
    <div data-eco-ledger-group>
      <strong>{label}</strong>
      {items.length ? <ul>{items.slice(0, 8).map((item) => <li key={item}>{item}</li>)}</ul> : <span>None declared.</span>}
    </div>
  );
}

function CalibrationPanel({
  tone,
  eyebrow,
  title,
  icon,
  status,
  statusTone,
  equation,
  children,
}: {
  tone: string;
  eyebrow: string;
  title: string;
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  status: string;
  statusTone: string;
  equation: string;
  children: React.ReactNode;
}) {
  return (
    <section data-eco-panel data-eco-calibration-panel data-tone={tone}>
      <PanelHeader eyebrow={eyebrow} title={title} icon={icon} tone={tone} action={<Lamp label={shortStatus(status)} tone={statusTone} />} />
      <div data-eco-equation>{equation}</div>
      {children}
    </section>
  );
}
