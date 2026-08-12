import React from 'react';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArtifactRenderer from './ArtifactRenderer';
import { EntranceArrivalBar } from '@/components/entrance/EntranceArrivalBar';
import { EvidenceVitalsBar } from '@/components/evidence-vitals-bar';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { ATLAS_HREF } from '@/lib/site-navigation';
import {
  claimEvidenceVitals,
  EVIDENCE_SNAPSHOT_STAMP,
} from '@/lib/evidence-vitals';

type ArtifactMetadata = {
  original_title: string;
  claim_maturity: string;
  misuse_potential: string;
  public_legibility: string;
  public_summary: string;
  slug?: string;
  filename?: string;
};

type ArtifactPageProps = {
  params: Promise<{ slug: string }>;
};

const DEFAULT_METADATA: ArtifactMetadata = {
  original_title: '',
  claim_maturity: 'draft',
  misuse_potential: 'low',
  public_legibility: 'technical',
  public_summary: '',
};

function readArtifactMetadata(slug: string): ArtifactMetadata {
  const indexPath = path.join(process.cwd(), 'src/app/context/artifactsIndex.json');
  const indexData = JSON.parse(
    fs.readFileSync(indexPath, 'utf8')
  ) as Record<string, Partial<ArtifactMetadata>>;

  return {
    ...DEFAULT_METADATA,
    original_title: slug,
    ...indexData[slug],
  };
}

export async function generateMetadata({ params }: ArtifactPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const artifactMetadata = readArtifactMetadata(slug);
    return {
      title: artifactMetadata.original_title,
      description: artifactMetadata.public_summary,
      alternates: {
        canonical: `/artifact/${encodeURIComponent(slug)}`,
      },
    };
  } catch {
    return {
      title: 'Artifact',
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

export default async function ArtifactPage({ params }: ArtifactPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  const artifactPath = path.join(process.cwd(), 'src/content/artifacts', `${slug}.md`);
  let markdownContent = '';
  let metadata: ArtifactMetadata = {
    ...DEFAULT_METADATA,
    original_title: slug,
  };
  
  try {
    markdownContent = fs.readFileSync(artifactPath, 'utf8');
    metadata = readArtifactMetadata(slug);
    
    // Simple frontmatter removal for display
    if (markdownContent.startsWith('---')) {
      const parts = markdownContent.split('---');
      if (parts.length >= 3) {
        markdownContent = parts.slice(2).join('---').trim();
      }
    }

    // The page header owns the document title; keep the Markdown standalone
    // while avoiding a duplicate H1 in the rendered artifact.
    markdownContent = markdownContent.replace(/^#\s+.+(?:\r?\n)+/, '').trim();
  } catch {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <SiteHeader />
      <EntranceArrivalBar />
      <div className="border-b border-border bg-card/55 px-5 py-3 sm:px-8">
        <nav
          aria-label="Artifact context"
          className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3"
        >
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Library artifact
          </span>
          <span className="flex flex-wrap gap-4 text-sm">
            <Link className="hover:underline" href="/publications">
              Publications
            </Link>
            <Link className="hover:underline" href="/work">
              Work &amp; evidence
            </Link>
            <Link className="hover:underline" href={ATLAS_HREF}>
              Open in Atlas
            </Link>
          </span>
        </nav>
      </div>
      <div className="border-b border-border px-5 py-4 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <EvidenceVitalsBar
            description="These corpus-wide figures provide context for the artifact maturity badge below; they do not establish the artifact's individual claims."
            items={claimEvidenceVitals}
            stamp={EVIDENCE_SNAPSHOT_STAMP}
            title="Claim-evidence snapshot"
          />
        </div>
      </div>
      {/* Content */}
      <article className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <div className="mb-6 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-widest font-semibold">
          <span className="rounded-sm border border-border bg-card px-3 py-1 text-foreground shadow-sm">
            Maturity: {metadata.claim_maturity}
          </span>
          <span className="rounded-sm border border-border bg-card px-3 py-1 text-foreground shadow-sm">
            Legibility: {metadata.public_legibility}
          </span>
          {metadata.misuse_potential === "high" && (
            <span className="rounded-sm border border-destructive/50 bg-destructive/10 px-3 py-1 text-destructive shadow-sm">
              ⚠ High Misuse Potential
            </span>
          )}
        </div>
        
        <h1 className="mb-6 text-5xl font-serif font-semibold tracking-tight text-foreground leading-tight">
          {metadata.original_title}
        </h1>

        {metadata.public_summary && (
          <div className="mb-12 rounded-sm border-l-2 border-primary bg-card/50 p-6">
            <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-3">Public Summary</div>
            <p className="text-lg font-serif italic text-foreground leading-relaxed">{metadata.public_summary}</p>
          </div>
        )}
        
        <ArtifactRenderer content={markdownContent} />
      </article>
      <SiteFooter />
    </main>
  );
}
