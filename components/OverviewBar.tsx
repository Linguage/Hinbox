'use client';

import { useState } from 'react';
import { Sparkles, ChevronDown } from 'lucide-react';
import clsx from 'clsx';

interface OverviewBarProps {
  description: string;
}

export default function OverviewBar({ description }: OverviewBarProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <section className="px-4 pb-2">
      <div className="rounded-xl border border-accent bg-accent-soft text-sm text-main shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between px-4 py-2 cursor-pointer hover-surface-soft"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="font-medium text-main">Overview</span>
          </div>
          <ChevronDown
            className={clsx(
              'w-4 h-4 text-muted transition-transform duration-150',
              expanded && 'rotate-180'
            )}
          />
        </button>
        {expanded && (
          <div className="px-4 pb-3 pt-1 leading-relaxed text-sm text-muted">
            {description}
          </div>
        )}
      </div>
    </section>
  );
}
