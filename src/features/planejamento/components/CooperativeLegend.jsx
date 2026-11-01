import React from 'react';
import { COOPERATIVE_COLORS } from '@/domain/constants/cooperativeColors.js';

export function CooperativeLegend() {
  const coops = Object.values(COOPERATIVE_COLORS);

  return (
    <div className="flex items-center gap-2 md:gap-2.5 flex-wrap text-xs">
      <span className="font-bold text-yby-heading text-xs mr-0.5">Cooperativas:</span>
      {coops.map((coop) => (
        <div
          key={coop.id}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border shadow-sm select-none transition-all duration-200 hover:scale-105"
          style={{
            backgroundColor: coop.bg,
            color: coop.color,
            borderColor: coop.border,
          }}
        >
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: coop.color }}
          />
          <span className="font-medium tracking-tight">{coop.shortName}</span>
        </div>
      ))}
    </div>
  );
}
