import React from 'react';
import { Filter } from 'lucide-react';
import { InputField } from '@/shared/ui/InputField.jsx';
import { SelectField } from '@/shared/ui/SelectField.jsx';
import { Button } from '@/shared/ui/Button.jsx';

export function RelatoriosFilterCard({ filters, cooperatives = [], wasteList = [] }) {
  const coopOptions = [
    { value: '', label: 'Todas as cooperativas' },
    ...cooperatives.map((c) => ({ value: c.shortName || c.name, label: c.shortName || c.name })),
  ];

  const wasteOptions = [
    { value: '', label: 'Todos os resíduos' },
    ...wasteList.map((w) => ({ value: w.name, label: w.name })),
  ];

  return (
    <form
      onSubmit={filters.handleApplyFilter}
      className="bg-yby-surface p-4 sm:p-5 rounded-2xl border border-yby-border mb-6 space-y-4 transition-all duration-300 ease-out hover:shadow-card hover:border-yby-primary/30 cursor-default"
    >
      {/* Linha 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <InputField
          label="Buscar"
          placeholder="ID, PEV ou cooperativa"
          value={filters.search}
          onChange={(e) => filters.setSearch(e.target.value)}
        />

        <SelectField
          label="Cooperativa"
          placeholder=""
          options={coopOptions}
          value={filters.cooperative}
          onChange={(e) => filters.setCooperative(e.target.value)}
        />

        <SelectField
          label="Tipo de resíduo"
          placeholder=""
          options={wasteOptions}
          value={filters.waste}
          onChange={(e) => filters.setWaste(e.target.value)}
        />
      </div>

      {/* Linha 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
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

        <div className="flex sm:justify-end">
          <Button type="submit" variant="primary" className="w-full sm:w-auto px-6">
            <Filter className="w-4 h-4 mr-2" />
            Filtrar
          </Button>
        </div>
      </div>
    </form>
  );
}
