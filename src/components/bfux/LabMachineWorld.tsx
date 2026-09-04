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
import { CapitalEconomicsFrame } from "./CapitalEconomicsFrame";
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

type LabMachineSurface = "machine" | "capital";

type Props = {
  section?: string;
  initialProjection: ProjectionMode;
  initialProcessScope: ProcessScope;
  initialSurface?: LabMachineSurface;
  initialResolution?: LabMachineResolution;
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

function machineResolutionUrl(basePath: string, resolution: LabMachineResolution) {
  const params = new URLSearchParams({
    skin: "physical",
    resolution: resolution === "mid" ? "full" : "core",
  });
  return `${basePath}?${params.toString()}`;
}

function capitalUrl(basePath: string) {
  const params = new URLSearchParams({ skin: "physical", mode: "capital" });
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
  initialSurface = "machine",
  initialResolution,
  showSchematic = false,
  machinePath = "/world",
  intermediateLayer = false,
}: Props) {
  const router = useRouter();
  const rootNode = useMemo(() => hydrateContentNode(getNode("root")), []);
  const resolvedInitialSurface: LabMachineSurface = section ? "machine" : initialSurface;
  const resolvedInitialResolution: LabMachineResolution = initialResolution ?? (section ? "mid" : "focus");
  const [projection, setProjection] = useState<ProjectionMode>(initialProjection);
  const [processScope, setProcessScope] = useState<ProcessScope>(initialProcessScope);
  const [machineSurface, setMachineSurface] = useState<LabMachineSurface>(resolvedInitialSurface);
  const [machineResolution, setMachineResolution] = useState<LabMachineResolution>(resolvedInitialResolution);
  const [searchOpen, setSearchOpen] = useState(false);
  const [navigationFocusId, setNavigationFocusId] = useState(section ?? "research");
  const [navigationTrail, setNavigationTrail] = useState<LabMachineTraversalStep[]>([]);
  const [activeObjectId, setActiveObjectId] = useState<string | null>(null);

  useEffect(() => setProjection(initialProjection), [initialProjection]);
  useEffect(() => setProcessScope(initialProcessScope), [initialProcessScope]);
  useEffect(() => setMachineSurface(section ? "machine" : initialSurface), [initialSurface, section]);
  useEffect(() => setMachineResolution(initialResolution ?? (section ? "mid" : "focus")), [initialResolution, section]);

  const processScopeIndex = processScopes.indexOf(processScope);
  const canProcessZoomOut = processScopeIndex > 0;
  const canProcessZoomIn = processScopeIndex < processScopes.length - 1;

  const setResolution = (nextResolution: LabMachineResolution) => {
    const returningFromCapital = machineSurface === "capital";
    setMachineSurface("machine");
    setMachineResolution(nextResolution);
    try {
      window.sessionStorage.setItem(resolutionStorageKey, nextResolution);
    } catch {
      // Resolution remains functional when browser storage is unavailable.
    }

    if (returningFromCapital) {
      setProjection("world");
      router.push(machineResolutionUrl(machinePath, nextResolution), { scroll: false });
      return;
    }

    /* Evidence and Timeline are Core projections. Full Loop is a World-only
     * machine state, so widening from either projection returns to World while
     * collapsing those projection choices from the View instrument. */
    if (nextResolution === "mid" && projection !== "world") {
      setProjection("world");
      router.push(machineUrl(machinePath, "world", "full"), { scroll: false });
      return;
    }

    if (nextResolution === "focus" && section) {
      router.push(machineUrl(machinePath, "world", "full"), { scroll: false });
    }
  };

  const openCapital = () => {
    setMachineSurface("capital");
    setProjection("world");
    router.push(capitalUrl(machinePath), { scroll: false });
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
    setMachineSurface("machine");
    setProjection("world");
    if (machineSurface === "capital") {
      setMachineResolution("focus");
      router.push(machineResolutionUrl(machinePath, "focus"), { scroll: false });
      return;
    }
    router.push(machineUrl(machinePath, "world", "full"), { scroll: false });
  };
  const changeProjection = (nextProjection: ProjectionMode) => {
    setMachineSurface("machine");
    setMachineResolution("focus");
    router.push(machineUrl(machinePath, nextProjection, processScope), { scroll: false });
  };
  const changeProcessScope = (nextScope: ProcessScope) => {
    router.replace(machineUrl(machinePath, projection, nextScope), { scroll: false });
  };
  const navigateAway = (nodeId: string) => {
    setSearchOpen(false);
    router.push(getPathForNode(nodeId), { scroll: false });
  };

  const resolutionControls = (
    <>
      <button
        type="button"
        onClick={openCapital}
        aria-pressed={machineSurface === "capital"}
        aria-label="Capital cycle: show how resources become retained Lab capability"
        title="Show the capital conversion cycle"
        data-machine-surface="capital"
      >
        <BfuxIcon name="pressure" className="projection-switcher__glyph" />
        <span className="projection-switcher__copy">
          <span className="projection-switcher__mode-name">Capital</span>
          <small className="projection-switcher__mode-purpose">Cycle</small>
        </span>
      </button>
      <button
        type="button"
        onClick={() => setResolution("mid")}
        aria-pressed={machineSurface === "machine" && machineResolution === "mid"}
        aria-label="Full loop: show the complete Lab Machine"
        title="Show the complete Lab Machine"
        data-machine-resolution="mid"
      >
        <BfuxIcon name="widen" className="projection-switcher__glyph" />
        <span className="projection-switcher__copy">
          <span className="projection-switcher__mode-name">Full</span>
          <small className="projection-switcher__mode-purpose">Loop</small>
        </span>
      </button>
      <button
        type="button"
        onClick={() => setResolution("focus")}
        aria-pressed={machineSurface === "machine" && machineResolution === "focus"}
        aria-label="Core set: show the core Lab Machine"
        title="Show the core Lab Machine"
        data-machine-resolution="focus"
      >
        <BfuxIcon name="narrow" className="projection-switcher__glyph" />
        <span className="projection-switcher__copy">
          <span className="projection-switcher__mode-name">Core</span>
          <small className="projection-switcher__mode-purpose">Set</small>
        </span>
      </button>
    </>
  );

  if (projection === "world") {
    const sectionNode = section ? getLabMachineNode(section) : null;
    const isCapitalSurface = machineSurface === "capital" && !section;
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

    const computedTraversalPath = [rootNode];
    if (sectionNode) {
      computedTraversalPath.push(sectionNode as any);
      navigationTrail.forEach((step) => {
        const node = getLabMachineNode(step.to);
        if (node) computedTraversalPath.push(node as any);
      });
    }
    const currentCursor = computedTraversalPath.length - 1;
    const currentFocus = computedTraversalPath[currentCursor];

    const experience = (
      <div
        className="site-shell"
        data-world-mode={isCapitalSurface ? "capital" : "world"}
        data-projection="world"
        data-projection-intent={isCapitalSurface ? "capital" : "world"}
        data-projection-fallback="false"
        data-ui-renderer="cards"
        data-root-focus="true"
        data-has-siblings="false"
        data-show-traversal="false"
        data-machine-surface={isCapitalSurface ? "capital" : "machine"}
      >
        <BoundaryFrame
          visible
          focusNode={currentFocus}
          traversalPath={computedTraversalPath}
          traversalCursor={currentCursor}
          siblings={[]}
          projection="world"
          processScope={processScope}
          canTraceBack={currentCursor > 0}
          canTraceForward={false}
          canProcessZoomOut={false}
          canProcessZoomIn={false}
          surfaceLabel={isCapitalSurface ? "Capital" : "Lab Machine"}
          viewControls={resolutionControls}
          onHome={returnToMachine}
          onUp={returnToMachine}
          onBack={currentCursor > 1 ? rewind : returnToMachine}
          onForward={() => undefined}
          onLocalNavigate={navigateAway}
          onProcessZoomOut={() => undefined}
          onProcessZoomIn={() => undefined}
          onProjectionChange={isCapitalSurface || machineResolution !== "mid" ? changeProjection : undefined}
          onSearch={() => setSearchOpen(true)}
        />

        {isCapitalSurface ? (
          <main
            className="capital-prototype-page"
            data-machine-surface="capital"
            style={{ paddingTop: "calc(var(--frame-top) + clamp(12px, 1.5vw, 22px))" }}
          >
            <CapitalEconomicsFrame />
          </main>
        ) : (
          <main className="world-machine-preview">
            <PhysicalMachineExperience
              showSchematic={showSchematic}
              initialResolution={resolvedInitialResolution}
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
        )}
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
      data-machine-surface="machine"
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
        viewControls={resolutionControls}
        onHome={returnToMachine}
        onUp={returnToMachine}
        onBack={() => section ? closeSection() : router.back()}
        onForward={() => undefined}
        onLocalNavigate={navigateAway}
        onProcessZoomOut={() => canProcessZoomOut && changeProcessScope(processScopes[processScopeIndex - 1])}
        onProcessZoomIn={() => canProcessZoomIn && changeProcessScope(processScopes[processScopeIndex + 1])}
        onProjectionChange={machineResolution === "mid" ? undefined : changeProjection}
        onSearch={() => setSearchOpen(true)}
      />

      {projectionSurface}
      {searchOpen ? <SearchPanel onClose={() => setSearchOpen(false)} onNavigate={navigateAway} /> : null}
    </div>
  );
}
