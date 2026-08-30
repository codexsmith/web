"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BoundaryFrame } from "@/components/boundary-frame";
import { BfuxIcon } from "@/components/bfux-icons";
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
import { LabMachinePublicationsProjection } from "./LabMachinePublicationsProjection";
import { LabMachinePublicValueProjection } from "./LabMachinePublicValueProjection";
import { LabMachineResearchProjection } from "./LabMachineResearchProjection";
import { LabMachineServiceProjection } from "./LabMachineServiceProjection";
import { LabMachineTimelineProjection } from "./LabMachineTimelineProjection";
import { LabMachineNavigationProvider, type LabMachineTraversalStep } from "./LabMachineNavigationContext";
import type { LabMachineResolution } from "./LabMachine";
import { PhysicalMachineExperience } from "./PhysicalMachineExperience";
import { getLabMachineConnectingEdge, getLabMachineNode, labMachineEdgeKey } from "./lab-machine-model";

type Props = {
  section?: string;
  initialProjection: ProjectionMode;
  initialProcessScope: ProcessScope;
  showSchematic?: boolean;
  machinePath?: string;
  intermediateLayer?: boolean;
};

const coreNodePaths: Partial<Record<string, string>> = {
  people: "/public-interest",
  products: "/products",
  publications: "/publications",
  about: "/about",
  research: "/research",
};

const resolutionStorageKey = "bfl_lab_machine_resolution";

function machineUrl(basePath: string, projection: ProjectionMode = "world", scope: ProcessScope = "full", section?: string) {
  const params = new URLSearchParams({ skin: "physical" });
  if (section && projection === "world") params.set("section", section);
  if (projection === "evidence") params.set("view", "evidence");
  if (projection === "gestalt") params.set("view", "timeline");
  if (projection === "gestalt" && scope !== "full") params.set("scope", scope);
  return `${basePath}?${params.toString()}`;
}

function SectionSurface({ section, onClose, intermediateLayer = false }: { section: string; onClose: () => void; intermediateLayer?: boolean }) {
  if (intermediateLayer) {
    const node = getLabMachineNode(section);
    return node ? <LabMachineDetailPanel node={node} onClose={onClose} /> : null;
  }

  switch (section) {
    case "research":
      return <LabMachineResearchProjection initialMode="program-map" onBack={onClose} onClose={onClose} />;
    case "products":
      return <LabMachineProductsProjection initialMode="experimental-portfolio" onBack={onClose} onClose={onClose} />;
    case "publications":
      return <LabMachinePublicationsProjection initialMode="publication-map" onBack={onClose} onClose={onClose} />;
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
    default:
      return null;
  }
}

