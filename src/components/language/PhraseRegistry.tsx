"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import type {
  LanguagePhrase,
  LanguageRegisterId,
  LanguageSystem,
} from "@/lib/language-system";

type PhraseRegistryProps = {
  phrases: LanguagePhrase[];
  registers: LanguageSystem["registers"];
  sources: LanguageSystem["sources"];
};

const statusLabels: Record<LanguagePhrase["status"], string> = {
  "project-language-candidate": "Candidate",
  "recommended-default-pending-founder-review": "Recommended · review pending",
  "research-hypothesis": "Research hypothesis",
  "campaign-variant-pending-founder-decision": "Restricted campaign variant",
  "semantic-firewall": "Semantic firewall",
  "approved-canonical": "Approved canonical",
  retired: "Retired",
};

const useClassLabels: Record<LanguagePhrase["useClass"], string> = {
  public: "Public use",
  research: "Research use",
  restricted: "Restricted use",
  safeguard: "Safeguard",
};

export function PhraseRegistry({
  phrases,
  registers,
  sources,
}: PhraseRegistryProps) {
  const [activeRegister, setActiveRegister] = useState<
    "all" | LanguageRegisterId
  >("all");
  const [query, setQuery] = useState("");

  const sourceById = useMemo(
    () => new Map(sources.map((source) => [source.id, source])),
    [sources],
  );
  const registerById = useMemo(
    () => new Map(registers.map((register) => [register.id, register])),
    [registers],
  );
  const filteredPhrases = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return phrases.filter((phrase) => {
      if (activeRegister !== "all" && phrase.registerId !== activeRegister) {
        return false;
      }
      if (!normalizedQuery) return true;
      const haystack = [
        phrase.phrase,
        phrase.meaning,
        phrase.claimCeiling,
        ...phrase.knownAmbiguities,
        ...phrase.allowedChannels,
      ]
        .join(" ")
        .toLocaleLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [activeRegister, phrases, query]);

  return (
    <section
      aria-labelledby="phrase-registry-title"
      className="border-b border-border px-5 py-14 sm:px-8 sm:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-end">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              Public phrase registry
            </p>
            <h2
              className="mt-3 max-w-2xl font-serif text-4xl font-semibold sm:text-5xl"
              id="phrase-registry-title"
            >
              Browse the language with its limits attached.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-foreground-muted lg:justify-self-end">
            A phrase is not cleared merely because it is memorable. Filter by
            register, then open any record to inspect the source, channel,
            ambiguity, claim ceiling, and replacement trigger that travel with
            it.
          </p>
        </div>

        <div className="mt-9 border border-border bg-card/55 p-4 sm:p-5">
          <div
            aria-label="Filter by language register"
            className="flex flex-wrap gap-2"
            role="group"
          >
            <button
              aria-pressed={activeRegister === "all"}
              className={`min-h-11 border px-4 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                activeRegister === "all"
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background hover:bg-muted"
              }`}
              onClick={() => setActiveRegister("all")}
              type="button"
            >
              All registers
            </button>
            {registers.map((register) => (
              <button
                aria-pressed={activeRegister === register.id}
                className={`min-h-11 border px-4 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                  activeRegister === register.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background hover:bg-muted"
                }`}
                key={register.id}
                onClick={() => setActiveRegister(register.id)}
                type="button"
              >
                {register.label}
              </button>
            ))}
          </div>

          <label className="mt-4 flex min-h-12 items-center gap-3 border border-border bg-background px-4">
            <Search aria-hidden="true" className="h-4 w-4 text-foreground-muted" />
            <span className="sr-only">Search governed phrases</span>
            <input
              className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-foreground-muted"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search phrase, meaning, ambiguity, or channel"
              type="search"
              value={query}
            />
          </label>
        </div>

        <p
          aria-live="polite"
          className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground-muted"
        >
          Showing {filteredPhrases.length} of {phrases.length} governed phrases
        </p>

        {filteredPhrases.length > 0 ? (
          <div className="mt-5 grid gap-px overflow-hidden border border-border bg-border lg:grid-cols-2">
            {filteredPhrases.map((phrase) => {
              const register = registerById.get(phrase.registerId);
              const phraseSources = phrase.sourceIds
                .map((sourceId) => sourceById.get(sourceId))
                .filter((source) => source !== undefined);

              return (
                <article
                  className="flex min-h-full flex-col bg-background p-6 sm:p-8"
                  key={phrase.id}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="border border-border bg-card px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.13em]">
                      {register?.label}
                    </span>
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.13em] text-foreground-muted">
                      {useClassLabels[phrase.useClass]}
                    </span>
                    {phrase.priority && (
                      <span className="ml-auto font-mono text-[10px] font-semibold uppercase tracking-[0.13em] text-foreground-muted">
                        {phrase.priority}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-6 font-serif text-3xl font-semibold leading-tight sm:text-4xl">
                    {phrase.phrase}
                  </h3>
                  <p className="mt-5 text-sm leading-7 text-foreground-muted">
                    {phrase.meaning}
                  </p>
                  <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                    {phrase.id} · {statusLabels[phrase.status]}
                  </p>

                  <details className="mt-6 border-t border-border pt-5">
                    <summary className="min-h-11 cursor-pointer font-mono text-[10px] font-semibold uppercase tracking-[0.15em] underline decoration-border underline-offset-8">
                      Open governance record
                    </summary>
                    <div className="mt-5 space-y-6 text-sm leading-7">
                      <div>
                        <h4 className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                          Claim ceiling
                        </h4>
                        <p className="mt-2 text-foreground-muted">
                          {phrase.claimCeiling}
                        </p>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <h4 className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                            Permitted channels
                          </h4>
                          <ul className="mt-2 space-y-1 text-foreground-muted">
                            {phrase.allowedChannels.map((channel) => (
                              <li key={channel}>{channel}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                            Restricted contexts
                          </h4>
                          <ul className="mt-2 space-y-1 text-foreground-muted">
                            {phrase.restrictedContexts.map((context) => (
                              <li key={context}>{context}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                          Known ambiguity
                        </h4>
                        <ul className="mt-2 space-y-2 text-foreground-muted">
                          {phrase.knownAmbiguities.map((ambiguity) => (
                            <li key={ambiguity}>— {ambiguity}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                          Provenance
                        </h4>
                        <ul className="mt-2 space-y-2 text-foreground-muted">
                          {phraseSources.map((source) => (
                            <li key={source.id}>
                              {source.publicRoute ? (
                                <Link
                                  className="underline decoration-border underline-offset-4"
                                  href={source.publicRoute}
                                >
                                  {source.label}
                                </Link>
                              ) : (
                                source.label
                              )}
                              <span className="text-foreground-muted">
                                {" "}· {source.preservationStatus}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                          Replacement trigger
                        </h4>
                        <p className="mt-2 text-foreground-muted">
                          {phrase.replacement.trigger}
                        </p>
                        {phrase.decisionId && (
                          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.13em] text-foreground-muted">
                            Open decision · {phrase.decisionId}
                          </p>
                        )}
                      </div>
                    </div>
                  </details>

                  <Link
                    className="mt-7 inline-flex min-h-11 items-center self-start font-mono text-[10px] font-semibold uppercase tracking-[0.15em] underline decoration-border underline-offset-8"
                    href={phrase.explainerRoute}
                  >
                    Follow the explainer
                    <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
                  </Link>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mt-5 border border-border bg-card p-8 text-sm leading-7 text-foreground-muted">
            No governed phrase matches this register and search. Clear the
            search or choose another register.
          </div>
        )}
      </div>
    </section>
  );
}
