import { InstitutionalPageShell } from "./InstitutionalPageShell";
import {
  InstitutionalRouteHero,
  InstitutionalSectionHeader,
} from "./InstitutionalPrimitives";
import { RepresentationAtlasExplorer } from "./RepresentationAtlasExplorer";
import {
  representationAtlasProjection,
  representationDomains,
  representationMechanicSlots,
} from "./content/representationAtlas";
import { institutionalChildRoutes } from "./institutionalRoutes";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/RepresentationAtlas.module.css";
import { composeCssModules } from "./styles/composeCssModules";

const styles = composeCssModules(foundationStyles, routeSharedStyles, routeStyles);

export function InstitutionalRepresentationAtlasPage() {
  return (
    <InstitutionalPageShell mainClassName={styles.representationAtlasPage}>
      <InstitutionalRouteHero
        styles={styles}
        className={styles.representationHero}
        eyebrow={<>REPRESENTATION ATLAS</>}
        title={<>Ask the same six questions in five very different domains.</>}
        lead={
          <>
            The Representation Atlas compares how context, working models, allowed changes,
            protected structure, failure, and repair show up in social meaning, public
            knowledge, strategy, multi-agent action, and physical prediction.
          </>
        }
        support={
          <>
            The purpose is comparison, not unification. Similar answers can reveal useful
            structure, but they do not mean the domains are mathematically or scientifically
            equivalent.
          </>
        }
        childLinks={institutionalChildRoutes.representationAtlas}
      >
        <div className={styles.heroInstrument}>
          <span>WORKING COMPARISON TOOL</span>
          <strong>
            {representationDomains.length} domains × {representationMechanicSlots.length} shared questions
          </strong>
          <p>
            Same questions. Different systems, constraints, consequences, and evidence.
          </p>
          <dl>
            <div>
              <dt>STATUS</dt>
              <dd>{representationAtlasProjection.status}</dd>
            </div>
            <div>
              <dt>SOURCE REVISION</dt>
              <dd>{representationAtlasProjection.sourceRevision.slice(0, 12)}</dd>
            </div>
          </dl>
        </div>
      </InstitutionalRouteHero>

      <section className={styles.readingSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>HOW TO USE IT</>}
          title={<>Keep the questions fixed. Change the domain.</>}
          note={
            <>
              Choose a domain, then choose one of the six recurring questions. The lower
              comparison shows how that same role appears across every domain.
            </>
          }
        />

        <div className={styles.readingSteps}>
          <article>
            <span>01</span>
            <strong>Choose a domain.</strong>
            <p>Social meaning, public knowledge, strategy, multi-agent action, or physical dynamics.</p>
          </article>
          <article>
            <span>02</span>
            <strong>Trace the same six questions.</strong>
            <p>Context → Working model → Allowed change → What must be preserved → Failure → Repair / test.</p>
          </article>
          <article>
            <span>03</span>
            <strong>Compare without declaring equivalence.</strong>
            <p>Similar structure is something to investigate, not proof that two domains are the same.</p>
          </article>
        </div>
      </section>

      <RepresentationAtlasExplorer />

      <section className={styles.closingSection}>
        <span>WHY THIS MATTERS</span>
        <h2>A model changes what a system can see, reason about, and repair.</h2>
        <p>
          A representation determines what distinctions are available, which transformations can
          be reasoned about, what failure can be detected, and what repair remains possible.
          Representation Mechanics asks whether those recurring roles can be made explicit enough
          to compare, test, and improve across otherwise very different domains.
        </p>
      </section>
    </InstitutionalPageShell>
  );
}
