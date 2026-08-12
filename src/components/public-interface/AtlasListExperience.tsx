"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CircleDot, ListTree } from "lucide-react";
import { useGraph } from "@/app/context/GraphContext";
import { AtlasEvidenceWorkSurface } from "@/components/atlas-evidence-work-surface";
import { AtlasViewSwitch } from "@/components/atlas-view-switch";
import { DomainArchitectureTree } from "@/components/domain-architecture-tree";
import { ProjectionProvenance } from "@/components/public-interface/ProjectionProvenance";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { DOMAIN_ARCHITECTURE_STAGES } from "@/lib/domain-architecture";
import {
  ATLAS_LIST_HREF,
  domainMapHref,
} from "@/lib/site-navigation";
import atlasProjection from "@/content/public-projections/atlas.json";

export function AtlasListExperience() {
  const { nodes, setActiveNodeId } = useGraph();
  const router = useRouter();
  const publicNodes = nodes.filter((node) => node.id !== "identity");

  function openGraphForNode(id: string) {
    setActiveNodeId(id);
    router.push(domainMapHref(id));
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <SiteHeader variant="minimal" />

      <div className="border-b border-border bg-card/70 px-5 py-3 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Research Atlas
            </p>
            <p className="mt-1 text-xs leading-5 text-foreground/68">
              One governed record set, with a spatial map and a traditional list.
            </p>
          </div>
          <AtlasViewSwitch current="list" />
        </div>
      </div>

      <section className="border-b border-border bg-primary px-5 py-12 text-primary-foreground sm:px-8 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.68fr)] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <ListTree aria-hidden="true" className="h-6 w-6 text-primary-foreground/68" />
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/58">
                List view · non-graph interface
              </p>
            </div>
            <h1 className="mt-5 max-w-5xl font-serif text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl">
              The complete Atlas, without the graph.
            </h1>
          </div>
          <div>
            <p className="text-base leading-8 text-primary-foreground/76">
              Browse the same public domain records as a conventional index,
              grouped by architecture stage. Open a record directly, or move
              into the map only when spatial relations add useful context.
            </p>
            <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden border border-primary-foreground/20 bg-primary-foreground/20">
              <div className="bg-primary p-4">
                <dt className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-primary-foreground/52">
                  Public records
                </dt>
                <dd className="mt-2 font-serif text-3xl font-semibold">
                  {publicNodes.length}
                </dd>
              </div>
              <div className="bg-primary p-4">
                <dt className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-primary-foreground/52">
                  Architecture stages
                </dt>
                <dd className="mt-2 font-serif text-3xl font-semibold">
                  {DOMAIN_ARCHITECTURE_STAGES.length}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <ProjectionProvenance
        boundary="This list and the interactive map use the same governed public record set. The list is complete for domain coverage; typed topology, semantic lenses, and relation inspection remain map-specific views."
        source={atlasProjection.source}
      />

      <React.Suspense fallback={null}>
        <AtlasEvidenceWorkSurface />
      </React.Suspense>

      <section aria-labelledby="atlas-list-title" className="pt-12 sm:pt-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Indexed research architecture
            </p>
            <h2 className="mt-3 max-w-4xl font-serif text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl" id="atlas-list-title">
              Browse every public domain record.
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-foreground/68">
              Search names, roles, descriptions, and facets. Every record links
              to its readable page and retains a direct path into graph relations.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-5">
          <React.Suspense
            fallback={
              <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
                <p className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  <CircleDot aria-hidden="true" className="h-3.5 w-3.5" />
                  Loading Atlas list
                </p>
              </div>
            }
          >
            <DomainArchitectureTree
              basePath={ATLAS_LIST_HREF}
              defaultOpenAll
              nodes={publicNodes}
              onExploreNode={openGraphForNode}
            />
          </React.Suspense>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
