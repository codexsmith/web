"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./LocalAtlasChart.module.css";
import { recursiveAtlasRoots, type RecursiveAtlasChart } from "./local-atlas-recursion";
import type { AtlasFiber, AtlasLayer } from "./atlas-space-model";

type LocalAtlasChartProps = {
  layer: AtlasLayer;
  fibers: AtlasFiber[];
  activeFiberId: string;
  onSelectFiber: (fiberId: string) => void;
};

type ChartFrame = {
  chart: RecursiveAtlasChart;
  viaLabel?: string;
};

export function LocalAtlasChart({ layer, fibers, activeFiberId, onSelectFiber }: LocalAtlasChartProps) {
  const root = recursiveAtlasRoots[layer.id];
  const [stack, setStack] = useState<ChartFrame[]>(() => root ? [{ chart: root }] : []);

  useEffect(() => {
    setStack(root ? [{ chart: root }] : []);
  }, [layer.id, root]);

  const current = stack.at(-1)?.chart;
  const fiberById = useMemo(() => new Map(fibers.map((fiber) => [fiber.id, fiber])), [fibers]);

  if (!current) return null;

  const nodeById = new Map(current.nodes.map((node) => [node.id, node]));

  return (
    <section className={styles.chart} aria-label={`${layer.label} recursive local atlas chart`}>
      <header className={styles.header}>
        <div className={styles.headerIdentity}>
          <span className={styles.rackCode}>{layer.hardware.rackCode}</span>
          <h3>{current.label}</h3>
          <p>{current.note}</p>
        </div>
        <div className={styles.headerMeta}>
          <span className={styles.registry}>{current.registry}</span>
          <span className={styles.depthReadout}>DEPTH {String(stack.length).padStart(2, "0")}</span>
        </div>
      </header>

      <nav className={styles.breadcrumbs} aria-label="Atlas chart path">
        <button type="button" onClick={() => setStack([{ chart: root }])}>{layer.label}</button>
        {stack.map((frame, index) => (
          <span key={`${frame.chart.id}-${index}`}>
            <i aria-hidden="true">/</i>
            <button type="button" onClick={() => setStack((existing) => existing.slice(0, index + 1))}>
              {frame.viaLabel ?? frame.chart.label}
            </button>
          </span>
        ))}
      </nav>

      <div className={styles.field}>
        <svg className={styles.traces} viewBox="0 0 1000 560" aria-hidden="true">
          {current.edges.map((edge) => {
            const from = nodeById.get(edge.from);
            const to = nodeById.get(edge.to);
            if (!from || !to) return null;
            return (
              <line
                key={`${edge.from}-${edge.to}`}
                x1={from.x * 10}
                y1={from.y * 5.6}
                x2={to.x * 10}
                y2={to.y * 5.6}
              />
            );
          })}
        </svg>

        {current.nodes.map((node) => {
          const fiber = node.fiberId ? fiberById.get(node.fiberId) : undefined;
          const active = Boolean(node.fiberId && node.fiberId === activeFiberId);
          const drillable = Boolean(node.child);

          return (
            <button
              key={node.id}
              type="button"
              className={`${styles.region} ${active ? styles.regionActive : ""} ${drillable ? styles.regionDrillable : ""}`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onClick={() => {
                if (node.fiberId) onSelectFiber(node.fiberId);
                if (node.child) setStack((existing) => [...existing, { chart: node.child!, viaLabel: node.label }]);
              }}
            >
              <span className={styles.regionCode}>{node.code}</span>
              <strong>{node.label}</strong>
              <small>{node.note}</small>
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
              {drillable ? <span className={styles.drillCue}>OPEN SUBCHART →</span> : null}
            </button>
          );
        })}

        <div className={styles.chartLegend}>
          <span><i className={styles.legendPort} /> cross-atlas port</span>
          <span><i className={styles.legendTrace} /> local transition</span>
          <span><i className={styles.legendDrill} /> recursive subchart</span>
        </div>
      </div>

      <footer className={styles.chartFooter}>
        <span>PATH: {layer.hardware.rackCode} / {stack.map((frame) => frame.viaLabel ?? frame.chart.label).join(" / ")}</span>
        {stack.length > 1 ? (
          <button type="button" onClick={() => setStack((existing) => existing.slice(0, -1))}>← UP ONE LEVEL</button>
        ) : (
          <span>ROOT LOCAL CHART</span>
        )}
      </footer>
    </section>
  );
}
