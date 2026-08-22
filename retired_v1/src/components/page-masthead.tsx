import type { ReactNode } from "react";

type PageMastheadProps = {
  actions?: ReactNode;
  children?: ReactNode;
  deck?: ReactNode;
  description?: ReactNode;
  eyebrow?: string;
  inverse?: boolean;
  title: string;
  utility?: ReactNode;
};

export function PageMasthead({
  actions,
  children,
  deck,
  description,
  eyebrow,
  inverse = false,
  title,
  utility,
}: PageMastheadProps) {
  const hasUtilityLine = Boolean(eyebrow || utility);

  return (
    <section
      className={`border-b px-5 py-9 sm:px-8 sm:py-12 ${
        inverse
          ? "border-primary-foreground/15 bg-primary text-primary-foreground"
          : "border-border bg-background"
      }`}
    >
      <div className="mx-auto max-w-7xl">
        {hasUtilityLine ? (
          <div className="flex flex-wrap items-center justify-between gap-4">
            {eyebrow ? (
              <p
                className={`font-mono text-[10px] font-semibold uppercase tracking-[0.2em] ${
                  inverse
                    ? "text-primary-foreground-muted"
                    : "text-foreground-muted"
                }`}
              >
                {eyebrow}
              </p>
            ) : null}
            {utility ? <div className={eyebrow ? "" : "ml-auto"}>{utility}</div> : null}
          </div>
        ) : null}

        <div
          className={`${
            hasUtilityLine ? "mt-5 " : ""
          }grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)] lg:items-end`}
        >
          <div>
            <h1 className="font-serif text-4xl font-semibold leading-none tracking-tight sm:text-5xl">
              {title}
            </h1>
            {deck ? (
              <p
                className={`mt-3 max-w-3xl font-serif text-xl font-semibold leading-snug sm:text-2xl ${
                  inverse ? "text-primary-foreground-secondary" : "text-foreground-muted"
                }`}
              >
                {deck}
              </p>
            ) : null}
          </div>

          {description || actions ? (
            <div>
              {description ? (
                <p
                  className={`max-w-3xl text-sm font-medium leading-7 sm:text-base ${
                    inverse
                      ? "text-primary-foreground-secondary"
                      : "text-foreground-muted"
                  }`}
                >
                  {description}
                </p>
              ) : null}
              {actions ? (
                <div className="mt-5 flex flex-wrap gap-3">{actions}</div>
              ) : null}
            </div>
          ) : null}
        </div>

        {children ? <div className="mt-7">{children}</div> : null}
      </div>
    </section>
  );
}
