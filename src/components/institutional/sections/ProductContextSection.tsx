import type { ReactNode } from "react";
import { ReflowField, ReflowFieldItem } from "@/components/bfux/ReflowField";
import { InstitutionalSectionHeader } from "../InstitutionalPrimitives";
import { formatOrdinal } from "../institutionalFormat";
import foundationStyles from "../styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "../styles/InstitutionalRouteShared.module.css";
import routeStyles from "../styles/Products.module.css";
import { composeCssModules } from "../styles/composeCssModules";
import {
  productPageQuestions,
  secondaryProducts,
} from "../content/products";

const styles = composeCssModules(
  foundationStyles,
  routeSharedStyles,
  routeStyles,
);

const productContextOrder = [
  "research-market",
  "secondary-pipeline",
  "consumer-ethos",
  "commercial-truth",
  "public-product-object",
] as const;

function ProductContextSummary({
  index,
  eyebrow,
  title,
  description,
}: {
  index: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className={styles.productContextSummary}>
      <span>{index}</span>
      <p className={styles.sectionIndex}>{eyebrow}</p>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function ProductContextCard({
  id,
  label,
  index,
  eyebrow,
  title,
  description,
  className,
  tone,
  children,
}: {
  id: string;
  label: string;
  index: string;
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
          index={index}
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
          eyebrow={<>PRODUCT CONTEXT</>}
          title={<>The machinery around commercialization.</>}
          note={<>Select any plate to inspect the product discipline without leaving the page context.</>}
        />

        <ReflowField
          className={styles.productContextGrid}
          ariaLabel="Product commercialization context"
          layoutMode="focus-stage"
          itemOrder={productContextOrder}
        >
          <ProductContextCard
            id="research-market"
            label="Research to Market"
            index="01"
            eyebrow="RESEARCH → MARKET"
            title="One body of work can support several bounded product tests."
            description="Do not count every conceivable extension as a separate product before evidence exists."
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
            label="Secondary Pipeline"
            index="02"
            eyebrow="SECONDARY PIPELINE"
            title="Product-shaped work, not yet the near-term edge."
            description="Additional product candidates retain explicit next gates instead of being promoted early."
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
                    <span>NEXT GATE</span>
                    {product.next}
                  </div>
                </article>
              ))}
            </div>
          </ProductContextCard>

          <ProductContextCard
            id="consumer-ethos"
            label="Consumer Ethos"
            index="03"
            eyebrow="CONSUMER ETHOS"
            title="A good product leaves the user more capable than it found them."
            description="The product should transfer useful capability rather than merely retain attention."
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
            label="Commercial Truth"
            index="04"
            eyebrow="COMMERCIAL TRUTH"
            title="Do not confuse a promising artifact with a validated market."
            description="Product evidence, market evidence, and scientific validation remain different claims."
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
            label="Public Product Object"
            index="05"
            eyebrow="PUBLIC PRODUCT OBJECT"
            title="What a product page should answer."
            description="Enough state for a user or partner to understand the offer without guessing."
            className={styles.productContextObject}
            tone="object"
          >
            <div className={styles.productObjectDetail}>
              <p>
                The product counterpart to the Lab&apos;s research-object grammar: expose the
                offer, current state, evidence, uncertainty, next milestone, and stewardship
                boundary together.
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
