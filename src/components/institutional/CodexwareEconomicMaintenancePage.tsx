import Link from "next/link";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import { ReaderSectionNav } from "./ReaderSectionNav";
import { doctrineClosingSectionEntries, DoctrineLinksSection, InstrumentCollectionLink } from "./DoctrineFrontDoor";
import { doctrineFrontDoor as content } from "./content/doctrineFrontDoor";
import styles from "./styles/DoctrineFrontDoor.module.css";

export function CodexwareEconomicMaintenancePage() {
  const e = content.economicMaintenance;
  return (
    <InstitutionalPageShell mainClassName={styles.surface}>
      <div className={styles.wrap}>
        <section className={`${styles.hero} ${styles.doctrineHero}`} data-institutional-hero>
          <Link className={styles.back} href="/codexware">Back to Codexware</Link>
          <h1>{e.name}</h1><div className={styles.headingMeta} data-reader-heading-meta><p className={styles.eyebrow}>{e.eyebrow}</p><p className={styles.tagline}>{e.tagline}</p></div>
          <p className={styles.lead}>{e.lead}</p><p className={styles.support}>{e.support}</p>
        </section>
        <ReaderSectionNav sections={[{ id: "reader-economic-status", label: "Research status" }, { id: "reader-economic-topics", label: "Research topics" }, { id: "reader-economic-cases", label: "Cases" }, { id: "reader-economic-method", label: "Research method" }, { id: "reader-explore", label: "Explore the work" }, { id: "reader-instruments", label: "Instruments" }, ...doctrineClosingSectionEntries("codexware/economic-maintenance")]} />
        <section className={styles.section} data-economic-status><p id="reader-economic-status" tabIndex={-1} data-reader-section-target className={styles.eyebrow}>Research status</p><p className={styles.sectionIntro}>{e.status}</p></section>
        <section className={styles.section} data-economic-topics><h2 id="reader-economic-topics" tabIndex={-1} data-reader-section-target>{e.topicsHeading}</h2><div className={styles.pathGrid} data-reader-collection="reference">{e.topics.map(item => <article className={styles.pathCard} key={item.id}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></section>
        <section className={styles.section} data-economic-cases><h2 id="reader-economic-cases" tabIndex={-1} data-reader-section-target>{e.casesHeading}</h2><p className={styles.sectionIntro}>{e.casesIntro}</p><div className={styles.pathGrid} data-reader-collection="cases">{e.cases.map(item => <article className={styles.pathCard} key={item.id} data-economic-case={item.id}><p className={styles.workStatus} data-case-status>{item.status}</p><h3>{item.title}</h3><p>{item.body}</p><p className={styles.smallPrint} data-case-limit>{item.limit}</p></article>)}</div></section>
        <section className={styles.section} data-economic-method><h2 id="reader-economic-method" tabIndex={-1} data-reader-section-target>{e.methodHeading}</h2><p className={styles.sectionIntro}>{e.methodIntro}</p><ol className={styles.workSteps} data-reader-collection="sequence">{e.method.map((item,i) => <li key={item.title}><span className={styles.num}>{String(i+1).padStart(2,"0")}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></li>)}</ol></section>
        <blockquote className={styles.principle}>{e.principle}</blockquote>
        <section className={styles.section}><h2 id="reader-explore" tabIndex={-1} data-reader-section-target>Explore the work</h2><nav className={styles.links} aria-label="Economic Maintenance reading paths">{e.links.map(item => <Link className={styles.textLink} key={item.href} href={item.href}>{item.label} →</Link>)}</nav></section>
        <InstrumentCollectionLink context="codexware/economic-maintenance" />
        <DoctrineLinksSection context="codexware/economic-maintenance" />
      </div>
    </InstitutionalPageShell>
  );
}
