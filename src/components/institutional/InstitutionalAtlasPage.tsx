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

export function InstitutionalAtlasPage() {
  return (
    <InstitutionalPageShell mainClassName={styles.atlasPage}>
      <InstitutionalRouteHero
        styles={styles}
        className={styles.atlasHero}
        eyebrow={<>LAB ATLAS</>}
        title={<>Follow the objects, not the org chart.</>}
        lead={
          <>
            A bounded public map of how research programs, products, project cases,
            and publication records relate across Boundary First Labs.
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
          <span>FIRST PUBLIC BOUNDARY</span>
          <strong>Research · Products · Projects · Publications</strong>
        </div>
        <p>
          Evidence records, experiments, apparatus, people, and finer-grained source
          relationships can join this map as their public object contracts become explicit.
          Missing edges remain missing rather than being guessed.
        </p>
      </section>

      <LabAtlasExplorer />
    </InstitutionalPageShell>
  );
}
