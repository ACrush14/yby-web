import React from 'react';
import { Search, X } from 'lucide-react';
import { SelectField } from '@/shared/ui/SelectField.jsx';
import { ORGANIZATION_TYPE_LIST } from '@/domain/constants/organizationTypes.js';

export function OrganizationFilterBar({ filters }) {
  const typeOptions = [
    { value: 'Todas', label: 'Todos os tipos' },
    ...ORGANIZATION_TYPE_LIST.map((t) => ({ value: t, label: t })),
  ];

  const statusOptions = [
    { value: 'Todos', label: 'Todos os status' },
    { value: 'Ativa', label: 'Apenas Ativas' },
    { value: 'Inativa', label: 'Apenas Inativas' },
  ];

  const hasActiveFilters =
    filters.search || filters.type !== 'Todas' || filters.status !== 'Todos';

  return (
    <div className="bg-yby-surface p-4 sm:p-5 rounded-2xl border border-yby-border mb-6 transition-all duration-300 ease-out hover:shadow-card hover:border-yby-primary/30 cursor-default">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        {/* Campo de Busca */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-yby-heading block">
            Buscar organização
          </label>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-yby-muted pointer-events-none" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => filters.setSearch(e.target.value)}
              placeholder="Nome da organização ou CNPJ"
              className="w-full pl-9 pr-3 py-2 text-xs md:text-sm bg-white rounded-xl border border-yby-border focus:outline-none focus:border-yby-primary shadow-sm min-h-[44px]"
            />
          </div>
        </div>

        {/* Filtro por Tipo */}
        <SelectField
          label="Tipo de organização"
          options={typeOptions}
          value={filters.type}
          onChange={(e) => filters.setType(e.target.value)}
          placeholder={null}
        />

        {/* Filtro por Status */}
        <SelectField
          label="Status"
          options={statusOptions}
          value={filters.status}
          onChange={(e) => filters.setStatus(e.target.value)}
          placeholder={null}
        />
      </div>

      {hasActiveFilters && (
        <div className="mt-3 pt-3 border-t border-yby-border/60 flex items-center justify-between">
          <span className="text-xs text-yby-muted font-medium">
            Filtros ativos aplicados na listagem
          </span>
          <button
            type="button"
            onClick={filters.handleClearFilters}
            className="text-xs font-semibold text-yby-primary hover:underline inline-flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" />
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  );
}
