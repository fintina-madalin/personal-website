'use client';

import { useState } from 'react';
import type { Highlight, HighlightKind } from '@/types/resume';

export interface TimelineItem {
  subject: string;
  context: string;
  startDate: string;
  endDate: string;
  highlights?: Highlight[];
}

interface Props {
  items: TimelineItem[];
  defaultExpanded?: number;
  accentColor?: string;
  hashColor?: string;
}

const KIND_DOT: Record<HighlightKind, string> = {
  ai: 'bg-fuchsia-400 shadow-[0_0_6px_rgba(232,121,249,0.8)]',
  metric: 'bg-emerald-400',
  decision: 'bg-amber-400',
  story: 'bg-gray-500',
};

const KIND_LABEL: Record<HighlightKind, string> = {
  ai: 'ai',
  metric: 'metric',
  decision: 'decision',
  story: 'story',
};

function fauxHash(input: string): string {
  let h = 5381;
  for (let i = 0; i < input.length; i++) {
    h = ((h << 5) + h + input.charCodeAt(i)) & 0xffffffff;
  }
  return Math.abs(h).toString(16).padStart(7, '0').slice(0, 7);
}

export default function TimelineSection({
  items,
  defaultExpanded = 3,
  accentColor = 'text-blue-400',
  hashColor = 'text-amber-400',
}: Props) {
  const [expanded, setExpanded] = useState<Set<number>>(
    () => new Set(items.slice(0, defaultExpanded).map((_, i) => i))
  );

  const toggle = (i: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <div className="relative font-mono text-xs sm:text-sm">
      {/* vertical rail */}
      <div
        className="absolute left-2 sm:left-3 top-2 bottom-2 w-px bg-gradient-to-b from-gray-700 via-gray-600 to-gray-700"
        aria-hidden
      />

      <ul className="space-y-3 sm:space-y-4">
        {items.map((item, i) => {
          const isOpen = expanded.has(i);
          const hash = fauxHash(item.subject + item.startDate);
          const dateRange = `${item.startDate} → ${item.endDate}`;

          return (
            <li key={i} className="relative pl-7 sm:pl-9">
              {/* node */}
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                className={`absolute left-0 top-1.5 sm:top-2 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 transition-all flex items-center justify-center ${
                  isOpen
                    ? 'bg-gray-900 border-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.6)]'
                    : 'bg-gray-800 border-gray-600 hover:border-gray-400'
                }`}
              >
                <span className={`block w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-blue-400' : 'bg-gray-500'}`} />
              </button>

              {isOpen ? (
                <ExpandedEntry
                  item={item}
                  hash={hash}
                  dateRange={dateRange}
                  accentColor={accentColor}
                  hashColor={hashColor}
                  onCollapse={() => toggle(i)}
                />
              ) : (
                <CollapsedEntry
                  item={item}
                  hash={hash}
                  dateRange={dateRange}
                  hashColor={hashColor}
                  onExpand={() => toggle(i)}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ExpandedEntry({
  item,
  hash,
  dateRange,
  accentColor,
  hashColor,
  onCollapse,
}: {
  item: TimelineItem;
  hash: string;
  dateRange: string;
  accentColor: string;
  hashColor: string;
  onCollapse: () => void;
}) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg px-3 py-3 sm:px-4 sm:py-4 hover:border-blue-500/40 transition-colors">
      <button
        type="button"
        onClick={onCollapse}
        className="flex flex-wrap items-baseline gap-x-2 gap-y-1 w-full text-left"
        aria-label="Collapse entry"
      >
        <span className="text-gray-500">commit</span>
        <span className={`${hashColor}`}>{hash}</span>
      </button>
      <div className="mt-1 flex flex-wrap items-baseline gap-x-2">
        <span className="text-gray-500 w-16 inline-block">Date:</span>
        <span className="text-green-400">{dateRange}</span>
      </div>
      <div className="mt-1 flex flex-wrap items-baseline gap-x-2">
        <span className="text-gray-500 w-16 inline-block">Subject:</span>
        <span className={`${accentColor} font-semibold`}>{item.subject}</span>
      </div>
      {item.context && (
        <div className="mt-0.5 ml-[4.5rem] text-gray-400 text-[0.7rem] sm:text-xs">{item.context}</div>
      )}

      {item.highlights && item.highlights.length > 0 && (
        <ul className="mt-3 space-y-1.5 sm:space-y-2 pl-4 border-l border-gray-700">
          {item.highlights.map((h, idx) => (
            <li key={idx} className="flex items-start gap-2 text-gray-300">
              <span
                className={`mt-1.5 inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 ${KIND_DOT[h.kind]}`}
                title={KIND_LABEL[h.kind]}
                aria-label={KIND_LABEL[h.kind]}
              />
              <span className="leading-relaxed">{h.text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CollapsedEntry({
  item,
  hash,
  dateRange,
  hashColor,
  onExpand,
}: {
  item: TimelineItem;
  hash: string;
  dateRange: string;
  hashColor: string;
  onExpand: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onExpand}
      className="block w-full text-left group hover:bg-gray-800/40 rounded-md px-2 py-1.5 transition-colors"
    >
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <span className={`${hashColor} group-hover:opacity-100 opacity-80`}>{hash}</span>
        <span className="text-green-400/80 text-[0.7rem] sm:text-xs">{dateRange}</span>
        <span className="text-gray-300 group-hover:text-white transition-colors">{item.subject}</span>
        {item.context && (
          <span className="text-gray-500 text-[0.7rem] sm:text-xs">· {item.context}</span>
        )}
      </div>
    </button>
  );
}
