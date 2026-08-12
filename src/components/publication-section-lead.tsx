import type { LucideIcon } from "lucide-react";

type PublicationSectionLeadProps = {
  description: string;
  eyebrow: string;
  icon?: LucideIcon;
  inverse?: boolean;
  title: string;
};

export function PublicationSectionLead({
  description,
  eyebrow,
  icon: Icon,
  inverse = false,
  title,
}: PublicationSectionLeadProps) {
  return (
    <header
      className={`grid gap-4 border-b pb-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(20rem,1.2fr)] lg:items-end ${
        inverse ? "border-primary-foreground/20" : "border-border"
      }`}
    >
      <div>
        <div
          className={`flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] ${
            inverse ? "text-primary-foreground-muted" : "text-foreground-muted"
          }`}
        >
          {Icon ? <Icon aria-hidden="true" className="h-4 w-4" /> : null}
          <span>{eyebrow}</span>
        </div>
        <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">
          {title}
        </h2>
      </div>
      <p
        className={`max-w-3xl text-sm leading-7 sm:text-base ${
          inverse ? "text-primary-foreground/72" : "text-foreground-muted"
        }`}
      >
        {description}
      </p>
    </header>
  );
}
