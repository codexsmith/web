import type { ReactNode } from "react";
import styles from "./styles/DoctrineFrontDoor.module.css";

/** A page-local editorial sequence, not a canonical research identifier.
 * The ordinal is a redundant visual cue; heading identity and document order
 * remain authoritative for reading and assistive navigation.
 */
export function ReaderChapter({ number, title, body, children, anchorId }: {
  number: number;
  title: string;
  body: string;
  children?: ReactNode;
  anchorId?: string;
}) {
  return (
    <article data-reader-chapter={number}>
      <span className={styles.chapterOrdinal} data-reader-chapter-ordinal aria-hidden="true">
        {String(number).padStart(2, "0")}
      </span>
      <h2 id={anchorId} tabIndex={anchorId ? -1 : undefined} data-reader-section-target={anchorId ? "" : undefined}>{title}</h2>
      <p>{body}</p>
      {children}
    </article>
  );
}
