"use client";

import { useEffect, useRef } from "react";
import { PUBLIC_CONTACT_EMAIL, PUBLIC_CONTACT_MAILTO } from "@/lib/site-contact";
import { doctrineFrontDoor as content } from "./content/doctrineFrontDoor";
import { mountInquiryDraft } from "./inquiryDraftRuntime";
import type { InquiryTypeId } from "./content/contact";
import styles from "./styles/DoctrineFrontDoor.module.css";

export function InquiryDraftComposer({ initialType }: { initialType: InquiryTypeId }) {
  const root = useRef<HTMLElement>(null);
  const ct = content.contactDraft;
  const category = ct.initialMap[initialType] ?? "general";
  useEffect(() => { if (root.current) return mountInquiryDraft(root.current); }, []);
  return <div className={styles.surface}><div className={styles.wrap}>
    <section ref={root} className={styles.section} data-inquiry-composer>
      <p className={styles.eyebrow}>Optional inquiry draft</p><h2>{ct.name}</h2>
      <p className={styles.sectionIntro}>{ct.lead}</p><p className={styles.smallPrint} data-draft-boundary>{ct.notice}</p>
      <div className={styles.inquiryDraft}>
        <label htmlFor="bfl-inquiry-category">I’m interested in</label>
        <select id="bfl-inquiry-category" data-draft-category defaultValue={category}>{ct.categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}</select>
        <label htmlFor="bfl-inquiry-message">What are you working on?</label>
        <textarea id="bfl-inquiry-message" data-draft-message maxLength={4000} placeholder="A short, non-confidential description" />
        <label htmlFor="bfl-inquiry-output">Review your draft</label>
        <textarea id="bfl-inquiry-output" data-draft-output readOnly />
        <div className={styles.links}><button type="button" data-draft-copy disabled>Copy inquiry draft</button><button type="button" data-draft-clear>Clear draft</button></div>
        <p data-draft-status role="status" aria-live="polite" />
        <p><a className={styles.textLink} href={PUBLIC_CONTACT_MAILTO}>{PUBLIC_CONTACT_EMAIL}</a> · Direct email remains available.</p>
      </div>
      <h3>{ct.nextTitle}</h3><p className={styles.sectionIntro}>{ct.nextBody}</p>
    </section>
  </div></div>;
}
