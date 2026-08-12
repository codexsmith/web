"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  GitPullRequest,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { useGraph } from "../context/GraphContext";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageMasthead } from "@/components/page-masthead";
import { EngagementHeroes } from "@/components/engagement-heroes";
import { EvidenceVitalsBar } from "@/components/evidence-vitals-bar";
import { ContextNavigation } from "@/components/public-interface/ContextNavigation";
import {
  asRecord,
  asRecordArray,
  asString,
  asStringArray,
} from "@/lib/content";
import { ATLAS_HREF } from "@/lib/site-navigation";
import {
  corpusEvidenceVitals,
  evidenceSnapshot,
  EVIDENCE_SNAPSHOT_STAMP,
} from "@/lib/evidence-vitals";

const closureSections = [
  {
    id: "purpose",
    label: "Purpose",
    description: "Identity · Mission · Vision",
  },
  {
    id: "invariants",
    label: "Invariants",
    description: "Maxims · Principles · Manifesto",
  },
  {
    id: "authority",
    label: "Authority",
    description: "Roles · Decision rights · Accountability",
  },
  {
    id: "gates",
    label: "Gates",
    description: "Evidence · Publication · Portfolio · Restriction",
  },
  {
    id: "standing",
    label: "Standing",
    description: "Participation · Collaboration · Contestability",
  },
  {
    id: "repair",
    label: "Repair",
    description: "Correction · Replacement · Withdrawal",
  },
  {
    id: "continuity",
    label: "Continuity",
    description: "Stewardship · Transfer · Retirement · Succession",
  },
];

const authorityCommitmentIds = new Set([
  "accountable-stewardship",
  "bounded-authority",
  "repair-capacity",
  "right-to-criticism",
]);

const standingPolicyIds = new Set([
  "bounded-collaboration",
  "accessibility-participation",
  "labor-credit",
  "external-review",
]);

const repairPolicyIds = new Set(["corrections", "no-orphan-assets"]);

const continuityPolicyIds = new Set([
  "provenance-not-authority",
  "conflicts",
  "external-review",
  "continuity-succession",
]);

const repairCapacityTests = [
  "Named owner",
  "Authority to act",
  "Evidence access",
  "Time and resources",
  "Declared target state",
];

function selectRecords(records, ids) {
  return records.filter((record) => ids.has(asString(record.id)));
}

function StatementCard({ item, category }) {
  return (
    <article className="flex h-full flex-col border border-border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="rounded-full border border-border bg-background px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.16em]">
          {category}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-foreground-muted">
          Classified
        </span>
      </div>
      <h3 className="mt-5 font-serif text-2xl font-semibold leading-8">
        {asString(item.statement)}
      </h3>
      <p className="mt-4 text-sm leading-7 text-foreground-muted">
        {asString(item.summary)}
      </p>
      <dl className="mt-6 grid gap-3 border-t border-border/60 pt-5 text-xs">
        <div className="grid grid-cols-[6.5rem_1fr] gap-3">
          <dt className="font-mono uppercase tracking-wider text-foreground-muted">
            Secondary role
          </dt>
          <dd>
            {asString(item.secondaryRole) ||
              asStringArray(item.secondaryRoles).join(" · ") ||
              "Not recorded"}
          </dd>
        </div>
        <div className="grid grid-cols-[6.5rem_1fr] gap-3">
          <dt className="font-mono uppercase tracking-wider text-foreground-muted">
            Binding
          </dt>
          <dd>Formal adoption not yet recorded</dd>
        </div>
        <div className="grid grid-cols-[6.5rem_1fr] gap-3">
          <dt className="font-mono uppercase tracking-wider text-foreground-muted">
            Operation
          </dt>
          <dd>Evidence record not yet available</dd>
        </div>
      </dl>
    </article>
  );
}

