import type { InstitutionalRouteFrontDoor } from "./institutionalRoutes";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeStyles from "./styles/InstitutionalRouteShared.module.css";
import { composeCssModules } from "./styles/composeCssModules";
import { InstitutionalRouteHero, InstitutionalSectionHeader, InstitutionalSectionLead } from "./InstitutionalPrimitives";

const styles = composeCssModules(foundationStyles, routeStyles);

export function InstitutionalRoutePreview({
  route,
}: {
  route: InstitutionalRouteFrontDoor;
}) {
  return (
    <InstitutionalPageShell mainClassName={styles.routeMain}>
        <section className={styles.routeHero}>
          <p className={styles.eyebrow}>{route.eyebrow}</p>
          <h1>{route.title}</h1>
          <p className={styles.routeLead}>{route.lead}</p>
          <p className={styles.routeSupport}>{route.support}</p>
        </section>

        <section className={styles.routeWiringPlate} aria-label="Website v3 projection status">
          <span className={styles.routeSignal} aria-hidden="true" />
          <div>
            <strong>V3 PROJECTION CONNECTED</strong>
            <p>
              This route now resolves through the institutional frame. The next
              implementation pass maps the remaining source-governed sections
              from <code>{route.sourcePath}</code> into reusable page blocks.
            </p>
          </div>
        </section>
      </InstitutionalPageShell>
  );
}
