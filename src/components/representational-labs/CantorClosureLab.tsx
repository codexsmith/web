"use client";

import { useState } from "react";
import {
  RepresentationalLabPanel,
  RepresentationalLabSectionLabel,
  RepresentationalLabShell,
  RepresentationalLabStatus,
  RepresentationalLabTrace,
} from "./RepresentationalLabShell";
import { CANTOR_CLOSURE_LAB } from "./lab-definitions";
import type {
  RepresentationalLabTone,
  RepresentationalLabTraceEvent,
} from "./lab-patterns";
import styles from "./cantor-closure-lab.module.css";

const MAX_WIDTH = 8;
const INITIAL_STAGE = 4;
const FAMILY_PREVIEW_SIZE = 4;

type AlphabetMode = "binary" | "ternary";
type LabStatus = "ready" | "defect" | "implementation-defect" | "extended" | "bounded";
type DefectClass = "representation-defect" | "implementation-defect";
type WitnessContractKind = "canonical-constructor" | "escape-family";

type CertificateEntry = {
  row: number;
  coordinate: number;
  rowSymbol: string;
  witnessSymbol: string;
  passes: boolean;
};

type SuccessorBranch = {
  candidateIndex: number;
  admittedWitness: string;
  nextStage: number;
  nextDiagonalSymbol: string;
  nextCanonicalWitness: string;
  nextFamilySize: number;
  nextFamilyFormula: string;
};

type CantorRunRecord = {
  schemaVersion: "cantor-fixture-run/v2";
  experimentId: string;
  experimentVersion: string;
  runId: string;
  fixture: {
    alphabetMode: AlphabetMode;
    alphabet: string[];
    maxWidth: number;
    stage: number;
  };
  rows: string[];
  diagonal: string;
  canonicalWitness: string;
  expectedWitness: string;
  witness: string;
  witnessContract: {
    kind: WitnessContractKind;
    candidateIndex: number;
    familySize: number;
    familyFormula: string;
  };
  containment: {
    contained: boolean;
    contract: "exact-row-membership";
  };
  certificate: CertificateEntry[];
  implementationIntegrity: {
    passes: boolean;
    detail: string;
  };
  defectClass: DefectClass;
  trace: RepresentationalLabTraceEvent[];
};

const FIXTURES: Record<
  AlphabetMode,
  { label: string; alphabet: string[]; rows: string[]; rule: string }
> = {
  binary: {
    label: "BINARY",
    alphabet: ["0", "1"],
    rows: ["01011010", "11000101", "00110110", "10101001"],
    rule: "0 ↔ 1",
  },
  ternary: {
    label: "TERNARY",
    alphabet: ["0", "1", "2"],
    rows: ["01201201", "12012012", "20120120", "02102102"],
    rule: "0 → 1 → 2 → 0",
  },
};

function nextSymbol(symbol: string, alphabet: string[]) {
  const index = alphabet.indexOf(symbol);
  if (index < 0) return alphabet[0];
  return alphabet[(index + 1) % alphabet.length];
}

function buildEscapeChoiceSets(rows: string[], stage: number, alphabet: string[]) {
  return Array.from({ length: MAX_WIDTH }, (_, coordinate) => {
    if (coordinate >= stage) return [...alphabet];

    const excluded = rows[coordinate][coordinate];
    const canonical = nextSymbol(excluded, alphabet);
    return [
      canonical,
      ...alphabet.filter((symbol) => symbol !== excluded && symbol !== canonical),
    ];
  });
}

function witnessFamilySize(choiceSets: string[][]) {
  return choiceSets.reduce((total, choices) => total * choices.length, 1);
}

function witnessAtIndex(choiceSets: string[][], candidateIndex: number) {
  if (choiceSets.length === 0) return "";

  const total = witnessFamilySize(choiceSets);
  let remainder = Math.max(0, Math.min(candidateIndex, total - 1));
  const symbols = new Array<string>(choiceSets.length);

  for (let coordinate = choiceSets.length - 1; coordinate >= 0; coordinate -= 1) {
    const choices = choiceSets[coordinate];
    symbols[coordinate] = choices[remainder % choices.length];
    remainder = Math.floor(remainder / choices.length);
  }

  return symbols.join("");
}

function successorBranchIndices(choiceSets: string[][], stage: number) {
  if (stage >= MAX_WIDTH) return [];

  const suffixWeight = choiceSets
    .slice(stage + 1)
    .reduce((total, choices) => total * choices.length, 1);

  return choiceSets[stage].map((_, choiceIndex) => choiceIndex * suffixWeight);
}