export default function AboutPage() {
  const { nodes } = useGraph();
  const [view, setView] = useState("closure");
  const [activeClosure, setActiveClosure] = useState("purpose");
  const identity = nodes.find((node) => node.id === "identity") ?? nodes[0];

  const institution = asRecord(identity?.institution);
  const stage = asRecord(identity?.institutionalStage);
  const mission = asRecord(identity?.mission);
  const vision = asRecord(identity?.vision);
  const guidelines = asRecord(identity?.operatingGuidelines);
  const governance = asRecord(identity?.governance);
  const policy = asRecord(identity?.institutePolicy);
  const publication = asRecord(identity?.publicationAdmissibility);
  const evidence = asRecord(identity?.evidenceArchitecture);
  const participation = asRecord(identity?.participation);
  const collaboration = asRecord(identity?.collaboration);
  const founder = asRecord(identity?.founderAndInstitution);
  const goals = asRecord(identity?.goals);

  const statements = useMemo(
    () => [
      ...asRecordArray(guidelines.maxims).map((item) => ({
        item,
        category: "Maxim",
      })),
      ...asRecordArray(guidelines.principles).map((item) => ({
        item,
        category: "Principle",
      })),
      ...asRecordArray(guidelines.designDoctrines).map((item) => ({
        item,
        category: "Design doctrine",
      })),
      ...asRecordArray(guidelines.policies).map((item) => ({
        item,
        category: "Policy",
      })),
    ],
    [guidelines],
  );

  const currentFacts = asStringArray(stage.currentFacts);
  const evidenceStages = asRecordArray(evidence.stages);
  const participationPaths = asRecordArray(participation.pathways);
  const governanceTests = asStringArray(governance.agenticSystemTest).slice(
    0,
    6,
  );
  const governanceCommitments = asRecordArray(governance.internalCommitments);
  const policyPrinciples = asRecordArray(policy.policyPrinciples);
  const authorityCommitments = selectRecords(
    governanceCommitments,
    authorityCommitmentIds,
  );
  const standingPolicies = selectRecords(policyPrinciples, standingPolicyIds);
  const repairPolicies = selectRecords(policyPrinciples, repairPolicyIds);
  const continuityPolicies = selectRecords(
    policyPrinciples,
    continuityPolicyIds,
  );
  const noUndeclaredWe =
    asRecordArray(guidelines.designDoctrines).find(
      (item) => asString(item.id) === "no-undeclared-we",
    ) ?? {};

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <ContextNavigation group="laboratory" />
      <PageMasthead
        deck="Independent public-interest research and engineering."
        description={asString(institution.compactDescriptor, identity?.short)}
        inverse
        title="Laboratory"
        utility={
          <div
            className="flex rounded-sm border border-primary-foreground/30 p-1"
            aria-label="Laboratory view"
          >
            <button
              aria-pressed={view === "standard"}
              className={`px-3 py-2 font-mono text-[9px] font-semibold uppercase tracking-[0.15em] ${
                view === "standard" ? "bg-primary-foreground text-primary" : ""
              }`}
              onClick={() => setView("standard")}
              type="button"
            >
              Standard
            </button>
            <button
              aria-pressed={view === "closure"}
              className={`px-3 py-2 font-mono text-[9px] font-semibold uppercase tracking-[0.15em] ${
                view === "closure" ? "bg-primary-foreground text-primary" : ""
              }`}
              onClick={() => setView("closure")}
              type="button"
            >
              Closure map
            </button>
          </div>
        }
      />

      <section className="border-b border-border bg-card/55 px-5 py-5 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <EvidenceVitalsBar
            description={evidenceSnapshot.boundary}
            eyebrow="Institutional record boundary"
            items={corpusEvidenceVitals}
            stamp={EVIDENCE_SNAPSHOT_STAMP}
            title="Source language is inventoried; operation is not assumed."
          />
        </div>
      </section>

      <section className="border-b border-border px-5 py-10 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
            Institutional stage — stated as a sequence, not a single claim
          </p>
          <ol className="mt-6 grid gap-px overflow-hidden border border-border bg-border lg:grid-cols-4">
            {[
              [
                "Now",
                asString(
                  stage.currentOperatingReality,
                  "Founder-led, AI-enabled micro-lab",
                ),
              ],
              ["Near-term", asString(stage.nearTermAim)],
              ["Medium-term", asString(stage.mediumTermAim)],
              ["Bounded horizon", asString(vision.longHorizon)],
            ].map(([label, value], index) => (
              <li className="relative bg-card p-5 sm:p-6" key={label}>
                <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
                  {String(index + 1).padStart(2, "0")} · {label}
                </span>
                <p className="mt-4 text-sm font-medium leading-7">{value}</p>
                {index < 3 && (
                  <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 rounded-full border border-border bg-background p-1 lg:block" />
                )}
              </li>
            ))}
          </ol>
          <ul className="mt-5 grid gap-2 text-sm text-foreground-muted md:grid-cols-2">
            {currentFacts.map((fact) => (
              <li
                className="flex gap-3 border-l-2 border-accent pl-3 leading-6"
                key={fact}
              >
                <Check className="mt-1 h-4 w-4 shrink-0" />
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {view === "closure" ? (
        <>
          <section className="px-5 py-14 sm:px-8 sm:py-20">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-4xl">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
                  Institutional closure map
                </p>
                <h2 className="mt-3 font-serif text-4xl font-semibold">
                  The lab is inside the system it evaluates.
                </h2>
                <p className="mt-5 text-base leading-8 text-foreground-muted">
                  Select a closure layer to see what it binds. Classification,
                  adoption, operation, evidence, and audit remain separate
                  statuses.
                </p>
              </div>
              <div className="mt-8 flex snap-x snap-mandatory scroll-px-1 gap-2 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {closureSections.map((section, index) => (
                    <button
                      aria-pressed={activeClosure === section.id}
                      className={`grid min-w-[14rem] shrink-0 snap-start grid-cols-[2rem_1fr] items-center gap-3 border px-4 py-3 text-left transition-colors ${
                        activeClosure === section.id
                          ? "border-foreground bg-foreground text-background"
                          : "border-border bg-card hover:bg-muted"
                      }`}
                      key={section.id}
                      onClick={() => setActiveClosure(section.id)}
                      type="button"
                    >
                      <span className="font-mono text-[10px]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <span className="block font-serif text-lg font-semibold">
                          {section.label}
                        </span>
                        <span
                          className={`mt-0.5 block text-xs ${
                            activeClosure === section.id
                              ? "text-background/65"
                              : "text-foreground-muted"
                          }`}
                        >
                          {section.description}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>

              <div className="mt-8 border border-border bg-card p-6 sm:p-8">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
                      Selected closure layer
                    </p>
                    <h2 className="mt-2 font-serif text-4xl font-semibold capitalize">
                      {activeClosure}
                    </h2>
                  </div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background">
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                </div>

                {activeClosure === "purpose" && (
                  <div className="mt-8 space-y-7">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-wider text-foreground-muted">
                        Mission
                      </p>
                      <p className="mt-2 font-serif text-3xl font-semibold">
                        {asString(mission.primary)}
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-wider text-foreground-muted">
                        Method
                      </p>
                      <p className="mt-2 text-lg font-medium leading-8">
                        {asString(mission.method)}
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-wider text-foreground-muted">
                        Vision
                      </p>
                      <p className="mt-2 text-sm leading-7 text-foreground-muted">
                        {asString(vision.public)}
                      </p>
                    </div>
                  </div>
                )}

                {activeClosure === "invariants" && (
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {statements.map(({ item, category }) => (
                      <div
                        className="border border-border bg-background p-4"
                        key={asString(item.id)}
                      >
                        <p className="font-mono text-[9px] uppercase tracking-wider text-foreground-muted">
                          {category}
                        </p>
                        <p className="mt-2 font-serif text-lg font-semibold">
                          {asString(item.statement)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {activeClosure === "authority" && (
                  <div className="mt-8 space-y-8">
                    <div>
                      <p className="font-serif text-3xl font-semibold">
                        Responsibility may be distributed, but it may not be
                        dissolved.
                      </p>
                      <p className="mt-5 text-base leading-8 text-foreground-muted">
                        {asString(governance.researchDoctrine)}
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {authorityCommitments.map((item) => (
                        <article
                          className="border border-border bg-background p-4"
                          key={asString(item.id)}
                        >
                          <Scale className="h-4 w-4 text-foreground-muted" />
                          <h3 className="mt-3 font-serif text-lg font-semibold">
                            {asString(item.title)}
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-foreground/68">
                            {asString(item.body)}
                          </p>
                        </article>
                      ))}
                    </div>

                    <div>
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
                        Consequential authority should remain
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {governanceTests.map((item) => (
                          <li
                            className="rounded-full border border-border bg-background px-3 py-2 text-xs font-semibold"
                            key={item}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 border-l-2 border-accent pl-4 text-sm font-medium leading-7">
                        {asString(governance.humaneTest)}
                      </p>
                    </div>
                  </div>
                )}

                {activeClosure === "gates" && (
                  <div className="mt-8">
                    <p className="text-sm leading-7 text-foreground-muted">
                      {asString(evidence.principle)}
                    </p>
                    <ol className="mt-6 grid gap-2 sm:grid-cols-3">
                      {evidenceStages.map((item, index) => (
                        <li
                          className="border border-border bg-background p-3"
                          key={asString(item.id)}
                        >
                          <span className="font-mono text-[9px] text-foreground-muted">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="mt-1 block text-sm font-semibold">
                            {asString(item.label)}
                          </span>
                        </li>
                      ))}
                    </ol>
                    <p className="mt-6 border-l-2 border-accent pl-4 text-sm leading-7">
                      {asString(publication.principle, asString(policy.status))}
                    </p>
                  </div>
                )}

                {activeClosure === "standing" && (
                  <div className="mt-8 space-y-8">
                    <div className="border-l-2 border-accent pl-5">
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
                        Working doctrine
                      </p>
                      <p className="mt-3 font-serif text-3xl font-semibold">
                        {asString(noUndeclaredWe.statement)}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-foreground-muted">
                        Collective voice should make the speaker, participants,
                        authority, represented parties, material dissent,
                        affected nonparticipants, and review path legible.
                        Participation does not by itself imply consent,
                        endorsement, authorship, or institutional authority.
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {standingPolicies.map((item) => (
                        <article
                          className="border border-border bg-background p-4"
                          key={asString(item.id)}
                        >
                          <h3 className="font-serif text-lg font-semibold">
                            {asString(item.title)}
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-foreground/68">
                            {asString(item.body)}
                          </p>
                        </article>
                      ))}
                    </div>

                    <div>
                      <p className="font-serif text-2xl font-semibold">
                        {asString(participation.title)}
                      </p>
                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        {participationPaths.map((item) => (
                          <Link
                            className="border border-border bg-background p-4 transition-colors hover:bg-muted"
                            href="/collaborate"
                            key={asString(item.id)}
                          >
                            <span className="font-semibold">
                              {asString(item.label)}
                            </span>
                            <span className="mt-2 block text-xs leading-5 text-foreground-muted">
                              {asString(item.description)}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeClosure === "repair" && (
                  <div className="mt-8 space-y-8">
                    <div>
                      <p className="font-serif text-3xl font-semibold">
                        Repair is a capability, not an emergency promise.
                      </p>
                      <p className="mt-5 text-base leading-8 text-foreground-muted">
                        Claims, policies, products, publications, and
                        collaborations must preserve visible routes for
                        criticism, qualification, replacement, withdrawal, and
                        repair. A route is real only when it can act.
                      </p>
                    </div>

                    <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                      {repairCapacityTests.map((item, index) => (
                        <li
                          className="border border-border bg-background p-3"
                          key={item}
                        >
                          <span className="font-mono text-[10px] text-foreground-muted">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="mt-2 block text-sm font-semibold leading-5">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {repairPolicies.map((item) => (
                        <article
                          className="border-l-2 border-accent bg-background p-4"
                          key={asString(item.id)}
                        >
                          <h3 className="font-serif text-lg font-semibold">
                            {asString(item.title)}
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-foreground/68">
                            {asString(item.body)}
                          </p>
                        </article>
                      ))}
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                      {[
                        "Contest",
                        "Correct",
                        "Replace",
                        "Withdraw",
                        "Repair",
                        "Record",
                      ].map((item) => (
                        <div
                          className="flex items-center gap-3 border border-border bg-background p-4 text-sm font-semibold"
                          key={item}
                        >
                          <GitPullRequest className="h-4 w-4" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeClosure === "continuity" && (
                  <div className="mt-8 space-y-8">
                    <div>
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
                        Founder provenance without founder finality
                      </p>
                      <p className="mt-3 font-serif text-3xl font-semibold">
                        {asString(founder.summary)}
                      </p>
                      <p className="mt-4 text-sm leading-7 text-foreground-muted">
                        The founder may be historically indispensable without
                        becoming the permanent court of final appeal. Origin is
                        provenance; claims still require evidence, criticism,
                        comparison, and use.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {asRecordArray(founder.principles).map((item) => (
                        <div
                          className="border-l-2 border-accent pl-4"
                          key={asString(item.title)}
                        >
                          <p className="font-semibold">
                            {asString(item.title)}
                          </p>
                          <p className="mt-1 text-sm leading-6 text-foreground-muted">
                            {asString(item.body)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
                          Self-application mechanisms
                        </p>
                        <span className="rounded-full border border-border bg-background px-3 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                          Proposed policy framework
                        </span>
                      </div>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {continuityPolicies.map((item) => (
                          <article
                            className="border border-border bg-background p-4"
                            key={asString(item.id)}
                          >
                            <h3 className="font-serif text-lg font-semibold">
                              {asString(item.title)}
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-foreground/68">
                              {asString(item.body)}
                            </p>
                          </article>
                        ))}
                      </div>
                    </div>

                    <p className="font-mono text-[10px] uppercase tracking-wider text-foreground-muted">
                      Continuity goal · {asString(founder.continuityGoal)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="border-y border-border bg-card/50 px-5 py-14 sm:px-8 sm:py-20">
            <div className="mx-auto max-w-7xl">
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
                    Institutional covenant
                  </p>
                  <h2 className="mt-3 max-w-3xl font-serif text-4xl font-semibold sm:text-5xl">
                    Category is visible. Missing force remains missing.
                  </h2>
                </div>
                <p className="max-w-md text-sm leading-7 text-foreground-muted">
                  {asString(guidelines.status)}
                </p>
              </div>
              <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {statements.map(({ item, category }) => (
                  <StatementCard
                    category={category}
                    item={item}
                    key={asString(item.id)}
                  />
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="px-5 py-14 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-7xl">
            <nav
              aria-label="Institutional sections"
            >
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
                Direct institutional index
              </p>
              <div className="mt-4 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {[
                  "Identity",
                  "Mission",
                  "Vision",
                  "Manifesto",
                  "Governance",
                  "Policies",
                  "Research integrity",
                  "Participation",
                  "Collaboration",
                  "Portfolio",
                  "Continuity",
                  "Goals",
                ].map((item) => (
                  <a
                    className="min-h-11 shrink-0 snap-start border border-border bg-card px-4 py-3 text-sm hover:border-foreground hover:bg-muted"
                    href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                    key={item}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </nav>
            <article className="mt-12 min-w-0 space-y-14">
              {[
                ["identity", "Identity", asString(institution.publicIdentity)],
                ["mission", "Mission", asString(mission.primary)],
                ["vision", "Vision", asString(vision.public)],
                [
                  "manifesto",
                  "Manifesto",
                  asString(asRecord(identity?.manifesto).introduction),
                ],
                [
                  "governance",
                  "Governance",
                  asString(governance.researchDoctrine),
                ],
                [
                  "policies",
                  "Policies",
                  asString(policy.purpose, asString(policy.status)),
                ],
                [
                  "research-integrity",
                  "Research integrity",
                  asString(evidence.principle),
                ],
                [
                  "participation",
                  "Participation",
                  asString(participation.principle),
                ],
                [
                  "collaboration",
                  "Collaboration",
                  asString(collaboration.compact),
                ],
                [
                  "portfolio",
                  "Portfolio governance",
                  asString(asRecord(identity?.portfolioGovernance).principle),
                ],
                [
                  "continuity",
                  "Founder and institution",
                  asString(founder.summary),
                ],
                ["goals", "Goals", asString(goals.longTerm)],
              ].map(([id, title, body]) => (
                <section
                  className="scroll-mt-28 border-t border-border pt-7 first:border-t-0 first:pt-0"
                  id={id}
                  key={id}
                >
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
                    {title}
                  </p>
                  <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
                    {title}
                  </h2>
                  <p className="mt-5 max-w-4xl text-base leading-8 text-foreground-muted sm:text-lg sm:leading-9">
                    {body || "No public summary is currently recorded."}
                  </p>
                </section>
              ))}
            </article>
          </div>
        </section>
      )}

      <EngagementHeroes context="about" />

      <section className="bg-primary px-5 py-14 text-primary-foreground sm:px-8 sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-foreground-muted">
              Public operating boundary
            </p>
            <h2 className="mt-3 max-w-3xl font-serif text-4xl font-semibold sm:text-5xl">
              Formation-stage status is a fact to govern from, not a weakness to
              hide.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              className="inline-flex min-h-12 items-center bg-primary-foreground px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-primary"
              href="/collaborate"
            >
              Collaboration framework <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              className="inline-flex min-h-12 items-center border border-primary-foreground/35 px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em]"
              href={ATLAS_HREF}
            >
              Open the atlas
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
