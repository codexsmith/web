import Link from "next/link";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import { ReaderScientificFigure, demonstrationFigureByTitle } from "./ReaderScientificFigure";
import { ReaderChapter } from "./ReaderChapter";
import { DoctrineLinksSection, InstrumentCollectionLink } from "./DoctrineFrontDoor";
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
          <p className={styles.eyebrow}>{exhibit.eyebrow}</p><h1>{exhibit.name}</h1>
          <p className={styles.tagline}>{exhibit.tagline}</p><p className={styles.lead}>{exhibit.lead}</p><p className={styles.support}>{exhibit.support}</p>
        </section>
        <section className={styles.section} data-exhibit-body>
          <div className={styles.reading}><div>{exhibit.sections.map((item, index) => {
            const figureKind = slug === "observatory/demonstrations" ? demonstrationFigureByTitle[item.title] : undefined;
            return <ReaderChapter key={item.title} number={index + 1} title={item.title} body={item.body}>{figureKind && <ReaderScientificFigure kind={figureKind} number={index + 1} />}</ReaderChapter>;
          })}</div><aside className={styles.example} data-exhibit-limit><p className={styles.eyebrow}>Scope and limitations</p><h2>What this establishes.</h2><p>{exhibit.limit}</p></aside></div>
        </section>
        <section className={styles.section} data-exhibit-comparison><h2>{exhibit.keyHeading}</h2><div className={styles.pathGrid}>{exhibit.cards.map(item => <article className={styles.pathCard} key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></section>
        <section className={styles.section} data-exhibit-references><h2>Public reading paths.</h2><p className={styles.sectionIntro}>These references establish context and attribution, not proof of an unpublished result.</p><div className={styles.links}>{exhibit.sources.map(item => <a className={styles.textLink} href={item.sourceUrl} key={item.sourceUrl}>{item.label} ↗</a>)}</div><Link className={styles.textLink} href="/observatory">Return to Observatory →</Link></section>
        {(slug === "observatory/demonstrations" || slug === "observatory/research-architecture") && <InstrumentCollectionLink context={slug} />}
        <DoctrineLinksSection context={slug} />
      </div>
    </InstitutionalPageShell>
  );
}
