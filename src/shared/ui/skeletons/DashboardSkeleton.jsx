import React from 'react';
import { Skeleton } from '../Skeleton.jsx';

/**
 * Esqueleto estrutural de alta fidelidade para o Dashboard YBY.
 * Reproduz o layout exato de cabeçalho, filtros, KPIs primários e secundários,
 * e os gráficos analíticos com animação shimmer sem nenhum transbordamento.
 */
export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
        <div className="space-y-2">
          <Skeleton variant="text" className="w-44 h-8 rounded-lg max-w-full" />
          <Skeleton variant="text" className="w-72 max-w-full h-4 rounded-md" />
        </div>
        <div className="flex items-center gap-2.5 flex-wrap w-full sm:w-auto">
          <Skeleton variant="rectangular" className="w-36 sm:w-44 h-9 rounded-xl max-w-full shrink-0" />
          <Skeleton variant="rectangular" className="w-32 sm:w-36 h-9 rounded-xl max-w-full shrink-0" />
        </div>
      </div>

      {/* Filter Bar Skeleton */}
      <div className="bg-yby-surface p-4 sm:p-5 rounded-2xl border border-yby-border mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Skeleton variant="rectangular" className="w-full h-11 rounded-xl" />
          <Skeleton variant="rectangular" className="w-full h-11 rounded-xl" />
          <Skeleton variant="rectangular" className="w-full h-11 rounded-xl" />
          <Skeleton variant="rectangular" className="w-full h-11 rounded-xl" />
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-yby-border/60">
          <Skeleton variant="rectangular" className="w-20 h-7 rounded-full" />
          <Skeleton variant="rectangular" className="w-20 h-7 rounded-full" />
          <Skeleton variant="rectangular" className="w-24 h-7 rounded-full" />
        </div>
      </div>

      {/* 4 Primary KPI Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5 xl:gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white px-3 py-3 sm:px-3.5 sm:py-3.5 xl:px-4 xl:py-4 rounded-2xl border border-yby-border shadow-card flex items-center gap-2.5 sm:gap-3 min-h-[84px] sm:min-h-[88px] overflow-hidden"
          >
            <Skeleton
              variant="rectangular"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl xl:rounded-2xl flex-shrink-0"
            />
            <div className="min-w-0 flex-1 space-y-1.5 overflow-hidden">
              <Skeleton variant="text" className="w-3/5 max-w-[110px] h-3 rounded" />
              <Skeleton variant="text" className="w-4/5 max-w-[140px] h-5 rounded-md" />
            </div>
          </div>
        ))}
      </div>

      {/* Linha 1 de Gráficos: Coleta em Peso (2 cols) + Rosca de Resíduos (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white p-5 md:p-6 rounded-2xl border border-yby-border shadow-card space-y-4 overflow-hidden">
          <div className="space-y-1.5">
            <Skeleton variant="text" className="w-48 max-w-full h-5" />
            <Skeleton variant="text" className="w-72 max-w-full h-3.5" />
          </div>
          <Skeleton variant="rectangular" className="w-full h-64 rounded-xl" />
        </div>

        <div className="bg-white p-5 md:p-6 rounded-2xl border border-yby-border shadow-card space-y-4 overflow-hidden">
          <div className="space-y-1.5">
            <Skeleton variant="text" className="w-44 max-w-full h-5" />
            <Skeleton variant="text" className="w-36 max-w-full h-3.5" />
          </div>
          <div className="flex items-center justify-center py-4">
            <Skeleton variant="circular" className="w-40 h-40 max-w-full" />
          </div>
          <div className="space-y-2 pt-1">
            <Skeleton variant="text" className="w-full h-3" />
            <Skeleton variant="text" className="w-3/4 h-3" />
          </div>
        </div>
      </div>

      {/* 4 Secondary KPI Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5 xl:gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-yby-zebra px-3.5 py-3 sm:px-4 sm:py-3.5 xl:px-4.5 xl:py-4 rounded-2xl border border-yby-border/80 relative overflow-hidden space-y-2"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-yby-border/70" />
            <Skeleton variant="text" className="w-3/4 max-w-[130px] h-3 rounded" />
            <Skeleton variant="text" className="w-1/2 max-w-[100px] h-5 rounded-md" />
          </div>
        ))}
      </div>

      {/* Linha 2 de Gráficos: Economia de Água + Consumo de Energia */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-yby-border shadow-card space-y-4 overflow-hidden">
          <div className="space-y-1.5">
            <Skeleton variant="text" className="w-48 max-w-full h-5" />
            <Skeleton variant="text" className="w-40 max-w-full h-3.5" />
          </div>
          <Skeleton variant="rectangular" className="w-full h-52 rounded-xl" />
        </div>
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-yby-border shadow-card space-y-4 overflow-hidden">
          <div className="space-y-1.5">
            <Skeleton variant="text" className="w-48 max-w-full h-5" />
            <Skeleton variant="text" className="w-40 max-w-full h-3.5" />
          </div>
          <Skeleton variant="rectangular" className="w-full h-52 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