export function LabMachineWorld({
  section,
  initialProjection,
  initialProcessScope,
  showSchematic = false,
  machinePath = "/world",
  intermediateLayer = false,
}: Props) {
  const router = useRouter();
  const rootNode = useMemo(() => hydrateContentNode(getNode("root")), []);
  const [projection, setProjection] = useState<ProjectionMode>(initialProjection);
  const [processScope, setProcessScope] = useState<ProcessScope>(initialProcessScope);
  const [machineResolution, setMachineResolution] = useState<LabMachineResolution>(section ? "mid" : "focus");
  const [searchOpen, setSearchOpen] = useState(false);
  const [navigationFocusId, setNavigationFocusId] = useState(section ?? "research");
  const [navigationTrail, setNavigationTrail] = useState<LabMachineTraversalStep[]>([]);
  const [activeObjectId, setActiveObjectId] = useState<string | null>(null);

  useEffect(() => setProjection(initialProjection), [initialProjection]);
  useEffect(() => setProcessScope(initialProcessScope), [initialProcessScope]);

  const processScopeIndex = processScopes.indexOf(processScope);
  const canProcessZoomOut = processScopeIndex > 0;
  const canProcessZoomIn = processScopeIndex < processScopes.length - 1;

  const setResolution = (nextResolution: LabMachineResolution) => {
    setMachineResolution(nextResolution);
    try {
      window.sessionStorage.setItem(resolutionStorageKey, nextResolution);
    } catch {
      // Resolution remains functional when browser storage is unavailable.
    }
  };

  const closeSection = () => router.push(machineUrl(machinePath, "world", "full"), { scroll: false });
  const openSection = (nodeId: string) => {
    if (intermediateLayer && !section) {
      setNavigationFocusId(nodeId);
      setNavigationTrail([]);
    }
    router.push(machineUrl(machinePath, "world", "full", nodeId), { scroll: false });
  };
  const openCoreNode = (nodeId: string) => {
    const destination = coreNodePaths[nodeId];
    if (destination) router.push(destination, { scroll: false });
    else openSection(nodeId);
  };
  const returnToMachine = () => {
    router.push(machineUrl(machinePath, "world", "full"), { scroll: false });
  };
  const changeProjection = (nextProjection: ProjectionMode) => {
    router.push(machineUrl(machinePath, nextProjection, processScope), { scroll: false });
  };
  const changeProcessScope = (nextScope: ProcessScope) => {
    router.replace(machineUrl(machinePath, projection, nextScope), { scroll: false });
  };
  const navigateAway = (nodeId: string) => {
    setSearchOpen(false);
    router.push(getPathForNode(nodeId), { scroll: false });
  };

  if (projection === "world") {
    const sectionNode = section ? getLabMachineNode(section) : null;
    const navigateTo = (nodeId: string) => {
      const from = section ?? navigationFocusId;
      const edge = getLabMachineConnectingEdge(from, nodeId);
      if (edge) {
        setNavigationTrail((trail) => [...trail, {
          edgeKey: labMachineEdgeKey(edge),
          from,
          to: nodeId,
          relation: edge.relation,
          kind: edge.kind,
          direction: edge.from === from ? "forward" : "reverse",
        }]);
      }
      router.push(machineUrl(machinePath, "world", "full", nodeId), { scroll: false });
    };
    const rewind = () => {
      const prior = navigationTrail.at(-1)?.from ?? navigationFocusId;
      setNavigationTrail((trail) => trail.slice(0, -1));
      router.push(machineUrl(machinePath, "world", "full", prior), { scroll: false });
    };
    const clearTrail = () => {
      setNavigationTrail([]);
      router.push(machineUrl(machinePath, "world", "full", navigationFocusId), { scroll: false });
    };

    const resolutionControls = !section ? (
      <div className="lab-machine-frame-zoom" role="group" aria-label="Lab Machine resolution">
        <button
          type="button"
          onClick={() => setResolution("mid")}
          disabled={machineResolution === "mid"}
          aria-label="Show full Lab Machine loop"
          title="Show full Lab Machine loop"
        >
          <BfuxIcon name="widen" />
          <span>Full loop</span>
        </button>
        <button
          type="button"
          onClick={() => setResolution("focus")}
          disabled={machineResolution === "focus"}
          aria-label="Show core Lab set"
          title="Show core Lab set"
        >
          <BfuxIcon name="narrow" />
          <span>Core set</span>
        </button>
      </div>
    ) : undefined;

    const experience = (
      <div
        className="site-shell"
        data-world-mode="world"
        data-projection="world"
        data-projection-intent="world"
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
          projection="world"
          processScope={processScope}
          canTraceBack={false}
          canTraceForward={false}
          canProcessZoomOut={false}
          canProcessZoomIn={false}
          surfaceLabel={sectionNode ? `Lab Machine · ${sectionNode.label}` : "Lab Machine"}
          contextControls={resolutionControls}
          onHome={returnToMachine}
          onUp={returnToMachine}
          onBack={() => router.back()}
          onForward={() => undefined}
          onLocalNavigate={navigateAway}
          onProcessZoomOut={() => undefined}
          onProcessZoomIn={() => undefined}
          onProjectionChange={changeProjection}
          onSearch={() => setSearchOpen(true)}
        />

        <main className="world-machine-preview">
          <PhysicalMachineExperience
            showSchematic={showSchematic}
            initialResolution={section ? "mid" : "focus"}
            resolution={machineResolution}
            onResolutionChange={setMachineResolution}
            showResolutionControls={Boolean(section)}
            sectionLabel={sectionNode?.label}
            sectionSurface={section ? <SectionSurface section={section} onClose={closeSection} intermediateLayer={intermediateLayer} /> : undefined}
            onCloseSection={closeSection}
            onOpenNode={openSection}
            onOpenCoreNode={openCoreNode}
          />
        </main>
        {searchOpen ? <SearchPanel onClose={() => setSearchOpen(false)} onNavigate={navigateAway} /> : null}
      </div>
    );

    if (!intermediateLayer || !sectionNode) return experience;

    return (
      <LabMachineNavigationProvider value={{
        focusId: navigationFocusId,
        focusLabel: getLabMachineNode(navigationFocusId)?.label ?? sectionNode.label,
        currentNodeId: sectionNode.id,
        trail: navigationTrail,
        activeObjectId,
        navigateTo,
        rewind,
        clearTrail,
        setActiveObjectId,
        loadObject: setActiveObjectId,
      }}>
        {experience}
      </LabMachineNavigationProvider>
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
        surfaceLabel="Lab Machine"
        onHome={returnToMachine}
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
