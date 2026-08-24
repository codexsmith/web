import type {
  PaperMineFrontierItem,
  PaperMinePaper,
} from "@/lib/paper-mine";
import graphStyles from "./paper-mine-graph.module.css";

type PaperMineGraphProps = {
  papers: PaperMinePaper[];
  frontier: PaperMineFrontierItem[];
  selectedId: string | null;
  onSelect: (paper: PaperMinePaper) => void;
};

type PositionedSource = {
  path: string;
  y: number;
  count: number;
};

const GRAPH_WIDTH = 1430;
const FIELD_X = 32;
const FIELD_WIDTH = 230;
const PAPER_X = 382;
const PAPER_WIDTH = 400;
const SOURCE_X = 1012;
const SOURCE_WIDTH = 382;
const TOP = 62;
const PAPER_HEIGHT = 58;
const PAPER_STEP = 78;
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

function paperMeta(paper: PaperMinePaper, frontier?: PaperMineFrontierItem) {
  const corpus = paper.record_class === "controlled_publication" ? "Controlled" : "Mined";
  const stage = paper.stage === "discovery" ? "Discovery" : `Stage ${paper.stage}`;
  return `${corpus} · ${stage} · R${paper.readiness_hint}${frontier ? ` · frontier #${frontier.rank}` : ""}`;
}

