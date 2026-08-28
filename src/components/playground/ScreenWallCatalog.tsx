"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  AudioWaveform,
  Boxes,
  Gamepad2,
  GitBranch,
  Orbit,
  Radio,
  ScanSearch,
  Sparkles,
  Waves,
  Wrench,
} from "lucide-react";
import "./screen-wall.css";
import "./screen-wall-spatial-refinement.css";
import "./screen-wall-traces.css";

type WallMode = "curated" | "arcade" | "workbench";
type Depth = "wall" | "screen" | "world";
type ScreenKind = "systems" | "game" | "visual" | "audio" | "tool" | "weird";
type TraceKind = "projection" | "signal" | "artifact";
type Point = [number, number];

type TraceRoute = {
  d: string;
  start: Point;
  end: Point;
  label: Point;
};

type WallTrace = {
  id: string;
  from: string;
  to: string;
  label: string;
  kind: TraceKind;
  modes: WallMode[];
  routes: Partial<Record<WallMode, TraceRoute>>;
};

type WallScreen = {
  id: string;
  title: string;
  eyebrow: string;
  premise: string;
  kind: ScreenKind;
  status: string;
  mode: WallMode[];
  area: string;
  tone: string;
  icon: typeof Orbit;
  preview: "orbit" | "wave" | "grid" | "network" | "bars" | "machine" | "radio" | "particles";
  input?: string;
  output?: string;
};

const screens: WallScreen[] = [
  {
    id: "atlas",
    title: "Atlas Engine",
    eyebrow: "Generative systems",
    premise: "Move between layered atlases and watch relations resolve across scales.",
    kind: "systems",
    status: "live model",
    mode: ["curated", "workbench"],
    area: "atlas",
    tone: "cyan",
    icon: Orbit,
    preview: "orbit",
    input: "typed graph",
    output: "graph state",
  },
  {
    id: "chess",
    title: "Boundary Chess",
    eyebrow: "Games + puzzles",
    premise: "A board for testing admissibility, consequence, and constrained search.",
    kind: "game",
    status: "playable",
    mode: ["curated", "arcade"],
    area: "chess",
    tone: "amber",
    icon: Gamepad2,
    preview: "grid",
    input: "position",
    output: "line",
  },
  {
    id: "geometry",
    title: "Distinction Geometry",
    eyebrow: "Visualization + math",
    premise: "Continuous geometry built from bounded distinctions and recursive closure.",
    kind: "visual",
    status: "running",
    mode: ["curated", "arcade", "workbench"],
    area: "geometry",
    tone: "violet",
    icon: Sparkles,
    preview: "particles",
    input: "graph state",
    output: "field state",
  },
  {
    id: "patchbay",
    title: "Patch Bay",
    eyebrow: "Tools + making",
    premise: "Connect typed outputs to compatible inputs and inspect the resulting chain.",
    kind: "tool",
    status: "prototype",
    mode: ["curated", "workbench"],
    area: "patchbay",
    tone: "lime",
    icon: GitBranch,
    preview: "network",
    input: "field state / artifact",
    output: "artifact",
  },
  {
    id: "waves",
    title: "Wave Bench",
    eyebrow: "Visualization + math",
    premise: "Probe interference, phase, transport, and boundary conditions directly.",
    kind: "visual",
    status: "interactive",
    mode: ["arcade", "workbench"],
    area: "waves",
    tone: "blue",
    icon: Waves,
    preview: "wave",
    input: "field state",
    output: "trace",
  },
  {
    id: "radio",
    title: "Lab Radio",
    eyebrow: "Audio",
    premise: "A synthetic broadcast shelf for narration, satire, and sonification.",
    kind: "audio",
    status: "quiet",
    mode: ["curated", "arcade"],
    area: "radio",
    tone: "red",
    icon: Radio,
    preview: "radio",
    input: "artifact",
    output: "audio",
  },
  {
    id: "forge",
    title: "Corpus Forge",
    eyebrow: "Tools + making",
    premise: "Shape source material through typed transforms without losing provenance.",
    kind: "tool",
    status: "bench ready",
    mode: ["workbench"],
    area: "forge",
    tone: "green",
    icon: Wrench,
    preview: "machine",
    input: "corpus",
    output: "artifact",
  },
  {
    id: "oddments",
    title: "Oddments",
    eyebrow: "Weird stuff",
    premise: "Small experiments, abandoned machines, and things made because we could.",
    kind: "weird",
    status: "unstable shelf",
    mode: ["arcade"],
    area: "oddments",
    tone: "pink",
    icon: Boxes,
    preview: "bars",
    input: "audio",
    output: "remix",
  },
];

