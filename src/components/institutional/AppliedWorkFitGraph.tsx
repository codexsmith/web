"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Core } from "cytoscape";
import { appliedWorkAudiences, appliedWorkGoodFit } from "./content/appliedWork";
import styles from "./styles/AppliedWork.module.css";

type AppliedAudienceId = (typeof appliedWorkAudiences)[number]["id"];

const PROBLEM_ROWS = [
  [1, 3, 0, 2],
  [5, 4, 6],
] as const;

const PROBLEM_ORDER = PROBLEM_ROWS.flat();

const GRAPH_WIDTH = 1200;
const PROBLEM_ROW_Y = [78, 228] as const;
const AUDIENCE_Y = 492;

const RELATION_COLORS = {
  blue: "#2d6fc4",
  gold: "#b28b28",
  green: "#3b7f5d",
  orange: "#c46b2b",
  teal: "#4f8e97",
  indigo: "#5b63ad",
} as const;

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

function buildGraphElements() {
  const elements: Array<{
    data: Record<string, string>;
    position?: { x: number; y: number };
    classes?: string;
  }> = [];

  PROBLEM_ROWS.forEach((row, rowIndex) => {
    const sidePadding = row.length === 4 ? 150 : 280;

    row.forEach((problemIndex, columnIndex) => {
      const signal = appliedWorkGoodFit[problemIndex];

      elements.push({
        data: {
          id: problemNodeId(problemIndex),
          label:
            String(problemIndex + 1).padStart(2, "0") +
            "\n" +
            signal.copy,
          tone: signal.tone,
          kind: "problem",
        },
        position: {
          x: distributedX(row.length, columnIndex, sidePadding),
          y: PROBLEM_ROW_Y[rowIndex],
        },
        classes: "problem",
      });
    });
  });

  appliedWorkAudiences.forEach((audience, audienceIndex) => {
    elements.push({
      data: {
        id: audienceNodeId(audience.id),
        label: audience.label,
        tone: audience.tone,
        kind: "audience",
      },
      position: {
        x: distributedX(appliedWorkAudiences.length, audienceIndex, 100),
        y: AUDIENCE_Y,
      },
      classes: "audience",
    });
  });

  PROBLEM_ORDER.forEach((problemIndex) => {
    const signal = appliedWorkGoodFit[problemIndex];

    orderAudiences(signal.audiences).forEach((audienceId) => {
      const audience = appliedWorkAudiences.find(
        (candidate) => candidate.id === audienceId,
      );

      if (!audience) return;

      elements.push({
        data: {
          id: "relation-" + problemIndex + "-" + audienceId,
          source: problemNodeId(problemIndex),
          target: audienceNodeId(audienceId),
          tone: audience.tone,
          kind: "relation",
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
            <span className={styles.appliedFitNumber}>
              {String(problemIndex + 1).padStart(2, "0")}
            </span>
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
        {appliedWorkAudiences.map((audience, index) => (
          <article
            className={styles.appliedAudienceNode}
            data-tone={audience.tone}
            key={audience.id}
          >
            <span className={styles.appliedAudienceCode}>
              A{String(index + 1).padStart(2, "0")}
            </span>
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
      graph.fit(graph.elements(), 18);
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
                width: 264,
                height: 112,
                shape: "round-rectangle",
                "background-color": "#ffffff",
                "border-width": 3,
                "border-color": RELATION_COLORS.blue,
                label: "data(label)",
                color: "#071a3d",
                "font-family": 'Georgia, "Times New Roman", serif',
                "font-size": 15,
                "font-weight": 500,
                "text-wrap": "wrap",
                "text-max-width": 224,
                "text-valign": "center",
                "text-halign": "center",
                "text-justification": "center",
                "line-height": 1.22,
                "z-index": 10,
              },
            },
            {
              selector: 'node.problem[tone = "gold"]',
              style: { "border-color": RELATION_COLORS.gold },
            },
            {
              selector: 'node.problem[tone = "green"]',
              style: { "border-color": RELATION_COLORS.green },
            },
            {
              selector: "node.audience",
              style: {
                width: 170,
                height: 78,
                shape: "round-rectangle",
                "background-color": "#ffffff",
                "border-width": 2,
                "border-color": RELATION_COLORS.blue,
                label: "data(label)",
                color: "#071a3d",
                "font-family": 'Georgia, "Times New Roman", serif',
                "font-size": 12.5,
                "font-weight": 600,
                "text-wrap": "wrap",
                "text-max-width": 142,
                "text-valign": "center",
                "text-halign": "center",
                "text-justification": "center",
                "line-height": 1.18,
                "z-index": 10,
              },
            },
            {
              selector: 'node.audience[tone = "gold"]',
              style: {
                "background-color": "#fbf5dc",
                "border-color": RELATION_COLORS.gold,
              },
            },
            {
              selector: 'node.audience[tone = "green"]',
              style: {
                "background-color": "#eef8f2",
                "border-color": RELATION_COLORS.green,
              },
            },
            {
              selector: 'node.audience[tone = "orange"]',
              style: {
                "background-color": "#fff3e9",
                "border-color": RELATION_COLORS.orange,
              },
            },
            {
              selector: 'node.audience[tone = "teal"]',
              style: {
                "background-color": "#edf7f8",
                "border-color": RELATION_COLORS.teal,
              },
            },
            {
              selector: 'node.audience[tone = "indigo"]',
              style: {
                "background-color": "#f1f1fb",
                "border-color": RELATION_COLORS.indigo,
              },
            },
            {
              selector: "edge.relation",
              style: {
                width: 1.55,
                opacity: 0.7,
                "curve-style": "taxi",
                "taxi-direction": "downward",
                "taxi-turn": "70%",
                "taxi-turn-min-distance": 14,
                "line-color": RELATION_COLORS.blue,
                "target-arrow-shape": "none",
                "source-arrow-shape": "none",
                "z-index": 1,
              },
            },
            {
              selector: 'edge.relation[tone = "gold"]',
              style: { "line-color": RELATION_COLORS.gold },
            },
            {
              selector: 'edge.relation[tone = "green"]',
              style: { "line-color": RELATION_COLORS.green },
            },
            {
              selector: 'edge.relation[tone = "orange"]',
              style: { "line-color": RELATION_COLORS.orange },
            },
            {
              selector: 'edge.relation[tone = "teal"]',
              style: { "line-color": RELATION_COLORS.teal },
            },
            {
              selector: 'edge.relation[tone = "indigo"]',
              style: { "line-color": RELATION_COLORS.indigo },
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
          <div className={styles.appliedFitGraphMeta} aria-hidden="true">
            <span>PROBLEM PATTERNS</span>
            <span>STATIC RELATIONSHIP PROJECTION</span>
            <span>GOOD FIT FOR</span>
          </div>

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
