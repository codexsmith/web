import { BoundaryFirstWaveLogo } from "@/components/BoundaryFirstWaveLogo";
import { institutionalRoutes } from "./institutionalRoutes";
import styles from "./styles/InstitutionalFoundation.module.css";

export function InstitutionalHeader() {
  return (
    <header className={styles.header}>
      <a className={styles.brand} href="/v3" aria-label="Boundary First Labs Website v3 home">
        <BoundaryFirstWaveLogo className={styles.logo} variant="compact" decorative />
        <span className={styles.brandCopy}>
          <strong>Boundary First Labs</strong>
        </span>
      </a>

      <nav className={styles.nav} aria-label="Boundary First Labs">
        {institutionalRoutes.map((route) => (
          <a key={route.href} href={route.href}>
            {route.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export function InstitutionalFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerBrand}>
        <BoundaryFirstWaveLogo className={styles.footerLogo} variant="compact" decorative />
        <div>
          <strong>Boundary First Labs</strong>
          <span>Practice-born. Research-backed. Formally generalized.</span>
        </div>
      </div>

      <nav className={styles.footerNav} aria-label="Boundary First Labs footer">
        {institutionalRoutes.map((route) => (
          <a key={route.href} href={route.href}>
            {route.label}
          </a>
        ))}
      </nav>

      <div className={styles.footerMeta}>
        <span>© 2026 Boundary First Labs</span>
      </div>
    </footer>
  );
}
