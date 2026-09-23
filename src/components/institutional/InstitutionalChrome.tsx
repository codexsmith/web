"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BoundaryFirstWaveLogo } from "@/components/BoundaryFirstWaveLogo";
import { LabCommandPalette } from "./LabCommandPalette";
import { PUBLIC_CONTACT_EMAIL, PUBLIC_CONTACT_MAILTO } from "@/lib/site-contact";
import { institutionalFooterGroups, institutionalRoutes } from "./institutionalRoutes";
import styles from "./styles/InstitutionalFoundation.module.css";

function routeIsActive(pathname: string, href: string) {
  if (
    href === "/research" &&
    (pathname === "/publications" || pathname.startsWith("/publications/"))
  ) {
    return true;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function InstitutionalHeader() {
  const pathname = usePathname();
  const [heroPassed, setHeroPassed] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver | undefined;

    const frame = window.requestAnimationFrame(() => {
      const hero = document.querySelector<HTMLElement>(
        "main [data-institutional-hero]",
      );

      if (!hero) {
        setHeroPassed(false);
        return;
      }

      setHeroPassed(hero.getBoundingClientRect().bottom <= 0);

      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry) return;
          setHeroPassed(entry.boundingClientRect.bottom <= 0);
        },
        { threshold: [0, 0.01] },
      );

      observer.observe(hero);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [pathname]);

  return (
    <header
      className={styles.header}
      data-header-compact={heroPassed ? "true" : "false"}
    >
      <Link className={styles.brand} href="/" aria-label="Boundary First Labs home">
        <BoundaryFirstWaveLogo className={styles.logo} variant="compact" decorative />
        <span className={styles.brandCopy} aria-hidden={heroPassed ? "true" : undefined}>
          <strong>Boundary First Labs</strong>
        </span>
      </Link>

      <nav className={styles.nav} aria-label="Boundary First Labs">
        {institutionalRoutes.map((route) => {
          const active = routeIsActive(pathname, route.href);

          return (
            <Link
              key={route.href}
              href={route.href}
              className={styles.navLink}
              aria-current={active ? "page" : undefined}
            >
              {route.label}
            </Link>
          );
        })}
      </nav>

      <div className={styles.headerTools}>
        <LabCommandPalette />
      </div>
    </header>
  );
}

export function InstitutionalFooter() {
  return (
    <footer className={styles.footer}>
      <Link
        className={styles.footerBrand}
        href="/"
        aria-label="Boundary First Labs home"
      >
        <BoundaryFirstWaveLogo className={styles.footerLogo} variant="compact" decorative />
        <div>
          <strong>Boundary First Labs</strong>
          <span>Practice-born. Research-backed. Formally generalized.</span>
        </div>
      </Link>

      <nav className={styles.footerNav} aria-label="Boundary First Labs footer">
        {institutionalFooterGroups.map((group) => (
          <div className={styles.footerNavGroup} key={group.label}>
            <p className={styles.footerNavLabel}>{group.label}</p>
            <div className={styles.footerNavLinks}>
              {group.routes.map((route) => (
                <Link key={route.href} href={route.href}>
                  {route.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className={styles.footerMeta}>
        <a href={PUBLIC_CONTACT_MAILTO}>{PUBLIC_CONTACT_EMAIL}</a>
        <span>© 2026 Boundary First Labs</span>
      </div>
    </footer>
  );
}
