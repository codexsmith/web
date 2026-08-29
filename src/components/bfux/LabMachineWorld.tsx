"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BoundaryFrame } from "@/components/boundary-frame";
import { EvidenceView } from "@/components/evidence-view";
import { GestaltView } from "@/components/gestalt-view";
import { SearchPanel } from "@/components/search-panel";
import { hydrateContentNode } from "@/lib/content-projections";
import { getNode, getPathForNode } from "@/lib/content-registry";
import { processScopes, type ProcessScope } from "@/lib/bfl-process";
import type { ProjectionMode } from "@/lib/view-projection";
import { LabMachineAboutProjection } from "./LabMachineAboutProjection";
import { LabMachineApplicationsProjection } from "./LabMachineApplicationsProjection";
import { LabMachineDetailPanel } from "./LabMachineDetailPanel";
import { LabMachineGovernanceProjection } from "./LabMachineGovernanceProjection";
import { LabMachineMethodProjection } from "./LabMachineMethodProjection";
import { LabMachinePeopleProjection } from "./LabMachinePeopleProjection";
import { LabMachinePipelineProjection } from "./LabMachinePipelineProjection";
import { LabMachineProductsProjection } from "./LabMachineProductsProjection";
import { LabMachinePublicValueProjection } from "./LabMachinePublicValueProjection";
import { LabMachineResearchProjection } from "./LabMachineResearchProjection";
import { LabMachineServiceProjection } from "./LabMachineServiceProjection";
import { LabMachineTimelineProjection } from "./LabMachineTimelineProjection";
import { PhysicalMachineExperience } from "./PhysicalMachineExperience";
import { getLabMachineNode } from "./lab-machine-model";

type Props = {
  section?: string;
  initialProjection: ProjectionMode;
  initialProcessScope: ProcessScope;
  showSchematic?: boolean;
};

const coreNodePaths: Partial<Record<string, string>> = {
  people: "/public-interest",
  products: "/products",
  publications: "/publications",
  about: "/about",
  research: "/research",
};

function machineUrl(projection: ProjectionMode = "world", scope: ProcessScope = "full", section?: string) {
  const params = new URLSearchParams({ skin: "physical" });
  if (section && projection === "world") params.set("section", section);
  if (projection === "evidence") params.set("view", "evidence");
  if (projection === "gestalt") params.set("view", "timeline");
  if (projection === "gestalt" && scope !== "full") params.set("scope", scope);
  return `/world?${params.toString()}`;
}

function SectionSurface({ section, onClose }: { section: string; onClose: () => void }) {
  switch (section) {
    case "research":
      return <LabMachineResearchProjection initialMode="program-map" onBack={onClose} onClose={onClose} />;
    case "products":
      return <LabMachineProductsProjection initialMode="experimental-portfolio" onBack={onClose} onClose={onClose} />;
    case "applications":
      return <LabMachineApplicationsProjection initialMode="domain-map" onBack={onClose} onClose={onClose} />;
    case "service":
      return <LabMachineServiceProjection initialMode="distribution-map" onBack={onClose} onClose={onClose} />;
    case "public-value":
      return <LabMachinePublicValueProjection initialMode="capability-map" onBack={onClose} onClose={onClose} />;
    case "people":
      return <LabMachinePeopleProjection initialMode="participation-network" onBack={onClose} onClose={onClose} />;
    case "method":
      return <LabMachineMethodProjection initialMode="method-stack" onBack={onClose} onClose={onClose} />;
    case "pipeline":
      return <LabMachinePipelineProjection initialMode="flow-map" onBack={onClose} onClose={onClose} />;
    case "governance":
      return <LabMachineGovernanceProjection initialMode="authority-map" onBack={onClose} onClose={onClose} />;
    case "about":
      return <LabMachineAboutProjection initialMode="institutional-profile" onBack={onClose} onClose={onClose} />;
    case "timeline":
      return <LabMachineTimelineProjection initialMode="institutional-timeline" onBack={onClose} onClose={onClose} />;
    case "publications": {
      const node = getLabMachineNode("publications");
      return node ? <LabMachineDetailPanel node={node} onClose={onClose} /> : null;
    }
    default:
      return null;
  }
}

