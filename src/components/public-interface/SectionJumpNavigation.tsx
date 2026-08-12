import Link from "next/link";

export type SectionJumpItem = {
  label: string;
  href: `#${string}`;
};

export function SectionJumpNavigation({
  items,
  label = "On this page",
}: {
  items: readonly SectionJumpItem[];
  label?: string;
}) {
  return (
    <nav
      aria-label={label}
      className="sticky top-16 z-30 border-y border-border bg-background/95 shadow-sm backdrop-blur-xl sm:top-20"
    >
      <div className="mx-auto flex min-h-12 max-w-7xl snap-x items-center gap-3 overflow-x-auto px-5 py-1.5 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <span className="shrink-0 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </span>
        <span aria-hidden="true" className="h-4 w-px shrink-0 bg-border" />
        {items.map((item) => (
          <Link
            className="inline-flex min-h-9 shrink-0 snap-start items-center rounded-sm border border-border bg-background px-3 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground/68 transition-colors hover:bg-primary hover:text-primary-foreground"
            href={item.href}
            key={item.href}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
