"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useGraph } from "@/app/context/GraphContext";
import { DomainArchitectureTree } from "@/components/domain-architecture-tree";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { domainMapHref } from "@/lib/site-navigation";

export default function DomainsPage() {
  const { nodes, setActiveNodeId } = useGraph();
  const router = useRouter();

  const handleExploreNode = (id: string) => {
    setActiveNodeId(id);
    router.push(domainMapHref(id));
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <React.Suspense fallback={<div className="p-8 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Loading architecture...</div>}>
        <DomainArchitectureTree
          nodes={nodes}
          onExploreNode={handleExploreNode}
        />
      </React.Suspense>
      <SiteFooter />
    </main>
  );
}