function fixtureLoadedEvent(mode: AlphabetMode): RepresentationalLabTraceEvent {
  const fixture = FIXTURES[mode];
  return {
    seq: 1,
    label: "fixture_loaded",
    detail: `S${INITIAL_STAGE} contains four admitted ${MAX_WIDTH}-symbol rows over {${fixture.alphabet.join(
      ", ",
    )}}; four coordinates are currently visible.`,
    tone: "info",
  };
}

function nextTraceSequence(trace: RepresentationalLabTraceEvent[]) {
  return trace.reduce((max, event) => Math.max(max, event.seq), 0) + 1;
}

function nextTrace(
  trace: RepresentationalLabTraceEvent[],
  label: string,
  detail: string,
  tone: RepresentationalLabTone,
) {
  return [
    ...trace,
    { seq: nextTraceSequence(trace), label, detail, tone },
  ].slice(-12);
}

export function CantorClosureLab() {
  const definition = CANTOR_CLOSURE_LAB;
  const [alphabetMode, setAlphabetMode] = useState<AlphabetMode>("binary");
  const [rows, setRows] = useState<string[]>(FIXTURES.binary.rows);
  const [stage, setStage] = useState(INITIAL_STAGE);
  const [witness, setWitness] = useState<string | null>(null);
  const [selectedWitnessIndex, setSelectedWitnessIndex] = useState<number | null>(null);
  const [candidateWindowStart, setCandidateWindowStart] = useState(0);
  const [status, setStatus] = useState<LabStatus>("ready");
  const [hoodOpen, setHoodOpen] = useState(false);
  const [faultInjection, setFaultInjection] = useState(false);
  const [lastRun, setLastRun] = useState<CantorRunRecord | null>(null);
  const [trace, setTrace] = useState<RepresentationalLabTraceEvent[]>([
    fixtureLoadedEvent("binary"),
  ]);

  const fixture = FIXTURES[alphabetMode];
  const activeRows = rows.slice(0, stage);
  const visibleColumns = Array.from({ length: stage }, (_, index) => index);
  const diagonalSymbols = activeRows.map((row, index) => row[index]);
  const escapeChoiceSets = buildEscapeChoiceSets(activeRows, stage, fixture.alphabet);
  const escapeFamilySize = witnessFamilySize(escapeChoiceSets);
  const canonicalWitness = witnessAtIndex(escapeChoiceSets, 0);
  const familyFormula = `(${fixture.alphabet.length}-1)^${stage} × ${fixture.alphabet.length}^${MAX_WIDTH - stage}`;
  const candidatePreviewCount = Math.min(
    FAMILY_PREVIEW_SIZE,
    Math.max(0, escapeFamilySize - candidateWindowStart),
  );
  const candidatePreview = Array.from({ length: candidatePreviewCount }, (_, offset) => {
    const index = candidateWindowStart + offset;
    return {
      index,
      witness: witnessAtIndex(escapeChoiceSets, index),
      canonical: index === 0,
    };
  });
  const successorBranches: SuccessorBranch[] = stage < MAX_WIDTH
    ? successorBranchIndices(escapeChoiceSets, stage).map((candidateIndex) => {
      const admittedWitness = witnessAtIndex(escapeChoiceSets, candidateIndex);
      const nextStage = stage + 1;
      const nextRows = [...activeRows, admittedWitness];
      const nextChoiceSets = buildEscapeChoiceSets(nextRows, nextStage, fixture.alphabet);
      return {
        candidateIndex,
        admittedWitness,
        nextStage,
        nextDiagonalSymbol: admittedWitness[stage],
        nextCanonicalWitness: witnessAtIndex(nextChoiceSets, 0),
        nextFamilySize: witnessFamilySize(nextChoiceSets),
        nextFamilyFormula: `(${fixture.alphabet.length}-1)^${nextStage} × ${fixture.alphabet.length}^${MAX_WIDTH - nextStage}`,
      };
    })
    : [];
  const distinctSuccessorCanonicals = new Set(
    successorBranches.map((branch) => branch.nextCanonicalWitness),
  ).size;

  const invariantChecks: CertificateEntry[] = witness
    ? activeRows.map((row, index) => ({
      row: index,
      coordinate: index,
      rowSymbol: row[index],
      witnessSymbol: witness[index],
      passes: row[index] !== witness[index],
    }))
    : [];

  const passedChecks = invariantChecks.filter((check) => check.passes).length;
  const runJson = lastRun ? JSON.stringify(lastRun, null, 2) : "";
  const interpretationBlocked = status === "implementation-defect";
  const selectedContract: WitnessContractKind | null = selectedWitnessIndex == null
    ? null
    : selectedWitnessIndex === 0
      ? "canonical-constructor"
      : "escape-family";

  function appendTrace(
    label: string,
    detail: string,
    tone: RepresentationalLabTone,
  ) {
    setTrace((current) => nextTrace(current, label, detail, tone));
  }

  function clearWitnessSelection() {
    setWitness(null);
    setSelectedWitnessIndex(null);
    setCandidateWindowStart(0);
    setStatus("ready");
  }

  function resetToMode(mode: AlphabetMode, reason?: string) {
    const nextFixture = FIXTURES[mode];
    setAlphabetMode(mode);
    setRows(nextFixture.rows);
    setStage(INITIAL_STAGE);
    setWitness(null);
    setSelectedWitnessIndex(null);
    setCandidateWindowStart(0);
    setStatus("ready");
    setFaultInjection(false);
    setLastRun(null);
    setTrace([
      fixtureLoadedEvent(mode),
      ...(reason
        ? [
          {
            seq: 2,
            label: "alphabet_changed",
            detail: reason,
            tone: "change" as const,
          },
        ]
        : []),
    ]);
  }

  function toggleSymbol(rowIndex: number, columnIndex: number) {
    setRows((current) => current.map((row, index) => {
      if (index !== rowIndex) return row;
      const symbol = nextSymbol(row[columnIndex], fixture.alphabet);
      return `${row.slice(0, columnIndex)}${symbol}${row.slice(columnIndex + 1)}`;
    }));
    clearWitnessSelection();
    appendTrace(
      "representation_changed",
      `Cycled r${rowIndex} at c${columnIndex} within the declared ${alphabetMode} alphabet. The witness family was recomputed.`,
      "change",
    );
  }

  function evaluateWitness(candidateIndex: number) {
    const normalizedIndex = Math.max(0, Math.min(candidateIndex, escapeFamilySize - 1));
    const expectedWitness = witnessAtIndex(escapeChoiceSets, normalizedIndex);
    const witnessContract: WitnessContractKind = normalizedIndex === 0
      ? "canonical-constructor"
      : "escape-family";

    // Calibration-only fault injection deliberately corrupts one produced coordinate
    // after the declared constructor/family selector has run. The verifier must
    // classify this as an implementation defect rather than a representation defect.
    const actualWitness = faultInjection
      ? `${diagonalSymbols[0]}${expectedWitness.slice(1)}`
      : expectedWitness;

    const certificate: CertificateEntry[] = activeRows.map((row, index) => ({
      row: index,
      coordinate: index,
      rowSymbol: row[index],
      witnessSymbol: actualWitness[index],
      passes: row[index] !== actualWitness[index],
    }));
    const integrityPasses = actualWitness === expectedWitness && certificate.every((check) => check.passes);
    const contained = activeRows.includes(actualWitness);
    const defectClass: DefectClass = integrityPasses
      ? "representation-defect"
      : "implementation-defect";
    const nextStatus: LabStatus = integrityPasses ? "defect" : "implementation-defect";
    const expectedVisibleWitness = expectedWitness.slice(0, stage);
    const event = {
      seq: nextTraceSequence(trace),
      label: integrityPasses
        ? witnessContract === "canonical-constructor"
          ? "canonical_witness_constructed"
          : "escape_family_witness_selected"
        : "implementation_defect_detected",
      detail: integrityPasses
        ? witnessContract === "canonical-constructor"
          ? `The deterministic ${alphabetMode} substitution produced ${expectedVisibleWitness}. It is candidate #0 of ${escapeFamilySize.toLocaleString()} full-width rows satisfying the diagonal escape certificate at S${stage}.`
          : `Selected certified escapee #${normalizedIndex}. It differs from every admitted row at that row's diagonal coordinate and may be admitted as the next representation extension.`
        : "The produced witness does not match the selected construction/family candidate. Treat the fixture as defective; do not interpret this failure as mathematical non-containment.",
      tone: integrityPasses ? ("defect" as const) : ("warning" as const),
    };
    const recordedTrace = [...trace, event].slice(-12);
    const runId = `${alphabetMode}-S${stage}-W${normalizedIndex}-${diagonalSymbols.join("")}-${actualWitness.slice(0, stage)}`;

    setWitness(actualWitness);
    setSelectedWitnessIndex(normalizedIndex);
    setStatus(nextStatus);
    setTrace(recordedTrace);
    setLastRun({
      schemaVersion: "cantor-fixture-run/v2",
      experimentId: definition.id,
      experimentVersion: definition.version,
      runId,
      fixture: {
        alphabetMode,
        alphabet: [...fixture.alphabet],
        maxWidth: MAX_WIDTH,
        stage,
      },
      rows: [...activeRows],
      diagonal: diagonalSymbols.join(""),
      canonicalWitness,
      expectedWitness,
      witness: actualWitness,
      witnessContract: {
        kind: witnessContract,
        candidateIndex: normalizedIndex,
        familySize: escapeFamilySize,
        familyFormula,
      },
      containment: {
        contained,
        contract: "exact-row-membership",
      },
      certificate,
      implementationIntegrity: {
        passes: integrityPasses,
        detail: integrityPasses
          ? witnessContract === "canonical-constructor"
            ? "Produced witness matches the deterministic diagonal substitution and differs from every admitted row at that row's diagonal coordinate."
            : "Produced witness matches the selected deterministic family candidate and satisfies every diagonal non-equality constraint."
          : "Produced witness differs from the independently recomputed selected candidate. Interpretation stops at implementation defect.",
      },
      defectClass,
      trace: recordedTrace,
    });
  }

  function constructCanonicalWitness() {
    evaluateWitness(0);
  }

  function admitWitness() {
    if (!witness) return;

    if (status === "implementation-defect") {
      appendTrace(
        "admission_blocked",
        "Admission is blocked because the fixture failed its implementation-integrity check.",
        "warning",
      );
      return;
    }

    if (stage >= MAX_WIDTH) {
      setStatus("bounded");
      appendTrace(
        "fixture_boundary_reached",
        `The ${MAX_WIDTH}-coordinate calibration fixture cannot promote again without increasing its declared width.`,
        "warning",
      );
      return;
    }

    const nextStage = stage + 1;
    const admittedCandidate = selectedWitnessIndex ?? 0;
    setRows((current) => [...current, witness]);
    setStage(nextStage);
    setWitness(null);
    setSelectedWitnessIndex(null);
    setCandidateWindowStart(0);
    setStatus("extended");
    appendTrace(
      "representation_extended",
      `Admitted certified escapee #${admittedCandidate} as r${stage}; S${stage} became S${nextStage}. The old family is discarded and a new family is certified against the enlarged representation.`,
      "repair",
    );
  }

  function resetFixture() {
    resetToMode(alphabetMode);
  }

  function replayLastRun() {
    if (!lastRun) return;
    const replayMode = lastRun.fixture.alphabetMode;
    setAlphabetMode(replayMode);
    setRows([...lastRun.rows]);
    setStage(lastRun.fixture.stage);
    setWitness(lastRun.witness);
    setSelectedWitnessIndex(lastRun.witnessContract.candidateIndex);
    setCandidateWindowStart(
      Math.floor(lastRun.witnessContract.candidateIndex / FAMILY_PREVIEW_SIZE) * FAMILY_PREVIEW_SIZE,
    );
    setFaultInjection(lastRun.defectClass === "implementation-defect");
    setStatus(lastRun.defectClass === "implementation-defect" ? "implementation-defect" : "defect");
    setTrace(nextTrace(
      lastRun.trace,
      "run_replayed",
      `Replayed ${lastRun.runId} from its recorded rows, alphabet, stage, selected witness contract, and candidate index.`,
      "info",
    ));
  }

  function exportLastRun() {
    if (!lastRun) return;
    const blob = new Blob([JSON.stringify(lastRun, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${lastRun.runId}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    appendTrace(
      "run_exported",
      `Exported deterministic run record ${lastRun.runId}.`,
      "info",
    );
  }

  const statusCopy: Record<
    LabStatus,
    { label: string; detail: string; tone: RepresentationalLabTone }
  > = {
    ready: {
      label: "READY",
      detail: "Change the represented rows, construct the canonical witness, or select another certified escapee.",
      tone: "info",
    },
    defect: {
      label: "REPRESENTATION DEFECT",
      detail: "The verified selection produced a witness outside the currently admitted row set.",
      tone: "defect",
    },
    "implementation-defect": {
      label: "IMPLEMENTATION DEFECT",
      detail: "The produced witness failed the selected construction contract's integrity check. Mathematical interpretation is blocked.",
      tone: "warning",
    },
    extended: {
      label: "REPRESENTATION EXTENDED",
      detail: "The prior witness is now admitted. The escape family has been recomputed against the larger stage.",
      tone: "repair",
    },
    bounded: {
      label: "FIXTURE BOUNDARY",
      detail: `This finite calibration object has reached its declared ${MAX_WIDTH}-coordinate limit.`,
      tone: "warning",
    },
  };

  const currentStatus = statusCopy[status];

  return (
    <RepresentationalLabShell
      labId={definition.id}
      identity={{
        eyebrow: definition.eyebrow,
        title: definition.title,
        description: <p>{definition.description}</p>,
      }}
      metric={{
        label: "STAGE",
        value: `S${stage}`,
        detail: `${stage} rows / ${stage} visible coordinates`,
      }}
      claimBoundary={definition.claimBoundary}
      layout={definition.layout}
      primary={(
        <RepresentationalLabPanel ariaLabel="Diagonal construction instrument">
          <div className={styles.instrumentHeader}>
            <div>
              <RepresentationalLabSectionLabel>ADMITTED REPRESENTATION</RepresentationalLabSectionLabel>
              <h2>Change a row. Then choose what escapes.</h2>
            </div>
            <RepresentationalLabStatus
              label={currentStatus.label}
              detail={currentStatus.detail}
              tone={currentStatus.tone}
            />
          </div>

          <fieldset className={styles.alphabetControl}>
            <legend>ADMITTED SYMBOL GRAMMAR</legend>
            {(Object.keys(FIXTURES) as AlphabetMode[]).map((mode) => (
              <button
                type="button"
                key={mode}
                data-active={alphabetMode === mode ? "true" : "false"}
                aria-pressed={alphabetMode === mode}
                onClick={() => resetToMode(
                  mode,
                  `Loaded the ${FIXTURES[mode].label.toLowerCase()} fixture and reset the represented regime.`,
                )}
              >
                {FIXTURES[mode].label} · {`{${FIXTURES[mode].alphabet.join(",")}}`}
              </button>
            ))}
            <span>canonical substitution: {fixture.rule}</span>
          </fieldset>

          <div className={styles.matrixWrap}>
            <div className={styles.matrixHeader} aria-hidden="true">
              <span />
              {visibleColumns.map((column) => <span key={column}>c{column}</span>)}
            </div>

            <div className={styles.matrix}>
              {activeRows.map((row, rowIndex) => (
                <div className={styles.row} key={`${rowIndex}-${row}`}>
                  <span className={styles.rowLabel}>r{rowIndex}</span>
                  {visibleColumns.map((columnIndex) => {
                    const diagonal = rowIndex === columnIndex;
                    return (
                      <button
                        type="button"
                        className={styles.bit}
                        data-diagonal={diagonal ? "true" : "false"}
                        key={`${rowIndex}-${columnIndex}`}
                        onClick={() => toggleSymbol(rowIndex, columnIndex)}
                        aria-label={`Row ${rowIndex}, coordinate ${columnIndex}, value ${row[columnIndex]}. Cycle symbol within ${alphabetMode} alphabet.`}
                      >
                        {row[columnIndex]}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className={styles.witnessRail} data-visible={witness ? "true" : "false"}>
              <span className={styles.rowLabel}>w*</span>
              {visibleColumns.map((columnIndex) => (
                <span className={styles.witnessBit} key={columnIndex}>
                  {witness ? witness[columnIndex] : "·"}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.actions} aria-label="Experiment command rail">
            <button type="button" className={styles.primaryAction} onClick={constructCanonicalWitness}>
              CONSTRUCT CANONICAL WITNESS
            </button>
            <button
              type="button"
              className={styles.secondaryAction}
              onClick={admitWitness}
              disabled={!witness || status === "implementation-defect"}
            >
              ADMIT SELECTED WITNESS → NEXT STAGE
            </button>
            <button type="button" className={styles.ghostAction} onClick={resetFixture}>
              RESET
            </button>
          </div>
        </RepresentationalLabPanel>
      )}
      secondary={(
        <RepresentationalLabPanel
          ariaLabel="Certified escape and successor analysis"
          className={styles.analysisPanel}
        >
          <div className={styles.familyPanel} aria-label="Certified escape witness family">
            <div className={styles.familyHeader}>
              <div>
                <RepresentationalLabSectionLabel>CERTIFIED ESCAPE FAMILY</RepresentationalLabSectionLabel>
                <strong>{escapeFamilySize.toLocaleString()} witnesses satisfy the current diagonal certificate</strong>
              </div>
              <code>{familyFormula}</code>
            </div>
            <p className={styles.familyExplanation}>
              Candidate #0 is the deterministic substitution above. Other candidates keep every required diagonal difference while choosing other admitted symbols where the certificate leaves freedom. Select any certified candidate, then admit it.
            </p>
            <div className={styles.candidateGrid}>
              {candidatePreview.map((candidate) => (
                <button
                  type="button"
                  key={candidate.index}
                  className={styles.candidateButton}
                  data-selected={selectedWitnessIndex === candidate.index ? "true" : "false"}
                  data-canonical={candidate.canonical ? "true" : "false"}
                  aria-pressed={selectedWitnessIndex === candidate.index}
                  onClick={() => evaluateWitness(candidate.index)}
                >
                  <span>{candidate.canonical ? "CANONICAL" : `ESCAPEE #${candidate.index}`}</span>
                  <code>{candidate.witness}</code>
                  <small>{candidate.canonical ? "deterministic constructor" : "certificate-valid alternative"}</small>
                </button>
              ))}
            </div>
            {escapeFamilySize > FAMILY_PREVIEW_SIZE ? (
              <div className={styles.familyPager}>
                <span>
                  showing {candidateWindowStart + 1}–{candidateWindowStart + candidatePreviewCount} of {escapeFamilySize.toLocaleString()}
                </span>
                <button
                  type="button"
                  onClick={() => setCandidateWindowStart((current) => (
                    current + FAMILY_PREVIEW_SIZE >= escapeFamilySize
                      ? 0
                      : current + FAMILY_PREVIEW_SIZE
                  ))}
                >
                  NEXT SAMPLE →
                </button>
              </div>
            ) : null}
          </div>

          {stage < MAX_WIDTH ? (
            <div className={styles.successorPanel} aria-label="Successor branch preview">
              <div className={styles.successorHeader}>
                <div>
                  <RepresentationalLabSectionLabel>SUCCESSOR BRANCH PREVIEW</RepresentationalLabSectionLabel>
                  <strong>{successorBranches.length} distinct next-coordinate admissions are inspectable before mutation</strong>
                </div>
                <span>S{stage} → S{stage + 1}</span>
              </div>
              <p className={styles.successorExplanation}>
                These are counterfactual previews, not batch admissions. Each branch chooses one certified witness whose value at the next diagonal coordinate differs. The successor family has the same finite cardinality under this uniform alphabet/width contract, but its membership changes because the new row installs a different constraint at c{stage}.
              </p>
              <div className={styles.branchGrid}>
                {successorBranches.map((branch) => (
                  <article
                    className={styles.branchCard}
                    data-selected={selectedWitnessIndex === branch.candidateIndex ? "true" : "false"}
                    key={branch.candidateIndex}
                  >
                    <div className={styles.branchTitle}>
                      <span>{branch.candidateIndex === 0 ? "CANONICAL BRANCH" : `BRANCH #${branch.candidateIndex}`}</span>
                      <code>{branch.admittedWitness}</code>
                    </div>
                    <dl>
                      <div><dt>New constraint</dt><dd>r{stage}@c{stage} = {branch.nextDiagonalSymbol}</dd></div>
                      <div><dt>Next canonical</dt><dd><code>{branch.nextCanonicalWitness}</code></dd></div>
                      <div><dt>Next family</dt><dd>{branch.nextFamilySize.toLocaleString()}</dd></div>
                      <div><dt>Formula</dt><dd><code>{branch.nextFamilyFormula}</code></dd></div>
                    </dl>
                    <button
                      type="button"
                      className={styles.branchSelect}
                      onClick={() => evaluateWitness(branch.candidateIndex)}
                      aria-pressed={selectedWitnessIndex === branch.candidateIndex}
                    >
                      {selectedWitnessIndex === branch.candidateIndex ? "SELECTED FOR ADMISSION" : "SELECT THIS BRANCH"}
                    </button>
                  </article>
                ))}
              </div>
              <p className={styles.branchConclusion}>
                <strong>{distinctSuccessorCanonicals} distinct next canonical witnesses</strong> arise from these {successorBranches.length} admissible next-coordinate choices. Same family size does not imply the same successor representation.
              </p>
            </div>
          ) : null}


          <div className={styles.mechanism} aria-live="polite">
            <div>
              <span>DIAGONAL</span>
              <strong>{diagonalSymbols.join(" ")}</strong>
            </div>
            <div className={styles.arrow} aria-hidden="true">→</div>
            <div>
              <span>SELECTED WITNESS</span>
              <strong>{witness ? witness.slice(0, stage).split("").join(" ") : "—"}</strong>
              <small>{selectedContract ? selectedContract.replace("-", " ") : "no candidate selected"}</small>
            </div>
            <div className={styles.arrow} aria-hidden="true">→</div>
            <div>
              <span>CERTIFICATE</span>
              <strong>{witness ? `${passedChecks}/${stage} coordinates differ` : "not run"}</strong>
            </div>
          </div>

          {witness ? (
            <div className={styles.certificate} aria-label="Coordinate difference certificate">
              <div className={styles.certificateHeader}>
                <div>
                  <RepresentationalLabSectionLabel>DIFFERENCE CERTIFICATE</RepresentationalLabSectionLabel>
                  <strong>
                    {interpretationBlocked
                      ? "Containment interpretation blocked by implementation defect"
                      : activeRows.includes(witness)
                        ? "Witness is contained"
                        : `Certified escapee #${selectedWitnessIndex ?? 0} is not an admitted row`}
                  </strong>
                </div>
                <span data-pass={invariantChecks.every((check) => check.passes) ? "true" : "false"}>
                  {invariantChecks.every((check) => check.passes) ? "VERIFIED" : "INTEGRITY FAILURE"}
                </span>
              </div>
              <ol>
                {invariantChecks.map((check) => (
                  <li key={check.row} data-pass={check.passes ? "true" : "false"}>
                    <span>r{check.row} @ c{check.coordinate}</span>
                    <code>{check.rowSymbol} ≠ {check.witnessSymbol}</code>
                    <strong>{check.passes ? "PASS" : "FAIL"}</strong>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}
        </RepresentationalLabPanel>
      )}
      footer={(
        <RepresentationalLabPanel
          as="aside"
          ariaLabel="Representation inspector"
          className={styles.inspector}
        >
          <section>
            <RepresentationalLabSectionLabel>CURRENT REPRESENTATION</RepresentationalLabSectionLabel>
            <dl className={styles.definitionList}>
              <div><dt>Alphabet</dt><dd>{`{${fixture.alphabet.join(", ")}}`}</dd></div>
              <div><dt>Canonical substitution</dt><dd>{fixture.rule}</dd></div>
              <div><dt>Stored width</dt><dd>{MAX_WIDTH} symbols</dd></div>
              <div><dt>Admitted rows</dt><dd>{stage}</dd></div>
              <div><dt>Visible coordinates</dt><dd>{stage}</dd></div>
              <div><dt>Escape family</dt><dd>{escapeFamilySize.toLocaleString()} certified rows</dd></div>
              <div><dt>Successor branches</dt><dd>{stage < MAX_WIDTH ? successorBranches.length : "fixture bound"}</dd></div>
              <div><dt>Selected source</dt><dd>{selectedContract ?? "none"}</dd></div>
              <div><dt>Operation</dt><dd>diagonal certificate + selectable admission</dd></div>
            </dl>
          </section>

          <section>
            <RepresentationalLabSectionLabel>AUTHORITY CLASSES</RepresentationalLabSectionLabel>
            <div className={styles.authorityGrid}>
              <article data-authority="fixture">
                <strong>FINITE FIXTURE</strong>
                <span>Executable here</span>
                <p>Bounded rows, declared alphabet, deterministic constructor, certified escape family, counterfactual successor branches, selectable admission, containment check, and replayable certificate.</p>
              </article>
              <article data-authority="established">
                <strong>CLASSICAL THEOREM</strong>
                <span>Established mathematics</span>
                <p>Cantor&apos;s infinite diagonal argument is external prior mathematics. This finite fixture teaches its mechanism; it does not prove the theorem by itself.</p>
              </article>
              <article data-authority="interpretation">
                <strong>BFL INTERPRETATION</strong>
                <span>Experimental framing</span>
                <p>Reading non-containment as a representation defect followed by explicit extension is the laboratory framing, not a novel transfinite theorem.</p>
              </article>
            </div>
          </section>

          <section>
            <RepresentationalLabSectionLabel>CONSEQUENCE TRACE</RepresentationalLabSectionLabel>
            <RepresentationalLabTrace events={trace} />
          </section>

          <section>
            <RepresentationalLabSectionLabel>RUN RECORD</RepresentationalLabSectionLabel>
            {lastRun ? (
              <div className={styles.runRecord}>
                <dl className={styles.definitionList}>
                  <div><dt>Run</dt><dd>{lastRun.runId}</dd></div>
                  <div><dt>Witness source</dt><dd>{lastRun.witnessContract.kind}</dd></div>
                  <div><dt>Candidate</dt><dd>#{lastRun.witnessContract.candidateIndex} / {lastRun.witnessContract.familySize.toLocaleString()}</dd></div>
                  <div><dt>Defect class</dt><dd>{lastRun.defectClass}</dd></div>
                  <div><dt>Integrity</dt><dd>{lastRun.implementationIntegrity.passes ? "verified" : "failed"}</dd></div>
                  <div>
                    <dt>Contained</dt>
                    <dd>
                      {lastRun.implementationIntegrity.passes
                        ? lastRun.containment.contained
                          ? "yes"
                          : "no"
                        : "interpretation blocked"}
                    </dd>
                  </div>
                </dl>
                <div className={styles.recordActions}>
                  <button type="button" onClick={exportLastRun}>EXPORT JSON</button>
                  <button type="button" onClick={replayLastRun}>REPLAY RECORD</button>
                </div>
                <details>
                  <summary>Inspect machine-readable record</summary>
                  <pre>{runJson}</pre>
                </details>
              </div>
            ) : (
              <p className={styles.emptyRecord}>Select a witness to emit a deterministic, inspectable run record.</p>
            )}
          </section>

          <section>
            <button
              type="button"
              className={styles.hoodToggle}
              onClick={() => setHoodOpen((open) => !open)}
              aria-expanded={hoodOpen}
            >
              {hoodOpen ? "CLOSE THE HOOD" : "OPEN THE HOOD"}
            </button>
            {hoodOpen && (
              <div className={styles.hood}>
                <p><strong>Canonical construction.</strong> At active row i, replace the diagonal symbol rᵢᵢ with the next admitted symbol in the declared alphabet. This deterministic choice is candidate #0.</p>
                <p><strong>Escape family.</strong> The certificate requires only wᵢ ≠ rᵢᵢ for each active diagonal coordinate. Every allowed choice at those coordinates, combined with any admitted values in not-yet-visible trailing coordinates, yields another full-width row that cannot equal any admitted row.</p>
                <p><strong>Multiplicity.</strong> At S{stage}, the family has (|A|-1)^{stage} × |A|^{MAX_WIDTH - stage} = {escapeFamilySize.toLocaleString()} certified rows. The deterministic constructor selects one; it does not make that witness unique.</p>
                <p><strong>Successor branches.</strong> Before admission, choose witnesses that differ specifically at c{stage}. Each installs a different next diagonal constraint. Under this uniform finite grammar their successor families can have equal size while containing different rows and producing different canonical witnesses.</p>
                <p><strong>Admission rule.</strong> Admit one certified witness at a time. Admission changes the represented regime, so the old family is discarded and a new family must be certified against S{stage + 1}.</p>
                <p><strong>Bounded implementation.</strong> The fixture stops at stored width {MAX_WIDTH}. This multiplicity and branching behavior are finite combinatorial facts about the declared fixture, not new transfinite claims.</p>
                <label className={styles.faultControl}>
                  <input
                    type="checkbox"
                    checked={faultInjection}
                    onChange={(event) => {
                      setFaultInjection(event.target.checked);
                      clearWitnessSelection();
                      appendTrace(
                        "fault_injection_changed",
                        event.target.checked
                          ? "Calibration fault injection armed: the next selected candidate will be corrupted after construction/selection."
                          : "Calibration fault injection disarmed.",
                        "warning",
                      );
                    }}
                  />
                  <span>Inject one implementation fault on the next witness selection</span>
                </label>
                <p className={styles.faultNote}>Calibration only. This does not alter the declared mathematical certificate; it tests whether the instrument refuses to misclassify a bad implementation as a representation defect.</p>
              </div>
            )}
          </section>
        </RepresentationalLabPanel>
      )}
    />
  );
}
