"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "./founder-provenance-timeline.module.css";

export type EvidenceClass = {
  name: string;
  meaning: string;
  allowed_use?: string;
};

export type ProvenanceEntity = {
  id: string;
  name: string;
  type: string;
  short_name?: string;
};

export type ProvenancePhase = {
  id: string;
  name: string;
  order: number;
};

export type ProvenanceEvent = {
  id: string;
  phase_id: string;
  title: string;
  date?: {
    precision?: string | null;
    start?: string | null;
    end?: string | null;
    label?: string | null;
    checkpoint?: string | null;
    unresolved?: boolean;
  };
  evidence?: string[];
  status?: string;
  summary?: string;
  entity_ids?: string[];
  sources?: string[];
  source_ids?: string[];
  source?: string;
  verification_tasks?: string[];
  [key: string]: unknown;
};

export type RecoveryTask = {
  id?: string;
  task: string;
  status?: string;
};

export type FounderProvenanceTimelineData = {
  schema_version?: string;
  projection_of?: string;
  artifact: {
    title: string;
    authority_status?: string;
    artifact_lifecycle?: string;
    operational_status?: string;
    publication_status?: string;
    source_class?: string;
    version?: string;
    date?: string;
    claim_posture?: string;
  };
  purpose: string;
  governing_rules: string[];
  evidence_classes: Record<string, EvidenceClass>;
  entities: ProvenanceEntity[];
  phases: ProvenancePhase[];
  timeline: ProvenanceEvent[];
  historical_edges?: Array<Record<string, unknown>>;
  current_best_rgt_reconstruction?: Record<string, unknown>;
  lineage_map?: Record<string, unknown>;
  source_register?: Record<string, unknown>;
  recovery_queue?: Record<string, RecoveryTask[]>;
  update_rules?: string[];
};

const EVENT_CORE_KEYS = new Set([
  "id",
  "phase_id",
  "title",
  "date",
  "evidence",
  "status",
  "summary",
  "entity_ids",
  "sources",
  "source_ids",
  "source",
  "verification_tasks",
]);

function asStrings(value: unknown): string[] {
  if (value === null || value === undefined || value === "") return [];
  if (Array.isArray(value)) return value.flatMap(asStrings);
  if (typeof value === "object") {
    return Object.entries(value as Record<string, unknown>).map(
      ([key, item]) => `${humanize(key)}: ${scalar(item)}`,
    );
  }
  return [scalar(value)];
}

function scalar(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) return value.map(scalar).filter(Boolean).join(" · ");
  if (typeof value === "object") {
    return Object.entries(value as Record<string, unknown>)
      .map(([key, item]) => `${humanize(key)}: ${scalar(item)}`)
      .join(" · ");
  }
  return String(value);
}

function flatten(value: unknown): string[] {
  if (value === null || value === undefined) return [];
  if (Array.isArray(value)) return value.flatMap(flatten);
  if (typeof value === "object") return Object.values(value as Record<string, unknown>).flatMap(flatten);
  return [String(value)];
}