export function LabMachineWorld({ section, initialProjection, initialProcessScope, showSchematic = false }: Props) {
  const router = useRouter();
  const rootNode = useMemo(() => hydrateContentNode(getNode("root")), []);
  const projection = initialProjection;
  const processScope = initialProcessScope;
  const [searchOpen, setSearchOpen] = useState(false);

  const processScopeIndex = processScopes.indexOf(processScope);
  const canProcessZoomOut = processScopeIndex > 0;
  const canProcessZoomIn = processScopeIndex < processScopes.length - 1;

  const closeSection = () => router.push(machineUrl("world", "full"), { scroll: false });
  const openSection = (nodeId: string) => router.push(machineUrl("world", "full", nodeId), { scroll: false });
  const openCoreNode = (nodeId: string) => {
    const destination = coreNodePaths[nodeId];
    if (destination) router.push(destination, { scroll: false });
    else openSection(nodeId);
  };
  const returnToMachine = () => {
    router.push(machineUrl("world", "full"), { scroll: false });
  };
  const openMachine = () => router.push("/world");
  const changeProjection = (nextProjection: ProjectionMode) => {
    router.push(machineUrl(nextProjection, processScope), { scroll: false });
  };
  const changeProcessScope = (nextScope: ProcessScope) => {
    router.replace(machineUrl(projection, nextScope), { scroll: false });
  };
  const navigateAway = (nodeId: string) => {
    setSearchOpen(false);
    router.push(getPathForNode(nodeId), { scroll: false });
  };

  if (projection === "world") {
    const sectionNode = section ? getLabMachineNode(section) : null;

    return (
      <main className="world-machine-preview">
        <PhysicalMachineExperience
          showSchematic={showSchematic}
          initialResolution={section ? "mid" : "focus"}
          sectionLabel={sectionNode?.label}
          sectionSurface={section ? <SectionSurface section={section} onClose={closeSection} /> : undefined}
          onCloseSection={closeSection}
          onOpenNode={openSection}
          onOpenCoreNode={openCoreNode}
        />
      </main>
    );
  }

  const projectionSurface = projection === "evidence" ? (
    <EvidenceView focusNode={rootNode} onNavigate={navigateAway} />
  ) : (
    <GestaltView focusNode={rootNode} scope={processScope} onNavigate={navigateAway} />
  );

  return (
    <div
      className="site-shell"
      data-world-mode={projection}
      data-projection={projection}
      data-projection-intent={projection}
      data-projection-fallback="false"
      data-ui-renderer="cards"
      data-root-focus="true"
      data-has-siblings="false"
      data-show-traversal="false"
    >
      <BoundaryFrame
        visible
        focusNode={rootNode}
        traversalPath={[rootNode]}
        traversalCursor={0}
        siblings={[]}
        projection={projection}
        processScope={processScope}
        canTraceBack={Boolean(section)}
        canTraceForward={false}
        canProcessZoomOut={canProcessZoomOut}
        canProcessZoomIn={canProcessZoomIn}
        onHome={openMachine}
        onUp={returnToMachine}
        onBack={() => section ? closeSection() : router.back()}
        onForward={() => undefined}
        onLocalNavigate={navigateAway}
        onProcessZoomOut={() => canProcessZoomOut && changeProcessScope(processScopes[processScopeIndex - 1])}
        onProcessZoomIn={() => canProcessZoomIn && changeProcessScope(processScopes[processScopeIndex + 1])}
        onProjectionChange={changeProjection}
        onSearch={() => setSearchOpen(true)}
      />

      {projectionSurface}
      {searchOpen ? <SearchPanel onClose={() => setSearchOpen(false)} onNavigate={navigateAway} /> : null}
    </div>
  );
}
