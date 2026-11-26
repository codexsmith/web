import Link from "next/link";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import { DoctrineLinksSection, InstrumentCollectionLink } from "./DoctrineFrontDoor";
import { doctrineFrontDoor as content } from "./content/doctrineFrontDoor";
import styles from "./styles/DoctrineFrontDoor.module.css";

export function CodexwareEconomicMaintenancePage() {
  const e = content.economicMaintenance;
  return (
    <InstitutionalPageShell mainClassName={styles.surface}>
      <div className={styles.wrap}>
        <section className={`${styles.hero} ${styles.doctrineHero}`} data-institutional-hero>
          <Link className={styles.back} href="/codexware">Back to Codexware</Link>
          <p className={styles.eyebrow}>{e.eyebrow}</p><h1>{e.name}</h1><p className={styles.tagline}>{e.tagline}</p>
          <p className={styles.lead}>{e.lead}</p><p className={styles.support}>{e.support}</p>
        </section>
        <section className={styles.section} data-economic-status><p className={styles.eyebrow}>Research status</p><p className={styles.sectionIntro}>{e.status}</p></section>
        <section className={styles.section} data-economic-topics><h2>{e.topicsHeading}</h2><div className={styles.pathGrid}>{e.topics.map(item => <article className={styles.pathCard} key={item.id}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></section>
        <section className={styles.section} data-economic-cases><h2>{e.casesHeading}</h2><p className={styles.sectionIntro}>{e.casesIntro}</p><div className={styles.pathGrid}>{e.cases.map(item => <article className={styles.pathCard} key={item.id} data-economic-case={item.id}><p className={styles.workStatus} data-case-status>{item.status}</p><h3>{item.title}</h3><p>{item.body}</p><p className={styles.smallPrint} data-case-limit>{item.limit}</p></article>)}</div></section>
        <section className={styles.section} data-economic-method><h2>{e.methodHeading}</h2><p className={styles.sectionIntro}>{e.methodIntro}</p><ol className={styles.workSteps}>{e.method.map((item,i) => <li key={item.title}><span className={styles.num}>{String(i+1).padStart(2,"0")}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></li>)}</ol></section>
        <blockquote className={styles.principle}>{e.principle}</blockquote>
        <section className={styles.section}><h2>Explore the work.</h2><nav className={styles.links} aria-label="Economic Maintenance reading paths">{e.links.map(item => <Link className={styles.textLink} key={item.href} href={item.href}>{item.label} →</Link>)}</nav></section>
        <InstrumentCollectionLink context="codexware/economic-maintenance" />
        <DoctrineLinksSection context="codexware/economic-maintenance" />
      </div>
    </InstitutionalPageShell>
  );
}
