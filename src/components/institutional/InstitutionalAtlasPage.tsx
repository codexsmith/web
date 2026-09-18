import { InstitutionalPageShell } from "./InstitutionalPageShell";
import { InstitutionalRouteHero } from "./InstitutionalPrimitives";
import { LabAtlasExplorer } from "./LabAtlasExplorer";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/Atlas.module.css";
import { composeCssModules } from "./styles/composeCssModules";
import { atlasStats } from "./content/atlas";

const styles = composeCssModules(
  foundationStyles,
  routeSharedStyles,
  routeStyles,
);

export function InstitutionalAtlasPage({
  initialFocus,
}: {
  initialFocus?: string;
}) {
  return (
    <InstitutionalPageShell mainClassName={styles.atlasPage}>
      <InstitutionalRouteHero
        styles={styles}
        className={styles.atlasHero}
        eyebrow={<>LAB ATLAS</>}
        title={<>Follow the objects, not the org chart.</>}
        lead={
          <>
            A bounded public map of how research programs, experiments, claims, machinery
            components, products, project cases, publication records, and evidence records
            relate across Boundary First Labs.
          </>
        }
        support={
          <>
            Relationships shown here are explicit public declarations. The Atlas does not
            infer equivalence, dependency, validation, or authority from visual proximity,
            shared language, or conceptual similarity.
          </>
        }
      >
        <div className={styles.atlasHeroStats} aria-label="Atlas boundary">
          <div><span>OBJECTS</span><strong>{atlasStats.objects}</strong></div>
          <div><span>TYPED RELATIONSHIPS</span><strong>{atlasStats.relationships}</strong></div>
          <div><span>OBJECT KINDS</span><strong>{atlasStats.kinds}</strong></div>
        </div>
      </InstitutionalRouteHero>

      <section className={styles.atlasBoundary}>
        <div>
          <span>CURRENT PUBLIC BOUNDARY</span>
          <strong>Research · Experiments · Claims · Machinery · Products · Projects · Publications · Evidence</strong>
        </div>
        <p>
          Source-bound Experiment, Claim, and Lab Machinery registry snapshots are now admitted
          alongside evidence. Claim edges remain owner-local unless a source explicitly identifies
          stronger evidence, experiment, publication, or derivation relationships. Mentioning the same project or institution does not
          create an edge; missing relationships remain missing rather than being guessed.
        </p>
      </section>

      <LabAtlasExplorer
        key={initialFocus ?? "atlas-default"}
        initialSelectedId={initialFocus}
      />
    </InstitutionalPageShell>
  );
}
