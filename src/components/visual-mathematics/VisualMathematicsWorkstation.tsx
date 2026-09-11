"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BoundaryAttractorSpecimen } from "./BoundaryAttractorSpecimen";
import { HopfSpecimen } from "./HopfSpecimen";
import { getVisualMathSpecimen, visualMathSpecimenOrder } from "./specimen-definitions";
import type { VisualMathCommand, VisualMathSpecimenId } from "./specimen-types";
import styles from "./visual-mathematics-workstation.module.css";

const commandCopy: Record<VisualMathCommand, { label: string; detail: string }> = {
  operate: { label: "OPERATE", detail: "manipulate" },
  record: { label: "RECORD", detail: "preserve" },
  explain: { label: "EXPLAIN", detail: "inspect construction" },
};

export function VisualMathematicsWorkstation({
  initialSpecimen = "boundary-attractor",
  onClose,
}: {
  initialSpecimen?: VisualMathSpecimenId;
  onClose?: () => void;
}) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<VisualMathSpecimenId>(initialSpecimen);
  const [command, setCommand] = useState<VisualMathCommand>("operate");
  const definition = getVisualMathSpecimen(selectedId);

  const selectSpecimen = (id: VisualMathSpecimenId) => {
    setSelectedId(id);
    setCommand("operate");
    const url = new URL(window.location.href);
    url.searchParams.set("specimen", id);
    router.replace(`${url.pathname}?${url.searchParams.toString()}`, { scroll: false });
  };

  return (
    <main className={styles.room} aria-label="Boundary First Visual Mathematics workstation">
      <header className={styles.programContext}>
        <div>
          <small>BOUNDARY FIRST VISUAL MATHEMATICS</small>
          <h1>Mathematics you can operate.</h1>
          <p>Known structures and experimental systems, represented as executable mathematical objects.</p>
        </div>
        <button type="button" className={styles.returnButton} onClick={onClose ?? (() => router.push("/"))}>RETURN TO LAB</button>
      </header>

      <section className={styles.instrument} aria-label={`${definition.label} mathematical specimen workstation`}>
        <header className={styles.instrumentHeader}>
          <div className={styles.instrumentIdentity}>
            <small>WORKSTATION · ACTIVE SPECIMEN</small>
            <h2>{definition.label}</h2>
            <p>{definition.question}</p>
          </div>
          <div className={styles.statusBus}>
            <span data-status={definition.status}><small>CLAIM</small>{definition.statusLabel}</span>
            <span><small>SPECIMEN</small>{definition.version}</span>
            <span><small>MODE</small>{command.toUpperCase()}</span>
          </div>
        </header>

        <div className={styles.specimenRack} role="list" aria-label="Mathematical specimen rack">
          <span className={styles.specimenRackLabel}>SPECIMEN RACK</span>
          {visualMathSpecimenOrder.map((id) => {
            const specimen = getVisualMathSpecimen(id);
            return (
              <button
                type="button"
                role="listitem"
                key={id}
                className={styles.specimenButton}
                data-active={selectedId === id ? "true" : "false"}
                aria-pressed={selectedId === id}
                onClick={() => selectSpecimen(id)}
              >
                <strong>{specimen.shortLabel}</strong>
                <small>{specimen.statusLabel}</small>
              </button>
            );
          })}
        </div>

        <nav className={styles.commandBar} aria-label="Workstation commands">
          {(Object.keys(commandCopy) as VisualMathCommand[]).map((name) => (
            <button
              type="button"
              key={name}
              className={styles.commandButton}
              data-active={command === name ? "true" : "false"}
              aria-pressed={command === name}
              onClick={() => setCommand(name)}
            >
              <strong>{commandCopy[name].label}</strong>
              <small>{commandCopy[name].detail}</small>
            </button>
          ))}
          <span className={styles.commandMeta}><small>IMPLEMENTATION</small><strong>{definition.implementation}</strong></span>
        </nav>

        <div className={styles.claimBoundary}>
          <strong>{definition.statusLabel}</strong>
          <span>{definition.claimBoundary}</span>
        </div>

        <div className={styles.specimenRuntime} hidden={selectedId !== "hopf"}>
          <HopfSpecimen active={selectedId === "hopf"} command={command} />
        </div>
        <div className={styles.specimenRuntime} hidden={selectedId !== "boundary-attractor"}>
          <BoundaryAttractorSpecimen active={selectedId === "boundary-attractor"} command={command} />
        </div>

        <footer className={styles.footer}>
          <strong>OPERATE · RECORD · EXPLAIN</strong>
          <span>COMPARE remains deferred until the specimen abstraction survives multiple canonical implementations.</span>
        </footer>
      </section>
    </main>
  );
}
