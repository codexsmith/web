'use client';

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Building2,
  CircleDot,
  Factory,
  Gauge,
  Landmark,
  Network,
  RadioTower,
  School,
  Waves,
} from "lucide-react";
import {
  economicConsequenceEdges,
  economicInstruments,
  economicMapNodes,
  economicPlanes,
  type EconomicInstrumentDatum,
  type EconomicPlane,
} from "@/lib/economic-instrumentation";

const planeTone: Record<EconomicPlane, string> = {
  reference: "border-brand-blue/45 bg-brand-blue/[0.08] text-brand-blue",
  referent: "border-brand-green/45 bg-brand-green/[0.08] text-brand-green",
  maintenance: "border-brand-gold/45 bg-brand-gold/[0.08] text-brand-gold",
  closure: "border-brand-red/45 bg-brand-red/[0.08] text-brand-red",
};

const statusTone: Record<NonNullable<EconomicInstrumentDatum["status"]>, string> = {
  nominal: "border-brand-green/40 bg-brand-green/[0.08] text-brand-green",
  watch: "border-brand-gold/40 bg-brand-gold/[0.08] text-brand-gold",
  warning: "border-brand-red/45 bg-brand-red/[0.08] text-brand-red",
  unknown: "border-white/15 bg-white/[0.025] text-white/45",
};

function nodeIcon(type: (typeof economicMapNodes)[number]["type"]) {
  switch (type) {
    case "power":
      return RadioTower;
    case "water":
      return Waves;
    case "road":
      return Factory;
    case "school":
      return School;
    case "housing":
      return Building2;
    default:
      return Landmark;
  }
}

