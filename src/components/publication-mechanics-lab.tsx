"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  arc,
  cluster,
  curveBasis,
  hierarchy,
  line,
  partition,
  pie,
  type PieArcDatum,
} from "d3";
import {
  CheckCircle2,
  ChevronRight,
  Copy,
  Gauge,
  GitBranch,
  Layers3,
  RefreshCw,
  Route,
  Scale,
} from "lucide-react";
import {
  publicationContent,
  type RepairRoute,
  type RootCard,
} from "@/lib/publication-suite";
import {
  PUBLICATION_MECHANICS,
  publicationMechanicsHref,
  type PublicationMechanicId,
} from "@/lib/publication-navigation";

const mechanicDetails = {
  "nested-interiors": {
    short: "Trace where a displaced burden actually lands.",
    icon: Layers3,
  },
  "boundary-accounting": {
    short: "Change what the represented result includes.",
    icon: Scale,
  },
  "agency-rate": {
    short: "Hold the institution constant and change its cadence.",
    icon: Gauge,
  },
  "root-lenses": {
    short: "Compare distinct forms of abstraction without return.",
    icon: GitBranch,
  },
  "boundary-cycle": {
    short: "Complete the operational audit and close the loop.",
    icon: RefreshCw,
  },
  "repair-router": {
    short: "Route a severed return path into a bounded packet.",
    icon: Route,
  },
} satisfies Record<
  PublicationMechanicId,
  { icon: typeof Layers3; short: string }
>;

const mechanicOptions = PUBLICATION_MECHANICS.map((option) => ({
  ...option,
  ...mechanicDetails[option.id],
}));

const mechanicIds = new Set<PublicationMechanicId>(
  mechanicOptions.map((option) => option.id),
);

const rootRouteMap: Record<string, string> = {
  "agency-consequence": "agency-governance",
  "representation-reality": "representation-revision",
  "authority-standing": "standing-contestability",
  "responsibility-capacity": "responsibility-capacity-alignment",
  "construction-stewardship": "lifecycle-stewardship",
  "value-capacity": "consequence-accounting",
  "local-global-closure": "global-closure",
  "legibility-reciprocity": "standing-contestability",
  "language-operation": "representation-revision",
  "knowledge-provenance": "provenance-witness",
};

const burdenExamples = {
  "household-labor": {
    label: "Household labor",
    source: "Operating organization",
    receiver: "Household",
    capacity: "Time, care, and recovery capacity",
  },
  pollution: {
    label: "Pollution",
    source: "Producing organization",
    receiver: "Watershed and community",
    capacity: "Ecological and public-health capacity",
  },
  "software-support": {
    label: "Software support",
    source: "Delivery team",
    receiver: "Support and operations",
    capacity: "Attention, reliability, and repair capacity",
  },
  "public-infrastructure": {
    label: "Public infrastructure",
    source: "Construction program",
    receiver: "Future public",
    capacity: "Maintenance funding and lifecycle capacity",
  },
} as const;

type BurdenId = keyof typeof burdenExamples;

