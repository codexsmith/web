import Link from "next/link";
import { mayRenderPublicStateProjection } from "./content/publicProjectionRelease";
import digest from "@/generated/lab-public-state/research-refresh-candidate.json";
import styles from "./styles/ResearchRefreshPreview.module.css";

export function ResearchRefreshPreview() {
  if (!mayRenderPublicStateProjection()) return null;
  return (
    <section className={styles.section} aria-labelledby="research-refresh-title">
      <header className={styles.header}>
        <p className={styles.kicker}>SOURCE-GOVERNED RESEARCH REVIEW · CANDIDATE</p>
        <h2 id="research-refresh-title">Recent research, with its limits attached.</h2>
        <p>This editorial preview summarizes selected canonical Lab records. It is not a public-source release or a declaration of verified new mathematical results.</p>
        <div className={styles.meta}>
          <span>Record cutoff: <time dateTime={digest.cutoffDate}>{digest.cutoffDate}</time></span>
          <span>Lab revision: <code>{digest.sourceRevision.slice(0, 12)}</code></span>
          <span>Publication approval: pending</span>
        </div>
      </header>
      <div className={styles.grid}>
        {digest.items.map(item => (
          <article className={styles.card} key={item.id}>
            <div className={styles.topline}><span>{item.scope}</span><time dateTime={item.date}>{item.date}</time></div>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
            <dl>
              <div><dt>MATURITY</dt><dd>{item.status}</dd></div>
              <div><dt>CLAIM CEILING</dt><dd>{item.limitation}</dd></div>
              <div><dt>SOURCE ID / REVISION</dt><dd><code>{item.sourceId}</code> · <code>{item.sourceRevision.slice(0, 12)}</code> (private Lab record)</dd></div>
            </dl>
            <Link href={item.surfaceHref}>Explore the public research context <span aria-hidden="true">→</span></Link>
          </article>
        ))}
      </div>
      <p className={styles.footnote}>Private source objects are identified without public source-download links. Source owners retain scientific and publication authority; this is a review-ready projection only.</p>
    </section>
  );
}
