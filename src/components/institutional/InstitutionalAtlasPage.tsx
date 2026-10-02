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
        title={<>How is the Lab&apos;s work connected?</>}
        lead={
          <>
            A public map linking selected research programs, experiments, claims, tools,
            products, projects, publications, and evidence.
          </>
        }
        support={
          <>
            This is a curated map, not the complete institutional graph. A connection appears
            only when the public record explicitly declares it; the Atlas does not invent
            relationships from similar language, nearby layout, or conceptual resemblance.
          </>
        }
        childLinks={institutionalChildRoutes.atlas}
      >
        <div className={styles.atlasHeroStats} aria-label="Atlas boundary">
          <div><span>OBJECTS</span><strong>{atlasStats.objects}</strong></div>
          <div><span>DECLARED CONNECTIONS</span><strong>{atlasStats.relationships}</strong></div>
          <div><span>ITEM TYPES</span><strong>{atlasStats.kinds}</strong></div>
        </div>
      </InstitutionalRouteHero>

      <section className={styles.atlasBoundary}>
        <div>
          <span>PUBLIC MAP · V{atlasProjection.version}</span>
          <strong>Research · Experiments · Claims · Tools · Products · Projects · Publications · Evidence</strong>
        </div>
        <p>
          Atlas v{atlasProjection.version} is {atlasProjection.status}. {atlasProjection.omissionRule}
          The map intentionally leaves undeclared connections blank rather than guessing them.
        </p>
      </section>

      <LabAtlasExplorer
        key={initialFocus ?? "atlas-default"}
        initialSelectedId={initialFocus}
      />
    </InstitutionalPageShell>
  );
}