const wallTraces: WallTrace[] = [
  {
    id: "atlas-geometry",
    from: "atlas",
    to: "geometry",
    label: "graph state",
    kind: "projection",
    modes: ["curated", "workbench"],
    routes: {
      curated: { d: "M 330 188 H 338 V 350 H 346", start: [330, 188], end: [346, 350], label: [340, 260] },
      workbench: { d: "M 330 188 H 338 V 270 H 346", start: [330, 188], end: [346, 270], label: [340, 228] },
    },
  },
  {
    id: "geometry-patchbay",
    from: "geometry",
    to: "patchbay",
    label: "field state",
    kind: "signal",
    modes: ["curated"],
    routes: {
      curated: { d: "M 346 350 H 336 V 520 H 330", start: [346, 350], end: [330, 520], label: [338, 438] },
    },
  },
  {
    id: "patchbay-radio",
    from: "patchbay",
    to: "radio",
    label: "artifact",
    kind: "artifact",
    modes: ["curated"],
    routes: {
      curated: { d: "M 330 520 H 336 V 675 H 836 V 520 H 844", start: [330, 520], end: [844, 520], label: [575, 669] },
    },
  },
  {
    id: "geometry-waves",
    from: "geometry",
    to: "waves",
    label: "field state",
    kind: "signal",
    modes: ["arcade", "workbench"],
    routes: {
      arcade: { d: "M 670 270 H 678 V 676 H 18 V 520 H 30", start: [670, 270], end: [30, 520], label: [350, 669] },
      workbench: { d: "M 830 270 H 838 V 520 H 336 V 600 H 346", start: [830, 270], end: [346, 600], label: [585, 514] },
    },
  },
  {
    id: "radio-oddments",
    from: "radio",
    to: "oddments",
    label: "audio",
    kind: "signal",
    modes: ["arcade"],
    routes: {
      arcade: { d: "M 970 104 H 984 V 185 H 676 V 430 H 685", start: [970, 104], end: [685, 430], label: [824, 180] },
    },
  },
  {
    id: "forge-patchbay",
    from: "forge",
    to: "patchbay",
    label: "artifact",
    kind: "artifact",
    modes: ["workbench"],
    routes: {
      workbench: { d: "M 970 350 H 984 V 680 H 16 V 520 H 30", start: [970, 350], end: [30, 520], label: [500, 673] },
    },
  },
];

const modeCopy: Record<WallMode, { label: string; note: string }> = {
  curated: { label: "Curated Wall", note: "A deliberate cross-section of the playground." },
  arcade: { label: "Arcade Wall", note: "Playful, kinetic, and slightly stranger." },
  workbench: { label: "Workbench Wall", note: "Objects that expose useful inputs and outputs." },
};

const zoneCopy: Record<WallMode, [string, string, string, string]> = {
  curated: ["Systems", "Central stage", "Tools + making", "Games + media"],
  arcade: ["Games", "Central stage", "Experiments", "Oddments + audio"],
  workbench: ["Sources + models", "Central stage", "Composition", "Processing"],
};

function screenTitle(id: string) {
  return screens.find((screen) => screen.id === id)?.title ?? id;
}

