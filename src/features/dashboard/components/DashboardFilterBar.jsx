import React from 'react';
import clsx from 'clsx';
import { SelectField } from '@/shared/ui/SelectField.jsx';
import { InputField } from '@/shared/ui/InputField.jsx';

export function DashboardFilterBar({ filters, clients, wasteList }) {
  const pevOptions = clients.map((c) => ({ value: c.id, label: c.name }));
  const wasteOptions = wasteList.map((w) => ({ value: w.name, label: w.name }));

  return (
    <div className="bg-yby-surface p-4 sm:p-5 rounded-2xl border border-yby-border mb-6 transition-all duration-300 ease-out hover:shadow-card hover:border-yby-primary/30 cursor-default">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SelectField
          label="PEV"
          placeholder="Todos os PEVs"
          options={pevOptions}
          value={filters.pev}
          onChange={(e) => filters.setPev(e.target.value)}
        />

        <SelectField
          label="Tipo de resíduo"
          placeholder="Todos os resíduos"
          options={wasteOptions}
          value={filters.waste}
          onChange={(e) => filters.setWaste(e.target.value)}
        />

        <InputField
          label="Data inicial"
          type="date"
          value={filters.startDate}
          onChange={(e) => filters.setStartDate(e.target.value)}
        />

        <InputField
          label="Data final"
          type="date"
          value={filters.endDate}
          onChange={(e) => filters.setEndDate(e.target.value)}
        />
      </div>

      {/* Pílulas de filtro rápido */}
      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-yby-border/60">
        <button
          type="button"
          onClick={() => filters.handleApplyQuickFilter('month')}
          className={clsx(
            'px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 select-none',
            filters.quickFilter === 'month'
              ? 'bg-yby-light text-yby-primary shadow-sm font-bold border border-yby-primary/30'
              : 'bg-white text-yby-muted hover:text-yby-heading hover:shadow-sm border border-yby-border'
          )}
        >
          Mês atual
        </button>

        <button
          type="button"
          onClick={() => filters.handleApplyQuickFilter('week')}
          className={clsx(
            'px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 select-none',
            filters.quickFilter === 'week'
              ? 'bg-yby-light text-yby-primary shadow-sm font-bold border border-yby-primary/30'
              : 'bg-white text-yby-muted hover:text-yby-heading hover:shadow-sm border border-yby-border'
          )}
        >
          Semana Atual
        </button>
      </div>
    </div>
  );
}
