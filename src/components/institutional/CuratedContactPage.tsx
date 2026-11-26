import Link from "next/link";
import { PUBLIC_CONTACT_EMAIL, PUBLIC_CONTACT_MAILTO } from "@/lib/site-contact";
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
        <p className={styles.support}>A direct email is enough. No form or category is required.</p>
        <div className={styles.links} data-direct-contact><a className={styles.textLink} href={PUBLIC_CONTACT_MAILTO}>{PUBLIC_CONTACT_EMAIL}</a></div>
      </section>
    </div>
    <InquiryDraftComposer initialType={initialType} />
    <div className={styles.wrap}><section className={styles.section}><Link className={styles.textLink} href="/work-with-us">Return to Work With Us</Link><blockquote className={styles.principle}>{ct.closing}</blockquote></section></div>
  </InstitutionalPageShell>;
}
