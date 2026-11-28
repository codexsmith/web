import Link from "next/link";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import { ReaderSectionNav } from "./ReaderSectionNav";
import { DoctrineLinksSection, doctrineClosingSectionEntries } from "./DoctrineFrontDoor";
import { ReferenceCatalog } from "./ReferenceCatalog";
import { referenceLibrary } from "./content/referenceLibrary";
import readerStyles from "./styles/DoctrineFrontDoor.module.css";
import styles from "./styles/ReferenceLibrary.module.css";

export function ReferenceLibraryPage() {
  return (
    <InstitutionalPageShell mainClassName={readerStyles.surface}>
      <div className={readerStyles.wrap} data-reference-library>
        <section className={`${readerStyles.hero} ${readerStyles.doctrineHero} ${styles.hero}`} data-institutional-hero>
          <Link className={readerStyles.back} href="/observatory">← Observatory</Link>
          <h1>Foundations &amp; Reference Library</h1>
          <div className={readerStyles.headingMeta} data-reader-heading-meta>
            <p className={readerStyles.eyebrow}>Observatory · Reference literature</p>
            <p className={readerStyles.tagline}>The scholarship behind the inquiry</p>
          </div>
          <p className={readerStyles.lead}>Explore reference works across mathematics, computation, information, physics and engineering.</p>
          <p className={readerStyles.support}>A bibliographic collection linking to publishers, author pages, libraries and scholarly indexes. Bibliographic identity is not an endorsement or verification of every claim.</p>
          <p className={styles.editionNotice} data-reference-status>Bibliographic edition · Metadata and external links · {referenceLibrary.length} works</p>
        </section>
        <ReaderSectionNav sections={[{ id: "reader-reference-catalog", label: "Reference works" }, { id: "reader-reference-scope", label: "Scope and corrections" }, ...doctrineClosingSectionEntries("observatory/reference-library")]} />
        <section className={readerStyles.section} aria-labelledby="reader-reference-catalog">
          <h2 id="reader-reference-catalog" tabIndex={-1} data-reader-section-target>Reference works</h2>
          <ReferenceCatalog works={referenceLibrary} />
        </section>
        <section className={readerStyles.section} aria-labelledby="reader-reference-scope">
          <h2 id="reader-reference-scope" tabIndex={-1} data-reader-section-target>Scope and corrections</h2>
          <p className={readerStyles.sectionIntro}>This edition identifies works and provides external locators; it does not host copies of the works. Source access and edition availability vary. The reading pathways and concept atlas require separate source and editorial review.</p>
          <div className={readerStyles.links}>
            <Link className={readerStyles.textLink} href="/observatory/intellectual-lineage">Intellectual lineage</Link>
            <Link className={readerStyles.textLink} href="/contact">Suggest a correction</Link>
            <Link className={readerStyles.textLink} href="/observatory">Return to the Observatory</Link>
          </div>
        </section>
        <DoctrineLinksSection context="observatory/reference-library" />
      </div>
    </InstitutionalPageShell>
  );
}
