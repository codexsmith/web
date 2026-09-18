import Link from "next/link";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/Contact.module.css";
import { composeCssModules } from "./styles/composeCssModules";
import { InstitutionalRouteHero, InstitutionalSectionHeader } from "./InstitutionalPrimitives";
import { InstitutionalInquiryForm } from "./InstitutionalInquiryForm";
import { formatOrdinal } from "./institutionalFormat";
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
        eyebrow={<>CONTACT / START A CONVERSATION</>}
        title={<>Start with why you are reaching out.</>}
        lead={
          <>
            One public front door should be enough. Boundary First Labs can route the
            conversation after it understands the problem, opportunity, or reason for contact.
          </>
        }
        support={
          <>
            You do not need to know the Lab&apos;s internal structure first. Choose the closest
            reason, give enough context to make the first decision useful, and keep sensitive
            material out of the initial message.
          </>
        }
      >
        <aside className={styles.contactIntakeStatus} data-live={intakeEnabled ? "true" : "false"}>
          <span>INTAKE STATUS</span>
          <strong>{intakeEnabled ? "Direct inquiry receiver connected." : "Routing surface ready; receiver not connected."}</strong>
          <p>
            {intakeEnabled
              ? "Messages are validated, typed, and sent through the server-side inquiry boundary with their source context attached."
              : "No message is accepted or stored on this deployment. The form remains visibly disabled until a receiving endpoint is configured."}
          </p>
        </aside>
      </InstitutionalRouteHero>

      <section className={styles.contactRoutesSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>CHOOSE THE CLOSEST DOOR</>}
          title={<>Three reasons to enter, with smaller routes inside them.</>}
          note={
            <>
              Pick the best fit, not the perfect category. The message can be rerouted later
              without asking you to restate the whole context.
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
                    <Link href={`/v3/contact?type=${type.id}`} key={type.id}>
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
          <p className={styles.sectionIndex}>THE FIRST MESSAGE</p>
          <h2>Enough context to route it. No intake essay required.</h2>
          <p>
            The form stays intentionally small. A strong first message says what is real,
            why the Lab is relevant, and what a useful next step would look like.
          </p>

          <div className={styles.contactHelpfulContext}>
            <span>HELPFUL CONTEXT</span>
            <ul>
              {inquiryHelpfulContext.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>

        <InstitutionalInquiryForm
          initialType={initialType}
          intakeEnabled={intakeEnabled}
          sourceContext={sourceContext}
        />
      </section>

      <section className={styles.contactProcessSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>WHAT HAPPENS AFTER CONTACT</>}
          title={<>The inbox is a boundary, not the relationship database.</>}
          note={
            <>
              Serious contact should move into the appropriate work or relationship system
              once it becomes more than an initial message.
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
          <p className={styles.sectionIndex}>FIRST-CONTACT BOUNDARIES</p>
          <h2>Make the first boundary easy to cross without making it careless.</h2>
          <p>
            Contact should be low-friction, but it should not erase confidentiality,
            endorsement, provenance, or routing distinctions before a relationship even exists.
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
        <p className={styles.sectionIndex}>BEFORE YOU WRITE</p>
        <h2>A short, specific message beats a polished pitch.</h2>
        <p>
          If you are still deciding whether there is a fit, the pages below show how the
          Lab works with clients, collaborators, funders, and external reviewers before you
          commit to a conversation.
        </p>

        <nav className={styles.contactCloseLinks} aria-label="Contact context routes">
          <Link href="/v3/applied-work">Applied Work <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/v3/collaboration">Collaboration <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/v3/funding">Funding <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/v3/evidence">Evidence <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/v3/open-lab">Open Lab <span aria-hidden="true">-&gt;</span></Link>
        </nav>
      </section>
    </InstitutionalPageShell>
  );
}
