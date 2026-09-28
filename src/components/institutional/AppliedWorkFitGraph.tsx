"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { appliedWorkAudiences, appliedWorkGoodFit } from "./content/appliedWork";
import styles from "./styles/AppliedWork.module.css";

type AppliedAudienceId = (typeof appliedWorkAudiences)[number]["id"];

const PROBLEM_ROWS = [
  [1, 3, 0, 2],
  [5, 4, 6],
] as const;

const PROBLEM_ORDER = PROBLEM_ROWS.flat();

const EDGE_COLORS = {
  blue: "#2d6fc4",
  gold: "#b28b28",
  green: "#3b7f5d",
  orange: "#c46b2b",
  teal: "#4f8e97",
  indigo: "#5b63ad",
} as const;

let mermaidRenderSequence = 0;

function problemNodeId(problemIndex: number) {
  return "problem_" + problemIndex;
}

function audienceNodeId(audienceId: AppliedAudienceId) {
  return "audience_" + audienceId.replace(/-/g, "_");
}

function escapeMermaidLabel(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;");
}

function wrapMermaidLabel(value: string, maxLineLength: number) {
  const words = escapeMermaidLabel(value).split(/\s+/);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? current + " " + word : word;
    if (candidate.length > maxLineLength && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }

  if (current) lines.push(current);
  return lines.join("<br/>");
}

function orderAudiences(audienceIds: readonly AppliedAudienceId[]) {
  return [...audienceIds].sort(
    (left, right) =>
      appliedWorkAudiences.findIndex((audience) => audience.id === left) -
      appliedWorkAudiences.findIndex((audience) => audience.id === right),
  );
}

function problemClass(tone: (typeof appliedWorkGoodFit)[number]["tone"]) {
  switch (tone) {
    case "gold":
      return "problemGold";
    case "green":
      return "problemGreen";
    default:
      return "problemBlue";
  }
}

function audienceClass(tone: (typeof appliedWorkAudiences)[number]["tone"]) {
  switch (tone) {
    case "gold":
      return "audienceGold";
    case "green":
      return "audienceGreen";
    case "orange":
      return "audienceOrange";
    case "teal":
      return "audienceTeal";
    case "indigo":
      return "audienceIndigo";
    default:
      return "audienceBlue";
  }
}

function buildAppliedFitGraphDefinition() {
  const lines: string[] = [
    "flowchart TB",
    '  subgraph problems[" "]',
    "    direction TB",
  ];

  PROBLEM_ROWS.forEach((row, rowIndex) => {
    lines.push('    subgraph problem_row_' + (rowIndex + 1) + '[" "]');
    lines.push("      direction LR");

    row.forEach((problemIndex) => {
      const signal = appliedWorkGoodFit[problemIndex];
      const label =
        String(problemIndex + 1).padStart(2, "0") +
        "<br/>" +
        wrapMermaidLabel(signal.copy, 31);

      lines.push(
        "      " +
          problemNodeId(problemIndex) +
          '["' +
          label +
          '"]:::' +
          problemClass(signal.tone),
      );
    });

    lines.push("    end");
  });

  lines.push("  end");
  lines.push('  subgraph audiences[" "]');
  lines.push("    direction LR");

  appliedWorkAudiences.forEach((audience) => {
    lines.push(
      "    " +
        audienceNodeId(audience.id) +
        '["' +
        wrapMermaidLabel(audience.label, 22) +
        '"]:::' +
        audienceClass(audience.tone),
    );
  });

  lines.push("  end");

  const linkStyles: string[] = [];
  let edgeIndex = 0;

  PROBLEM_ORDER.forEach((problemIndex) => {
    const signal = appliedWorkGoodFit[problemIndex];

    orderAudiences(signal.audiences).forEach((audienceId) => {
      const audience = appliedWorkAudiences.find(
        (candidate) => candidate.id === audienceId,
      );

      if (!audience) return;

      lines.push(
        "  " +
          problemNodeId(problemIndex) +
          " --- " +
          audienceNodeId(audienceId),
      );

      linkStyles.push(
        "  linkStyle " +
          edgeIndex +
          " stroke:" +
          EDGE_COLORS[audience.tone] +
          ",stroke-width:1.7px,opacity:0.78",
      );

      edgeIndex += 1;
    });
  });

  lines.push("  classDef problemBlue fill:#ffffff,stroke:#2d6fc4,stroke-width:3px,color:#071a3d");
  lines.push("  classDef problemGold fill:#ffffff,stroke:#b28b28,stroke-width:3px,color:#071a3d");
  lines.push("  classDef problemGreen fill:#ffffff,stroke:#3b7f5d,stroke-width:3px,color:#071a3d");
  lines.push("  classDef audienceBlue fill:#eef5ff,stroke:#2d6fc4,stroke-width:2px,color:#071a3d");
  lines.push("  classDef audienceGold fill:#fbf5dc,stroke:#b28b28,stroke-width:2px,color:#071a3d");
  lines.push("  classDef audienceGreen fill:#eef8f2,stroke:#3b7f5d,stroke-width:2px,color:#071a3d");
  lines.push("  classDef audienceOrange fill:#fff3e9,stroke:#c46b2b,stroke-width:2px,color:#071a3d");
  lines.push("  classDef audienceTeal fill:#edf7f8,stroke:#4f8e97,stroke-width:2px,color:#071a3d");
  lines.push("  classDef audienceIndigo fill:#f1f1fb,stroke:#5b63ad,stroke-width:2px,color:#071a3d");
  lines.push("  style problems fill:transparent,stroke:transparent");
  lines.push("  style problem_row_1 fill:transparent,stroke:transparent");
  lines.push("  style problem_row_2 fill:transparent,stroke:transparent");
  lines.push("  style audiences fill:transparent,stroke:transparent");

  lines.push(...linkStyles);

  return lines.join("\n");
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
  const reactId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const definition = useMemo(buildAppliedFitGraphDefinition, []);
  const [svg, setSvg] = useState("");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    const renderId =
      "applied-work-fit-" + reactId + "-" + mermaidRenderSequence++;

    async function renderGraph() {
      try {
        const mermaid = (await import("mermaid")).default;

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "base",
          flowchart: {
            curve: "basis",
            htmlLabels: true,
            nodeSpacing: 30,
            rankSpacing: 62,
            useMaxWidth: true,
          },
          themeVariables: {
            background: "#edf2f7",
            primaryColor: "#ffffff",
            primaryTextColor: "#071a3d",
            primaryBorderColor: "#244f9a",
            lineColor: "#718096",
            clusterBkg: "transparent",
            clusterBorder: "transparent",
            fontFamily: 'Georgia, "Times New Roman", serif',
          },
        });

        const rendered = await mermaid.render(renderId, definition);

        if (!active) return;
        setSvg(rendered.svg);
        setFailed(false);
      } catch {
        if (!active) return;
        setFailed(true);
      }
    }

    void renderGraph();

    return () => {
      active = false;
    };
  }, [definition, reactId]);

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

          {svg ? (
            <div
              className={styles.appliedFitGraphCanvas}
              role="img"
              aria-label="Seven common problem patterns connected to six audience groups"
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          ) : (
            <div className={styles.appliedFitGraphLoading}>
              Building relationship projection…
            </div>
          )}
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
