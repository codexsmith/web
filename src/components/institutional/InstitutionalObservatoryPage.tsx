import Link from "next/link";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import { ReaderSectionNav } from "./ReaderSectionNav";
import { ReaderScientificFigure } from "./ReaderScientificFigure";
import { ReaderMastheadField } from "./ReaderMastheadField";
import { doctrineClosingSectionEntries, DoctrineLinksSection, InstrumentCollectionLink, AudiencePathways } from "./DoctrineFrontDoor";
import { observatoryExhibit as exhibit } from "./content/observatory";
import { doctrineFrontDoor } from "./content/doctrineFrontDoor";
import styles from "./styles/DoctrineFrontDoor.module.css";

export function InstitutionalObservatoryPage() {
  return (
    <InstitutionalPageShell>
      <div className={styles.surface}>
        <div className={styles.wrap} data-observatory-reader>
          <section className={`${styles.hero} ${styles.doctrineHero}`} data-institutional-hero>
            <h1>{exhibit.name}</h1>
            <div className={styles.headingMeta} data-reader-heading-meta><p className={styles.eyebrow}>{exhibit.eyebrow}</p>
            <p className={styles.tagline}>{exhibit.tagline}</p></div>
            <p className={styles.lead}>{exhibit.lead}</p>
            <p className={styles.support}>{exhibit.support}</p>
            <ReaderMastheadField kind="observation" />
          </section>
        <ReaderSectionNav sections={[{ id: "audience-observatory", label: "Find your starting point" }, { id: "reader-exhibits", label: "Research exhibits" }, { id: "reader-foundations", label: "Intellectual foundations" }, { id: "reader-architecture", label: "Research architecture" }, { id: "reader-research", label: "Research directions" }, { id: "reader-method", label: "Research method" }, { id: "reader-evidence", label: "Evidence & claim status" }, { id: "reader-demonstration", label: "Demonstration" }, { id: "reader-release", label: "Public release" }, { id: "reader-instruments", label: "Instruments" }, ...doctrineClosingSectionEntries("observatory")]} />
          <AudiencePathways context="observatory" />
          <div data-observatory-exhibit="public">
            <section className={styles.section} data-observatory-gallery>
              <h2 id="reader-exhibits" tabIndex={-1} data-reader-section-target>Four research exhibits</h2>
              <div className={styles.pathGrid} data-reader-collection="directory">{doctrineFrontDoor.observatoryExhibits.map(item => <article className={styles.pathCard} key={item.slug} data-exhibit-card={item.slug}><div data-reader-path-identity><h3>{item.name}</h3><p className={styles.workStatus} data-exhibit-directory-label>{item.directoryLabel}</p></div><div data-reader-path-content><p>{item.tagline}</p><Link className={styles.textLink} href={`/${item.slug}`} aria-label={`Explore exhibit: ${item.name}`}>Explore exhibit <span aria-hidden="true">→</span></Link></div></article>)}</div>
            </section>
            <section className={styles.section} data-observatory-section="foundations">
              <h2 id="reader-foundations" tabIndex={-1} data-reader-section-target>{exhibit.foundationsHeading}</h2>
              <div className={styles.headingMeta} data-reader-heading-meta><p className={styles.sectionIntro}>{exhibit.foundationsIntro}</p></div>
              <details className={styles.readerDetails} data-reader-detail="foundations"><summary>Read the five foundations</summary><div className={styles.pathGrid} data-reader-collection="reference">{exhibit.foundations.map(item => <article className={styles.pathCard} key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></details>
            </section>
            <section className={styles.section} data-observatory-section="architecture">
              <h2 id="reader-architecture" tabIndex={-1} data-reader-section-target>{exhibit.architectureHeading}</h2>
              <div className={styles.headingMeta} data-reader-heading-meta><p className={styles.sectionIntro}>{exhibit.architectureIntro}</p></div>
              <details className={styles.readerDetails} data-reader-detail="architecture"><summary>Read the five functional layers</summary><ol className={styles.exhibitLayers} data-reader-collection="sequence">{exhibit.architecture.map((item, index) => <li key={item.title}><span className={styles.num}>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></li>)}</ol></details>
              <p className={styles.smallPrint}>{exhibit.architectureNote}</p>
            </section>
            <section className={styles.section} data-observatory-section="research">
              <h2 id="reader-research" tabIndex={-1} data-reader-section-target>{exhibit.researchHeading}</h2>
              <div className={styles.headingMeta} data-reader-heading-meta><p className={styles.sectionIntro}>{exhibit.researchIntro}</p></div>
              <div className={styles.pathGrid} data-reader-collection="reference">{exhibit.research.map(item => <article className={styles.pathCard} key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
            </section>
            <section className={styles.section} data-observatory-section="method">
              <h2 id="reader-method" tabIndex={-1} data-reader-section-target>{exhibit.methodHeading}</h2>
              <div className={styles.headingMeta} data-reader-heading-meta><p className={styles.sectionIntro}>{exhibit.methodIntro}</p></div>
              <details className={styles.readerDetails} data-reader-detail="method"><summary>Read the four research steps</summary><ol className={styles.workSteps} data-reader-collection="sequence">{exhibit.method.map((item, index) => <li key={item.title}><span className={styles.num}>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></li>)}</ol></details>
            </section>
            <section className={styles.section} data-observatory-section="evidence">
              <h2 id="reader-evidence" tabIndex={-1} data-reader-section-target>{exhibit.evidenceHeading}</h2>
              <div className={styles.headingMeta} data-reader-heading-meta><p className={styles.sectionIntro}>{exhibit.evidenceIntro}</p></div>
              <details className={styles.readerDetails} data-reader-detail="evidence"><summary>Read the seven status definitions</summary><div className={styles.pathGrid} data-reader-collection="reference">{exhibit.evidence.map(item => <article className={styles.pathCard} key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></details>
            </section>
            <section className={styles.section} data-observatory-section="demonstration">
              <h2 id="reader-demonstration" tabIndex={-1} data-reader-section-target>{exhibit.exhibit.title}</h2>
              <div className={styles.headingMeta} data-reader-heading-meta><p className={styles.eyebrow}>{exhibit.exhibit.eyebrow}</p><p className={styles.sectionIntro}>{exhibit.exhibit.intro}</p></div>
              <div className={styles.pathGrid} data-reader-collection="cases">{exhibit.exhibit.cases.map(item => <article className={styles.pathCard} key={item.label}><p className={styles.workStatus}>{item.label}</p><h3>{item.display}</h3><p>{item.detail}</p></article>)}</div>
              <ReaderScientificFigure kind="outcome" number={1} />
              <p className={styles.exhibitTakeaway}>{exhibit.exhibit.takeaway}</p><p className={styles.smallPrint}>{exhibit.exhibit.limit}</p>
            </section>
            <section className={styles.section} data-observatory-section="release">
              <h2 id="reader-release" tabIndex={-1} data-reader-section-target>{exhibit.releaseHeading}</h2>
              <div className={styles.headingMeta} data-reader-heading-meta><p className={styles.sectionIntro}>{exhibit.releaseBody}</p></div><p className={styles.smallPrint}>{exhibit.releaseNote}</p>
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