export function ScreenWallCatalog() {
  const [mode, setMode] = useState<WallMode>("curated");
  const [selectedId, setSelectedId] = useState("geometry");
  const [depth, setDepth] = useState<Depth>("wall");

  const visible = useMemo(() => screens.filter((screen) => screen.mode.includes(mode)), [mode]);
  const activeTraces = useMemo(() => wallTraces.filter((trace) => trace.modes.includes(mode)), [mode]);
  const selected = screens.find((screen) => screen.id === selectedId) ?? visible[0] ?? screens[0];
  const selectedRelations = activeTraces.filter((trace) => trace.from === selected.id || trace.to === selected.id);

  const selectScreen = (id: string) => {
    setSelectedId(id);
    setDepth("screen");
  };

  return (
    <main className="screen-wall-shell" data-depth={depth} data-mode={mode}>
      <header className="screen-wall-toolbar">
        <div className="screen-wall-brand">
          <span className="screen-wall-brand__mark" aria-hidden="true">BF</span>
          <span>
            <small>BOUNDARY FIRST LABS // PLAYGROUND</small>
            <strong>Screen Wall</strong>
          </span>
        </div>

        <div className="screen-wall-mode-copy" aria-live="polite">
          <small>CATALOG PROJECTION</small>
          <strong>{modeCopy[mode].label}</strong>
          <span>{modeCopy[mode].note}</span>
        </div>

        <nav className="screen-wall-modes" aria-label="Wall projection">
          {(Object.keys(modeCopy) as WallMode[]).map((item) => (
            <button
              type="button"
              key={item}
              className={mode === item ? "is-active" : ""}
              onClick={() => {
                setMode(item);
                setDepth("wall");
                const next = screens.find((screen) => screen.mode.includes(item));
                if (next) setSelectedId(next.id);
              }}
            >
              {item}
            </button>
          ))}
        </nav>
      </header>

      <section className="screen-wall-stage" aria-label="Interactive environment catalog">
        <div className="screen-wall-backplane" aria-hidden="true">
          <span className="screen-wall-bus screen-wall-bus--a" />
          <span className="screen-wall-bus screen-wall-bus--b" />
          <span className="screen-wall-bus screen-wall-bus--c" />
          <span className="screen-wall-junction screen-wall-junction--a" />
          <span className="screen-wall-junction screen-wall-junction--b" />
          <span className="screen-wall-junction screen-wall-junction--c" />
        </div>

        <div className="screen-wall-zone-labels" aria-hidden="true">
          {zoneCopy[mode].map((zone) => <span key={zone}>{zone}</span>)}
        </div>

        <div className="screen-wall-grid">
          <TraceLayer
            depth={depth}
            mode={mode}
            selectedId={selected.id}
            traces={activeTraces}
          />

          {visible.map((screen) => (
            <ScreenModule
              key={screen.id}
              screen={screen}
              landmark={screen.id === "geometry"}
              selected={selected.id === screen.id && depth !== "wall"}
              dimmed={depth !== "wall" && selected.id !== screen.id}
              onSelect={() => selectScreen(screen.id)}
            />
          ))}
        </div>

        {depth !== "wall" && (
          <aside className="screen-wall-inspector" data-tone={selected.tone}>
            <div className="screen-wall-inspector__rail" aria-hidden="true">
              <i /><i /><i />
            </div>
            <div className="screen-wall-inspector__header">
              <button type="button" onClick={() => setDepth("wall")} className="screen-wall-back">
                <ArrowLeft aria-hidden="true" />
                Wall
              </button>
              <span>{depth === "world" ? "WORLD" : "SCREEN"}</span>
            </div>

            {depth === "screen" ? (
              <>
                <div className="screen-wall-inspector__preview">
                  <Preview kind={selected.preview} />
                </div>
                <div className="screen-wall-inspector__body">
                  <small>{selected.eyebrow}</small>
                  <h1>{selected.title}</h1>
                  <p>{selected.premise}</p>

                  <dl>
                    <div><dt>STATE</dt><dd>{selected.status}</dd></div>
                    <div><dt>BOUNDARY</dt><dd>{selected.kind}</dd></div>
                    <div><dt>INPUT</dt><dd>{selected.input ?? "—"}</dd></div>
                    <div><dt>OUTPUT</dt><dd>{selected.output ?? "—"}</dd></div>
                  </dl>

                  <RelationRegister relations={selectedRelations} selectedId={selected.id} />

                  <button type="button" className="screen-wall-enter" onClick={() => setDepth("world")}>
                    Enter world <ArrowUpRight aria-hidden="true" />
                  </button>
                </div>
              </>
            ) : (
              <WorldView screen={selected} onReturn={() => setDepth("screen")} />
            )}
          </aside>
        )}
      </section>

      <footer className="screen-wall-legend">
        <span><i className="legend-boundary" />Boundary <small>environment</small></span>
        <span><i className="legend-port" />Port <small>typed interface</small></span>
        <span><i className="legend-trace legend-trace--projection" />Trace <small>projection</small></span>
        <span><i className="legend-trace legend-trace--signal" />Trace <small>signal</small></span>
        <span><i className="legend-trace legend-trace--artifact" />Trace <small>artifact</small></span>
        <span><i className="legend-state" />State <small>live / retained</small></span>
        <span className="screen-wall-legend__rule">A catalog can project its contents.</span>
      </footer>
    </main>
  );
}

