import React from 'react';
import { Skeleton } from '../Skeleton.jsx';

/**
 * Esqueleto estrutural de alta fidelidade para o Planejamento Semanal.
 * Reproduz o seletor de busca, legenda de cooperativas e a matriz semanal de células.
 */
export function PlanejamentoSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
        <div className="space-y-2">
          <Skeleton variant="text" className="w-48 h-8 rounded-lg" />
          <Skeleton variant="text" className="w-96 max-w-full h-4 rounded-md" />
        </div>
        <Skeleton variant="rectangular" className="w-44 h-10 rounded-xl" />
      </div>

      {/* Search & Legend Bar Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-yby-surface/50 p-4 rounded-2xl border border-yby-border/60">
        <Skeleton variant="rectangular" className="w-72 max-w-full h-10 rounded-xl" />
        <div className="flex items-center gap-3">
          <Skeleton variant="rectangular" className="w-24 h-6 rounded-full" />
          <Skeleton variant="rectangular" className="w-24 h-6 rounded-full" />
          <Skeleton variant="rectangular" className="w-24 h-6 rounded-full" />
        </div>
      </div>

      {/* Table Matrix Skeleton */}
      <div className="bg-white rounded-2xl border border-yby-border shadow-card overflow-hidden">
        <div className="p-4 bg-yby-surface/40 border-b border-yby-border/60 grid grid-cols-6 gap-4">
          <Skeleton variant="text" className="w-24 h-4" />
          <Skeleton variant="text" className="w-20 h-4" />
          <Skeleton variant="text" className="w-20 h-4" />
          <Skeleton variant="text" className="w-20 h-4" />
          <Skeleton variant="text" className="w-20 h-4" />
          <Skeleton variant="text" className="w-20 h-4" />
        </div>
        <div className="divide-y divide-yby-border/40">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="p-4 grid grid-cols-6 gap-4 items-center">
              <div className="space-y-1">
                <Skeleton variant="text" className="w-32 h-4" />
                <Skeleton variant="text" className="w-20 h-3" />
              </div>
              <Skeleton variant="rectangular" className="w-full h-9 rounded-xl" />
              <Skeleton variant="rectangular" className="w-full h-9 rounded-xl" />
              <Skeleton variant="rectangular" className="w-full h-9 rounded-xl" />
              <Skeleton variant="rectangular" className="w-full h-9 rounded-xl" />
              <Skeleton variant="rectangular" className="w-full h-9 rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
