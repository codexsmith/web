"use client";

import React from "react";
import Link from "next/link";
import { CosmicShoreMark } from "@/components/cosmic-shore-mark";
import {
  ATLAS_EVIDENCE_HREF,
  ATLAS_HREF,
  ATLAS_LIST_HREF,
  DOMAINS_HREF,
  START_HREF,
} from "@/lib/site-navigation";
import { phase12Launch } from "@/lib/phase12-launch";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-primary px-5 py-14 text-primary-foreground sm:px-8 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link
              href="/"
              className="flex min-h-10 items-center gap-3 transition-opacity hover:opacity-75"
            >
              <span className="flex h-10 w-12 items-center justify-center text-primary-foreground">
                <CosmicShoreMark
                  aria-hidden="true"
                  className="h-10 w-10"
                  surface="dark"
                />
              </span>
              <span className="font-serif text-lg font-semibold">
                Boundary First Labs
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-7 text-primary-foreground-muted">
              {phase12Launch.identity.compactStatement}
            </p>
          </div>

          <div>
            <h2 className="font-mono text-[11px] uppercase tracking-widest text-primary-foreground-muted">
              Learn
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  href="/learn"
                  className="inline-flex min-h-10 items-center text-primary-foreground-secondary transition-colors hover:text-primary-foreground"
                >
                  Guided introduction
                </Link>
              </li>
              <li>
                <Link
                  href={START_HREF}
                  className="inline-flex min-h-10 items-center text-primary-foreground-secondary transition-colors hover:text-primary-foreground"
                >
                  People, Problem, Repair
                </Link>
              </li>
              <li>
                <Link
                  href="/publications"
                  className="inline-flex min-h-10 items-center text-primary-foreground-secondary transition-colors hover:text-primary-foreground"
                >
                  Publications
                </Link>
              </li>
              <li>
                <Link
                  href="/language"
                  className="inline-flex min-h-10 items-center text-primary-foreground-secondary transition-colors hover:text-primary-foreground"
                >
                  Language registry
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-mono text-[11px] uppercase tracking-widest text-primary-foreground-muted">
              Explore
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  href={ATLAS_HREF}
                  className="inline-flex min-h-10 items-center text-primary-foreground-secondary transition-colors hover:text-primary-foreground"
                >
                  Atlas map
                </Link>
              </li>
              <li>
                <Link
                  href={ATLAS_LIST_HREF}
                  className="inline-flex min-h-10 items-center text-primary-foreground-secondary transition-colors hover:text-primary-foreground"
                >
                  Atlas list
                </Link>
              </li>
              <li>
                <Link
                  href={DOMAINS_HREF}
                  className="inline-flex min-h-10 items-center text-primary-foreground-secondary transition-colors hover:text-primary-foreground"
                >
                  Domains
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="inline-flex min-h-10 items-center text-primary-foreground-secondary transition-colors hover:text-primary-foreground"
                >
                  Search
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-mono text-[11px] uppercase tracking-widest text-primary-foreground-muted">
              Work
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  href="/work#systems-audit"
                  className="inline-flex min-h-10 items-center text-primary-foreground-secondary transition-colors hover:text-primary-foreground"
                >
                  Systems Audit
                </Link>
              </li>
              <li>
                <Link
                  href="/work#boundary-first-chess"
                  className="inline-flex min-h-10 items-center text-primary-foreground-secondary transition-colors hover:text-primary-foreground"
                >
                  Boundary First Chess
                </Link>
              </li>
              <li>
                <Link
                  href="/work"
                  className="inline-flex min-h-10 items-center text-primary-foreground-secondary transition-colors hover:text-primary-foreground"
                >
                  Work &amp; Evidence
                </Link>
              </li>
              <li>
                <Link
                  href="/work#engage"
                  className="inline-flex min-h-10 items-center text-primary-foreground-secondary transition-colors hover:text-primary-foreground"
                >
                  Ways to engage
                </Link>
              </li>
              <li>
                <Link
                  href="/methods"
                  className="inline-flex min-h-10 items-center text-primary-foreground-secondary transition-colors hover:text-primary-foreground"
                >
                  Methods
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-mono text-[11px] uppercase tracking-widest text-primary-foreground-muted">
              Laboratory
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  href="/about"
                  className="inline-flex min-h-10 items-center text-primary-foreground-secondary transition-colors hover:text-primary-foreground"
                >
                  About the lab
                </Link>
              </li>
              <li>
                <Link
                  href="/mission"
                  className="inline-flex min-h-10 items-center text-primary-foreground-secondary transition-colors hover:text-primary-foreground"
                >
                  Mission
                </Link>
              </li>
              <li>
                <Link
                  href="/governance"
                  className="inline-flex min-h-10 items-center text-primary-foreground-secondary transition-colors hover:text-primary-foreground"
                >
                  Governance
                </Link>
              </li>
              <li>
                <Link
                  href={ATLAS_EVIDENCE_HREF}
                  className="inline-flex min-h-10 items-center text-primary-foreground-secondary transition-colors hover:text-primary-foreground"
                >
                  Public record
                </Link>
              </li>
              <li>
                <a
                  href="mailto:contact@boundaryfirst.com"
                  className="inline-flex min-h-10 items-center text-primary-foreground-secondary transition-colors hover:text-primary-foreground"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/15 pt-8 sm:flex-row">
          <p className="font-mono text-[11px] uppercase tracking-widest text-primary-foreground-muted">
            &copy; {new Date().getFullYear()} Boundary First Labs. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
