import type { ElementType, ReactNode } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type DomainRecordSectionProps = {
  bodyClassName?: string;
  children: ReactNode;
  className?: string;
  count?: string | null;
  headingLevel?: 2 | 3;
  icon?: ElementType;
  id?: string;
  initiallyOpen?: boolean;
  title: string;
};

export function DomainRecordSection({
  bodyClassName,
  children,
  className,
  count,
  headingLevel = 2,
  icon: Icon,
  id,
  initiallyOpen = false,
  title,
}: DomainRecordSectionProps) {
  const Heading = headingLevel === 3 ? "h3" : "h2";

  return (
    <details
      className={cn(
        "group scroll-mt-40 rounded-sm border border-border bg-card shadow-sm",
        className,
      )}
      data-domain-section="true"
      id={id}
      open={initiallyOpen || undefined}
    >
      <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 transition-colors marker:content-none hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:px-7">
        <span className="flex min-w-0 items-center gap-3">
          {Icon ? (
            <Icon
              aria-hidden="true"
              className="h-5 w-5 shrink-0 text-foreground-muted"
            />
          ) : null}
          <Heading className="font-serif text-xl font-medium text-foreground">
            {title}
          </Heading>
        </span>
        <span className="flex shrink-0 items-center gap-3">
          {count ? (
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground-muted sm:text-[11px]">
              {count}
            </span>
          ) : null}
          <Plus
            aria-hidden="true"
            className="h-5 w-5 text-foreground-muted transition-transform group-open:rotate-45"
          />
        </span>
      </summary>
      <div
        className={cn(
          "border-t border-border/40 px-5 py-6 sm:px-7 sm:py-7",
          bodyClassName,
        )}
      >
        {children}
      </div>
    </details>
  );
}
