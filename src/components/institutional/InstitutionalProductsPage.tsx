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
          support={
          <>
            Research may become a paper, method, dataset, instrument, or product. Products
            test whether a bounded capability remains useful and maintainable with real users.
          </>
        }
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
            <Link
              className={styles.primaryProductCard}
              data-product="chess"
              href="/products/boundary-first-chess"
            >
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

              <span className={styles.productDetailLink}>
                Enter Boundary-First Chess
                <span aria-hidden="true">→</span>
              </span>
            </Link>

            <Link
              className={styles.primaryProductCard}
              data-product="explorer"
              href="/products/youtube-knowledge-explorer"
            >
              <div className={styles.productCardTopline}>
                <span className={styles.productOrdinal}>02</span>
                <div className={styles.productState}>
                  <span className={styles.productStateLamp} aria-hidden="true" />
                  ACTIVE_BUILD
                </div>
              </div>

              <p className={styles.productRole}>PROJECTR · CURRENT ACTIVE-BUILD IMPLEMENTATION</p>
              <h3>YouTube Knowledge Explorer</h3>
              <p className={styles.productPromise}>
                Projectr&apos;s current bounded implementation turns long-form YouTube into
                searchable, timestamped, persistent knowledge while preserving a direct path
                back to the source.
              </p>

              <div className={styles.explorerPipeline}>
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
                  <strong>Working vertical slice</strong>
                  <p>
                    Source parsing, transcript normalization, outlines, concept-linked search,
                    evidence-bound answers, local persistence, and portable interchange exist now.
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

              <div className={styles.productMiniPanel}>
                <span>PRODUCT FAMILY</span>
                <strong>Projectr — public knowledge infrastructure / project-based constructive social media</strong>
              </div>

              <div className={styles.productTruth}>
                <span>NOT YET ESTABLISHED</span>
                Public availability, recurring use, pricing, market validation, retention,
                product-market fit, or the broader multi-source / social Projectr roadmap.
              </div>

              <span className={styles.productDetailLink}>
                Enter YouTube Knowledge Explorer
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          </div>
        </section>

        <section className={styles.researchProducts}>
          <InstitutionalSectionHeader
            styles={styles}
            eyebrow={<>SIBLING KNOWLEDGE INFRASTRUCTURE</>}
            title={<>Projectr organizes public knowledge. Corpus Forge governs bounded research execution.</>}
            note={<>They can exchange typed work and artifact state, but public planning is not scientific promotion and neither product is merely the other&apos;s front end or back end.</>}
          />

          <div className={styles.researchProductGrid}>
            <Link className={styles.researchProductCard} data-product="asm" href="/products/current/corpus-forge">
              <div>
                <span>PROJECTR SIBLING · RESEARCH_PRODUCT</span>
                <strong>Corpus Forge</strong>
              </div>
              <p>
                Source-to-claim state, bounded execution, evidence, criticism, verification,
                reproducibility, repair, and explicit promotion authority.
              </p>
              <small>Enter Corpus Forge <i aria-hidden="true">→</i></small>
            </Link>
          </div>
        </section>

        <section className={styles.researchProducts}>
          <InstitutionalSectionHeader
            styles={styles}
            eyebrow={<>FIRST-CLASS SOFTWARE MACHINERY</>}
            title={<>Software Before Code.</>}
            note={<>Define the software object before committing it to code. Closure-Driven Software remains a secondary technical / historical alias, not a competing product identity.</>}
          />

          <div className={styles.researchProductGrid}>
            <Link className={styles.researchProductCard} data-product="asm" href="/software-before-code">
              <div>
                <span>SOURCE_DEVELOPMENT · SOFTWARE-ENGINEERING MACHINERY</span>
                <strong>Software Before Code</strong>
              </div>
              <p>
                Methods, formal models, translation machinery, engineering instruments, and
                practitioner material for making semantic obligations, boundaries, invariants,
                construction, witnesses, and closure explicit before implementation details dominate.
              </p>
              <small>Enter Software Before Code <i aria-hidden="true">→</i></small>
            </Link>
          </div>
        </section>

        <section className={styles.researchProducts}>
          <InstitutionalSectionHeader
            styles={styles}
            eyebrow={<>TESTBEDS + CALIBRATION</>}
            title={<>Different domains. The same machinery under pressure.</>}
            note={<>These surfaces test transportability and research depth. They do not imply equal product maturity or validate the strongest underlying theory claims.</>}
          />

          <div className={styles.researchProductGrid}>
            <Link className={styles.researchProductCard} data-product="weather" href="/products/boundary-first-weather">
              <div>
                <span>SCIENTIFIC / COMPUTATIONAL TESTBED</span>
                <strong>Boundary First Weather</strong>
              </div>
              <p>
                A computational weather testbed and decision-support surface for boundary-aware
                diagnostics, forecast disagreement, and selective refinement.
              </p>
              <small>Enter Weather <i aria-hidden="true">→</i></small>
            </Link>

            <Link className={styles.researchProductCard} data-product="asm" href="/products/agentic-scientific-method">
              <div>
                <span>RESEARCH PRODUCT · INQUIRY PROTOCOL</span>
                <strong>Agentic Scientific Method</strong>
              </div>
              <p>
                An operational inquiry protocol for making goals, evidence, action, criticism,
                authority, defect, repair, closure, and scientific memory inspectable.
              </p>
              <small>Enter Agentic Scientific Method <i aria-hidden="true">→</i></small>
            </Link>

            <Link className={styles.researchProductCard} data-product="asm" href="/research/moonshots/millennium-problems-research">
              <div>
                <span>FRONTIER MATHEMATICAL CALIBRATION</span>
                <strong>Millennium Problems Research</strong>
              </div>
              <p>
                Solved-control and resistant-theorem work used to stress-test representation,
                flow, scale, singularity, continuation, defect, closure, and proof-program machinery
                without converting resemblance or computation into a solved-problem claim.
              </p>
              <small>Inspect the calibration program <i aria-hidden="true">→</i></small>
            </Link>

            <Link className={styles.researchProductCard} data-product="asm" href="/apparatus">
              <div>
                <span>INSTITUTIONAL MACHINERY</span>
                <strong>Registrar · Workbench · Representation Observatory</strong>
              </div>
              <p>
                Machinery for canonical identity and provenance, bounded human/agent work and
                promotion authority, and inspection of semantic change across representations.
              </p>
              <small>Inspect the apparatus <i aria-hidden="true">→</i></small>
            </Link>
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