function humanize(value: string) {
  return value.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function eventIsOpen(event: ProvenanceEvent) {
  const status = (event.status ?? "").toLowerCase();
  return Boolean(
    event.date?.unresolved ||
      event.evidence?.includes("OPEN") ||
      event.verification_tasks?.length ||
      status.includes("open") ||
      status.includes("unrecovered"),
  );
}

function eventDate(event: ProvenanceEvent) {
  if (event.date?.label) return event.date.label;
  if (event.date?.start && event.date?.end && event.date.start !== event.date.end) {
    return `${event.date.start} → ${event.date.end}`;
  }
  return event.date?.start ?? event.date?.checkpoint ?? "Undated";
}

function eventContext(event: ProvenanceEvent) {
  return Object.entries(event)
    .filter(([key, value]) => !EVENT_CORE_KEYS.has(key) && asStrings(value).length > 0)
    .map(([key, value]) => ({ title: humanize(key), items: asStrings(value) }));
}

function shortPhaseName(name: string) {
  const words = name.split(" ");
  return words.length > 5 ? `${words.slice(0, 5).join(" ")}…` : name;
}

function StructuredList({ value }: { value: unknown }) {
  if (value === null || value === undefined) return null;

  if (Array.isArray(value)) {
    return (
      <ul className={styles.compactList}>
        {value.map((item, index) => (
          <li key={index}>{typeof item === "object" ? <StructuredList value={item} /> : scalar(item)}</li>
        ))}
      </ul>
    );
  }

  if (typeof value === "object") {
    return (
      <div className={styles.structuredGrid}>
        {Object.entries(value as Record<string, unknown>).map(([key, item]) => (
          <section key={key} className={styles.structuredBlock}>
            <h4>{humanize(key)}</h4>
            <StructuredList value={item} />
          </section>
        ))}
      </div>
    );
  }

  return <p>{scalar(value)}</p>;
}

export function FounderProvenanceTimeline({ data }: { data: FounderProvenanceTimelineData }) {
  const phases = useMemo(
    () => [...data.phases].sort((a, b) => a.order - b.order),
    [data.phases],
  );
  const entityMap = useMemo(
    () => new Map(data.entities.map((entity) => [entity.id, entity])),
    [data.entities],
  );
  const [query, setQuery] = useState("");
  const [evidenceFilter, setEvidenceFilter] = useState<string[]>([]);
  const [entityFilter, setEntityFilter] = useState<string[]>([]);
  const [openOnly, setOpenOnly] = useState(false);
  const [openPhaseId, setOpenPhaseId] = useState<string | null>(phases[0]?.id ?? null);
  const [openEventId, setOpenEventId] = useState<string | null>(null);

  const filteredEvents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return data.timeline.filter((event) => {
      if (openOnly && !eventIsOpen(event)) return false;
      if (evidenceFilter.length && !event.evidence?.some((code) => evidenceFilter.includes(code))) return false;
      if (entityFilter.length && !event.entity_ids?.some((id) => entityFilter.includes(id))) return false;
      if (normalizedQuery && !flatten(event).join(" ").toLowerCase().includes(normalizedQuery)) return false;
      return true;
    });
  }, [data.timeline, entityFilter, evidenceFilter, openOnly, query]);

  const eventsByPhase = useMemo(() => {
    const groups = new Map<string, ProvenanceEvent[]>();
    for (const event of filteredEvents) {
      const group = groups.get(event.phase_id) ?? [];
      group.push(event);
      groups.set(event.phase_id, group);
    }
    return groups;
  }, [filteredEvents]);

  const entityCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const event of data.timeline) {
      for (const id of event.entity_ids ?? []) counts.set(id, (counts.get(id) ?? 0) + 1);
    }
    return counts;
  }, [data.timeline]);

  function resetExpandedDetail() {
    setOpenEventId(null);
  }

  function toggleEvidence(code: string) {
    setEvidenceFilter((current) =>
      current.includes(code) ? current.filter((item) => item !== code) : [...current, code],
    );
    resetExpandedDetail();
  }

  function toggleEntity(id: string) {
    setEntityFilter((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
    resetExpandedDetail();
  }

  function clearLenses() {
    setQuery("");
    setEvidenceFilter([]);
    setEntityFilter([]);
    setOpenOnly(false);
    setOpenEventId(null);
    setOpenPhaseId(phases[0]?.id ?? null);
  }

  function openPhase(phaseId: string) {
    const next = openPhaseId === phaseId ? null : phaseId;
    setOpenPhaseId(next);
    setOpenEventId(null);
    if (next) {
      window.requestAnimationFrame(() => {
        document.getElementById(next)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }

  const visibleOpenCount = filteredEvents.filter(eventIsOpen).length;
  const totalOpenCount = data.timeline.filter(eventIsOpen).length;
  const activeLensCount = evidenceFilter.length + entityFilter.length + (openOnly ? 1 : 0) + (query.trim() ? 1 : 0);
  const linkedEntities = data.entities
    .filter((entity) => (entityCounts.get(entity.id) ?? 0) > 0)
    .sort((a, b) => (entityCounts.get(b.id) ?? 0) - (entityCounts.get(a.id) ?? 0));

  const phaseButtons = phases.map((phase, index) => {
    const count = eventsByPhase.get(phase.id)?.length ?? 0;
    return (
      <button
        key={phase.id}
        type="button"
        disabled={!count}
        className={openPhaseId === phase.id ? styles.phaseRibbonActive : ""}
        onClick={() => openPhase(phase.id)}
        aria-current={openPhaseId === phase.id ? "step" : undefined}
      >
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span className={styles.phaseButtonLabel}>{shortPhaseName(phase.name)}</span>
        <small>{count}</small>
      </button>
    );
  });

  return (
    <div className={styles.root}>
      <header className={styles.topBoundary}>
        <div className={styles.identityBlock}>
          <Link className={styles.backLink} href="/about/provenance">← About / Provenance</Link>
          <p className={styles.eyebrow}>Boundary First Labs · Web projection</p>
          <h1>{data.artifact.title}</h1>
          <p className={styles.subhead}>{data.artifact.claim_posture}</p>
        </div>
        <label className={styles.searchControl}>
          <span className="sr-only">Search timeline</span>
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setOpenEventId(null);
            }}
            placeholder="Search the timeline…"
          />
          <small aria-live="polite">{filteredEvents.length} visible · {visibleOpenCount} open</small>
        </label>
      </header>

      <details className={styles.boundaryAccordion}>
        <summary>
          <span>Timeline lenses</span>
          <small>{activeLensCount ? `${activeLensCount} active` : "filter without leaving the chronology"}</small>
        </summary>
        <div className={styles.lensGrid}>
          <section>
            <h3>Evidence</h3>
            <div className={styles.chipRow}>
              {Object.entries(data.evidence_classes).map(([code, definition]) => (
                <button
                  key={code}
                  type="button"
                  className={`${styles.chip} ${evidenceFilter.includes(code) ? styles.chipActive : ""}`}
                  onClick={() => toggleEvidence(code)}
                  title={definition.meaning}
                  aria-pressed={evidenceFilter.includes(code)}
                >
                  {code} · {definition.name}
                </button>
              ))}
            </div>
          </section>
          <section>
            <h3>Status</h3>
            <label className={styles.switchRow}>
              <input
                type="checkbox"
                checked={openOnly}
                onChange={(event) => {
                  setOpenOnly(event.target.checked);
                  setOpenEventId(null);
                }}
              />
              <span>Show unresolved / open chronology only</span>
            </label>
            {activeLensCount ? (
              <button className={styles.resetButton} type="button" onClick={clearLenses}>Reset all lenses</button>
            ) : null}
          </section>
          <section className={styles.entityLens}>
            <h3>Entity lens</h3>
            <div className={styles.chipRow}>
              {linkedEntities.map((entity) => (
                <button
                  key={entity.id}
                  type="button"
                  className={`${styles.chip} ${entityFilter.includes(entity.id) ? styles.chipActive : ""}`}
                  onClick={() => toggleEntity(entity.id)}
                  aria-pressed={entityFilter.includes(entity.id)}
                >
                  {entity.name} <span>{entityCounts.get(entity.id)}</span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </details>

      <div className={styles.bodyFrame}>
        <aside className={styles.leftBoundary} aria-label="Timeline boundary map">
          <div className={styles.boundarySectionLabel}>Boundary map</div>
          <nav className={styles.verticalPhaseNav} aria-label="Timeline phases">
            {phaseButtons}
          </nav>
          <div className={styles.leftBoundaryFooter}>
            <strong>{filteredEvents.length}</strong>
            <span>events inside current lens</span>
          </div>
        </aside>

        <div className={styles.centerBoundary}>
          <nav className={styles.phaseRibbon} aria-label="Timeline phases">
            {phaseButtons}
          </nav>

          <main className={styles.main}>
            <section className={styles.timelineStage}>
              <header className={styles.timelineHeading}>
                <div>
                  <p className={styles.eyebrow}>Central object</p>
                  <h2>Chronology</h2>
                </div>
                <p>Phases compress the long arc. Events expand only where detail is needed.</p>
              </header>

              <div className={styles.timeline}>
                {filteredEvents.length ? phases.map((phase, phaseIndex) => {
                  const events = eventsByPhase.get(phase.id) ?? [];
                  if (!events.length) return null;
                  const isOpen = openPhaseId === phase.id;
                  const phaseOpenCount = events.filter(eventIsOpen).length;
                  const evidenceCodes = [...new Set(events.flatMap((event) => event.evidence ?? []))];

                  return (
                    <section key={phase.id} id={phase.id} className={styles.phase}>
                      <button
                        type="button"
                        className={styles.phaseSummary}
                        onClick={() => openPhase(phase.id)}
                        aria-expanded={isOpen}
                        aria-controls={`${phase.id}-events`}
                      >
                        <span className={styles.phaseIndex}>PHASE {String(phaseIndex + 1).padStart(2, "0")}</span>
                        <span className={styles.phaseNode} aria-hidden="true" />
                        <span className={styles.phaseCopy}>
                          <strong>{phase.name}</strong>
                          <small>{events.length} events · {phaseOpenCount} open · {evidenceCodes.join(" / ")}</small>
                        </span>
                        <span className={styles.disclosure} aria-hidden="true">{isOpen ? "−" : "+"}</span>
                      </button>

                      {isOpen ? (
                        <div id={`${phase.id}-events`} className={styles.phaseEvents}>
                          {events.map((event) => {
                            const eventOpen = openEventId === event.id;
                            const context = eventContext(event);
                            const entityNames = (event.entity_ids ?? []).map((id) => entityMap.get(id)?.name ?? id);
                            const sources = [
                              ...(event.sources ?? []),
                              ...(event.source_ids ?? []),
                              ...(event.source ? [event.source] : []),
                            ];

                            return (
                              <article key={event.id} className={styles.event}>
                                <button
                                  type="button"
                                  className={styles.eventSummary}
                                  onClick={() => setOpenEventId(eventOpen ? null : event.id)}
                                  aria-expanded={eventOpen}
                                  aria-controls={`${event.id}-detail`}
                                >
                                  <span className={styles.eventDate}>{eventDate(event)}</span>
                                  <span className={styles.eventNode} aria-hidden="true" />
                                  <span className={styles.eventCopy}>
                                    <strong>{event.title}</strong>
                                    {event.summary ? <small>{event.summary}</small> : null}
                                  </span>
                                  <span className={styles.eventFlags}>
                                    {(event.evidence ?? []).slice(0, 4).map((code) => (
                                      <span key={code} className={styles.evidencePill}>{code}</span>
                                    ))}
                                    {eventIsOpen(event) ? <span className={styles.openPill}>open</span> : null}
                                  </span>
                                </button>

                                {eventOpen ? (
                                  <div id={`${event.id}-detail`} className={styles.eventDetail}>
                                    <span className={styles.detailRail} aria-hidden="true" />
                                    <div className={styles.eventDetailBody}>
                                      {event.summary ? <p>{event.summary}</p> : null}
                                      {entityNames.length ? (
                                        <div className={styles.chipRow}>
                                          {entityNames.map((name) => <span key={name} className={styles.contextChip}>{name}</span>)}
                                        </div>
                                      ) : null}

                                      {context.length ? (
                                        <details className={styles.eventAttachment}>
                                          <summary>Context <span>{context.reduce((sum, section) => sum + section.items.length, 0)}</span></summary>
                                          <div className={styles.eventAttachmentBody}>
                                            {context.map((section) => (
                                              <section key={section.title}>
                                                <h4>{section.title}</h4>
                                                <ul className={styles.compactList}>
                                                  {section.items.map((item, index) => <li key={index}>{item}</li>)}
                                                </ul>
                                              </section>
                                            ))}
                                          </div>
                                        </details>
                                      ) : null}

                                      {sources.length ? (
                                        <details className={styles.eventAttachment}>
                                          <summary>Evidence & sources <span>{sources.length}</span></summary>
                                          <div className={styles.eventAttachmentBody}>
                                            <div className={styles.chipRow}>
                                              {(event.evidence ?? []).map((code) => <span key={code} className={styles.evidencePill}>{code}</span>)}
                                            </div>
                                            <div className={styles.sourceList}>
                                              {sources.map((source, index) => <code key={index}>{source}</code>)}
                                            </div>
                                          </div>
                                        </details>
                                      ) : null}

                                      {event.verification_tasks?.length ? (
                                        <details className={styles.eventAttachment}>
                                          <summary>Open verification <span>{event.verification_tasks.length}</span></summary>
                                          <div className={styles.eventAttachmentBody}>
                                            <ul className={styles.compactList}>
                                              {event.verification_tasks.map((task, index) => <li key={index}>{task}</li>)}
                                            </ul>
                                          </div>
                                        </details>
                                      ) : null}
                                    </div>
                                  </div>
                                ) : null}
                              </article>
                            );
                          })}
                        </div>
                      ) : null}
                    </section>
                  );
                }) : <div className={styles.noResults}>No timeline events match the active lenses.</div>}
              </div>
            </section>

            <section className={styles.attachments} aria-label="Timeline attachments">
              <details className={styles.boundaryAccordion}>
                <summary><span>Provenance contract</span><small>what this timeline may and may not claim</small></summary>
                <div className={styles.attachmentGrid}>
                  <section>
                    <h3>Artifact state</h3>
                    <div className={styles.chipRow}>
                      <span className={styles.contextChip}>authority: {data.artifact.authority_status ?? "unknown"}</span>
                      <span className={styles.contextChip}>publication: {data.artifact.publication_status ?? "unknown"}</span>
                      <span className={styles.contextChip}>version: {data.artifact.version ?? "n/a"}</span>
                    </div>
                    <p>{data.purpose}</p>
                    {data.projection_of ? <p className={styles.projectionNote}>Web projection of <code>{data.projection_of}</code>. The Lab artifact remains the provenance source of truth.</p> : null}
                  </section>
                  <section>
                    <h3>Governing rules</h3>
                    <ul className={styles.compactList}>{data.governing_rules.map((rule) => <li key={rule}>{rule}</li>)}</ul>
                  </section>
                </div>
              </details>

              {data.current_best_rgt_reconstruction ? (
                <details className={styles.boundaryAccordion}>
                  <summary><span>Historical transition model</span><small>continuity without forced synonymy</small></summary>
                  <div className={styles.attachmentBody}><StructuredList value={data.current_best_rgt_reconstruction} /></div>
                </details>
              ) : null}

              {data.recovery_queue ? (
                <details className={styles.boundaryAccordion}>
                  <summary><span>Open recovery queue</span><small>gaps hanging off the chronology</small></summary>
                  <div className={styles.attachmentBody}><StructuredList value={data.recovery_queue} /></div>
                </details>
              ) : null}

              {data.lineage_map ? (
                <details className={styles.boundaryAccordion}>
                  <summary><span>Lineage snapshot</span><small>relations derived from the chronology</small></summary>
                  <div className={styles.attachmentBody}><StructuredList value={data.lineage_map} /></div>
                </details>
              ) : null}

              {data.source_register ? (
                <details className={styles.boundaryAccordion}>
                  <summary><span>Source register</span><small>supporting surfaces behind the events</small></summary>
                  <div className={styles.attachmentBody}><StructuredList value={data.source_register} /></div>
                </details>
              ) : null}
            </section>
          </main>
        </div>

        <aside className={styles.rightBoundary} aria-label="Evidence and provenance boundary">
          <section className={styles.rightBoundarySection}>
            <div className={styles.boundarySectionLabel}>Evidence classes</div>
            <div className={styles.evidenceLegend}>
              {Object.entries(data.evidence_classes).map(([code, definition]) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => toggleEvidence(code)}
                  className={evidenceFilter.includes(code) ? styles.evidenceLegendActive : ""}
                  aria-pressed={evidenceFilter.includes(code)}
                  title={definition.meaning}
                >
                  <strong>{code}</strong>
                  <span>{definition.name}</span>
                </button>
              ))}
            </div>
          </section>

          <section className={styles.rightBoundarySection}>
            <div className={styles.boundarySectionLabel}>Authority</div>
            <dl className={styles.boundaryFacts}>
              <div><dt>State</dt><dd>{data.artifact.authority_status ?? "unknown"}</dd></div>
              <div><dt>Publication</dt><dd>{data.artifact.publication_status ?? "unknown"}</dd></div>
              <div><dt>Version</dt><dd>{data.artifact.version ?? "n/a"}</dd></div>
              <div><dt>Open</dt><dd>{totalOpenCount}</dd></div>
            </dl>
          </section>

          <section className={styles.rightBoundarySection}>
            <div className={styles.boundarySectionLabel}>Active lens</div>
            <p className={styles.boundaryLensSummary}>
              {activeLensCount ? `${activeLensCount} constraints applied to the chronology.` : "Unconstrained chronology."}
            </p>
            {activeLensCount ? (
              <button className={styles.resetButton} type="button" onClick={clearLenses}>Reset all lenses</button>
            ) : null}
          </section>
        </aside>
      </div>

      <footer className={styles.bottomBoundary}>
        <span><strong>Projection</strong> web surface</span>
        <span><strong>Authority</strong> {data.artifact.authority_status ?? "unknown"}</span>
        <span><strong>Visible</strong> {filteredEvents.length} / {data.timeline.length} events</span>
        <span><strong>Open work</strong> {visibleOpenCount} visible · {totalOpenCount} total</span>
        <span className={styles.bottomBoundarySource}><strong>Source of truth</strong> Lab chronology</span>
      </footer>
    </div>
  );
}