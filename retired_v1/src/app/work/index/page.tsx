import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Filter, Search } from "lucide-react";
import { ProductLandingDirectory } from "@/components/product-landing/ProductLandingDirectory";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ContextNavigation } from "@/components/public-interface/ContextNavigation";
import { getWorkKinds, workRecords, type WorkKind } from "@/lib/work-records";

export const metadata: Metadata = {
  title: "Work Index",
  description:
    "A filterable index of Boundary First Labs work records across projects, products, services, artifacts, provisional portfolio objects, and active public programs.",
  alternates: { canonical: "/work/index" },
};

type WorkIndexProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function first(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function WorkIndexPage({ searchParams }: WorkIndexProps) {
  const params = await searchParams;
  const query = first(params.q).trim().toLowerCase();
  const kind = first(params.kind) as WorkKind | "";
  const authority = first(params.authority);
  const records = workRecords.filter((record) => {
    const matchesQuery =
      !query ||
      `${record.title} ${record.summary} ${record.domain ?? ""} ${record.operation ?? ""}`
        .toLowerCase()
        .includes(query);
    const matchesKind = !kind || record.kind === kind;
    const matchesAuthority = !authority || record.authority === authority;
    return matchesQuery && matchesKind && matchesAuthority;
  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <ContextNavigation group="work" />
      <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
            Portfolio inventory
          </p>
          <h1 className="mt-4 max-w-5xl font-serif text-5xl font-semibold leading-[0.98] tracking-tight sm:text-7xl">
            Browse the work without traversing the ontology.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-foreground-muted">
            This index projects the retained portfolio, project register, governed launch records, and active public programs through one common Work grammar. Provisional records remain visibly provisional.
          </p>
        </div>
      </section>

      <ProductLandingDirectory group="work" />

      <section className="border-b border-border bg-card/55 px-5 py-6 sm:px-8">
        <form className="mx-auto grid max-w-7xl gap-3 md:grid-cols-[minmax(0,1fr)_13rem_13rem_auto]" method="get">
          <label className="relative">
            <span className="sr-only">Search work</span>
            <Search aria-hidden="true" className="absolute left-3 top-3.5 h-4 w-4 text-foreground-muted" />
            <input
              className="min-h-11 w-full border border-border bg-background pl-10 pr-3 text-sm"
              defaultValue={first(params.q)}
              name="q"
              placeholder="Search title, summary, domain..."
            />
          </label>
          <label>
            <span className="sr-only">Filter by kind</span>
            <select className="min-h-11 w-full border border-border bg-background px-3 text-sm" defaultValue={kind} name="kind">
              <option value="">All work kinds</option>
              {getWorkKinds().map((value) => (
                <option key={value} value={value}>{value.replace(/-/g, " ")}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="sr-only">Filter by authority</span>
            <select className="min-h-11 w-full border border-border bg-background px-3 text-sm" defaultValue={authority} name="authority">
              <option value="">All record states</option>
              <option value="governed">Governed</option>
              <option value="provisional">Provisional</option>
            </select>
          </label>
          <button className="inline-flex min-h-11 items-center justify-center bg-primary px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.13em] text-primary-foreground" type="submit">
            <Filter aria-hidden="true" className="mr-2 h-4 w-4" />
            Apply
          </button>
        </form>
      </section>

      <section className="px-5 py-10 sm:px-8 sm:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
              {records.length} records shown · {workRecords.length} total
            </p>
            <Link className="text-sm hover:underline" href="/work">Work overview</Link>
          </div>
          <div className="mt-6 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 xl:grid-cols-3">
            {records.map((record) => (
              <Link className="group flex min-h-72 flex-col bg-card p-6" href={record.canonicalHref} key={record.slug}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-foreground-muted">
                    {record.kind.replace(/-/g, " ")}
                  </span>
                  <span className={`border px-2 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] ${record.authority === "governed" ? "border-foreground" : "border-border text-foreground-muted"}`}>
                    {record.authority}
                  </span>
                </div>
                <h2 className="mt-5 font-serif text-2xl font-semibold">{record.title}</h2>
                <p className="mt-3 text-sm leading-7 text-foreground-muted">{record.summary}</p>
                <dl className="mt-5 grid gap-2 border-t border-border pt-4 text-xs">
                  <div><dt className="inline font-semibold">Standing: </dt><dd className="inline text-foreground-muted">{record.standing}</dd></div>
                  {record.lifecycleStage ? <div><dt className="inline font-semibold">Lifecycle: </dt><dd className="inline text-foreground-muted">{record.lifecycleStage.replace(/-/g, " ")}</dd></div> : null}
                </dl>
                <span className="mt-auto inline-flex items-center pt-6 font-mono text-[9px] font-semibold uppercase tracking-[0.12em]">
                  Inspect record <ArrowRight aria-hidden="true" className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
          {records.length === 0 ? (
            <div className="border-x border-b border-border bg-card p-8 text-sm text-foreground-muted">
              No Work records match this projection. Clear or widen the filters.
            </div>
          ) : null}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
