import React from 'react';
import { Skeleton } from '../Skeleton.jsx';

/**
 * Esqueleto estrutural para a página de Edição.
 * Simula as abas, campo de busca de entidade e o container de formulário.
 */
export function EdicaoSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="space-y-2 pb-2">
        <Skeleton variant="text" className="w-36 h-8 rounded-lg" />
        <Skeleton variant="text" className="w-80 max-w-full h-4 rounded-md" />
      </div>

      {/* Pill Tabs Skeleton */}
      <div className="flex items-center gap-2">
        <Skeleton variant="rectangular" className="w-28 h-10 rounded-xl" />
        <Skeleton variant="rectangular" className="w-32 h-10 rounded-xl" />
        <Skeleton variant="rectangular" className="w-28 h-10 rounded-xl" />
      </div>

      {/* Search Selector Skeleton */}
      <div className="space-y-2">
        <Skeleton variant="text" className="w-32 h-3.5" />
        <Skeleton variant="rectangular" className="w-full h-12 rounded-xl" />
      </div>

      {/* Empty State / Form Skeleton */}
      <div className="bg-white p-8 rounded-2xl border border-yby-border shadow-card flex flex-col items-center justify-center min-h-[260px] space-y-3">
        <Skeleton variant="circular" className="w-14 h-14" />
        <Skeleton variant="text" className="w-48 h-5" />
        <Skeleton variant="text" className="w-64 max-w-full h-3.5" />
      </div>
    </div>
  );
}
