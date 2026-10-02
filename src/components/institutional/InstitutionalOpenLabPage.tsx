import Link from "next/link";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/OpenLab.module.css";
import { composeCssModules } from "./styles/composeCssModules";
import {
  InstitutionalRouteHero,
  InstitutionalSectionHeader,
} from "./InstitutionalPrimitives";
import { participationContracts } from "./content/openLab";
import {
  PUBLIC_CONTACT_EMAIL,
  publicContactMailto,
} from "@/lib/site-contact";
import { OpenLabContextSection } from "./sections/OpenLabContextSection";
import { OpenLabContractCard } from "./sections/OpenLabContractCard";
import { MoonshotsFeature } from "./MoonshotsFeature";
import { institutionalChildRoutes } from "./institutionalRoutes";

const styles = composeCssModules(
  foundationStyles,
  routeSharedStyles,
  routeStyles,
);

export function InstitutionalOpenLabPage() {
  return (
    <InstitutionalPageShell mainClassName={styles.openLabPage}>
      <InstitutionalRouteHero
        styles={styles}
        className={styles.openLabHero}
        eyebrow={<>OPEN LAB</>}
        title={<>Bring us a problem, a critique, or work that does not fit neatly anywhere else.</>}
        lead={
          <>Open Lab is the public door into Boundary First Labs.</>
        }
        support={
          <>
            You can challenge our work, point us toward a consequential public system,
            propose a collaboration, or bring unusual technical or research work for review.
            You do not need to learn BFL terminology before writing.
          </>
        }
        childLinks={institutionalChildRoutes.openLab}
      >
        <div className={styles.openLabHeroAsideStack}>
          <aside
            className={styles.openLabHeroIntake}
            data-live="true"
            aria-label="Open Lab contact"
          >
            <div className={styles.openLabHeroIntakeSignal} aria-hidden="true" />
            <div>
              <span>FIRST CONTACT</span>
              <strong>
                <a href={publicContactMailto("Boundary First Labs — Open Lab")}>
                  {PUBLIC_CONTACT_EMAIL}
                </a>
              </strong>
              <p>
                Tell us what you are bringing, why it matters, and what you hope happens next.
                Critique, counterexamples, public systems, collaboration ideas, and unusual
                work are all valid starting points.
              </p>
              <small>KEEP SECRETS, PRIVATE DATA, AND CONFIDENTIAL MATERIAL OUT OF THE FIRST NOTE.</small>
            </div>
          </aside>

          <blockquote className={styles.openLabThesis}>
            <span>FOUR WAYS IN</span>
            Point us at a system.
            <br />
            Challenge our work.
            <br />
            Work with us.
            <br />
            Bring something unusual.
          </blockquote>
        </div>
      </InstitutionalRouteHero>

      <section className={styles.openLabContracts}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>WAYS TO PARTICIPATE</>}
          title={<>Four simple starting points.</>}
          note={
            <>
              They all begin with the same email address, but they lead to different kinds of
              review, responsibility, and follow-up.
            </>
          }
        />

        <div className={styles.openLabContractGrid}>
          {participationContracts.map((contract) => (
            <OpenLabContractCard key={contract.title} contract={contract} />
          ))}
        </div>
      </section>

      <MoonshotsFeature context="open-lab" />

      <OpenLabContextSection />

      <section className={styles.openLabClose}>
        <p className={styles.sectionIndex}>OPEN LAB PROMISE</p>
        <h2>
          Valuable criticism, knowledge, people, and work should be able to reach the Lab
          without being forced into the wrong category first.
        </h2>
        <p>
          First contact is intentionally simple: write the Lab, give enough context to
          understand what you are bringing, and keep sensitive or confidential material out
          of the first message. If the work needs a more structured review, consent, or data
          boundary, establish that before sending more.
        </p>
        <nav
          className={styles.openLabCloseLinks}
          aria-label="Open Lab next steps"
        >
          <a href={publicContactMailto("Boundary First Labs — Open Lab")}>
            Email the Open Lab <span aria-hidden="true">-&gt;</span>
          </a>
          <Link href="/collaboration">
            Explore collaboration <span aria-hidden="true">-&gt;</span>
          </Link>
        </nav>
      </section>
    </InstitutionalPageShell>
  );
}
