"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGraph } from "../context/GraphContext";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageMasthead } from "@/components/page-masthead";
import { publicationContent } from "@/lib/publication-suite";

const publicationSearchText = [
  publicationContent.title,
  publicationContent.hero.headline,
  publicationContent.hero.subhead,
  publicationContent.hero.primaryQuote,
  publicationContent.claimCeiling,
  ...publicationContent.featuredCards.flatMap((card) => [
    card.kicker,
    card.title,
    card.quote,
    card.summary,
    card.mechanism,
    card.consequence,
    card.repair,
  ]),
  ...publicationContent.rootCards.flatMap((card) => [card.title, card.quote]),
  ...publicationContent.repairRoutes.flatMap((route) => [
    route.title,
    ...route.useWhen,
    ...route.requiredInputs,
    ...route.operations,
    ...route.outputs,
    route.closureTest,
  ]),
]
  .join(" ")
  .toLowerCase();

function searchableText(node: ReturnType<typeof useGraph>["nodes"][number]) {
  return [
    node.label,
    node.title,
    node.short,
    node.body,
    node.coreThesis ?? "",
    ...node.facets,
    ...node.takeaways,
    ...(node.claims ?? []),
    ...(node.documents ?? []).flatMap((document) => [
      document.title,
      document.type,
      document.maturity,
    ]),
  ]
    .join(" ")
    .toLowerCase();
}

export default function SearchPage() {
  const router = useRouter();
  const { nodes, setActiveNodeId } = useGraph();
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.title = "Search · Boundary First Labs";
    return () => {
      document.title = "Boundary First Labs";
    };
  }, []);
  const normalizedQuery = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!normalizedQuery) return nodes;
    const terms = normalizedQuery.split(/\s+/).filter(Boolean);
    return nodes.filter((node) => {
      const haystack = searchableText(node);
      return terms.every((term) => haystack.includes(term));
    });
  }, [nodes, normalizedQuery]);
  const publicationMatches = useMemo(() => {
    if (!normalizedQuery) return true;
    return normalizedQuery
      .split(/\s+/)
      .filter(Boolean)
      .every((term) => publicationSearchText.includes(term));
  }, [normalizedQuery]);
  const totalResults = results.length + (publicationMatches ? 1 : 0);

  const openNode = (id: string) => {
    const targetNode = nodes.find((n) => n.id === id);
    if (targetNode?.associatedURL) {
      router.push(targetNode.associatedURL);
    } else {
      setActiveNodeId(id);
      router.push(`/domain/${id}`);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader variant="minimal" />
      <PageMasthead
        deck="Find a domain, publication, claim, or document."
        description="Search the public corpus by topic, title, claim, or source."
        eyebrow="Public corpus"
        title="Search public records"
      >
        <div className="max-w-4xl">
          <label
            className="flex items-center gap-3 rounded-sm border border-border bg-card px-4 shadow-sm focus-within:ring-2 focus-within:ring-ring/30"
            htmlFor="graph-search"
          >
            <Search
              aria-hidden="true"
              className="h-5 w-5 shrink-0 text-foreground-muted"
            />
            <input
              autoComplete="off"
              autoFocus
              className="h-14 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-foreground-muted sm:h-16 sm:text-lg"
              id="graph-search"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try “repair”, “mathematics”, or “public trust”"
              type="search"
              value={query}
            />
            {query && (
              <button
                aria-label="Clear search"
                className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-sm p-2 text-foreground-muted transition-colors hover:bg-muted hover:text-foreground"
                onClick={() => setQuery("")}
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </label>
        </div>
      </PageMasthead>

      <section className="px-5 py-10 sm:px-8 sm:py-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="font-serif text-2xl font-semibold">
              {normalizedQuery ? "Results" : "All public records"}
            </h2>
            <p
              aria-live="polite"
              className="font-mono text-[11px] uppercase tracking-widest text-foreground-muted"
            >
              {totalResults} {totalResults === 1 ? "match" : "matches"}
            </p>
          </div>

          {totalResults > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {publicationMatches ? (
                <Link
                  className="group flex min-h-40 items-start gap-4 rounded-sm border border-border bg-card p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:bg-muted/45 hover:shadow-md"
                  href="/publications/civilizational-mechanics"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-border bg-background">
                    <BookOpen className="h-5 w-5 text-foreground-muted" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[11px] uppercase tracking-widest text-foreground-muted">
                      Publication · v0.1
                    </span>
                    <span className="mt-1 block font-serif text-xl font-semibold leading-tight">
                      Civilizational Mechanics
                    </span>
                    <span className="mt-2 line-clamp-3 block text-sm leading-6 text-foreground-muted">
                      A public pathway from displaced consequence and
                      institutional agency to representational revision and
                      repair.
                    </span>
                  </span>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-foreground-muted transition-transform group-hover:translate-x-1" />
                </Link>
              ) : null}
              {results.map((node) => {
                const Icon = node.icon;
                const eyebrow =
                  typeof node.role === "string"
                    ? node.role
                    : typeof node.layer === "string"
                      ? node.layer
                      : "Domain";
                return (
                  <button
                    className="group flex min-h-40 items-start gap-4 rounded-sm border border-border bg-card p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:bg-muted/45 hover:shadow-md"
                    key={node.id}
                    onClick={() => openNode(node.id)}
                    type="button"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-border bg-background">
                      <Icon className="h-5 w-5 text-foreground-muted" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[11px] uppercase tracking-widest text-foreground-muted">
                        {eyebrow}
                      </span>
                      <span className="mt-1 block font-serif text-xl font-semibold leading-tight">
                        {node.label}
                      </span>
                      <span className="mt-2 line-clamp-3 block text-sm leading-6 text-foreground-muted">
                        {node.short}
                      </span>
                    </span>
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-foreground-muted transition-transform group-hover:translate-x-1" />
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="rounded-sm border border-dashed border-border p-8 text-center sm:p-12">
              <h3 className="font-serif text-2xl font-semibold">
                No matching public record yet.
              </h3>
              <p className="mt-2 text-sm leading-6 text-foreground-muted">
                Try a broader term or search a related concept.
              </p>
              <button
                className="mt-5 font-mono text-[11px] uppercase tracking-widest underline underline-offset-4"
                onClick={() => setQuery("")}
                type="button"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
