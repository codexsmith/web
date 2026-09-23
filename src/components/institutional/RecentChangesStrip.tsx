import Link from "next/link";
import type { PublicChange } from "./content/changes";
import styles from "./styles/RecentChangesStrip.module.css";

export function RecentChangesStrip({
  changes,
  title = "What changed?",
  compact = false,
}: {
  changes: readonly PublicChange[];
  title?: string;
  compact?: boolean;
}) {
  return (
    <section
      className={styles.strip}
      data-compact={compact ? "true" : "false"}
      aria-label="Recent material changes"
    >
      <header className={styles.header}>
        <div>
          <span>RECENT DELTA</span>
          <strong>{title}</strong>
        </div>
        <Link href="/changes">See all changes <span aria-hidden="true">→</span></Link>
      </header>

      <div className={styles.items}>
        {changes.map((change) => (
          <article className={styles.item} data-scope={change.scope} key={change.id}>
            <div className={styles.topline}>
              <span>{change.scope}</span>
              <time dateTime={change.date}>{change.date}</time>
            </div>
            <strong>{change.title}</strong>
            {!compact ? <p>{change.consequence}</p> : null}
            {change.surfaceHref ? (
              <Link href={change.surfaceHref}>Open affected surface <span aria-hidden="true">→</span></Link>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
