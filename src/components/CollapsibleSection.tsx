'use client';

import { useState, ReactNode } from 'react';

interface CollapsibleSectionProps {
  title: string;
  icon: string;
  iconColor: string;
  borderColor: string;
  children: ReactNode;
  defaultExpanded?: boolean;
}

export default function CollapsibleSection({ 
  title, 
  icon, 
  iconColor, 
  borderColor, 
  children, 
  defaultExpanded = true 
}: CollapsibleSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <section className="mb-12">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full text-left flex items-center justify-between p-4 rounded-lg border ${borderColor} bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-300 mb-4`}
      >
        <h2 className="text-2xl font-bold text-white flex items-center">
          <span className={`${iconColor} mr-2 font-mono`}>{icon}</span>
          <span className="font-mono">{title}</span>
        </h2>
        <div className="flex items-center space-x-2">
          <span className={`text-xs font-mono ${iconColor}`}>
            {isExpanded ? '[collapse]' : '[expand]'}
          </span>
          <span 
            className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'} ${iconColor} font-mono text-lg`}
          >
            ▼
          </span>
        </div>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pb-4">
          {children}
        </div>
      </div>
    </section>
  );
} 