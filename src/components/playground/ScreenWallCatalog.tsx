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

type WallMode = "curated" | "arcade" | "workbench";
type Depth = "wall" | "screen" | "world";
type ScreenKind = "systems" | "game" | "visual" | "audio" | "tool" | "weird";

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
    output: "projection",
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
    input: "parameters",
    output: "field",
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
    input: "artifact",
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
    input: "signal",
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

export function ScreenWallCatalog() {
  const [mode, setMode] = useState<WallMode>("curated");
  const [selectedId, setSelectedId] = useState("geometry");
  const [depth, setDepth] = useState<Depth>("wall");

  const visible = useMemo(() => screens.filter((screen) => screen.mode.includes(mode)), [mode]);
  const selected = screens.find((screen) => screen.id === selectedId) ?? visible[0] ?? screens[0];

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
        <span><i className="legend-trace" />Trace <small>shared projection bus</small></span>
        <span><i className="legend-state" />State <small>live / retained</small></span>
        <span className="screen-wall-legend__rule">A catalog can project its contents.</span>
      </footer>
    </main>
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
