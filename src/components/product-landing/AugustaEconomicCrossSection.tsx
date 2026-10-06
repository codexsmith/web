'use client';

import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Building2,
  Factory,
  Gauge,
  Landmark,
  Network,
  RadioTower,
  School,
  Waves,
} from "lucide-react";
import { EconomicInstrument } from "./EconomicInstrumentationConsole";
import { useAugustaScenario } from "./AugustaScenarioContext";
import { economicPlanes, type EconomicPlane } from "@/lib/economic-instrumentation";
import {
  augustaConsequenceEdges,
  augustaCrossSection,
  augustaInstruments,
  augustaMapNodes,
  augustaSystemLayers,
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
  augustaSurfaceLegend,
  getAugustaSurfaceSignals,
  type AugustaSurfaceSignalClass,
} from "@/lib/augusta-surface-instrumentation";
import {
  augustaTemporalContract,
  augustaTemporalFrames,
  getAugustaTemporalFrame,
  getTemporalInstrumentDisposition,
  getTemporalMapPosture,
  type AugustaTemporalFrameId,
  type AugustaTemporalMode,
} from "@/lib/augusta-temporal-state";

const planeTone: Record<EconomicPlane, string> = {
  reference: "border-brand-blue/45 bg-brand-blue/[0.08] text-brand-blue",
  referent: "border-brand-green/45 bg-brand-green/[0.08] text-brand-green",
  maintenance: "border-brand-gold/45 bg-brand-gold/[0.08] text-brand-gold",
  closure: "border-brand-red/45 bg-brand-red/[0.08] text-brand-red",
};

const temporalTone: Record<AugustaTemporalMode, string> = {
  historical: "border-[#b9a4d5]/45 bg-[#b9a4d5]/[0.07] text-[#d5c6e8]",
  current: "border-brand-green/45 bg-brand-green/[0.07] text-brand-green",
  scenario: "border-brand-gold/55 bg-brand-gold/[0.08] text-brand-gold",
};

const surfaceTone: Record<AugustaSurfaceSignalClass, { stroke: string; fill: string; text: string }> = {
  observed: { stroke: "rgba(151,203,130,0.78)", fill: "rgba(151,203,130,0.11)", text: "rgba(190,226,176,0.9)" },
  gap: { stroke: "rgba(238,226,198,0.34)", fill: "url(#surface-gap)", text: "rgba(238,226,198,0.62)" },
  open: { stroke: "rgba(228,185,83,0.82)", fill: "rgba(228,185,83,0.10)", text: "rgba(240,211,137,0.92)" },
  interpretive: { stroke: "rgba(191,171,224,0.72)", fill: "rgba(191,171,224,0.08)", text: "rgba(213,199,236,0.88)" },
  seeded: { stroke: "rgba(173,190,186,0.55)", fill: "rgba(173,190,186,0.06)", text: "rgba(205,214,211,0.76)" },
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
    case "river": return "rgb(94 165 201 / 0.55)";
    case "canal": return "rgb(94 165 201 / 0.30)";
    case "highway": return "rgb(238 226 198 / 0.25)";
    case "beltway": return "rgb(238 226 198 / 0.18)";
    default: return "rgb(238 226 198 / 0.14)";
  }
}

function historicalNodeOpacity(node: AugustaMapNode, mode: AugustaTemporalMode) {
  if (mode !== "historical") return 1;
  if (node.layer === "historical") return 1;
  if (node.layer === "civic") return 0.55;
  return 0.24;
}

