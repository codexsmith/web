import Link from "next/link";
import { ArrowRight, CircleDot, Layers3, Wrench } from "lucide-react";
import {
  phase12Launch,
  type LaunchAction,
} from "@/lib/phase12-launch";

function ActionLink({
  action,
  emphasis = false,
}: {
  action: LaunchAction;
  emphasis?: boolean;
}) {
  const className = emphasis
    ? "inline-flex min-h-11 items-center bg-primary px-4 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-transform hover:-translate-y-0.5"
    : "inline-flex min-h-11 items-center border border-border bg-background px-4 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors hover:bg-card";
  const contents = (
    <>
      {action.label}
      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
    </>
  );

  return action.href.startsWith("mailto:") ? (
    <a className={className} href={action.href}>
      {contents}
    </a>
  ) : (
    <Link className={className} href={action.href}>
      {contents}
    </Link>
  );
}

export function FeaturedLaunchWork() {
  const { systemsAudit, boundaryFirstChess, featuredWork } = phase12Launch;

  return (
    <section
      aria-labelledby="featured-work-title"
      className="scroll-mt-24 border-b border-border bg-card/40 px-5 py-14 sm:px-8 sm:py-20"
      id="featured-work"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(20rem,0.65fr)] lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Software · analysis · products
            </p>
            <h2
              className="mt-3 max-w-4xl font-serif text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl"
              id="featured-work-title"
            >
              Available now—and building in public.
            </h2>
          </div>
          <p className="text-base leading-8 text-foreground/70">
            Current offers sit beside developing systems with their maturity
            left visible. Availability is an operating promise; prominence is
            not evidence of universal proof.
          </p>
        </div>

        <div className="mt-9 grid gap-px overflow-hidden border border-border bg-border lg:grid-cols-2">
          <article className="flex min-h-[30rem] flex-col bg-background p-6 sm:p-8 lg:p-10">
            <div className="flex items-start justify-between gap-5">
              <Wrench className="h-7 w-7 text-muted-foreground" aria-hidden="true" />
              <span className="border border-foreground/20 bg-card px-3 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.14em]">
                {systemsAudit.status}
              </span>
            </div>
            <p className="mt-8 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {systemsAudit.category}
            </p>
            <h3 className="mt-3 font-serif text-4xl font-semibold">
              {systemsAudit.title}
            </h3>
            <p className="mt-5 max-w-2xl text-base leading-8 text-foreground/72">
              {systemsAudit.summary}
            </p>
            <p className="mt-4 border-l-2 border-accent pl-4 text-sm leading-7 text-foreground/66">
              {systemsAudit.availabilityNote}
            </p>
            <div className="mt-auto flex flex-wrap gap-3 pt-8">
              <ActionLink action={systemsAudit.primaryAction} emphasis />
              <ActionLink action={systemsAudit.secondaryAction} />
            </div>
          </article>

          <article className="flex min-h-[30rem] flex-col bg-primary p-6 text-primary-foreground sm:p-8 lg:p-10">
            <div className="flex items-start justify-between gap-5">
              <Layers3 className="h-7 w-7 text-primary-foreground/70" aria-hidden="true" />
              <span className="border border-primary-foreground/30 bg-primary-foreground/[0.08] px-3 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.14em]">
                {boundaryFirstChess.status}
              </span>
            </div>
            <p className="mt-8 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-primary-foreground/58">
              {boundaryFirstChess.category}
            </p>
            <h3 className="mt-3 font-serif text-4xl font-semibold">
              {boundaryFirstChess.title}
            </h3>
            <p className="mt-5 max-w-2xl text-base leading-8 text-primary-foreground/76">
              {boundaryFirstChess.summary}
            </p>
            <ul className="mt-5 grid gap-2 text-sm leading-6 text-primary-foreground/72 sm:grid-cols-2">
              {boundaryFirstChess.currentForms.map((form) => (
                <li className="flex gap-3" key={form}>
                  <CircleDot className="mt-1 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {form}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap gap-3 pt-8">
              <a
                className="inline-flex min-h-11 items-center bg-primary-foreground px-4 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-primary transition-transform hover:-translate-y-0.5"
                href={boundaryFirstChess.primaryAction.href}
              >
                {boundaryFirstChess.primaryAction.label}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
              <Link
                className="inline-flex min-h-11 items-center border border-primary-foreground/35 px-4 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors hover:bg-primary-foreground/10"
                href={boundaryFirstChess.secondaryAction.href}
              >
                {boundaryFirstChess.secondaryAction.label}
              </Link>
            </div>
          </article>
        </div>

        <div className="grid gap-px border-x border-b border-border bg-border sm:grid-cols-2 xl:grid-cols-4">
          {featuredWork.map((item) => (
            <article className="flex min-h-72 flex-col bg-background p-5 sm:p-6" key={item.id}>
              <p className="font-mono text-[9px] font-semibold uppercase leading-5 tracking-[0.14em] text-muted-foreground">
                {item.category}
              </p>
              <h3 className="mt-3 font-serif text-2xl font-semibold">
                {item.title}
              </h3>
              <p className="mt-2 font-mono text-[9px] font-semibold uppercase leading-5 tracking-[0.12em] text-foreground/62">
                {item.status}
              </p>
              <p className="mt-4 text-sm leading-7 text-foreground/68">
                {item.summary}
              </p>
              <Link
                className="mt-auto inline-flex min-h-10 items-center pt-6 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] hover:underline"
                href={item.action.href}
              >
                {item.action.label}
                <ArrowRight className="ml-2 h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
