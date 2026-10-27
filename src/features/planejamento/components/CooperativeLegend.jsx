import React from 'react';
import { COOPERATIVE_COLORS } from '@/domain/constants/cooperativeColors.js';

export function CooperativeLegend() {
  const coops = Object.values(COOPERATIVE_COLORS);

  return (
    <div className="flex items-center gap-3 md:gap-4 flex-wrap text-xs font-semibold text-yby-muted">
      <span className="text-yby-heading">Cooperativas:</span>
      {coops.map((coop) => (
        <div key={coop.id} className="flex items-center gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: coop.color }}
          />
          <span>{coop.shortName}</span>
        </div>
      ))}
    </div>
  );
}
