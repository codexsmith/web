import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Handshake,
  Mail,
  ShieldCheck,
} from "lucide-react";

export function EngagementHeroes({
  context = "work",
}: {
  context?: "work" | "about";
}) {
  const heading =
    context === "work"
      ? "Two ways to put the work under pressure."
      : "Relationships are part of the institutional boundary.";
  const intro =
    context === "work"
      ? "Collaboration and enterprise practice are not separate bodies of doctrine. They are bounded ways for the research to meet shared work, operational constraint, evidence, and repair."
      : "The laboratory meets partners and organizations through declared roles, bounded authority, visible evidence, and an explicit path to closure.";

  return (
    <section
      className="scroll-mt-20 border-y border-border px-5 py-14 sm:scroll-mt-24 sm:px-8 sm:py-20"
      id="engage"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {context === "work" ? "Ways to engage" : "Institutional relationships"}
          </p>
          <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
            {heading}
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-foreground/70">
            {intro}
          </p>
        </div>

        <div className="mt-10 grid overflow-hidden border border-border bg-border lg:grid-cols-2">
          <article className="flex min-h-[30rem] flex-col justify-between bg-primary p-6 text-primary-foreground sm:p-9 lg:p-12">
            <div>
              <div className="flex items-center justify-between gap-4">
                <Handshake className="h-8 w-8" aria-hidden="true" />
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary-foreground/55">
                  Shared work · bounded relation
                </span>
              </div>
              <p className="mt-12 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-foreground/55">
                Collaborate
              </p>
              <h3 className="mt-3 max-w-xl font-serif text-4xl font-semibold sm:text-5xl">
                Boundaries make shared work coherent.
              </h3>
              <p className="mt-6 max-w-xl text-base leading-8 text-primary-foreground/72">
                Enter through declared roles, bounded authority, preserved
                disagreement, fair attribution, evidence, stewardship, and a
                responsible end condition.
              </p>
              <ul className="mt-8 grid gap-2 text-sm sm:grid-cols-3">
                {["Declared role", "Visible contribution", "Earned closure"].map(
                  (item) => (
                    <li
                      className="border border-primary-foreground/25 bg-primary-foreground/[0.06] p-3"
                      key={item}
                    >
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                className="inline-flex min-h-12 items-center bg-primary-foreground px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-primary"
                href="/collaborate"
              >
                Open collaboration framework
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <a
                className="inline-flex min-h-12 items-center border border-primary-foreground/35 px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em]"
                href="mailto:contact@boundaryfirst.com?subject=Bounded%20collaboration%20inquiry"
              >
                <Mail className="mr-2 h-4 w-4" /> Start a conversation
              </a>
            </div>
          </article>

          <article className="flex min-h-[30rem] flex-col justify-between bg-card p-6 sm:p-9 lg:p-12">
            <div>
              <div className="flex items-center justify-between gap-4">
                <Building2 className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  Architecture · risk · delivery
                </span>
              </div>
              <p className="mt-12 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Enterprise practice
              </p>
              <h3 className="mt-3 max-w-xl font-serif text-4xl font-semibold sm:text-5xl">
                Consequential systems need visible failure boundaries.
              </h3>
              <p className="mt-6 max-w-xl text-base leading-8 text-foreground/70">
                Apply Boundary First to one bounded architecture, workflow, or
                delivery problem where hidden coupling, false closure, or
                displaced repair creates material risk.
              </p>
              <ul className="mt-8 grid gap-2 text-sm sm:grid-cols-3">
                {["Risk boundary", "Repair ownership", "Operational evidence"].map(
                  (item) => (
                    <li className="border border-border bg-background p-3" key={item}>
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                className="inline-flex min-h-12 items-center bg-primary px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-foreground"
                href="/business"
              >
                View enterprise practice
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <a
                className="inline-flex min-h-12 items-center border border-border bg-background px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em]"
                href="mailto:contact@boundaryfirst.com?subject=Enterprise%20practice%20inquiry"
              >
                <ShieldCheck className="mr-2 h-4 w-4" /> Discuss a bounded need
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
