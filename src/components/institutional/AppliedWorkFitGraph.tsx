"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Core } from "cytoscape";
import { appliedWorkAudiences, appliedWorkGoodFit } from "./content/appliedWork";
import styles from "./styles/AppliedWork.module.css";

type AppliedAudienceId = (typeof appliedWorkAudiences)[number]["id"];
type RelationTone = (typeof appliedWorkAudiences)[number]["tone"];

const PROBLEM_ROWS = [
  [1, 3, 0, 2],
  [5, 4, 6],
] as const;

const PROBLEM_ORDER = PROBLEM_ROWS.flat();

const GRAPH_WIDTH = 1200;
const PROBLEM_ROW_Y = [48, 132] as const;
const AUDIENCE_Y = 294;

const TONE = {
  blue: { accent: "#2d6fc4", wash: "#eef4fb" },
  gold: { accent: "#a98518", wash: "#f8f3df" },
  green: { accent: "#3b7f5d", wash: "#edf6f1" },
  orange: { accent: "#bd6727", wash: "#fff1e7" },
  teal: { accent: "#4f8e97", wash: "#edf6f7" },
  indigo: { accent: "#5b63ad", wash: "#f0f0fa" },
} as const;

const PROBLEM_ICONS = [
  '<circle cx="11.5" cy="12" r="3.2"/><circle cx="28.5" cy="10" r="3.2"/><circle cx="21" cy="28.5" r="3.2"/><path d="M14.6 11.7 25.3 10.4M13.5 14.7 19.1 25.7M26.9 13 22.6 25.5"/>',
  '<rect x="7.5" y="9" width="17" height="13"/><path d="M12 15.5h8M16 22v6M12 28h8M27 13h5v-3l5 5-5 5v-3h-5"/>',
  '<path d="M20 6.5 31 11v8.2c0 6.6-4.2 11-11 14-6.8-3-11-7.4-11-14V11z"/><path d="M14.5 19h11M20 13.5v11"/>',
  '<rect x="7" y="7" width="26" height="26"/><path d="M7 15.5h26M15.5 7v26M24.5 7v26M7 24.5h26"/>',
  '<rect x="6.5" y="9" width="10" height="10"/><rect x="23.5" y="21" width="10" height="10"/><path d="M16.5 14h9M25.5 14l-3-3M25.5 14l-3 3M23.5 26H15M15 26l3-3M15 26l3 3"/>',
  '<path d="M15 6.5h10M17 6.5v9.5L8.5 30.5A2 2 0 0 0 10.2 33.5h19.6a2 2 0 0 0 1.7-3L23 16V6.5"/><path d="M12.5 26h15"/>',
  '<circle cx="12" cy="13" r="5"/><circle cx="29" cy="27" r="5"/><path d="M16 16.5 25 23M10 18v10h10M30.5 22V12h-10"/>',
] as const;

const AUDIENCE_ICONS: Record<AppliedAudienceId, string> = {
  founders:
    '<circle cx="14" cy="13" r="3.2"/><circle cx="25.5" cy="14.5" r="2.7"/><path d="M7.5 30c.6-6 2.9-9 6.8-9 4 0 6.4 3 7 9M21 22.5c1.1-1.2 2.6-1.8 4.4-1.8 3.2 0 5.1 2.4 5.6 7.2"/>',
  research:
    '<path d="M14.5 6.5h11M17 6.5v9.4l-8.4 14.5a2.1 2.1 0 0 0 1.8 3.1h19.2a2.1 2.1 0 0 0 1.8-3.1L23 15.9V6.5"/><path d="M12.8 26h14.4"/>',
  engineering:
    '<path d="m13 10-7 10 7 10M27 10l7 10-7 10M23 7 17 33"/>',
  institutions:
    '<rect x="16" y="5.5" width="8" height="6"/><rect x="5" y="28.5" width="8" height="6"/><rect x="16" y="28.5" width="8" height="6"/><rect x="27" y="28.5" width="8" height="6"/><path d="M20 11.5v8M9 28.5v-8h22v8M20 19.5v9"/>',
  "public-interest":
    '<path d="m5 15 15-7 15 7M8 17h24M10.5 17v13M17 17v13M23 17v13M29.5 17v13M6 33h28"/>',
  ai:
    '<rect x="7" y="11" width="26" height="20" rx="3"/><path d="M20 5v6M15.5 5h9M13 20h.01M27 20h.01M14.5 26h11M7 18H4M36 18h-3"/>',
};

