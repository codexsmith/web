import { InstitutionalPageShell } from "./InstitutionalPageShell";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/Products.module.css";
import { composeCssModules } from "./styles/composeCssModules";
import { InstitutionalRouteHero, InstitutionalSectionHeader, InstitutionalSectionLead } from "./InstitutionalPrimitives";
import { formatOrdinal } from "./institutionalFormat";

const styles = composeCssModules(foundationStyles, routeSharedStyles, routeStyles);

const productEvidence = [
  ["Attention", "Does anyone stop and care?"],
  ["Comprehension", "Do people understand the capability?"],
  ["Return use", "Do they choose to come back?"],
  ["Willingness to pay", "Will usefulness survive a price?"],
  ["Retention", "Does value persist after novelty?"],
  ["Criticism", "What breaks under real use?"],
] as const;

const secondaryProducts = [
  {
    name: "Software Before Code",
    state: "SOURCE DEVELOPMENT",
    description:
      "Possible book, training product, field guide, templates, and educational tooling for software engineers.",
    next: "Package the source into a bounded offer and test whether practitioners want it.",
  },
  {
    name: "ToddlerTalk",
    state: "MVP RECONSTRUCTION",
    description:
      "A real consumer/family product family with an emotionally legible need.",
    next:
      "Reconstruct the product, then clear safety, privacy, security, and operating-model gates before commercialization.",
  },
  {
    name: "Modern Posture",
    state: "SOURCE DEVELOPMENT",
    description:
      "Potential public educational/product work with a higher health and evidence burden.",
    next:
      "Complete literature/clinical review, define safety boundaries, and test public-facing tools before aggressive commercialization.",
  },
] as const;

const productPageQuestions = [
  "What is it?",
  "Who is it for?",
  "What can I do with it?",
  "What exists now?",
  "Can I buy, try, license, or partner around it yet?",
  "What evidence exists that it works for users?",
  "What remains unproven?",
  "What is the next product milestone?",
  "How can I give feedback or report a defect?",
  "What rights or stewardship boundary matters?",
] as const;

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
              support, license, or carry elsewhere.</>}
          >
          <blockquote className={styles.productThesis}>
            <span>PRODUCT DISCIPLINE</span>
            Show the user capability before claiming the market.
          </blockquote>
        </InstitutionalRouteHero>

        <section className={styles.productEvidenceSection}>
          <InstitutionalSectionLead
            styles={styles}
            eyebrow={<>WHY PRODUCTS MATTER</>}
            title={<>Usefulness should meet reality.</>}
            description={<>Direct products put bounded artifacts in front of real people and turn usefulness
              into observable evidence rather than an internal judgment.</>}
            />

          <div className={styles.productEvidenceGrid}>
            {productEvidence.map(([title, description], index) => (
              <div className={styles.productEvidencePlate} key={title}>
                <span>{formatOrdinal(index)}</span>
                <strong>{title}</strong>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </section>

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

        <section className={styles.productConversion}>
          <div>
            <p className={styles.sectionIndex}>RESEARCH → MARKET</p>
            <h2>One body of work can support several bounded product tests.</h2>
            <p>
              The Lab should not count every conceivable extension as a separate product
              before evidence exists.
            </p>
          </div>

          <div className={styles.conversionRail}>
            <span>Existing core asset</span>
            <span>Bounded derivative</span>
            <span>User / partner test</span>
            <span>Paid / adoption evidence</span>
            <span>Durable extension or explicit product split</span>
          </div>
        </section>

        <section className={styles.secondaryPipeline}>
          <InstitutionalSectionHeader
            styles={styles}
            eyebrow={<>SECONDARY PIPELINE</>}
            title={<>Product-shaped work, not yet the near-term edge.</>}
            />

          <div className={styles.secondaryProductGrid}>
            {secondaryProducts.map((product, index) => (
              <article className={styles.secondaryProductCard} key={product.name}>
                <div>
                  <span className={styles.productOrdinal}>{formatOrdinal(index, 3)}</span>
                  <span className={styles.secondaryState}>{product.state}</span>
                </div>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className={styles.nextGate}>
                  <span>NEXT GATE</span>
                  {product.next}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.consumerEthos}>
          <div>
            <p className={styles.sectionIndex}>CONSUMER ETHOS</p>
            <h2>A good product leaves the user more capable than it found them.</h2>
          </div>
          <p>
            A book should help someone see or do something. A course should teach a
            transferable skill. A tool should expose useful structure. A knowledge explorer
            should improve navigation rather than merely summarize more aggressively.
          </p>
        </section>

        <section className={styles.commercialFirewall}>
          <p className={styles.sectionIndex}>COMMERCIAL TRUTH</p>
          <h2>Do not confuse a promising artifact with a validated market.</h2>

          <div className={styles.firewallEquations}>
            <code>existing asset ≠ production-ready release ≠ paid transaction ≠ retained customer ≠ product-market fit</code>
            <code>active build ≠ available now ≠ market validated</code>
            <code>audience interest ≠ willingness to pay ≠ retention</code>
            <code>product success ≠ scientific validation</code>
            <code>revenue ≠ research truth</code>
          </div>
        </section>

        <section className={styles.productObjectGrammar}>
          <InstitutionalSectionLead
            styles={styles}
            eyebrow={<>PUBLIC PRODUCT OBJECT</>}
            title={<>What a product page should answer.</>}
            description={<>The product counterpart to the Lab&apos;s research-object grammar: enough state
              for a user or partner to understand the offer without guessing.</>}
            />

          <div className={styles.productQuestionGrid}>
            {productPageQuestions.map((question, index) => (
              <div className={styles.productQuestionPlate} key={question}>
                <span>{formatOrdinal(index)}</span>
                <strong>{question}</strong>
              </div>
            ))}
          </div>
        </section>

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