function NestedInteriorsView() {
  const [burdenId, setBurdenId] = useState<BurdenId>("household-labor");
  const [traced, setTraced] = useState(false);
  const burden = burdenExamples[burdenId];
  const layoutNodes = useMemo(() => {
    type NestedDatum = {
      name: string;
      kind: "world" | "source" | "receiver" | "capacity";
      value?: number;
      children?: NestedDatum[];
    };
    const root = hierarchy<NestedDatum>({
      name: "Shared world",
      kind: "world",
      children: [
        {
          name: burden.source,
          kind: "source",
          value: 2,
        },
        {
          name: burden.receiver,
          kind: "receiver",
          children: [
            {
              name: burden.capacity,
              kind: "capacity",
              value: 2,
            },
          ],
        },
      ],
    }).sum((datum) => datum.value ?? 1);
    return partition<NestedDatum>()
      .size([520, 250])(root)
      .descendants()
      .filter((node) => node.depth > 0);
  }, [burden]);
  const sourceNode = layoutNodes.find((node) => node.data.kind === "source");
  const receiverNode = layoutNodes.find(
    (node) => node.data.kind === "receiver",
  );
  const transferPath = useMemo(() => {
    if (!sourceNode || !receiverNode) return null;
    const start: [number, number] = [
      (sourceNode.x0 + sourceNode.x1) / 2,
      (sourceNode.y0 + sourceNode.y1) / 2,
    ];
    const end: [number, number] = [
      (receiverNode.x0 + receiverNode.x1) / 2,
      (receiverNode.y0 + receiverNode.y1) / 2,
    ];
    return line<[number, number]>().curve(curveBasis)([
      start,
      [start[0] + 55, start[1] - 35],
      [end[0] - 55, end[1] - 35],
      end,
    ]);
  }, [receiverNode, sourceNode]);

  return (
    <div className="grid gap-7 lg:grid-cols-[minmax(17rem,0.65fr)_minmax(0,1.35fr)]">
      <div>
        <label
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground-muted"
          htmlFor="burden-example"
        >
          Choose a displaced burden
        </label>
        <select
          className="mt-3 min-h-12 w-full border border-border bg-background px-4 text-sm font-semibold"
          id="burden-example"
          onChange={(event) => {
            setBurdenId(event.target.value as BurdenId);
            setTraced(false);
          }}
          value={burdenId}
        >
          {Object.entries(burdenExamples).map(([id, example]) => (
            <option key={id} value={id}>
              {example.label}
            </option>
          ))}
        </select>
        <button
          className="mt-4 inline-flex min-h-12 w-full items-center justify-center bg-primary px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-foreground"
          onClick={() => setTraced(true)}
          type="button"
        >
          Trace the transfer
          <ChevronRight className="ml-2 h-4 w-4" />
        </button>
        <p className="mt-5 text-sm leading-7 text-foreground-muted">
          The burden does not disappear when it crosses the operating boundary.
          It enters another interior with its own finite repair capacity.
        </p>
      </div>

      <figure className="border border-border bg-card p-3 sm:p-5">
        <div
          aria-label={`${burden.label} transfer path`}
          className="grid gap-2 sm:hidden"
        >
          <div className="border border-border bg-background p-4 text-sm font-semibold">
            Source · {burden.source}
          </div>
          <div className="flex min-h-11 items-center justify-center font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
            {traced ? "burden crosses boundary ↓" : "transfer not yet traced ↓"}
          </div>
          <div className="border border-border bg-[color-mix(in_srgb,var(--accent)_18%,var(--card))] p-4 text-sm font-semibold">
            Receiver · {burden.receiver}
          </div>
          <div className="ml-5 border-l-2 border-accent pl-4 text-sm leading-6 text-foreground-muted">
            Constrained capacity · {burden.capacity}
          </div>
        </div>
        <svg
          aria-labelledby="nested-title nested-description"
          className="hidden h-auto w-full sm:block"
          role="img"
          viewBox="0 0 520 250"
        >
          <title id="nested-title">Nested systems and burden transfer</title>
          <desc id="nested-description">
            {traced
              ? `${burden.label} leaves ${burden.source} and enters ${burden.receiver}, consuming ${burden.capacity}.`
              : `${burden.source} and ${burden.receiver} remain inside one shared world.`}
          </desc>
          <rect
            fill="transparent"
            height="238"
            stroke="currentColor"
            strokeDasharray="5 5"
            width="508"
            x="6"
            y="6"
          />
          {layoutNodes.map((node) => {
            const isReceiver =
              node.data.kind === "receiver" || node.data.kind === "capacity";
            return (
              <g key={`${node.data.kind}-${node.data.name}`}>
                <rect
                  fill={
                    isReceiver
                      ? "color-mix(in srgb, var(--accent) 20%, transparent)"
                      : "color-mix(in srgb, var(--muted) 65%, transparent)"
                  }
                  height={Math.max(0, node.y1 - node.y0 - 8)}
                  stroke="currentColor"
                  strokeWidth={node.depth === 1 ? 1.5 : 1}
                  width={Math.max(0, node.x1 - node.x0 - 8)}
                  x={node.x0 + 4}
                  y={node.y0 + 4}
                />
                <text
                  fill="currentColor"
                  fontSize={node.depth === 1 ? 12 : 10}
                  fontWeight={node.depth === 1 ? 700 : 600}
                  textAnchor="middle"
                  x={(node.x0 + node.x1) / 2}
                  y={(node.y0 + node.y1) / 2}
                >
                  {node.data.name.length > 27
                    ? `${node.data.name.slice(0, 25)}…`
                    : node.data.name}
                </text>
              </g>
            );
          })}
          {traced && transferPath ? (
            <>
              <defs>
                <marker
                  id="nested-arrow"
                  markerHeight="8"
                  markerWidth="8"
                  orient="auto"
                  refX="7"
                  refY="4"
                >
                  <path d="M0,0 L8,4 L0,8 Z" fill="var(--destructive)" />
                </marker>
              </defs>
              <path
                d={transferPath}
                fill="none"
                markerEnd="url(#nested-arrow)"
                stroke="var(--destructive)"
                strokeWidth="4"
              />
              <text
                fill="currentColor"
                fontSize="11"
                fontWeight="700"
                textAnchor="middle"
                x="260"
                y="30"
              >
                boundary crossing preserved
              </text>
            </>
          ) : null}
        </svg>
        <figcaption aria-live="polite" className="mt-3 text-sm leading-6">
          {traced
            ? `${
                burden.receiver
              } receives the burden; the relevant capacity is ${burden.capacity.toLowerCase()}.`
            : "Trace the transfer to reveal the receiving interior and its constrained capacity."}
        </figcaption>
      </figure>
    </div>
  );
}

