"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { CosmicShoreMark } from "@/components/cosmic-shore-mark";
import {
  IMMERSIVE_NAV_ITEMS,
  PRIMARY_NAV_ITEMS,
  isNavigationItemActive,
} from "@/lib/site-navigation";

const HEADER_NAV_ITEMS = PRIMARY_NAV_ITEMS;

interface SiteHeaderProps {
  /** Retained for route compatibility; both variants use the same simplified navigation. */
  variant?: "default" | "minimal";
}

export function SiteHeader({ variant = "default" }: SiteHeaderProps) {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const desktopNavItems =
    variant === "minimal" ? IMMERSIVE_NAV_ITEMS : HEADER_NAV_ITEMS;

  const isActive = (href: string) => isNavigationItemActive(pathname, href);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8">
          {/* Logo */}
          <Link
            className="flex items-center gap-3 transition-opacity hover:opacity-75"
            href="/"
          >
            <span className="flex h-12 w-12 items-center justify-center text-foreground">
              <CosmicShoreMark aria-hidden="true" variant="compact" className="h-12 w-12" />
            </span>
            <span>
              <span className="block font-serif text-lg font-semibold tracking-wide sm:text-xl">
                Boundary First Labs
              </span>
              <span className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-foreground-muted xl:block">
                Consequence, governance, repair
              </span>
            </span>
          </Link>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-5 font-mono text-[11px] uppercase tracking-widest text-foreground-muted md:flex"
          >
            {desktopNavItems.map((item) => (
              <Link
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`transition-colors hover:text-foreground ${
                  isActive(item.href) ? "text-foreground" : ""
                }`}
                href={item.href}
                key={item.label}
              >
                {item.label}
              </Link>
            ))}
            <Link
              aria-current={isActive("/search") ? "page" : undefined}
              aria-label="Search public records"
              className={`inline-flex min-h-10 min-w-10 items-center justify-center rounded-sm border border-border transition-colors hover:bg-card hover:text-foreground ${
                isActive("/search") ? "bg-card text-foreground" : ""
              }`}
              href="/search"
            >
              <Search aria-hidden="true" className="h-4 w-4" />
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm border border-border p-2 text-foreground-muted transition-colors hover:bg-muted hover:text-foreground md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            type="button"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          {/* Panel */}
          <nav
            aria-label="Mobile navigation"
            className="absolute right-0 top-0 h-full w-72 max-w-[80vw] border-l border-border bg-background shadow-2xl"
          >
            <div className="flex h-16 items-center justify-between border-b border-border px-5 sm:h-20">
              <span className="font-serif text-lg font-semibold">Navigate</span>
              <button
                aria-label="Close menu"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm p-2 text-foreground-muted hover:bg-muted hover:text-foreground"
                onClick={() => setMobileOpen(false)}
                type="button"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-col gap-1 p-4">
              {HEADER_NAV_ITEMS.map((item) => (
                <Link
                  aria-current={isActive(item.href) ? "page" : undefined}
                  key={item.label}
                  href={item.href}
                  className={`rounded-sm px-4 py-3 font-mono text-[11px] uppercase tracking-widest transition-colors hover:bg-muted ${
                    isActive(item.href)
                      ? "bg-muted text-foreground"
                      : "text-foreground-muted"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <Link
                aria-current={isActive("/search") ? "page" : undefined}
                className={`mt-2 flex min-h-12 items-center justify-center gap-2 rounded-sm border border-border px-4 py-3 text-center font-mono text-[11px] uppercase tracking-widest transition-colors hover:bg-muted ${
                  isActive("/search")
                    ? "bg-muted text-foreground"
                    : "text-foreground-muted"
                }`}
                href="/search"
                onClick={() => setMobileOpen(false)}
              >
                <Search aria-hidden="true" className="h-4 w-4" />
                Search records
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
