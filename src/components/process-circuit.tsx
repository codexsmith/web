import { BfuxIcon, type BfuxIconName } from "@/components/bfux-icons";
import {
  processDisciplines,
  processScopeLabels,
  processStages,
  visibleProcessStages,
  type ProcessPlacement,
  type ProcessScope,
  type ProcessStage,
  type ProcessStageId,
} from "@/lib/bfl-process";

type ProcessCircuitProps = {
  placement: ProcessPlacement;
  scope: ProcessScope;
};

type ProcessZone = {
  id: "frame" | "operate" | "answer";
  eyebrow: string;
  label: string;
  summary: string;
  icon: BfuxIconName;
  stageIds: ProcessStageId[];
};

const processZones: ProcessZone[] = [
  {
    id: "frame",
    eyebrow: "Zone A · establish the object",
    label: "Frame the work",
    summary: "Observe the real condition, declare the boundary, choose a representation, and state what is actually being claimed or tested.",
    icon: "boundary",
    stageIds: ["intake", "boundary", "representation", "hypothesis"],
  },
  {
    id: "operate",
    eyebrow: "Zone B · make consequence possible",
    label: "Make & operate",
    summary: "Construct the smallest coherent artifact, then exercise it in a meaningful environment where consequence can answer back.",
    icon: "transition",
    stageIds: ["construction", "execution"],
  },
  {
    id: "answer",
    eyebrow: "Zone C · let reality disagree",
    label: "Answer & repair",
    summary: "Measure what happened, preserve discrepancy, and change the boundary, representation, artifact, or operating rule when the claim fails.",
    icon: "repair",
    stageIds: ["validation", "repair"],
  },
];

const processStageAxisLabels: Record<ProcessStageId, string> = {
  intake: "Intake",
  boundary: "Boundary",
  representation: "Representation",
  hypothesis: "Hypothesis",
  construction: "Construction",
  execution: "Execution",
  validation: "Validation",
  repair: "Repair",
  promotion: "Promotion",
};

function stageIcon(stage: ProcessStage): BfuxIconName {
  switch (stage.id) {
    case "intake": return "inspect";
    case "boundary": return "boundary";
    case "representation": return "projection";
    case "hypothesis": return "claim";
    case "construction": return "object";
    case "execution": return "transition";
    case "validation": return "witness";
    case "repair": return "repair";
    case "promotion": return "promotion";
  }
}

function stageIndex(stageId: ProcessStageId) {
  return String(processStages.findIndex((candidate) => candidate.id === stageId) + 1).padStart(2, "0");
}

function StageCard({
  stage,
  placement,
  scope,
}: {
  stage: ProcessStage;
  placement: ProcessPlacement;
  scope: ProcessScope;
}) {
  const active = placement.activeStages.includes(stage.id);
  const primary = placement.primaryStage === stage.id;
  const reasons = placement.reasons[stage.id];

  return (
    <li
      className={`process-stage-card${active ? " is-active" : ""}`}
      data-stage={stage.id}
      data-primary={primary ? "true" : "false"}
    >
      <div className="process-stage-card__head">
        <span className="process-stage-card__index">{stageIndex(stage.id)}</span>
        <BfuxIcon name={stageIcon(stage)} className="process-stage-card__glyph" />
        <span className="process-stage-card__standing">
          {primary ? "Primary" : active ? "Participating" : "Stage"}
        </span>
      </div>
      <strong>{stage.label}</strong>
      <p>{stage.question}</p>
      <div className="process-stage-card__output">
        <small>Produces</small>
        <span>{stage.output}</span>
      </div>
      {scope === "local" && reasons.length ? (
        <ul className="process-stage-card__reasons">
          {reasons.map((reason) => <li key={reason}>{reason}</li>)}
        </ul>
      ) : null}
    </li>
  );
}

function ProcessZonePanel({
  zone,
  stages,
  placement,
  scope,
}: {
  zone: ProcessZone;
  stages: ProcessStage[];
  placement: ProcessPlacement;
  scope: ProcessScope;
}) {
  if (!stages.length) return null;

  return (
    <section
      className={`process-zone process-zone--${zone.id}`}
      data-zone={zone.id}
      data-stage-count={stages.length}
      aria-labelledby={`process-zone-${zone.id}`}
    >
      <header className="process-zone__header">
        <BfuxIcon name={zone.icon} />
        <div>
          <span>{zone.eyebrow}</span>
          <h2 id={`process-zone-${zone.id}`}>{zone.label}</h2>
          <p>{zone.summary}</p>
        </div>
      </header>
      <ol className="process-zone__stages">
        {stages.map((stage) => (
          <StageCard key={stage.id} stage={stage} placement={placement} scope={scope} />
        ))}
      </ol>
    </section>
  );
}

