"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BoundaryFirstWaveLogo } from "@/components/BoundaryFirstWaveLogo";
import { institutionalFooterRoutes, institutionalRoutes } from "./institutionalRoutes";
import styles from "./styles/InstitutionalFoundation.module.css";

function routeIsActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function InstitutionalHeader() {
  const pathname = usePathname();
  const [heroPassed, setHeroPassed] = useState(false);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(
      "main [data-institutional-hero]",
    );

    if (!hero) {
      setHeroPassed(false);
      return;
    }

    const updateFromRect = () => {
      setHeroPassed(hero.getBoundingClientRect().bottom <= 0);
    };

    updateFromRect();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        setHeroPassed(entry.boundingClientRect.bottom <= 0);
      },
      { threshold: [0, 0.01] },
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, [pathname]);

  return (
    <header
      className={styles.header}
      data-header-compact={heroPassed ? "true" : "false"}
    >
      <a className={styles.brand} href="/v3" aria-label="Boundary First Labs Website v3 home">
        <BoundaryFirstWaveLogo className={styles.logo} variant="compact" decorative />
        <span className={styles.brandCopy} aria-hidden={heroPassed ? "true" : undefined}>
          <strong>Boundary First Labs</strong>
        </span>
      </a>

      <nav className={styles.nav} aria-label="Boundary First Labs">
        {institutionalRoutes.map((route) => {
          const active = routeIsActive(pathname, route.href);

          return (
            <a
              key={route.href}
              href={route.href}
              aria-current={active ? "page" : undefined}
            >
              {route.label}
            </a>
          );
        })}
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
        {institutionalFooterRoutes.map((route) => (
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
