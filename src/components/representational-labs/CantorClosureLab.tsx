"use client";

import { useEffect, useState } from "react";
import {
  RepresentationalLabPanel,
  RepresentationalLabSectionLabel,
  RepresentationalLabShell,
  RepresentationalLabStatus,
} from "./RepresentationalLabShell";
import { CANTOR_CLOSURE_LAB } from "./lab-definitions";
import styles from "./cantor-closure-lab.module.css";

const INITIAL_WIDTH = 4;
const MAX_DEMO_WIDTH = 6;
const OUTSIDE_PREVIEW_SIZE = 12;
const FAST_FORWARD_MS = 140;

type AlphabetMode = "binary" | "ternary";
type MachinePhase = "scan" | "escape" | "admit" | "grow" | "bounded";
type SelectorMode = "identity" | "alternate" | "reuse" | "none";
type ResidualRegime = "forced" | "branching" | "obstructed" | "width-forced";

const FIXTURES: Record<
  AlphabetMode,
  { label: string; alphabet: string[]; rows: string[]; rule: string }
> = {
  binary: {
    label: "BINARY",
    alphabet: ["0", "1"],
    rows: ["0101", "1100", "0011", "1010"],
    rule: "0 ↔ 1",
  },
  ternary: {
    label: "TERNARY",
    alphabet: ["0", "1", "2"],
    rows: ["0120", "1201", "2012", "0210"],
    rule: "exclude represented symbol(s)",
  },
};

function nextSymbol(symbol: string, alphabet: string[]) {
  const index = alphabet.indexOf(symbol);
  if (index < 0) return alphabet[0];
  return alphabet[(index + 1) % alphabet.length];
}

function enumerateUniverse(alphabet: string[], width: number) {
  const size = alphabet.length ** width;
  return Array.from({ length: size }, (_, index) => {
    let remainder = index;
    const symbols = Array<string>(width);

    for (let coordinate = width - 1; coordinate >= 0; coordinate -= 1) {
      symbols[coordinate] = alphabet[remainder % alphabet.length];
      remainder = Math.floor(remainder / alphabet.length);
    }

    return symbols.join("");
  });
}

function deriveSelectorFromWitness(rows: string[], witness: string) {
  return rows.map((row) => {
    for (let coordinate = 0; coordinate < witness.length; coordinate += 1) {
      if (row[coordinate] !== witness[coordinate]) return coordinate;
    }
    return -1;
  });
}

function buildResidualChoiceSets(
  rows: string[],
  selector: number[],
  alphabet: string[],
  width: number,
) {
  return Array.from({ length: width }, (_, coordinate) => {
    const excluded = new Set<string>();

    selector.forEach((selectedCoordinate, rowIndex) => {
      if (selectedCoordinate === coordinate) excluded.add(rows[rowIndex][coordinate]);
    });

    if (excluded.size === 0) return [...alphabet];

    const firstExcluded = [...excluded][0];
    const canonical = nextSymbol(firstExcluded, alphabet);
    const remaining = alphabet.filter((symbol) => !excluded.has(symbol));

    return [
      ...remaining.filter((symbol) => symbol === canonical),
      ...remaining.filter((symbol) => symbol !== canonical),
    ];
  });
}

function familySize(choiceSets: string[][]) {
  return choiceSets.reduce((total, choices) => total * choices.length, 1);
}

function candidateAt(index: number, choiceSets: string[][]) {
  if (choiceSets.some((choices) => choices.length === 0)) return "";

  let remainder = index;
  const symbols = Array<string>(choiceSets.length);

  for (let coordinate = choiceSets.length - 1; coordinate >= 0; coordinate -= 1) {
    const choices = choiceSets[coordinate];
    const digit = remainder % choices.length;
    symbols[coordinate] = choices[digit];
    remainder = Math.floor(remainder / choices.length);
  }

  return symbols.join("");
}

function enumerateFamily(choiceSets: string[][]) {
  const size = familySize(choiceSets);
  if (size === 0) return [];
  return Array.from({ length: size }, (_, index) => candidateAt(index, choiceSets));
}

function witnessSatisfiesSelector(rows: string[], selector: number[], witness: string) {
  return rows.every((row, rowIndex) => {
    const coordinate = selector[rowIndex];
    return coordinate >= 0 && witness[coordinate] !== row[coordinate];
  });
}

function initialRows(mode: AlphabetMode) {
  return [...FIXTURES[mode].rows];
}

