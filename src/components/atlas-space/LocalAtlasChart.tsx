"use client";

import styles from "./LocalAtlasChart.module.css";
import type { AtlasFiber, AtlasLayer } from "./atlas-space-model";

type LocalAtlasChartProps = {
  layer: AtlasLayer;
  fibers: AtlasFiber[];
  activeFiberId: string;
  onSelectFiber: (fiberId: string) => void;
};

type LocalOperation = {
  label: string;
  note: string;
};

const localOperations: Record<string, LocalOperation> = {
  mathematics: {
    label: "Map / operator",
    note: "Transforms one represented mathematical state into another under a declared domain.",
  },
  physics: {
    label: "Transport / evolution",
    note: "Carries physical state through time, space, or an interface under governing relations.",
  },
  computation: {
    label: "Transition / execution",
    note: "Applies an executable rule to machine state while preserving type and guard constraints.",
  },
  law: {
    label: "Procedure / disposition",
    note: "Moves represented legal status through an authorized procedural transition.",
  },
};

export function LocalAtlasChart({ layer, fibers, activeFiberId, onSelectFiber }: LocalAtlasChartProps) {
  const anchorByFiber = new Map(layer.anchors.map((anchor) => [anchor.fiberId, anchor]));
  const operation = localOperations[layer.id] ?? {
    label: "Local operation",
    note: "A domain-local transition whose admissibility and consequences are represented on this chart.",
  };

  const regions = [
    { fiberId: "bound-distinction", zone: "distinction", code: "D01" },
    { fiberId: "state", zone: "state", code: "S02" },
    { fiberId: null, zone: "operation", code: "T03" },
    { fiberId: "admissibility", zone: "admissibility", code: "A04" },
    { fiberId: "closure", zone: "closure", code: "C05" },
  ] as const;

  return (
    <section className={styles.chart} aria-label={`${layer.label} local atlas chart`}>
      <header className={styles.header}>
        <div>
          <span className={styles.rackCode}>{layer.hardware.rackCode}</span>
          <h3>{layer.label} local chart</h3>
        </div>
        <span className={styles.registry}>{layer.hardware.registry}</span>
      </header>

      <div className={styles.field}>
        <svg className={styles.traces} viewBox="0 0 1000 560" aria-hidden="true">
          <path d="M180 165 H410 V110 H790" />
          <path d="M180 165 H410 V285 H510" />
          <path d="M510 285 H710 V420 H820" />
          <path d="M510 285 H310 V420 H185" />
          <path d="M185 420 H500 V495 H820" />
        </svg>

        {regions.map((region) => {
          const anchor = region.fiberId ? anchorByFiber.get(region.fiberId) : undefined;
          const fiber = region.fiberId ? fibers.find((candidate) => candidate.id === region.fiberId) : undefined;
          const active = Boolean(region.fiberId && region.fiberId === activeFiberId);
          const label = region.zone === "operation" ? operation.label : anchor?.label ?? region.zone;
          const note = region.zone === "operation" ? operation.note : anchor?.note ?? "Local chart region.";

          return (
            <button
              key={region.code}
              type="button"
              className={`${styles.region} ${styles[`region_${region.zone}`]} ${active ? styles.regionActive : ""}`}
              onClick={() => region.fiberId && onSelectFiber(region.fiberId)}
              disabled={!region.fiberId}
            >
              <span className={styles.regionCode}>{region.code}</span>
              <strong>{label}</strong>
              <small>{note}</small>
              <span className={styles.portRow}>
                {fiber ? (
                  <>
                    <i className={styles.port} />
                    <span>{fiber.connectorKind.toUpperCase()} / BACKPLANE</span>
                  </>
                ) : (
                  <>
                    <i className={`${styles.port} ${styles.portLocal}`} />
                    <span>LOCAL / INTERNAL</span>
                  </>
                )}
              </span>
            </button>
          );
        })}

        <div className={styles.chartLegend}>
          <span><i className={styles.legendPort} /> cross-atlas port</span>
          <span><i className={styles.legendTrace} /> local transition</span>
        </div>
      </div>
    </section>
  );
}
