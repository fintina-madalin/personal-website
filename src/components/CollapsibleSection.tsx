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
    <section id={id} className="mb-10 md:mb-14">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full text-left group rounded-md border ${borderColor} bg-gray-900/40 hover:bg-gray-900/70 transition-colors px-3 py-2 sm:px-4 sm:py-3 mb-4`}
        aria-expanded={isExpanded}
      >
        <div className="flex items-center justify-between gap-3 font-mono text-sm sm:text-base">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-green-400 flex-shrink-0">~/resume</span>
            <span className="text-gray-500 flex-shrink-0">$</span>
            <span className="text-gray-400 flex-shrink-0">open</span>
            <span className={`${iconColor} flex-shrink-0`} aria-hidden>{icon}</span>
            <span className="text-white font-semibold truncate">{title}</span>
            <span className={`ml-1 text-xs ${iconColor} opacity-70 hidden sm:inline`}>
              {isExpanded ? '--full' : '--collapsed'}
            </span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className={`text-[0.65rem] sm:text-xs ${iconColor} opacity-80`}>
              {isExpanded ? '[expanded]' : '[collapsed]'}
            </span>
            <span
              className={`transform transition-transform duration-300 ${
                isExpanded ? 'rotate-0' : '-rotate-90'
              } ${iconColor} text-base`}
              aria-hidden
            >
              ▾
            </span>
          </div>
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? 'max-h-[6000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pb-4 pl-2 sm:pl-3 border-l border-gray-800">
          {children}
        </div>
      </div>
    </section>
  );
}
