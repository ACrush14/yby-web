import React from 'react';
import { Skeleton } from '../Skeleton.jsx';

/**
 * Esqueleto estrutural de alta fidelidade para o Dashboard YBY.
 * Reproduz o layout exato de cabeçalho, filtros, KPIs primários e secundários,
 * e os gráficos analíticos com animação shimmer.
 */
export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
        <div className="space-y-2">
          <Skeleton variant="text" className="w-48 h-8 rounded-lg" />
          <Skeleton variant="text" className="w-80 max-w-full h-4 rounded-md" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton variant="rectangular" className="w-44 h-10 rounded-xl" />
          <Skeleton variant="rectangular" className="w-44 h-10 rounded-xl" />
        </div>
      </div>

      {/* Filter Bar Skeleton */}
      <div className="bg-yby-surface/50 p-4 rounded-2xl border border-yby-border/60 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Skeleton variant="rectangular" className="w-24 h-9 rounded-xl" />
          <Skeleton variant="rectangular" className="w-24 h-9 rounded-xl" />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Skeleton variant="rectangular" className="w-36 h-9 rounded-xl" />
          <Skeleton variant="rectangular" className="w-36 h-9 rounded-xl" />
          <Skeleton variant="rectangular" className="w-32 h-9 rounded-xl" />
          <Skeleton variant="rectangular" className="w-32 h-9 rounded-xl" />
        </div>
      </div>

      {/* 4 Primary KPI Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl border border-yby-border shadow-card flex items-start gap-4"
          >
            <Skeleton variant="circular" className="w-12 h-12 flex-shrink-0" />
            <div className="flex-1 space-y-2.5">
              <Skeleton variant="text" className="w-24 h-3.5" />
              <Skeleton variant="text" className="w-32 h-7" />
              <Skeleton variant="rectangular" className="w-28 h-5 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {/* Linha 1 de Gráficos: Coleta em Peso (2 cols) + Rosca de Resíduos (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-5 md:p-6 rounded-2xl border border-yby-border shadow-card space-y-4">
          <div className="space-y-1.5">
            <Skeleton variant="text" className="w-56 h-5" />
            <Skeleton variant="text" className="w-72 h-3.5" />
          </div>
          <Skeleton variant="rectangular" className="w-full h-64 rounded-xl" />
        </div>

        <div className="bg-white p-5 md:p-6 rounded-2xl border border-yby-border shadow-card space-y-4">
          <div className="space-y-1.5">
            <Skeleton variant="text" className="w-48 h-5" />
            <Skeleton variant="text" className="w-40 h-3.5" />
          </div>
          <div className="flex items-center justify-center py-4">
            <Skeleton variant="circular" className="w-44 h-44" />
          </div>
          <div className="space-y-2 pt-2">
            <Skeleton variant="text" className="w-full h-3" />
            <Skeleton variant="text" className="w-3/4 h-3" />
          </div>
        </div>
      </div>

      {/* 4 Secondary KPI Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl border border-yby-border shadow-card space-y-3 relative overflow-hidden"
          >
            <Skeleton variant="rectangular" className="w-16 h-1 rounded-full" />
            <Skeleton variant="text" className="w-28 h-3.5" />
            <Skeleton variant="text" className="w-36 h-7" />
            <Skeleton variant="text" className="w-20 h-3" />
          </div>
        ))}
      </div>

      {/* Linha 2 de Gráficos: Economia de Água + Consumo de Energia */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-yby-border shadow-card space-y-4">
          <div className="space-y-1.5">
            <Skeleton variant="text" className="w-52 h-5" />
            <Skeleton variant="text" className="w-48 h-3.5" />
          </div>
          <Skeleton variant="rectangular" className="w-full h-52 rounded-xl" />
        </div>
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-yby-border shadow-card space-y-4">
          <div className="space-y-1.5">
            <Skeleton variant="text" className="w-52 h-5" />
            <Skeleton variant="text" className="w-48 h-3.5" />
          </div>
          <Skeleton variant="rectangular" className="w-full h-52 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
