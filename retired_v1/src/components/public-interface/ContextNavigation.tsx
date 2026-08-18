"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ATLAS_EVIDENCE_HREF,
  destinationPath,
  START_HREF,
} from "@/lib/site-navigation";

const navigation = {
  work: {
    label: "Work",
    links: [
      { label: "Overview", href: "/work" },
      { label: "Index", href: "/work/index" },
      { label: "Capabilities", href: "/work/capabilities" },
      { label: "Sandboxes", href: "/sandbox" },
      { label: "How we help", href: "/help" },
      { label: "How we work", href: "/practice" },
      { label: "Methods", href: "/methods" },
      { label: "Outreach", href: "/outreach" },
      { label: "Collaborate", href: "/collaborate" },
      { label: "Inquire", href: "/inquire?intent=work" },
      { label: "Start another path", href: START_HREF },
    ],
  },
  laboratory: {
    label: "Laboratory",
    links: [
      { label: "About", href: "/about" },
      { label: "Mission", href: "/mission" },
      { label: "Governance", href: "/governance" },
      { label: "People", href: "/people" },
      { label: "Trust", href: "/trust" },
      { label: "Architecture", href: "/trust/architecture" },
      { label: "Accessibility", href: "/accessibility" },
      { label: "Public record", href: ATLAS_EVIDENCE_HREF },
    ],
  },
  explore: {
    label: "Explore",
    links: [
      { label: "Research", href: "/research" },
      { label: "Representation lab", href: "/sandbox/representation-lab" },
      { label: "Interaction research", href: "/sandbox/interaction-research" },
      { label: "Domain architecture", href: "/domains" },
      { label: "Map view", href: "/map" },
      { label: "List view", href: "/map/refined" },
      { label: "Record index", href: "/relations" },
    ],
  },
} as const;

export type ContextNavigationGroup = keyof typeof navigation;

export function ContextNavigation({
  group,
}: {
  group: ContextNavigationGroup;
}) {
  const pathname = usePathname();
  const section = navigation[group];
  const activeHref = [...section.links]
    .sort(
      (a, b) => destinationPath(b.href).length - destinationPath(a.href).length,
    )
    .find((link) => {
      const destination = destinationPath(link.href);
      return (
        pathname === destination || pathname.startsWith(`${destination}/`)
      );
    })?.href;

  return (
    <nav
      aria-label={`${section.label} section`}
      className="border-b border-border bg-card/70 px-5 sm:px-8"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-5 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex-wrap md:overflow-visible">
        <span className="shrink-0 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
          {section.label}
        </span>
        <span aria-hidden="true" className="hidden h-4 w-px shrink-0 bg-border md:block" />
        <div className="flex min-w-max items-center gap-1 md:min-w-0 md:flex-wrap">
          {section.links.map((link) => {
            const active = activeHref === link.href;
            return (
              <Link
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-9 items-center px-3 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground-muted hover:bg-background hover:text-foreground"
                }`}
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
