import React from 'react';
import { Save, Search } from 'lucide-react';
import { usePlanejamentoController } from './hooks/usePlanejamentoController.js';
import { PageHeader } from '@/shared/layout/PageHeader.jsx';
import { Button } from '@/shared/ui/Button.jsx';
import { CooperativeLegend } from './components/CooperativeLegend.jsx';
import { PlanningTable } from './components/PlanningTable.jsx';
import { MobilePlanningCard } from './components/MobilePlanningCard.jsx';

export function PlanejamentoPage() {
  const {
    rows,
    originalRows,
    cooperatives,
    searchTerm,
    setSearchTerm,
    loading,
    saving,
    totalUnsaved,
    handleCellChange,
    handleSaveAll,
  } = usePlanejamentoController();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <span className="text-sm text-yby-muted font-medium">Carregando planejamento semanal...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header com Botão Salvar Alterações */}
      <PageHeader
        title="Planejamento"
        subtitle="Defina qual cooperativa atende cada cliente em cada dia da semana"
        actions={
          <Button
            variant="primary"
            size="md"
            loading={saving}
            onClick={handleSaveAll}
            className="w-full sm:w-auto"
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar alterações {totalUnsaved > 0 && `(${totalUnsaved})`}
          </Button>
        }
      />

      {/* Barra de Filtro de Busca e Legenda de Cores */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-yby-surface/40 p-4 rounded-2xl border border-yby-border/60">
        <div className="relative max-w-sm w-full">
          <Search className="w-4 h-4 absolute left-3 top-3 text-yby-muted pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar cliente (Nome do cliente ou PEV)"
            className="w-full pl-9 pr-3 py-2 text-xs md:text-sm bg-white rounded-xl border border-yby-border focus:outline-none focus:border-yby-primary shadow-sm"
          />
        </div>

        <CooperativeLegend />
      </div>

      {/* Visualização Desktop (Tabela Completa) */}
      <div className="hidden md:block">
        <PlanningTable
          rows={rows}
          originalRows={originalRows}
          cooperatives={cooperatives}
          onCellChange={handleCellChange}
        />
      </div>

      {/* Visualização Mobile (Cards Individuais por Cliente) */}
      <div className="md:hidden space-y-4">
        {rows.map((row) => (
          <MobilePlanningCard
            key={row.id}
            row={row}
            originalRow={originalRows.find((o) => o.id === row.id)}
            cooperatives={cooperatives}
            onCellChange={handleCellChange}
          />
        ))}
      </div>

      {/* Barra Fixa Inferior no Mobile quando houver alterações pendentes */}
      {totalUnsaved > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-3 bg-white border-t border-yby-border md:hidden z-30 shadow-popup flex items-center justify-between">
          <span className="text-xs font-bold text-yby-orange">
            {totalUnsaved} cliente(s) com alterações pendentes
          </span>
          <Button variant="primary" size="sm" loading={saving} onClick={handleSaveAll}>
            Salvar
          </Button>
        </div>
      )}
    </div>
  );
}
