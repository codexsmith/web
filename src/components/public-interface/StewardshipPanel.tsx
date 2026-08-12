import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { asStringArray } from "@/lib/content";
import { firstText } from "@/lib/public-content";

export function StewardshipPanel({
  stewardship,
  inverse = false,
}: {
  stewardship: Record<string, unknown>;
  inverse?: boolean;
}) {
  const principles = asStringArray(stewardship.principle);
  const headline = firstText(
    stewardship.headline,
    "Stewardship is how an institution remains answerable over time.",
  );

  return (
    <section
      aria-labelledby="stewardship-panel-title"
      className={`border p-6 sm:p-8 ${
        inverse
          ? "border-primary-foreground/20 bg-primary text-primary-foreground"
          : "border-border bg-card"
      }`}
    >
      <div className="flex items-start justify-between gap-5">
        <div>
          <p
            className={`font-mono text-[9px] font-semibold uppercase tracking-[0.18em] ${
              inverse
                ? "text-primary-foreground/58"
                : "text-muted-foreground"
            }`}
          >
            {firstText(
              stewardship.classification,
              "Institutional quality and mission",
            )}
          </p>
          <h2
            className="mt-3 max-w-3xl font-serif text-3xl font-semibold leading-tight sm:text-4xl"
            id="stewardship-panel-title"
          >
            {headline}
          </h2>
        </div>
        <ShieldCheck aria-hidden="true" className="h-6 w-6 shrink-0" />
      </div>

      <ul className="mt-7 grid gap-3 sm:grid-cols-2">
        {principles.slice(0, 4).map((principle) => (
          <li
            className={`border-l-2 pl-4 text-sm leading-7 ${
              inverse
                ? "border-accent text-primary-foreground/74"
                : "border-accent text-foreground/70"
            }`}
            key={principle}
          >
            {principle}
          </li>
        ))}
      </ul>

      <Link
        className={`mt-7 inline-flex min-h-11 items-center font-mono text-[10px] font-semibold uppercase tracking-[0.13em] underline-offset-4 hover:underline ${
          inverse ? "text-primary-foreground" : "text-foreground"
        }`}
        href="/governance#stewardship"
      >
        Inspect the institutional commitment
        <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
      </Link>
    </section>
  );
}