export function AugustaEconomicCrossSection() {
  const [activePlane, setActivePlane] = useState<EconomicPlane | "all">("all");
  const [activeLayer, setActiveLayer] = useState<AugustaSystemLayer | "all">("all");
  const [activeFrameId, setActiveFrameId] = useState<AugustaTemporalFrameId>("current");
  const [selectedNode, setSelectedNode] = useState("savannah-water");
  const [showTopology, setShowTopology] = useState(true);
  const [showOrientation, setShowOrientation] = useState(true);
  const { evaluation: scenarioEvaluation } = useAugustaScenario();

  useEffect(() => {
    if (scenarioEvaluation.activeOptions.length) setActiveFrameId("scenario");
  }, [scenarioEvaluation.activeOptions.length]);

  const activeFrame = getAugustaTemporalFrame(activeFrameId);
  const mapPosture = getTemporalMapPosture(activeFrame);
  const scenarioActive = activeFrame.mode === "scenario" && scenarioEvaluation.activeOptions.length > 0;

  const visibleNodes = useMemo(
    () => activeLayer === "all" ? augustaMapNodes : augustaMapNodes.filter((node) => node.layer === activeLayer),
    [activeLayer],
  );

  const temporalEdges = useMemo(
    () => activeFrame.mode === "historical"
      ? augustaConsequenceEdges.filter((edge) => edge.evidence === "interpretive")
      : augustaConsequenceEdges,
    [activeFrame.mode],
  );

  const selected = augustaMapNodes.find((node) => node.id === selectedNode) ?? null;
  const connectedEdges = useMemo(
    () => temporalEdges.filter((edge) => edge.from === selectedNode || edge.to === selectedNode),
    [selectedNode, temporalEdges],
  );

  const surfaceSignals = useMemo(
    () => activeFrame.mode === "historical" ? [] : getAugustaSurfaceSignals(activePlane, activeLayer),
    [activeFrame.mode, activeLayer, activePlane],
  );

  const visibleInstrumentEntries = useMemo(() => {
    if (!selected) return [];
    return selected.instrumentIds
      .map((id) => augustaInstruments.find((instrument) => instrument.id === id))
      .filter((instrument): instrument is NonNullable<typeof instrument> => Boolean(instrument))
      .filter((instrument) => activePlane === "all" || instrument.plane === activePlane)
      .map((instrument) => ({ instrument, disposition: getTemporalInstrumentDisposition(instrument.id, activeFrame) }))
      .filter((entry) => entry.disposition !== "withheld");
  }, [activeFrame, activePlane, selected]);

  return (
    <section className="border-b border-border bg-[#11150f] px-5 py-10 text-brand-ivory sm:px-8 sm:py-12" aria-labelledby="augusta-cross-section-title">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <div className="flex items-center gap-3">
              <Gauge className="h-5 w-5 text-brand-gold" aria-hidden="true" />
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-brand-gold">BF-ECO-AUG-01 · civilizational cross-section</p>
            </div>
            <h1 id="augusta-cross-section-title" className="mt-4 max-w-5xl font-serif text-4xl font-semibold leading-tight sm:text-5xl">Augusta, viewed as a state trajectory.</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/52">The city stays put while representation, system layer, and temporal frame change independently. Historical frames withhold present measurements rather than backcasting them; scenario declarations illuminate touched state without pretending to predict it.</p>
          </div>
          <div className="border border-white/12 bg-white/[0.025] px-4 py-3 font-mono text-[8px] uppercase tracking-[0.1em] text-white/40">{augustaCrossSection.status} · {augustaCrossSection.geography}</div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(23rem,0.6fr)]">
          <div className="border border-white/15 bg-black/10 p-4 sm:p-5">
            <div className="grid gap-4 border-b border-white/10 pb-4">
              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-white/38">State trajectory · temporal evidence context</p>
                  <span className={`border px-2 py-1 font-mono text-[7px] font-semibold uppercase tracking-[0.08em] ${temporalTone[activeFrame.mode]}`}>{activeFrame.mode}</span>
                </div>
                <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-6">
                  {augustaTemporalFrames.map((frame) => (
                    <button
                      aria-pressed={activeFrameId === frame.id}
                      className={`min-h-14 border px-2 py-2 text-left ${activeFrameId === frame.id ? temporalTone[frame.mode] : "border-white/10 bg-black/10 text-white/34"}`}
                      key={frame.id}
                      onClick={() => setActiveFrameId(frame.id)}
                      type="button"
                    >
                      <span className="block font-mono text-[7px] font-semibold uppercase tracking-[0.08em] opacity-60">{frame.index}</span>
                      <span className="mt-1 block font-mono text-[8px] font-semibold uppercase tracking-[0.07em]">{frame.shortLabel}</span>
                    </button>
                  ))}
                </div>
                <div className={`mt-2 border p-3 ${temporalTone[activeFrame.mode]}`}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] opacity-70">{activeFrame.index} · {activeFrame.timeLabel}</p>
                      <p className="mt-1 text-[11px] leading-5 text-white/58">{activeFrame.description}</p>
                    </div>
                    {activeFrame.sourceHref ? <a className="font-mono text-[7px] uppercase tracking-[0.08em] underline decoration-current/25 underline-offset-2" href={activeFrame.sourceHref} rel="noreferrer" target="_blank">frame source</a> : null}
                  </div>
                  <p className="mt-2 border-t border-current/10 pt-2 font-mono text-[7px] uppercase leading-4 tracking-[0.07em] opacity-60">{activeFrame.claimPosture}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button className={`min-h-9 border px-3 font-mono text-[8px] font-semibold uppercase tracking-[0.1em] ${activePlane === "all" ? "border-white/40 bg-white/[0.08] text-white" : "border-white/12 text-white/42"}`} onClick={() => setActivePlane("all")} type="button">All measurement planes</button>
                {economicPlanes.map((plane) => (
                  <button className={`min-h-9 border px-3 font-mono text-[8px] font-semibold uppercase tracking-[0.1em] ${activePlane === plane.id ? planeTone[plane.id] : "border-white/12 text-white/42"}`} key={plane.id} onClick={() => setActivePlane(plane.id)} type="button">{plane.notation} · {plane.label}</button>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  <button className={`min-h-9 border px-3 font-mono text-[8px] font-semibold uppercase tracking-[0.1em] ${activeLayer === "all" ? "border-white/40 bg-white/[0.08] text-white" : "border-white/12 text-white/42"}`} onClick={() => setActiveLayer("all")} type="button">All system layers</button>
                  {augustaSystemLayers.map((layer) => (
                    <button className={`min-h-9 border px-3 font-mono text-[8px] font-semibold uppercase tracking-[0.1em] ${activeLayer === layer.id ? "border-brand-gold/45 bg-brand-gold/[0.08] text-brand-gold" : "border-white/12 text-white/42"}`} key={layer.id} onClick={() => setActiveLayer(layer.id)} title={layer.description} type="button">{layer.label}</button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button aria-pressed={showOrientation} className={`inline-flex min-h-9 items-center border px-3 font-mono text-[8px] font-semibold uppercase tracking-[0.1em] ${showOrientation ? "border-brand-blue/45 bg-brand-blue/[0.08] text-brand-blue" : "border-white/12 text-white/42"}`} onClick={() => setShowOrientation((value) => !value)} type="button">City orientation</button>
                  <button aria-pressed={showTopology} className={`inline-flex min-h-9 items-center border px-3 font-mono text-[8px] font-semibold uppercase tracking-[0.1em] ${showTopology ? "border-brand-gold/45 bg-brand-gold/[0.08] text-brand-gold" : "border-white/12 text-white/42"}`} onClick={() => setShowTopology((value) => !value)} type="button"><Network className="mr-2 h-3.5 w-3.5" aria-hidden="true" />Topology</button>
                </div>
              </div>
            </div>

            <div className="relative mt-5 min-h-[45rem] overflow-hidden border border-white/12 bg-[#172017]">
              <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:2rem_2rem]" />

              {showOrientation ? (
                <svg aria-label="Augusta schematic orientation and instrumented surface" className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <defs>
                    <pattern id="surface-gap" patternUnits="userSpaceOnUse" width="2.4" height="2.4" patternTransform="rotate(45)">
                      <line x1="0" y1="0" x2="0" y2="2.4" stroke="rgba(238,226,198,0.22)" strokeWidth="0.55" />
                    </pattern>
                  </defs>

                  {augustaSpatialZones.map((zone) => {
                    const signal = surfaceSignals.find((candidate) => candidate.targetKind === "zone" && candidate.targetId === zone.id);
                    const tone = signal ? surfaceTone[signal.signalClass] : null;
                    return (
                      <g key={zone.id} opacity={activeFrame.mode === "historical" && zone.kind !== "historical" ? 0.42 : 1}>
                        <rect fill={tone?.fill ?? "rgba(238,226,198,0.025)"} height={zone.height} rx="1.5" stroke={tone?.stroke ?? "rgba(238,226,198,0.08)"} strokeDasharray={signal?.signalClass === "interpretive" ? "2 1.5" : "1.5 1.5"} strokeWidth={signal ? 0.45 : 0.2} width={zone.width} x={zone.x} y={zone.y} />
                        <text fill={tone?.text ?? "rgba(238,226,198,0.22)"} fontFamily="monospace" fontSize="1.8" letterSpacing="0.3" x={zone.x + 1.5} y={zone.y + 3.2}>{zone.label}</text>
                        {signal ? <text fill={tone?.text} fontFamily="monospace" fontSize="1.3" letterSpacing="0.18" x={zone.x + 1.5} y={zone.y + zone.height - 1.6}>{signal.label}</text> : null}
                      </g>
                    );
                  })}

                  {augustaSpatialRoutes.map((route) => {
                    const signal = surfaceSignals.find((candidate) => candidate.targetKind === "route" && candidate.targetId === route.id);
                    const tone = signal ? surfaceTone[signal.signalClass] : null;
                    const temporalOpacity = activeFrame.mode === "historical" ? 0.3 : activeFrame.mode === "scenario" ? 0.65 : 1;
                    return (
                      <g key={route.id} opacity={temporalOpacity}>
                        {signal?.signalClass === "gap" ? <path d={route.d} fill="none" stroke="rgba(238,226,198,0.15)" strokeDasharray="1 1" strokeWidth="2.1" /> : null}
                        <path d={route.d} fill="none" stroke={tone?.stroke ?? routeStroke(route.kind)} strokeDasharray={signal?.signalClass === "gap" ? "1 1" : route.kind === "beltway" ? "2 1.5" : undefined} strokeWidth={signal ? 1.05 : route.kind === "river" ? 2.8 : route.kind === "canal" ? 1.2 : route.kind === "highway" ? 0.75 : 0.45} />
                        <text fill={tone?.text ?? (route.kind === "river" || route.kind === "canal" ? "rgba(140,196,220,0.5)" : "rgba(238,226,198,0.30)")} fontFamily="monospace" fontSize={route.kind === "river" ? "2.2" : "1.65"} letterSpacing="0.25" transform={route.labelRotate ? `rotate(${route.labelRotate} ${route.labelX} ${route.labelY})` : undefined} x={route.labelX} y={route.labelY}>{route.label}</text>
                      </g>
                    );
                  })}
                  <text fill="rgba(238,226,198,0.23)" fontFamily="monospace" fontSize="1.8" letterSpacing="0.35" x="63" y="19">AUGUSTA · GA</text>
                  <text fill="rgba(238,226,198,0.15)" fontFamily="monospace" fontSize="1.6" x="79" y="6">N ↑</text>
                </svg>
              ) : null}

              {showTopology ? (
                <svg aria-label="Augusta prototype systems topology" className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  {temporalEdges.map((edge) => {
                    const from = augustaMapNodes.find((node) => node.id === edge.from);
                    const to = augustaMapNodes.find((node) => node.id === edge.to);
                    if (!from || !to) return null;
                    if (activeLayer !== "all" && from.layer !== activeLayer && to.layer !== activeLayer) return null;
                    const fromPosition = getAugustaSpatialPosition(from.id, from);
                    const toPosition = getAugustaSpatialPosition(to.id, to);
                    const emphasized = edge.from === selectedNode || edge.to === selectedNode;
                    const scenarioEdgeActive = scenarioActive && scenarioEvaluation.affectedEdgeIds.includes(edge.id);
                    const scenarioEdgeStress = scenarioEdgeActive && scenarioEvaluation.activeOptions.some(({ option }) => option.posture === "stress" && option.affectedEdgeIds.includes(edge.id));
                    const stroke = scenarioEdgeActive ? (scenarioEdgeStress ? "rgba(228,185,83,0.96)" : "rgba(151,203,130,0.96)") : "currentColor";
                    const opacity = scenarioEdgeActive ? 0.92 : emphasized ? 0.38 : 0.1;
                    const width = scenarioEdgeActive ? 0.85 : emphasized ? 0.5 : 0.2;
                    return <line key={edge.id} stroke={stroke} strokeDasharray={scenarioEdgeActive ? "1.2 0.8" : edge.evidence === "illustrative" ? "0" : "2.5 2.5"} strokeOpacity={opacity} strokeWidth={width} x1={fromPosition.x} x2={toPosition.x} y1={fromPosition.y} y2={toPosition.y} />;
                  })}
                </svg>
              ) : null}

              {visibleNodes.map((node) => {
                const Icon = nodeIcon(node.type);
                const active = selectedNode === node.id;
                const connected = connectedEdges.some((edge) => edge.from === node.id || edge.to === node.id);
                const position = getAugustaSpatialPosition(node.id, node);
                const signal = surfaceSignals.find((candidate) => candidate.targetKind === "node" && candidate.targetId === node.id);
                const tone = signal ? surfaceTone[signal.signalClass] : null;
                const opacity = historicalNodeOpacity(node, activeFrame.mode);
                const scenarioNodeActive = scenarioActive && scenarioEvaluation.affectedNodeIds.includes(node.id);
                const scenarioNodeStress = scenarioNodeActive && scenarioEvaluation.activeOptions.some(({ option }) => option.posture === "stress" && option.affectedNodeIds.includes(node.id));
                const scenarioStroke = scenarioNodeStress ? "rgba(228,185,83,0.96)" : "rgba(151,203,130,0.96)";
                return (
                  <button
                    aria-pressed={active}
                    className={`absolute max-w-44 -translate-x-1/2 -translate-y-1/2 border p-3 text-left shadow-lg transition-all hover:scale-[1.03] ${active ? "border-brand-gold bg-brand-gold/15" : connected ? "border-white/30 bg-[#11150f]/95" : "border-white/18 bg-[#11150f]/92"}`}
                    key={node.id}
                    onClick={() => setSelectedNode(node.id)}
                    style={{ left: `${position.x}%`, top: `${position.y}%`, borderColor: active ? undefined : scenarioNodeActive ? scenarioStroke : tone?.stroke, backgroundImage: signal?.signalClass === "gap" ? "repeating-linear-gradient(135deg, rgba(238,226,198,0.055) 0 5px, rgba(17,21,15,0.96) 5px 10px)" : undefined, boxShadow: scenarioNodeActive ? `0 0 0 2px ${scenarioStroke}, 0 0 24px ${scenarioNodeStress ? "rgba(228,185,83,0.14)" : "rgba(151,203,130,0.14)"}` : undefined, opacity }}
                    type="button"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 shrink-0" style={{ color: scenarioNodeActive ? scenarioStroke : tone?.text }} aria-hidden="true" />
                      <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.09em] text-white/66">{node.label}</span>
                    </div>
                    <span className="mt-2 block font-mono text-[7px] uppercase tracking-[0.08em] text-white/30">{scenarioNodeActive ? `${scenarioNodeStress ? "SCENARIO STRESS" : "INTERVENTION BOUNDARY"} · OBSERVABILITY OPEN` : signal ? `${signal.label} · ${signal.evidence}` : activeFrame.mode === "historical" ? `${node.layer} · research index` : `${node.layer} · ${node.evidence}`}</span>
                  </button>
                );
              })}

              <div className={`absolute left-4 top-4 max-w-sm border p-3 ${temporalTone[activeFrame.mode]}`}>
                <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em]">{mapPosture.label}</p>
                <p className="mt-2 text-[10px] leading-5 text-white/50">{mapPosture.description}</p>
              </div>

              {scenarioActive ? (
                <div className="absolute right-4 top-4 max-w-xs border border-brand-gold/45 bg-[#11150f]/95 p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-brand-gold">Scenario observability gate</p>
                    <span className="border border-brand-red/30 px-1.5 py-1 font-mono text-[6px] font-semibold uppercase tracking-[0.07em] text-brand-red">NO NUMERIC MUTATION</span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="border border-white/10 p-2"><span className="block font-mono text-[13px] font-semibold text-white/74">{scenarioEvaluation.affectedNodeIds.length}</span><span className="font-mono text-[6px] uppercase tracking-[0.07em] text-white/30">objects touched</span></div>
                    <div className="border border-white/10 p-2"><span className="block font-mono text-[13px] font-semibold text-white/74">{scenarioEvaluation.affectedEdgeIds.length}</span><span className="font-mono text-[6px] uppercase tracking-[0.07em] text-white/30">paths touched</span></div>
                    <div className="border border-brand-green/20 p-2"><span className="block font-mono text-[13px] font-semibold text-brand-green">{scenarioEvaluation.observables.length}</span><span className="font-mono text-[6px] uppercase tracking-[0.07em] text-white/30">required observables</span></div>
                    <div className="border border-brand-gold/20 p-2"><span className="block font-mono text-[13px] font-semibold text-brand-gold">{scenarioEvaluation.unresolved.length}</span><span className="font-mono text-[6px] uppercase tracking-[0.07em] text-white/30">unresolved remainder</span></div>
                  </div>
                  <p className="mt-2 font-mono text-[6px] uppercase leading-4 tracking-[0.07em] text-white/28">Green = declared intervention boundary. Gold = declared stress boundary. Dashed paths = scenario consequence bookkeeping, not predicted propagation.</p>
                </div>
              ) : activeFrame.mode === "current" && activePlane === "reference" ? (
                <div className="absolute right-4 top-4 max-w-xs border border-brand-blue/30 bg-[#11150f]/94 p-3">
                  <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-brand-blue">Reference plane rule</p>
                  <p className="mt-2 text-[10px] leading-5 text-white/42">M_t attaches financial claims and reference instruments to objects; it does not repaint physical condition or civic capacity without an explicit resolution contract.</p>
                </div>
              ) : null}

              {activeFrame.mode === "current" && activePlane !== "all" && activePlane !== "reference" ? (
                <div className="absolute right-4 top-4 flex max-w-[52%] flex-wrap justify-end gap-1.5 border border-white/12 bg-[#11150f]/94 p-2.5">
                  {Object.entries(augustaSurfaceLegend).map(([id, item]) => {
                    const tone = surfaceTone[id as AugustaSurfaceSignalClass];
                    return (
                      <span className="inline-flex items-center gap-1.5 border px-2 py-1 font-mono text-[7px] uppercase tracking-[0.07em]" key={id} style={{ borderColor: tone.stroke, color: tone.text }} title={item.description}>
                        <span className="h-1.5 w-1.5 border" style={{ borderColor: tone.stroke, background: tone.fill.startsWith("url") ? "transparent" : tone.fill }} />{item.label}
                      </span>
                    );
                  })}
                </div>
              ) : null}

              <div className="absolute bottom-4 left-4 right-4 grid gap-3 border border-white/12 bg-[#11150f]/94 p-3 md:grid-cols-[1fr_auto] md:items-end">
                <div>
                  <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-white/38">Cross-section contract</p>
                  <p className="mt-2 text-[11px] leading-5 text-white/46">{augustaCrossSection.coordinateContract} {augustaCrossSection.evidenceContract}</p>
                  <p className="mt-2 text-[10px] leading-5 text-white/34">{augustaTemporalContract.description} Scenario highlighting indicates declared touch/pressure boundaries only; it does not mutate measurements. {augustaSpatialContract.note}</p>
                </div>
                <a className="font-mono text-[7px] uppercase tracking-[0.08em] text-white/34 underline decoration-white/15 underline-offset-2" href={augustaSpatialContract.sourceHref} rel="noreferrer" target="_blank">GIS upgrade path</a>
              </div>
            </div>
          </div>

          <aside className="grid content-start gap-4">
            {selected ? (
              <section className="border border-brand-gold/30 bg-brand-gold/[0.045] p-5" aria-labelledby="augusta-selected-object-title">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-brand-gold">Selected Augusta object</p>
                  <span className={`border px-2 py-1 font-mono text-[7px] uppercase tracking-[0.07em] ${temporalTone[activeFrame.mode]}`}>{activeFrame.index}</span>
                </div>
                <h2 className="mt-2 font-serif text-2xl font-semibold text-white/88" id="augusta-selected-object-title">{selected.label}</h2>
                <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.09em] text-white/34">{selected.layer} · {selected.role} · {selected.evidence}</p>
                <p className="mt-4 text-xs leading-6 text-white/50">{selected.description}</p>
                {activeFrame.mode === "historical" && selected.layer !== "historical" ? <p className="mt-4 border border-[#b9a4d5]/20 bg-[#b9a4d5]/[0.04] p-3 font-mono text-[7px] uppercase leading-4 tracking-[0.07em] text-[#d5c6e8]/70">Current object retained for orientation only. No present measurement is backcast into this historical frame.</p> : null}
                {scenarioActive && scenarioEvaluation.affectedNodeIds.includes(selected.id) ? <p className="mt-4 border border-brand-gold/20 bg-brand-gold/[0.04] p-3 font-mono text-[7px] uppercase leading-4 tracking-[0.07em] text-brand-gold">This object is inside the declared scenario boundary. Baseline observations remain unchanged; transition execution is blocked on the compiled admissibility and observability requirements below.</p> : null}
                <p className="mt-4 text-[10px] leading-5 text-white/38"><strong className="text-white/56">Object source: </strong>{selected.sourceHref ? <a className="underline decoration-white/20 underline-offset-2" href={selected.sourceHref} rel="noreferrer" target="_blank">{selected.sourceLabel}</a> : selected.sourceLabel}</p>
                <div className="mt-5 border-t border-white/12 pt-4">
                  <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-white/34">Declared relations in this frame</p>
                  <div className="mt-3 grid gap-2">
                    {connectedEdges.length ? connectedEdges.map((edge) => {
                      const otherId = edge.from === selected.id ? edge.to : edge.from;
                      const other = augustaMapNodes.find((node) => node.id === otherId);
                      const scenarioPath = scenarioActive && scenarioEvaluation.affectedEdgeIds.includes(edge.id);
                      return (
                        <button className={`border bg-black/10 p-3 text-left hover:border-white/25 ${scenarioPath ? "border-brand-gold/35" : "border-white/10"}`} key={edge.id} onClick={() => setSelectedNode(otherId)} type="button">
                          <div className="flex items-center justify-between gap-3"><span className="font-mono text-[8px] font-semibold uppercase tracking-[0.09em] text-white/56">{edge.label}</span><span className={`font-mono text-[7px] uppercase tracking-[0.08em] ${scenarioPath ? "text-brand-gold" : "text-white/28"}`}>{scenarioPath ? "scenario path" : edge.evidence}</span></div>
                          <p className="mt-1 text-[11px] text-white/38">{other?.label ?? otherId}</p>
                          <p className="mt-2 text-[10px] leading-5 text-white/30">{edge.description}</p>
                        </button>
                      );
                    }) : <p className="text-[11px] text-white/36">No relation is eligible in this temporal frame.</p>}
                  </div>
                </div>
              </section>
            ) : null}

            <div className="grid gap-px overflow-hidden border border-white/12 bg-white/10 sm:grid-cols-2 xl:grid-cols-1">
              {visibleInstrumentEntries.length ? visibleInstrumentEntries.map(({ instrument, disposition }) => (
                <div key={instrument.id}>
                  <EconomicInstrument instrument={instrument} />
                  <div className="border-t border-white/8 bg-[#11150f] px-5 pb-4 font-mono text-[7px] uppercase leading-4 tracking-[0.08em] text-white/25">scope · {instrument.scope}<br />temporal · {disposition === "research-index" ? "research index — not period measurement" : disposition === "baseline" ? "current baseline — scenario does not alter it" : "active observation"}</div>
                </div>
              )) : (
                <div className="bg-[#11150f] p-5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-white/38">{activeFrame.mode === "historical" ? "Current instrumentation withheld in historical frame" : "No attached signal on this measurement plane"}</p>
                </div>
              )}
            </div>

            <div className="border border-brand-gold/28 bg-brand-gold/[0.04] p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" aria-hidden="true" />
                <div>
                  <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-brand-gold">State-trajectory rule</p>
                  <p className="mt-2 text-xs leading-6 text-white/52">A current measurement is not silently backcast. A historical synthesis is not silently promoted to an object-level chronology. A scenario is not silently presented as a forecast. Each transition must earn its own evidence and transformation contract.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}