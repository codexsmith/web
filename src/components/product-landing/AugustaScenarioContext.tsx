'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import {
  evaluateAugustaScenario,
  getDefaultAugustaScenarioSelections,
  type AugustaScenarioControlId,
} from "@/lib/augusta-scenario-transitions";
import { evaluateAugustaResurfacingTransition } from "@/lib/augusta-transport-calibration";
import { evaluateHighlandWaterTransition } from "@/lib/augusta-water-calibration";

type AugustaScenarioContextValue = {
  selections: ReturnType<typeof getDefaultAugustaScenarioSelections>;
  evaluation: ReturnType<typeof evaluateAugustaScenario>;
  waterAddedAverageFlowMgd: string;
  waterTransition: ReturnType<typeof evaluateHighlandWaterTransition>;
  transportAddedResurfacingMiles: string;
  transportTransition: ReturnType<typeof evaluateAugustaResurfacingTransition>;
  selectOption: (controlId: AugustaScenarioControlId, optionId: string) => void;
  setWaterAddedAverageFlowMgd: (value: string) => void;
  setTransportAddedResurfacingMiles: (value: string) => void;
  reset: () => void;
};

const AugustaScenarioContext = createContext<AugustaScenarioContextValue | null>(null);

export function AugustaScenarioProvider({ children }: { children: ReactNode }) {
  const [selections, setSelections] = useState(getDefaultAugustaScenarioSelections);
  const [waterAddedAverageFlowMgd, setWaterAddedAverageFlowMgd] = useState("");
  const [transportAddedResurfacingMiles, setTransportAddedResurfacingMiles] = useState("");
  const evaluation = useMemo(() => evaluateAugustaScenario(selections), [selections]);
  const waterTransition = useMemo(
    () => evaluateHighlandWaterTransition(waterAddedAverageFlowMgd),
    [waterAddedAverageFlowMgd],
  );
  const transportTransition = useMemo(
    () => evaluateAugustaResurfacingTransition(transportAddedResurfacingMiles),
    [transportAddedResurfacingMiles],
  );

  const value = useMemo<AugustaScenarioContextValue>(() => ({
    selections,
    evaluation,
    waterAddedAverageFlowMgd,
    waterTransition,
    transportAddedResurfacingMiles,
    transportTransition,
    selectOption: (controlId, optionId) => setSelections((current) => ({ ...current, [controlId]: optionId })),
    setWaterAddedAverageFlowMgd,
    setTransportAddedResurfacingMiles,
    reset: () => {
      setSelections(getDefaultAugustaScenarioSelections());
      setWaterAddedAverageFlowMgd("");
      setTransportAddedResurfacingMiles("");
    },
  }), [
    evaluation,
    selections,
    transportAddedResurfacingMiles,
    transportTransition,
    waterAddedAverageFlowMgd,
    waterTransition,
  ]);

  return <AugustaScenarioContext.Provider value={value}>{children}</AugustaScenarioContext.Provider>;
}

export function useAugustaScenario() {
  const value = useContext(AugustaScenarioContext);
  if (!value) throw new Error("useAugustaScenario must be used within AugustaScenarioProvider");
  return value;
}