function TraceLayer({
  depth,
  mode,
  selectedId,
  traces,
}: {
  depth: Depth;
  mode: WallMode;
  selectedId: string;
  traces: WallTrace[];
}) {
  return (
    <div className="screen-wall-traces" aria-hidden="true">
      <svg viewBox="0 0 1000 700" preserveAspectRatio="none">
        <defs>
          <marker id="screen-wall-trace-arrow" markerHeight="7" markerWidth="7" orient="auto" refX="5" refY="3.5">
            <path d="M0 0 L6 3.5 L0 7 Z" />
          </marker>
        </defs>

        {traces.map((trace) => {
          const route = trace.routes[mode];
          if (!route) return null;
          const focused = depth !== "wall" && (trace.from === selectedId || trace.to === selectedId);
          const muted = depth !== "wall" && !focused;

          return (
            <g
              className={`screen-wall-trace ${focused ? "is-focused" : ""} ${muted ? "is-muted" : ""}`}
              data-kind={trace.kind}
              key={trace.id}
            >
              <path className="screen-wall-trace__underlay" d={route.d} />
              <path className="screen-wall-trace__line" d={route.d} markerEnd="url(#screen-wall-trace-arrow)" />
              <rect className="screen-wall-trace__source" x={route.start[0] - 4} y={route.start[1] - 4} width="8" height="8" />
              <circle className="screen-wall-trace__target" cx={route.end[0]} cy={route.end[1]} r="4.5" />
              <text className="screen-wall-trace__label" x={route.label[0]} y={route.label[1]} textAnchor="middle">
                {trace.kind.toUpperCase()} // {trace.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function RelationRegister({ relations, selectedId }: { relations: WallTrace[]; selectedId: string }) {
  if (relations.length === 0) {
    return (
      <section className="screen-wall-relations" aria-label="Declared connections">
        <small>DECLARED CONNECTIONS</small>
        <p>No routed relation is active in this projection.</p>
      </section>
    );
  }

  return (
    <section className="screen-wall-relations" aria-label="Declared connections">
      <small>DECLARED CONNECTIONS</small>
      {relations.map((trace) => {
        const outbound = trace.from === selectedId;
        return (
          <div key={trace.id} data-kind={trace.kind}>
            <span>{outbound ? "OUT" : "IN"}</span>
            <strong>{outbound ? screenTitle(trace.to) : screenTitle(trace.from)}</strong>
            <em>{trace.kind} // {trace.label}</em>
          </div>
        );
      })}
    </section>
  );
}

function ScreenModule({
  screen,
  landmark,
  selected,
  dimmed,
  onSelect,
}: {
  screen: WallScreen;
  landmark: boolean;
  selected: boolean;
  dimmed: boolean;
  onSelect: () => void;
}) {
  const Icon = screen.icon;

  return (
    <article
      className={`screen-module ${selected ? "is-selected" : ""} ${dimmed ? "is-dimmed" : ""}`}
      data-tone={screen.tone}
      data-screen={screen.id}
      data-landmark={landmark ? "true" : undefined}
      style={{ gridArea: screen.area }}
    >
      <span className="screen-module__mounts" aria-hidden="true"><i /><i /><i /><i /></span>
      {screen.input && (
        <div className="screen-module__ports screen-module__ports--left" aria-hidden="true">
          <i data-port="input" />
        </div>
      )}
      {screen.output && (
        <div className="screen-module__ports screen-module__ports--right" aria-hidden="true">
          <i data-port="output" />
        </div>
      )}

      <button type="button" className="screen-module__button" onClick={onSelect}>
        <div className="screen-module__bezel">
          <div className="screen-module__screen">
            <Preview kind={screen.preview} />
            <span className="screen-module__scanline" aria-hidden="true" />
            <span className="screen-module__status"><i />{screen.status}</span>
          </div>
        </div>

        <footer className="screen-module__label">
          <span className="screen-module__icon"><Icon aria-hidden="true" /></span>
          <span className="screen-module__copy">
            <small>{screen.eyebrow}</small>
            <strong>{screen.title}</strong>
          </span>
          <span className="screen-module__io" aria-hidden="true">
            {screen.input && <span><i className="is-input" />IN</span>}
            {screen.output && <span><i className="is-output" />OUT</span>}
          </span>
        </footer>
      </button>
    </article>
  );
}

function Preview({ kind }: { kind: WallScreen["preview"] }) {
  if (kind === "grid") {
    return <div className="preview preview-grid">{Array.from({ length: 36 }, (_, index) => <i key={index} data-on={[8, 13, 20, 27].includes(index)} />)}</div>;
  }

  if (kind === "wave") {
    return <div className="preview preview-wave"><svg viewBox="0 0 300 120" preserveAspectRatio="none"><path d="M0 62 C25 20 48 104 74 62 S124 20 150 62 S200 104 226 62 S276 20 300 62" /><path d="M0 72 C25 38 48 94 74 72 S124 38 150 72 S200 94 226 72 S276 38 300 72" /></svg></div>;
  }

  if (kind === "network") {
    return <div className="preview preview-network"><svg viewBox="0 0 300 150"><path d="M40 80 L105 38 L168 78 L246 42 M105 38 L120 118 L168 78 L222 120" /><circle cx="40" cy="80" r="8" /><circle cx="105" cy="38" r="8" /><circle cx="120" cy="118" r="8" /><circle cx="168" cy="78" r="8" /><circle cx="246" cy="42" r="8" /><circle cx="222" cy="120" r="8" /></svg></div>;
  }

  if (kind === "bars") {
    return <div className="preview preview-bars">{[36, 62, 44, 80, 52, 70, 30, 58, 86, 46].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div>;
  }

  if (kind === "machine") {
    return <div className="preview preview-machine"><span /><span /><span /><b /><b /><em /></div>;
  }

  if (kind === "radio") {
    return <div className="preview preview-radio"><AudioWaveform aria-hidden="true" /><div>{Array.from({ length: 28 }, (_, index) => <i key={index} style={{ height: `${20 + ((index * 17) % 65)}%` }} />)}</div></div>;
  }

  if (kind === "particles") {
    return <div className="preview preview-particles">{Array.from({ length: 16 }, (_, index) => <i key={index} style={{ "--x": `${12 + ((index * 23) % 76)}%`, "--y": `${10 + ((index * 31) % 78)}%`, "--d": `${5 + (index % 4) * 2}px` } as React.CSSProperties} />)}</div>;
  }

  return <div className="preview preview-orbit"><span /><span /><span /><i /></div>;
}

function WorldView({ screen, onReturn }: { screen: WallScreen; onReturn: () => void }) {
  return (
    <div className="screen-wall-world">
      <div className="screen-wall-world__viewport">
        <Preview kind={screen.preview} />
        <div className="screen-wall-world__reticle"><ScanSearch aria-hidden="true" /></div>
      </div>
      <div className="screen-wall-world__controls">
        <small>IMMERSIVE PROJECTION // PROTOTYPE</small>
        <h1>{screen.title}</h1>
        <p>This is the third depth of the Screen Wall interaction model. The production environment can replace this bounded demo without changing the catalog contract.</p>
        <div className="screen-wall-world__knobs" aria-hidden="true"><i /><i /><i /><i /></div>
        <button type="button" onClick={onReturn}>Return to screen</button>
      </div>
    </div>
  );
}
