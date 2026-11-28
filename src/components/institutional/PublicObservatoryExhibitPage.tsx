import Link from "next/link";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import { ReaderSectionNav } from "./ReaderSectionNav";
import { chapterSectionEntries } from "./content/readerSectionNavigation";
import { ReaderScientificFigure, demonstrationFigureByTitle } from "./ReaderScientificFigure";
import { ReaderChapter } from "./ReaderChapter";
import { doctrineClosingSectionEntries, DoctrineLinksSection, InstrumentCollectionLink } from "./DoctrineFrontDoor";
import { doctrineFrontDoor as content } from "./content/doctrineFrontDoor";
import styles from "./styles/DoctrineFrontDoor.module.css";

type Exhibit = (typeof content.observatoryExhibits)[number];

export function PublicObservatoryExhibitPage({ slug }: { slug: Exhibit["slug"] }) {
  const exhibit = content.observatoryExhibits.find(item => item.slug === slug)!;
  return (
    <InstitutionalPageShell mainClassName={styles.surface}>
      <div className={styles.wrap} data-reader-heritage={slug === "observatory/intellectual-lineage" ? "lineage-exhibit" : undefined}>
        <section className={`${styles.hero} ${styles.doctrineHero}`} data-institutional-hero>
          <Link className={styles.back} href="/observatory">Back to Observatory</Link>
          <h1>{exhibit.name}</h1><div className={styles.headingMeta} data-reader-heading-meta><p className={styles.eyebrow}>{exhibit.eyebrow}</p>
          <p className={styles.tagline}>{exhibit.tagline}</p></div><p className={styles.lead}>{exhibit.lead}</p><p className={styles.support}>{exhibit.support}</p>
        </section>
        <ReaderSectionNav sections={[...chapterSectionEntries(exhibit.sections), { id: "reader-exhibit-comparison", label: exhibit.keyHeading }, { id: "reader-exhibit-references", label: "Public reading paths" }, ...(slug === "observatory/demonstrations" || slug === "observatory/research-architecture" ? [{ id: "reader-instruments", label: "Instruments" }] : []), ...doctrineClosingSectionEntries(slug)]} />
        <section className={styles.section} data-exhibit-body>
          <div className={styles.reading}><div>{exhibit.sections.map((item, index) => {
            const figureKind = slug === "observatory/demonstrations" ? demonstrationFigureByTitle[item.title] : undefined;
            return <ReaderChapter key={item.title} number={index + 1} title={item.title} body={item.body} anchorId={item.anchorId}>{figureKind && <ReaderScientificFigure kind={figureKind} number={index + 1} />}</ReaderChapter>;
          })}</div><aside className={styles.example} data-exhibit-limit><h2>What this establishes</h2><div className={styles.headingMeta} data-reader-heading-meta><p className={styles.eyebrow}>Scope and limitations</p></div><p>{exhibit.limit}</p></aside></div>
        </section>
        <section className={styles.section} data-exhibit-comparison><h2 id="reader-exhibit-comparison" tabIndex={-1} data-reader-section-target>{exhibit.keyHeading}</h2><div className={styles.pathGrid}>{exhibit.cards.map(item => <article className={styles.pathCard} key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></section>
        <section className={styles.section} data-exhibit-references><h2 id="reader-exhibit-references" tabIndex={-1} data-reader-section-target>Public reading paths</h2><p className={styles.sectionIntro}>These references establish context and attribution, not proof of an unpublished result.</p><div className={styles.links}>{exhibit.sources.map(item => <a className={styles.textLink} href={item.sourceUrl} key={item.sourceUrl}>{item.label} ↗</a>)}</div><Link className={styles.textLink} href="/observatory">Return to Observatory →</Link></section>
        {(slug === "observatory/demonstrations" || slug === "observatory/research-architecture") && <InstrumentCollectionLink context={slug} />}
        <DoctrineLinksSection context={slug} />
      </div>
    </InstitutionalPageShell>
  );
}
