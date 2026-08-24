"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type {
  PaperMineFrontierItem,
  PaperMinePaper,
  PaperMineSnapshot,
} from "@/lib/paper-mine";
import { PaperMineGraph } from "./paper-mine-graph";
import styles from "./paper-mine.module.css";

type CorpusFilter = "all" | "controlled" | "mined";
type StageFilter = "all" | "A" | "B" | "C" | "discovery";

type ViewState = {
  q: string;
  corpus: CorpusFilter;
  discipline: string;
  stage: StageFilter;
  field: string;
  readiness: number;
  disposition: string;
  frontierOnly: boolean;
  paper: string | null;
};

type HistoryMode = "push" | "replace";

const URL_KEYS = [
  "q",
  "corpus",
  "discipline",
  "stage",
  "field",
  "readiness",
  "disposition",
  "frontier",
  "paper",
];

function defaultViewState(): ViewState {
  return {
    q: "",
    corpus: "all",
    discipline: "all",
    stage: "all",
    field: "all",
    readiness: 0,
    disposition: "all",
    frontierOnly: false,
    paper: null,
  };
}

function humanize(value: string) {
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function compactPath(path: string) {
  const parts = path.split("/");
  return parts.length > 5 ? `…/${parts.slice(-5).join("/")}` : path;
}

function corpusLabel(paper: PaperMinePaper) {
  return paper.record_class === "controlled_publication" ? "Controlled publication" : "Mined candidate";
}

function stageLabel(paper: PaperMinePaper) {
  return paper.stage === "discovery" ? "Discovery" : `Stage ${paper.stage}`;
}

function paperSearchText(paper: PaperMinePaper, frontier?: PaperMineFrontierItem) {
  return [
    paper.id,
    paper.title,
    paper.record_class,
    paper.discipline,
    paper.field_group,
    paper.domain,
    paper.lane,
    paper.stage,
    paper.artifact_state,
    paper.recommended_disposition,
    paper.claim_ceiling,
    paper.prior_art_requirement,
    paper.evidence_requirement,
    paper.risk,
    paper.program,
    frontier?.question,
    ...(paper.origins ?? []),
    ...(paper.aliases ?? []),
    ...(paper.source_paths ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function matchesPaper(
  paper: PaperMinePaper,
  view: ViewState,
  frontierById: Map<string, PaperMineFrontierItem>,
) {
  if (view.q && !paperSearchText(paper, frontierById.get(paper.id)).includes(view.q)) return false;
  if (view.corpus === "controlled" && paper.record_class !== "controlled_publication") return false;
  if (view.corpus === "mined" && paper.record_class !== "mined_candidate") return false;
  if (view.discipline !== "all" && paper.discipline !== view.discipline) return false;
  if (view.stage !== "all" && paper.stage !== view.stage) return false;
  if (view.field !== "all" && paper.field_group !== view.field) return false;
  if (paper.readiness_hint < view.readiness) return false;
  if (view.disposition !== "all" && paper.recommended_disposition !== view.disposition) return false;
  if (view.frontierOnly && !frontierById.has(paper.id)) return false;
  return true;
}

function buildViewFromUrl(
  data: PaperMineSnapshot,
  frontierById: Map<string, PaperMineFrontierItem>,
): ViewState {
  const params = new URLSearchParams(window.location.search);
  const fields = new Set(data.papers.map((paper) => paper.field_group));
  const disciplines = new Set(data.papers.map((paper) => paper.discipline));
  const dispositions = new Set(data.papers.map((paper) => paper.recommended_disposition));
  const requestedCorpus = params.get("corpus");
  const requestedStage = params.get("stage");
  const requestedReadiness = Number(params.get("readiness"));
  const requestedPaper = params.get("paper");

  const view: ViewState = {
    q: (params.get("q") ?? "").trim().toLowerCase(),
    corpus: requestedCorpus === "controlled" || requestedCorpus === "mined" ? requestedCorpus : "all",
    discipline: disciplines.has(params.get("discipline") ?? "") ? (params.get("discipline") as string) : "all",
    stage:
      requestedStage === "A" || requestedStage === "B" || requestedStage === "C" || requestedStage === "discovery"
        ? requestedStage
        : "all",
    field: fields.has(params.get("field") ?? "") ? (params.get("field") as string) : "all",
    readiness: [0, 1, 2, 3, 4, 5].includes(requestedReadiness) ? requestedReadiness : 0,
    disposition: dispositions.has(params.get("disposition") ?? "")
      ? (params.get("disposition") as string)
      : "all",
    frontierOnly: ["1", "true", "yes"].includes((params.get("frontier") ?? "").toLowerCase()),
    paper: requestedPaper && data.papers.some((paper) => paper.id === requestedPaper)
      ? requestedPaper
      : null,
  };

  if (view.paper) {
    const selected = data.papers.find((paper) => paper.id === view.paper);
    if (!selected || !matchesPaper(selected, view, frontierById)) view.paper = null;
  }

  return view;
}

function writeViewToUrl(view: ViewState, mode: HistoryMode) {
  const url = new URL(window.location.href);
  URL_KEYS.forEach((key) => url.searchParams.delete(key));

  if (view.q) url.searchParams.set("q", view.q);
  if (view.corpus !== "all") url.searchParams.set("corpus", view.corpus);
  if (view.discipline !== "all") url.searchParams.set("discipline", view.discipline);
  if (view.stage !== "all") url.searchParams.set("stage", view.stage);
  if (view.field !== "all") url.searchParams.set("field", view.field);
  if (view.readiness > 0) url.searchParams.set("readiness", String(view.readiness));
  if (view.disposition !== "all") url.searchParams.set("disposition", view.disposition);
  if (view.frontierOnly) url.searchParams.set("frontier", "1");
  if (view.paper) url.searchParams.set("paper", view.paper);

  const nextUrl = `${url.pathname}${url.search}${url.hash}`;
  const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (nextUrl === currentUrl) return;

  if (mode === "push") window.history.pushState({ paperMine: true }, "", nextUrl);
  else window.history.replaceState({ paperMine: true }, "", nextUrl);
}

export function PaperMineView({ data }: { data: PaperMineSnapshot }) {
  const frontierById = useMemo(
    () => new Map(data.frontier.map((item) => [item.candidate_id, item])),
    [data.frontier],
  );
  const paperById = useMemo(
    () => new Map(data.papers.map((paper) => [paper.id, paper])),
    [data.papers],
  );
  const fields = useMemo(
    () => [...new Set(data.papers.map((paper) => paper.field_group))].sort(),
    [data.papers],
  );
  const disciplines = useMemo(
    () => [...new Set(data.papers.map((paper) => paper.discipline))].sort(),
    [data.papers],
  );
  const dispositions = useMemo(
    () => [...new Set(data.papers.map((paper) => paper.recommended_disposition))].sort(),
    [data.papers],
  );
  const [view, setView] = useState<ViewState>(defaultViewState);

  useEffect(() => {
    const restore = () => {
      const restored = buildViewFromUrl(data, frontierById);
      setView(restored);
      writeViewToUrl(restored, "replace");
    };

    restore();
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, [data, frontierById]);

  useEffect(() => {
    const paper = view.paper ? paperById.get(view.paper) : undefined;
    document.title = paper
      ? `${paper.title} · Paper Mine | Boundary First Labs`
      : "Paper Mine | Boundary First Labs";
  }, [paperById, view.paper]);

  const visible = useMemo(
    () => data.papers.filter((paper) => matchesPaper(paper, view, frontierById)),
    [data.papers, frontierById, view],
  );
  const omittedCount = data.summary.canonical_paper_count - visible.length;
  const selected = view.paper ? paperById.get(view.paper) : undefined;
  const selectedFrontier = selected ? frontierById.get(selected.id) : undefined;

  const grouped = useMemo(() => {
    const groups = new Map<string, PaperMinePaper[]>();
    visible.forEach((paper) => {
      const group = groups.get(paper.field_group) ?? [];
      group.push(paper);
      groups.set(paper.field_group, group);
    });
    return [...groups.entries()]
      .sort(([left], [right]) => humanize(left).localeCompare(humanize(right)))
      .map(([field, papers]) => [
        field,
        papers.sort((left, right) => {
          const leftRank = frontierById.get(left.id)?.rank ?? 999;
          const rightRank = frontierById.get(right.id)?.rank ?? 999;
          if (leftRank !== rightRank) return leftRank - rightRank;
          const stageOrder = { A: 0, B: 1, C: 2, discovery: 3 } as const;
          if (stageOrder[left.stage] !== stageOrder[right.stage]) return stageOrder[left.stage] - stageOrder[right.stage];
          if (left.readiness_hint !== right.readiness_hint) return right.readiness_hint - left.readiness_hint;
          return left.title.localeCompare(right.title);
        }),
      ] as const);
  }, [frontierById, visible]);

  const sourceCounts = useMemo(() => {
    const counts = new Map<string, number>();
    visible.forEach((paper) => {
      paper.source_paths.forEach((path) => counts.set(path, (counts.get(path) ?? 0) + 1));
    });
    return [...counts.entries()].sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]));
  }, [visible]);

  const activeBoundary = [
    view.q ? `search “${view.q}”` : null,
    view.corpus !== "all" ? (view.corpus === "controlled" ? "controlled publications" : "mined candidates") : null,
    view.discipline !== "all" ? humanize(view.discipline) : null,
    view.stage !== "all" ? (view.stage === "discovery" ? "discovery" : `Stage ${view.stage}`) : null,
    view.field !== "all" ? humanize(view.field) : null,
    view.readiness > 0 ? `readiness ≥ ${view.readiness}` : null,
    view.disposition !== "all" ? humanize(view.disposition) : null,
    view.frontierOnly ? "frontier only" : null,
  ].filter(Boolean);

  function commit(next: ViewState, mode: HistoryMode = "push") {
    setView(next);
    writeViewToUrl(next, mode);
  }

  function changeFilter(patch: Partial<Omit<ViewState, "paper">>, mode: HistoryMode = "push") {
    const next = { ...view, ...patch };
    if (next.paper) {
      const paper = paperById.get(next.paper);
      if (!paper || !matchesPaper(paper, next, frontierById)) next.paper = null;
    }
    commit(next, mode);
  }

  function selectPaper(paper: PaperMinePaper) {
    if (!matchesPaper(paper, view, frontierById)) {
      commit({
        ...defaultViewState(),
        corpus: paper.record_class === "controlled_publication" ? "controlled" : "mined",
        discipline: paper.discipline,
        stage: paper.stage,
        field: paper.field_group,
        frontierOnly: frontierById.has(paper.id),
        paper: paper.id,
      });
      return;
    }
    commit({ ...view, paper: paper.id });
  }

  function resetView() {
    commit(defaultViewState());
  }

  const sourceRevision = data.source_revision?.slice(0, 12) ?? "unknown";
  const contentHash = data.source_content_sha256.slice(0, 12);

  return (
    <main className={styles.shell}>
      <header className={styles.topFrame}>
        <div>
          <div className={styles.eyebrow}>Boundary First Labs · Research · Corpus-wide publication discovery</div>
          <h1>Paper Mine</h1>
          <p>
            A bounded public projection of controlled publication objects and paper-shaped candidates already present across the Lab corpus. Controlled status, discovery status, readiness, provenance, and claim boundaries remain distinct.
          </p>
        </div>
        <div className={styles.provenanceBlock}>
          <span>Unified projection</span>
          <strong>{data.generated_on}</strong>
          <code>{sourceRevision}</code>
          <code>sha256 {contentHash}</code>
        </div>
      </header>

      <section className={styles.boundaryBar} aria-live="polite">
        <div>
          <span>Current boundary</span>
          <strong>{activeBoundary.length ? activeBoundary.join(" · ") : "All canonical public Paper Mine records"}</strong>
        </div>
        <div className={styles.boundaryCounts}>
          <span><b>{visible.length}</b> visible</span>
          <span><b>{data.summary.canonical_paper_count}</b> total</span>
          <span><b>{omittedCount}</b> omitted</span>
        </div>
        <div className={omittedCount ? styles.partial : styles.exhaustive}>
          {omittedCount
            ? `Partial projection · ${omittedCount} paper${omittedCount === 1 ? "" : "s"} outside the active view`
            : "Exhaustive relative to this public snapshot"}
        </div>
      </section>

      <div className={styles.grid}>
        <aside className={styles.leftFrame} aria-label="Paper Mine controls">
          <nav className={styles.returnNav} aria-label="Research navigation">
            <Link href="/research">← Research</Link>
            <Link href="/publications">Publications</Link>
            <Link href="/">Lab home</Link>
          </nav>

          <div className={styles.frameLabel}>Bound the corpus</div>
          <label>
            Search
            <input
              type="search"
              value={view.q}
              onChange={(event) => changeFilter({ q: event.target.value.trimStart().toLowerCase() }, "replace")}
              placeholder="Paper, domain, program, claim…"
            />
          </label>
          <label>
            Corpus class
            <select value={view.corpus} onChange={(event) => changeFilter({ corpus: event.target.value as CorpusFilter })}>
              <option value="all">Controlled + mined</option>
              <option value="controlled">Controlled publications</option>
              <option value="mined">Mined candidates</option>
            </select>
          </label>
          <label>
            Discipline
            <select value={view.discipline} onChange={(event) => changeFilter({ discipline: event.target.value })}>
              <option value="all">All disciplines</option>
              {disciplines.map((discipline) => <option key={discipline} value={discipline}>{humanize(discipline)}</option>)}
            </select>
          </label>
          <label>
            Publication stage
            <select value={view.stage} onChange={(event) => changeFilter({ stage: event.target.value as StageFilter })}>
              <option value="all">All stages</option>
              <option value="A">Stage A · classical readings</option>
              <option value="B">Stage B · synthesis</option>
              <option value="C">Stage C · Boundary-native</option>
              <option value="discovery">Discovery · pre-control</option>
            </select>
          </label>
          <label>
            Field
            <select value={view.field} onChange={(event) => changeFilter({ field: event.target.value })}>
              <option value="all">All fields</option>
              {fields.map((field) => <option key={field} value={field}>{humanize(field)}</option>)}
            </select>
          </label>
          <label>
            Readiness floor
            <select
              value={String(view.readiness)}
              onChange={(event) => changeFilter({ readiness: Number(event.target.value) })}
            >
              <option value="0">Any readiness</option>
              <option value="1">≥ 1 · latent</option>
              <option value="2">≥ 2 · substantial</option>
              <option value="3">≥ 3 · paper-shaped</option>
              <option value="4">≥ 4 · mature</option>
              <option value="5">5 · reviewable</option>
            </select>
          </label>
          <label>
            Queue / disposition
            <select
              value={view.disposition}
              onChange={(event) => changeFilter({ disposition: event.target.value })}
            >
              <option value="all">All dispositions</option>
              {dispositions.map((disposition) => (
                <option key={disposition} value={disposition}>{humanize(disposition)}</option>
              ))}
            </select>
          </label>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={view.frontierOnly}
              onChange={(event) => changeFilter({ frontierOnly: event.target.checked })}
            />
            Paperization frontier only
          </label>
          <button className={styles.resetButton} type="button" onClick={resetView}>Reset boundary</button>

          <section className={styles.authorityCard}>
            <div className={styles.frameLabel}>Authority boundary</div>
            <p>{data.authority.scope}. The private Lab remains authoritative; this public projection cannot promote a paper or scientific claim.</p>
            <code>discover → canonicalize → control → paperize → human gate → publish</code>
          </section>
        </aside>

        <div className={styles.workbench}>
          <section className={styles.metrics} aria-label="Paper Mine metrics">
            <article><strong>{data.summary.canonical_paper_count}</strong><span>canonical papers</span></article>
            <article><strong>{data.summary.controlled_publication_count}</strong><span>controlled publications</span></article>
            <article><strong>{data.summary.mined_candidate_count}</strong><span>mined candidates</span></article>
            <article><strong>{data.summary.counts_by_stage.A ?? 0}</strong><span>Stage A</span></article>
            <article><strong>{data.summary.counts_by_stage.B ?? 0}</strong><span>Stage B</span></article>
            <article><strong>{data.summary.counts_by_stage.C ?? 0}</strong><span>Stage C</span></article>
          </section>

          <PaperMineGraph
            papers={visible}
            frontier={data.frontier}
            selectedId={view.paper}
            onSelect={selectPaper}
          />

          <section className={styles.panel}>
            <header>
              <div><span>Paperization leverage</span><h2>Frontier rail</h2></div>
              <p>Frontier rank is a discovery-paperization sequence, not scientific importance or publication priority.</p>
            </header>
            <div className={styles.frontierRail}>
              {data.frontier.map((item) => {
                const paper = paperById.get(item.candidate_id);
                if (!paper) return null;
                const inView = matchesPaper(paper, view, frontierById);
                return (
                  <button
                    key={item.candidate_id}
                    type="button"
                    data-dimmed={inView ? "false" : "true"}
                    data-selected={view.paper === item.candidate_id ? "true" : "false"}
                    onClick={() => selectPaper(paper)}
                  >
                    <span>#{item.rank}</span>
                    <strong>{paper.title}</strong>
                    <small>{humanize(item.paperization_state)}</small>
                  </button>
                );
              })}
            </div>
          </section>

          <section className={styles.panel}>
            <header>
              <div><span>Corpus field</span><h2>Canonical paper field</h2></div>
              <p>{visible.length} of {data.summary.canonical_paper_count} canonical papers are inside the current boundary.</p>
            </header>
            <div className={styles.fieldGroups}>
              {grouped.length ? grouped.map(([field, papers]) => (
                <section key={field} className={styles.fieldGroup}>
                  <div className={styles.fieldGroupHeader}>
                    <h3>{humanize(field)}</h3><span>{papers.length} visible</span>
                  </div>
                  <div className={styles.cardGrid}>
                    {papers.map((paper) => {
                      const frontier = frontierById.get(paper.id);
                      return (
                        <button
                          type="button"
                          key={paper.id}
                          className={styles.paperCard}
                          data-frontier={frontier ? "true" : "false"}
                          data-selected={view.paper === paper.id ? "true" : "false"}
                          onClick={() => selectPaper(paper)}
                        >
                          <div className={styles.cardMeta}>
                            <span>{stageLabel(paper)}</span>
                            <span>R{paper.readiness_hint}</span>
                          </div>
                          <h4>{paper.title}</h4>
                          <p>{frontier?.question ?? paper.claim_ceiling}</p>
                          <div className={styles.chips}>
                            <span>{paper.record_class === "controlled_publication" ? "controlled" : "mined"}</span>
                            {frontier ? <span>frontier #{frontier.rank}</span> : null}
                            <span>{humanize(paper.discipline)}</span>
                            <span>{humanize(paper.recommended_disposition)}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </section>
              )) : <div className={styles.empty}>No papers satisfy the current boundary.</div>}
            </div>
          </section>

          <section className={styles.panel}>
            <header>
              <div><span>Provenance boundary</span><h2>Authority and source reservoirs</h2></div>
              <p>Paths identify private Lab provenance or control registries; they are not public source links.</p>
            </header>
            <div className={styles.sourceGrid}>
              {sourceCounts.length ? sourceCounts.map(([path, count]) => (
                <article key={path} title={path}>
                  <strong>{compactPath(path)}</strong>
                  <span>{count} paper reference{count === 1 ? "" : "s"}</span>
                </article>
              )) : <div className={styles.empty}>No provenance reservoirs are visible.</div>}
            </div>
          </section>
        </div>

        <aside className={styles.rightFrame} aria-label="Selected paper object">
          <div className={styles.frameLabel}>Selected paper boundary</div>
          {selected ? (
            <div className={styles.detail}>
              <span className={styles.detailStage}>
                {corpusLabel(selected)} · {stageLabel(selected)}
                {selectedFrontier ? ` · frontier #${selectedFrontier.rank}` : ""}
              </span>
              <h2>{selected.title}</h2>
              <dl>
                <div><dt>Discipline</dt><dd>{humanize(selected.discipline)}</dd></div>
                <div><dt>Field</dt><dd>{humanize(selected.field_group)}</dd></div>
                <div><dt>Domain</dt><dd>{selected.domain}</dd></div>
                <div><dt>Stage</dt><dd>{stageLabel(selected)}</dd></div>
                <div><dt>Readiness</dt><dd>{selected.readiness_hint} / 5</dd></div>
                <div><dt>Status</dt><dd>{humanize(selected.recommended_disposition)}</dd></div>
                {selected.program ? <div><dt>Program</dt><dd>{selected.program}</dd></div> : null}
                {selected.control_rank !== null ? <div><dt>Queue rank</dt><dd>{selected.control_rank}</dd></div> : null}
                <div><dt>Artifact</dt><dd>{selected.artifact_state}</dd></div>
              </dl>

              <section><h3>Claim ceiling</h3><p>{selectedFrontier?.claim_ceiling ?? selected.claim_ceiling}</p></section>
              <section><h3>Prior-art boundary</h3><p>{selected.prior_art_requirement}</p></section>
              <section><h3>Evidence contract</h3><p>{selected.evidence_requirement}</p></section>
              {selected.aliases.length ? (
                <section><h3>Canonical aliases</h3><ul>{selected.aliases.map((alias) => <li key={alias}><code>{alias}</code></li>)}</ul></section>
              ) : null}
              <section><h3>Registry origins</h3><p>{selected.origins.map(humanize).join(" · ")}</p></section>
              {selectedFrontier ? (
                <>
                  <section><h3>Canonical question</h3><p>{selectedFrontier.question}</p></section>
                  <section><h3>Baselines</h3><ul>{selectedFrontier.baselines.map((item) => <li key={item}>{item}</li>)}</ul></section>
                  <section><h3>Measures / examples</h3><ul>{selectedFrontier.measures.map((item) => <li key={item}>{item}</li>)}</ul></section>
                  <section><h3>Failure / subsumption</h3><ul>{selectedFrontier.failure_outcomes.map((item) => <li key={item}>{item}</li>)}</ul></section>
                </>
              ) : null}
              <section><h3>Private Lab provenance</h3><ul>{selected.source_paths.map((path) => <li key={path}><code>{path}</code></li>)}</ul></section>
            </div>
          ) : (
            <p className={styles.detailEmpty}>Select a paper node or card to inspect its canonical identity, control state, claim ceiling, evidence contract, and provenance.</p>
          )}
        </aside>
      </div>

      <footer className={styles.bottomFrame}>
        <span>Public projection only · scientific authority remains in the private Lab · publication promotion requires a human gate</span>
        <span>Source {sourceRevision} · projection {contentHash}</span>
      </footer>
    </main>
  );
}
