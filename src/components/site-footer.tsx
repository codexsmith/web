"use client";

import Link from "next/link";
import { CosmicShoreMark } from "@/components/cosmic-shore-mark";
import {
  ATLAS_HREF,
  ATLAS_LIST_HREF,
  DOMAINS_HREF,
} from "@/lib/site-navigation";
import { phase12Launch } from "@/lib/phase12-launch";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-primary px-5 py-14 text-primary-foreground sm:px-8 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="flex min-h-10 items-center gap-3 transition-opacity hover:opacity-75">
              <span className="flex h-12 w-12 items-center justify-center text-primary-foreground">
                <CosmicShoreMark aria-hidden="true" className="h-12 w-12" surface="dark" variant="compact" />
              </span>
              <span className="font-serif text-lg font-semibold">Boundary First Labs</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-7 text-primary-foreground-muted">
              {phase12Launch.identity.compactStatement}
            </p>
            <p className="mt-4 max-w-sm font-mono text-[9px] uppercase leading-5 tracking-[0.11em] text-primary-foreground-muted">
              One governed corpus · multiple public projections · progressive disclosure
            </p>
          </div>

          <FooterColumn
            title="Start"
            links={[
              ["Software", "/software"],
              ["Methods", "/methods"],
              ["Guided introduction", "/learn"],
              ["Work & portfolio", "/work"],
              ["Work index", "/work/index"],
            ]}
          />
          <FooterColumn
            title="Research"
            links={[
              ["Research entrance", "/research"],
              ["Evidence", "/evidence"],
              ["Sandbox registry", "/sandbox"],
              ["Representation lab", "/sandbox/representation-lab"],
              ["Domains", DOMAINS_HREF],
              ["Atlas map", ATLAS_HREF],
              ["Atlas list", ATLAS_LIST_HREF],
              ["Formal core", "/theory"],
            ]}
          />
          <FooterColumn
            title="Institute"
            links={[
              ["About the lab", "/about"],
              ["Mission", "/mission"],
              ["Governance", "/governance"],
              ["Institutional trust", "/trust"],
              ["Accessibility", "/accessibility"],
              ["People", "/people"],
              ["Outreach projections", "/outreach"],
            ]}
          />
          <div>
            <h2 className="font-mono text-[11px] uppercase tracking-widest text-primary-foreground-muted">Contact</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/inquire" className="inline-flex min-h-10 items-center text-primary-foreground-secondary transition-colors hover:text-primary-foreground">
                  Contextual inquiry
                </Link>
              </li>
              <li>
                <a href="mailto:contact@boundaryfirstlabs.com" className="inline-flex min-h-10 items-center text-primary-foreground-secondary transition-colors hover:text-primary-foreground">
                  contact@boundaryfirstlabs.com
                </a>
              </li>
              <li>
                <Link href="/search" className="inline-flex min-h-10 items-center text-primary-foreground-secondary transition-colors hover:text-primary-foreground">Search public records</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/15 pt-8 sm:flex-row">
          <p className="font-mono text-[11px] uppercase tracking-widest text-primary-foreground-muted">
            &copy; {new Date().getFullYear()} Boundary First Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly (readonly [string, string])[];
}) {
  return (
    <div>
      <h2 className="font-mono text-[11px] uppercase tracking-widest text-primary-foreground-muted">{title}</h2>
      <ul className="mt-4 space-y-3 text-sm">
        {links.map(([label, href]) => (
          <li key={href}>
            <Link href={href} className="inline-flex min-h-10 items-center text-primary-foreground-secondary transition-colors hover:text-primary-foreground">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
