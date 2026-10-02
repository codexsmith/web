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
          title={<>What can someone actually use?</>}
          lead={<>Boundary First Labs turns selected research and engineering work into books,
            software, tools, methods, and public testbeds.</>}
          support={
          <>
            A product page should make the offer concrete: who it is for, what exists now,
            what is still experimental, and what evidence would justify the next step.
          </>
        }
          childLinks={institutionalChildRoutes.products}
          >
          <blockquote className={styles.productThesis}>
            <span>PRODUCT RULE</span>
            Show what the user can do before making claims about the market.
          </blockquote>
        </InstitutionalRouteHero>

        <section className={styles.primaryProducts}>
          <InstitutionalSectionHeader
            styles={styles}
            eyebrow={<>CURRENT PRODUCT EDGE</>}
            title={<>Two concrete products closest to outside use.</>}
            note={<>Each card separates what already exists from what users and the market still have to prove.</>}
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
                  RESEARCH PRODUCT
                </div>
              </div>

              <p className={styles.productRole}>BOOK / LEARNING PRODUCT</p>
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
                  <span>NEXT OUTSIDE TEST</span>
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

              <p className={styles.productRole}>PROJECTR · ACTIVE SOFTWARE PRODUCT</p>
              <h3>Projectr</h3>
              <p className={styles.productPromise}>
                Projectr is a knowledge-exploration product for turning long-form sources into
                searchable, persistent knowledge without losing the path back to the original.
                YouTube Knowledge Explorer is the current working implementation.
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
                  <span>NEXT OUTSIDE TEST</span>
                  <strong>Repeated voluntary use</strong>
                  <p>
                    Build a usable MVP, see whether people return, and only then test willingness
                    to pay for the bounded capability.
                  </p>
                </div>
              </div>

              <div className={styles.productMiniPanel}>
                <span>PRODUCT FAMILY</span>
                <strong>Source-linked knowledge exploration and persistent research/workspace tools</strong>
              </div>

              <div className={styles.productTruth}>
                <span>NOT YET ESTABLISHED</span>
                Public availability, recurring use, pricing, market validation, retention,
                product-market fit, or the broader multi-source / social roadmap.
              </div>

              <span className={styles.productDetailLink}>
                Open Projectr / YouTube Explorer
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          </div>
        </section>

        <section className={styles.researchProducts}>
          <InstitutionalSectionHeader
            styles={styles}
            eyebrow={<>RESEARCH INFRASTRUCTURE</>}
            title={<>Corpus Forge helps make research work inspectable and repeatable.</>}
            note={<>Projectr helps people explore and preserve knowledge. Corpus Forge supports the research process itself. They can exchange artifacts without becoming the same product.</>}
          />

          <div className={styles.researchProductGrid}>
            <Link className={styles.researchProductCard} data-product="asm" href="/products/current/corpus-forge">
              <div>
                <span>RESEARCH INFRASTRUCTURE · RESEARCH PRODUCT</span>
                <strong>Corpus Forge</strong>
              </div>
              <p>
                Tools for organizing sources, claims, evidence, criticism, verification,
                reproducibility, revision, and human review across a research workflow.
              </p>
              <small>Enter Corpus Forge <i aria-hidden="true">→</i></small>
            </Link>
          </div>
        </section>

        <section className={styles.researchProducts}>
          <InstitutionalSectionHeader
            styles={styles}
            eyebrow={<>ENGINEERING METHOD</>}
            title={<>Software Before Code is the Lab&apos;s core engineering doctrine.</>}
            note={<>Understand the system, the information it must preserve, the changes it must support, and the consequences that matter before implementation choices harden the model.</>}
          />

          <div className={styles.researchProductGrid}>
            <Link className={styles.researchProductCard} data-product="asm" href="/software-before-code">
              <div>
                <span>SOFTWARE ENGINEERING METHOD</span>
                <strong>Software Before Code</strong>
              </div>
              <p>
                Methods and tools for making system meaning, state, constraints, decisions,
                and expected consequences explicit before implementation details dominate.
              </p>
              <small>Enter Software Before Code <i aria-hidden="true">→</i></small>
            </Link>
          </div>
        </section>

        <section className={styles.researchProducts}>
          <InstitutionalSectionHeader
            styles={styles}
            eyebrow={<>RESEARCH TESTBEDS</>}
            title={<>Some product-shaped surfaces exist primarily to test the research.</>}
            note={<>Weather, ASM, mathematical calibration work, and institutional tools are shown here because they are usable or inspectable artifacts—not because they have equal commercial maturity.</>}
          />

          <div className={styles.researchProductGrid}>
            <Link className={styles.researchProductCard} data-product="weather" href="/products/boundary-first-weather">
              <div>
                <span>WEATHER RESEARCH TESTBED</span>
                <strong>Boundary First Weather</strong>
              </div>
              <p>
                A computational weather research program testing whether boundary-aware
                diagnostics can improve how forecast change, disagreement, and computation are inspected.
              </p>
              <small>Enter Weather <i aria-hidden="true">→</i></small>
            </Link>

            <Link className={styles.researchProductCard} data-product="asm" href="/products/agentic-scientific-method">
              <div>
                <span>RESEARCH METHOD / PROTOCOL</span>
                <strong>Agentic Scientific Method</strong>
              </div>
              <p>
                A structured research protocol for making questions, evidence, tests,
                criticism, revision, responsibility, and scientific memory inspectable.
              </p>
              <small>Enter Agentic Scientific Method <i aria-hidden="true">→</i></small>
            </Link>

            <Link className={styles.researchProductCard} data-product="asm" href="/research/moonshots/millennium-problems-research">
              <div>
                <span>MATHEMATICAL CALIBRATION PROGRAM</span>
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
                <span>LAB OPERATING TOOLS</span>
                <strong>Registrar · Workbench · Representation Observatory</strong>
              </div>
              <p>
                Tools for durable identity, source history, human/AI work, review, and
                inspecting how important representations change over time.
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
