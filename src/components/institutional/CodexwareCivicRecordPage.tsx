import Link from "next/link";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import { ReaderSectionNav } from "./ReaderSectionNav";
import { doctrineClosingSectionEntries, DoctrineLinksSection, InstrumentCollectionLink } from "./DoctrineFrontDoor";
import { doctrineFrontDoor as content } from "./content/doctrineFrontDoor";
import styles from "./styles/DoctrineFrontDoor.module.css";

export function CodexwareCivicRecordPage() {
  const c = content.civicRecord;
  return (
    <InstitutionalPageShell mainClassName={styles.surface}>
      <div className={styles.wrap}>
        <section className={`${styles.hero} ${styles.doctrineHero}`} data-institutional-hero>
          <Link className={styles.back} href="/codexware">Back to Codexware</Link>
          <h1>{c.name}</h1><div className={styles.headingMeta} data-reader-heading-meta><p className={styles.eyebrow}>{c.eyebrow}</p><p className={styles.tagline}>{c.tagline}</p></div>
          <p className={styles.lead}>{c.lead}</p><p className={styles.support}>{c.support}</p>
        </section>
        <ReaderSectionNav sections={[{ id: "reader-civic-status", label: "Development status" }, { id: "reader-civic-commitments", label: "Design commitments" }, { id: "reader-civic-cases", label: "Intended uses" }, { id: "reader-civic-boundary", label: "Boundaries" }, { id: "reader-explore", label: "Explore the work" }, { id: "reader-instruments", label: "Instruments" }, ...doctrineClosingSectionEntries("codexware/civic-record")]} />
        <section className={styles.section} data-civic-status><p id="reader-civic-status" tabIndex={-1} data-reader-section-target className={styles.eyebrow}>Development status</p><p className={styles.sectionIntro}>{c.status}</p></section>
        <section className={styles.section} data-civic-commitments><h2 id="reader-civic-commitments" tabIndex={-1} data-reader-section-target>{c.commitmentsHeading}</h2><div className={styles.pathGrid} data-reader-collection="reference">{c.commitments.map(x=><article className={styles.pathCard} key={x.title}><h3>{x.title}</h3><p>{x.body}</p></article>)}</div></section>
        <section className={styles.section} data-civic-cases><h2 id="reader-civic-cases" tabIndex={-1} data-reader-section-target>{c.casesHeading}</h2><div className={styles.pathGrid} data-reader-collection="cases">{c.cases.map(x=><article className={styles.pathCard} data-civic-case={x.id} key={x.id}><p className={styles.workStatus}>Illustrative intended use</p><h3>{x.title}</h3><p>{x.body}</p></article>)}</div><p className={styles.smallPrint} data-civic-case-limit>{c.caseNote}</p></section>
        <section className={styles.section} data-civic-boundary><h2 id="reader-civic-boundary" tabIndex={-1} data-reader-section-target>{c.boundaryHeading}</h2><div className={styles.pathGrid} data-reader-collection="reference">{c.boundaries.map(x=><article className={styles.pathCard} key={x.title}><h3>{x.title}</h3><p>{x.body}</p></article>)}</div></section>
        <blockquote className={styles.principle}>{c.principle}</blockquote>
        <section className={styles.section}><h2 id="reader-explore" tabIndex={-1} data-reader-section-target>Explore the work</h2><nav className={styles.links} aria-label="Civic Record reading paths">{c.links.map(x=><Link className={styles.textLink} key={x.href} href={x.href}>{x.label} →</Link>)}</nav></section>
        <InstrumentCollectionLink context="codexware/civic-record" />
        <DoctrineLinksSection context="codexware/civic-record" />
      </div>
    </InstitutionalPageShell>
  );
}