export function EconomicInstrumentationConsole() {
  const [activePlane, setActivePlane] = useState<EconomicPlane | "all">("all");
  const [selectedNode, setSelectedNode] = useState<string | null>("arterial");
  const [showConsequences, setShowConsequences] = useState(true);

  const selected = economicMapNodes.find((node) => node.id === selectedNode) ?? null;

  const visibleInstruments = useMemo(() => {
    const planeFiltered = activePlane === "all"
      ? economicInstruments
      : economicInstruments.filter((instrument) => instrument.plane === activePlane);

    if (!selectedNode) return planeFiltered;
    const node = economicMapNodes.find((candidate) => candidate.id === selectedNode);
    if (!node) return planeFiltered;
    return planeFiltered.filter((instrument) => node.instrumentIds.includes(instrument.id));
  }, [activePlane, selectedNode]);

  const connectedEdges = useMemo(() => {
    if (!selectedNode) return [];
    return economicConsequenceEdges.filter((edge) => edge.from === selectedNode || edge.to === selectedNode);
  }, [selectedNode]);

  return (
    <section className="border-b border-border bg-[#11150f] px-5 py-10 text-brand-ivory sm:px-8 sm:py-12" aria-labelledby="economic-console-title">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <div className="flex items-center gap-3">
              <Gauge className="h-5 w-5 text-brand-gold" aria-hidden="true" />
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-brand-gold">
                BF-ECO-01 · economic state instrumentation
              </p>
            </div>
            <h1 id="economic-console-title" className="mt-4 max-w-5xl font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              One economy. Multiple instrument planes.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/52">
              The world stays fixed while the representation changes. Select an object, switch overlays, and inspect the signals and consequence paths attached to that same underlying system.
            </p>
          </div>
          <div className="border border-white/12 bg-white/[0.025] px-4 py-3 font-mono text-[8px] uppercase tracking-[0.1em] text-white/40">
            schematic geography · mixed evidence classes
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(22rem,0.65fr)]">
          <div className="border border-white/15 bg-black/10 p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <button
                  className={`min-h-9 border px-3 font-mono text-[8px] font-semibold uppercase tracking-[0.1em] ${activePlane === "all" ? "border-white/40 bg-white/[0.08] text-white" : "border-white/12 text-white/42"}`}
                  onClick={() => setActivePlane("all")}
                  type="button"
                >
                  All planes
                </button>
                {economicPlanes.map((plane) => (
                  <button
                    className={`min-h-9 border px-3 font-mono text-[8px] font-semibold uppercase tracking-[0.1em] ${activePlane === plane.id ? planeTone[plane.id] : "border-white/12 text-white/42"}`}
                    key={plane.id}
                    onClick={() => setActivePlane(plane.id)}
                    type="button"
                  >
                    {plane.notation} · {plane.label}
                  </button>
                ))}
              </div>
              <button
                aria-pressed={showConsequences}
                className={`inline-flex min-h-9 items-center border px-3 font-mono text-[8px] font-semibold uppercase tracking-[0.1em] ${showConsequences ? "border-brand-gold/45 bg-brand-gold/[0.08] text-brand-gold" : "border-white/12 text-white/42"}`}
                onClick={() => setShowConsequences((value) => !value)}
                type="button"
              >
                <Network className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
                Consequence paths
              </button>
            </div>

            <div className="relative mt-5 min-h-[38rem] overflow-hidden border border-white/12 bg-[#172017]">
              <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:2rem_2rem]" />
              <div className="pointer-events-none absolute left-[8%] top-[8%] h-[78%] w-[14%] rounded-[50%] border-r border-brand-blue/25 bg-brand-blue/[0.05]" />
              <div className="pointer-events-none absolute left-[26%] top-[48%] h-px w-[58%] rotate-[8deg] bg-white/12" />
              <div className="pointer-events-none absolute left-[46%] top-[20%] h-[62%] w-px -rotate-[18deg] bg-white/8" />

              {showConsequences ? (
                <svg aria-label="Illustrative consequence topology" className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  {economicConsequenceEdges.map((edge) => {
                    const from = economicMapNodes.find((node) => node.id === edge.from);
                    const to = economicMapNodes.find((node) => node.id === edge.to);
                    if (!from || !to) return null;
                    const emphasized = !selectedNode || edge.from === selectedNode || edge.to === selectedNode;
                    return (
                      <line
                        key={edge.id}
                        stroke="currentColor"
                        strokeDasharray={edge.kind === "dependency" ? "0" : "2.5 2.5"}
                        strokeOpacity={emphasized ? 0.32 : 0.08}
                        strokeWidth={emphasized ? 0.45 : 0.2}
                        x1={from.x}
                        x2={to.x}
                        y1={from.y}
                        y2={to.y}
                      />
                    );
                  })}
                </svg>
              ) : null}

              {economicMapNodes.map((node) => {
                const Icon = nodeIcon(node.type);
                const active = selectedNode === node.id;
                const connected = connectedEdges.some((edge) => edge.from === node.id || edge.to === node.id);
                return (
                  <button
                    aria-pressed={active}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 border p-3 text-left shadow-lg transition-transform hover:scale-[1.03] ${active ? "border-brand-gold bg-brand-gold/15" : connected ? "border-white/30 bg-[#11150f]/95" : "border-white/18 bg-[#11150f]/92"}`}
                    key={node.id}
                    onClick={() => setSelectedNode(node.id)}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    type="button"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-brand-gold" aria-hidden="true" />
                      <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.09em] text-white/66">{node.label}</span>
                    </div>
                    <span className="mt-2 block font-mono text-[7px] uppercase tracking-[0.08em] text-white/30">{node.instrumentIds.length} attached signals</span>
                  </button>
                );
              })}

              <div className="absolute bottom-4 left-4 right-4 grid gap-3 border border-white/12 bg-[#11150f]/94 p-3 sm:grid-cols-[1fr_auto] sm:items-end">
                <div>
                  <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-white/38">Overlay contract</p>
                  <p className="mt-2 text-[11px] leading-5 text-white/46">
                    Geography and paths are illustrative topology. Overlay changes reveal different represented properties of the same objects; they do not claim a complete causal model or real Augusta coordinates.
                  </p>
                </div>
                <div className="font-mono text-[7px] uppercase tracking-[0.08em] text-white/32">
                  solid = dependency · dashed = burden / repair
                </div>
              </div>
            </div>
          </div>

          <aside className="grid content-start gap-4">
            {selected ? (
              <section className="border border-brand-gold/30 bg-brand-gold/[0.045] p-5" aria-labelledby="economic-object-inspector-title">
                <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-brand-gold">Selected object</p>
                <h2 className="mt-2 font-serif text-2xl font-semibold text-white/88" id="economic-object-inspector-title">{selected.label}</h2>
                <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.09em] text-white/34">{selected.role}</p>
                <p className="mt-4 text-xs leading-6 text-white/50">{selected.description}</p>
                <div className="mt-5 border-t border-white/12 pt-4">
                  <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-white/34">Connected consequence paths</p>
                  <div className="mt-3 grid gap-2">
                    {connectedEdges.length ? connectedEdges.map((edge) => {
                      const otherId = edge.from === selected.id ? edge.to : edge.from;
                      const other = economicMapNodes.find((node) => node.id === otherId);
                      return (
                        <button
                          className="border border-white/10 bg-black/10 p-3 text-left hover:border-white/25"
                          key={edge.id}
                          onClick={() => setSelectedNode(otherId)}
                          type="button"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.09em] text-white/56">{edge.label}</span>
                            <span className="font-mono text-[7px] uppercase tracking-[0.08em] text-white/28">{edge.evidence}</span>
                          </div>
                          <p className="mt-1 text-[11px] text-white/38">{other?.label ?? otherId}</p>
                        </button>
                      );
                    }) : <p className="text-[11px] text-white/36">No declared consequence paths.</p>}
                  </div>
                </div>
              </section>
            ) : null}

            <div className="grid gap-px overflow-hidden border border-white/12 bg-white/10 sm:grid-cols-2 xl:grid-cols-1">
              {visibleInstruments.length > 0 ? visibleInstruments.map((instrument) => (
                <EconomicInstrument key={instrument.id} instrument={instrument} />
              )) : (
                <div className="bg-[#11150f] p-5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-white/38">No attached signal on this plane</p>
                </div>
              )}
            </div>

            <div className="border border-brand-gold/28 bg-brand-gold/[0.04] p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" aria-hidden="true" />
                <div>
                  <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-brand-gold">Instrument rule</p>
                  <p className="mt-2 text-xs leading-6 text-white/52">
                    Unknown is not zero. A missing live feed, unresolved transformation, or uninstrumented consequence must remain visibly missing rather than being silently replaced by a plausible number.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export function EconomicInstrument({ instrument }: { instrument: EconomicInstrumentDatum }) {
  const tone = statusTone[instrument.status ?? "unknown"];
  return (
    <article className="bg-[#11150f] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-white/34">{instrument.kind} · {instrument.evidence}</p>
          <h2 className="mt-2 font-serif text-lg font-semibold leading-6 text-white/88">{instrument.shortLabel}</h2>
        </div>
        <CircleDot className="h-4 w-4 shrink-0 text-white/24" aria-hidden="true" />
      </div>
      <div className="mt-4 flex flex-wrap items-end gap-3">
        <p className="font-mono text-xl font-semibold tracking-tight text-white/88">{instrument.displayValue}</p>
        {instrument.unit ? <span className="pb-0.5 font-mono text-[8px] uppercase tracking-[0.08em] text-white/28">{instrument.unit}</span> : null}
      </div>
      <div className={`mt-4 inline-flex border px-2 py-1 font-mono text-[7px] font-semibold uppercase tracking-[0.09em] ${tone}`}>
        {instrument.status ?? "unknown"}
      </div>
      <p className="mt-4 text-[11px] leading-5 text-white/44">{instrument.description}</p>
      <details className="mt-4 border-t border-white/10 pt-3">
        <summary className="cursor-pointer font-mono text-[8px] font-semibold uppercase tracking-[0.09em] text-white/38">Instrumentation contract</summary>
        <div className="mt-3 space-y-3 text-[10px] leading-5 text-white/40">
          <p><strong className="text-white/58">Measures:</strong> {instrument.measures}</p>
          <p><strong className="text-white/58">Does not measure:</strong> {instrument.doesNotMeasure.join(", ")}.</p>
          <p>
            <strong className="text-white/58">Source:</strong>{" "}
            {instrument.source.href ? (
              <a className="underline decoration-white/20 underline-offset-2 hover:text-white/70" href={instrument.source.href} rel="noreferrer" target="_blank">{instrument.source.label}</a>
            ) : instrument.source.label}
            {instrument.source.asOf ? ` · ${instrument.source.asOf}` : ""}
          </p>
        </div>
      </details>
    </article>
  );
}
