import Link from "next/link";
import now from "@/generated/lab-public-state/candidates/PUBLIC_NOW.json";
import changes from "@/generated/lab-public-state/candidates/PUBLIC_CHANGES.json";
import research from "@/generated/lab-public-state/research-refresh-candidate.json";
import manifest from "@/generated/lab-public-state/candidates/PROJECTION_MANIFEST.json";
import { changesProjection } from "./content/changes";
import styles from "./styles/PublicStateReviewPreview.module.css";

type View = "now" | "changes" | "observatory";

const views = {
  now: { eyebrow: "NOW · DRAFT SOURCE PROJECTION", title: "A bounded update to current work.", description: "These are proposed current priorities; unfinished work has not been promoted into the change archive." },
  changes: { eyebrow: "WHAT CHANGED · DRAFT SOURCE PROJECTION", title: "Material transitions under editorial review.", description: "These records cite existing canonical commits. Publication approval remains separate from the fact that a commit was merged." },
  observatory: { eyebrow: "OBSERVATORY · DRAFT SOURCE PROJECTION", title: "Inspect the three views without changing their owners.", description: "A source-locked summary of current priorities, durable changes and candidate research. It is not a live feed, source registry or independent scientific verification." },
} as const;

export function PublicStateReviewPreview({ view }: { view: View }) {
  const headingId = "source-state-preview-" + view;
  const copy = views[view];
  return (
    <section className={styles.section} data-public-state-review={view} aria-labelledby={headingId}>
      <header className={styles.header}>
        <p className={styles.kicker}>{copy.eyebrow}</p>
        <h2 id={headingId}>{copy.title}</h2>
        <p>{copy.description}</p>
        <div className={styles.metadata}>
          <span>Cutoff: <time dateTime={manifest.cutoffDate}>{manifest.cutoffDate}</time></span>
          <span>Lab revision: <code>{manifest.sourceRevision.slice(0, 12)}</code></span>
          <span>Review: {manifest.review.publicationApproval}</span>
        </div>
      </header>

      {view === "now" && (
        <div className={styles.cardGrid}>
          {now.lanes.map(lane => (
            <article className={styles.card} key={lane.id}>
              <div className={styles.topline}><span>{lane.priority}</span><span>{lane.maturity}</span></div>
              <h3>{lane.title}</h3>
              <p>{lane.summary}</p>
              <dl>
                <div><dt>WORK IN SCOPE</dt><dd>{lane.work}</dd></div>
                <div><dt>CLOSURE GATE</dt><dd>{lane.closureCriterion}</dd></div>
                <div><dt>OWNER SOURCE</dt><dd>{lane.sourceId} · <code>{lane.sourceRevision.slice(0, 12)}</code></dd></div>
              </dl>
              <Link href={lane.publicHref}>Public context <span aria-hidden="true">→</span></Link>
            </article>
          ))}
        </div>
      )}

      {view === "changes" && (
        <div className={styles.cardGrid}>
          {changes.events.map(event => (
            <article className={styles.card} key={event.id}>
              <div className={styles.topline}><span>{event.scope}</span><time dateTime={event.date}>{event.date}</time></div>
              <h3>{event.title}</h3>
              <p>{event.change}</p>
              <dl>
                <div><dt>WHAT IT CHANGED</dt><dd>{event.consequence}</dd></div>
                <div><dt>CLAIM CEILING</dt><dd>{event.claimCeiling}</dd></div>
                <div><dt>SOURCE COMMIT</dt><dd>{event.sourceRepository} · <code>{event.sourceRevision.slice(0, 12)}</code></dd></div>
              </dl>
              <Link href={event.publicHref}>Public context <span aria-hidden="true">→</span></Link>
            </article>
          ))}
        </div>
      )}

      {view === "observatory" && (
        <div className={styles.cardGrid}>
          <article className={styles.card}>
            <div className={styles.topline}><span>ACTIVE STATE</span><span>NOW</span></div>
            <h3>{now.lanes.length} shortlisted priorities</h3>
            <p>{now.lanes.filter(lane => lane.priority === "NOW").length} current and {now.lanes.filter(lane => lane.priority === "NEXT").length} next; each retains an owner, a closure condition and an unfinished-work ceiling.</p>
            <Link href="/now">Inspect current work <span aria-hidden="true">→</span></Link>
          </article>
          <article className={styles.card}>
            <div className={styles.topline}><span>CANONICAL DELTAS</span><span>WHAT CHANGED</span></div>
            <h3>{changes.events.length} proposed archive additions</h3>
            <p>Selected changes occurred in canonical Git revisions; they do not certify new theories or include work still under review.</p>
            <Link href="/changes">Inspect change records <span aria-hidden="true">→</span></Link>
          </article>
          <article className={styles.card}>
            <div className={styles.topline}><span>CLAIM BOUNDARIES</span><span>RESEARCH</span></div>
            <h3>{research.items.length} research summaries</h3>
            <p>Source IDs, precise maturities and limitations are shown; the owning Lab corpus, not the Observatory, retains the research record.</p>
            <Link href="/research">Inspect research candidates <span aria-hidden="true">→</span></Link>
          </article>
        </div>
      )}

      <footer className={styles.footer}>
        <strong>Candidate projection; editorial publication not approved.</strong>
        <p>All three candidate views refer to Lab revision <code>{manifest.sourceRevision.slice(0, 12)}</code>. The existing reviewed What Changed archive below remains a distinct manual snapshot dated {changesProjection.generatedDate}. No private source files, live status automation or machine authority are exposed by this preview.</p>
      </footer>
    </section>
  );
}
