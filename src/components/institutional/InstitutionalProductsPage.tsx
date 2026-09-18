import Link from "next/link";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/Products.module.css";
import { composeCssModules } from "./styles/composeCssModules";
import { InstitutionalRouteHero, InstitutionalSectionHeader } from "./InstitutionalPrimitives";

import { ProductContextSection } from "./sections/ProductContextSection";
import { institutionalChildRoutes } from "./institutionalRoutes";
const styles = composeCssModules(foundationStyles, routeSharedStyles, routeStyles);

export function InstitutionalProductsPage() {
  return (
    <InstitutionalPageShell mainClassName={styles.productsPage}>
        <InstitutionalRouteHero
          styles={styles}
          className={styles.productsHero}
          eyebrow={<>PRODUCTS</>}
          title={<>Research should sometimes become something a person can use.</>}
          lead={<>Boundary First Labs is a research laboratory. It is also a place that makes things.</>}
          support={<>Some work becomes papers, methods, datasets, experiments, and research infrastructure.
              Some becomes a product that a person can directly use, learn from, buy, subscribe to,
              support, license, or carry elsewhere. A usable product also creates stewardship
              obligations: maintenance, accessibility, data and attention costs, repair,
              transfer, retirement, and the material or ecological burden of continued use.</>}
          childLinks={institutionalChildRoutes.products}
          >
          <blockquote className={styles.productThesis}>
            <span>PRODUCT DISCIPLINE</span>
            Show the user capability before claiming the market.
          </blockquote>
        </InstitutionalRouteHero>

        <section className={styles.primaryProducts}>
          <InstitutionalSectionHeader
            styles={styles}
            eyebrow={<>NEAR-TERM B2C EDGE</>}
            title={<>Two concrete product tests.</>}
            note={<>What exists now is separated from what still has to be earned.</>}
            />

          <div className={styles.primaryProductGrid}>
            <article className={styles.primaryProductCard} data-product="chess">
              <div className={styles.productCardTopline}>
                <span className={styles.productOrdinal}>01</span>
                <div className={styles.productState}>
                  <span className={styles.productStateLamp} aria-hidden="true" />
                  RESEARCH_PRODUCT
                </div>
              </div>

              <p className={styles.productRole}>FIRST CONCRETE COMMERCIALIZATION CANDIDATE</p>
              <h3>Boundary-First Chess</h3>
              <p className={styles.productPromise}>
                A book-length teaching asset and developed pedagogy for helping learners ask
                better questions about what changed on the board.
              </p>

              <div className={styles.productStatusGrid}>
                <div>
                  <span>EXISTS NOW</span>
                  <strong>Roughly 140-page manuscript</strong>
                  <p>
                    Complete teaching manuscript, explanatory grammar, worked material, and
                    a preserved chess-specific rights / stewardship surface.
                  </p>
                </div>
                <div>
                  <span>NEXT COMMERCIAL TEST</span>
                  <strong>Package the existing asset</strong>
                  <p>
                    External review, production, pricing, preorder/publication, pilot,
                    licensing, or partner evaluation — not first-offer invention.
                  </p>
                </div>
              </div>

              <div className={styles.productMiniPanel}>
                <span>CURRENT TITLE DIRECTION</span>
                <strong>Boundary-First Chess: A Field Guide for Seeing the Board</strong>
              </div>

              <div className={styles.operationGrammar}>
                <span>Create</span>
                <span>Repair</span>
                <span>Weaken</span>
                <span>Exploit</span>
                <span>Transform</span>
              </div>

              <div className={styles.productTruth}>
                <span>NOT YET ESTABLISHED</span>
                Pedagogical superiority, rating improvement, market demand, product-market fit,
                recurring revenue, or commentary engagement lift.
              </div>

              <Link
                className={styles.productDetailLink}
                href="/v3/products/boundary-first-chess"
              >
                Enter Boundary-First Chess
                <span aria-hidden="true">→</span>
              </Link>
            </article>

            <article className={styles.primaryProductCard} data-product="projectr">
              <div className={styles.productCardTopline}>
                <span className={styles.productOrdinal}>02</span>
                <div className={styles.productState}>
                  <span className={styles.productStateLamp} aria-hidden="true" />
                  ACTIVE_BUILD
                </div>
              </div>

              <p className={styles.productRole}>FIRST ACTIVE-BUILD CONSUMER SOFTWARE WEDGE</p>
              <h3>Projectr / YouTube Knowledge Explorer</h3>
              <p className={styles.productPromise}>
                Turn long-form YouTube into searchable, timestamped, structured knowledge
                while preserving a direct path back to the source.
              </p>

              <div className={styles.projectrPipeline}>
                <span>YouTube video</span>
                <span>Transcript</span>
                <span>Timestamped segments</span>
                <span>Topic / outline map</span>
                <span>Search</span>
                <span>Source navigation</span>
                <span>Persistent knowledge object</span>
              </div>

              <div className={styles.productStatusGrid}>
                <div>
                  <span>EXISTS NOW</span>
                  <strong>Bounded MVP direction</strong>
                  <p>
                    The near-term product is deliberately smaller than the full Projectr vision.
                  </p>
                </div>
                <div>
                  <span>NEXT COMMERCIAL TEST</span>
                  <strong>Repeated voluntary use</strong>
                  <p>
                    Build a usable MVP, see whether people return, and only then test willingness
                    to pay for the bounded capability.
                  </p>
                </div>
              </div>

              <div className={styles.productTruth}>
                <span>NOT YET ESTABLISHED</span>
                Availability, recurring use, pricing, market validation, retention, or
                product-market fit.
              </div>
            </article>
          </div>
        </section>

        <ProductContextSection />

        <section className={styles.productClose}>
          <p className={styles.sectionIndex}>FAST FEEDBACK</p>
          <h2>Build the artifact. Put it in front of a person. Learn what survives contact.</h2>
          <p>
            A person buys the book, uses the tool, tries the interface, finds a defect,
            returns — or does not. That interaction is evidence.
          </p>
        </section>
      </InstitutionalPageShell>
  );
}
