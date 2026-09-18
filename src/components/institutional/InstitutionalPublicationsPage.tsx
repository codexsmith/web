import { InstitutionalPageShell } from "./InstitutionalPageShell";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/Publications.module.css";
import { composeCssModules } from "./styles/composeCssModules";
import { InstitutionalRouteHero } from "./InstitutionalPrimitives";
import { PublicationCatalogSection } from "./sections/PublicationCatalogSection";
import { PublicationContextSection } from "./sections/PublicationContextSection";

const styles = composeCssModules(foundationStyles, routeSharedStyles, routeStyles);

export function InstitutionalPublicationsPage() {
  return (
    <InstitutionalPageShell mainClassName={styles.publicationsPage}>
      <InstitutionalRouteHero
        styles={styles}
        className={styles.publicationsHero}
        eyebrow={<>PUBLICATIONS</>}
        title={<>Read the argument. Inspect the machinery behind it.</>}
        lead={<>Boundary First Labs publishes papers, technical reports, research notes,
          formal specifications, experiment reports, public-interest analyses,
          reference implementations, and Research Deployment Packets.</>}
        support={<>A publication is an important artifact. It is not automatically the whole
          research object.</>}
      >
        <blockquote className={styles.publicationCovenantLead}>
          <span>PUBLICATION PRINCIPLE</span>
          Publication should increase the reader&apos;s ability to inspect the work,
          not merely increase the author&apos;s authority.
        </blockquote>
      </InstitutionalRouteHero>

      <PublicationCatalogSection />

      <PublicationContextSection />
    </InstitutionalPageShell>
  );
}