export function PaperMineGraph({ papers, frontier, selectedId, onSelect }: PaperMineGraphProps) {
  if (!papers.length) {
    return (
      <section className={graphStyles.graphPanel}>
        <header className={graphStyles.graphHeader}>
          <div><span>Data-first graph</span><h2>Typed relationship graph</h2></div>
          <p>No paper nodes exist inside the current boundary.</p>
        </header>
        <div className={graphStyles.graphEmpty}>Broaden the filters to restore graph structure.</div>
      </section>
    );
  }

  const frontierById = new Map(frontier.map((item) => [item.candidate_id, item]));
  const orderedPapers = [...papers].sort((left, right) => {
    const fieldCompare = humanize(left.field_group).localeCompare(humanize(right.field_group));
    if (fieldCompare !== 0) return fieldCompare;
    const leftRank = frontierById.get(left.id)?.rank ?? 999;
    const rightRank = frontierById.get(right.id)?.rank ?? 999;
    if (leftRank !== rightRank) return leftRank - rightRank;
    if (left.stage !== right.stage) return left.stage.localeCompare(right.stage);
    if (left.readiness_hint !== right.readiness_hint) return right.readiness_hint - left.readiness_hint;
    return left.title.localeCompare(right.title);
  });

  const paperLayout = orderedPapers.map((paper, index) => ({
    paper,
    y: TOP + index * PAPER_STEP,
  }));

  const fieldMembers = new Map<string, number[]>();
  const sourceMembers = new Map<string, number[]>();
  paperLayout.forEach(({ paper, y }) => {
    const fieldYs = fieldMembers.get(paper.field_group) ?? [];
    fieldYs.push(y + PAPER_HEIGHT / 2);
    fieldMembers.set(paper.field_group, fieldYs);

    [...new Set(paper.source_paths)].forEach((path) => {
      const sourceYs = sourceMembers.get(path) ?? [];
      sourceYs.push(y + PAPER_HEIGHT / 2);
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
    TOP + orderedPapers.length * PAPER_STEP + 38,
    TOP + sourceSeeds.length * SOURCE_STEP + 38,
  );
  const sourceNodes = spreadSources(sourceSeeds, graphHeight);
  const sourceY = new Map(sourceNodes.map((source) => [source.path, source.y]));

  const provenanceEdgeCount = orderedPapers.reduce(
    (sum, paper) => sum + new Set(paper.source_paths).size,
    0,
  );
  const frontierCount = orderedPapers.filter((paper) => frontierById.has(paper.id)).length;
  const controlledCount = orderedPapers.filter((paper) => paper.record_class === "controlled_publication").length;

  return (
    <section className={graphStyles.graphPanel} aria-label="Paper Mine data-first graph view">
      <header className={graphStyles.graphHeader}>
        <div>
          <span>Data-first graph</span>
          <h2>Corpus-wide typed graph</h2>
        </div>
        <p>
          Deterministic projection of the current visible dataset. Field and provenance edges are derived directly from canonical paper records; controlled dependency relations remain authoritative in the Lab and are not silently inferred from layout.
        </p>
      </header>

      <div className={graphStyles.graphStats} aria-label="Graph counts">
        <span><b>{fieldNodes.length}</b> fields</span>
        <span><b>{orderedPapers.length}</b> paper nodes</span>
        <span><b>{controlledCount}</b> controlled</span>
        <span><b>{sourceNodes.length}</b> provenance reservoirs</span>
        <span><b>{orderedPapers.length + provenanceEdgeCount}</b> displayed edges</span>
        <span><b>{frontierCount}</b> frontier nodes visible</span>
      </div>

      <div className={graphStyles.graphLegend} aria-label="Graph legend">
        <span data-kind="field">Field group</span>
        <span data-kind="candidate">Paper object</span>
        <span data-kind="frontier">Paperization frontier</span>
        <span data-kind="source">Lab provenance</span>
        <code>field → paper → source</code>
      </div>

      <div className={graphStyles.graphViewport}>
        <svg
          className={graphStyles.graphSvg}
          width={GRAPH_WIDTH}
          height={graphHeight}
          viewBox={`0 0 ${GRAPH_WIDTH} ${graphHeight}`}
          aria-label={`${orderedPapers.length} paper objects connected to ${fieldNodes.length} field groups and ${sourceNodes.length} provenance reservoirs`}
        >
          <text className={graphStyles.graphColumnLabel} x={FIELD_X} y={30}>FIELD GROUP</text>
          <text className={graphStyles.graphColumnLabel} x={PAPER_X} y={30}>PAPER OBJECT · CORPUS · STAGE · READINESS</text>
          <text className={graphStyles.graphColumnLabel} x={SOURCE_X} y={30}>PROVENANCE SOURCE</text>

          {paperLayout.map(({ paper, y }) => {
            const field = fieldNodes.find((node) => node.field === paper.field_group);
            if (!field) return null;
            const selected = selectedId === paper.id;
            return (
              <path
                key={`field:${paper.id}`}
                className={`${graphStyles.graphEdge} ${graphStyles.graphEdgeField} ${selected ? graphStyles.graphEdgeSelected : ""}`}
                d={curve(
                  FIELD_X + FIELD_WIDTH,
                  field.y + 25,
                  PAPER_X,
                  y + PAPER_HEIGHT / 2,
                )}
              />
            );
          })}

          {paperLayout.flatMap(({ paper, y }) =>
            [...new Set(paper.source_paths)].map((path) => {
              const targetY = sourceY.get(path);
              if (targetY === undefined) return null;
              const selected = selectedId === paper.id;
              return (
                <path
                  key={`source:${paper.id}:${path}`}
                  className={`${graphStyles.graphEdge} ${graphStyles.graphEdgeSource} ${selected ? graphStyles.graphEdgeSelected : ""}`}
                  d={curve(
                    PAPER_X + PAPER_WIDTH,
                    y + PAPER_HEIGHT / 2,
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
                <small>{node.count} paper{node.count === 1 ? "" : "s"}</small>
              </div>
            </foreignObject>
          ))}

          {paperLayout.map(({ paper, y }) => {
            const frontierItem = frontierById.get(paper.id);
            return (
              <foreignObject
                key={paper.id}
                x={PAPER_X}
                y={y}
                width={PAPER_WIDTH}
                height={PAPER_HEIGHT}
              >
                <button
                  type="button"
                  className={graphStyles.graphCandidate}
                  data-frontier={frontierItem ? "true" : "false"}
                  data-selected={selectedId === paper.id ? "true" : "false"}
                  onClick={() => onSelect(paper)}
                  title={paper.title}
                >
                  <span>{paperMeta(paper, frontierItem)}</span>
                  <strong>{paper.title}</strong>
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
                <span>Lab provenance reservoir</span>
                <strong>{compactSource(source.path)}</strong>
                <small>{source.count} reference{source.count === 1 ? "" : "s"}</small>
              </div>
            </foreignObject>
          ))}
        </svg>
      </div>

      <footer className={graphStyles.graphFootnote}>
        <span>Graph boundary = current visible paper set</span>
        <span>Selection opens the same canonical paper inspector used by the data cards</span>
      </footer>
    </section>
  );
}
