import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GitBranch, ShieldCheck, Tags } from "lucide-react";
import { PageMasthead } from "@/components/page-masthead";
import { EvidenceVitalsBar } from "@/components/evidence-vitals-bar";
import { PhraseRegistry } from "@/components/language/PhraseRegistry";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { languageSystem } from "@/lib/language-system";
import { visualGrammar } from "@/lib/visual-grammar";
import {
  claimEvidenceVitals,
  EVIDENCE_SNAPSHOT_STAMP,
  type EvidenceVital,
} from "@/lib/evidence-vitals";

export const metadata: Metadata = {
  title: "Language Registry",
  description:
    "Browse Boundary First Labs governed public, research, campaign, and safeguard language with provenance, claim ceilings, channel rules, and replacement paths.",
  alternates: {
    canonical: "/language",
  },
};

export default function LanguageRegistryPage() {
  const publicCount = languageSystem.phrases.filter(
    (phrase) => phrase.useClass === "public",
  ).length;
  const researchCount = languageSystem.phrases.filter(
    (phrase) => phrase.useClass === "research",
  ).length;
  const controlledCount = languageSystem.phrases.filter(
    (phrase) =>
      phrase.useClass === "restricted" || phrase.useClass === "safeguard",
  ).length;
  const registryVitals: EvidenceVital[] = [
    {
      id: "public-phrases",
      label: "Public phrases",
      value: publicCount,
      detail: "Governed records currently assigned to public-use registers.",
      tone: "standard",
      mobilePriority: true,
    },
    {
      id: "research-hypotheses",
      label: "Research hypotheses",
      value: researchCount,
      detail: "Formal-research phrases that retain an explicit evidence gate.",
      tone: "bounded",
    },
    {
      id: "controlled-phrases",
      label: "Restricted + safeguards",
      value: controlledCount,
      detail: "Campaign restrictions and semantic firewalls kept visible.",
      tone: "bounded",
    },
    ...claimEvidenceVitals.filter((item) => item.id !== "source-stated"),
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <PageMasthead
        actions={
          <Link
            className="inline-flex min-h-12 items-center bg-primary px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-primary-foreground"
            href={visualGrammar.routes.gallery}
          >
            Open the visual grammar
            <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
        }
        deck="Memorable language should remain inspectable, bounded, and replaceable."
        description="The registry separates public commitments, research hypotheses, campaign variants, and semantic firewalls so the same phrase cannot silently acquire a stronger meaning as it travels."
        eyebrow="Governed reusable language"
        title="The language garden has roots, labels, and pruning paths."
      />

      <section className="border-b border-border bg-card/55 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] lg:items-end">
          <div>
            <Tags aria-hidden="true" className="h-7 w-7 text-muted-foreground" />
            <p className="mt-6 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Working canonical meaning · Version {languageSystem.version}
            </p>
            <blockquote className="mt-4 max-w-4xl font-serif text-4xl font-semibold leading-tight sm:text-6xl">
              {languageSystem.canonicalMeaning}
            </blockquote>
            <p className="mt-7 max-w-3xl text-base leading-8 text-foreground/70">
              {languageSystem.stewardshipPrinciple}
            </p>
          </div>

          <EvidenceVitalsBar
            description="Registry counts sit beside corpus and research figures so governance status cannot be mistaken for operating proof."
            eyebrow="Registry and evidence context"
            items={registryVitals}
            layout="stacked"
            stamp={EVIDENCE_SNAPSHOT_STAMP}
            title="Language-system vitals"
          />
        </div>
      </section>

      <PhraseRegistry
        phrases={languageSystem.phrases}
        registers={languageSystem.registers}
        sources={languageSystem.sources}
      />

      <section className="border-b border-border bg-card/55 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-end">
            <div>
              <ShieldCheck aria-hidden="true" className="h-7 w-7 text-muted-foreground" />
              <p className="mt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Editorial promotion gates
              </p>
              <h2 className="mt-3 max-w-xl font-serif text-4xl font-semibold sm:text-5xl">
                A phrase earns reach one gate at a time.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-foreground/70 lg:justify-self-end">
              Public memorability never bypasses research or promotion review.
              Each gate names the evidence and stewardship needed before a line
              can travel farther.
            </p>
          </div>

          <ol className="mt-9 grid gap-px overflow-hidden border border-border bg-border lg:grid-cols-3">
            {languageSystem.reviewGates.map((gate, index) => (
              <li className="bg-background p-6 sm:p-8" key={gate.id}>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {String(index + 1).padStart(2, "0")} · {gate.id}
                </span>
                <h3 className="mt-4 font-serif text-3xl font-semibold">
                  {gate.label}
                </h3>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-foreground/70">
                  {gate.checks.map((check) => (
                    <li className="border-l border-border pl-3" key={check}>
                      {check}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          <div className="mt-9 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {languageSystem.editorialChecklist.map((item) => (
              <article className="bg-background p-5 sm:p-6" key={item.id}>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {item.id}
                </p>
                <h3 className="mt-3 font-serif text-2xl font-semibold">
                  {item.label}
                </h3>
                <p className="mt-3 text-sm leading-7 text-foreground/68">
                  {item.requirement}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
          <div>
            <GitBranch aria-hidden="true" className="h-7 w-7 text-muted-foreground" />
            <p className="mt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Succession and retirement
            </p>
            <h2 className="mt-3 max-w-xl font-serif text-4xl font-semibold sm:text-5xl">
              Prune without rewriting the past.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-foreground/70">
              A corrected phrase receives a new record. The old wording remains
              discoverable with its prior status, rationale, and successor so
              editorial improvement does not become provenance loss.
            </p>
          </div>

          <div className="border border-border bg-card/55 p-6 sm:p-8">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Append-only replacement rules
            </p>
            <ol className="mt-5 space-y-4">
              {languageSystem.replacementPolicy.rules.map((rule, index) => (
                <li className="flex gap-4 text-sm leading-7" key={rule}>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{rule}</span>
                </li>
              ))}
            </ol>
            <Link
              className="mt-8 inline-flex min-h-12 items-center bg-primary px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-primary-foreground"
              href={languageSystem.routes.governanceNote}
            >
              Read the governance note
              <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-primary px-5 py-14 text-primary-foreground sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-end">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/60">
              Present claim ceiling
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold">
              Governance is active. Approval remains open.
            </h2>
          </div>
          <div>
            <p className="text-base leading-8 text-primary-foreground/76">
              {languageSystem.claimCeiling}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                className="inline-flex min-h-12 items-center bg-primary-foreground px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-primary"
                href={languageSystem.routes.manifesto}
              >
                Read the manifesto
              </Link>
              <Link
                className="inline-flex min-h-12 items-center border border-primary-foreground/40 px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em]"
                href={languageSystem.routes.researchProgram}
              >
                Inspect the research boundary
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