function distributedX(count: number, index: number, sidePadding: number) {
  if (count <= 1) return GRAPH_WIDTH / 2;
  return sidePadding + ((GRAPH_WIDTH - sidePadding * 2) * index) / (count - 1);
}

function problemNodeId(problemIndex: number) {
  return "problem-" + problemIndex;
}

function audienceNodeId(audienceId: AppliedAudienceId) {
  return "audience-" + audienceId;
}

function orderAudiences(audienceIds: readonly AppliedAudienceId[]) {
  return [...audienceIds].sort(
    (left, right) =>
      appliedWorkAudiences.findIndex((audience) => audience.id === left) -
      appliedWorkAudiences.findIndex((audience) => audience.id === right),
  );
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.max(minimum, Math.min(maximum, value));
}

function iconDataUri(body: string, tone: RelationTone) {
  const palette = TONE[tone];
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">' +
    '<g fill="none" stroke="' +
    palette.accent +
    '" stroke-opacity=".82" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">' +
    body +
    "</g></svg>";

  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

function buildGraphElements() {
  const elements: Array<{
    data: Record<string, string | number>;
    position?: { x: number; y: number };
    classes?: string;
  }> = [];

  const problemPositions = new Map<number, { x: number; y: number }>();

  PROBLEM_ROWS.forEach((row, rowIndex) => {
    const sidePadding = row.length === 4 ? 150 : 285;

    row.forEach((problemIndex, columnIndex) => {
      const signal = appliedWorkGoodFit[problemIndex];
      const position = {
        x: distributedX(row.length, columnIndex, sidePadding),
        y: PROBLEM_ROW_Y[rowIndex],
      };

      problemPositions.set(problemIndex, position);

      elements.push({
        data: {
          id: problemNodeId(problemIndex),
          label: signal.copy,
          tone: signal.tone,
          kind: "problem",
          icon: iconDataUri(PROBLEM_ICONS[problemIndex], signal.tone),
        },
        position,
        classes: "problem",
      });
    });
  });

  const audiencePositions = new Map<AppliedAudienceId, { x: number; y: number }>();
  const audienceSources = new Map<AppliedAudienceId, number[]>();

  appliedWorkGoodFit.forEach((signal, problemIndex) => {
    signal.audiences.forEach((audienceId) => {
      const sources = audienceSources.get(audienceId) ?? [];
      sources.push(problemIndex);
      audienceSources.set(audienceId, sources);
    });
  });

  appliedWorkAudiences.forEach((audience, audienceIndex) => {
    const position = {
      x: distributedX(appliedWorkAudiences.length, audienceIndex, 100),
      y: AUDIENCE_Y,
    };

    audiencePositions.set(audience.id, position);

    elements.push({
      data: {
        id: audienceNodeId(audience.id),
        label: audience.label,
        tone: audience.tone,
        kind: "audience",
        icon: iconDataUri(AUDIENCE_ICONS[audience.id], audience.tone),
      },
      position,
      classes: "audience",
    });
  });

  PROBLEM_ORDER.forEach((problemIndex) => {
    const signal = appliedWorkGoodFit[problemIndex];
    const source = problemPositions.get(problemIndex);
    const rowIndex = PROBLEM_ROWS.findIndex((row) =>
      row.includes(problemIndex as never),
    );

    if (!source) return;

    const orderedTargets = orderAudiences(signal.audiences);

    orderedTargets.forEach((audienceId, relationIndex) => {
      const audience = appliedWorkAudiences.find(
        (candidate) => candidate.id === audienceId,
      );
      const target = audiencePositions.get(audienceId);
      const inboundSources = [...(audienceSources.get(audienceId) ?? [])].sort(
        (left, right) =>
          (problemPositions.get(left)?.x ?? 0) -
          (problemPositions.get(right)?.x ?? 0),
      );
      const inboundIndex = inboundSources.indexOf(problemIndex);

      if (!audience || !target) return;

      const sourcePort =
        -20 + ((relationIndex + 1) * 40) / (orderedTargets.length + 1);
      const targetPort =
        -20 + ((inboundIndex + 1) * 40) / (inboundSources.length + 1);

      elements.push({
        data: {
          id: "relation-" + problemIndex + "-" + audienceId,
          source: problemNodeId(problemIndex),
          target: audienceNodeId(audienceId),
          tone: audience.tone,
          kind: "relation",
          bend: clamp((target.x - source.x) * 0.11, -92, 92),
          weight: rowIndex === 0 ? 0.57 : 0.48,
          sourcePort: sourcePort.toFixed(1) + "% 50%",
          targetPort: targetPort.toFixed(1) + "% -50%",
        },
        classes: "relation",
      });
    });
  });

  return elements;
}

function AppliedWorkFitFallback() {
  return (
    <>
      {PROBLEM_ORDER.map((problemIndex) => {
        const signal = appliedWorkGoodFit[problemIndex];
        const audienceIds = orderAudiences(signal.audiences);

        return (
          <article
            className={styles.appliedFitProblem}
            data-tone={signal.tone}
            key={signal.copy}
          >
            <span
              className={styles.appliedFitCardIcon}
              aria-hidden="true"
              style={{
                backgroundImage:
                  "url(" +
                  iconDataUri(PROBLEM_ICONS[problemIndex], signal.tone) +
                  ")",
              }}
            />
            <p>{signal.copy}</p>

            <div className={styles.appliedFitRelationLabels}>
              {audienceIds.map((audienceId) => {
                const audience = appliedWorkAudiences.find(
                  (candidate) => candidate.id === audienceId,
                );

                return audience ? (
                  <span data-tone={audience.tone} key={audience.id}>
                    {audience.label}
                  </span>
                ) : null;
              })}
            </div>
          </article>
        );
      })}

      <div className={styles.appliedAudienceNodes}>
        {appliedWorkAudiences.map((audience) => (
          <article
            className={styles.appliedAudienceNode}
            data-tone={audience.tone}
            key={audience.id}
          >
            <span
              className={styles.appliedFitCardIcon}
              aria-hidden="true"
              style={{
                backgroundImage:
                  "url(" +
                  iconDataUri(AUDIENCE_ICONS[audience.id], audience.tone) +
                  ")",
              }}
            />
            <strong>{audience.label}</strong>
          </article>
        ))}
      </div>
    </>
  );
}

export function AppliedWorkFitGraph() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const elements = useMemo(buildGraphElements, []);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let active = true;
    let graph: Core | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let frame = 0;

    function fitProjection() {
      if (!graph) return;
      graph.resize();
      graph.fit(graph.elements(), 14);
    }

    async function mountGraph() {
      try {
        const cytoscape = (await import("cytoscape")).default;

        if (!active) return;

        graph = cytoscape({
          container,
          elements,
          layout: {
            name: "preset",
            fit: false,
          },
          boxSelectionEnabled: false,
          autoungrabify: true,
          autounselectify: true,
          userPanningEnabled: false,
          userZoomingEnabled: false,
          style: [
            {
              selector: "node.problem",
              style: {
                width: 270,
                height: 72,
                shape: "rectangle",
                "background-color": "#fbfcfe",
                "background-image": "data(icon)",
                "background-fit": "none",
                "background-width": 54,
                "background-height": 54,
                "background-position-x": "11%",
                "background-position-y": "50%",
                "background-repeat": "no-repeat",
                "border-width": 1.05,
                "border-color": "#aebdce",
                label: "data(label)",
                color: "#071a3d",
                "font-family": 'Georgia, "Times New Roman", serif',
                "font-size": 13.25,
                "font-weight": 500,
                "text-wrap": "wrap",
                "text-max-width": 172,
                "text-valign": "center",
                "text-halign": "center",
                "text-justification": "center",
                "text-margin-x": 44,
                "line-height": 1.17,
                "background-image-opacity": 0.7,
                "shadow-blur": 7,
                "shadow-opacity": 0.08,
                "shadow-offset-x": 0,
                "shadow-offset-y": 2,
                "shadow-color": "#071a3d",
                "z-index": 10,
              },
            },
            {
              selector: 'node.problem[tone = "gold"]',
              style: { "border-color": "#c7b36c" },
            },
            {
              selector: 'node.problem[tone = "green"]',
              style: { "border-color": "#8fb7a0" },
            },
            {
              selector: 'node.problem[tone = "blue"]',
              style: { "border-color": "#9eb5d6" },
            },
            {
              selector: "node.audience",
              style: {
                width: 178,
                height: 58,
                shape: "rectangle",
                "background-color": "#ffffff",
                "background-image": "data(icon)",
                "background-fit": "none",
                "background-width": 38,
                "background-height": 38,
                "background-position-x": "12%",
                "background-position-y": "50%",
                "background-repeat": "no-repeat",
                "border-width": 1,
                "border-color": "#aebdce",
                label: "data(label)",
                color: "#071a3d",
                "font-family": 'Georgia, "Times New Roman", serif',
                "font-size": 11.6,
                "font-weight": 600,
                "text-wrap": "wrap",
                "text-max-width": 110,
                "text-valign": "center",
                "text-halign": "center",
                "text-justification": "center",
                "text-margin-x": 23,
                "line-height": 1.14,
                "background-image-opacity": 0.76,
                "shadow-blur": 6,
                "shadow-opacity": 0.07,
                "shadow-offset-x": 0,
                "shadow-offset-y": 2,
                "shadow-color": "#071a3d",
                "z-index": 10,
              },
            },
            {
              selector: 'node.audience[tone = "gold"]',
              style: {
                "background-color": "#fbf8eb",
                "border-color": "#c7b36c",
              },
            },
            {
              selector: 'node.audience[tone = "green"]',
              style: {
                "background-color": "#f3f9f5",
                "border-color": "#8fb7a0",
              },
            },
            {
              selector: 'node.audience[tone = "orange"]',
              style: {
                "background-color": "#fff6ef",
                "border-color": "#d7a277",
              },
            },
            {
              selector: 'node.audience[tone = "teal"]',
              style: {
                "background-color": "#f2f8f9",
                "border-color": "#9bbfc4",
              },
            },
            {
              selector: 'node.audience[tone = "indigo"]',
              style: {
                "background-color": "#f5f4fb",
                "border-color": "#a9add4",
              },
            },
            {
              selector: 'node.audience[tone = "blue"]',
              style: {
                "background-color": "#f3f7fc",
                "border-color": "#9eb5d6",
              },
            },
            {
              selector: "edge.relation",
              style: {
                width: 1.18,
                opacity: 0.44,
                "curve-style": "unbundled-bezier",
                "control-point-distances": "data(bend)",
                "control-point-weights": "data(weight)",
                "edge-distances": "endpoints",
                "source-endpoint": "data(sourcePort)",
                "target-endpoint": "data(targetPort)",
                "source-distance-from-node": 0,
                "target-distance-from-node": 0,
                "line-color": TONE.blue.accent,
                "source-arrow-color": TONE.blue.accent,
                "target-arrow-color": TONE.blue.accent,
                "source-arrow-shape": "circle",
                "target-arrow-shape": "circle",
                "arrow-scale": 0.42,
                "line-cap": "round",
                "z-index": 1,
              },
            },
            {
              selector: 'edge.relation[tone = "gold"]',
              style: {
                "line-color": TONE.gold.accent,
                "source-arrow-color": TONE.gold.accent,
                "target-arrow-color": TONE.gold.accent,
              },
            },
            {
              selector: 'edge.relation[tone = "green"]',
              style: {
                "line-color": TONE.green.accent,
                "source-arrow-color": TONE.green.accent,
                "target-arrow-color": TONE.green.accent,
              },
            },
            {
              selector: 'edge.relation[tone = "orange"]',
              style: {
                "line-color": TONE.orange.accent,
                "source-arrow-color": TONE.orange.accent,
                "target-arrow-color": TONE.orange.accent,
              },
            },
            {
              selector: 'edge.relation[tone = "teal"]',
              style: {
                "line-color": TONE.teal.accent,
                "source-arrow-color": TONE.teal.accent,
                "target-arrow-color": TONE.teal.accent,
              },
            },
            {
              selector: 'edge.relation[tone = "indigo"]',
              style: {
                "line-color": TONE.indigo.accent,
                "source-arrow-color": TONE.indigo.accent,
                "target-arrow-color": TONE.indigo.accent,
              },
            },
          ],
        });

        if (!active || !graph) return;

        frame = requestAnimationFrame(() => {
          fitProjection();
          setReady(true);
        });

        resizeObserver = new ResizeObserver(() => {
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(fitProjection);
        });
        resizeObserver.observe(container);
      } catch {
        if (!active) return;
        setFailed(true);
      }
    }

    void mountGraph();

    return () => {
      active = false;
      cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      graph?.destroy();
    };
  }, [elements]);

  return (
    <div
      className={styles.appliedFitProjection}
      aria-label="Common problem patterns mapped to likely consulting audiences"
    >
      {!failed ? (
        <div className={styles.appliedFitGraphShell}>
          <div
            className={styles.appliedFitGraphCanvas}
            ref={containerRef}
            role="img"
            aria-label="Seven common problem patterns connected to six audience groups"
          />

          {!ready ? (
            <div className={styles.appliedFitGraphLoading}>
              Building relationship projection…
            </div>
          ) : null}
        </div>
      ) : null}

      <div
        className={
          failed
            ? styles.appliedFitMobileFallback + " " + styles.appliedFitFallbackVisible
            : styles.appliedFitMobileFallback
        }
      >
        <AppliedWorkFitFallback />
      </div>
    </div>
  );
}
