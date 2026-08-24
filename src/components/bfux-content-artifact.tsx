import { BfuxIcon, type BfuxIconName } from "@/components/bfux-icons";
import type { Inspection } from "@/lib/content";
import {
  getInspectionContentArtifacts,
  type BfuxArtifactItem,
  type BfuxContentArtifact as Artifact,
} from "@/lib/bfux-content-artifacts";

function inferredIcon(item: BfuxArtifactItem): BfuxIconName {
  if (item.icon) return item.icon;
  const value = `${item.label} ${item.detail ?? ""}`.toLowerCase();

  if (/repair|correct|revise|supersede|recover/.test(value)) return "repair";
  if (/close|closure|complete|retire/.test(value)) return "closure";
  if (/promot|publish|release|scale/.test(value)) return "promotion";
  if (/invariant|preserve/.test(value)) return "invariant";
  if (/bound|constraint|condition|limit/.test(value)) return "boundary";
  if (/authority|responsib|owner|steward/.test(value)) return "responsibility";
  if (/evidence|observe|inspect|review|test|verify|measure|source/.test(value)) return "witness";
  if (/represent|projection|model|encode/.test(value)) return "projection";
  if (/state|progress|standing/.test(value)) return "state";
  if (/transition|execute|operation|act|deliver/.test(value)) return "transition";
  if (/consequence|result|effect|action/.test(value)) return "consequence";
  if (/relation|connect|match|dependency|link/.test(value)) return "relation";
  if (/trace|provenance|lineage|history/.test(value)) return "trace";
  if (/claim|hypothesis|commit/.test(value)) return "claim";
  if (/gate|permission|admissib/.test(value)) return "gate";
  if (/fail|defect|break|contradiction/.test(value)) return "defect";
  if (/person|people|human|community|actor/.test(value)) return "actor";
  if (/build|construct|artifact|system|schema|document|tool/.test(value)) return "object";
  return "point";
}

function ArtifactItemContents({ item, index }: { item: BfuxArtifactItem; index?: number }) {
  return (
    <>
      <span className="bfux-artifact__item-head">
        {typeof index === "number" ? <span className="bfux-artifact__index">{String(index + 1).padStart(2, "0")}</span> : null}
        <BfuxIcon name={inferredIcon(item)} className="bfux-artifact__glyph" />
      </span>
      <strong>{item.label}</strong>
      {item.detail ? <small>{item.detail}</small> : null}
    </>
  );
}

function OrderedArtifact({ artifact }: { artifact: Artifact }) {
  return (
    <>
      <ol className="bfux-artifact__sequence" aria-label={artifact.title}>
        {artifact.items.map((item, index) => (
          <li key={`${artifact.id}-${index}-${item.label}`}>
            <ArtifactItemContents item={item} index={index} />
          </li>
        ))}
      </ol>
      {artifact.kind === "loop" ? (
        <div className="bfux-artifact__return" aria-label="The sequence remains reopenable">
          <BfuxIcon name="closure" />
          <span>Return with new evidence, defect, or changed state</span>
        </div>
      ) : null}
    </>
  );
}

function SetArtifact({ artifact }: { artifact: Artifact }) {
  return (
    <ul className="bfux-artifact__set" aria-label={artifact.title}>
      {artifact.items.map((item, index) => (
        <li key={`${artifact.id}-${index}-${item.label}`}>
          <ArtifactItemContents item={item} />
        </li>
      ))}
    </ul>
  );
}

function LadderArtifact({ artifact }: { artifact: Artifact }) {
  return (
    <ol className="bfux-artifact__ladder" aria-label={artifact.title}>
      {artifact.items.map((item, index) => (
        <li key={`${artifact.id}-${index}-${item.label}`}>
          <span className="bfux-artifact__ladder-marker">{index + 1}</span>
          <span className="bfux-artifact__ladder-copy">
            <BfuxIcon name={inferredIcon(item)} />
            <strong>{item.label}</strong>
            {item.detail ? <small>{item.detail}</small> : null}
          </span>
        </li>
      ))}
    </ol>
  );
}

function Hub({ artifact, position }: { artifact: Artifact; position: "source" | "result" }) {
  const hub = position === "source" ? artifact.hub : artifact.exit;
  if (!hub) return null;
  return (
    <div className={`bfux-artifact__hub bfux-artifact__hub--${position}`}>
      <BfuxIcon name={hub.icon ?? "contexture"} />
      <span>
        <strong>{hub.label}</strong>
        {hub.detail ? <small>{hub.detail}</small> : null}
      </span>
    </div>
  );
}

function FanArtifact({ artifact }: { artifact: Artifact }) {
  const convergence = artifact.kind === "convergence";
  return (
    <div className={`bfux-artifact__fan ${convergence ? "bfux-artifact__fan--convergence" : "bfux-artifact__fan--fanout"}`}>
      {convergence ? null : <Hub artifact={artifact} position="source" />}
      <ul className="bfux-artifact__fan-items" aria-label={artifact.title}>
        {artifact.items.map((item, index) => (
          <li key={`${artifact.id}-${index}-${item.label}`}>
            <ArtifactItemContents item={item} />
          </li>
        ))}
      </ul>
      {convergence ? <Hub artifact={artifact} position="source" /> : null}
      <Hub artifact={artifact} position="result" />
    </div>
  );
}

export function BfuxContentArtifact({ artifact }: { artifact: Artifact }) {
  const labelId = `bfux-artifact-${artifact.id}-title`;
  return (
    <figure
      className={`bfux-artifact bfux-artifact--${artifact.kind}`}
      data-artifact-kind={artifact.kind}
      data-artifact-id={artifact.id}
      aria-labelledby={labelId}
    >
      <figcaption className="bfux-artifact__caption">
        <span>{artifact.eyebrow}</span>
        <strong id={labelId}>{artifact.title}</strong>
        {artifact.summary ? <p>{artifact.summary}</p> : null}
      </figcaption>

      {artifact.kind === "sequence" || artifact.kind === "loop" ? <OrderedArtifact artifact={artifact} /> : null}
      {artifact.kind === "set" ? <SetArtifact artifact={artifact} /> : null}
      {artifact.kind === "ladder" ? <LadderArtifact artifact={artifact} /> : null}
      {artifact.kind === "fanout" || artifact.kind === "convergence" ? <FanArtifact artifact={artifact} /> : null}
    </figure>
  );
}

export function BfuxInspectionArtifacts({ inspection }: { inspection: Inspection }) {
  const artifacts = getInspectionContentArtifacts(inspection);
  if (!artifacts.length) return null;

  return (
    <div className="bfux-artifact-stack" data-artifact-source="inspection">
      {artifacts.map((artifact) => <BfuxContentArtifact key={artifact.id} artifact={artifact} />)}
    </div>
  );
}
