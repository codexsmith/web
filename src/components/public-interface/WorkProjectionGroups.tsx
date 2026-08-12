import Link from "next/link";
import { ArrowRight, CircleDot } from "lucide-react";
import { asRecord, asRecordArray, asStringArray } from "@/lib/content";
import { firstText, humanizeStatus } from "@/lib/public-content";
import { domainHref } from "@/lib/site-navigation";
import workProjection from "@/content/public-projections/work.json";

const payload = asRecord(workProjection.payload);
const policy = asRecord(payload.projectionPolicy);
const groups = asRecordArray(payload.groups);

export function WorkProjectionGroups() {
  return (
    <section
      aria-labelledby="work-projections-title"
      className="scroll-mt-32 border-b border-border px-5 py-14 sm:px-8 sm:py-20"
      id="portfolio"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-end">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              One graph · multiple public projections
            </p>
            <h2
              className="mt-3 font-serif text-4xl font-semibold sm:text-5xl"
              id="work-projections-title"
            >
              See the kind of work before the full inventory.
            </h2>
          </div>
          <div>
            <p className="text-sm leading-7 text-foreground-muted">
              {firstText(policy.rule)}
            </p>
            <p className="mt-3 font-mono text-[9px] uppercase leading-5 tracking-[0.11em] text-foreground-muted">
              {firstText(policy.caseStudyStatus)}
            </p>
          </div>
        </div>

        <nav
          aria-label="Work projection groups"
          className="mt-8 flex gap-2 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-3 xl:grid-cols-4"
        >
          {groups.map((group, index) => (
            <a
              className="flex min-h-10 min-w-max items-center justify-center border border-border bg-card px-4 text-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em] hover:bg-muted md:min-w-0 md:whitespace-normal"
              href={`#work-${firstText(group.id)}`}
              key={firstText(group.id)}
            >
              {String(index + 1).padStart(2, "0")} · {firstText(group.label)}
            </a>
          ))}
        </nav>

        <div className="mt-4 divide-y divide-border border-y border-border">
          {groups.map((group, groupIndex) => {
            const entities = asRecordArray(group.entities);
            return (
              <details
                className="group scroll-mt-32 py-1"
                id={`work-${firstText(group.id)}`}
                key={firstText(group.id)}
                open={groupIndex === 0}
              >
                <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                  <div className="grid grid-cols-[2rem_1fr] items-center gap-4">
                    <span className="font-mono text-[9px] text-foreground-muted">
                      {String(groupIndex + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block font-serif text-2xl font-semibold sm:text-3xl">
                        {firstText(group.label)}
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-foreground-muted">
                        {firstText(group.description)}
                      </span>
                    </span>
                  </div>
                  <span className="flex shrink-0 items-center gap-3 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
                    {entities.length} records
                    <span
                      aria-hidden="true"
                      className="text-lg transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </span>
                </summary>

                <div className="grid gap-3 pb-8 sm:grid-cols-2 xl:grid-cols-3">
                  {entities.map((entity) => (
                    <Link
                      aria-label={`Open source record for ${firstText(entity.title)}`}
                      className="group/card flex min-h-64 flex-col border border-border bg-card p-5 transition-colors hover:bg-muted/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                      href={domainHref("products-testbeds")}
                      key={firstText(entity.id)}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
                          {asStringArray(entity.entityTypes)
                            .map((status) => humanizeStatus(status))
                            .join(" · ")}
                        </span>
                        <span className="border border-border bg-background px-2 py-1 font-mono text-[8px] font-semibold uppercase tracking-[0.1em]">
                          {humanizeStatus(entity.portfolioStanding)}
                        </span>
                      </div>
                      <h3 className="mt-5 font-serif text-2xl font-semibold">
                        {firstText(entity.title)}
                      </h3>
                      <p className="mt-3 text-xs leading-6 text-foreground/68">
                        {firstText(entity.description)}
                      </p>
                      <dl className="mt-auto grid grid-cols-2 gap-3 border-t border-border pt-4 text-[9px]">
                        <div>
                          <dt className="font-mono uppercase tracking-[0.1em] text-foreground-muted">
                            Lifecycle
                          </dt>
                          <dd className="mt-1 font-medium">
                            {asStringArray(entity.lifecycleStages)
                              .map((status) => humanizeStatus(status))
                              .join(" · ")}
                          </dd>
                        </div>
                        <div>
                          <dt className="font-mono uppercase tracking-[0.1em] text-foreground-muted">
                            Operating state
                          </dt>
                          <dd className="mt-1 font-medium">
                            {asStringArray(entity.operatingStates)
                              .map((status) => humanizeStatus(status))
                              .join(" · ")}
                          </dd>
                        </div>
                      </dl>
                      <span className="mt-4 inline-flex items-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted group-hover/card:text-foreground">
                        Open source domain
                        <ArrowRight
                          aria-hidden="true"
                          className="ml-2 h-3.5 w-3.5 transition-transform group-hover/card:translate-x-1"
                        />
                      </span>
                    </Link>
                  ))}
                </div>
              </details>
            );
          })}
        </div>

        <div className="mt-8 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
          <article className="bg-card p-6">
            <CircleDot aria-hidden="true" className="h-4 w-4 text-foreground-muted" />
            <h3 className="mt-4 font-serif text-2xl font-semibold">Case studies</h3>
            <p className="mt-3 text-sm leading-7 text-foreground/68">
              {firstText(policy.caseStudyStatus)} The empty state is deliberate: a case needs a bounded record, evidence, and an explicit claim ceiling.
            </p>
          </article>
          <article className="bg-primary p-6 text-primary-foreground">
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-primary-foreground/58">
              Ways to work with us
            </p>
            <h3 className="mt-4 font-serif text-2xl font-semibold">
              Begin with a bounded consequential question.
            </h3>
            <Link
              className="mt-6 inline-flex min-h-11 items-center bg-primary-foreground px-4 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-primary"
              href="/collaborate"
            >
              See collaboration paths
              <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
