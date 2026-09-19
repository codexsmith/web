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
        title={<>One structural lens. Five very different worlds.</>}
        lead={
          <>
            Change domains without changing the analytical slots. The Atlas asks how frames,
            representations, admissible changes, invariants, defects, and repair appear in
            five witness environments.
          </>
        }
        support={
          <>
            This is a comparative instrument for seeing structural alignment. It is not a
            claim that social meaning, public knowledge, chess, multi-agent systems, and
            weather are mathematically equivalent.
          </>
        }
        childLinks={institutionalChildRoutes.representationAtlas}
      >
        <div className={styles.heroInstrument}>
          <span>WORKING COMPARATIVE LENS</span>
          <strong>
            {representationDomains.length} witness domains × {representationMechanicSlots.length} fixed mechanics slots
          </strong>
          <p>
            Same questions. Different carriers, constraints, consequences, and evidence.
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
          title={<>Hold the grammar steady. Move the domain underneath it.</>}
          note={
            <>
              Select a witness domain, then select any mechanics slot. The lower comparison
              surface shows how that same analytical role is currently being asked in every domain.
            </>
          }
        />

        <div className={styles.readingSteps}>
          <article>
            <span>01</span>
            <strong>Choose a domain.</strong>
            <p>Social meaning, public knowledge, formal strategy, embodied agency, or physical dynamics.</p>
          </article>
          <article>
            <span>02</span>
            <strong>Trace the same six roles.</strong>
            <p>Frame → Representation → Admissible change → Invariant → Defect → Repair / test.</p>
          </article>
          <article>
            <span>03</span>
            <strong>Compare without collapsing.</strong>
            <p>Structural similarity becomes a question for investigation, not evidence of equivalence.</p>
          </article>
        </div>
      </section>

      <RepresentationAtlasExplorer />

      <section className={styles.closingSection}>
        <span>WHY THIS MATTERS</span>
        <h2>The object of study is not only the represented thing. It is the mechanics of representing it.</h2>
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
