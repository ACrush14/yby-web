import React from 'react';
import { Download, Share2 } from 'lucide-react';
import { useDashboardController } from './hooks/useDashboardController.js';
import { PageHeader } from '@/shared/layout/PageHeader.jsx';
import { Button } from '@/shared/ui/Button.jsx';
import { DashboardSkeleton } from '@/shared/ui/skeletons/DashboardSkeleton.jsx';
import { DashboardFilterBar } from './components/DashboardFilterBar.jsx';
import { PrimaryKpiGrid } from './components/PrimaryKpiGrid.jsx';
import { SecondaryKpiGrid } from './components/SecondaryKpiGrid.jsx';
import { AreaMetricChart } from '@/shared/charts/AreaMetricChart.jsx';
import { WasteDonutChart } from '@/shared/charts/WasteDonutChart.jsx';
import { MonthlyBarChart } from '@/shared/charts/MonthlyBarChart.jsx';

export function DashboardPage() {
  const { metrics, clients, wasteList, loading, filters, actions } = useDashboardController();

  if (loading || !metrics) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Header com Ações de Exportação */}
      <PageHeader
        title="Dashboard"
        subtitle="Indicadores ambientais certificados e evolução histórica da gestão de resíduos"
        actions={
          <>
            <Button
              variant="outline"
              size="md"
              onClick={actions.handleExportStories}
              className="w-full sm:w-auto"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Baixar artes para Stories
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={actions.handleExportPdf}
              className="w-full sm:w-auto"
            >
              <Download className="w-4 h-4 mr-2" />
              Baixar relatório PDF
            </Button>
          </>
        }
      />

      {/* Barra de Filtros com Atalhos Rápidos */}
      <DashboardFilterBar
        filters={filters}
        clients={clients}
        wasteList={wasteList}
      />

      {/* 4 KPIs Primários com Ícones Circulares */}
      <PrimaryKpiGrid metrics={metrics} />

      {/* Linha 1 de Gráficos: Coleta em peso (65%) + Rosca de Resíduos (35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white p-5 md:p-6 rounded-2xl border border-yby-border shadow-card transition-all duration-300 ease-out hover:shadow-card-elevated hover:border-yby-primary/30 hover:-translate-y-1 cursor-default">
          <div className="mb-4">
            <h3 className="text-base font-bold text-yby-heading">
              {metrics.periodType === 'week' ? 'Coleta em peso (kg) na semana' : 'Coleta em peso (kg) por mês'}
            </h3>
            <p className="text-xs text-yby-muted">
              {metrics.periodType === 'week'
                ? 'Peso coletado por dia na semana selecionada (12/10 a 18/10/2026)'
                : 'Peso coletado por mês no período selecionado'}
            </p>
          </div>
          <AreaMetricChart data={metrics.monthlyWeight} height={260} />
        </div>

        <div className="bg-white p-5 md:p-6 rounded-2xl border border-yby-border shadow-card transition-all duration-300 ease-out hover:shadow-card-elevated hover:border-yby-primary/30 hover:-translate-y-1 cursor-default">
          <div className="mb-4">
            <h3 className="text-base font-bold text-yby-heading">Tipo de resíduo coletado</h3>
            <p className="text-xs text-yby-muted">
              {metrics.periodType === 'week' ? 'Participação na semana atual' : 'Participação no período'}
            </p>
          </div>
          <WasteDonutChart
            data={metrics.wasteDistribution.items}
            centerText={metrics.wasteDistribution.totalWeight}
            height={280}
          />
        </div>
      </div>

      {/* 4 KPIs Secundários com Barra de Acento Superior */}
      <SecondaryKpiGrid metrics={metrics} />

      {/* Linha 2 de Gráficos: Água (50%) + Energia (50%) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-yby-border shadow-card transition-all duration-300 ease-out hover:shadow-card-elevated hover:border-yby-primary/30 hover:-translate-y-1 cursor-default">
          <div className="mb-4">
            <h3 className="text-base font-bold text-yby-heading">
              {metrics.periodType === 'week' ? 'Economia de água na semana' : 'Economia de água por mês'}
            </h3>
            <p className="text-xs text-yby-muted">
              {metrics.periodType === 'week' ? 'Litros economizados por dia' : 'Litros economizados no período'}
            </p>
          </div>
          <MonthlyBarChart
            data={metrics.monthlyWater}
            color="#005885"
            unit={metrics.waterUnit || 'milhões L'}
            height={220}
          />
        </div>

        <div className="bg-white p-5 md:p-6 rounded-2xl border border-yby-border shadow-card transition-all duration-300 ease-out hover:shadow-card-elevated hover:border-yby-primary/30 hover:-translate-y-1 cursor-default">
          <div className="mb-4">
            <h3 className="text-base font-bold text-yby-heading">
              {metrics.periodType === 'week' ? 'Consumo de energia na semana' : 'Consumo de energia por mês'}
            </h3>
            <p className="text-xs text-yby-muted">
              {metrics.periodType === 'week' ? 'MWh poupados por dia' : 'MWh poupados no período'}
            </p>
          </div>
          <MonthlyBarChart
            data={metrics.monthlyEnergy}
            color="#E65124"
            unit={metrics.energyUnit || 'MWh'}
            height={220}
          />
        </div>
      </div>
    </div>
  );
}
