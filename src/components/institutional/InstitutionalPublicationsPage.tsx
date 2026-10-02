import { InstitutionalPageShell } from "./InstitutionalPageShell";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/Publications.module.css";
import { composeCssModules } from "./styles/composeCssModules";
import { InstitutionalRouteHero } from "./InstitutionalPrimitives";
import { institutionalChildRoutes } from "./institutionalRoutes";
import { PublicationCatalogSection } from "./sections/PublicationCatalogSection";
import { PublicationStripSection } from "./sections/PublicationStripSection";
import { PublicationContextSection } from "./sections/PublicationContextSection";

const styles = composeCssModules(foundationStyles, routeSharedStyles, routeStyles);

export function InstitutionalPublicationsPage() {
  return (
    <InstitutionalPageShell mainClassName={styles.publicationsPage}>
      <InstitutionalRouteHero
        styles={styles}
        className={styles.publicationsHero}
        eyebrow={<>PUBLICATIONS</>}
        title={<>Read the work. See what it claims and what still needs to be tested.</>}
        lead={<>Boundary First Labs publishes working papers, research notes, technical
          reports, formal specifications, experiment reports, reference implementations,
          and other research artifacts.</>}
        support={<>Each public record should make its status, claim limits, evidence,
          open questions, and correction path easier to inspect. A polished document is not
          presented as stronger evidence than the work behind it.</>}
        childLinks={institutionalChildRoutes.publications}
      >
        <blockquote className={styles.publicationCovenantLead}>
          <span>PUBLICATION PRINCIPLE</span>
          A reader should be able to tell what is established, what is still being tested,
          what evidence matters, and what could change the conclusion.
        </blockquote>
      </InstitutionalRouteHero>

      <PublicationCatalogSection />

      <PublicationStripSection />

      <PublicationContextSection />
    </InstitutionalPageShell>
  );
}
