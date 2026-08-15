import Link from "next/link";
import {
  ArrowRight,
  Braces,
  CloudSun,
  FileCheck2,
  FlaskConical,
  Gamepad2,
  Landmark,
  PanelsTopLeft,
  ScanSearch,
  Trophy,
  Workflow,
} from "lucide-react";
import {
  getProductLandingNavigationForGroup,
  type ProductLandingNavigationGroup,
} from "@/lib/product-landing-navigation";

const details: Record<
  string,
  { description: string; eyebrow: string; icon: typeof ArrowRight }
> = {
  "boundary-first-ux": {
    eyebrow: "Interaction standard",
    description:
      "Design interfaces as bounded representations: preserve identity, consequence, path, and earned closure across views.",
    icon: PanelsTopLeft,
  },
  "software-before-code": {
    eyebrow: "Engineering method",
    description:
      "Determine the domain object, distinctions, invariants, admissible transformations, and closure conditions before choosing implementation machinery.",
    icon: Braces,
  },
  "closure-driven-software-development": {
    eyebrow: "Delivery practice",
    description:
      "Treat delivery as progressive closure: increase certainty, preserve consequential distinctions, and require a witness for completion.",
    icon: Workflow,
  },
  "boundary-first-weather": {
    eyebrow: "Research program",
    description:
      "Test whether boundary, regime, transition, and defect representations can improve forecast diagnosis without replacing numerical weather prediction.",
    icon: CloudSun,
  },
  "constitutional-law-and-jurisprudence": {
    eyebrow: "Legal research",
    description:
      "Trace authority through representation, judgment, consequence, contest, responsibility, and repair while separating current doctrine from proposals.",
    icon: Landmark,
  },
  schemathematics: {
    eyebrow: "Formal research",
    description:
      "Study schemas as consequential carriers of objects, transformations, invariants, admissibility, provenance, defects, and repair.",
    icon: FlaskConical,
  },
  "boundary-first-chess": {
    eyebrow: "Practitioner doctrine",
    description:
      "Represent chess through constrained possibility, reachable states, pressure, boundary, closure, defect, repair, and decision geometry.",
    icon: Trophy,
  },
  "boundary-first-soccer": {
    eyebrow: "Practitioner doctrine",
    description:
      "Model soccer as construction and transport of temporary closures through an adversarial field, with promotion, pressure, and repair.",
    icon: Gamepad2,
  },
  "corpus-forge": {
    eyebrow: "Research operations",
    description:
      "Turn unstructured work into a governed knowledge system that preserves provenance, maturity, dependency, replacement history, and repair.",
    icon: FileCheck2,
  },
  "agency-representation-audit": {
    eyebrow: "Professional service",
    description:
      "Inspect who can act, who authorized the action, what remains contestable, who bears consequence, and who owns repair.",
    icon: ScanSearch,
  },
};

const headings: Record<ProductLandingNavigationGroup, string> = {
  software: "Public software methods and standards",
  work: "Current applied programs and practitioner work",
  research: "Active research programs",
};

export function ProductLandingDirectory({
  group,
  variant = "grid",
}: {
  group: ProductLandingNavigationGroup;
  variant?: "grid" | "rail";
}) {
  const items = getProductLandingNavigationForGroup(group);

  return (
    <section className="border-b border-border bg-card/45 px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              Boundary First public programs
            </p>
            <h2 className="mt-3 max-w-3xl font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              {headings[group]}
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-foreground-muted">
            Governed public projections keep maturity and claim boundaries attached. Private research holds and collaboration bridges are intentionally absent.
          </p>
        </div>

        {variant === "rail" ? (
          <div className="mt-8 border-y border-border">
            {items.map((item, index) => {
              const detail = details[item.id];
              const Icon = detail?.icon ?? ArrowRight;
              return (
                <Link
                  className="group grid gap-4 border-b border-border py-5 last:border-b-0 sm:grid-cols-[2.5rem_3rem_13rem_minmax(0,1fr)_auto] sm:items-center"
                  href={item.href}
                  key={item.id}
                >
                  <span className="font-mono text-[9px] text-foreground-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="grid h-10 w-10 place-items-center border border-border bg-background">
                    <Icon aria-hidden="true" className="h-4 w-4 text-foreground-muted" />
                  </span>
                  <div>
                    <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.11em] text-foreground-muted">
                      {detail?.eyebrow}
                    </span>
                    <h3 className="mt-1 font-serif text-xl font-semibold">{item.label}</h3>
                  </div>
                  <p className="text-sm leading-6 text-foreground-muted">{detail?.description}</p>
                  <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="mt-8 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => {
              const detail = details[item.id];
              const Icon = detail?.icon ?? ArrowRight;
              return (
                <Link
                  className="group flex min-h-64 flex-col bg-background p-6 transition-colors hover:bg-card"
                  href={item.href}
                  key={item.id}
                >
                  <div className="flex items-center justify-between gap-4">
                    <Icon aria-hidden="true" className="h-5 w-5 text-foreground-muted" />
                    <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
                      {detail?.eyebrow}
                    </span>
                  </div>
                  <h3 className="mt-6 font-serif text-2xl font-semibold leading-8">{item.label}</h3>
                  <p className="mt-3 text-sm leading-7 text-foreground-muted">{detail?.description}</p>
                  <span className="mt-auto inline-flex items-center pt-6 font-mono text-[9px] font-semibold uppercase tracking-[0.12em]">
                    Open program
                    <ArrowRight aria-hidden="true" className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
