import Link from "next/link";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import { DoctrineLinksSection, InstrumentCollectionLink, AudiencePathways } from "./DoctrineFrontDoor";
import { observatoryExhibit as exhibit } from "./content/observatory";
import { doctrineFrontDoor } from "./content/doctrineFrontDoor";
import styles from "./styles/DoctrineFrontDoor.module.css";

export function InstitutionalObservatoryPage() {
  return (
    <InstitutionalPageShell>
      <div className={styles.surface}>
        <div className={styles.wrap}>
          <section className={`${styles.hero} ${styles.doctrineHero}`} data-institutional-hero>
            <p className={styles.eyebrow}>{exhibit.eyebrow}</p>
            <h1>{exhibit.name}</h1>
            <p className={styles.tagline}>{exhibit.tagline}</p>
            <p className={styles.lead}>{exhibit.lead}</p>
            <p className={styles.support}>{exhibit.support}</p>
          </section>
          <AudiencePathways context="observatory" />
          <div data-observatory-exhibit="public">
            <section className={styles.section} data-observatory-gallery>
              <p className={styles.eyebrow}>Explore the exhibits</p><h2>Four ways to understand the work.</h2>
              <div className={styles.pathGrid}>{doctrineFrontDoor.observatoryExhibits.map(item => <article className={styles.pathCard} key={item.slug} data-exhibit-card={item.slug}><p className={styles.workStatus}>{item.eyebrow}</p><h3>{item.name}</h3><p>{item.tagline}</p><Link className={styles.textLink} href={`/${item.slug}`}>Explore exhibit <span aria-hidden="true">→</span></Link></article>)}</div>
            </section>
            <section className={styles.section} data-observatory-section="foundations">
              <p className={styles.eyebrow}>Intellectual foundations</p>
              <h2>{exhibit.foundationsHeading}</h2><p className={styles.sectionIntro}>{exhibit.foundationsIntro}</p>
              <details className={styles.readerDetails} data-reader-detail="foundations"><summary>Read the five intellectual foundations</summary><div className={styles.pathGrid}>{exhibit.foundations.map(item => <article className={styles.pathCard} key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></details>
            </section>
            <section className={styles.section} data-observatory-section="architecture">
              <p className={styles.eyebrow}>Functional architecture</p>
              <h2>{exhibit.architectureHeading}</h2><p className={styles.sectionIntro}>{exhibit.architectureIntro}</p>
              <details className={styles.readerDetails} data-reader-detail="architecture"><summary>Read the five functional layers</summary><ol className={styles.exhibitLayers}>{exhibit.architecture.map((item, index) => <li key={item.title}><span className={styles.num}>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></li>)}</ol></details>
              <p className={styles.smallPrint}>{exhibit.architectureNote}</p>
            </section>
            <section className={styles.section} data-observatory-section="research">
              <p className={styles.eyebrow}>Research directions</p>
              <h2>{exhibit.researchHeading}</h2><p className={styles.sectionIntro}>{exhibit.researchIntro}</p>
              <div className={styles.pathGrid}>{exhibit.research.map(item => <article className={styles.pathCard} key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
            </section>
            <section className={styles.section} data-observatory-section="method">
              <p className={styles.eyebrow}>Research practice</p>
              <h2>{exhibit.methodHeading}</h2><p className={styles.sectionIntro}>{exhibit.methodIntro}</p>
              <details className={styles.readerDetails} data-reader-detail="method"><summary>Read the four research steps</summary><ol className={styles.workSteps}>{exhibit.method.map((item, index) => <li key={item.title}><span className={styles.num}>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></li>)}</ol></details>
            </section>
            <section className={styles.section} data-observatory-section="evidence">
              <p className={styles.eyebrow}>Evidence and claim status</p>
              <h2>{exhibit.evidenceHeading}</h2><p className={styles.sectionIntro}>{exhibit.evidenceIntro}</p>
              <details className={styles.readerDetails} data-reader-detail="evidence"><summary>Read the seven status definitions</summary><div className={styles.pathGrid}>{exhibit.evidence.map(item => <article className={styles.pathCard} key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></details>
            </section>
            <section className={styles.section} data-observatory-section="demonstration">
              <p className={styles.eyebrow}>{exhibit.exhibit.eyebrow}</p>
              <h2>{exhibit.exhibit.title}</h2><p className={styles.sectionIntro}>{exhibit.exhibit.intro}</p>
              <div className={styles.pathGrid}>{exhibit.exhibit.cases.map(item => <article className={styles.pathCard} key={item.label}><p className={styles.workStatus}>{item.label}</p><h3>{item.display}</h3><p>{item.detail}</p></article>)}</div>
              <p className={styles.exhibitTakeaway}>{exhibit.exhibit.takeaway}</p><p className={styles.smallPrint}>{exhibit.exhibit.limit}</p>
            </section>
            <section className={styles.section} data-observatory-section="release">
              <p className={styles.eyebrow}>Public exhibits and release boundary</p>
              <h2>{exhibit.releaseHeading}</h2><p className={styles.sectionIntro}>{exhibit.releaseBody}</p><p className={styles.smallPrint}>{exhibit.releaseNote}</p>
              <nav className={styles.links} aria-label="Explore the public institution">{exhibit.links.map(item => <Link className={styles.textLink} key={item.href} href={item.href}>{item.label} <span aria-hidden="true">→</span></Link>)}</nav>
            </section>
          </div>
          <InstrumentCollectionLink context="observatory" />
          <DoctrineLinksSection context="observatory" />
        </div>
      </div>
    </InstitutionalPageShell>
  );
}
