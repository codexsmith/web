import Link from "next/link";
import { PUBLIC_CONTACT_EMAIL, PUBLIC_CONTACT_MAILTO } from "@/lib/site-contact";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/Contact.module.css";
import { composeCssModules } from "./styles/composeCssModules";
import { InstitutionalRouteHero, InstitutionalSectionHeader } from "./InstitutionalPrimitives";
import { InstitutionalInquiryForm } from "./InstitutionalInquiryForm";
import { formatOrdinal } from "./institutionalFormat";
import { institutionalChildRoutes } from "./institutionalRoutes";
import {
  inquiryBoundaries,
  inquiryFamilies,
  inquiryHelpfulContext,
  inquiryProcess,
  inquiryTypes,
  type InquiryTypeId,
} from "./content/contact";

const styles = composeCssModules(foundationStyles, routeSharedStyles, routeStyles);

export function InstitutionalContactPage({
  initialType,
  sourceContext,
  intakeEnabled,
}: {
  initialType: InquiryTypeId;
  sourceContext: string;
  intakeEnabled: boolean;
}) {
  return (
    <InstitutionalPageShell mainClassName={styles.contactPage}>
      <InstitutionalRouteHero
        styles={styles}
        className={styles.contactHero}
        eyebrow={<>CONTACT</>}
        title={<>Start with what brought you here.</>}
        lead={
          <>
            A question, critique, practical problem, collaboration idea, introduction, or
            strange edge case is enough. You do not need a polished pitch or the right
            internal category.
          </>
        }
        childLinks={institutionalChildRoutes.contact}
      >
        <aside className={styles.contactIntakeStatus} data-live="true">
          <span>EMAIL IS LIVE</span>
          <strong><a href={PUBLIC_CONTACT_MAILTO}>{PUBLIC_CONTACT_EMAIL}</a></strong>
          <p>
            A short note is enough. Tell us what caught your attention, what you are working
            on, or what you think would be useful to talk about.
          </p>
          <p className={styles.contactDirectEmail}>
            {intakeEnabled
              ? "Prefer a form? The structured contact form below is live too."
              : "Email is the live contact route right now. The web form will appear here when its receiver is connected."}
          </p>
        </aside>
      </InstitutionalRouteHero>

      <section className={styles.contactRoutesSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>WHAT BRINGS YOU HERE</>}
          title={<>Pick whatever is closest. It does not have to be exact.</>}
          note={
            <>
              This only helps us understand the message and point it toward the right work.
            </>
          }
        />

        <div className={styles.contactFamilyStack}>
          {inquiryFamilies.map((family) => (
            <article
              className={styles.contactFamily}
              data-contact-tone={family.tone}
              key={family.code}
            >
              <header>
                <span>{family.code}</span>
                <div>
                  <h3>{family.title}</h3>
                  <p>{family.description}</p>
                </div>
              </header>

              <div className={styles.contactFamilyRoutes}>
                {family.types.map((typeId) => {
                  const type = inquiryTypes.find((item) => item.id === typeId);
                  if (!type) return null;

                  return (
                    <Link href={`/contact?type=${type.id}`} key={type.id}>
                      <strong>{type.label}</strong>
                      <p>{type.short}</p>
                      <span aria-hidden="true">-&gt;</span>
                    </Link>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.contactFormSection}>
        <div className={styles.contactFormLead}>
          <p className={styles.sectionIndex}>WRITE A NOTE</p>
          <h2>A few useful details are enough.</h2>
          <p>
            Tell us what you are thinking about, point us to anything relevant, and say what
            kind of response would be useful. Save sensitive material for later.
          </p>

          <div className={styles.contactHelpfulContext}>
            <span>HELPFUL CONTEXT</span>
            <ul>
              {inquiryHelpfulContext.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>

        {intakeEnabled ? (
          <InstitutionalInquiryForm
            initialType={initialType}
            intakeEnabled={intakeEnabled}
            sourceContext={sourceContext}
          />
        ) : (
          <aside className={styles.contactEmailFallback}>
            <span>EMAIL INSTEAD</span>
            <h3>The web form is not connected yet.</h3>
            <p>
              Email is already live, so there is no need to wait for the form. A short,
              ordinary message is welcome.
            </p>
            <a href={PUBLIC_CONTACT_MAILTO}>Write {PUBLIC_CONTACT_EMAIL} <span aria-hidden="true">-&gt;</span></a>
          </aside>
        )}
      </section>

      <section className={styles.contactProcessSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>WHAT HAPPENS NEXT</>}
          title={<>If there is a useful next step, we will make it concrete.</>}
          note={
            <>
              Sometimes that is a conversation, review, introduction, pilot, or pointer
              elsewhere. Sometimes the useful answer is simply that there is not a fit yet.
            </>
          }
        />

        <div className={styles.contactProcessRail}>
          {inquiryProcess.map(([title, description], index) => (
            <article key={title}>
              <span>{formatOrdinal(index)}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.contactBoundariesSection}>
        <div className={styles.contactBoundariesLead}>
          <p className={styles.sectionIndex}>A FEW PRACTICAL BOUNDARIES</p>
          <h2>Keep first contact simple and safe.</h2>
          <p>
            You can be informal. Just avoid sending secrets or protected material before
            there is an appropriate way to handle it.
          </p>
        </div>

        <div className={styles.contactBoundaryGrid}>
          {inquiryBoundaries.map((boundary) => (
            <article key={boundary.label}>
              <span>{boundary.label}</span>
              <p>{boundary.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.contactClose}>
        <p className={styles.sectionIndex}>NOT SURE YET?</p>
        <h2>You can still just write.</h2>
        <p>
          If something here made you curious, skeptical, excited, confused, or useful to
          talk to, that is enough reason to send a note. These pages are here if you want
          more context first.
        </p>

        <nav className={styles.contactCloseLinks} aria-label="Contact context routes">
          <Link href="/applied-work">Applied Work <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/collaboration">Collaboration <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/funding">Funding <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/evidence">Evidence <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/open-lab">Open Lab <span aria-hidden="true">-&gt;</span></Link>
        </nav>
      </section>
    </InstitutionalPageShell>
  );
}
