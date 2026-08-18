"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CircleDot,
  Eye,
  LockKeyhole,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { useIdentity } from "../context/IdentityContext";
import {
  asRecord,
  asRecordArray,
  asString,
  asStringArray,
} from "@/lib/content";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageMasthead } from "@/components/page-masthead";
import { ContextNavigation } from "@/components/public-interface/ContextNavigation";
import collaborationRegistry from "@/content/collaboration_instances.json";

const nonEquivalences = [
  ["Participation", "authorship"],
  ["Advice", "approval"],
  ["Review", "endorsement"],
  ["Funding", "epistemic authority"],
  ["Contribution", "ownership"],
  ["Access", "publication right"],
  ["Partnership", "institutional office"],
  ["Release", "promotion to canon"],
];

const featuredPrincipleIds = new Set([
  "declare-boundary",
  "declare-roles-authority",
  "preserve-provenance",
  "preserve-disagreement",
  "evidence-before-promotion",
  "closure-repair",
]);

export default function CollaborationPage() {
  const identity = useIdentity();
  const participation = asRecord(identity?.participation);
  const collaboration = asRecord(identity?.collaboration);
  const modes = asRecordArray(collaboration.collaborationModes);
  const roles = asRecordArray(collaboration.roleClasses);
  const lifecycle = asRecordArray(collaboration.lifecycle);
  const pathways = asRecordArray(participation.pathways);
  const publicFields = asStringArray(asRecord(collaboration.ux).publicFields);
  const operatingPrinciples = asRecordArray(
    collaboration.operatingPrinciples,
  ).filter((principle) => featuredPrincipleIds.has(asString(principle.id)));
  const evidenceStandard = asRecord(collaboration.evidenceStandard);
  const evidencePackage = asStringArray(
    evidenceStandard.minimumEvidencePackage,
  );
  const closureConditions = asStringArray(collaboration.closureConditions);
  const [activeModeId, setActiveModeId] = useState(asString(modes[0]?.id));

  const activeMode =
    modes.find((mode) => asString(mode.id) === activeModeId) ?? modes[0] ?? {};

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <ContextNavigation group="work" />
      <PageMasthead
        actions={
          <a
            className="inline-flex min-h-12 items-center bg-primary-foreground px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-primary"
            href="mailto:contact@boundaryfirstlabs.com?subject=Bounded%20collaboration%20inquiry"
          >
            Propose a collaboration <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        }
        deck="Boundaries make shared work coherent."
        description={asString(collaboration.compact)}
        eyebrow="Declared roles, authority, and closure"
        inverse
        title="Collaborate"
      />

      <section className="border-b border-border px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              Lifecycle
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold">
              A relationship has a beginning, gates, and an end.
            </h2>
          </div>
          <ol className="mt-9 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-4 xl:grid-cols-7">
            {lifecycle.map((stage, index) => (
              <li className="bg-card p-4 sm:p-5" key={asString(stage.id)}>
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-serif text-lg font-semibold">
                  {asString(stage.label)}
                </h3>
                <p className="mt-2 text-xs leading-5 text-foreground-muted">
                  {asString(stage.description)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-border bg-card/45 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-7 lg:grid-cols-[minmax(0,0.8fr)_minmax(20rem,0.45fr)] lg:items-end lg:justify-between">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
                Working collaboration doctrine
              </p>
              <h2 className="mt-3 max-w-4xl font-serif text-4xl font-semibold sm:text-5xl">
                Shared purpose does not erase the boundaries that make shared
                work accountable.
              </h2>
            </div>
            <p className="border-l-2 border-accent pl-5 text-sm leading-7 text-foreground-muted">
              {asString(collaboration.status)}
            </p>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 xl:grid-cols-3">
            {operatingPrinciples.map((principle, index) => (
              <article
                className="bg-background p-5 sm:p-6"
                key={asString(principle.id)}
              >
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-serif text-2xl font-semibold leading-8">
                  {asString(principle.title)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-foreground-muted">
                  {asString(principle.body)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              Nine collaboration modes
            </p>
            <div
              className="mt-5 grid gap-1"
              role="tablist"
              aria-label="Collaboration modes"
            >
              {modes.map((mode, index) => {
                const id = asString(mode.id);
                const selected = id === asString(activeMode.id);
                return (
                  <button
                    aria-selected={selected}
                    className={`grid grid-cols-[2rem_1fr] gap-2 border px-3 py-3 text-left ${
                      selected
                        ? "border-foreground bg-foreground text-background"
                        : "border-transparent hover:border-border hover:bg-card"
                    }`}
                    key={id}
                    onClick={() => setActiveModeId(id)}
                    role="tab"
                    type="button"
                  >
                    <span className="font-mono text-[11px]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs font-semibold leading-5">
                      {asString(mode.label)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <article
            className="border border-border bg-card p-6 sm:p-8 lg:p-10"
            role="tabpanel"
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
                  Collaboration mode
                </p>
                <h2 className="mt-3 max-w-4xl font-serif text-4xl font-semibold sm:text-5xl">
                  {asString(activeMode.label)}
                </h2>
              </div>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-background">
                <CircleDot className="h-5 w-5" />
              </span>
            </div>
            <p className="mt-7 max-w-4xl text-lg font-medium leading-8 text-foreground-muted">
              {asString(activeMode.purpose)}
            </p>

            <div className="mt-9 grid gap-8 md:grid-cols-2">
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.17em] text-foreground-muted">
                  Typical outputs
                </p>
                <ul className="mt-4 grid gap-2">
                  {asStringArray(activeMode.typicalOutputs).map((output) => (
                    <li
                      className="flex items-center gap-3 border border-border bg-background p-3 text-sm font-medium"
                      key={output}
                    >
                      <CheckCircle2 className="h-4 w-4 text-foreground-muted" />
                      {output}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.17em] text-foreground-muted">
                  Promotion boundary
                </p>
                <div className="mt-4 border-l-2 border-accent pl-5">
                  <p className="text-sm leading-7 text-foreground-muted">
                    The relationship creates contact, evidence, criticism, or
                    capacity. It does not automatically create authority,
                    endorsement, authorship, ownership, or canonical status.
                  </p>
                </div>
                <a
                  className="mt-7 inline-flex min-h-11 items-center border border-border bg-background px-4 font-mono text-[11px] font-semibold uppercase tracking-[0.15em]"
                  href={`mailto:contact@boundaryfirstlabs.com?subject=${encodeURIComponent(
                    asString(activeMode.label),
                  )}%20inquiry`}
                >
                  Inquire about this mode{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="border-y border-border bg-card/55 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
                Role and authority firewall
              </p>
              <h2 className="mt-3 font-serif text-4xl font-semibold">
                A declared relation does not silently become another.
              </h2>
              <p className="mt-5 text-base leading-8 text-foreground-muted">
                Roles answer who is present. Authority, authorship, review,
                ownership, funding, maintenance, and endorsement remain separate
                edges.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
              {nonEquivalences.map(([left, right]) => (
                <div
                  className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 bg-background p-4 text-sm"
                  key={left}
                >
                  <span className="font-semibold">{left}</span>
                  <span
                    aria-label="is not equivalent to"
                    className="font-mono text-lg text-destructive"
                  >
                    ≠
                  </span>
                  <span className="text-foreground-muted">{right}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {roles.map((role) => (
              <article
                className="border border-border bg-background p-5"
                key={asString(role.id)}
              >
                <Scale className="h-5 w-5 text-foreground-muted" />
                <h3 className="mt-4 font-serif text-xl font-semibold">
                  {asString(role.label)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-foreground-muted">
                  {asString(role.boundary)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-primary px-5 py-14 text-primary-foreground sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(18rem,0.68fr)_minmax(0,1.32fr)]">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground-muted">
              Evidence, not endorsement
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
              Collaboration puts the work under pressure.
            </h2>
            <p className="mt-6 text-base leading-8 text-primary-foreground-secondary">
              {asString(evidenceStandard.principle)}
            </p>
            <p className="mt-6 border-l-2 border-primary-foreground/50 pl-5 text-sm leading-7 text-primary-foreground-secondary">
              {asString(evidenceStandard.promotionRule)}
            </p>
          </div>

          <ol className="grid gap-px overflow-hidden border border-primary-foreground/35 bg-primary-foreground/35 sm:grid-cols-2">
            {evidencePackage.map((item, index) => (
              <li
                className="grid grid-cols-[2.25rem_1fr] gap-3 bg-primary p-4 text-sm leading-6 sm:p-5"
                key={item}
              >
                <span className="font-mono text-[11px] text-primary-foreground-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.7fr)]">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              Ways to enter
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold">
              Participation is an entrance. Collaboration is the operating
              relationship.
            </h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {pathways.map((path) => (
                <article
                  className="border border-border bg-card p-5"
                  key={asString(path.id)}
                >
                  <h3 className="font-serif text-xl font-semibold">
                    {asString(path.label)}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-foreground-muted">
                    {asString(path.description)}
                  </p>
                  <a
                    className="mt-5 inline-flex items-center font-mono text-[11px] font-semibold uppercase tracking-[0.15em]"
                    href="mailto:contact@boundaryfirstlabs.com"
                  >
                    Begin here <ArrowRight className="ml-2 h-3.5 w-3.5" />
                  </a>
                </article>
              ))}
            </div>
          </div>

          <aside className="border border-border bg-primary p-6 text-primary-foreground sm:p-8 lg:sticky lg:top-28 lg:self-start">
            <ShieldCheck className="h-7 w-7" />
            <p className="mt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground-muted">
              Public promise
            </p>
            <p className="mt-3 font-serif text-2xl font-semibold leading-9">
              {asString(collaboration.publicPromise)}
            </p>
            <div className="mt-7 border-t border-primary-foreground/25 pt-6">
              <p className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-foreground-muted">
                <LockKeyhole className="h-4 w-4" />
                Visibility boundary
              </p>
              <p className="mt-3 text-sm leading-7 text-primary-foreground-secondary">
                {asString(asRecord(collaboration.ux).visibilityBoundary)}
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-border bg-card px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              Public collaboration record
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
              Enough context to enter clearly—and enough closure to leave
              responsibly.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <article className="border border-border bg-background p-5 sm:p-7">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
                What the public record names
              </p>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {publicFields.map((field) => (
                  <div
                    className="flex items-center gap-3 border border-border bg-card p-3 text-sm font-medium"
                    key={field}
                  >
                    <Eye className="h-4 w-4 shrink-0 text-foreground-muted" />
                    <span className="capitalize">{field}</span>
                  </div>
                ))}
                <div className="flex items-center gap-3 border border-dashed border-border bg-card p-3 text-sm text-foreground-muted">
                  <LockKeyhole className="h-4 w-4 shrink-0" />
                  Protected fields marked
                </div>
              </div>
            </article>

            <article className="border border-border bg-background p-5 sm:p-7">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
                How the work closes
              </p>
              <ol className="mt-5 grid gap-3">
                {closureConditions.map((condition, index) => (
                  <li
                    className="grid grid-cols-[2.25rem_1fr] gap-3 border-b border-border/70 pb-3 text-sm leading-6 last:border-b-0 last:pb-0"
                    key={condition}
                  >
                    <span className="font-mono text-[11px] text-foreground-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{condition}</span>
                  </li>
                ))}
              </ol>
            </article>
          </div>

          <div className="mt-5 grid gap-4 border border-dashed border-border bg-background p-5 sm:grid-cols-[auto_1fr] sm:items-start sm:p-6">
            <LockKeyhole className="h-5 w-5 text-foreground-muted" />
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground-muted">
                Scope boundary
              </p>
              <p className="mt-2 max-w-5xl text-sm leading-7 text-foreground-muted">
                {asString(collaboration.scopeBoundary)}
              </p>
            </div>
          </div>

          <div className="mt-5 border border-border bg-primary p-5 text-primary-foreground sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-foreground-muted">
                Operational instances
              </p>
              <span className="border border-primary-foreground/30 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em]">
                {collaborationRegistry.instances.length} public records
              </span>
            </div>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-primary-foreground-secondary">
              No public operational collaboration instances are currently
              recorded. The framework above describes how a future instance
              must be bounded; it is not evidence that a collaboration exists.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-primary px-5 py-14 text-primary-foreground sm:px-8 sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary-foreground-muted">
              Put work under pressure
            </p>
            <h2 className="mt-3 max-w-3xl font-serif text-4xl font-semibold sm:text-5xl">
              Use, criticism, comparison, failure, and repair—not
              prestige—create institutional value.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              className="inline-flex min-h-12 items-center bg-primary-foreground px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-primary"
              href="mailto:contact@boundaryfirstlabs.com?subject=Collaboration%20inquiry"
            >
              Start an inquiry <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <Link
              className="inline-flex min-h-12 items-center border border-primary-foreground/35 px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em]"
              href="/work"
            >
              Work & evidence
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
