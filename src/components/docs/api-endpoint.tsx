'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

interface ApiEndpointProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | string;
  url: string;
  className?: string;
}

const methodStyles: Record<string, string> = {
  GET: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30',
  POST: 'bg-sky-500/15 text-sky-700 dark:text-sky-400 border-sky-500/30',
  PUT: 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30',
  PATCH: 'bg-violet-500/15 text-violet-700 dark:text-violet-400 border-violet-500/30',
  DELETE: 'bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30',
};

export function ApiEndpoint({ method, url, className = '' }: ApiEndpointProps) {
  const [copied, setCopied] = useState(false);
  const normalizedMethod = method.toUpperCase();
  const badgeStyle =
    methodStyles[normalizedMethod] ??
    'bg-fd-muted text-fd-muted-foreground border-fd-border';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback nếu clipboard API bị chặn
      const textarea = document.createElement('textarea');
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className={`my-4 flex items-center justify-between gap-3 rounded-lg border border-fd-border bg-fd-card/60 p-2.5 sm:px-4 sm:py-3 transition-colors ${className}`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3">
        <span
          className={`shrink-0 rounded border px-2 py-0.5 font-mono text-xs font-bold uppercase tracking-wider ${badgeStyle}`}
        >
          {normalizedMethod}
        </span>
        <code className="min-w-0 flex-1 font-mono text-xs sm:text-sm text-fd-foreground break-all select-all">
          {url}
        </code>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Sao chép URL endpoint"
        className="group relative inline-flex shrink-0 items-center justify-center rounded-md border border-fd-border bg-fd-background p-1.5 text-fd-muted-foreground transition-all hover:bg-fd-accent hover:text-fd-foreground focus-visible:outline-2 focus-visible:outline-fd-primary focus-visible:outline-offset-2"
      >
        {copied ? (
          <Check className="size-4 text-emerald-500 transition-transform scale-110" />
        ) : (
          <Copy className="size-4 transition-transform group-hover:scale-105" />
        )}
        <span
          className={`pointer-events-none absolute -top-8 right-0 rounded bg-fd-foreground px-2 py-0.5 text-[11px] font-medium text-fd-background shadow transition-opacity ${
            copied ? 'opacity-100' : 'opacity-0'
          }`}
          role="status"
        >
          {copied ? 'Đã chép!' : ''}
        </span>
      </button>
    </div>
  );
}
