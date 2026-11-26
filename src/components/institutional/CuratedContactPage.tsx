import Link from "next/link";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import { InquiryDraftComposer } from "./InquiryDraftComposer";
import { doctrineFrontDoor as content } from "./content/doctrineFrontDoor";
import type { InquiryTypeId } from "./content/contact";
import styles from "./styles/DoctrineFrontDoor.module.css";
export function CuratedContactPage({initialType}: {initialType: InquiryTypeId}) {
  const ct = content.contactDraft;
  return <InstitutionalPageShell mainClassName={styles.surface}>
    <div className={styles.wrap}>
      <section className={`${styles.hero} ${styles.doctrineHero}`} data-institutional-hero>
        <p className={styles.eyebrow}>Contact</p><h1>Start with what brought you here.</h1><p className={styles.lead}>{ct.lead}</p>
        <p className={styles.support}>A direct email is enough. Sending is separate from preparing a local draft.</p>
      </section>
    </div>
    <InquiryDraftComposer initialType={initialType} />
    <div className={styles.wrap}><section className={styles.section}><Link className={styles.textLink} href="/work-with-us">Return to Work With Us</Link><blockquote className={styles.principle}>{ct.closing}</blockquote></section></div>
  </InstitutionalPageShell>;
}
