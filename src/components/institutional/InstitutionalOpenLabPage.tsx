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
        title={<>A research institution should have a permeable boundary.</>}
        lead={
          <>Boundary First Labs should not be a one-way publishing machine.</>
        }
        support={
          <>
            Bring criticism, failed reproductions, counterexamples, specialist knowledge,
            consequential systems, or unusual work. You should not need the Lab&apos;s
            vocabulary before you can challenge or contribute to it.
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
              <span>OPEN LAB CONTACT</span>
              <strong>
                <a href={publicContactMailto("Boundary First Labs — Open Lab")}>
                  {PUBLIC_CONTACT_EMAIL}
                </a>
              </strong>
              <p>
                Email the Lab with the closest description of what you are bringing.
                Critique, counterexamples, public systems, collaboration ideas, and unusual
                work are all welcome.
              </p>
              <small>KEEP SECRETS, PRIVATE DATA, AND CONFIDENTIAL MATERIAL OUT OF THE FIRST NOTE.</small>
            </div>
          </aside>

          <blockquote className={styles.openLabThesis}>
            <span>FOUR PUBLIC CONTRACTS</span>
            We inspect public systems.
            <br />
            Inspect us.
            <br />
            Build with us.
            <br />
            Bring us what does not fit.
          </blockquote>
        </div>
      </InstitutionalRouteHero>

      <section className={styles.openLabContracts}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>PUBLIC PARTICIPATION</>}
          title={<>Four routes. Four different relationships.</>}
          note={
            <>
              The distinction matters because criticism, collaboration, public-system
              inspection, and unusual work create different expectations even when they
              begin at the same email address.
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
        <p className={styles.sectionIndex}>INSTITUTIONAL PROMISE</p>
        <h2>
          Make the boundary permeable enough that valuable observations,
          criticism, people, and work can enter—without forcing them into the
          wrong category first.
        </h2>
        <p>
          Open Lab is the designed public boundary of the institution. For now,
          first contact is intentionally simple: write the Lab, give enough context
          to understand what you are bringing, and keep sensitive material out of the
          first message. If the work needs a more structured review, consent, or
          retention boundary, establish that before sending more.
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
