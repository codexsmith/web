import Link from "next/link";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import { ReaderScientificFigure } from "./ReaderScientificFigure";
import { ReaderMastheadField } from "./ReaderMastheadField";
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
            <h1>{exhibit.name}</h1>
            <div className={styles.headingMeta} data-reader-heading-meta><p className={styles.eyebrow}>{exhibit.eyebrow}</p>
            <p className={styles.tagline}>{exhibit.tagline}</p></div>
            <p className={styles.lead}>{exhibit.lead}</p>
            <p className={styles.support}>{exhibit.support}</p>
            <ReaderMastheadField kind="observation" />
          </section>
          <AudiencePathways context="observatory" />
          <div data-observatory-exhibit="public">
            <section className={styles.section} data-observatory-gallery>
              <h2>Four ways to understand the work.</h2><div className={styles.headingMeta} data-reader-heading-meta><p className={styles.eyebrow}>Explore the exhibits</p></div>
              <div className={styles.pathGrid}>{doctrineFrontDoor.observatoryExhibits.map(item => <article className={styles.pathCard} key={item.slug} data-exhibit-card={item.slug}><p className={styles.workStatus}>{item.eyebrow}</p><h3>{item.name}</h3><p>{item.tagline}</p><Link className={styles.textLink} href={`/${item.slug}`} aria-label={`Explore exhibit: ${item.name}`}>Explore exhibit <span aria-hidden="true">→</span></Link></article>)}</div>
            </section>
            <section className={styles.section} data-observatory-section="foundations">
              <h2>{exhibit.foundationsHeading}</h2>
              <div className={styles.headingMeta} data-reader-heading-meta><p className={styles.eyebrow}>Intellectual foundations</p><p className={styles.sectionIntro}>{exhibit.foundationsIntro}</p></div>
              <details className={styles.readerDetails} data-reader-detail="foundations"><summary>Read the five intellectual foundations</summary><div className={styles.pathGrid}>{exhibit.foundations.map(item => <article className={styles.pathCard} key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></details>
            </section>
            <section className={styles.section} data-observatory-section="architecture">
              <h2>{exhibit.architectureHeading}</h2>
              <div className={styles.headingMeta} data-reader-heading-meta><p className={styles.eyebrow}>Functional architecture</p><p className={styles.sectionIntro}>{exhibit.architectureIntro}</p></div>
              <details className={styles.readerDetails} data-reader-detail="architecture"><summary>Read the five functional layers</summary><ol className={styles.exhibitLayers}>{exhibit.architecture.map((item, index) => <li key={item.title}><span className={styles.num}>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></li>)}</ol></details>
              <p className={styles.smallPrint}>{exhibit.architectureNote}</p>
            </section>
            <section className={styles.section} data-observatory-section="research">
              <h2>{exhibit.researchHeading}</h2>
              <div className={styles.headingMeta} data-reader-heading-meta><p className={styles.eyebrow}>Research directions</p><p className={styles.sectionIntro}>{exhibit.researchIntro}</p></div>
              <div className={styles.pathGrid}>{exhibit.research.map(item => <article className={styles.pathCard} key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
            </section>
            <section className={styles.section} data-observatory-section="method">
              <h2>{exhibit.methodHeading}</h2>
              <div className={styles.headingMeta} data-reader-heading-meta><p className={styles.eyebrow}>Research practice</p><p className={styles.sectionIntro}>{exhibit.methodIntro}</p></div>
              <details className={styles.readerDetails} data-reader-detail="method"><summary>Read the four research steps</summary><ol className={styles.workSteps}>{exhibit.method.map((item, index) => <li key={item.title}><span className={styles.num}>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></li>)}</ol></details>
            </section>
            <section className={styles.section} data-observatory-section="evidence">
              <h2>{exhibit.evidenceHeading}</h2>
              <div className={styles.headingMeta} data-reader-heading-meta><p className={styles.eyebrow}>Evidence and claim status</p><p className={styles.sectionIntro}>{exhibit.evidenceIntro}</p></div>
              <details className={styles.readerDetails} data-reader-detail="evidence"><summary>Read the seven status definitions</summary><div className={styles.pathGrid}>{exhibit.evidence.map(item => <article className={styles.pathCard} key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></details>
            </section>
            <section className={styles.section} data-observatory-section="demonstration">
              <h2>{exhibit.exhibit.title}</h2>
              <div className={styles.headingMeta} data-reader-heading-meta><p className={styles.eyebrow}>{exhibit.exhibit.eyebrow}</p><p className={styles.sectionIntro}>{exhibit.exhibit.intro}</p></div>
              <div className={styles.pathGrid}>{exhibit.exhibit.cases.map(item => <article className={styles.pathCard} key={item.label}><p className={styles.workStatus}>{item.label}</p><h3>{item.display}</h3><p>{item.detail}</p></article>)}</div>
              <ReaderScientificFigure kind="outcome" number={1} />
              <p className={styles.exhibitTakeaway}>{exhibit.exhibit.takeaway}</p><p className={styles.smallPrint}>{exhibit.exhibit.limit}</p>
            </section>
            <section className={styles.section} data-observatory-section="release">
              <h2>{exhibit.releaseHeading}</h2>
              <div className={styles.headingMeta} data-reader-heading-meta><p className={styles.eyebrow}>Public exhibits and release boundary</p><p className={styles.sectionIntro}>{exhibit.releaseBody}</p></div><p className={styles.smallPrint}>{exhibit.releaseNote}</p>
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
