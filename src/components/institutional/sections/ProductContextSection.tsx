import type { ReactNode } from "react";
import { ReflowField, ReflowFieldItem } from "@/components/bfux/ReflowField";
import { InstitutionalSectionHeader } from "../InstitutionalPrimitives";
import { formatOrdinal } from "../institutionalFormat";
import foundationStyles from "../styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "../styles/InstitutionalRouteShared.module.css";
import routeStyles from "../styles/Products.module.css";
import { composeCssModules } from "../styles/composeCssModules";
import {
  productEvidence,
  productPageQuestions,
  secondaryProducts,
} from "../content/products";

const styles = composeCssModules(
  foundationStyles,
  routeSharedStyles,
  routeStyles,
);

const productContextOrder = [
  "why-products-matter",
  "research-market",
  "secondary-pipeline",
  "consumer-ethos",
  "commercial-truth",
  "public-product-object",
] as const;

function ProductContextSummary({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className={styles.productContextSummary}>
      <p className={styles.sectionIndex}>{eyebrow}</p>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function ProductContextCard({
  id,
  label,
  eyebrow,
  title,
  description,
  className,
  tone,
  children,
}: {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  className: string;
  tone: string;
  children: ReactNode;
}) {
  return (
    <ReflowFieldItem
      id={id}
      label={label}
      className={[styles.productContextCard, className].join(" ")}
      dataTone={tone}
      summary={
        <ProductContextSummary
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
      }
      detail={children}
    />
  );
}

export function ProductContextSection() {
  return (
    <section className={styles.productContext}>
      <div className={styles.productContextFrame}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>HOW TO READ THE PRODUCT PORTFOLIO</>}
          title={<>A product should be useful before the Lab makes a big market claim.</>}
          note={<>These sections explain how BFL separates a working artifact from user evidence, market evidence, scientific evidence, and a durable product business.</>}
        />

        <ReflowField
          className={styles.productContextGrid}
          ariaLabel="Product commercialization context"
          layoutMode="focus-stage"
          itemOrder={productContextOrder}
        >
          <ProductContextCard
            id="why-products-matter"
            label="Why Products Matter"
            eyebrow="WHY PRODUCTS MATTER"
            title="Real users provide evidence that internal enthusiasm cannot."
            description="Use, confusion, criticism, return visits, adoption, and payment all reveal whether a product is actually useful."
            className={styles.productContextWhy}
            tone="evidence"
          >
            <div className={styles.productContextDetail}>
              <p>
                A product creates direct contact between a bounded artifact and a real user.
                Attention, comprehension, return use, willingness to pay, retention, and criticism
                become evidence about whether the thing is actually useful.
              </p>
              <div className={styles.productEvidenceGrid}>
                {productEvidence.map(([title, description], index) => (
                  <div className={styles.productEvidencePlate} key={title}>
                    <span>{formatOrdinal(index)}</span>
                    <strong>{title}</strong>
                    <p>{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </ProductContextCard>

          <ProductContextCard
            id="research-market"
            label="From Research to Product"
            eyebrow="RESEARCH → PRODUCT"
            title="One body of work can support several small product tests."
            description="Do not turn every possible extension into a separate product before users provide evidence."
            className={styles.productContextResearchMarket}
            tone="conversion"
          >
            <div className={styles.productContextDetail}>
              <p>
                The Lab should not count every conceivable extension as a separate product
                before evidence exists.
              </p>
              <div className={styles.conversionRail}>
                <span>Existing core asset</span>
                <span>Bounded derivative</span>
                <span>User / partner test</span>
                <span>Paid / adoption evidence</span>
                <span>Durable extension or explicit product split</span>
              </div>
            </div>
          </ProductContextCard>

          <ProductContextCard
            id="secondary-pipeline"
            label="Other Candidates"
            eyebrow="OTHER CANDIDATES"
            title="Some work looks product-shaped but is not yet a current offer."
            description="Additional candidates keep a clear next test instead of being presented as ready too early."
            className={styles.productContextPipeline}
            tone="pipeline"
          >
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
                    <span>NEXT TEST</span>
                    {product.next}
                  </div>
                </article>
              ))}
            </div>
          </ProductContextCard>

          <ProductContextCard
            id="consumer-ethos"
            label="User Benefit"
            eyebrow="USER BENEFIT"
            title="A good product should leave the user more capable."
            description="The aim is useful capability, not merely attention or dependence."
            className={styles.productContextEthos}
            tone="ethos"
          >
            <div className={styles.productEthosDetail}>
              <p>
                A book should help someone see or do something. A course should teach a
                transferable skill. A tool should expose useful structure. A knowledge explorer
                should improve navigation rather than merely summarize more aggressively.
              </p>
            </div>
          </ProductContextCard>

          <ProductContextCard
            id="commercial-truth"
            label="What the Market Has Not Proven"
            eyebrow="MARKET EVIDENCE"
            title="A promising artifact is not the same as a validated market."
            description="Working software, user value, willingness to pay, retention, and scientific validation remain different claims."
            className={styles.productContextTruth}
            tone="truth"
          >
            <div className={styles.commercialTruthDetail}>
              <div className={styles.firewallEquations}>
                <code>existing asset ≠ production-ready release ≠ paid transaction ≠ retained customer ≠ product-market fit</code>
                <code>active build ≠ available now ≠ market validated</code>
                <code>audience interest ≠ willingness to pay ≠ retention</code>
                <code>product success ≠ scientific validation</code>
                <code>revenue ≠ research truth</code>
              </div>
            </div>
          </ProductContextCard>

          <ProductContextCard
            id="public-product-object"
            label="What Every Product Page Should Answer"
            eyebrow="PRODUCT PAGE CHECKLIST"
            title="A visitor should not have to guess what exists."
            description="Every product page should make the offer, audience, current state, evidence, uncertainty, next milestone, and ownership clear."
            className={styles.productContextObject}
            tone="object"
          >
            <div className={styles.productObjectDetail}>
              <p>
                A strong product page should show the offer, who it is for, what exists now,
                what users have or have not demonstrated, what comes next, and who is
                responsible for maintaining it.
              </p>
              <div className={styles.productQuestionGrid}>
                {productPageQuestions.map((question, index) => (
                  <div className={styles.productQuestionPlate} key={question}>
                    <span>{formatOrdinal(index)}</span>
                    <strong>{question}</strong>
                  </div>
                ))}
              </div>
            </div>
          </ProductContextCard>
        </ReflowField>
      </div>
    </section>
  );
}
