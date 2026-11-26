import Link from "next/link";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import { DoctrineLinksSection } from "./DoctrineFrontDoor";
import { PublicInstrumentControls } from "./PublicInstrumentControls";
import { doctrineFrontDoor as content } from "./content/doctrineFrontDoor";
import styles from "./styles/DoctrineFrontDoor.module.css";

export function PublicInstrumentCollection() {
  const c=content.instruments;
  return <InstitutionalPageShell mainClassName={styles.surface}><div className={styles.wrap}>
    <section className={`${styles.hero} ${styles.doctrineHero}`} data-institutional-hero>
      <Link className={styles.back} href="/observatory">Back to Observatory</Link>
      <p className={styles.eyebrow}>{c.eyebrow}</p><h1>{c.name}</h1><p className={styles.tagline}>{c.tagline}</p><p className={styles.lead}>{c.lead}</p><p className={styles.support}>{c.support}</p>
    </section>
    <PublicInstrumentControls />
    <DoctrineLinksSection context="observatory/instruments" />
  </div></InstitutionalPageShell>;
}
