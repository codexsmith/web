import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  FlaskConical,
  Map,
  Network,
  ShieldCheck,
} from "lucide-react";

const steps = [
  {
    id: "question",
    label: "Frame the question",
    body: "Start with the behavior that needs explanation: a boundary, representation, persistence condition, defect, witness, or repair problem.",
    href: "#research-programs",
    action: "See public programs",
    icon: FlaskConical,
  },
  {
    id: "domain",
    label: "Bound the domain",
    body: "Inspect the governed domain architecture before treating a cross-domain resemblance as a shared mechanism.",
    href: "/domains",
    action: "Browse domains",
    icon: BookOpen,
  },
  {
    id: "evidence",
    label: "Test the claim",
    body: "Keep operating evidence, independent verification, counterexamples, claim ceilings, and open promotion gates attached to the proposition.",
    href: "/evidence",
    action: "Inspect evidence",
    icon: ShieldCheck,
  },
  {
    id: "relations",
    label: "Inspect the relation",
    body: "Use recorded relation views when the important question is how programs, methods, artifacts, or domains depend on one another.",
    href: "/relations",
    action: "Inspect relations",
    icon: Network,
  },
  {
    id: "atlas",
    label: "Open the spatial view",
    body: "Use the Atlas when topology, neighborhood, clustering, or traversal adds information that a readable list no longer carries well.",
    href: "/map?mode=atlas&view=domains",
    action: "Open Atlas",
    icon: Map,
  },
] as const;

export function ResearchJourneyRail() {
  return (
    <section className="border-b border-border bg-card/45 px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[minmax(14rem,0.48fr)_minmax(0,1.52fr)]">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              Research operating sequence
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
              Use the deeper tool only when the question needs it.
            </h2>
            <p className="mt-5 text-sm leading-7 text-foreground-muted">
              Domains, relations, the Atlas, and formal machinery are different instruments. They should not all be presented as equal first steps.
            </p>
          </div>

          <ol className="border-l border-border">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <li className="relative border-b border-border py-6 pl-7 first:pt-0 last:border-b-0 last:pb-0 sm:pl-10" key={step.id}>
                  <span className="absolute -left-[0.45rem] top-7 grid h-3.5 w-3.5 place-items-center bg-background first:top-1">
                    <span className="h-2 w-2 bg-foreground" />
                  </span>
                  <div className="grid gap-5 sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:items-start">
                    <span className="grid h-11 w-11 place-items-center border border-border bg-background">
                      <Icon aria-hidden="true" className="h-5 w-5 text-foreground-muted" />
                    </span>
                    <div>
                      <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                        Step {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-2 font-serif text-2xl font-semibold">{step.label}</h3>
                      <p className="mt-2 max-w-2xl text-sm leading-7 text-foreground-muted">{step.body}</p>
                    </div>
                    <Link className="inline-flex min-h-10 items-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em] hover:underline" href={step.href}>
                      {step.action}
                      <ArrowRight aria-hidden="true" className="ml-2 h-3.5 w-3.5" />
                    </Link>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
