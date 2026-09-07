import type { Metadata } from "next";
import { BoundedStandaloneSurface } from "@/components/bounded-standalone-surface";
import { researchLog } from "@/lib/research-log";
import styles from "./research-log.module.css";

export const metadata: Metadata = {
  title: "Research Log",
  description:
    "What changed in Boundary First Labs: a governed public projection of research events, experiments, proof steps, methods, and research infrastructure.",
  alternates: {
    canonical: "/research/log",
    types: {
      "application/rss+xml": "/research/log/rss.xml",
    },
  },
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

export default function ResearchLogPage() {
  return (
    <BoundedStandaloneSurface
      parentNodeId="research"
      sectionTheme="research"
      showSiblingNavigation={false}
      focus={{
        id: "research-log",
        label: "Research Log",
        path: "research/log",
        kind: "research",
        eyebrow: "Observable research activity",
        summary:
          "A bounded public projection of what changed in the Lab, backed by governed research events rather than a separate blog corpus.",
      }}
    >
      <main className={styles.log}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>FROM THE WORKBENCH</p>
          <h1>Research Log</h1>
          <p className={styles.lede}>{researchLog.description}</p>
          <div className={styles.actions}>
            <a className={styles.feedLink} href="/research/log/rss.xml">
              Subscribe via RSS
            </a>
            <span className={styles.generated}>
              Projection generated {formatDate(researchLog.generated_at)}
            </span>
          </div>
          <p className={styles.authority}>{researchLog.authority_note}</p>
        </header>

        <section className={styles.entries} aria-label="Research log entries">
          {researchLog.entries.map((entry) => (
            <article className={styles.entry} id={entry.entry_id} key={entry.entry_id}>
              <div className={styles.entryTopline}>
                <span>{entry.section}</span>
                <time dateTime={entry.occurred_at}>{formatDate(entry.occurred_at)}</time>
              </div>
              <h2>{entry.title}</h2>
              <p className={styles.summary}>{entry.summary}</p>
              <dl className={styles.facts}>
                <div>
                  <dt>Status</dt>
                  <dd>{entry.status_label}</dd>
                </div>
                <div>
                  <dt>Source events</dt>
                  <dd>{entry.source_event_count}</dd>
                </div>
              </dl>
              <p className={styles.ceiling}>
                <strong>Claim ceiling:</strong> {entry.claim_ceiling}
              </p>
              <div className={styles.tags} aria-label="Tags">
                {entry.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </section>
      </main>
    </BoundedStandaloneSurface>
  );
}
