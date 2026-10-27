import React from 'react';
import { Check, Circle } from 'lucide-react';
import { CooperativePillSelect } from './CooperativePillSelect.jsx';
import { formatAssignedDaysLabel, hasUnsavedChanges } from '@/domain/calculators/planningStatusHelper.js';

export function MobilePlanningCard({ row, originalRow = {}, cooperatives = [], onCellChange }) {
  const isUnsaved = hasUnsavedChanges(originalRow, row);
  const days = [
    { key: 'seg', label: 'Segunda' },
    { key: 'ter', label: 'Terça' },
    { key: 'qua', label: 'Quarta' },
    { key: 'qui', label: 'Quinta' },
    { key: 'sex', label: 'Sexta' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-yby-border p-4 shadow-card space-y-3 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-card-elevated hover:border-yby-primary/30">
      {/* Topo do Card */}
      <div className="flex items-start justify-between gap-2 border-b border-yby-border/60 pb-3">
        <div>
          <h3 className="font-bold text-base text-yby-heading">{row.clientName}</h3>
          <span className="text-xs text-yby-muted mt-0.5 block">
            {formatAssignedDaysLabel(row)}
          </span>
        </div>
        <div>
          {isUnsaved ? (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-yby-orange bg-orange-50 px-2 py-1 rounded-full border border-orange-200">
              <Circle className="w-2 h-2 fill-yby-orange" />
              Não salvo
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-yby-primary bg-yby-tint px-2 py-1 rounded-full border border-yby-light">
              <Check className="w-3 h-3 stroke-[3]" />
              Salvo
            </span>
          )}
        </div>
      </div>

      {/* 5 Dias */}
      <div className="space-y-2 pt-1">
        {days.map((d) => (
          <div key={d.key} className="flex items-center justify-between text-xs py-1">
            <span className="font-semibold text-yby-muted">{d.label}:</span>
            <CooperativePillSelect
              value={row[d.key]}
              cooperatives={cooperatives}
              onChange={(val) => onCellChange(row.id, d.key, val)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
