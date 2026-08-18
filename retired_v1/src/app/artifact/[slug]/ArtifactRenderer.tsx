"use client";
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import 'highlight.js/styles/github-dark.css'; 
import 'katex/dist/katex.min.css';
import mermaid from 'mermaid';

const Mermaid = ({ chart }: { chart: string }) => {
  const [svg, setSvg] = useState<string>('');

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'neutral',
      fontFamily: 'var(--font-mono)',
    });
    
    const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
    mermaid.render(id, chart).then((result) => {
      setSvg(result.svg);
    }).catch(e => {
      console.error('Mermaid rendering failed', e);
      setSvg(`<div class="text-red-500 border border-red-500 p-4">Error rendering diagram</div>`);
    });
  }, [chart]);

  if (!svg) return <div className="animate-pulse h-32 bg-muted rounded-md flex items-center justify-center font-mono text-sm text-foreground-muted">Loading diagram...</div>;
  
  return (
    <div 
      className="mermaid flex justify-center my-10 p-6 bg-card rounded-lg border border-border shadow-sm"
      dangerouslySetInnerHTML={{ __html: svg }} 
    />
  );
};

export default function ArtifactRenderer({ content }: { content: string }) {
  return (
    <div className="prose prose-neutral dark:prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:font-medium prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeHighlight, rehypeKatex]}
        components={{
          code(props) {
            const {children, className, node, ...rest} = props
            void node;
            const match = /language-(\w+)/.exec(className || '')
            if (match && match[1] === 'mermaid') {
              return <Mermaid chart={String(children).replace(/\n$/, '')} />
            }
            return (
              <code {...rest} className={className}>
                {children}
              </code>
            )
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
