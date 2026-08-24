import type {
  PaperMineCandidate,
  PaperMineFrontierItem,
} from "@/lib/paper-mine";
import graphStyles from "./paper-mine-graph.module.css";

type PaperMineGraphProps = {
  candidates: PaperMineCandidate[];
  frontier: PaperMineFrontierItem[];
  selectedId: string | null;
  onSelect: (candidate: PaperMineCandidate) => void;
};

type PositionedSource = {
  path: string;
  y: number;
  count: number;
};

const GRAPH_WIDTH = 1430;
const FIELD_X = 32;
const FIELD_WIDTH = 230;
const CANDIDATE_X = 382;
const CANDIDATE_WIDTH = 400;
const SOURCE_X = 1012;
const SOURCE_WIDTH = 382;
const TOP = 62;
const CANDIDATE_HEIGHT = 58;
const CANDIDATE_STEP = 78;
const SOURCE_HEIGHT = 46;
const SOURCE_STEP = 56;

function humanize(value: string) {
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function compactSource(path: string) {
  const parts = path.split("/").filter(Boolean);
  return parts.length > 3 ? `…/${parts.slice(-3).join("/")}` : path;
}

function average(values: number[]) {
  return values.reduce((sum, value) => sum + value, 0) / Math.max(values.length, 1);
}

function curve(x1: number, y1: number, x2: number, y2: number) {
  const bend = Math.max(72, (x2 - x1) * 0.42);
  return `M ${x1} ${y1} C ${x1 + bend} ${y1}, ${x2 - bend} ${y2}, ${x2} ${y2}`;
}

function spreadSources(
  sources: Array<{ path: string; desiredY: number; count: number }>,
  height: number,
): PositionedSource[] {
  if (!sources.length) return [];
  const sorted = [...sources].sort((left, right) => left.desiredY - right.desiredY || left.path.localeCompare(right.path));
  const placed = sorted.map((source) => ({ ...source, y: source.desiredY }));

  let cursor = TOP;
  placed.forEach((source) => {
    source.y = Math.max(source.y, cursor);
    cursor = source.y + SOURCE_STEP;
  });

  const maxY = height - SOURCE_HEIGHT - 28;
  for (let index = placed.length - 1; index >= 0; index -= 1) {
    const allowed = maxY - (placed.length - 1 - index) * SOURCE_STEP;
    placed[index].y = Math.min(placed[index].y, allowed);
  }

  cursor = TOP;
  placed.forEach((source) => {
    source.y = Math.max(source.y, cursor);
    cursor = source.y + SOURCE_STEP;
  });

  return placed.map(({ path, y, count }) => ({ path, y, count }));
}

export function PaperMineGraph({ candidates, frontier, selectedId, onSelect }: PaperMineGraphProps) {
  if (!candidates.length) {
    return (
      <section className={graphStyles.graphPanel}>
        <header className={graphStyles.graphHeader}>
          <div><span>Data-first graph</span><h2>Typed relationship graph</h2></div>
          <p>No candidate nodes exist inside the current boundary.</p>
        </header>
        <div className={graphStyles.graphEmpty}>Broaden the filters to restore graph structure.</div>
      </section>
    );
  }

  const frontierById = new Map(frontier.map((item) => [item.candidate_id, item]));
  const orderedCandidates = [...candidates].sort((left, right) => {
    const fieldCompare = humanize(left.field_group).localeCompare(humanize(right.field_group));
    if (fieldCompare !== 0) return fieldCompare;
    const leftRank = frontierById.get(left.id)?.rank ?? 999;
    const rightRank = frontierById.get(right.id)?.rank ?? 999;
    if (leftRank !== rightRank) return leftRank - rightRank;
    if (left.readiness_hint !== right.readiness_hint) return right.readiness_hint - left.readiness_hint;
    return left.title.localeCompare(right.title);
  });

  const candidateLayout = orderedCandidates.map((candidate, index) => ({
    candidate,
    y: TOP + index * CANDIDATE_STEP,
  }));

  const fieldMembers = new Map<string, number[]>();
  const sourceMembers = new Map<string, number[]>();
  candidateLayout.forEach(({ candidate, y }) => {
    const fieldYs = fieldMembers.get(candidate.field_group) ?? [];
    fieldYs.push(y + CANDIDATE_HEIGHT / 2);
    fieldMembers.set(candidate.field_group, fieldYs);

    [...new Set(candidate.source_paths)].forEach((path) => {
      const sourceYs = sourceMembers.get(path) ?? [];
      sourceYs.push(y + CANDIDATE_HEIGHT / 2);
      sourceMembers.set(path, sourceYs);
    });
  });

  const fieldNodes = [...fieldMembers.entries()]
    .map(([field, ys]) => ({ field, y: average(ys) - 25, count: ys.length }))
    .sort((left, right) => left.y - right.y);

  const sourceSeeds = [...sourceMembers.entries()].map(([path, ys]) => ({
    path,
    desiredY: average(ys) - SOURCE_HEIGHT / 2,
    count: ys.length,
  }));
  const graphHeight = Math.max(
    600,
    TOP + orderedCandidates.length * CANDIDATE_STEP + 38,
    TOP + sourceSeeds.length * SOURCE_STEP + 38,
  );
  const sourceNodes = spreadSources(sourceSeeds, graphHeight);
  const sourceY = new Map(sourceNodes.map((source) => [source.path, source.y]));

  const provenanceEdgeCount = orderedCandidates.reduce(
    (sum, candidate) => sum + new Set(candidate.source_paths).size,
    0,
  );
  const frontierCount = orderedCandidates.filter((candidate) => frontierById.has(candidate.id)).length;

  return (
    <section className={graphStyles.graphPanel} aria-label="Paper Mine data-first graph view">
      <header className={graphStyles.graphHeader}>
        <div>
          <span>Data-first graph</span>
          <h2>Typed relationship graph</h2>
        </div>
        <p>
          Deterministic projection of the current visible dataset. Field and provenance edges are derived directly from candidate records; no additional scientific relation is inferred.
        </p>
      </header>

      <div className={graphStyles.graphStats} aria-label="Graph counts">
        <span><b>{fieldNodes.length}</b> fields</span>
        <span><b>{orderedCandidates.length}</b> candidate nodes</span>
        <span><b>{sourceNodes.length}</b> source reservoirs</span>
        <span><b>{orderedCandidates.length + provenanceEdgeCount}</b> typed edges</span>
        <span><b>{frontierCount}</b> frontier nodes visible</span>
      </div>

      <div className={graphStyles.graphLegend} aria-label="Graph legend">
        <span data-kind="field">Field group</span>
        <span data-kind="candidate">Paper candidate</span>
        <span data-kind="frontier">Frontier candidate</span>
        <span data-kind="source">Private Lab provenance</span>
        <code>field → candidate → source</code>
      </div>

      <div className={graphStyles.graphViewport}>
        <svg
          className={graphStyles.graphSvg}
          width={GRAPH_WIDTH}
          height={graphHeight}
          viewBox={`0 0 ${GRAPH_WIDTH} ${graphHeight}`}
          aria-label={`${orderedCandidates.length} paper candidates connected to ${fieldNodes.length} field groups and ${sourceNodes.length} provenance reservoirs`}
        >
          <text className={graphStyles.graphColumnLabel} x={FIELD_X} y={30}>FIELD GROUP</text>
          <text className={graphStyles.graphColumnLabel} x={CANDIDATE_X} y={30}>PAPER CANDIDATE · PASS · READINESS</text>
          <text className={graphStyles.graphColumnLabel} x={SOURCE_X} y={30}>PROVENANCE SOURCE</text>

          {candidateLayout.map(({ candidate, y }) => {
            const field = fieldNodes.find((node) => node.field === candidate.field_group);
            if (!field) return null;
            const selected = selectedId === candidate.id;
            return (
              <path
                key={`field:${candidate.id}`}
                className={`${graphStyles.graphEdge} ${graphStyles.graphEdgeField} ${selected ? graphStyles.graphEdgeSelected : ""}`}
                d={curve(
                  FIELD_X + FIELD_WIDTH,
                  field.y + 25,
                  CANDIDATE_X,
                  y + CANDIDATE_HEIGHT / 2,
                )}
              />
            );
          })}

          {candidateLayout.flatMap(({ candidate, y }) =>
            [...new Set(candidate.source_paths)].map((path) => {
              const targetY = sourceY.get(path);
              if (targetY === undefined) return null;
              const selected = selectedId === candidate.id;
              return (
                <path
                  key={`source:${candidate.id}:${path}`}
                  className={`${graphStyles.graphEdge} ${graphStyles.graphEdgeSource} ${selected ? graphStyles.graphEdgeSelected : ""}`}
                  d={curve(
                    CANDIDATE_X + CANDIDATE_WIDTH,
                    y + CANDIDATE_HEIGHT / 2,
                    SOURCE_X,
                    targetY + SOURCE_HEIGHT / 2,
                  )}
                />
              );
            }),
          )}

          {fieldNodes.map((node) => (
            <foreignObject key={node.field} x={FIELD_X} y={node.y} width={FIELD_WIDTH} height={50}>
              <div className={graphStyles.graphFieldNode} title={humanize(node.field)}>
                <span>Field group</span>
                <strong>{humanize(node.field)}</strong>
                <small>{node.count} candidate{node.count === 1 ? "" : "s"}</small>
              </div>
            </foreignObject>
          ))}

          {candidateLayout.map(({ candidate, y }) => {
            const frontierItem = frontierById.get(candidate.id);
            return (
              <foreignObject
                key={candidate.id}
                x={CANDIDATE_X}
                y={y}
                width={CANDIDATE_WIDTH}
                height={CANDIDATE_HEIGHT}
              >
                <button
                  type="button"
                  className={graphStyles.graphCandidate}
                  data-frontier={frontierItem ? "true" : "false"}
                  data-selected={selectedId === candidate.id ? "true" : "false"}
                  onClick={() => onSelect(candidate)}
                  title={candidate.title}
                >
                  <span>
                    {candidate.pass === "pass1" ? "Pass 1" : "Pass 2"} · R{candidate.readiness_hint}
                    {frontierItem ? ` · frontier #${frontierItem.rank}` : ""}
                  </span>
                  <strong>{candidate.title}</strong>
                </button>
              </foreignObject>
            );
          })}

          {sourceNodes.map((source) => (
            <foreignObject
              key={source.path}
              x={SOURCE_X}
              y={source.y}
              width={SOURCE_WIDTH}
              height={SOURCE_HEIGHT}
            >
              <div className={graphStyles.graphSourceNode} title={source.path}>
                <span>Private source reservoir</span>
                <strong>{compactSource(source.path)}</strong>
                <small>{source.count} reference{source.count === 1 ? "" : "s"}</small>
              </div>
            </foreignObject>
          ))}
        </svg>
      </div>

      <footer className={graphStyles.graphFootnote}>
        <span>Graph boundary = current visible candidate set</span>
        <span>Selection opens the same object inspector used by the card view</span>
      </footer>
    </section>
  );
}
