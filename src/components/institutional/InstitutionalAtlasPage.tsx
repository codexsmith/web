import { InstitutionalPageShell } from "./InstitutionalPageShell";
import { InstitutionalRouteHero } from "./InstitutionalPrimitives";
import { LabAtlasExplorer } from "./LabAtlasExplorer";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/Atlas.module.css";
import { composeCssModules } from "./styles/composeCssModules";
import { atlasProjection, atlasStats } from "./content/atlas";
import { institutionalChildRoutes } from "./institutionalRoutes";

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
            A public map of how research, experiments, claims, apparatus, products, projects,
            publications, and evidence relate across the Lab.
          </>
        }
        support={
          <>
            Relationships shown here are explicit public declarations. The Atlas does not
            infer equivalence, dependency, validation, or authority from visual proximity,
            shared language, or conceptual similarity.
          </>
        }
        childLinks={institutionalChildRoutes.atlas}
      >
        <div className={styles.atlasHeroStats} aria-label="Atlas boundary">
          <div><span>OBJECTS</span><strong>{atlasStats.objects}</strong></div>
          <div><span>TYPED RELATIONSHIPS</span><strong>{atlasStats.relationships}</strong></div>
          <div><span>OBJECT KINDS</span><strong>{atlasStats.kinds}</strong></div>
        </div>
      </InstitutionalRouteHero>

      <section className={styles.atlasBoundary}>
        <div>
          <span>PUBLIC PROJECTION · V{atlasProjection.version}</span>
          <strong>Research · Experiments · Claims · Machinery · Products · Projects · Publications · Evidence</strong>
        </div>
        <p>
          Atlas v{atlasProjection.version} is now {atlasProjection.status}. {atlasProjection.omissionRule}
          Existing relationships remain explicit source-backed declarations; missing edges stay
          missing rather than being guessed.
        </p>
      </section>

      <LabAtlasExplorer
        key={initialFocus ?? "atlas-default"}
        initialSelectedId={initialFocus}
      />
    </InstitutionalPageShell>
  );
}
