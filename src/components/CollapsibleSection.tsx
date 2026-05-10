'use client';

import { useState, ReactNode } from 'react';

interface CollapsibleSectionProps {
  title: string;
  icon: string;
  iconColor: string;
  borderColor: string;
  children: ReactNode;
  defaultExpanded?: boolean;
  id?: string;
}

export default function CollapsibleSection({
  title,
  icon,
  iconColor,
  borderColor,
  children,
  defaultExpanded = true,
  id,
}: CollapsibleSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <section id={id} className="mb-6 md:mb-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full text-left group rounded-md border ${borderColor} bg-gray-900/30 hover:bg-gray-900/60 transition-colors px-3 py-2 mb-3`}
        aria-expanded={isExpanded}
      >
        <div className="flex items-center justify-between gap-3 font-mono text-sm">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-gray-600 flex-shrink-0">$</span>
            <span className={`${iconColor} flex-shrink-0`} aria-hidden>{icon}</span>
            <span className="text-gray-100 truncate">{title}</span>
          </div>
          <span
            className={`transform transition-transform duration-300 ${
              isExpanded ? 'rotate-0' : '-rotate-90'
            } ${iconColor} text-sm flex-shrink-0`}
            aria-hidden
          >
            ▾
          </span>
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? 'max-h-[6000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pb-2">{children}</div>
      </div>
    </section>
  );
}
