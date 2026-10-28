import React from 'react';
import { Check, Circle } from 'lucide-react';
import { CooperativePillSelect } from './CooperativePillSelect.jsx';
import { formatAssignedDaysLabel, hasUnsavedChanges } from '@/domain/calculators/planningStatusHelper.js';

export function PlanningTable({ rows = [], originalRows = [], cooperatives = [], onCellChange }) {
  const days = [
    { key: 'seg', label: 'Segunda' },
    { key: 'ter', label: 'Terça' },
    { key: 'qua', label: 'Quarta' },
    { key: 'qui', label: 'Quinta' },
    { key: 'sex', label: 'Sexta' },
  ];

  return (
    <div className="w-full bg-white rounded-2xl border border-yby-border overflow-hidden shadow-card transition-all duration-300 ease-out hover:shadow-card-elevated hover:border-yby-primary/30 cursor-default">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-yby-surface/60 border-b border-yby-border text-xs font-bold text-yby-muted uppercase tracking-wider">
              <th className="py-3.5 px-4 min-w-[200px]">Cliente</th>
              {days.map((d) => (
                <th key={d.key} className="py-3.5 px-3 min-w-[140px]">
                  {d.label}
                </th>
              ))}
              <th className="py-3.5 px-4 min-w-[120px]">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-yby-border/60 text-sm">
            {rows.map((row) => {
              const original = originalRows.find((o) => o.id === row.id) || {};
              const isUnsaved = hasUnsavedChanges(original, row);

              return (
                <tr key={row.id} className="hover:bg-yby-tint/40 transition-colors duration-150">
                  {/* Nome do Cliente e resumo de cobertura */}
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-yby-heading">{row.clientName}</p>
                    <span className="text-xs text-yby-muted block mt-0.5">
                      {formatAssignedDaysLabel(row)}
                    </span>
                  </td>

                  {/* 5 Dias da semana */}
                  {days.map((d) => (
                    <td key={d.key} className="py-3 px-3">
                      <CooperativePillSelect
                        value={row[d.key]}
                        cooperatives={cooperatives}
                        onChange={(val) => onCellChange(row.id, d.key, val)}
                      />
                    </td>
                  ))}

                  {/* Coluna Status */}
                  <td className="py-3.5 px-4">
                    {isUnsaved ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-yby-orange">
                        <Circle className="w-2.5 h-2.5 fill-yby-orange" />
                        Não salvo
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-yby-primary">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        Salvo
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="p-3.5 bg-yby-surface/30 border-t border-yby-border text-xs text-yby-muted">
        {rows.length} clientes exibidos · role para ver mais
      </div>
    </div>
  );
}
