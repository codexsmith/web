"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type {
  PaperMineCandidate,
  PaperMineFrontierItem,
  PaperMineSnapshot,
} from "@/lib/paper-mine";
import styles from "./paper-mine.module.css";

type ViewState = {
  q: string;
  field: string;
  pass: "all" | "pass1" | "pass2";
  readiness: number;
  disposition: string;
  frontierOnly: boolean;
  paper: string | null;
};

type HistoryMode = "push" | "replace";

const URL_KEYS = ["q", "field", "pass", "readiness", "disposition", "frontier", "paper"];

function defaultViewState(): ViewState {
  return {
    q: "",
    field: "all",
    pass: "all",
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

function candidateSearchText(candidate: PaperMineCandidate, frontier?: PaperMineFrontierItem) {
  return [
    candidate.id,
    candidate.title,
    candidate.field_group,
    candidate.artifact_state,
    candidate.recommended_disposition,
    candidate.claim_ceiling,
    candidate.prior_art_requirement,
    candidate.evidence_requirement,
    candidate.risk,
    frontier?.question,
    ...(candidate.source_paths ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function matchesCandidate(
  candidate: PaperMineCandidate,
  view: ViewState,
  frontierById: Map<string, PaperMineFrontierItem>,
) {
  if (view.q && !candidateSearchText(candidate, frontierById.get(candidate.id)).includes(view.q)) return false;
  if (view.field !== "all" && candidate.field_group !== view.field) return false;
  if (view.pass !== "all" && candidate.pass !== view.pass) return false;
  if (candidate.readiness_hint < view.readiness) return false;
  if (view.disposition !== "all" && candidate.recommended_disposition !== view.disposition) return false;
  if (view.frontierOnly && !frontierById.has(candidate.id)) return false;
  return true;
}

function buildViewFromUrl(
  data: PaperMineSnapshot,
  frontierById: Map<string, PaperMineFrontierItem>,
): ViewState {
  const params = new URLSearchParams(window.location.search);
  const fields = new Set(data.candidates.map((candidate) => candidate.field_group));
  const dispositions = new Set(data.candidates.map((candidate) => candidate.recommended_disposition));
  const requestedPass = params.get("pass");
  const requestedReadiness = Number(params.get("readiness"));
  const requestedPaper = params.get("paper");

  const view: ViewState = {
    q: (params.get("q") ?? "").trim().toLowerCase(),
    field: fields.has(params.get("field") ?? "") ? (params.get("field") as string) : "all",
    pass: requestedPass === "pass1" || requestedPass === "pass2" ? requestedPass : "all",
    readiness: [0, 1, 2, 3, 4, 5].includes(requestedReadiness) ? requestedReadiness : 0,
    disposition: dispositions.has(params.get("disposition") ?? "")
      ? (params.get("disposition") as string)
      : "all",
    frontierOnly: ["1", "true", "yes"].includes((params.get("frontier") ?? "").toLowerCase()),
    paper: requestedPaper && data.candidates.some((candidate) => candidate.id === requestedPaper)
      ? requestedPaper
      : null,
  };

  if (view.paper) {
    const selected = data.candidates.find((candidate) => candidate.id === view.paper);
    if (!selected || !matchesCandidate(selected, view, frontierById)) view.paper = null;
  }

  return view;
}

function writeViewToUrl(view: ViewState, mode: HistoryMode) {
  const url = new URL(window.location.href);
  URL_KEYS.forEach((key) => url.searchParams.delete(key));

  if (view.q) url.searchParams.set("q", view.q);
  if (view.field !== "all") url.searchParams.set("field", view.field);
  if (view.pass !== "all") url.searchParams.set("pass", view.pass);
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
  const candidateById = useMemo(
    () => new Map(data.candidates.map((candidate) => [candidate.id, candidate])),
    [data.candidates],
  );
  const fields = useMemo(
    () => [...new Set(data.candidates.map((candidate) => candidate.field_group))].sort(),
    [data.candidates],
  );
  const dispositions = useMemo(
    () => [...new Set(data.candidates.map((candidate) => candidate.recommended_disposition))].sort(),
    [data.candidates],
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
    const candidate = view.paper ? candidateById.get(view.paper) : undefined;
    document.title = candidate
      ? `${candidate.title} · Paper Mine | Boundary First Labs`
      : "Paper Mine | Boundary First Labs";
  }, [candidateById, view.paper]);

  const visible = useMemo(
    () => data.candidates.filter((candidate) => matchesCandidate(candidate, view, frontierById)),
    [data.candidates, frontierById, view],
  );
  const omittedCount = data.candidates.length - visible.length;
  const selected = view.paper ? candidateById.get(view.paper) : undefined;
  const selectedFrontier = selected ? frontierById.get(selected.id) : undefined;

  const grouped = useMemo(() => {
    const groups = new Map<string, PaperMineCandidate[]>();
    visible.forEach((candidate) => {
      const group = groups.get(candidate.field_group) ?? [];
      group.push(candidate);
      groups.set(candidate.field_group, group);
    });
    return [...groups.entries()]
      .sort(([left], [right]) => humanize(left).localeCompare(humanize(right)))
      .map(([field, candidates]) => [
        field,
        candidates.sort((left, right) => {
          const leftRank = frontierById.get(left.id)?.rank ?? 999;
          const rightRank = frontierById.get(right.id)?.rank ?? 999;
          if (leftRank !== rightRank) return leftRank - rightRank;
          if (left.readiness_hint !== right.readiness_hint) return right.readiness_hint - left.readiness_hint;
          return left.title.localeCompare(right.title);
        }),
      ] as const);
  }, [frontierById, visible]);

  const sourceCounts = useMemo(() => {
    const counts = new Map<string, number>();
    visible.forEach((candidate) => {
      candidate.source_paths.forEach((path) => counts.set(path, (counts.get(path) ?? 0) + 1));
    });
    return [...counts.entries()].sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]));
  }, [visible]);

  const activeBoundary = [
    view.q ? `search “${view.q}”` : null,
    view.field !== "all" ? humanize(view.field) : null,
    view.pass !== "all" ? (view.pass === "pass1" ? "Pass 1" : "Pass 2") : null,
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
      const candidate = candidateById.get(next.paper);
      if (!candidate || !matchesCandidate(candidate, next, frontierById)) next.paper = null;
    }
    commit(next, mode);
  }

  function selectCandidate(candidate: PaperMineCandidate) {
    if (!matchesCandidate(candidate, view, frontierById)) {
      commit({
        ...defaultViewState(),
        field: candidate.field_group,
        pass: candidate.pass,
        frontierOnly: frontierById.has(candidate.id),
        paper: candidate.id,
      });
      return;
    }
    commit({ ...view, paper: candidate.id });
  }

  function resetView() {
    commit(defaultViewState());
  }

  return (
    <main className={styles.shell}>
      <header className={styles.topFrame}>
        <div>
          <div className={styles.eyebrow}>Boundary First Labs · Research · Publication discovery</div>
          <h1>Paper Mine</h1>
          <p>
            A public, bounded projection of paper-shaped research already present in the Lab corpus.
            Discovery is visible here; scientific authority and publication promotion remain elsewhere.
          </p>
        </div>
        <div className={styles.provenanceBlock}>
          <span>Projection snapshot</span>
          <strong>{data.generated_on}</strong>
          <code>{data.source.merge_commit.slice(0, 12)}</code>
        </div>
      </header>

      <section className={styles.boundaryBar} aria-live="polite">
        <div>
          <span>Current boundary</span>
          <strong>{activeBoundary.length ? activeBoundary.join(" · ") : "All public discovery candidates"}</strong>
        </div>
        <div className={styles.boundaryCounts}>
          <span><b>{visible.length}</b> visible</span>
          <span><b>{data.candidate_count}</b> total</span>
          <span><b>{omittedCount}</b> omitted</span>
        </div>
        <div className={omittedCount ? styles.partial : styles.exhaustive}>
          {omittedCount
            ? `Partial projection · ${omittedCount} candidate${omittedCount === 1 ? "" : "s"} outside the active view`
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

          <div className={styles.frameLabel}>Bound the view</div>
          <label>
            Search
            <input
              type="search"
              value={view.q}
              onChange={(event) => changeFilter({ q: event.target.value.trimStart().toLowerCase() }, "replace")}
              placeholder="Title, field, claim, source…"
            />
          </label>
          <label>
            Field
            <select value={view.field} onChange={(event) => changeFilter({ field: event.target.value })}>
              <option value="all">All fields</option>
              {fields.map((field) => <option key={field} value={field}>{humanize(field)}</option>)}
            </select>
          </label>
          <label>
            Discovery pass
            <select
              value={view.pass}
              onChange={(event) => changeFilter({ pass: event.target.value as ViewState["pass"] })}
            >
              <option value="all">All passes</option>
              <option value="pass1">Pass 1 · soft science / philosophy</option>
              <option value="pass2">Pass 2 · philosophy of science / HCI</option>
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
            Disposition
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
            <p>{data.source.projection_note}</p>
            <code>discover → bound → paperize → human gate → queue</code>
          </section>
        </aside>

        <div className={styles.workbench}>
          <section className={styles.metrics} aria-label="Paper Mine metrics">
            <article><strong>{data.candidate_count}</strong><span>discovered questions</span></article>
            <article><strong>{data.frontier.length}</strong><span>paperization frontier</span></article>
            <article><strong>{fields.length}</strong><span>field groups</span></article>
            <article><strong>{data.candidates.filter((candidate) => candidate.readiness_hint >= 3).length}</strong><span>paper-shaped</span></article>
            <article><strong>{data.frontier.filter((item) => item.paperization_state === "materialized").length}</strong><span>materialized packets</span></article>
            <article><strong>{visible.length}</strong><span>visible now</span></article>
          </section>

          <section className={styles.panel}>
            <header>
              <div><span>Paperization leverage</span><h2>Frontier rail</h2></div>
              <p>Rank is a triage sequence, not scientific importance or publication priority.</p>
            </header>
            <div className={styles.frontierRail}>
              {data.frontier.map((item) => {
                const candidate = candidateById.get(item.candidate_id);
                if (!candidate) return null;
                const inView = matchesCandidate(candidate, view, frontierById);
                return (
                  <button
                    key={item.candidate_id}
                    type="button"
                    data-dimmed={inView ? "false" : "true"}
                    data-selected={view.paper === item.candidate_id ? "true" : "false"}
                    onClick={() => selectCandidate(candidate)}
                  >
                    <span>#{item.rank}</span>
                    <strong>{candidate.title}</strong>
                    <small>{humanize(item.paperization_state)}</small>
                  </button>
                );
              })}
            </div>
          </section>

          <section className={styles.panel}>
            <header>
              <div><span>Breadth field</span><h2>Discovered candidate field</h2></div>
              <p>{visible.length} of {data.candidate_count} candidates are inside the current boundary.</p>
            </header>
            <div className={styles.fieldGroups}>
              {grouped.length ? grouped.map(([field, candidates]) => (
                <section key={field} className={styles.fieldGroup}>
                  <div className={styles.fieldGroupHeader}>
                    <h3>{humanize(field)}</h3><span>{candidates.length} visible</span>
                  </div>
                  <div className={styles.cardGrid}>
                    {candidates.map((candidate) => {
                      const frontier = frontierById.get(candidate.id);
                      return (
                        <button
                          type="button"
                          key={candidate.id}
                          className={styles.paperCard}
                          data-frontier={frontier ? "true" : "false"}
                          data-selected={view.paper === candidate.id ? "true" : "false"}
                          onClick={() => selectCandidate(candidate)}
                        >
                          <div className={styles.cardMeta}>
                            <span>{candidate.pass === "pass1" ? "Pass 1" : "Pass 2"}</span>
                            <span>R{candidate.readiness_hint}</span>
                          </div>
                          <h4>{candidate.title}</h4>
                          <p>{frontier?.question ?? candidate.claim_ceiling}</p>
                          <div className={styles.chips}>
                            {frontier ? <span>frontier #{frontier.rank}</span> : null}
                            <span>{humanize(candidate.recommended_disposition)}</span>
                            {candidate.readiness_hint >= 3 ? <span>paper-shaped</span> : null}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </section>
              )) : <div className={styles.empty}>No candidates satisfy the current boundary.</div>}
            </div>
          </section>

          <section className={styles.panel}>
            <header>
              <div><span>Provenance boundary</span><h2>Source reservoirs</h2></div>
              <p>Paths identify private Lab provenance; they are not public source links.</p>
            </header>
            <div className={styles.sourceGrid}>
              {sourceCounts.length ? sourceCounts.map(([path, count]) => (
                <article key={path} title={path}>
                  <strong>{compactPath(path)}</strong>
                  <span>{count} candidate reference{count === 1 ? "" : "s"}</span>
                </article>
              )) : <div className={styles.empty}>No source reservoirs are visible.</div>}
            </div>
          </section>
        </div>

        <aside className={styles.rightFrame} aria-label="Selected paper candidate">
          <div className={styles.frameLabel}>Selected object boundary</div>
          {selected ? (
            <div className={styles.detail}>
              <span className={styles.detailStage}>
                {selected.pass === "pass1" ? "Pass 1" : "Pass 2"}
                {selectedFrontier ? ` · frontier #${selectedFrontier.rank}` : " · discovered"}
              </span>
              <h2>{selected.title}</h2>
              <dl>
                <div><dt>Field</dt><dd>{humanize(selected.field_group)}</dd></div>
                <div><dt>Readiness</dt><dd>{selected.readiness_hint} / 5</dd></div>
                <div><dt>Disposition</dt><dd>{humanize(selected.recommended_disposition)}</dd></div>
                <div><dt>Artifact state</dt><dd>{selected.artifact_state}</dd></div>
              </dl>

              <section><h3>Claim ceiling</h3><p>{selectedFrontier?.claim_ceiling ?? selected.claim_ceiling}</p></section>
              <section><h3>Prior-art boundary</h3><p>{selected.prior_art_requirement}</p></section>
              <section><h3>Evidence contract</h3><p>{selected.evidence_requirement}</p></section>
              {selectedFrontier ? (
                <>
                  <section><h3>Canonical question</h3><p>{selectedFrontier.question}</p></section>
                  <section><h3>Baselines</h3><ul>{selectedFrontier.baselines.map((item) => <li key={item}>{item}</li>)}</ul></section>
                  <section><h3>Measures</h3><ul>{selectedFrontier.measures.map((item) => <li key={item}>{item}</li>)}</ul></section>
                  <section><h3>Failure / subsumption</h3><ul>{selectedFrontier.failure_outcomes.map((item) => <li key={item}>{item}</li>)}</ul></section>
                </>
              ) : null}
              <section><h3>Private Lab provenance</h3><ul>{selected.source_paths.map((path) => <li key={path}><code>{path}</code></li>)}</ul></section>
            </div>
          ) : (
            <p className={styles.detailEmpty}>Select a frontier node or candidate card to inspect its research boundary.</p>
          )}
        </aside>
      </div>

      <footer className={styles.bottomFrame}>
        <span>Public projection only · queue insertion false · scientific authority remains in the Lab · human gate required</span>
        <span>Source commit {data.source.merge_commit.slice(0, 12)}</span>
      </footer>
    </main>
  );
}
