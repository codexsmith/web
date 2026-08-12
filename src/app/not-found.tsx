import Link from "next/link";
import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ATLAS_HREF } from "@/lib/site-navigation";

export const metadata: Metadata = {
  title: "Record not found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <section className="flex flex-1 items-center border-b border-border px-5 py-20 sm:px-8">
        <div className="mx-auto w-full max-w-4xl">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            404 · Record not found
          </p>
          <h1 className="mt-5 max-w-3xl font-serif text-5xl font-semibold leading-none tracking-tight sm:text-7xl">
            This path does not resolve to a public record.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-foreground/70">
            The record may have moved, remain unpublished, or never have been
            part of the public corpus.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex min-h-12 items-center justify-center bg-foreground px-6 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-background"
              href="/domains"
            >
              Browse domain records
            </Link>
            <Link
              className="inline-flex min-h-12 items-center justify-center border border-border px-6 font-mono text-[11px] font-semibold uppercase tracking-[0.14em]"
              href={ATLAS_HREF}
            >
              Open the atlas
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