function BoundaryAccountingView() {
  const [example, setExample] = useState("Fast delivery");
  const [included, setIncluded] = useState({
    receiver: false,
    lifecycle: false,
    future: false,
  });
  const representedCost =
    55 +
    (included.receiver ? 22 : 0) +
    (included.lifecycle ? 14 : 0) +
    (included.future ? 9 : 0);
  const representedResult = 100 - representedCost;
  const flowLine = line<[number, number]>().curve(curveBasis);
  const flows = [
    {
      id: "benefit",
      label: "Represented benefit",
      path: flowLine([
        [45, 120],
        [170, 45],
        [330, 55],
        [465, 70],
      ]),
      included: true,
    },
    {
      id: "receiver",
      label: "Receiving actor",
      path: flowLine([
        [45, 120],
        [180, 110],
        [330, 125],
        [465, 125],
      ]),
      included: included.receiver,
    },
    {
      id: "lifecycle",
      label: "Lifecycle burden",
      path: flowLine([
        [45, 120],
        [180, 175],
        [330, 185],
        [465, 180],
      ]),
      included: included.lifecycle,
    },
    {
      id: "future",
      label: "Future constraint",
      path: flowLine([
        [45, 120],
        [175, 220],
        [330, 225],
        [465, 225],
      ]),
      included: included.future,
    },
  ];

  return (
    <div className="grid gap-7 lg:grid-cols-[minmax(17rem,0.65fr)_minmax(0,1.35fr)]">
      <div>
        <label
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground-muted"
          htmlFor="accounting-example"
        >
          Decision example
        </label>
        <select
          className="mt-3 min-h-12 w-full border border-border bg-background px-4 text-sm font-semibold"
          id="accounting-example"
          onChange={(event) => setExample(event.target.value)}
          value={example}
        >
          {[
            "Fast delivery",
            "Cheap software feature",
            "Factory production",
            "Property development",
          ].map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>
        <fieldset className="mt-5">
          <legend className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
            Include inside the accounting boundary
          </legend>
          <div className="mt-3 grid gap-2">
            {[
              ["receiver", "Receiving actor"],
              ["lifecycle", "Lifecycle burden"],
              ["future", "Future constraint"],
            ].map(([id, label]) => (
              <label
                className="flex min-h-11 cursor-pointer items-center gap-3 border border-border bg-background px-4 text-sm font-semibold"
                key={id}
              >
                <input
                  checked={included[id as keyof typeof included]}
                  className="h-4 w-4"
                  onChange={(event) =>
                    setIncluded((current) => ({
                      ...current,
                      [id]: event.target.checked,
                    }))
                  }
                  type="checkbox"
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="border border-border bg-card p-4 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
              Represented result
            </p>
            <p className="mt-2 font-serif text-5xl font-semibold">
              {representedResult}
            </p>
          </div>
          <p className="max-w-xs text-right text-sm leading-6 text-foreground/68">
            Illustrative units only. A lower result may be a more truthful
            representation.
          </p>
        </div>
        <figure className="mt-5">
          <div className="grid gap-2 sm:hidden">
            {flows.map((flow) => (
              <div
                className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border p-3 text-sm ${
                  flow.included
                    ? "border-foreground bg-background"
                    : "border-dashed border-border bg-muted/35 text-foreground-muted"
                }`}
                key={flow.id}
              >
                <span className="font-semibold">{flow.label}</span>
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em]">
                  {flow.included ? "Inside" : "Outside"}
                </span>
              </div>
            ))}
          </div>
          <svg
            aria-labelledby="accounting-title accounting-description"
            className="hidden h-auto w-full sm:block"
            role="img"
            viewBox="0 0 520 270"
          >
            <title id="accounting-title">
              Included and excluded consequence flows for {example}
            </title>
            <desc id="accounting-description">
              The benefit remains represented. Other flows are solid when
              included and dashed when outside the accounting boundary.
            </desc>
            <defs>
              <marker
                id="flow-arrow"
                markerHeight="8"
                markerWidth="8"
                orient="auto"
                refX="7"
                refY="4"
              >
                <path d="M0,0 L8,4 L0,8 Z" fill="currentColor" />
              </marker>
            </defs>
            <rect
              fill="color-mix(in srgb, var(--muted) 45%, transparent)"
              height="58"
              stroke="currentColor"
              width="105"
              x="10"
              y="91"
            />
            <text
              fill="currentColor"
              fontSize="12"
              fontWeight="700"
              textAnchor="middle"
              x="62"
              y="116"
            >
              {example}
            </text>
            <text
              fill="currentColor"
              fontSize="10"
              textAnchor="middle"
              x="62"
              y="133"
            >
              decision
            </text>
            {flows.map((flow, index) => (
              <g key={flow.id}>
                <path
                  d={flow.path ?? undefined}
                  fill="none"
                  markerEnd="url(#flow-arrow)"
                  opacity={flow.included ? 1 : 0.52}
                  stroke={
                    flow.id === "benefit"
                      ? "var(--primary)"
                      : "var(--destructive)"
                  }
                  strokeDasharray={flow.included ? undefined : "7 6"}
                  strokeWidth={flow.id === "benefit" ? 7 : 4}
                />
                <text
                  fill="currentColor"
                  fontSize="11"
                  fontWeight="700"
                  textAnchor="end"
                  x="510"
                  y={[72, 128, 183, 228][index]}
                >
                  {flow.label} · {flow.included ? "inside" : "outside"}
                </text>
              </g>
            ))}
          </svg>
          <figcaption className="mt-3 text-sm leading-6">
            {Object.values(included).every(Boolean)
              ? "All represented burdens are now visible. Nonmonetary constraints still require separate judgment."
              : "The apparent result remains partly dependent on burdens outside the chosen accounting boundary."}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

function AgencyRateView() {
  const [speed, setSpeed] = useState(4);
  const [reviewGate, setReviewGate] = useState(true);
  const radius = Math.round(speed * (reviewGate ? 8 : 13));
  const repairLatency = Math.max(
    1,
    Math.round(reviewGate ? 12 - speed * 0.7 : 16 - speed * 0.35),
  );
  const risk =
    speed >= 8 && !reviewGate
      ? "High bypass risk"
      : speed >= 6
        ? "Review pressure"
        : "Bounded cadence";
  const agencyNodes = [
    ["People", 90, 55],
    ["Contracts", 260, 30],
    ["Capital", 430, 55],
    ["Governance", 95, 205],
    ["Software", 425, 205],
    ["Affected parties", 260, 245],
  ] as const;

  return (
    <div className="grid gap-7 lg:grid-cols-[minmax(17rem,0.65fr)_minmax(0,1.35fr)]">
      <div>
        <label
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground-muted"
          htmlFor="agency-speed"
        >
          Institutional cadence · {speed}/10
        </label>
        <input
          className="mt-4 w-full accent-[var(--primary)]"
          id="agency-speed"
          max="10"
          min="1"
          onChange={(event) => setSpeed(Number(event.target.value))}
          type="range"
          value={speed}
        />
        <label className="mt-5 flex min-h-12 cursor-pointer items-center gap-3 border border-border bg-background px-4 text-sm font-semibold">
          <input
            checked={reviewGate}
            className="h-4 w-4"
            onChange={(event) => setReviewGate(event.target.checked)}
            type="checkbox"
          />
          Preserve human review gate
        </label>
        <div className="mt-5 grid gap-2">
          {[
            ["Consequence radius", `${radius} relative units`],
            ["Repair latency", `${repairLatency} cycles`],
            ["Current reading", risk],
          ].map(([label, value]) => (
            <div
              className="flex items-center justify-between gap-4 border-b border-border py-3 text-sm"
              key={label}
            >
              <span className="text-foreground/68">{label}</span>
              <span className="font-semibold">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <figure className="border border-border bg-card p-4 sm:p-6">
        <div className="grid gap-2 sm:hidden">
          <div className="border border-border bg-primary p-4 text-center font-serif text-xl font-semibold text-primary-foreground">
            Institution · persistent agent
          </div>
          <div className="grid grid-cols-2 gap-2">
            {agencyNodes.slice(0, 5).map(([label]) => (
              <div
                className="border border-border bg-background p-3 text-center text-sm font-semibold"
                key={label}
              >
                {label}
              </div>
            ))}
          </div>
          <div
            className={`border p-4 text-center text-sm font-semibold ${
              reviewGate
                ? "border-foreground bg-[color-mix(in_srgb,var(--accent)_18%,var(--card))]"
                : "border-dashed border-destructive bg-background text-destructive"
            }`}
          >
            Affected parties · review path{" "}
            {reviewGate ? "preserved" : "bypassed"}
          </div>
        </div>
        <svg
          aria-labelledby="agency-title agency-description"
          className="hidden h-auto w-full sm:block"
          role="img"
          viewBox="0 0 520 280"
        >
          <title id="agency-title">
            Institutional agency at cadence {speed} of 10
          </title>
          <desc id="agency-description">
            The same people, contracts, capital, governance, and software form
            the institution at every speed. The review path is{" "}
            {reviewGate ? "preserved" : "bypassed"}.
          </desc>
          {agencyNodes.map(([label, x, y]) => {
            const target: [number, number] = [x, y];
            const path = line<[number, number]>().curve(curveBasis)([
              [260, 135],
              [(260 + x) / 2, (135 + y) / 2],
              target,
            ]);
            return (
              <g key={label}>
                <path
                  d={path ?? undefined}
                  fill="none"
                  opacity={label === "Affected parties" ? 1 : 0.55}
                  stroke={
                    label === "Affected parties"
                      ? reviewGate
                        ? "var(--accent)"
                        : "var(--destructive)"
                      : "currentColor"
                  }
                  strokeDasharray={
                    label === "Affected parties" && !reviewGate
                      ? "7 6"
                      : undefined
                  }
                  strokeWidth={
                    label === "Affected parties" ? Math.max(2, speed / 2) : 1.5
                  }
                />
                <circle
                  cx={x}
                  cy={y}
                  fill={
                    label === "Affected parties"
                      ? "color-mix(in srgb, var(--accent) 24%, var(--card))"
                      : "var(--background)"
                  }
                  r={label === "Affected parties" ? 36 : 31}
                  stroke="currentColor"
                />
                <text
                  fill="currentColor"
                  fontSize="10"
                  fontWeight="700"
                  textAnchor="middle"
                  x={x}
                  y={y + 3}
                >
                  {label}
                </text>
              </g>
            );
          })}
          <circle
            cx="260"
            cy="135"
            fill="var(--primary)"
            r="50"
            stroke="currentColor"
            strokeWidth="2"
          />
          <text
            fill="var(--primary-foreground)"
            fontSize="13"
            fontWeight="700"
            textAnchor="middle"
            x="260"
            y="132"
          >
            Institution
          </text>
          <text
            fill="var(--primary-foreground)"
            fontSize="10"
            textAnchor="middle"
            x="260"
            y="149"
          >
            persistent agent
          </text>
          {Array.from({ length: Math.ceil(speed / 2) }).map((_, index) => (
            <circle
              cx={260 + index * 13 - (Math.ceil(speed / 2) - 1) * 6.5}
              cy="190"
              fill={reviewGate ? "var(--accent)" : "var(--destructive)"}
              key={index}
              r="4"
            />
          ))}
        </svg>
        <figcaption className="mt-3 text-sm leading-6">
          AI changes cadence, reach, memory, and replication. It does not erase
          the larger institutional agent or move responsibility out of its
          embodied repair chain.
        </figcaption>
      </figure>
    </div>
  );
}

function RootLensesView({
  selectedRootId,
  onSelectRoot,
}: {
  selectedRootId: string;
  onSelectRoot: (id: string) => void;
}) {
  const roots = publicationContent.rootCards;
  const selected = roots.find((root) => root.id === selectedRootId) ?? roots[0];
  const radialNodes = useMemo(() => {
    type LensDatum = {
      name: string;
      id?: string;
      children?: LensDatum[];
    };
    const root = hierarchy<LensDatum>({
      name: "Abstraction without return",
      children: roots.map((lens) => ({
        name: lens.title,
        id: lens.id,
      })),
    });
    return cluster<LensDatum>()
      .size([360, 125])(root)
      .descendants()
      .filter((node) => node.depth === 1)
      .map((node) => {
        const radians = ((node.x - 90) / 180) * Math.PI;
        return {
          id: node.data.id ?? "",
          title: node.data.name,
          x: 200 + Math.cos(radians) * node.y,
          y: 200 + Math.sin(radians) * node.y,
        };
      });
  }, [roots]);

  return (
    <div className="grid gap-7 lg:grid-cols-[minmax(0,1.15fr)_minmax(17rem,0.85fr)]">
      <figure className="border border-border bg-card p-4">
        <svg
          aria-labelledby="root-title root-description"
          className="mx-auto hidden h-auto w-full max-w-[32rem] sm:block"
          role="img"
          viewBox="0 0 400 400"
        >
          <title id="root-title">
            Ten root lenses around one defect pattern
          </title>
          <desc id="root-description">
            {selected.title} is selected. {selected.quote}
          </desc>
          {radialNodes.map((node) => (
            <g key={node.id}>
              <path
                d={
                  line<[number, number]>()([
                    [200, 200],
                    [node.x, node.y],
                  ]) ?? undefined
                }
                fill="none"
                stroke={
                  node.id === selected.id
                    ? "var(--destructive)"
                    : "currentColor"
                }
                strokeWidth={node.id === selected.id ? 3 : 1}
              />
              <circle
                cx={node.x}
                cy={node.y}
                fill={
                  node.id === selected.id
                    ? "color-mix(in srgb, var(--accent) 35%, var(--card))"
                    : "var(--background)"
                }
                r={node.id === selected.id ? 22 : 16}
                stroke="currentColor"
              />
            </g>
          ))}
          <circle
            cx="200"
            cy="200"
            fill="var(--primary)"
            r="66"
            stroke="currentColor"
          />
          <text
            fill="var(--primary-foreground)"
            fontSize="13"
            fontWeight="700"
            textAnchor="middle"
            x="200"
            y="193"
          >
            Abstraction
          </text>
          <text
            fill="var(--primary-foreground)"
            fontSize="13"
            fontWeight="700"
            textAnchor="middle"
            x="200"
            y="211"
          >
            without return
          </text>
        </svg>
        <figcaption className="border-t border-border pt-4">
          <p className="font-serif text-2xl font-semibold">{selected.title}</p>
          <p className="mt-3 text-sm leading-7 text-foreground-muted">
            {selected.quote}
          </p>
        </figcaption>
      </figure>

      <div>
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
          Choose the primary severance
        </p>
        <div className="mt-3 grid gap-2">
          {roots.map((root, index) => (
            <button
              aria-pressed={root.id === selected.id}
              className={`grid min-h-11 grid-cols-[2rem_1fr] items-center gap-2 border px-3 text-left text-sm font-semibold transition-colors ${
                root.id === selected.id
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background hover:bg-muted"
              }`}
              key={root.id}
              onClick={() => onSelectRoot(root.id)}
              type="button"
            >
              <span className="font-mono text-[11px]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{root.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const cycleStages = [
  {
    id: "boundary",
    label: "Boundary",
    description: "Declare what is inside the consequential decision.",
  },
  {
    id: "invariant",
    label: "Invariant",
    description: "Name what must remain true through change.",
  },
  {
    id: "admissibility",
    label: "Admissibility",
    description: "Distinguish allowed variation from destructive change.",
  },
  {
    id: "closure",
    label: "Closure",
    description: "Test whether consequence returns to an accountable path.",
  },
  {
    id: "defect",
    label: "Defect",
    description: "Expose where the representation fails reality.",
  },
  {
    id: "repair",
    label: "Repair",
    description: "Assign authority, capacity, witness, and a closure test.",
  },
];

function BoundaryCycleView() {
  const [activeStage, setActiveStage] = useState("boundary");
  const [audit, setAudit] = useState({
    boundary: "",
    invariant: "",
    witness: "",
    repair: "",
  });
  const slices = pie<number>()
    .sort(null)
    .value(() => 1)(cycleStages.map(() => 1));
  const arcPath = arc<PieArcDatum<number>>().innerRadius(72).outerRadius(126);
  const complete = Object.values(audit).every((value) => value.trim());
  const selectedStage =
    cycleStages.find((stage) => stage.id === activeStage) ?? cycleStages[0];

  return (
    <div className="grid gap-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(18rem,1.1fr)]">
      <div>
        <figure className="border border-border bg-card p-4">
          <svg
            aria-labelledby="cycle-title cycle-description"
            className="mx-auto hidden h-auto w-full max-w-[28rem] sm:block"
            role="img"
            viewBox="0 0 320 320"
          >
            <title id="cycle-title">Boundary First mechanics cycle</title>
            <desc id="cycle-description">
              {selectedStage.label}: {selectedStage.description}
            </desc>
            <g transform="translate(160 160)">
              {slices.map((slice, index) => {
                const stage = cycleStages[index];
                const selected = stage.id === activeStage;
                return (
                  <path
                    d={arcPath(slice) ?? undefined}
                    fill={
                      selected
                        ? "var(--accent)"
                        : index % 2 === 0
                          ? "color-mix(in srgb, var(--muted) 75%, transparent)"
                          : "var(--background)"
                    }
                    key={stage.id}
                    stroke="currentColor"
                    strokeWidth={selected ? 3 : 1}
                  />
                );
              })}
              <circle fill="var(--primary)" r="61" />
              <text
                fill="var(--primary-foreground)"
                fontSize="15"
                fontWeight="700"
                textAnchor="middle"
                y="-3"
              >
                Boundary First
              </text>
              <text
                fill="var(--primary-foreground)"
                fontSize="10"
                textAnchor="middle"
                y="16"
              >
                inspect · test · repair
              </text>
            </g>
          </svg>
          <figcaption className="border-t border-border pt-4">
            <p className="font-serif text-2xl font-semibold">
              {selectedStage.label}
            </p>
            <p className="mt-2 text-sm leading-6 text-foreground-muted">
              {selectedStage.description}
            </p>
          </figcaption>
        </figure>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {cycleStages.map((stage, index) => (
            <button
              aria-pressed={stage.id === activeStage}
              className={`min-h-11 border px-3 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] ${
                stage.id === activeStage
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background hover:bg-muted"
              }`}
              key={stage.id}
              onClick={() => setActiveStage(stage.id)}
              type="button"
            >
              {String(index + 1).padStart(2, "0")} {stage.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
          Four-question audit
        </p>
        <div className="mt-3 grid gap-4">
          {[
            ["boundary", "What consequential system is inside the boundary?"],
            ["invariant", "What must remain true?"],
            ["witness", "Who can observe or contest failure?"],
            ["repair", "Who has authority and capacity to repair it?"],
          ].map(([id, label]) => (
            <label className="grid gap-2 text-sm font-semibold" key={id}>
              {label}
              <textarea
                className="min-h-20 resize-y border border-border bg-background p-3 text-sm font-normal leading-6"
                onChange={(event) =>
                  setAudit((current) => ({
                    ...current,
                    [id]: event.target.value,
                  }))
                }
                value={audit[id as keyof typeof audit]}
              />
            </label>
          ))}
        </div>
        <p
          aria-live="polite"
          className={`mt-5 flex items-start gap-3 border p-4 text-sm leading-6 ${
            complete
              ? "border-foreground bg-primary text-primary-foreground"
              : "border-border bg-card text-foreground-muted"
          }`}
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          {complete
            ? "The audit now names a boundary, invariant, witness, and repair path. It is ready to route."
            : "Complete all four fields to establish the minimum repair grammar."}
        </p>
      </div>
    </div>
  );
}

type PacketFields = {
  situation: string;
  receiver: string;
  invariant: string;
  owner: string;
  witness: string;
  closure: string;
};

function buildPacketText(
  root: RootCard,
  route: RepairRoute,
  fields: PacketFields,
) {
  const field = (value: string) => value.trim() || "[not yet specified]";
  return [
    "BOUNDARY FIRST REPAIR PACKET",
    "",
    `Root lens: ${root.title}`,
    `Repair route: ${route.title}`,
    `Situation: ${field(fields.situation)}`,
    `Receiving system: ${field(fields.receiver)}`,
    `Protected invariant: ${field(fields.invariant)}`,
    `Repair owner: ${field(fields.owner)}`,
    `Witness / contestability: ${field(fields.witness)}`,
    `Local closure test: ${field(fields.closure)}`,
    "",
    "Route outputs:",
    ...route.outputs.map((output) => `- ${output}`),
    "",
    `Route-level closure test: ${route.closureTest}`,
    "",
    "Claim boundary: This packet is a local diagnostic scaffold, not an automated finding, legal determination, or proof of closure.",
  ].join("\n");
}

function RepairRouterView({
  selectedRootId,
  selectedRouteId,
  onSelectRoot,
  onSelectRoute,
}: {
  selectedRootId: string;
  selectedRouteId: string;
  onSelectRoot: (id: string) => void;
  onSelectRoute: (id: string) => void;
}) {
  const roots = publicationContent.rootCards;
  const routes = publicationContent.repairRoutes;
  const selectedRoot =
    roots.find((root) => root.id === selectedRootId) ?? roots[0];
  const recommendedRouteId =
    rootRouteMap[selectedRoot.id] ?? "representation-revision";
  const selectedRoute =
    routes.find((route) => route.id === selectedRouteId) ??
    routes.find((route) => route.id === recommendedRouteId) ??
    routes[0];
  const [fields, setFields] = useState<PacketFields>({
    situation: "",
    receiver: "",
    invariant: "",
    owner: "",
    witness: "",
    closure: "",
  });
  const [copyStatus, setCopyStatus] = useState("");
  const packetText = buildPacketText(selectedRoot, selectedRoute, fields);

  async function copyPacket() {
    try {
      await navigator.clipboard.writeText(packetText);
      setCopyStatus("Packet copied.");
    } catch {
      setCopyStatus("Copy was unavailable. Select the packet text manually.");
    }
  }

  return (
    <div className="grid gap-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <fieldset>
          <legend className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
            1 · Diagnose the primary severance
          </legend>
          <div className="mt-3 grid gap-2">
            {roots.map((root) => (
              <button
                aria-pressed={root.id === selectedRoot.id}
                className={`min-h-11 border px-4 py-3 text-left text-sm font-semibold ${
                  root.id === selectedRoot.id
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-background hover:bg-muted"
                }`}
                key={root.id}
                onClick={() => onSelectRoot(root.id)}
                type="button"
              >
                {root.title}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
            2 · Select the repair route
          </legend>
          <p className="mt-3 text-sm leading-6 text-foreground-muted">
            Recommended from this lens:{" "}
            <strong>
              {routes.find((route) => route.id === recommendedRouteId)?.title}
            </strong>
            . Recommendation is orientation, not diagnosis.
          </p>
          <div className="mt-3 grid gap-2">
            {routes.map((route) => (
              <button
                aria-pressed={route.id === selectedRoute.id}
                className={`min-h-11 border px-4 py-3 text-left text-sm font-semibold ${
                  route.id === selectedRoute.id
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-background hover:bg-muted"
                }`}
                key={route.id}
                onClick={() => onSelectRoute(route.id)}
                type="button"
              >
                {route.title}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="border border-border bg-card p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
              3 · Supply local closure fields
            </p>
            <h3 className="mt-2 font-serif text-3xl font-semibold">
              {selectedRoute.title}
            </h3>
          </div>
          <span className="border border-border bg-background px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.1em]">
            Local only · not submitted
          </span>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            ["situation", "Situation or decision"],
            ["receiver", "Receiving system or affected party"],
            ["invariant", "Protected invariant"],
            ["owner", "Repair owner with capacity"],
            ["witness", "Witness or contestability path"],
            ["closure", "Local closure test"],
          ].map(([id, label]) => (
            <label className="grid gap-2 text-sm font-semibold" key={id}>
              {label}
              <textarea
                className="min-h-24 resize-y border border-border bg-background p-3 text-sm font-normal leading-6"
                onChange={(event) =>
                  setFields((current) => ({
                    ...current,
                    [id]: event.target.value,
                  }))
                }
                value={fields[id as keyof PacketFields]}
              />
            </label>
          ))}
        </div>
      </div>

      <div className="grid gap-5 border border-border bg-primary p-5 text-primary-foreground sm:p-7 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div>
          <p
            className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-foreground-muted"
            id="repair-packet-label"
          >
            4 · Repair packet
          </p>
          <pre
            aria-labelledby="repair-packet-label"
            className="mt-3 whitespace-pre-wrap break-words border border-primary-foreground/30 bg-primary-foreground/[0.06] p-4 font-mono text-xs leading-6 text-primary-foreground"
            id="repair-packet"
            tabIndex={0}
          >
            {packetText}
          </pre>
        </div>
        <div className="flex flex-col gap-3 lg:w-44 lg:pt-7">
          <button
            className="inline-flex min-h-12 items-center justify-center bg-primary-foreground px-4 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-primary"
            onClick={copyPacket}
            type="button"
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy packet
          </button>
          <button
            className="inline-flex min-h-12 items-center justify-center border border-primary-foreground/40 px-4 font-mono text-[11px] font-semibold uppercase tracking-[0.12em]"
            onClick={() => {
              setFields({
                situation: "",
                receiver: "",
                invariant: "",
                owner: "",
                witness: "",
                closure: "",
              });
              setCopyStatus("Local fields cleared.");
            }}
            type="button"
          >
            Clear local fields
          </button>
          <p aria-live="polite" className="text-xs leading-5">
            {copyStatus}
          </p>
        </div>
      </div>
    </div>
  );
}

export function PublicationMechanicsLab() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedMechanic = searchParams.get(
    "mechanic",
  ) as PublicationMechanicId | null;
  const activeMechanic =
    requestedMechanic && mechanicIds.has(requestedMechanic)
      ? requestedMechanic
      : "nested-interiors";
  const requestedRoot = searchParams.get("lens");
  const selectedRootId = publicationContent.rootCards.some(
    (root) => root.id === requestedRoot,
  )
    ? (requestedRoot as string)
    : publicationContent.rootCards[0].id;
  const requestedRoute = searchParams.get("route");
  const selectedRouteId = publicationContent.repairRoutes.some(
    (route) => route.id === requestedRoute,
  )
    ? (requestedRoute as string)
    : rootRouteMap[selectedRootId];
  const activeOption =
    mechanicOptions.find((option) => option.id === activeMechanic) ??
    mechanicOptions[0];

  function replaceState(changes: Record<string, string | null>) {
    router.replace(publicationMechanicsHref(searchParams.toString(), changes), {
      scroll: false,
    });
  }

  function selectRoot(id: string) {
    replaceState({ lens: id, route: null });
  }

  return (
    <section
      className="scroll-mt-20 border-b border-border bg-card/55 px-5 py-10 sm:px-8 sm:py-14"
      id="interactive-mechanics"
    >
      <div className="mx-auto max-w-7xl">
        <div
          aria-label={`${activeOption.label} mechanics`}
          className="border border-border bg-background p-5 sm:p-7 lg:p-9"
          id="mechanic-panel"
          role="region"
        >
          <div className="mb-7 border-b border-border pb-5">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
              {activeOption.label}
            </p>
            <p className="mt-2 text-sm leading-6 text-foreground/68">
              {activeOption.short}
            </p>
          </div>

          {activeMechanic === "nested-interiors" ? (
            <NestedInteriorsView />
          ) : null}
          {activeMechanic === "boundary-accounting" ? (
            <BoundaryAccountingView />
          ) : null}
          {activeMechanic === "agency-rate" ? <AgencyRateView /> : null}
          {activeMechanic === "root-lenses" ? (
            <RootLensesView
              onSelectRoot={selectRoot}
              selectedRootId={selectedRootId}
            />
          ) : null}
          {activeMechanic === "boundary-cycle" ? <BoundaryCycleView /> : null}
          {activeMechanic === "repair-router" ? (
            <RepairRouterView
              onSelectRoot={selectRoot}
              onSelectRoute={(id) => replaceState({ route: id })}
              selectedRootId={selectedRootId}
              selectedRouteId={selectedRouteId}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
