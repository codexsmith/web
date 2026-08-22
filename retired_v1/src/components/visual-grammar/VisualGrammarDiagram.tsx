import {
  ArrowDown,
  ArrowRight,
  Check,
  RotateCcw,
  ShieldAlert,
} from "lucide-react";
import type {
  VisualGrammarDiagram as VisualGrammarDiagramData,
  VisualGrammarRole,
} from "@/lib/visual-grammar";

type VisualGrammarDiagramProps = {
  diagram: VisualGrammarDiagramData;
};

function nodeClasses(role: VisualGrammarRole): string {
  if (role === "authority") {
    return "border-primary bg-primary text-primary-foreground";
  }
  if (role === "class") {
    return "border-accent bg-accent text-accent-foreground";
  }
  if (role === "consequence") {
    return "border-foreground bg-foreground text-background";
  }
  return "border-border bg-background text-foreground";
}

function roleLabel(role: VisualGrammarRole): string {
  return role.replace("-", " ");
}

function StepSequence({ steps }: { steps: string[] }) {
  return (
    <ol className="mt-4 flex flex-wrap items-center gap-2">
      {steps.map((step, index) => (
        <li className="flex items-center gap-2" key={step}>
          <span className="border border-current/25 px-3 py-2 text-xs font-semibold leading-5">
            {step}
          </span>
          {index < steps.length - 1 ? (
            <ArrowRight aria-hidden="true" className="h-4 w-4 opacity-50" />
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export function VisualGrammarDiagram({
  diagram,
}: VisualGrammarDiagramProps) {
  const titleId = `${diagram.id}-title`;
  const summaryId = `${diagram.id}-summary`;
  const minimumWidth =
    diagram.path.length > 5 ? "lg:min-w-[76rem]" : "lg:min-w-[58rem]";

  return (
    <figure
      aria-describedby={summaryId}
      aria-labelledby={titleId}
      className="scroll-mt-24 border-b border-border px-5 py-14 sm:px-8 sm:py-20"
      id={diagram.id}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-7 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-end">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              Diagram {diagram.number} / {diagram.eyebrow}
            </p>
            <h2
              className="mt-3 max-w-2xl font-serif text-4xl font-semibold leading-tight sm:text-5xl"
              id={titleId}
            >
              {diagram.title}
            </h2>
            <p className="mt-5 max-w-2xl font-serif text-xl font-semibold leading-snug text-foreground-muted sm:text-2xl">
              {diagram.proposition}
            </p>
          </div>
          <p className="max-w-2xl text-base leading-8 text-foreground-muted lg:justify-self-end">
            {diagram.description}
          </p>
        </div>

        <div className="mt-10 overflow-x-auto pb-3">
          <ol
            aria-label={`${diagram.title} primary path`}
            className={`flex flex-col gap-0 lg:flex-row lg:items-stretch ${minimumWidth}`}
          >
            {diagram.path.map((node, index) => (
              <li
                className="flex flex-col items-center lg:min-w-0 lg:flex-1 lg:flex-row"
                key={node.id}
              >
                <article
                  className={`flex min-h-44 w-full flex-1 flex-col border p-5 ${nodeClasses(node.role)}`}
                >
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] opacity-60">
                    {String(index + 1).padStart(2, "0")} / {roleLabel(node.role)}
                  </p>
                  <h3 className="mt-4 font-serif text-2xl font-semibold">
                    {node.label}
                  </h3>
                  <p className="mt-3 text-sm leading-6 opacity-75">
                    {node.description}
                  </p>
                </article>
                {index < diagram.path.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 shrink-0 items-center justify-center text-foreground-muted lg:h-full lg:w-10"
                  >
                    <ArrowDown className="h-5 w-5 lg:hidden" />
                    <ArrowRight className="hidden h-5 w-5 lg:block" />
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-7 grid overflow-hidden border border-border bg-border lg:grid-cols-[0.86fr_0.92fr_1.22fr]">
          <section className="bg-accent p-6 text-accent-foreground sm:p-8">
            <ShieldAlert aria-hidden="true" className="h-6 w-6" />
            <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] opacity-65">
              Governing gate
            </p>
            <h3 className="mt-3 font-serif text-3xl font-semibold">
              {diagram.feedback.gateLabel}
            </h3>
            <p className="mt-4 text-sm font-medium leading-7 opacity-80">
              {diagram.feedback.question}
            </p>
          </section>

          <section className="bg-background p-6 sm:p-8">
            <Check aria-hidden="true" className="h-6 w-6 text-foreground-muted" />
            <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground-muted">
              {diagram.feedback.preserved.label}
            </p>
            <StepSequence steps={diagram.feedback.preserved.steps} />
          </section>

          <section className="bg-primary p-6 text-primary-foreground sm:p-8">
            <RotateCcw aria-hidden="true" className="h-6 w-6" />
            <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-primary-foreground-muted">
              {diagram.feedback.contested.label}
            </p>
            <StepSequence steps={diagram.feedback.contested.steps} />
          </section>
        </div>

        <div className="flex flex-col gap-4 border-x border-b border-border bg-card/55 p-5 sm:flex-row sm:items-center sm:p-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border">
            <RotateCcw aria-hidden="true" className="h-4 w-4" />
          </div>
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground-muted">
              {diagram.feedback.returnLabel} / {roleLabel(diagram.feedback.returnToRole)}
            </p>
            <p className="mt-1 max-w-4xl text-sm leading-7 text-foreground-muted">
              {diagram.feedback.returnDescription}
            </p>
          </div>
        </div>

        <figcaption
          className="mt-6 max-w-5xl border-l border-border pl-4 text-sm leading-7 text-foreground-muted"
          id={summaryId}
        >
          <span className="font-semibold text-foreground">Text equivalent.</span>{" "}
          {diagram.accessibleSummary}
        </figcaption>
      </div>
    </figure>
  );
}
