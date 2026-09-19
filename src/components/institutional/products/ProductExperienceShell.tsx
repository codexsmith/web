import Link from "next/link";
import type { ReactNode } from "react";
import { InstitutionalPageShell } from "../InstitutionalPageShell";
import { LabObjectIdentity } from "../LabObjectIdentity";
import styles from "../styles/ProductExperience.module.css";

export type ProductExperienceNavItem = {
  href: string;
  label: string;
};

export type ProductExperienceAction = {
  href: string;
  label: string;
  kind?: "primary" | "secondary";
};

export type ProductExperienceMeta = {
  family: string;
  name: string;
  tagline: string;
  lead: string;
  status: string;
  statusNote: string;
  theme: string;
};

export function ProductExperienceShell({
  product,
  heroVisual,
  navItems,
  actions,
  children,
}: {
  product: ProductExperienceMeta;
  heroVisual: ReactNode;
  navItems: readonly ProductExperienceNavItem[];
  actions: readonly ProductExperienceAction[];
  children: ReactNode;
}) {
  return (
    <InstitutionalPageShell mainClassName={styles.productExperiencePage}>
      <div className={styles.productExperienceFrame} data-product-theme={product.theme}>
        <section className={styles.productExperienceHero} data-institutional-hero>
          <div className={styles.productHeroCopy}>
            <Link className={styles.productBreadcrumb} href="/v3/products">
              <span aria-hidden="true">←</span>
              Products / {product.family}
            </Link>

            <LabObjectIdentity
              appearance="inverse"
              kind="product"
              secondary={product.family}
              secondaryLabel="FAMILY"
              status={product.status}
              statusLabel="PUBLIC STATUS"
              variant="compact"
            />
            <h1>{product.name}</h1>
            <p className={styles.productHeroTagline}>{product.tagline}</p>
            <p className={styles.productHeroLead}>{product.lead}</p>

            <div className={styles.productHeroActions}>
              {actions.map((action) => (
                <Link
                  className={
                    action.kind === "secondary"
                      ? styles.productHeroActionSecondary
                      : styles.productHeroActionPrimary
                  }
                  href={action.href}
                  key={action.href}
                >
                  {action.label}
                  <span aria-hidden="true">→</span>
                </Link>
              ))}
            </div>

            <div className={styles.productHeroStatus}>
              <span>CURRENT PRODUCT BOUNDARY</span>
              <strong>{product.statusNote}</strong>
            </div>
          </div>

          <div className={styles.productHeroVisual}>{heroVisual}</div>
        </section>

        <nav className={styles.productExperienceNav} aria-label={`${product.name} page sections`}>
          <Link className={styles.productNavHome} href="/v3/products">
            PRODUCT INDEX
          </Link>
          <div>
            {navItems.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {children}
      </div>
    </InstitutionalPageShell>
  );
}