export function CantorClosureLab() {
  const definition = CANTOR_CLOSURE_LAB;
  const [alphabetMode, setAlphabetMode] = useState<AlphabetMode>("binary");
  const [rows, setRows] = useState<string[]>(() => initialRows("binary"));
  const [width, setWidth] = useState(INITIAL_WIDTH);
  const [phase, setPhase] = useState<MachinePhase>("scan");
  const [running, setRunning] = useState(false);
  const [breakOnEscape, setBreakOnEscape] = useState(false);
  const [selectedWitness, setSelectedWitness] = useState<string | null>(null);

  const fixture = FIXTURES[alphabetMode];
  const universe = enumerateUniverse(fixture.alphabet, width);
  const represented = new Set(rows);
  const outsideRows = universe.filter((candidate) => !represented.has(candidate));
  const outsideCount = outsideRows.length;
  const widthForced = outsideCount === 0;

  const identitySelector = rows.length <= width
    ? rows.map((_, rowIndex) => rowIndex)
    : null;
  const identityChoiceSets = identitySelector
    ? buildResidualChoiceSets(rows, identitySelector, fixture.alphabet, width)
    : null;
  const identityFamily = identityChoiceSets ? enumerateFamily(identityChoiceSets) : [];
  const classicalWitness = identityFamily[0] ?? null;

  const requestedWitness = selectedWitness && outsideRows.includes(selectedWitness)
    ? selectedWitness
    : null;
  const activeWitness = requestedWitness ?? classicalWitness ?? outsideRows[0] ?? null;

  let selector: number[] = [];
  let selectorMode: SelectorMode = "none";

  if (activeWitness) {
    if (
      identitySelector
      && witnessSatisfiesSelector(rows, identitySelector, activeWitness)
    ) {
      selector = identitySelector;
      selectorMode = "identity";
    } else {
      selector = deriveSelectorFromWitness(rows, activeWitness);
      selectorMode = rows.length > width ? "reuse" : "alternate";
    }
  }

  const choiceSets = activeWitness
    ? buildResidualChoiceSets(rows, selector, fixture.alphabet, width)
    : [];
  const certifiedFamily = activeWitness ? enumerateFamily(choiceSets) : [];
  const certifiedSet = new Set(certifiedFamily);
  const escapeCount = certifiedFamily.length;

  let residualRegime: ResidualRegime;
  if (widthForced) residualRegime = "width-forced";
  else if (choiceSets.some((choices) => choices.length === 0)) residualRegime = "obstructed";
  else if (escapeCount === 1) residualRegime = "forced";
  else residualRegime = "branching";

  const previewCandidates = Array.from(new Set([
    ...(classicalWitness ? [classicalWitness] : []),
    ...(activeWitness ? [activeWitness] : []),
    ...outsideRows,
  ])).slice(0, OUTSIDE_PREVIEW_SIZE);

  function resetToMode(mode: AlphabetMode) {
    setAlphabetMode(mode);
    setRows(initialRows(mode));
    setWidth(INITIAL_WIDTH);
    setPhase("scan");
    setRunning(false);
    setSelectedWitness(null);
  }

  function admitActiveWitness() {
    if (!activeWitness) {
      setPhase(width >= MAX_DEMO_WIDTH ? "bounded" : "grow");
      setRunning(false);
      return;
    }

    const nextRows = [...rows, activeWitness];
    const nextRepresented = new Set(nextRows);
    const exhaustsCurrentWidth = nextRepresented.size >= universe.length;

    setRows(nextRows);
    setSelectedWitness(null);
    setRunning(false);

    if (exhaustsCurrentWidth) {
      setPhase(width >= MAX_DEMO_WIDTH ? "bounded" : "grow");
    } else {
      setPhase("scan");
    }
  }

  function expandWidth() {
    if (width >= MAX_DEMO_WIDTH) {
      setPhase("bounded");
      setRunning(false);
      return;
    }

    const background = fixture.alphabet[0];
    setRows((current) => current.map((row) => `${row}${background}`));
    setWidth((current) => current + 1);
    setSelectedWitness(null);
    setPhase("scan");
    setRunning(false);
  }

  function advance() {
    if (phase === "bounded") return;
    if (phase === "grow") {
      expandWidth();
      return;
    }

    if (phase === "scan") {
      if (widthForced) {
        setPhase(width >= MAX_DEMO_WIDTH ? "bounded" : "grow");
        setRunning(false);
        return;
      }
      setPhase("escape");
      return;
    }

    if (phase === "escape") {
      setPhase("admit");
      return;
    }

    admitActiveWitness();
  }

  useEffect(() => {
    if (!running || phase === "bounded" || phase === "grow") return;

    const timer = window.setTimeout(() => {
      if (phase === "scan") {
        if (widthForced) {
          setPhase(width >= MAX_DEMO_WIDTH ? "bounded" : "grow");
          setRunning(false);
          return;
        }

        setPhase("escape");
        if (breakOnEscape) setRunning(false);
        return;
      }

      if (phase === "escape") {
        setPhase("admit");
        return;
      }

      if (!activeWitness) {
        setPhase(width >= MAX_DEMO_WIDTH ? "bounded" : "grow");
        setRunning(false);
        return;
      }

      const nextRows = [...rows, activeWitness];
      const exhaustsCurrentWidth = new Set(nextRows).size >= universe.length;

      setRows(nextRows);
      setSelectedWitness(null);
      setRunning(false);

      if (exhaustsCurrentWidth) {
        setPhase(width >= MAX_DEMO_WIDTH ? "bounded" : "grow");
      } else {
        setPhase("scan");
      }
    }, FAST_FORWARD_MS);

    return () => window.clearTimeout(timer);
  }, [
    activeWitness,
    breakOnEscape,
    phase,
    rows,
    running,
    universe.length,
    width,
    widthForced,
  ]);

  function toggleSymbol(rowIndex: number, coordinate: number) {
    setRows((current) => current.map((row, index) => {
      if (index !== rowIndex) return row;
      const symbols = row.split("");
      symbols[coordinate] = nextSymbol(symbols[coordinate], fixture.alphabet);
      return symbols.join("");
    }));
    setPhase("scan");
    setRunning(false);
    setSelectedWitness(null);
  }

  const selectorLabel: Record<SelectorMode, string> = {
    identity: "IDENTITY DIAGONAL",
    alternate: "ALTERNATE SELECTOR",
    reuse: "REUSED COORDINATES",
    none: "NO SELECTOR",
  };

  const regimeCopy: Record<ResidualRegime, { label: string; detail: string }> = {
    forced: {
      label: "FORCED",
      detail: "The current selector leaves exactly one certified witness.",
    },
    branching: {
      label: "BRANCHING",
      detail: `${escapeCount.toLocaleString()} rows satisfy the current selector certificate.`,
    },
    obstructed: {
      label: "SELECTOR OBSTRUCTED",
      detail: "This selector exhausts an admitted coordinate. Choose another outside member or change the representation.",
    },
    "width-forced": {
      label: "WIDTH GROWTH FORCED",
      detail: `All ${universe.length.toLocaleString()} rows of width ${width} are represented. No same-width member remains outside.`,
    },
  };

  const phaseCopy: Record<MachinePhase, { label: string; detail: string }> = {
    scan: {
      label: "SCAN THE REPRESENTATION",
      detail: selectorMode === "reuse"
        ? "Rows outnumber coordinates, so the selector reuses columns. STEP inspects the phases; PLAY runs to the next shape change."
        : "Each represented row is assigned a coordinate where the witness must differ. STEP inspects the phases; PLAY runs to the next shape change.",
    },
    escape: {
      label: "OUTSIDE FAMILY FOUND",
      detail: `${outsideCount.toLocaleString()} rows remain outside the list; ${escapeCount.toLocaleString()} satisfy the current selector certificate.`,
    },
    admit: {
      label: "ADMIT ONE MEMBER",
      detail: "This is the next structural mutation: adding one row changes the list shape while keeping width fixed unless the universe is exhausted.",
    },
    grow: {
      label: "REPRESENTATION MUST WIDEN",
      detail: `Hard breakpoint: the ${rows.length}×${width} representation contains every ${width}-coordinate row admitted by this grammar. Add a coordinate explicitly to continue.`,
    },
    bounded: {
      label: "DEMO BOUNDARY",
      detail: `This teaching fixture stops at width ${MAX_DEMO_WIDTH}. Reset to inspect another path.`,
    },
  };

  const currentPhase = phaseCopy[phase];
  const currentRegime = regimeCopy[residualRegime];
  const gridTemplateColumns = `3rem repeat(${width}, minmax(3rem, 1fr))`;

  return (
    <RepresentationalLabShell
      labId={definition.id}
      identity={{
        eyebrow: definition.eyebrow,
        title: definition.title,
        description: <p>{definition.description}</p>,
      }}
      metric={{
        label: "SHAPE",
        value: `${rows.length}×${width}`,
        detail: selectorLabel[selectorMode],
      }}
      claimBoundary={definition.claimBoundary}
      layout="control-stage"
      primary={(
        <RepresentationalLabPanel ariaLabel="Cantor automaton controls" className={styles.controlPanel}>
          <RepresentationalLabSectionLabel>SELF-PLAYING FIXTURE</RepresentationalLabSectionLabel>
          <h2>Watch escape, reuse, and forced growth happen.</h2>

          <RepresentationalLabStatus
            label={currentPhase.label}
            detail={currentPhase.detail}
            tone={phase === "escape" ? "defect" : phase === "grow" || phase === "bounded" ? "warning" : "info"}
          />

          <div className={styles.regimeCard} data-regime={residualRegime}>
            <span>{currentRegime.label}</span>
            <p>{currentRegime.detail}</p>
          </div>

          <div className={styles.transport} aria-label="Simulation controls">
            <button
              type="button"
              className={styles.playButton}
              onClick={() => setRunning((value) => !value)}
              disabled={phase === "grow" || phase === "bounded"}
              aria-label={running ? "Pause fast-forward" : "Play until the next representation shape change"}
            >
              {running ? "PAUSE" : "PLAY → NEXT CHANGE"}
            </button>
            <button type="button" onClick={advance} disabled={phase === "bounded"}>
              {phase === "grow" ? "ADD COORDINATE" : "STEP"}
            </button>
            <button type="button" onClick={() => resetToMode(alphabetMode)}>
              RESET
            </button>
          </div>

          <div className={styles.phaseRail} aria-label="Cantor construction phases">
            {(["scan", "escape", "admit"] as const).map((item, index) => (
              <div key={item} data-active={phase === item ? "true" : "false"}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.toUpperCase()}</strong>
              </div>
            ))}
          </div>

          <fieldset className={styles.modeControl}>
            <legend>SYMBOL GRAMMAR</legend>
            {(Object.keys(FIXTURES) as AlphabetMode[]).map((mode) => (
              <button
                type="button"
                key={mode}
                data-active={alphabetMode === mode ? "true" : "false"}
                aria-pressed={alphabetMode === mode}
                onClick={() => resetToMode(mode)}
              >
                {FIXTURES[mode].label} · {`{${FIXTURES[mode].alphabet.join(",")}}`}
              </button>
            ))}
          </fieldset>

          <label className={styles.breakpointControl}>
            <input
              type="checkbox"
              checked={breakOnEscape}
              onChange={(event) => setBreakOnEscape(event.target.checked)}
            />
            <span>
              <strong>BREAK ON ESCAPE</strong>
              <small>Optional early breakpoint. PLAY otherwise stops after the next list-shape change. Width-forced growth always pauses.</small>
            </span>
          </label>

          <div className={styles.ruleCard}>
            <RepresentationalLabSectionLabel>CURRENT CASE</RepresentationalLabSectionLabel>
            <p>
              A selector assigns each represented row a coordinate where an outside witness differs.
              Selectors may reuse coordinates. Reuse can be forced, branching, or obstructed; it does not by itself require a wider row.
            </p>
            <dl>
              <div><dt>Selector</dt><dd><strong>{selectorLabel[selectorMode]}</strong></dd></div>
              <div><dt>Outside this list</dt><dd><strong>{outsideCount.toLocaleString()}</strong></dd></div>
              <div><dt>Certified now</dt><dd><strong>{escapeCount.toLocaleString()}</strong></dd></div>
              <div><dt>Finite universe</dt><dd><code>{fixture.alphabet.length}^{width} = {universe.length.toLocaleString()}</code></dd></div>
            </dl>
          </div>
        </RepresentationalLabPanel>
      )}
      secondary={(
        <RepresentationalLabPanel ariaLabel="Cantor escape-set simulation" className={styles.stagePanel}>
          <div className={styles.stageHeader}>
            <div>
              <RepresentationalLabSectionLabel>CURRENT LIST</RepresentationalLabSectionLabel>
              <h2>{rows.length} rows × {width} coordinates</h2>
            </div>
            <span className={styles.liveIndicator} data-running={running ? "true" : "false"}>
              {running ? "FAST FORWARD" : phase === "grow" ? "BREAKPOINT" : "READY"}
            </span>
          </div>

          <div className={styles.matrix} data-phase={phase}>
            <div className={styles.matrixHeader} aria-hidden="true" style={{ gridTemplateColumns }}>
              <span />
              {Array.from({ length: width }, (_, coordinate) => (
                <span key={coordinate}>c{coordinate}</span>
              ))}
            </div>
            {rows.map((row, rowIndex) => (
              <div
                className={styles.matrixRow}
                key={`${rowIndex}-${row}`}
                style={{ gridTemplateColumns }}
              >
                <span className={styles.rowLabel}>r{rowIndex}</span>
                {Array.from({ length: width }, (_, coordinate) => {
                  const isSelectedCoordinate = selector[rowIndex] === coordinate;
                  const isClassicDiagonal = rowIndex === coordinate && rowIndex < width;
                  return (
                    <button
                      type="button"
                      key={coordinate}
                      className={styles.cell}
                      data-selector={isSelectedCoordinate ? "true" : "false"}
                      data-classic={isClassicDiagonal ? "true" : "false"}
                      onClick={() => toggleSymbol(rowIndex, coordinate)}
                      aria-label={`Row ${rowIndex}, coordinate ${coordinate}, value ${row[coordinate]}. Cycle symbol.${isSelectedCoordinate ? " Selected witness coordinate." : ""}`}
                    >
                      {row[coordinate]}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          <div
            className={styles.escapeZone}
            data-visible={phase === "escape" || phase === "admit" || phase === "grow" || phase === "bounded" ? "true" : "false"}
          >
            <div className={styles.escapeHeader}>
              <div>
                <RepresentationalLabSectionLabel>OUTSIDE THE LIST</RepresentationalLabSectionLabel>
                <h3>{outsideCount.toLocaleString()} same-width members</h3>
              </div>
              <span>{previewCandidates.length} shown</span>
            </div>

            <p className={styles.escapeSentence}>
              The current selector certifies {escapeCount.toLocaleString()} of them. Pick any outside member and the machine can retarget a selector to coordinates where that member differs from every row.
            </p>

            {previewCandidates.length > 0 ? (
              <div className={styles.escapeFamily}>
                {previewCandidates.map((candidate) => {
                  const canonical = candidate === classicalWitness;
                  const certified = certifiedSet.has(candidate);
                  const selected = candidate === activeWitness;
                  return (
                    <button
                      type="button"
                      key={candidate}
                      className={styles.escapeMember}
                      data-canonical={canonical ? "true" : "false"}
                      data-certified={certified ? "true" : "false"}
                      data-selected={selected ? "true" : "false"}
                      onClick={() => {
                        setSelectedWitness(candidate);
                        setPhase("admit");
                        setRunning(false);
                      }}
                      aria-pressed={selected}
                    >
                      <code>{candidate}</code>
                      <small>
                        {canonical ? "classical diagonal" : certified ? "current selector" : "outside member"}
                      </small>
                    </button>
                  );
                })}
                {outsideCount > previewCandidates.length ? (
                  <div className={styles.moreMembers}>
                    +{(outsideCount - previewCandidates.length).toLocaleString()} more
                  </div>
                ) : null}
              </div>
            ) : (
              <div className={styles.growthNotice}>
                <strong>NO SAME-WIDTH MEMBER REMAINS</strong>
                <p>
                  The current finite universe is exhausted. Continuing with a distinct member now requires a wider coordinate set or a richer alphabet.
                </p>
              </div>
            )}

            {activeWitness ? (
              <div className={styles.admissionLane}>
                <span>SELECTED</span>
                <code>{activeWitness}</code>
                <strong>{certifiedSet.has(activeWitness) ? "CERTIFIED" : "OUTSIDE"}</strong>
                <button
                  type="button"
                  onClick={() => {
                    setRunning(false);
                    admitActiveWitness();
                  }}
                >
                  ADMIT →
                </button>
              </div>
            ) : phase === "grow" ? (
              <div className={styles.admissionLane}>
                <span>REPAIR</span>
                <code>+ c{width}</code>
                <strong>WIDTH +1</strong>
                <button type="button" onClick={expandWidth}>
                  ADD COORDINATE →
                </button>
              </div>
            ) : null}
          </div>

          <p className={styles.stageCaption}>
            STEP exposes selector mechanics. PLAY fast-forwards to the next shape change. Square binary identity diagonalization is the rigid forced case; rectangular lists may reuse coordinates, and width growth remains an explicit structural breakpoint.
          </p>
        </RepresentationalLabPanel>
      )}
    />
  );
}