function StewardshipDock({
  stage,
  placement,
  scope,
}: {
  stage: ProcessStage;
  placement: ProcessPlacement;
  scope: ProcessScope;
}) {
  const active = placement.activeStages.includes(stage.id);
  const primary = placement.primaryStage === stage.id;

  return (
    <section
      className={`process-stewardship${active ? " is-active" : ""}`}
      data-primary={primary ? "true" : "false"}
      aria-labelledby="process-stewardship-title"
    >
      <div className="process-stewardship__mark">
        <BfuxIcon name="promotion" />
        <span>{stageIndex(stage.id)}</span>
      </div>
      <div className="process-stewardship__copy">
        <span>Continuation dock · release is not the end</span>
        <h2 id="process-stewardship-title">{stage.label}</h2>
        <p>{stage.question}</p>
        <small>{stage.output}</small>
        {scope === "local" && placement.reasons[stage.id].length ? (
          <ul>
            {placement.reasons[stage.id].map((reason) => <li key={reason}>{reason}</li>)}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

function ReturnRail() {
  return (
    <aside className="process-return-rail" aria-label="Process return and repair path">
      <span className="process-return-rail__line" aria-hidden="true" />
      <BfuxIcon name="closure" />
      <div>
        <span>Return path</span>
        <strong>New evidence, defect, or changed state reopens the work.</strong>
        <p>Repair may return to the boundary or representation; field evidence may reopen Intake. Closure stays earned and reversible.</p>
      </div>
      <BfuxIcon name="back" className="process-return-rail__back" />
    </aside>
  );
}

function DisciplineDock({ visibleIds, placement }: { visibleIds: Set<ProcessStageId>; placement: ProcessPlacement }) {
  const activeStageLabels = processStages
    .filter((stage) => placement.activeStages.includes(stage.id))
    .map((stage) => processStageAxisLabels[stage.id]);

  return (
    <section className="process-lenses" aria-labelledby="process-lenses-title">
      <header className="process-lenses__header">
        <div>
          <span>Method overlays · not process stages</span>
          <h2 id="process-lenses-title">Operating lenses</h2>
        </div>
        <p>Each row is a method. Each column is a canonical process stage. A marked cell means the lens participates at that stage; current object placement is shown on the stage axis instead of being overloaded into the same mark.</p>
      </header>

      <div className="process-lenses__legend" aria-label="Operating lens matrix legend">
        <span><strong>Applies</strong> lens participates at this stage</span>
        <span><strong>Current</strong> focal object presently occupies this stage</span>
        <span><strong>—</strong> no declared emphasis for this lens</span>
        <span className="process-lenses__current-summary">Current object · {activeStageLabels.join(" · ")}</span>
      </div>

      <div className="process-lens-board" role="table" aria-label="Operating lenses by canonical Boundary First process stage">
        <div className="process-lens-axis" role="row">
          <div className="process-lens-axis__method" role="columnheader">Operating lens</div>
          {processStages.map((stage) => {
            const current = placement.activeStages.includes(stage.id);
            const visible = visibleIds.has(stage.id);
            return (
              <div
                key={stage.id}
                className="process-lens-axis__stage"
                role="columnheader"
                data-stage={stage.id}
                data-current={current ? "true" : "false"}
                data-visible={visible ? "true" : "false"}
              >
                <strong>{processStageAxisLabels[stage.id]}</strong>
                {current ? <small>Current</small> : visible ? <small>In scope</small> : <small>Outside scope</small>}
              </div>
            );
          })}
        </div>

        <div className="process-lenses__grid" role="rowgroup">
          {processDisciplines.map((discipline) => (
            <div key={discipline.id} className="process-lens" data-discipline={discipline.id} role="row">
              <div className="process-lens__method" role="rowheader">
                <div className="process-lens__title">
                  <BfuxIcon name="projection" />
                  <strong>{discipline.label}</strong>
                </div>
                <p>{discipline.role}</p>
                <span className="process-lens__mobile-label">Participates in</span>
              </div>

              {processStages.map((stage) => {
                const participates = discipline.stages.includes(stage.id);
                const current = placement.activeStages.includes(stage.id);
                const visible = visibleIds.has(stage.id);
                return (
                  <div
                    key={stage.id}
                    className="process-lens__cell"
                    role="cell"
                    data-stage={stage.id}
                    data-participates={participates ? "true" : "false"}
                    data-current={current ? "true" : "false"}
                    data-visible={visible ? "true" : "false"}
                    aria-label={`${discipline.label} · ${processStageAxisLabels[stage.id]} · ${participates ? "applies" : "no declared emphasis"}${current ? " · current object stage" : ""}`}
                  >
                    <span className="process-lens__cell-stage">{processStageAxisLabels[stage.id]}</span>
                    <strong>{participates ? "Applies" : "—"}</strong>
                    {participates && current ? <small>Current object</small> : null}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessCircuit({ placement, scope }: ProcessCircuitProps) {
  const visibleStages = visibleProcessStages(placement, scope);
  const visibleIds = new Set(visibleStages.map((stage) => stage.id));
  const stageById = new Map(visibleStages.map((stage) => [stage.id, stage] as const));
  const promotion = stageById.get("promotion");
  const showReturn = scope === "full" || visibleIds.has("repair") || visibleIds.has("promotion");

  return (
    <section className="process-circuit" data-process-scope={scope} aria-label="Boundary First repairable operating circuit">
      <header className="process-circuit__header">
        <div>
          <span>Operating circuit · {processScopeLabels[scope]}</span>
          <h2>Frame → make → answer → steward → reopen</h2>
        </div>
        <p>The process is a repairable control structure. Stages are grouped by function, Promotion is a continuation gate, and disagreement has an explicit route back into the work.</p>
      </header>

      <div className="process-circuit__board">
        {processZones.map((zone) => (
          <ProcessZonePanel
            key={zone.id}
            zone={zone}
            stages={zone.stageIds.map((id) => stageById.get(id)).filter((stage): stage is ProcessStage => Boolean(stage))}
            placement={placement}
            scope={scope}
          />
        ))}
        {promotion ? <StewardshipDock stage={promotion} placement={placement} scope={scope} /> : null}
        {showReturn ? <ReturnRail /> : null}
      </div>

      {scope !== "local" ? <DisciplineDock visibleIds={visibleIds} placement={placement} /> : null}
    </section>
  );
}
