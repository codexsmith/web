"use client";

import { useMemo, useState } from "react";
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
const INITIAL_ROWS = [
  "01011010",
  "11000101",
  "00110110",
  "10101001",
];

type LabStatus = "ready" | "defect" | "extended" | "bounded";

function invert(bit: string) {
  return bit === "0" ? "1" : "0";
}

export function CantorClosureLab() {
  const definition = CANTOR_CLOSURE_LAB;
  const [rows, setRows] = useState<string[]>(INITIAL_ROWS);
  const [stage, setStage] = useState(INITIAL_ROWS.length);
  const [witness, setWitness] = useState<string | null>(null);
  const [status, setStatus] = useState<LabStatus>("ready");
  const [hoodOpen, setHoodOpen] = useState(false);
  const [trace, setTrace] = useState<RepresentationalLabTraceEvent[]>([
    {
      seq: 1,
      label: "fixture_loaded",
      detail: "S4 contains four admitted 8-bit rows; four coordinates are currently visible.",
      tone: "info",
    },
  ]);

  const activeRows = rows.slice(0, stage);
  const visibleColumns = Array.from({ length: stage }, (_, index) => index);

  const invariantChecks = useMemo(() => {
    if (!witness) return [];
    return activeRows.map((row, index) => ({
      row: index,
      coordinate: index,
      rowBit: row[index],
      witnessBit: witness[index],
      passes: row[index] !== witness[index],
    }));
  }, [activeRows, witness]);

  const passedChecks = invariantChecks.filter((check) => check.passes).length;

  function appendTrace(
    label: string,
    detail: string,
    tone: RepresentationalLabTone,
  ) {
    setTrace((current) => [
      ...current,
      { seq: current.length + 1, label, detail, tone },
    ].slice(-9));
  }

  function toggleBit(rowIndex: number, columnIndex: number) {
    setRows((current) => current.map((row, index) => {
      if (index !== rowIndex) return row;
      const nextBit = invert(row[columnIndex]);
      return `${row.slice(0, columnIndex)}${nextBit}${row.slice(columnIndex + 1)}`;
    }));
    setWitness(null);
    setStatus("ready");
    appendTrace(
      "representation_changed",
      `Toggled r${rowIndex} at c${columnIndex}. Any previous witness was invalidated.`,
      "change",
    );
  }

  function constructWitness() {
    const diagonal = activeRows.map((row, index) => row[index]);
    const visibleWitness = diagonal.map(invert).join("");
    const nextWitness = `${visibleWitness}${"0".repeat(MAX_WIDTH - stage)}`;

    setWitness(nextWitness);
    setStatus("defect");
    appendTrace(
      "witness_constructed",
      `Diagonal complement ${visibleWitness} differs from every admitted row at that row's diagonal coordinate.`,
      "defect",
    );
  }

  function admitWitness() {
    if (!witness) return;

    if (stage >= MAX_WIDTH) {
      setStatus("bounded");
      appendTrace(
        "fixture_boundary_reached",
        "The eight-coordinate calibration fixture cannot promote again without increasing its declared width.",
        "warning",
      );
      return;
    }

    const nextStage = stage + 1;
    setRows((current) => [...current, witness]);
    setStage(nextStage);
    setWitness(null);
    setStatus("extended");
    appendTrace(
      "representation_extended",
      `Admitted the witness as r${stage}; S${stage} became S${nextStage} and one additional coordinate became visible.`,
      "repair",
    );
  }

  function resetFixture() {
    setRows(INITIAL_ROWS);
    setStage(INITIAL_ROWS.length);
    setWitness(null);
    setStatus("ready");
    setTrace([
      {
        seq: 1,
        label: "fixture_loaded",
        detail: "S4 contains four admitted 8-bit rows; four coordinates are currently visible.",
        tone: "info",
      },
    ]);
  }

  const statusCopy: Record<
    LabStatus,
    { label: string; detail: string; tone: RepresentationalLabTone }
  > = {
    ready: {
      label: "READY",
      detail: "Change the represented rows or construct the diagonal witness.",
      tone: "info",
    },
    defect: {
      label: "DEFECT EXPOSED",
      detail: "The constructed witness is outside the currently admitted row set.",
      tone: "defect",
    },
    extended: {
      label: "REPRESENTATION EXTENDED",
      detail: "The prior witness is now admitted. Re-run the operation against the larger stage.",
      tone: "repair",
    },
    bounded: {
      label: "FIXTURE BOUNDARY",
      detail: "This finite calibration object has reached its declared eight-coordinate limit.",
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
              <h2>Change a row. Then construct what is missing.</h2>
            </div>
            <RepresentationalLabStatus
              label={currentStatus.label}
              detail={currentStatus.detail}
              tone={currentStatus.tone}
            />
          </div>

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
                        onClick={() => toggleBit(rowIndex, columnIndex)}
                        aria-label={`Row ${rowIndex}, coordinate ${columnIndex}, value ${row[columnIndex]}. Toggle bit.`}
                      >
                        {row[columnIndex]}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className={styles.witnessRail} data-visible={witness ? "true" : "false"}>
              <span className={styles.rowLabel}>w</span>
              {visibleColumns.map((columnIndex) => (
                <span className={styles.witnessBit} key={columnIndex}>
                  {witness ? witness[columnIndex] : "·"}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.primaryAction} onClick={constructWitness}>
              CONSTRUCT THE MISSING ROW
            </button>
            <button type="button" className={styles.secondaryAction} onClick={admitWitness} disabled={!witness}>
              ADMIT WITNESS → NEXT STAGE
            </button>
            <button type="button" className={styles.ghostAction} onClick={resetFixture}>
              RESET
            </button>
          </div>

          <div className={styles.mechanism} aria-live="polite">
            <div>
              <span>DIAGONAL</span>
              <strong>{activeRows.map((row, index) => row[index]).join(" ")}</strong>
            </div>
            <div className={styles.arrow} aria-hidden="true">→</div>
            <div>
              <span>COMPLEMENT</span>
              <strong>{witness ? witness.slice(0, stage).split("").join(" ") : "—"}</strong>
            </div>
            <div className={styles.arrow} aria-hidden="true">→</div>
            <div>
              <span>INVARIANT CHECK</span>
              <strong>{witness ? `${passedChecks}/${stage} differ` : "not run"}</strong>
            </div>
          </div>
        </RepresentationalLabPanel>
      )}
      secondary={(
        <RepresentationalLabPanel
          as="aside"
          ariaLabel="Representation inspector"
          className={styles.inspector}
        >
          <section>
            <RepresentationalLabSectionLabel>CURRENT REPRESENTATION</RepresentationalLabSectionLabel>
            <dl className={styles.definitionList}>
              <div><dt>Alphabet</dt><dd>{"{0, 1}"}</dd></div>
              <div><dt>Stored width</dt><dd>{MAX_WIDTH} bits</dd></div>
              <div><dt>Admitted rows</dt><dd>{stage}</dd></div>
              <div><dt>Visible coordinates</dt><dd>{stage}</dd></div>
              <div><dt>Operation</dt><dd>diagonal complement</dd></div>
            </dl>
          </section>

          <section>
            <RepresentationalLabSectionLabel>CONSEQUENCE TRACE</RepresentationalLabSectionLabel>
            <RepresentationalLabTrace events={trace} />
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
                <p><strong>Construction.</strong> For active row i, set wᵢ = 1 − rᵢᵢ.</p>
                <p><strong>Certificate.</strong> w differs from rᵢ at coordinate i, so w cannot equal any admitted active row.</p>
                <p><strong>Promotion rule.</strong> Admitting w extends this finite fixture by one row and reveals one additional stored coordinate.</p>
                <p><strong>Bounded implementation.</strong> Newly constructed rows use 0 for not-yet-visible trailing coordinates. The fixture stops at width 8.</p>
              </div>
            )}
          </section>
        </RepresentationalLabPanel>
      )}
    />
  );
}
